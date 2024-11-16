import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center p-3">
      <p className="mb-0">&copy; 2024 Research Collaboration Hub. All Rights Reserved.</p>
      <p className="mb-0">
        Connect with us on 
        <a href="https://facebook.com" className="text-white ms-2"> Facebook</a>, 
        <a href="https://twitter.com" className="text-white ms-2"> Twitter</a>, and 
        <a href="https://linkedin.com" className="text-white ms-2"> LinkedIn</a>.
      </p>
    </footer>
  );
};

export default Footer;
