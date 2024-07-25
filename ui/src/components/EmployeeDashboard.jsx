import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
    const [assignedAssets, setAssignedAssets] = useState([]);
    const [user, setUser] = useState(null); // Assume you have a way to get logged-in user details
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssignedAssets = async () => {
            if (user) {
                try {
                    const response = await axios.get(`/api/assigned-assets/${user.userId}`);
                    setAssignedAssets(response.data);
                } catch (error) {
                    console.error('Error fetching assigned assets:', error);
                }
            }
        };

        // Mock function to get user info (replace with actual logic)
        const getUser = async () => {
            // Example user object
            const userInfo = { userId: '1', username: 'user1' };
            setUser(userInfo);
        };

        getUser();
        fetchAssignedAssets();
    }, [user]);

    return (
        
        <div className="container mx-auto p-4 mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            
            <div className="text-2xl text-center font-bold mb-4">Employee Dashboard</div>
            {user ? (
                <div>
                    <div className="text-lg mb-4">
                        Welcome, <span className="font-bold">{user.username}</span>!
                    </div>
                    <div className="text-lg mb-4">
                        Here are the assets assigned to you:
                    </div>
                    <table className="w-full bg-gray-300 rounded-md overflow-hidden">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="border px-4 py-2">Asset ID</th>
                                <th className="border px-4 py-2">Asset Name</th>
                                <th className="border px-4 py-2">Assignment Date</th>
                                {/* <th className="border px-4 py-2">Status</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {assignedAssets.length > 0 ? (
                                assignedAssets.map(asset => (
                                    <tr key={asset._id}>
                                        <td className="border px-4 py-2">{asset.assetId}</td>
                                        <td className="border px-4 py-2">{asset.assetName}</td>
                                        <td className="border px-4 py-2">{new Date(asset.assignmentDate).toLocaleDateString()}</td>
                                        {/* <td className="border px-4 py-2">{asset.status}</td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border px-4 py-2 text-center">No assets assigned</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center text-gray-500">Loading...</div>
            )}
        </div>
    );
};

export default EmployeeDashboard;
