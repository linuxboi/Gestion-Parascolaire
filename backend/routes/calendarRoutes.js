const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth'); 
const Evenement = require('../models/evenement'); // Importer le modèle


// Route pour créer un événement
router.post('/', async (req, res) => {
    const { title, date, description } = req.body;
    const nouvelEvenement = new Evenement({ title, date, description });

    try {
        await nouvelEvenement.save(); // Sauvegarder l'événement dans la base de données
        res.status(201).send({ message: 'Événement créé', event: nouvelEvenement });
    } catch (error) {
        res.status(400).send({ message: 'Erreur lors de la création de l\'événement', error });
    }
});
// Route pour ajouter un étudiant à la liste des participants d'un événement
router.post('/:id/ajouter-participant', authMiddleware ,async (req, res) => {
    const eventId = req.params.id;
    const etudiantId  = req.user.id; 

    if (!etudiantId) {
        return res.status(400).send({ message: "L'ID de l'étudiant est requis" });
    }

    try {
        const evenement = await Evenement.findById(eventId);
        if (!evenement) {
            return res.status(404).send({ message: 'Événement introuvable' });
        }

        // Vérifier si l'étudiant est déjà participant
        if (evenement.participants.includes(etudiantId)) {
            return res.status(400).send({ message: 'Cet étudiant est déjà participant à cet événement' });
        }

        // Ajouter l'étudiant aux participants
        evenement.participants.push(etudiantId);
        await evenement.save();

        res.send({ message: 'Participant ajouté avec succès', evenement });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de l\'ajout du participant', error });
    }
});

// Route pour obtenir tous les événements
router.get('/events', async (req, res) => {
    try {
        const evenements = await Evenement.find(); // Récupérer tous les événements
        res.send(evenements);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération des événements', error });
    }
});

module.exports = router;