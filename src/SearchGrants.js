import React, { useState, useEffect, useCallback } from 'react';

const SearchGrants = () => {
  const [allGrants, setAllGrants] = useState([]); // All grants from backend
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGrants, setFilteredGrants] = useState([]);
  const [appliedGrants, setAppliedGrants] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all applied grants for the user on component mount
  const fetchAppliedGrants = useCallback(async () => {
    const userId = sessionStorage.getItem("userID");

    if (!userId) {
      setMessage("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_applied_grants.php?user_id=${userId}`);
      const data = await response.json();

      if (data.success) {
        setAppliedGrants(data.appliedGrants); // Set applied grants from backend
      } else {
        setMessage('Failed to fetch applied grants status.');
      }
    } catch (error) {
      console.error('Error fetching applied grants status:', error);
      setMessage('Error fetching applied grants status.');
    }
  }, []);

  useEffect(() => {
    fetchGrants(); // Fetch all available grants
    fetchAppliedGrants(); // Fetch the user's applied grants
  }, [fetchAppliedGrants]);

  // Fetch all grants
// Replace fetch URL with user ID parameter
const fetchGrants = async () => {
  const userId = sessionStorage.getItem("userID"); // Retrieve the user ID from session storage
  try {
    const response = await fetch(`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_grants.php?user_id=${userId}`);
    const data = await response.json();
    if (data.success) {
      setAllGrants(data.grants);
      setFilteredGrants(data.grants); // Initialize filtered grants
    } else {
      setMessage('No grants Available');
    }
  } catch (error) {
    console.error('Error fetching grants:', error);
    setMessage('Error fetching grants.');
  }
};

  // Filter grants based on search term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredGrants(allGrants);
    } else {
      setFilteredGrants(
        allGrants.filter((grant) =>
          grant.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  // Apply for a grant and update status in backend and frontend
  const handleApply = async (grant) => {
    const payload = { user_id: sessionStorage.getItem("userID"), grant_id: grant.id };

    try {
      const response = await fetch("http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/apply_for_grant.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        // Add the newly applied grant to appliedGrants with status 'Pending'
        setAppliedGrants([...appliedGrants, { ...grant, status: 'Pending' }]);
        setMessage('Application submitted successfully');
      } else {
        setMessage(result.message || 'Error applying for grant.');
      }
    } catch (error) {
      console.error("Error applying for grant:", error);
      setMessage('Error applying for grant.');
    }
  };

  // Check if a grant is already applied for, based on appliedGrants array
  const isGrantApplied = (grantId) => {
    return appliedGrants.some((grant) => grant.id === grantId);
  };

  return (
    <div className="container mt-5">
      <h2>Search for Grants</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search grants related to Data Science..."
          className="form-control"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGrants.map((grant) => (
            <tr key={grant.id}>
              <td>{grant.title}</td>
              <td>{grant.amount}</td>
              <td>{grant.deadline}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleApply(grant)}
                  disabled={isGrantApplied(grant.id)}
                >
                  {isGrantApplied(grant.id) ? 'Applied' : 'Apply'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5">
        <h4>Applied Grants Status</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appliedGrants.map((grant) => (
              <tr key={grant.id}>
                <td>{grant.title}</td>
                <td>{grant.amount}</td>
                <td>{grant.deadline}</td>
                <td>{grant.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchGrants;