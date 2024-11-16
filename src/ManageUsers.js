import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: 'Researcher', email: '', password: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the database
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_all_users.php'); // Replace with correct URL
      const data = await response.json();
      if (data.status === 'success') {
        setUsers(data.data); // Assuming your PHP returns user data under 'data' key
      } else {
        setMessage(data.message || 'Failed to fetch users.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Error fetching users.');
    }
  };

  // Add or update user
  const handleAddOrUpdateUser = async () => {
    if (editMode) {
      // Update user logic
      try {
        const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/update_user.php', { // Replace with correct PHP endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingUserId, name: newUser.name, role: newUser.role, email: newUser.email, password: newUser.password }),
        });
        const result = await response.json();
        if (result.success) {
          setUsers(users.map((user) =>
            user.id === editingUserId ? { ...user, ...newUser } : user
          ));
          setMessage('User updated successfully.');
        } else {
          setMessage(result.message || 'Failed to update user.');
        }
      } catch (error) {
        console.error('Error updating user:', error);
        setMessage('Error updating user.');
      }

      setEditMode(false);
      setEditingUserId(null);
    } else {
      // Add user logic
      try {
        const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/add_user.php', { // Replace with correct PHP endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });
        const result = await response.json();
        if (result.success) {
          setUsers([...users, { ...newUser, id: users.length + 1 }]); // Assuming the user ID is auto-generated
          setMessage('User added successfully.');
        } else {
          setMessage(result.message || 'Failed to add user.');
        }
      } catch (error) {
        console.error('Error adding user:', error);
        setMessage('Error adding user.');
      }
    }

    // Reset form after add or update
    setNewUser({ name: '', role: 'Researcher', email: '', password: '' });
  };

  const handleDeleteUser = async (id) => {
    try {
        const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/delete_user.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        const result = await response.json();
        if (result.status === 'success') {
            setUsers(users.filter((user) => user.id !== id));  // Remove the deleted user from the list
            setMessage('User deleted successfully.');
        } else {
            setMessage(result.message || 'Failed to delete user.');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        setMessage('Error deleting user.');
    }
};
  // Edit user
  const handleEditUser = (user) => {
    setNewUser({ name: user.name, role: user.role, email: user.email, password: '' });
    setEditMode(true);
    setEditingUserId(user.id);
  };

  return (
    <div className="container mt-5">
      <h2>User Management</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="mb-3">
        <input
          type="text"
          placeholder="User Name"
          value={newUser.name || ''} // Ensure the value is never undefined
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email || ''} // Ensure the value is never undefined
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password || ''} // Ensure the value is never undefined
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="form-control mb-2"
        />
        <select
          className="form-control mb-2"
          value={newUser.role || 'Researcher'} // Ensure the value is never undefined
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="Researcher">Researcher</option>
          <option value="Funder">Funder</option>
          <option value="Admin">Admin</option>
        </select>
        <button className="btn btn-primary" onClick={handleAddOrUpdateUser}>
          {editMode ? 'Update User' : 'Add User'}
        </button>
      </div>

      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{user.name}</h5>
              <p>Email: {user.email} | Role: {user.role}</p>
            </div>
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEditUser(user)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;