import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state based on sessionStorage values
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("userID"));
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole"));
  const [userID, setUserID] = useState(sessionStorage.getItem("userID"));

  const login = (id, role) => {
    setUserID(id);
    setUserRole(role);
    setIsLoggedIn(true);
    sessionStorage.setItem("userID", id);
    sessionStorage.setItem("userRole", role);
  };

  const logout = () => {
    setUserID(null);
    setUserRole(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};