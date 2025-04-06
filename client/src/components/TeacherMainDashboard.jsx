import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaComments, FaTasks, FaQuestionCircle, FaSignOutAlt, FaBullhorn } from 'react-icons/fa';
import BackgroundImage from '../assets/image3.jpg'; // Adjust path based on your structure

const TeacherMainDashboard = () => {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative" 
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Logout Button */}
            <button 
                onClick={handleLogout} 
                className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-md z-10"
            >
                <FaSignOutAlt />
                <span>Logout</span>
            </button>

            <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-4xl text-center transform transition-all hover:scale-105 relative z-10">
                <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Teacher Dashboard</h1>
                <p className="text-gray-600 mb-6">Manage your classes, assignments, and interact with students seamlessly.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DashboardLink to="/teacher-dashboard" color="bg-blue-600 hover:bg-blue-700" icon={<FaChalkboardTeacher />} text="Teacher Panel" />
                    <DashboardLink to="/teacher-posts" color="bg-amber-600 hover:bg-amber-700" icon={<FaBullhorn />} text="Announcements" />
                    <DashboardLink to="/creatediscussion" color="bg-green-600 hover:bg-green-700" icon={<FaComments />} text="Discussions" />
                    <DashboardLink to="/assignments" color="bg-yellow-600 hover:bg-yellow-700" icon={<FaTasks />} text="Assignments" />
                    <DashboardLink to="/interactive-quizzes" color="bg-red-600 hover:bg-red-700" icon={<FaQuestionCircle />} text="Interactive Quizzes" />
                </div>
            </div>
        </div>
    );
};

// Reusable button component
const DashboardLink = ({ to, color, icon, text }) => {
    return (
        <Link 
            to={to} 
            className={`flex items-center justify-center space-x-2 text-white py-3 px-6 rounded-lg ${color} transition-all transform hover:scale-105 shadow-md`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-semibold">{text}</span>
        </Link>
    );
};

export default TeacherMainDashboard;