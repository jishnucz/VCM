const express = require('express');
const router = express.Router();
const Discussion = require('../models/Discussion');

// Create a new discussion (Only Teacher)
router.post('/create', async (req, res) => {
    try {
        const { title, teacherId } = req.body;
        const discussion = new Discussion({ title, teacherId, messages: [] });
        await discussion.save();
        res.json(discussion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create discussion' });
    }
});

// Get all discussions
router.get('/', async (req, res) => {
    try {
        const discussions = await Discussion.find().populate('teacherId', 'username');
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch discussions' });
    }
});

// Send a message in discussion
router.post('/:discussionId/message', async (req, res) => {
    try {
        const { discussionId } = req.params;
        const { userId, username, text } = req.body;
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) return res.status(404).json({ error: 'Discussion not found' });

        discussion.messages.push({ userId, username, text });
        await discussion.save();
        res.json(discussion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get a specific discussion by ID
router.get('/:discussionId', async (req, res) => {
    try {
        const { discussionId } = req.params;
        const discussion = await Discussion.findById(discussionId);
        if (!discussion) return res.status(404).json({ error: 'Discussion not found' });

        res.json(discussion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch discussion' });
    }
});


module.exports = router;
