const express = require('express');
const Classroom = require('../models/Classroom');
const User = require('../models/User');
const mongoose = require('mongoose');
const router = express.Router();

// Middleware for error handling
const handleError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
};

// Create a classroom
router.post('/', async (req, res) => {
    const { name, teacherId } = req.body;

    // Validate teacherId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid teacher ID' });
    }

    const classroom = new Classroom({ name, teacher: teacherId });
    try {
        await classroom.save();
        res.status(201).json(classroom);
    } catch (error) {
        handleError(res, error);
    }
});

// Get all classrooms
router.get('/', async (req, res) => {
    console.log('Received request for /api/classroom');
    try {
        const classrooms = await Classroom.find().populate('teacher'); // Populate teacher info
        res.json(classrooms);
    } catch (error) {
        console.error('Error fetching classrooms:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get classrooms by teacher
router.get('/teacher/:teacherId', async (req, res) => {
    const { teacherId } = req.params;

    // Validate teacherId
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ message: 'Invalid teacher ID' });
    }

    try {
        // Populate both teacher and students
        const classrooms = await Classroom.find({ teacher: teacherId })
            .populate('students') // Populate student info
            .populate('teacher'); // Populate teacher info if needed
        res.json(classrooms);
    } catch (error) {
        handleError(res, error);
    }
});

// Join a classroom
router.post('/join/:classroomId', async (req, res) => {
    const { studentId } = req.body;
    const classroomId = req.params.classroomId;

    console.log("Received studentId:", studentId);
    console.log("Received classroomId:", classroomId);

    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(classroomId)) {
        return res.status(400).json({ message: 'Invalid student ID or classroom ID' });
    }

    try {
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

        if (classroom.students.includes(studentId)) {
            return res.status(200).json({ message: 'Student is already in this classroom', joined: true });
        }
        

        classroom.students.push(studentId);
        await classroom.save();
        res.status(200).json({ message: "Successfully joined the classroom", classroom });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});







module.exports = router;