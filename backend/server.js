// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routestest'); // Import routes
require('dotenv').config();

const app = express();

// Enable CORS for all origins or for specific origins
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  preflightContinue: false, // Don't pass the preflight response to the next handler
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

// Set the port and listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
