// models/Classroom.js
const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Removed extra space
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Removed extra space
});

module.exports = mongoose.model('Classroom', ClassroomSchema);