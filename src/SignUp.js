import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Researcher', // Default role to "Researcher"
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(''); // To display success or error messages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};

    if (!form.fullName.trim()) {
      formErrors.fullName = "Full name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      formErrors.email = "Email is required.";
    } else if (!emailPattern.test(form.email)) {
      formErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      formErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/signup.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const result = await response.json();

        if (result.status === "success") {
          setMessage("User registered successfully.");
          setForm({ fullName: '', email: '', password: '', role: 'Researcher' }); // Reset form
        } else {
          setMessage(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="signup-container">
        <h2 className="text-center">Sign Up</h2>
        {message && <p className="text-center text-info">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name:</label>
            <input
              type="text"
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <label>Role:</label>
            <select
              name="role"
              className="form-control"
              value={form.role}
              onChange={handleChange}
            >
              <option value="Researcher">Researcher</option>
              <option value="Funder">Funder</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          <p className="text-center mt-3" style={{ color: 'black' }}>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
      <div className="auth-image-container">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/011/345/227/small_2x/teenage-showing-how-to-sign-up-3d-cartoon-character-illustration-png.png"
          alt="Signup Visual"
        />
      </div>
    </div>
  );
};

export default SignUp;