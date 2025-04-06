import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const goBack = () => {
    navigate("/smaindashboard");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={goBack}
          className="mr-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-300 pb-2 flex-1">
          Student Dashboard 
          <span className="text-blue-500 ml-2">Announcements</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-xl">No announcements yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`rounded-lg p-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
                post.pinned 
                  ? "bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400" 
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              {post.pinned && (
                <div className="flex items-center mb-2 text-amber-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.25 13.25v-8.5a.75.75 0 011.5 0v8.5a.75.75 0 01-1.5 0z" />
                    <path d="M10 17a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-wider">Important</span>
                </div>
              )}
              <p className="text-gray-800 text-lg leading-relaxed">{post.content}</p>
              <div className="mt-3 text-xs text-gray-500">
                {post.createdAt && new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric", 
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentPosts;