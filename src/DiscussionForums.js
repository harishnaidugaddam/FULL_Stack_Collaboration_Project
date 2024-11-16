import React, { useState } from 'react';

const DiscussionForums = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Add new post function
  const handleAddPost = () => {
    if (newPost.trim()) {
      const newDiscussion = {
        id: posts.length + 1,
        author: 'You',
        text: newPost,
        timestamp: new Date(),
      };
      setPosts([...posts, newDiscussion]);
      setNewPost('');
    }
  };

  // Delete post function
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="container mt-5">
      <h2>Discussion Forums</h2>

      {/* Discussion Posts */}
      <div className="border p-3 mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="mb-3">
              <strong>{post.author}</strong>: {post.text}
              <small className="text-muted d-block">
                {post.timestamp.toLocaleString()}
              </small>
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
              <hr />
            </div>
          ))
        ) : (
          <p>No discussions yet. Be the first to start a discussion!</p>
        )}
      </div>

      {/* Add new discussion */}
      <textarea
        className="form-control mb-3"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Share your thoughts..."
      />
      <button className="btn btn-primary" onClick={handleAddPost}>
        Add Post
      </button>
    </div>
  );
};

export default DiscussionForums;
