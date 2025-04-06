import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import StudentMainDashboard from './components/StudentMainDashboard';
import TeacherMainDashboard from './components/TeacherMainDashboard';
import CreateDiscussion from './components/CreateDiscussion';
import Discussions from './components/Discussions';
import Chat from './components/Chat';
import TeacherPosts from './components/TeacherPosts'; 
import StudentPosts from './components/StudentPosts';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/tmaindashboard" element={<TeacherMainDashboard />} />
                <Route path="/smaindashboard" element={<StudentMainDashboard />} />
                <Route path="/discussions" element={<Discussions />} />
                <Route path="/discussion/:discussionId" element={<Chat />} />
                <Route path="/creatediscussion" element={<CreateDiscussion />} />
                <Route path="/teacher-posts" element={<TeacherPosts />} /> 
                <Route path="/student-posts" element={<StudentPosts />} />

            </Routes>
        </Router>
    );
}

export default App;