const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const etudiantSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true }, // Mot de passe hashé
  profilePic: { type: String, required: true },
  clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }], // Clubs auxquels l'étudiant est inscrit
  evenementsParticipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evenement' }], // Événements passés
  evenementsAVenir: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evenement' }], // Événements à venir
});

/* Middleware pour hasher le mot de passe avant de l'enregistrer
etudiantSchema.pre('save', async function(next) {
  if (this.isModified('motDePasse') || this.isNew) {
    this.motDePasse = await bcrypt.hash(this.motDePasse, 10);  // Hachage du mot de passe
  }
  next();
});*/

// Modèle d'Etudiant

module.exports = mongoose.model('Etudiant', etudiantSchema);
