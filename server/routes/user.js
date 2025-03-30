// routes/user.js
const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

// Get teacher by username
router.get('/:username', async (req, res) => {
    try {
        const teacher = await User.findOne({ username: req.params.username, role: 'teacher' });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json({ id: teacher._id, username: teacher.username }); // Return the ID and username
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;