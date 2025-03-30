import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaComments, FaPlus } from "react-icons/fa";

const CreateDiscussion = () => {
    const [discussions, setDiscussions] = useState([]);
    const [title, setTitle] = useState("");
    const teacherId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        fetchDiscussions();
    }, []);

    const fetchDiscussions = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/discussions");
            setDiscussions(response.data);
        } catch (error) {
            console.error("Error fetching discussions:", error);
        }
    };

    const handleCreateDiscussion = async () => {
        if (!title) return alert("Enter a title");
        try {
            await axios.post("http://localhost:5000/api/discussions/create", { title, teacherId });
            setTitle("");
            fetchDiscussions();
        } catch (error) {
            console.error("Error creating discussion:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            {/* Card Container */}
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <FaComments className="text-blue-600" /> Create a Discussion
                    </h1>
                    <button
                        onClick={() => navigate("/tmaindashboard")}
                        className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
                    >
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                </div>

                {/* Input & Button */}
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Discussion Title"
                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleCreateDiscussion}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    >
                        <FaPlus /> Create
                    </button>
                </div>

                {/* Existing Discussions */}
                <h2 className="text-xl font-semibold mt-6 mb-4">Existing Discussions</h2>
                <div className="space-y-4">
                    {discussions.length === 0 ? (
                        <p className="text-gray-500">No discussions available.</p>
                    ) : (
                        discussions.map((discussion) => (
                            <div key={discussion._id} className="p-4 bg-gray-50 shadow-md rounded-md hover:shadow-lg transition">
                                <h3 className="text-lg font-semibold">{discussion.title}</h3>
                                <button
                                    onClick={() => navigate(`/discussion/${discussion._id}`)}
                                    className="text-blue-600 font-medium hover:underline mt-1"
                                >
                                    Start Discussion →
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateDiscussion;
