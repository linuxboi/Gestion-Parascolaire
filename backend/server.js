// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routestest'); // Import routes
const forumRoutes = require ('./routes/forumRoutes')
const connexionRoutes = require ('./routes/connexionRoutes')
const eventsRoutes = require ('./routes/eventsRoutes')
const calendarRoutes = require ('./routes/calendarRoutes')
const clubsRoutes = require('./routes/clubsRoutes');
const profilEtudiantRoutes = require('./routes/profilEtudiantRoutes')
require('dotenv').config();

const app = express();

// Enable CORS for all origins or for specific origins
app.use(cors({
  origin: 'https://gestion-parascolaire.netlify.app', // Allow only your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  preflightContinue: true, // Don't pass the preflight response to the next handler
  optionsSuccessStatus: 204 // Respond with 204 for successful OPTIONS requests
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err.message));

// Use the imported routes
app.use(routes);


// Utilisation de la route de connexion
app.use("/api", connexionRoutes);

// Utiliser les routes du forum
app.use("/api", forumRoutes);


//utiliser les routes des evenements
app.use("/api", eventsRoutes);

//utiliser les routes pour le calendrier
app.use("/api", calendarRoutes);

//utiliser les routes des clubs
app.use("/api", clubsRoutes);

//utiliser les routes de profil de l etudiant
app.use("/api", profilEtudiantRoutes);

// Set the port and listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
