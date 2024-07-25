import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/api/users/${userId}`);
        if (response.status === 200) {
            // Remove user from the local state
            setUsers((prevUsers) => prevUsers.filter(user => user.userId !== userId));
            alert('User deleted successfully');
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user.');
    }
};


    return (
        <div className="bg-white">
            <nav className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="space-x-4">
                    <a href="/admin-dashboard" className="text-blue-600 hover:text-gray-900">Home</a>
                </div>
                <div className="space-x-4">
                    <a href="/home" className="text-blue-600 hover:text-gray-900">Logout</a>
                </div>
            </nav>

            <div className="container mx-auto p-4 w-1/2 mx-auto mt-40 p-6 bg-gray-100 rounded-lg shadow-md">
                <div className="text-2xl text-center font-bold mb-4">User Management</div>
                <div className="flex justify-end mb-4">
                    <a href='/create-user'>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-800 focus:bg-blue-600">Create User</button>
                    </a>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:bg-blue-800">Search</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:bg-blue-800">Filter</button>
                </div>
                <table className="w-full bg-gray-300  rounded-md overflow-hidden">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Role</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Password</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td className="border px-4 py-2">{user.userId}</td>
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                 <td className="border px-4 py-2">{user.password}</td>
                                <td className="border px-4 py-2">
                                    <a href={`/createUser?id=${user.userId}`} className="text-blue-600 hover:text-blue-800">Edit</a>
                                    <button className="text-red-600 hover:text-red-800 ml-2" onClick={() => deleteUser(user.userId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
