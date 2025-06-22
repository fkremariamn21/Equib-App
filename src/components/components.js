import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#6341fa',
      borderBottom: '1px solid #e9ecef'
    }}>
      <div className="logo">
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold', fontSize: '24px' }}>
          Ahadu Equib
        </Link>
      </div>
      <nav>
        {user && (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/equib-groups" style={{ textDecoration: 'none', color: '#333' }}>Equib Groups</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/create-equib-group" style={{ textDecoration: 'none', color: '#333' }}>Create Equib</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>Profile</Link>
            </li>
            <li style={{ marginLeft: '20px' }}>
              <button onClick={logout} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '16px' }}>Logout</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;