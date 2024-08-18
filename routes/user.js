
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({ data: savedUser });
    } catch (err) {
        res.status(400).json({ err: 201, msg: "Error creating resource" });
    }
});

// Login a user
// Note: This is simplified and doesn't include JWT authentication yet
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || user.password !== req.body.password) {
            return res.status(401).json({ err: 201, msg: "Authentication failed" });
        }
        res.json({ msg: "Login successful" });
    } catch (err) {
        res.status(400).json({ err: 201, msg: "Authentication failed" });
    }
});

module.exports = router;
