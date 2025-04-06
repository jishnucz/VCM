const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    subject: { type: String },
    schedule: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Classroom', ClassroomSchema);