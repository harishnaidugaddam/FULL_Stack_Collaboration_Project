import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileSharing = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch uploaded files from the server
  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/get_files.php');
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/file_upload.php', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert(response.data.message);
        if (response.data.success) {
          fetchFiles(); // Refresh files after upload
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>File Sharing</h2>
      <div className="mb-3">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button className="btn btn-primary ms-3" onClick={handleFileUpload}>
          Upload
        </button>
      </div>
      <h4>Uploaded Files</h4>
      {files.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>File Name</th>
              <th>File Size</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file.id}>
                <td>{index + 1}</td>
                <td>{file.file_name}</td>
                <td>{file.file_size}</td>
                <td>{file.upload_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileSharing;