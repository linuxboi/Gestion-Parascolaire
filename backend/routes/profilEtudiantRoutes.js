const Etudiant = require("../models/etudiant");
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/auth'); 
 // Importer Multer

 const router = express.Router();

// Afficher le profil
router.get("/profil", authMiddleware,async (req, res) => {
  try {
    // Utilisation de req.user.id provenant du middleware auth
    const etudiant = await Etudiant.findById(req.user.id);
    if (!etudiant) {
      return res.status(404).json({ message: "Étudiant non trouvé." });
    }
    res.status(200).json(etudiant);
  } catch (error) {
    console.error("Erreur lors du chargement du profil :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }

}
)
module.exports = router;

