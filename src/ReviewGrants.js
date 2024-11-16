import React, { useState, useEffect } from 'react';

const ReviewGrants = () => {
  const [proposals, setProposals] = useState([]);
  const [error, setError] = useState('');

  // Fetch Grants on component mount
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/fetch_applications.php');
        const data = await response.json();
        if (data.success) {
          setProposals(data.applications);
        } else {
          setError('No new proposals');
        }
      } catch (error) {
        setError('Error fetching proposals');
        console.error(error);
      }
    };

    fetchProposals();
  }, []);

  // Approve proposal
  const handleApprove = async (id) => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/update_application_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_id: id, status: 'Approved' }),
      });

      const result = await response.json();
      if (result.success) {
        setProposals(proposals.map(proposal =>
          proposal.id === id ? { ...proposal, status: 'Approved' } : proposal
        ));
      } else {
        setError('Failed to approve proposal');
      }
    } catch (error) {
      setError('Error updating proposal status');
      console.error(error);
    }
  };

  // Reject grants
  const handleReject = async (id) => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/update_application_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_id: id, status: 'Rejected' }),
      });

      const result = await response.json();
      if (result.success) {
        setProposals(proposals.map(proposal =>
          proposal.id === id ? { ...proposal, status: 'Rejected' } : proposal
        ));
      } else {
        setError('Failed to reject proposal');
      }
    } catch (error) {
      setError('Error updating proposal status');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Review Submitted Grant Applications</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Researcher</th>
            <th>Amount Requested</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.title}</td>
              <td>{proposal.researcher}</td>
              <td>{proposal.amount}</td>
              <td>
                <span 
                  className={`badge ${proposal.status === 'Approved' ? 'bg-success' : proposal.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                  {proposal.status}
                </span>
              </td>
              <td>
                {proposal.status === 'Pending' ? (
                  <>
                    <button className="btn btn-success btn-sm" onClick={() => handleApprove(proposal.id)}>
                      Approve
                    </button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleReject(proposal.id)}>
                      Reject
                    </button>
                  </>
                ) : (
                  <span>No Action Needed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewGrants;