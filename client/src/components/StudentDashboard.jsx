import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after logout

const StudentDashboard = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [joinedClassrooms, setJoinedClassrooms] = useState(new Set()); // Track joined classrooms
    const studentId = localStorage.getItem('userId'); // Assuming student ID is stored in local storage
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchClassrooms = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/classroom');
                setClassrooms(response.data);
            } catch (error) {
                console.error('Error fetching classrooms:', error.response ? error.response.data : error.message);
                setError('Failed to fetch classrooms.');
            } finally {
                setLoading(false);
            }
        };
        fetchClassrooms();
    }, []);

    const handleJoinClassroom = async (classroomId) => {
        if (joinedClassrooms.has(classroomId)) {
            alert('You have already joined this classroom.');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/api/classroom/join/${classroomId}`, { studentId });
            setJoinedClassrooms(prev => new Set(prev).add(classroomId)); // Add to joined classrooms
            setClassrooms(prevClassrooms => 
                prevClassrooms.map(classroom => 
                    classroom._id === classroomId ? { ...classroom, students: [...classroom.students, { _id: studentId }] } : classroom
                )
            );
            alert('Successfully joined the classroom!');
        } catch (error) {
            console.error('Error joining classroom:', error);
            setError('Failed to join classroom.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId'); // Clear user ID from local storage
        localStorage.removeItem('token'); // Clear token if stored
        navigate('/smaindashboard'); // Redirect to login page
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 px-6 rounded-lg mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Virtual Classroom Management</h1>
                    <p className="text-sm">Welcome back, Student!</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                    Back
                </button>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Navigation</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Dashboard</a></li>
                        <li><a href="#" className="text-gray-700 hover:underline">My Classrooms</a></li>
                        <li><a href="#" className="text-gray-700 hover:underline">Assignments</a></li>
                        <li><a href="#" className="text-gray-700 hover:underline">Grades</a></li>
                        <li><a href="#" className="text-gray-700 hover:underline">Settings</a></li>
                    </ul>
                </aside>

                {/* Classroom List */}
                <main className="lg:col-span-3">
                    <h2 className="text-2xl font-semibold mb-6">Available Classrooms</h2>
                    {loading && <p className="text-center text-gray-600">Loading classrooms...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {!loading && classrooms.length === 0 && <p className="text-center text-gray-600">No classrooms available.</p>}
                    {!loading && classrooms.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classrooms.map(classroom => (
                                <div key={classroom._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-xl font-semibold mb-2">{classroom.name}</h3>
                                    <p className="text-gray-600 mb-4">
                                        <strong>Subject:</strong> {classroom.subject || 'General'} <br />
                                        <strong>Teacher:</strong> {classroom.teacher ? classroom.teacher.username : 'Unknown'} <br />
                                        <strong>Schedule:</strong> {classroom.schedule || 'Not specified'}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {classroom.description || 'No description available.'}
                                    </p>
                                    <button 
                                        onClick={() => handleJoinClassroom(classroom._id)} 
                                        disabled={joinedClassrooms.has(classroom._id)}
                                        className={`w-full py-2 rounded ${
                                            joinedClassrooms.has(classroom._id)
                                                ? 'bg-green-500 cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                        } text-white font-semibold transition-colors`}
                                    >
                                        {joinedClassrooms.has(classroom._id) ? 'Joined' : 'Join Classroom'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Announcements Section */}
            <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Recent Announcements</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Welcome to the New Semester!</h4>
                        <p className="text-sm text-gray-600">Classes will begin on October 1st. Please check your schedules.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Assignment Submission Reminder</h4>
                        <p className="text-sm text-gray-600">Submit your assignments by October 10th to avoid penalties.</p>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Midterm Exams</h4>
                        <p className="text-sm text-gray-600">October 15th - October 20th</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold">Parent-Teacher Meeting</h4>
                        <p className="text-sm text-gray-600">October 25th, 10:00 AM</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentDashboard;