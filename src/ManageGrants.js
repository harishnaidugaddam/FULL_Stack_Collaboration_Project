import React, { useState, useEffect } from 'react';

const ManageGrants = () => {
  const [grants, setGrants] = useState([]);
  const [newGrant, setNewGrant] = useState({
    title: '',
    description: '',
    funder: '',
    amount: '',
    deadline: '',
    eligibility: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentGrantId, setCurrentGrantId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/Grants.php?action=fetch');
      const data = await response.json();
      if (data.success) {
        setGrants(data.grants);
      } else {
        setGrants([]); // Clear grants if no data is found
      }
    } catch (error) {
      console.error('Fetch grants error:', error);
      setError('Failed to fetch grants. Please ensure the server is running and the endpoint is correct.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      if (!/^\d*$/.test(value)) {  // Only allow numbers
        setError("Amount must be a numeric value.");
        return;
      } else {
        setError("");  // Clear error if input is valid
      }
    }
    setNewGrant({ ...newGrant, [name]: value });
  };

  const handleAddOrUpdateGrant = async () => {
    setError('');
    if (newGrant.title && newGrant.amount && newGrant.deadline) {
      try {
        const action = editMode ? 'update' : 'add';
        const payload = { action, data: { ...newGrant, id: currentGrantId } };

        const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/Grants.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (result.success) {
          fetchGrants();
          setNewGrant({ title: '', description: '', funder: '', amount: '', deadline: '', eligibility: '' });
          setEditMode(false);
          setCurrentGrantId(null);
        } else {
          setError(result.message || 'Error adding/updating grant.');
        }
      } catch (error) {
        setError('Failed to add/update grant. Please try again.');
      }
    } else {
      setError('Title, amount, and deadline are required.');
    }
  };

  const handleEditGrant = (id) => {
    const grant = grants.find((grant) => grant.id === id);
    setNewGrant({
      title: grant.title,
      description: grant.description,
      funder: grant.funder,
      amount: grant.amount,
      deadline: grant.deadline,
      eligibility: grant.eligibility
    });
    setEditMode(true);
    setCurrentGrantId(id);
  };

  const handleDeleteGrant = async (id) => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/Grants.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id } }),
      });

      const result = await response.json();
      if (result.success) {
        fetchGrants();
      } else {
        setError(result.message || 'Failed to delete grant.');
      }
    } catch (error) {
      setError('Failed to delete grant. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Current Grants</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Funder</th>
            <th>Amount</th>
            <th>Deadline</th>
            <th>Eligibility</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grants.map((grant) => (
            <tr key={grant.id}>
              <td>{grant.title}</td>
              <td>{grant.description}</td>
              <td>{grant.funder}</td>
              <td>{grant.amount}</td>
              <td>{grant.deadline}</td>
              <td>{grant.eligibility}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditGrant(grant.id)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteGrant(grant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4">
        <h4>{editMode ? 'Update Project' : 'Add New Grant'}</h4>
        <div className="mb-3">
          <label>Title:</label>
          <input type="text" name="title" value={newGrant.title} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <input type="text" name="description" value={newGrant.description} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Funder:</label>
          <input type="text" name="funder" value={newGrant.funder} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Amount:</label>
          <input type="text" name="amount" value={newGrant.amount} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Deadline:</label>
          <input type="date" name="deadline" value={newGrant.deadline} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Eligibility:</label>
          <input type="text" name="eligibility" value={newGrant.eligibility} onChange={handleChange} className="form-control" />
        </div>
        <button className="btn btn-primary" onClick={handleAddOrUpdateGrant}>
          {editMode ? 'Update Grant' : 'Add Grant'}
        </button>
      </div>
    </div>
  );
};

export default ManageGrants;