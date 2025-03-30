import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

const Chat = () => {
    const { discussionId } = useParams();
    const navigate = useNavigate();
    const [discussion, setDiscussion] = useState(null);
    const [message, setMessage] = useState('');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchDiscussion();
    }, [discussionId]);

    const fetchDiscussion = async () => {
        console.log("Fetching discussion with ID:", discussionId);
        try {
            const response = await axios.get(`http://localhost:5000/api/discussions/${discussionId}`);
            setDiscussion(response.data);
        } catch (error) {
            console.error("Error fetching discussion:", error);
        }
    };
    
    const sendMessage = async () => {
        if (!message) return;
        try {
            await axios.post(`http://localhost:5000/api/discussions/${discussionId}/message`, { userId, username, text: message });
            setMessage('');
            fetchDiscussion();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-4 flex flex-col">
                <div className="flex items-center mb-4">
                    <FaArrowLeft 
                        className="text-blue-500 text-2xl cursor-pointer hover:text-blue-700 mr-4" 
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-2xl font-bold text-gray-800">{discussion?.title}</h1>
                </div>
                
                <div className="flex-1 overflow-y-auto max-h-96 p-4 bg-gray-50 rounded-lg shadow-inner">
                    {discussion?.messages.map((msg, index) => (
                        <div key={index} className={`p-2 my-2 max-w-xs rounded-lg ${msg.userId === userId ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-800 self-start'}`}>
                            <strong className="block text-sm">
                                {msg.username.includes('@') ? msg.username.split('@')[0] : msg.username}
                                {discussion?.teacherId?.userId === msg.userId ? ' (Teacher)' : ''}
                            </strong>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center mt-4 p-2 border-t">
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Type a message..." 
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        onClick={sendMessage} 
                        className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;