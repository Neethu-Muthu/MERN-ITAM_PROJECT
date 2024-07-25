import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [totalAssets, setTotalAssets] = useState(0);
    const [activeAssets, setActiveAssets] = useState(0);
    // const [maintenanceTasks, setMaintenanceTasks] = useState(0);
    // const [assetDistribution, setAssetDistribution] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/assets');
            const assets = response.data;

            // Check if the response data is an array
            if (Array.isArray(assets)) {
                setTotalAssets(assets.length);
                // Add other state updates if you have logic for active assets, maintenance tasks, etc.
            } else {
                console.error('Unexpected response data:', assets);
                // Handle unexpected data format gracefully
                setTotalAssets(0);
                setActiveAssets(0);
                // setMaintenanceTasks(0);
                // setAssetDistribution(0);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error gracefully
            setTotalAssets(0);
            setActiveAssets(0);
            // setMaintenanceTasks(0);
            // setAssetDistribution(0);
        }
    };

    return (
        <div className="bg-gray-100">
           <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="space-x-4">
                    <Link to="/home" className="text-blue-600 hover:text-gray-900">Home</Link>
                </div>
                <div className="space-x-4">
                    <Link to="/home" className="text-blue-600 hover:text-gray-900">Logout</Link>
                </div>
      
    </nav>
            <div className="max-w-7xl mx-auto py-6 px-4 md:px-6 lg:px-8">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-20 ml-60">
                <div className="bg-white shadow-md rounded-md p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Assets</h3>
                    <p id="total-assets" className="text-3xl font-bold text-blue-500">{totalAssets}</p>
                </div>
                <div className="bg-white shadow-md rounded-md p-4 ml-10 gap-10 ">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Assets</h3>
                    <p id="active-assets" className="text-3xl font-bold text-green-500">{activeAssets}</p>
                </div>
                {/* <div className="bg-white shadow-md rounded-md p-4 ml-10 gap-10">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Maintenance Tasks</h3>
                    <p id="maintenance-tasks" className="text-3xl font-bold text-yellow-500">{maintenanceTasks}</p>
                </div> */}
                {/* <div className="bg-white shadow-md rounded-md p-4 mr-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Asset Distribution</h3>
                    <p id="asset-distribution" className="text-3xl font-bold text-purple-500">{assetDistribution}</p>
                </div> */}
            </div>
            <div className="flex flex-row h-64 mt-6">
                <div className="bg-pink-500 rounded-xl shadow-lg px-6 py-12 w-72 h-40 ml-60">
                    <Link to="/asset-inventory">
                        <p className="text-center py-3">Asset Inventory</p>
                    </Link>
                </div>
                <div className="bg-blue-500 rounded-xl shadow-lg mx-6 px-6 py-12 w-72 h-40 ml-20">
                    <Link to="/user-management">
                        <p className="text-center py-3">User Management</p>
                    </Link>
                </div>
                {/* <div className="bg-green-500 rounded-xl shadow-lg px-6 py-12 w-72 h-40 ml-30">
                    <Link to="/asset-track">
                        <p className="text-center py-3">Asset Tracking </p>
                    </Link>
                </div> */}
                <div className="bg-violet-500 rounded-xl shadow-lg px-6 py-12 w-72 h-40 ml-10">
                    <Link to="/assigned-assets">
                        <p className="text-center py-3">Asset Tracking </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
