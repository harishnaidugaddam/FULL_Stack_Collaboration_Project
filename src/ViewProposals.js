import React, { useState, useEffect } from 'react';

const ViewProposals = () => {
  const [proposals, setProposals] = useState([]);

  // Fetch proposals from the PHP backend
  useEffect(() => {
    fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/GetProposals.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setProposals(data))
      .catch(error => console.error('Error fetching proposals:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Track Submitted Proposals</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Amount</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal, index) => (
            <tr key={index}>
              <td>{proposal.title}</td>
              <td>{proposal.status}</td>
              <td>{proposal.amount}</td>
              <td>
                {/* Create a clickable link to the file */}
                <a
                  href={`http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/${proposal.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {proposal.file}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProposals;