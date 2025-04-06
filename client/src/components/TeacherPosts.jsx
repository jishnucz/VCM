import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TeacherPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState("");
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
    navigate("/tmaindashboard");
  };

  const createPost = async () => {
    if (!newPost.trim()) return;
    try {
      setSubmitting(true);
      await axios.post("http://localhost:5000/api/posts", { content: newPost });
      setNewPost("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const deletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const startEditing = (post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  const cancelEditing = () => {
    setEditingPost(null);
    setEditContent("");
  };

  const saveEdit = async (id) => {
    if (!editContent.trim()) return;
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, { content: editContent });
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const togglePin = async (id, pinned) => {
    try {
      await axios.patch(`http://localhost:5000/api/posts/${id}/pin`, { pinned: !pinned });
      fetchPosts();
    } catch (error) {
      console.error("Error pinning post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={goBack}
          className="mr-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-bold text-indigo-800 border-b-2 border-indigo-300 pb-2 flex-1">
          Teacher Dashboard 
          <span className="text-indigo-500 ml-2">Announcements</span>
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Create New Announcement</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            className="border border-gray-300 px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all resize-none"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a new announcement..."
            rows="3"
          />
          <button
            className={`px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 whitespace-nowrap h-fit sm:self-end ${
              submitting || !newPost.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
            }`}
            onClick={createPost}
            disabled={submitting || !newPost.trim()}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </span>
            ) : (
              "Post Announcement"
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md text-gray-500">
          <p className="text-xl">No announcements yet</p>
          <p className="mt-2">Create your first announcement using the form above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className={`rounded-lg p-5 shadow-lg transition-all duration-300 hover:shadow-xl ${
                post.pinned 
                  ? "bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400" 
                  : "bg-white hover:bg-indigo-50"
              }`}
            >
              {editingPost === post._id ? (
                <div className="space-y-3">
                  <textarea
                    className="border border-gray-300 px-3 py-2 w-full rounded focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows="3"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(post._id)}
                      className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {post.pinned && (
                    <div className="flex items-center mb-2 text-amber-600">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.25 13.25v-8.5a.75.75 0 011.5 0v8.5a.75.75 0 01-1.5 0z" />
                        <path d="M10 17a1 1 0 100-2 1 1 0 000 2z" />
                      </svg>
                      <span className="text-xs font-semibold uppercase tracking-wider">Pinned</span>
                    </div>
                  )}
                  <p className="text-gray-800 text-lg leading-relaxed">{post.content}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {post.createdAt && new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric", 
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                    <div className="flex gap-3 mt-2 sm:mt-0">
                      <button
                        onClick={() => startEditing(post)}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="text-red-600 hover:text-red-800 flex items-center text-sm"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                      <button
                        onClick={() => togglePin(post._id, post.pinned)}
                        className={`flex items-center text-sm ${
                          post.pinned ? "text-amber-600 hover:text-amber-800" : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {post.pinned ? "Unpin" : "Pin"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherPosts;