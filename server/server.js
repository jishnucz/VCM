const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const classroomRoutes = require('./routes/classroom');
const userRoutes = require('./routes/user');
const discussionRoutes = require('./routes/discussion');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/classroom', classroomRoutes);
app.use('/api/user', userRoutes);
app.use('/api/discussions', discussionRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});