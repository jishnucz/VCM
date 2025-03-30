// src/components/Home.js
import React from 'react';

const Home = ({ role }) => {
    return (
        <div>
            <h1>Welcome to the Virtual Classroom</h1>
            <h2>Your role: {role}</h2>
        </div>
    );
};

export default Home;