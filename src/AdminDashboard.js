// src/components/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Manage Users</h4>
          <Link to="/manage-users" className="btn brown-outline-btn w-100 mt-2">User Management</Link>
        </div>
        <div className="col-md-6">
          <h4>Manage Events</h4>
          <Link to="/adminevents" className="btn brown-outline-btn w-100 mt-2">Manage Events</Link>
        </div>
        <div className="col-md-6 mt-4">
          <h4>Manage Grants</h4>
          <Link to="/manage-grants" className="btn brown-outline-btn w-100 mt-2">Manage Grants</Link>
        </div>
        <div className="col-md-6 mt-4">
          <h4>News & Updates</h4>
          <Link to="/manage-news" className="btn brown-outline-btn w-100 mt-2">Manage News & Updates</Link>
        </div>
        <div className="col-md-6 mt-4">
          <h4>Help & Support</h4>
          <Link to="/manage-support" className="btn brown-outline-btn w-100 mt-2">Manage Help & Support</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
