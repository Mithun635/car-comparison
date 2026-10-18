import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  // Define context to be passed to child routes
  const contextValue = {
    setResponseMessage: (message) => toast(message), // Update context to use toast
  };

  return (
    <div className="background dashboard-backgroundd">
      <div>
        <h1 className="text-center my-3 ">User Dashboard</h1>
        <div className="navpath dashboard-background">
          <Link to="carCompare" className="btn mx-2"><b>Car Compare</b></Link>
          <Link to="carComparePage" className="btn mx-2"><b>Car Compare Page</b></Link>
          <Link to="updateProfile" className="btn mx-2"><b>UpdateProfile</b></Link>
          
          <Link to="/" className="btn mx-2"><b>Logout</b></Link>
        </div>
        <Outlet context={contextValue} /> {/* Pass context here */}
      </div>
      
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;