import React, { useState } from 'react';

const SubmitProposal = () => {
  const [proposal, setProposal] = useState({
    title: '',
    description: '',
    file: null,
    amount: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProposal({
      ...proposal,
      [name]: name === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", proposal.title);
    formData.append("description", proposal.description);
    formData.append("file", proposal.file);
    formData.append("amount", proposal.amount);

    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/SubmitProposal.php', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setErrorMessage('');
      } else {
        setErrorMessage(result.message || 'An error occurred while submitting the proposal.');
      }
    } catch (error) {
      setErrorMessage('Failed to submit proposal. Please try again later.');
      console.error('Error submitting proposal:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Proposal</h2>
      {isSubmitted ? (
        <div className="alert alert-success">
          <h4>Proposal Submitted</h4>
          <p>Your proposal has been successfully submitted.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="mb-3">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={proposal.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Description:</label>
            <textarea
              name="description"
              value={proposal.description}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Upload File:</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Amount Requested:</label>
            <input
              type="number"
              name="amount"
              value={proposal.amount}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit Proposal</button>
        </form>
      )}
    </div>
  );
};

export default SubmitProposal;