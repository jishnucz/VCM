import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Classroom from './Classroom';

const TeacherDashboard = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newClassroomName, setNewClassroomName] = useState('');
    const [newClassroomSubject, setNewClassroomSubject] = useState('');
    const [newClassroomSchedule, setNewClassroomSchedule] = useState('');
    const [newClassroomDescription, setNewClassroomDescription] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentClassroom, setCurrentClassroom] = useState(null);
    const teacherId = localStorage.getItem('userId')?.trim();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassrooms = async () => {
            if (!teacherId) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/classroom/teacher/${teacherId}`);
                setClassrooms(response.data);
            } catch (err) {
                setError('Failed to fetch classrooms. Please check your connection or server.');
                console.error('Error fetching classrooms:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchClassrooms();
    }, [teacherId]);

    const handleCreateClassroom = async (e) => {
        e.preventDefault();
        if (!newClassroomName) return;

        try {
            const response = await axios.post(`http://localhost:5000/api/classroom`, {
                name: newClassroomName,
                teacherId: teacherId,
                subject: newClassroomSubject,
                schedule: newClassroomSchedule,
                description: newClassroomDescription
            });
            setClassrooms([...classrooms, response.data]);
            resetForm();
        } catch (err) {
            setError('Failed to create a new classroom. Please try again.');
            console.error('Error creating classroom:', err);
        }
    };

    const handleEditClassroom = async (e) => {
        e.preventDefault();
        if (!currentClassroom) return;

        try {
            const response = await axios.put(`http://localhost:5000/api/classroom/${currentClassroom._id}`, {
                name: newClassroomName,
                subject: newClassroomSubject,
                schedule: newClassroomSchedule,
                description: newClassroomDescription
            });
            
            setClassrooms(classrooms.map(classroom => 
                classroom._id === currentClassroom._id ? response.data : classroom
            ));
            resetForm();
            setEditMode(false);
        } catch (err) {
            setError('Failed to update the classroom. Please try again.');
            console.error('Error updating classroom:', err);
        }
    };

    const handleDeleteClassroom = async (classroomId) => {
        if (!window.confirm('Are you sure you want to delete this classroom?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/classroom/${classroomId}`);
            setClassrooms(classrooms.filter(classroom => classroom._id !== classroomId));
        } catch (err) {
            setError('Failed to delete the classroom. Please try again.');
            console.error('Error deleting classroom:', err);
        }
    };

    const startEdit = (classroom) => {
        setCurrentClassroom(classroom);
        setNewClassroomName(classroom.name);
        setNewClassroomSubject(classroom.subject || '');
        setNewClassroomSchedule(classroom.schedule || '');
        setNewClassroomDescription(classroom.description || '');
        setEditMode(true);
    };

    const resetForm = () => {
        setNewClassroomName('');
        setNewClassroomSubject('');
        setNewClassroomSchedule('');
        setNewClassroomDescription('');
        setCurrentClassroom(null);
    };

    const cancelEdit = () => {
        resetForm();
        setEditMode(false);
    };

    const handleLogout = () => {
        navigate('/tmaindashboard');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Back
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Your Classrooms</h2>
                {loading && <p>Loading classrooms...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && classrooms.length === 0 && <p>No classrooms found.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!loading &&
                        classrooms.map((classroom) => (
                            <div key={classroom._id} className="relative">
                                <Classroom classroom={classroom} />
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <button
                                        onClick={() => startEdit(classroom)}
                                        className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClassroom(classroom._id)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">
                    {editMode ? 'Edit Classroom' : 'Create a New Classroom'}
                </h2>
                <form onSubmit={editMode ? handleEditClassroom : handleCreateClassroom} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="classroomName" className="block text-sm font-medium text-gray-700 mb-1">
                                Classroom Name
                            </label>
                            <input
                                id="classroomName"
                                type="text"
                                value={newClassroomName}
                                onChange={(e) => setNewClassroomName(e.target.value)}
                                placeholder="e.g., Math 101"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                Subject
                            </label>
                            <input
                                id="subject"
                                type="text"
                                value={newClassroomSubject}
                                onChange={(e) => setNewClassroomSubject(e.target.value)}
                                placeholder="e.g., Mathematics"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                                Schedule
                            </label>
                            <input
                                id="schedule"
                                type="text"
                                value={newClassroomSchedule}
                                onChange={(e) => setNewClassroomSchedule(e.target.value)}
                                placeholder="e.g., Mon/Wed/Fri 10:00 AM"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={newClassroomDescription}
                                onChange={(e) => setNewClassroomDescription(e.target.value)}
                                placeholder="Enter a description for your classroom"
                                rows="3"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-4">
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-lg text-white transition duration-300 ${
                                editMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {editMode ? 'Update Classroom' : 'Create Classroom'}
                        </button>
                        
                        {editMode && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherDashboard;