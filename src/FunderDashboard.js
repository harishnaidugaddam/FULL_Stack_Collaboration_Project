import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const FunderDashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    position: '',
  });

  // Fetch user profile data from the backend
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/getFunderProfile.php');
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setProfile({
          fullName: data.user.fullName,
          email: data.user.email,
          position: data.user.role, // role as position
        });
      } else {
        console.error('Error fetching user data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <center><h1>FUNDER DASHBOARD</h1></center>
      <h2 className="text-center">Hi, {user ? user.fullName : 'Loading...'}!</h2>
      <h1 className="text-center">Welcome to your Funder Dashboard</h1>

      {/* Profile Management Section */}
      <div className="mt-4">
        <h4>Profile</h4>
        <div className="mt-3">
          <p><strong>Full Name:</strong> {profile.fullName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Position:</strong> {profile.position}</p>
        </div>
      </div>

      {/* Dashboard Links */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Review Grants</h4>
          <Link to="/review-grants" className="btn brown-outline-btn w-100 mt-2">Review Submitted Grant Applications</Link>
        </div>
        <div className="col-md-6">
          <h4>Manage Grants</h4>
          <Link to="/manage-grants" className="btn brown-outline-btn w-100 mt-2">Create & Manage Grants</Link>
        </div>
        <div className="col-md-6 mt-4">
          <h4>Events</h4>
          <Link to="/events" className="btn brown-outline-btn w-100 mt-2">View & Register for Events</Link>
          <Link to="/register-events" className="btn brown-outline-btn w-100 mt-2">Access Your Registered Events</Link>
        </div>
        <div className="col-md-6 mt-4">
          <h4>ReviewProposals</h4>
          <Link to="/review-proposals" className="btn brown-outline-btn w-100 mt-2">Review Submitted Proposals</Link>
        </div>
      </div>
    </div>
  );
};

export default FunderDashboard;
