import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaClipboardList, FaGraduationCap, FaChalkboard, FaSignOutAlt, FaUser } from 'react-icons/fa';
import BackgroundImage from '../assets/image3.jpg'; // Ensure the image path is correct

const StudentMainDashboard = () => {
    const navigate = useNavigate();
    let username = localStorage.getItem('username') || "Student";

    // Remove @gmail.com or any domain if username is an email
    if (username.includes("@")) {
        username = username.split("@")[0];
    }

    // Get a dynamic greeting based on the time of the day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Logout Button - Positioned at Top Right */}
            <button
                onClick={handleLogout}
                className="absolute top-6 right-6 flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
            >
                <FaSignOutAlt />
                <span>Logout</span>
            </button>

            <div className="relative bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl w-full max-w-3xl text-center transform transition-all hover:scale-105">
                {/* Greeting Section */}
                <div className="flex flex-col items-center space-y-2 mb-6">
                    <FaUser className="text-5xl text-blue-500 shadow-md p-2 rounded-full bg-white" />
                    <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        {getGreeting()}, {username}!
                    </h2>
                </div>

                <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Student Dashboard</h1>
                <p className="text-gray-700 mb-6 text-lg">Access your courses, assignments, and track your progress efficiently.</p>

                {/* Dashboard Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DashboardLink to="/student-dashboard" color="bg-green-700 hover:bg-green-800" icon={<FaChalkboard />} text="Student Panel" />
                    <DashboardLink to="/discussions" color="bg-blue-700 hover:bg-blue-800" icon={<FaBook />} text="Discussions" />
                    <DashboardLink to="/assignments" color="bg-yellow-700 hover:bg-yellow-800" icon={<FaClipboardList />} text="Assignments" />
                    <DashboardLink to="/grades" color="bg-purple-700 hover:bg-purple-800" icon={<FaGraduationCap />} text="Grades" />
                </div>
            </div>
        </div>
    );
};

// Reusable button component with animated effect
const DashboardLink = ({ to, color, icon, text }) => {
    return (
        <Link 
            to={to} 
            className={`flex items-center justify-center space-x-2 text-white py-4 px-8 rounded-lg ${color} transition-all transform hover:scale-110 shadow-lg`}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-lg font-semibold">{text}</span>
        </Link>
    );
};

export default StudentMainDashboard;
