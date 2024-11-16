import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/Chava_Akkina_Abdul_Bandi_Bandi_Bathala/PHP/logout.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Clear localStorage and redirect to login
      localStorage.removeItem("userID");
      localStorage.removeItem("userRole");
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;