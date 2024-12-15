const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
  }

  try {
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajout des données utilisateur à la requête

    next(); // Passer au prochain middleware ou à la route
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error); // Log de l'erreur

    return res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
};