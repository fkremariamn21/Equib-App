import React from 'react';
import './Button.css'; // You can create a simple CSS file for styling

const Button = ({ children, onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="custom-button" // Apply a class for styling
    >
      {children}
    </button>
  );
};

export default Button;