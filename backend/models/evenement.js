const mongoose = require('mongoose');

const schemaEvenement = new mongoose.Schema({
  titre: { type: String, required: true }, // Titre de l'événement
  description: { type: String, required: true }, // Description de l'événement
  date: { type: Date, required: true }, // Date de l'événement
  lieu: { type: String, required: true }, // Lieu de l'événement
  image: { type: String, required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }, // Club organisateur
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }], // Liste des participants
});

module.exports = mongoose.model('Evenement', schemaEvenement);