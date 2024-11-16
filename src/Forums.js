import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forums = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  // Fetch topics from the backend
  const fetchTopics = async () => {
    try {
      const response = await axios.get('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/get_topics.php');
      setTopics(response.data.topics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  // Add a new topic
  const handleAddTopic = async () => {
    if (newTopic.trim() !== '') {
      try {
        const response = await axios.post('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/add_topic.php', {
          title: newTopic,
        });
        alert(response.data.message);
        if (response.data.success) {
          fetchTopics(); // Refresh topics
        }
      } catch (error) {
        console.error('Error adding topic:', error);
      }
      setNewTopic('');
    }
  };

  // Fetch topics when the component loads
  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Forums</h2>
      <div className="list-group mt-3">
        {topics.map((topic, index) => (
          <div key={topic.id} className="list-group-item">
            <strong>{topic.title}</strong> - {topic.posts} posts
          </div>
        ))}
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Create a new topic..."
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTopic}>
          Add Topic
        </button>
      </div>
    </div>
  );
};

export default Forums;