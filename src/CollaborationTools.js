// src/components/researcher/CollaborationTools.js
import React from 'react';
import { Link } from 'react-router-dom';

const CollaborationTools = () => {
  return (
    <div className="container mt-5">
      <h2>Collaboration Tools</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <Link to="/chat" className="btn brown-btn w-100">Chat</Link>
        </div>
        <div className="col-md-4">
          <Link to="/forums" className="btn brown-btn w-100">Discussion Forums</Link>
        </div>
        <div className="col-md-4">
          <Link to="/file-sharing" className="btn brown-btn w-100">File Sharing</Link>
        </div>
      </div>
    </div>
  );
};

export default CollaborationTools;
