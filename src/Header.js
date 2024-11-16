import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">The Research Collaboration Hub</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Dashboards
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {userRole === "Researcher" && <li><Link className="dropdown-item" to="/researcher">Researcher</Link></li>}
                    {userRole === "Admin" && <li><Link className="dropdown-item" to="/admin">Admin</Link></li>}
                    {userRole === "Funder" && <li><Link className="dropdown-item" to="/funder">Funder</Link></li>}
                  </ul>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout} style={{ color: 'white' }}>
                    Logout
                  </button>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/help">Help & Support</Link></li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/help">Help & Support</Link></li>
                
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;