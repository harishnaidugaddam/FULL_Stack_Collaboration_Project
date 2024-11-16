import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const ResearcherDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  // Fetch the logged-in user's name and list of users
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = sessionStorage.getItem("userID"); // Use sessionStorage

      if (userId) {
        try {
          console.log("Fetching user data for userID:", userId);

          // Fetch logged-in user’s name with GET request
          const userResponse = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_user.php?userID=${userId}`);
          const userResult = await userResponse.json();
          console.log("User fetch result:", userResult);

          if (userResult.status === "success" && userResult.data) {
            setUsername(userResult.data.fullName);
          } else {
            console.error("Error fetching user data:", userResult.message);
          }

          // Fetch list of all users for display
          const usersResponse = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_all_users.php`);
          const usersResult = await usersResponse.json();
          console.log("Users fetch result:", usersResult);

          if (usersResult.status === "success" && usersResult.data) {
            setUsers(usersResult.data);
          } else {
            console.error("Error fetching users data:", usersResult.message);
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.warn("No userID found in sessionStorage.");
      }
    };

    fetchUserData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleConnect = (userName) => {
    setModalMessage(`Connect invitation sent to ${userName}.`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center">RESEARCHER DASHBOARD</h2>
      <h2 className="text-center">Hi, {username || 'Loading...'}</h2>

      {/* Profile and Proposal Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Account Management</h4>
          <Link to="/profile1" className="btn brown-btn w-100 mt-2">Edit Profile</Link>
        </div>
        <div className="col-md-6">
          <h4>Proposal Submission</h4>
          <Link to="/submit-proposal" className="btn brown-btn w-100 mt-2">Submit a New Proposal</Link>
          <Link to="/view-proposals" className="btn brown-outline-btn w-100 mt-2">Track Their Status</Link>
        </div>
      </div>

      {/* Collaboration, Grants, and Events Section */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Collaborate with Peers</h4>
          <Link to="/collab-tools" className="btn brown-btn w-100 mt-2">Collaboration Tools</Link>
        </div>
        <div className="col-md-6">
          <h4>Recommended Grants</h4>
          <Link to="/grants" className="btn brown-btn w-100 mt-2">Potential Grant Opportunities</Link>
        </div>
        <div className="col-md-6 mt-4">
          <h4>Events</h4>
          <Link to="/events" className="btn brown-btn w-100 mt-2">Browse and Sign Up</Link>
          <Link to="/register-events" className="btn brown-outline-btn w-100 mt-2">Access Your Registered Events</Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-5">
        <h4>Search for Users</h4>
        <input
          type="text"
          placeholder="Search by name or role"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>

      {/* Search Results */}
      <div className="mt-3">
        {filteredUsers.length > 0 ? (
          <ul className="list-group">
            {filteredUsers.map((user) => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{user.fullName}</h5>
                  <p>Role: {user.role}</p>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleConnect(user.fullName)}
                >
                  Connect
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Custom Centered Modal */}
      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h5>Invitation Sent</h5>
            <p>{modalMessage}</p>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearcherDashboard;