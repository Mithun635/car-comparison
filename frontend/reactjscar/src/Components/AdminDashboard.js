import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Admin.css'; // Ensure you have the necessary styles here

const AdminDashboard = () => {
    // Define context to be passed to child routes
    const contextValue = {
        setResponseMessage: (message) => toast(message), // Update context to use toast
    };

    return (
        <div className="admin-dashboard">
            <ToastContainer />

            <nav className="navbar">
                <div className="navbar-brand">Admin Dashboard</div>
                <div className="navbar-links">
                    <Link to="addBrand" className="nav-link">Add Brand</Link>
                    <Link to="addModel" className="nav-link">Add Model</Link>
                    <Link to="addVariant" className="nav-link">Add Variant</Link>
                    <Link to="addSpecifications" className="nav-link">Add Specifications</Link>
                  

                    <Link to="updatePassword" className="nav-link">Update Password</Link>
                    <Link to="/" className="nav-link">Logout</Link>
                </div>
            </nav>

            <main>
                <Outlet context={contextValue} /> {/* Render the correct component based on route */}
            </main>
        </div>
    );
};

export default AdminDashboard;
