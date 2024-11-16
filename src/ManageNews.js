import React, { useState, useEffect } from 'react';

const ManageNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [newNews, setNewNews] = useState({ title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/News.php?action=fetch');
      const data = await response.json();
      if (data.success) {
        setNewsList(data.news);
      }
    } catch (error) {
      setError('Failed to fetch news. Please ensure the server is running.');
    }
  };

  const handleChange = (e) => {
    setNewNews({ ...newNews, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateNews = async () => {
    const action = isEditing ? 'update' : 'add';
    const payload = { action, data: { ...newNews, id: editingNewsId } };

    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/News.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        fetchNews();  // Refresh news list
        setNewNews({ title: '', content: '' });
        setIsEditing(false);
        setEditingNewsId(null);
      } else {
        setError(result.message || 'Error adding/updating news.');
      }
    } catch (error) {
      setError('Failed to add/update news. Please try again.');
    }
  };

  const handleEditNews = (id) => {
    const newsToEdit = newsList.find((news) => news.id === id);
    setNewNews({ title: newsToEdit.title, content: newsToEdit.content });
    setIsEditing(true);
    setEditingNewsId(id);
  };

  const handleDeleteNews = async (id) => {
    try {
      const response = await fetch('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/News.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', data: { id } }),
      });

      const result = await response.json();
      if (result.success) {
        setNewsList(newsList.filter((news) => news.id !== id)); // Remove from UI immediately
      } else {
        setError(result.message || 'Failed to delete news.');
      }
    } catch (error) {
      setError('Failed to delete news. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add News</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="text"
          name="title"
          value={newNews.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-control mb-2"
        />
        <textarea
          name="content"
          value={newNews.content}
          onChange={handleChange}
          placeholder="Content"
          className="form-control mb-2"
        ></textarea>
        <button className="btn btn-primary" onClick={handleAddOrUpdateNews}>
          {isEditing ? 'Update News' : 'Add News'}
        </button>
      </div>

      <h2>Latest News & Updates</h2>
      <ul className="list-group">
        {newsList.map((news) => (
          <li key={news.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{news.title}</h5>
              <p>{news.content}</p>
              <small>Uploaded on: {news.uploaded_date}</small>
            </div>
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => handleEditNews(news.id)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteNews(news.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageNews;