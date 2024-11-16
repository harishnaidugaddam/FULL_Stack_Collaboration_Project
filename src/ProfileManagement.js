// src/components/researcher/ProfileManagement.js
import React, { useState } from 'react';

const ProfileManagement = () => {
  const [profile, setProfile] = useState({
    name: '',
    position: '',
    department: '',
    researchInterest: '',
    expertise: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic
    console.log('Profile Updated:', profile);
  };

  return (
    <div className="container mt-5">
      <h2>Profile Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Position:</label>
          <input
            type="text"
            name="position"
            value={profile.position}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={profile.department}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Research Interest:</label>
          <input
            type="text"
            name="researchInterest"
            value={profile.researchInterest}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Expertise:</label>
          <input
            type="text"
            name="expertise"
            value={profile.expertise}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileManagement;
