import React, { useState, useEffect } from 'react';

const ReviewProposals = () => {
  const [proposals, setProposals] = useState([]);

  // Fetch proposals from the database
  useEffect(() => {
    fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/UpdateProposalStatus.php')
      .then(response => response.json())
      .then(data => setProposals(data))
      .catch(error => console.error('Error fetching proposals:', error));
  }, []);

  // Handle approve action
  const handleApprove = (id) => {
    const updatedProposals = proposals.map((proposal) =>
      proposal.id === id ? { ...proposal, status: 'Accepted' } : proposal
    );
    setProposals(updatedProposals);

    // Send status update to the backend
    fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/UpdateProposalStatus.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status: 'Accepted' }),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          console.error('Failed to update status');
        }
      })
      .catch(error => console.error('Error updating status:', error));
  };

  // Handle reject action
  const handleReject = (id) => {
    const updatedProposals = proposals.map((proposal) =>
      proposal.id === id ? { ...proposal, status: 'Rejected' } : proposal
    );
    setProposals(updatedProposals);

    // Send status update to the backend
    fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/UpdateProposalStatus.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status: 'Rejected' }),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          console.error('Failed to update status');
        }
      })
      .catch(error => console.error('Error updating status:', error));
  };

  return (
    <div className="container mt-5">
      <h2>Review Submitted Proposals</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Amount Requested</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.title}</td>
              <td>{proposal.description}</td>
              <td>{proposal.amount}</td>
              <td>
                <span
                  className={`badge ${
                    proposal.status === 'Accepted'
                      ? 'bg-success'
                      : proposal.status === 'Rejected'
                      ? 'bg-danger'
                      : 'bg-warning'
                  }`}
                >
                  {proposal.status}
                </span>
              </td>
              <td>
                {proposal.status === 'Pending' ? (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(proposal.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleReject(proposal.id)}
                    >
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

export default ReviewProposals;