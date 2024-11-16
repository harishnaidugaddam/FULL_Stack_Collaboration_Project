import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the email exists on the server
      const response = await fetch("http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/forgot_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (result.status === "success") {
        setShowPasswordField(true);
        setMessage("Email verified. Please enter your new password.");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the password on the server
      const response = await fetch("http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/forgot_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });

      const result = await response.json();
      if (result.status === "success") {
        setMessage("Password has been successfully updated. You may now log in with your new password.");
        setShowPasswordField(false);
        setEmail('');
        setNewPassword('');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <div className="login-container p-4 shadow rounded">
        <h2 className="text-center mb-4">Forgot Password</h2>
        <p className="text-center">Enter your email to verify your identity.</p>
        
        {!showPasswordField ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Verify Email</button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">New Password:</label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Password</button>
          </form>
        )}

        {message && (
          <div className={`alert mt-3 ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;