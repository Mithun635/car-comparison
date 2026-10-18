import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = async () => {
    debugger;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields.'); // Use toast for error messages
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.'); // Use toast for error messages
      return;
    }

    try {
      const passwordData = {
        oldPassword,
        newPassword,
        confirmPassword
      };

      await axios.put('http://localhost:8080/updatePassword', passwordData);

      // Clear form fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password updated successfully.'); // Use toast for success messages
    } catch (error) {
      if (error.response) {
        console.error('Error updating password:', error.response.data);
        toast.error(`Failed to update password: ${error.response.data.message || 'Server error'}`); // Use toast for error messages
      } else {
        console.error('Error updating password:', error);
        toast.error('Failed to update password.'); // Use toast for error messages
      }
    }
  };

  return (

    <div className="container mt-5">
  
      <div className='row'>
      <div className="col-md-5">
      {/* Update Password */}
      <div id="updatePassword" className="mt-1">
        <h3>Update Password</h3>
        <div className="form-group mb-3">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary "
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
