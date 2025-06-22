import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Relative path from Header.js to AuthContext.js

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#440427',
      borderBottom: '1px solidrgb(87, 4, 59)',
      boxShadow: '0 2px 4px rgba(145, 25, 25, 0.05)'
    }}>
      <div className="logo">
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: 'bold', fontSize: '24px' }}>
          Ahadu Equib
        </Link>
      </div>
      <nav>
        {user && ( // Only show navigation if a user is logged in
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/dashboard" style={{ textDecoration: 'none',color: '#ffffff', fontWeight: '500' }}>Dashboard</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/equib-groups" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '500' }}>Equib Groups</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/create-equib-group" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: '500' }}>Create Equib</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/profile" style={{ textDecoration: 'none', color: '#ffffff',  fontWeight: '500' }}>Profile</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc3545', // Red color for logout
                  cursor: 'pointer',
                  fontSize: '19px',
                  fontWeight: '550',
                  padding: 0 // Remove default button padding
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;