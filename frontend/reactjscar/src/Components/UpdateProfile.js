import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './UpdateProfile.css'; // Import the CSS file

const UpdateProfile = () => {
  const [user, setUser] = useState({
    oldEmail: '',
    oldPassword: '',
    newEmail: '',
    newPassword: '',
  });

  // Fetch current user profile details when the component mounts
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:8080/profile'); // Fetch the current profile
        setUser((prev) => ({
          ...prev,
          oldEmail: response.data.email, // Assuming you want to pre-fill oldEmail with the current email
        }));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password length validation
    if (user.oldPassword.length !== 8 || user.newPassword.length !== 8) {
      toast.error('Both Old Password and New Password must be exactly 8 characters long.');
      return;
    }
  
    try {
      await axios.put('http://localhost:8080/profile', { // Update profile endpoint
        oldEmail: user.oldEmail,
        oldPassword: user.oldPassword,
        newEmail: user.newEmail,
        newPassword: user.newPassword,
      });
  
      toast.success('Profile updated successfully!'); // Show success toast
      // Clear form fields after successful update
      setUser({
        oldEmail: '',
        oldPassword: '',
        newEmail: '',
        newPassword: '',
      });
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      toast.error('Failed to update profile.'); // Show error toast
    }
  };
  

  return (
    <div className="update-profile-container">
      
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="oldEmail">Old Email:</label>
          <input
            id="oldEmail"
            name="oldEmail"
            type="email"
            className="form-control"
            value={user.oldEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            className="form-control"
            value={user.oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newEmail">New Email:</label>
          <input
            id="newEmail"
            name="newEmail"
            type="email"
            className="form-control"
            value={user.newEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            className="form-control"
            value={user.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
