import React, { useState, useEffect } from 'react';

const ManageProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    role: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Retrieve userID from sessionStorage
  const userID = sessionStorage.getItem("userID");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userID) {
        setMessage("User ID not found. Please log in again.");
        return;
      }

      try {
        const response = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_user.php?userID=${userID}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (result.status === "success") {
          setProfile(result.data);  // Set all fields directly from the response
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage("An error occurred while fetching the profile.");
      }
    };

    fetchProfile();
  }, [userID]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/update_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, userID }), // Include userID in the update request
      });

      const result = await response.json();

      if (result.status === "success") {
        setMessage("Profile updated successfully.");
        setIsEditing(false);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Profile</h2>
      {message && <p className="text-center text-info">{message}</p>}
      <div className="border p-4">
        <div className="mb-3">
          <label>Full Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <p>{profile.fullName}</p>
          )}
        </div>
        <div className="mb-3">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>
        <div className="mb-3">
          <label>Role:</label>
          <p>{profile.role}</p> {/* Role is displayed but not editable */}
        </div>

        <button className="btn btn-primary" onClick={handleEditToggle}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>

        {isEditing && (
          <button className="btn btn-success ms-3" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageProfile;