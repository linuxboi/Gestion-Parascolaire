/*const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const Etudiant = require("../models/etudiant");

// Route de connexion
router.post("/connexion", async (req, res) => {
  const { email, motDePasse } = req.body;
  const etudiants = await Etudiant.find();

  try {
    const etudiant = await Etudiant.findOne({ email: email });

    if (!etudiant) {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérification du mot de passe
    const motDePasseValide = await bcrypt.compare(
      motDePasse,
      etudiant.motDePasse
    );
    if (!motDePasseValide) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = jwt.sign({ email: etudiant.email }, "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, message: "Connexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur.", error: error.message });
  }
});

module.exports = router;*/



const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const Etudiant = require("../models/etudiant");

// Route de connexion
router.post("/connexion", async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    // Recherche de l'étudiant par email
    const etudiant = await Etudiant.findOne({ email: email });

    if (!etudiant) {
      return res
        .status(404)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérification du mot de passe en texte clair
    if (motDePasse !== etudiant.motDePasse) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = jwt.sign({ id: etudiant._id, email: etudiant.email }, "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, message: "Connexion réussie." });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur.", error: error.message });
  }
});

module.exports = router;
