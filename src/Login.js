import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.status === "success") {
        setErrorMessage('');
        
        // Store userID and role in sessionStorage instead of localStorage
        sessionStorage.setItem("userID", result.userID);
        sessionStorage.setItem("userRole", result.role);

        // Update global auth state
        login(result.userID, result.role);

        // Redirect based on user role
        if (result.role === "Researcher") {
          navigate('/researcher');
        } else if (result.role === "Funder") {
          navigate('/funder');
        } else if (result.role === "Admin") {
          navigate('/admin');
        }
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center">
      <div className="login-container p-4 shadow rounded">
        <h2 className="text-center mb-4">Login</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>

          <div className="text-center mt-3">
            <p style={{ color: 'black' }}>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
            <p style={{ color: 'black' }}>
              Forgot Password? <Link to="/forgot-password">Click here</Link>
            </p>
          </div>
        </form>
      </div>

      <div className="auth-image-container ms-4">
        <img
          src="https://www.pngall.com/wp-content/uploads/15/Login-PNG-Photos.png"
          alt="Login Visual"
          className="img-fluid rounded"
        />
      </div>
    </div>
  );
};

export default Login;