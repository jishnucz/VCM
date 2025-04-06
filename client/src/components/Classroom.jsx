import React from 'react';

const Classroom = ({ classroom }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{classroom.name}</h3>
            
            {classroom.subject && (
                <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Subject:</span> {classroom.subject}
                </p>
            )}
            
            {classroom.schedule && (
                <p className="text-gray-700 mb-1">
                    <span className="font-semibold">Schedule:</span> {classroom.schedule}
                </p>
            )}
            
            {classroom.description && (
                <div className="mt-2 mb-4">
                    <p className="text-gray-600 text-sm">{classroom.description}</p>
                </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Students Enrolled:</span> {classroom.students.length}
                </p>
                
                {classroom.students.length > 0 ? (
                    <div className="max-h-40 overflow-y-auto">
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
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No students enrolled.</p>
                )}
            </div>
        </div>
    );
};

export default Classroom;