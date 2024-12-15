const mongoose = require("mongoose");

// Schéma de la réaction ( "j'aime", "je n'aime pas")
const reactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["like", "dislike"], required: true },
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: true,
  },
  date: { type: Date, default: Date.now },
});

// Schéma du commentaire
const commentaireSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: true,
  },
  date: { type: Date, default: Date.now }
});

// Schéma de la publication dans le forum
const publicationSchema = new mongoose.Schema({
  sujet: { type: String, required: true },
  contenu: { type: String, required: true },
  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Etudiant",
    required: true,
  },
  date: { type: Date, default: Date.now },
  commentaires: [commentaireSchema], // Liste des commentaires associés à cette publication
  reactions: [reactionSchema], // Réactions à la publication elle-même
});

// Création du modèle
const Forum = mongoose.model("Forum", publicationSchema);

module.exports = Forum;