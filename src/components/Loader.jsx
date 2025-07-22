import React from 'react';
import './Loader.css';
import logo from '../assets/react.svg'; 

const Loader = () => {
  return (
    <div className="loader-page">
      <img src={logo} alt="SmartLog Logo" className="logo-bounce" />
      <h2 className="loader-text">SmartLog is getting ready...</h2>
    </div>
  );
};

export default Loader;
