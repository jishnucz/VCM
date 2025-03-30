import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Classroom from './Classroom';

const TeacherDashboard = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newClassroomName, setNewClassroomName] = useState('');
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
            });
            setClassrooms([...classrooms, response.data]);
            setNewClassroomName('');
        } catch (err) {
            setError('Failed to create a new classroom. Please try again.');
            console.error('Error creating classroom:', err);
        }
    };

    const handleLogout = () => {
        // localStorage.clear();
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
                            <Classroom key={classroom._id} classroom={classroom} />
                        ))}
                </div>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Create a New Classroom</h2>
                <form onSubmit={handleCreateClassroom} className="flex gap-4">
                    <input
                        type="text"
                        value={newClassroomName}
                        onChange={(e) => setNewClassroomName(e.target.value)}
                        placeholder="Classroom Name"
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Create Classroom
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeacherDashboard;