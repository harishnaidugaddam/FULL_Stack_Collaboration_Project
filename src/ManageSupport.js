import React, { useState, useEffect } from 'react';

const ManageSupport = () => {
  const [supportItems, setSupportItems] = useState([]);
  const [newItem, setNewItem] = useState({ question: '', answer: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchSupportItems();
  }, []);

  const fetchSupportItems = async () => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/HelpSupport.php?action=fetch');
      const data = await response.json();
      if (data.success) {
        setSupportItems(data.supportItems);
      }
    } catch (error) {
      console.error('Failed to fetch support items:', error);
    }
  };

  const handleAnswerQuestion = (id, question) => {
    setNewItem({ question, answer: '' });
    setEditMode(true);
    setEditingItemId(id);
  };

  const handleSubmitAnswer = async () => {
    if (!newItem.answer) {
      alert('Please provide an answer.');
      return;
    }
    try {
      const payload = { action: 'answer', data: { id: editingItemId, answer: newItem.answer } };
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/HelpSupport.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        fetchSupportItems();
        setNewItem({ question: '', answer: '' });
        setEditMode(false);
        setEditingItemId(null);
      } else {
        alert(result.message || 'Failed to submit answer.');
      }
    } catch (error) {
      alert('Failed to submit answer. Please try again.');
    }
  };

  const unansweredQuestions = supportItems.filter((item) => !item.answered);
  const completedQueries = supportItems.filter((item) => item.answered);

  return (
    <div className="container mt-5">
      <h2>Manage Support Queries</h2>


      <ul className="list-group mb-4">
        {unansweredQuestions.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{item.question}</strong>
            </div>
            <button className="btn btn-success btn-sm" onClick={() => handleAnswerQuestion(item.id, item.question)}>
              Provide Answer
            </button>
          </li>
        ))}
      </ul>

      {/* Answering a Question Section */}
      {editMode && (
        <div className="mt-4">
          <h4>Provide Answer</h4>
          <div className="mb-3">
            <label>Question:</label>
            <input type="text" name="question" value={newItem.question} readOnly className="form-control mb-2" />
          </div>
          <div className="mb-3">
            <label>Your Answer:</label>
            <textarea name="answer" value={newItem.answer} onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })} className="form-control mb-2" />
          </div>
          <button className="btn btn-primary" onClick={handleSubmitAnswer}>
            Submit Answer
          </button>
        </div>
      )}

      {/* Completed Support Queries */}
      <h3 className="mt-5">Answered Support Queries</h3>
      <ul className="list-group">
        {completedQueries.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.question}</strong>
            <p><strong>Answer:</strong> {item.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSupport;