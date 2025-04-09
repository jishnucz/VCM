import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import bgImage from '../assets/image1.jpg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Validator checks
        if (!validator.isLength(username, { min: 3 }) || !validator.isLength(password, { min: 6 })) {
            setError('Please enter valid credentials.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            const { id, username: userName, role } = response.data;

            localStorage.setItem('userId', id);
            localStorage.setItem('username', userName);
            localStorage.setItem('role', role);

            if (role === 'teacher') {
                navigate('/tmaindashboard');
            } else if (role === 'student') {
                navigate('/smaindashboard');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">LearnArena</h1>
                <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Login to your account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
