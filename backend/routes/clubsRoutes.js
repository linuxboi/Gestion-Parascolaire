const express = require('express');
const Etudiant = require('../models/etudiant'); // Modèle Etudiant
const authMiddleware = require('../middlewares/auth'); // Importer le middleware d'authentification

const Club = require('../models/club');
const router = express.Router();

// Récupérer les clubs participés et les autres clubs
router.get('/clubs', authMiddleware, async (req, res) => {
  try {
    
    const etudiantId = req.user.id; // Récupérer l'ID de l'étudiant depuis le token
    const etudiant = await Etudiant.findById(etudiantId)
      .select('clubs') // Sélectionner uniquement les clubs de l'étudiant
      .populate({
        path: 'clubs',
        select: 'nom filtre image', // Sélectionner uniquement les champs nécessaires
      });

    if (!etudiant) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    // Vérifier si l'étudiant a des clubs
    if (!etudiant.clubs || etudiant.clubs.length === 0) {
      return res.status(404).json({ message: 'Aucun club trouvé pour cet étudiant.' });
    }

    // Récupérer tous les clubs disponibles
    const allClubs = await Club.find();

    // Séparer les clubs auxquels l'étudiant participe et les autres clubs
    const mesClubs = etudiant.clubs;
    const autresClubs = allClubs.filter(
      (club) => !mesClubs.some((etudiantClub) => etudiantClub._id.equals(club._id))
    );

    // Retourner une seule réponse avec les deux sections
    const clubsData = {
      mesClubs: mesClubs.map((club) => ({
        image: club.image ? `${club.image}` : null,
        nom: club.nom,
        filtre: club.filtre,
      })),
      autresClubs: autresClubs.map((club) => ({
        image: club.image ? `${club.image}` : null,
        nom: club.nom,
        filtre: club.filtre,
      })),
    };

    // Envoyer la réponse finale
    res.json(clubsData);
  } catch (error) {
    console.error('Erreur lors de la récupération des clubs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Rechercher des clubs par nom et/ou filtre
router.get('/:id/clubs/recherche', async (req, res) => {
  try {
    const { nom, filtre } = req.query; // Récupère les paramètres de recherche et de filtrage

    // Rechercher les clubs dans la base de données
    const query = {}; // Créons une requête vide pour MongoDB

    // Ajouter la recherche par nom si un nom est fourni
    if (nom) {
      query.nom = { $regex: new RegExp(nom, 'i') }; // Recherche insensible à la casse
    }

    // Ajouter le filtre si un filtre est fourni
    if (filtre) {
      query.filtre = { $regex: new RegExp(filtre, 'i') }; // Recherche insensible à la casse
    }

    // Effectuer la recherche
    const clubs = await Club.find(query).select('nom filtre image');

    // Vérifier si des clubs ont été trouvés
    if (clubs.length === 0) {
      return res.status(404).json({ message: 'Aucun club trouvé pour les critères spécifiés.' });
    }

    // Retourner les clubs trouvés
    const resultats = clubs.map((club) => ({
      
      filtre: club.filtre,
      nom: club.nom,
      
    }));

    res.json(resultats);
  } catch (error) {
    console.error('Erreur lors de la recherche des clubs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;