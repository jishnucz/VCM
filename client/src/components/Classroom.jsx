import React from 'react';

const Classroom = ({ classroom }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{classroom.name}</h3>
            <p className="text-gray-600 mb-4">Students Enrolled: <span className="font-semibold text-gray-900">{classroom.students.length}</span></p>
            
            {classroom.students.length > 0 ? (
                <ul className="space-y-2">
                    {classroom.students.map(student => (
                        <li 
                            key={student._id} 
                            className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 font-medium"
                        >
                            {student.username}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 italic">No students enrolled.</p>
            )}
        </div>
    );
};

export default Classroom;
