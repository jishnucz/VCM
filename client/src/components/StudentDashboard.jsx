import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [joinedClassrooms, setJoinedClassrooms] = useState(new Set());
    const studentId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClassrooms = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/classroom');
                setClassrooms(response.data);
                
                // Check which classrooms the student has already joined
                if (studentId) {
                    const joined = new Set();
                    response.data.forEach(classroom => {
                        if (classroom.students && classroom.students.some(student => 
                            student._id === studentId || student === studentId)) {
                            joined.add(classroom._id);
                        }
                    });
                    setJoinedClassrooms(joined);
                }
            } catch (error) {
                console.error('Error fetching classrooms:', error.response ? error.response.data : error.message);
                setError('Failed to fetch classrooms.');
            } finally {
                setLoading(false);
            }
        };
        fetchClassrooms();
    }, [studentId]);

    const handleJoinClassroom = async (classroomId) => {
        if (joinedClassrooms.has(classroomId)) {
            alert('You have already joined this classroom.');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/api/classroom/join/${classroomId}`, { studentId });
            setJoinedClassrooms(prev => new Set(prev).add(classroomId));
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
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/smaindashboard');
    };

    const filterJoinedClassrooms = () => {
        return classrooms.filter(classroom => joinedClassrooms.has(classroom._id));
    };

    const filterAvailableClassrooms = () => {
        return classrooms.filter(classroom => !joinedClassrooms.has(classroom._id));
    };

    const joinedClassroomsList = filterJoinedClassrooms();
    const availableClassroomsList = filterAvailableClassrooms();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-8">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-8 rounded-xl shadow-lg mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Virtual Classroom Hub</h1>
                    <p className="text-md mt-1 opacity-90">Welcome back, Student!</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
                >
                    Back
                </button>
            </header>

            {/* Main Content */}
            <main>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Classrooms</h2>
                {loading && <p className="text-center text-gray-600 text-lg">Loading classrooms...</p>}
                {error && <p className="text-center text-red-500 text-lg">{error}</p>}
                {!loading && classrooms.length === 0 && <p className="text-center text-gray-600 text-lg">No classrooms available.</p>}
                {!loading && classrooms.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classrooms.map(classroom => (
                            <div 
                                key={classroom._id} 
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{classroom.name}</h3>
                                <p className="text-gray-600 mb-4">
                                    <strong>Subject:</strong> {classroom.subject || 'General'} <br />
                                    <strong>Teacher:</strong> {classroom.teacher ? classroom.teacher.username : 'Unknown'} <br />
                                    <strong>Schedule:</strong> {classroom.schedule || 'Not specified'}
                                </p>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                    {classroom.description || 'No description available.'}
                                </p>
                                <button 
                                    onClick={() => handleJoinClassroom(classroom._id)} 
                                    disabled={joinedClassrooms.has(classroom._id)}
                                    className={`w-full py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
                                        joinedClassrooms.has(classroom._id)
                                            ? 'bg-green-500 cursor-not-allowed opacity-75'
                                            : 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg'
                                    }`}
                                >
                                    {joinedClassrooms.has(classroom._id) ? 'Joined' : 'Join Classroom'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Announcements Section */}
            <section className="mt-10 bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Announcements</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-800">Welcome to the New Semester!</h4>
                        <p className="text-sm text-gray-600">Classes will begin on October 1st. Please check your schedules.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-800">Assignment Submission Reminder</h4>
                        <p className="text-sm text-gray-600">Submit your assignments by October 10th to avoid penalties.</p>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="mt-10 bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-800">Midterm Exams</h4>
                        <p className="text-sm text-gray-600">October 15th - October 20th</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                        <h4 className="font-semibold text-gray-800">Parent-Teacher Meeting</h4>
                        <p className="text-sm text-gray-600">October 25th, 10:00 AM</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentDashboard;