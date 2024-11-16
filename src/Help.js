import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Help = () => {
  const [form, setForm] = useState({ name: '', email: '', query: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch userID from session storage
    const userID = sessionStorage.getItem('userID');
    console.log('Retrieved userID from session storage:', userID);
    console.log('All session storage data:', { ...sessionStorage }); // Debug all keys in session storage

    if (!userID) {
      setMessage('User ID not found. Please log in.');
      return;
    }

    // Add userID to the form data
    const formData = { ...form, userID };

    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/ContactSupport.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const text = await response.text(); // Get raw response text
      console.log('Raw response from server:', text);

      try {
        const result = JSON.parse(text); // Attempt to parse JSON
        if (response.ok) {
          setMessage(result.message); // Success
          setForm({ name: '', email: '', query: '' }); // Reset form
        } else {
          setMessage(result.message || 'Failed to submit your query.');
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        setMessage('Unexpected server response. Please contact support.');
      }
    } catch (error) {
      console.error('Error while submitting the form:', error);
      setMessage('Failed to connect to the server. Please try again later.');
    }
  };

  const faqs = [
    { question: 'How do I reset my password?', answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page." },
    { question: 'How can I update my profile information?', answer: 'Go to your profile page and click on the "Edit Profile" button to update your information.' },
    { question: 'How do I submit a proposal?', answer: 'You can submit a proposal by navigating to the "Proposals" section and clicking on "Submit New Proposal".' },
    { question: 'How can I search for grants?', answer: 'Use the search bar on the "Grants" page to search for available funding opportunities based on your criteria.' },
    { question: 'What is the role of a Funder?', answer: 'Funders review and grant funding to research proposals submitted by researchers on the platform.' },
    { question: 'How do I register for an event?', answer: 'Visit the "Events" page and click on the event you want to register for. You will see a "Register" button if the registration is open.' },
    { question: 'How can I collaborate with other researchers?', answer: 'You can search for researchers using the search bar and send them a connection request to start collaborating.' },
    { question: 'How do I contact support?', answer: 'You can fill out the support form below or send an email to support@collabhub.com.' },
    { question: 'Can I update or withdraw a proposal?', answer: 'Yes, you can update or withdraw a proposal from the "Proposals" section by clicking on the respective option.' },
    { question: 'How do I find resources and guides?', answer: 'Check the "Guides and Resources" section below for helpful information and external links.' },
  ];

  const guides = [
    { title: 'How to Write a Winning Research Proposal', link: 'https://example.com/research-proposal-guide' },
    { title: 'Connecting with Peers and Funders Effectively', link: 'https://example.com/connecting-guide' },
    { title: 'Finding and Applying for Grants', link: 'https://example.com/grants-guide' },
  ];

  return (
    <div className="container mt-5">
      <center><h2>Help and Support</h2></center>
      <div className="contact-form mt-5">
        <div className="login-container">
          <h3>Contact Support</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name:</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email:</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Query/Problem:</label>
              <textarea name="query" className="form-control" value={form.query} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          {message && <div className={`alert mt-3 ${message.includes('Failed') ? 'alert-danger' : 'alert-success'}`}>{message}</div>}
        </div>
      </div>
      <div className="faq mt-3">
        <h3>Frequently Asked Questions</h3>
        <ul className="list-group">
          {faqs.map((faq, index) => (
            <li key={index} className="list-group-item">
              <strong>{faq.question}</strong>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="guides mt-5">
        <h3>User Guides and Tutorials</h3>
        <ul className="list-group">
          {guides.map((guide, index) => (
            <li key={index} className="list-group-item">
              <strong>{guide.title}</strong> - 
              <a href={guide.link} target="_blank" rel="noopener noreferrer"> Read more</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Help;
