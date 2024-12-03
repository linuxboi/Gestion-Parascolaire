// routes.js
const express = require('express');
const User = require('../models/modeltest'); // Your User model

const router = express.Router();

// POST route to create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Received data:", req.body); // Log the incoming request body

    // Validate data
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields (name, email, password) are required" });
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message); // Log error for debugging
    res.status(400).json({ error: error.message });
  }
});

// GET route to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
