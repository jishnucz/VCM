import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaArrowLeft } from 'react-icons/fa';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        try {
            console.log('🔍 Fetching discussions from backend...');
            const response = await axios.get('http://localhost:5000/api/discussions');
            console.log('✅ Discussions fetched:', response.data);
            setDiscussions(response.data);
        } catch (error) {
            console.error('❌ Error fetching discussions:', error);
        }
    };

    const handleBack = () => {
        if (userRole === 'teacher') {
            navigate('/tmaindashboard');
        } else {
            navigate('/smaindashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <button 
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                        onClick={handleBack}
                    >
                        <FaArrowLeft /> Back
                    </button>
                    <h1 className="text-3xl font-bold text-blue-600">Discussions</h1>
                    <div></div> {/* Empty div to balance the layout */}
                </div>
                <div className="border rounded-lg overflow-hidden">
                    {discussions.length > 0 ? (
                        <ul className="divide-y divide-gray-300">
                            {discussions.map((discussion) => (
                                <li
                                    key={discussion._id}
                                    className="flex items-center gap-4 p-4 hover:bg-blue-50 cursor-pointer transition-all"
                                    onClick={() => navigate(`/discussion/${discussion._id}`)}
                                >
                                    <FaCommentDots className="text-blue-500 text-2xl" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{discussion.title}</p>
                                        <p className="text-sm text-gray-500">Teacher: {discussion.teacherId?.username || 'Unknown'}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No discussions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discussions;
