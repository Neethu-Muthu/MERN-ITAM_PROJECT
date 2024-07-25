import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
     const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, username, email, role, password }),
            });

            if (response.ok) {
                alert('User added successfully');
                navigate('/user-management');
            } else {
                alert('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user');
        }
    };

    const handleCancel = () => {
        navigate('/user-management');
    };

    return (
        <div className="container mx-auto p-4 w-1/2 mx-auto mt-40 p-6 bg-grey-600 rounded-lg shadow-md">
            <div className="text-2xl text-center font-bold mb-4">Create User</div>
            <form id="userForm" className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-900">User ID:</label>
                    <input 
                        type="text" 
                        id="userId" 
                        name="userId" 
                        placeholder="Enter user ID" 
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-900">Name:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Enter user's name" 
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter user's email" 
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-900">Role:</label>
                    <input 
                        type="text" 
                        id="role" 
                        name="role" 
                        placeholder="Enter user's role" 
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-900">Password:</label>
                    <input 
                        type="text" 
                        id="password" 
                        name="password" 
                        placeholder="Enter user's role" 
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Save
                    </button>
                    <button 
                        type="button" 
                        id="cancelBtn" 
                        className="bg-gray-400 text-gray-700 py-2 px-4 ml-2 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
