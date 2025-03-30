
import React from 'react';

const AdminDashboard = () => {
    return (
          <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                  <div className="bg-white shadow rounded-lg p-6">
                      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Admin Dashboard</h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-indigo-50 p-4 rounded-lg">
                              <h3 className="text-lg font-medium text-indigo-900">User Management</h3>
                              <p className="text-indigo-700">Manage all users and their roles</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                              <h3 className="text-lg font-medium text-green-900">Course Management</h3>
                              <p className="text-green-700">Create and manage courses</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                              <h3 className="text-lg font-medium text-purple-900">Analytics</h3>
                              <p className="text-purple-700">View platform statistics</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
};

export default AdminDashboard;