import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import './UpdatePassword.css'; // Import the CSS file

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields.'); // Ensure no field is empty
      return;
    }
  
    if (oldPassword.length !== 8 || newPassword.length !== 8 || confirmPassword.length !== 8) {
      toast.error('All passwords must be exactly 8 characters long.'); // Check length
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.'); // Check if passwords match
      return;
    }
  
    try {
      const passwordData = {
        oldPassword,
        newPassword,
        confirmPassword,
      };
  
      await axios.put('http://localhost:8080/updatePassword', passwordData);
  
      // Clear form fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password updated successfully.'); // Success message
    } catch (error) {
      if (error.response) {
        console.error('Error updating password:', error.response.data);
        toast.error(`Failed to update password: ${error.response.data.message || 'Server error'}`);
      } else {
        console.error('Error updating password:', error);
        toast.error('Failed to update password.');
      }
    }
  };
  

  return (
    <div className="container mt-5">
      <div className='row'>
        <div className="col-md-5">
          {/* Update Password */}
          <div id="updatePassword" className="update-password text center mt-1">
            <h3>Update Password</h3>
            <div className="form-group mb-3">
  <label htmlFor="oldPassword">Old Password:</label>
  <input
    type="password"
    className="form-control"
    id="oldPassword"
    value={oldPassword}
    onChange={(e) => {
      if (e.target.value.length <= 8) {
        setOldPassword(e.target.value);
      }
    }}
  />
</div>

<div className="form-group mb-3">
  <label htmlFor="newPassword">New Password:</label>
  <input
    type="password"
    className="form-control"
    id="newPassword"
    value={newPassword}
    onChange={(e) => {
      if (e.target.value.length <= 8) {
        setNewPassword(e.target.value);
      }
    }}
  />
</div>

<div className="form-group mb-3">
  <label htmlFor="confirmPassword">Confirm New Password:</label>
  <input
    type="password"
    className="form-control"
    id="confirmPassword"
    value={confirmPassword}
    onChange={(e) => {
      if (e.target.value.length <= 8) {
        setConfirmPassword(e.target.value);
      }
    }}
  />
</div>


            <button
              className="btn btn-primary"
              onClick={handleUpdatePassword}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
