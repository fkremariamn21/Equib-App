// src/pages/EquibGroups/EquibGroupListPage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as needed
import './EquibGroupListPage.css'; // Optional: for specific styling

const EquibGroupListPage = () => {
  const { user, isLoading: authLoading } = useAuth(); // Get authenticated user and auth loading state

  const [equibGroups, setEquibGroups] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading) { // Only fetch when auth status is known
      const fetchEquibGroups = async () => {
        setDataLoading(true);
        setError(null);
        try {
          // --- Simulate API call to fetch equib groups ---
          // In a real app, you would make an actual API request here:
          // const response = await fetch('/api/equib-groups', {
          //   headers: {
          //     'Authorization': user ? `Bearer ${user.token}` : '', // Include token if logged in
          //     'Content-Type': 'application/json'
          //   }
          // });
          // if (!response.ok) {
          //   throw new Error(`HTTP error! status: ${response.status}`);
          // }
          // const data = await response.json();
          // setEquibGroups(data);

          // --- Dummy Data for demonstration ---
          setTimeout(() => {
            const dummyGroups = [
              {
                id: 'eqb-123',
                name: 'Ahadu Community Equib Alpha',
                description: 'A friendly monthly equib group for community members facilitated by Ahadu Bank.',
                contributionAmount: 5000,
                contributionFrequency: 'monthly',
                numberOfMembers: 6,
                currentMembers: 4,
                startDate: '2025-07-01',
                privacy: 'public',
                creatorId: 'user1', // Example creator ID
              },
              {
                id: 'eqb-456',
                name: 'Ahadu Staff Equib',
                description: 'Internal staff equib for team building.',
                contributionAmount: 2000,
                contributionFrequency: 'weekly',
                numberOfMembers: 5,
                currentMembers: 5,
                startDate: '2025-06-01',
                privacy: 'private',
                creatorId: 'user7',
              },
              {
                id: 'eqb-789',
                name: 'Ethiopian Diaspora Equib',
                description: 'Online equib for diaspora members.',
                contributionAmount: 10000,
                contributionFrequency: 'bi-monthly',
                numberOfMembers: 10,
                currentMembers: 8,
                startDate: '2025-08-15',
                privacy: 'public',
                creatorId: 'user3',
              },
              {
                id: 'eqb-012',
                name: 'Ahadu Branch Equib G.1',
                description: 'For employees of Bole Branch Group 1.',
                contributionAmount: 3000,
                contributionFrequency: 'monthly',
                numberOfMembers: 7,
                currentMembers: 3,
                startDate: '2025-09-01',
                privacy: 'private',
                creatorId: 'user1', // Current user might be creator for this dummy too
              }
            ];

            // Filter groups based on user's login status and privacy
            const filteredGroups = dummyGroups.filter(group => {
              if (group.privacy === 'public') {
                return true; // Always show public groups
              }
              // For private groups, only show if user is logged in AND associated (e.g., creator)
              // In a real app, you'd check if user.id is in group.members
              return user && (group.creatorId === user.id || group.members?.some(m => m.id === user.id));
            });

            setEquibGroups(filteredGroups);
            setDataLoading(false);
          }, 1500); // Simulate network delay
          // --- End Dummy Data ---

        } catch (err) {
          console.error("Failed to fetch equib groups:", err);
          setError("Failed to load equib groups. Please try again.");
          setDataLoading(false);
        }
      };

      fetchEquibGroups();
    }
  }, [authLoading, user]); // Re-run effect if auth status or user changes

  // Handle loading states
  if (authLoading || dataLoading) {
    return (
      <div className="equib-group-list-container loading-state">
        <p>{authLoading ? 'Authenticating user...' : 'Loading Equib groups...'}</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="equib-group-list-container error-state">
        <h2>Error Loading Groups</h2>
        <p>{error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  // Render the list of groups
  return (
    <div className="equib-group-list-page">
      <div className="list-header">
        <h1>Available Equib Groups</h1>
        <Link to="/equib-groups/create" className="button primary">
          + Create New Equib Group
        </Link>
      </div>

      {equibGroups.length === 0 ? (
        <p className="no-groups-message">
          No Equib groups found. {user ? "Why not create one?" : "Please log in to see more groups or create your own!"}
        </p>
      ) : (
        <div className="group-cards-container">
          {equibGroups.map((group) => (
            <div key={group.id} className="equib-group-card">
              <div className="card-header">
                <h3>{group.name}</h3>
                <span className={`privacy-tag ${group.privacy}`}>{group.privacy}</span>
              </div>
              <p className="description">{group.description}</p>
              <div className="card-details">
                <p><strong>Contribution:</strong> ETB {group.contributionAmount.toLocaleString()}</p>
                <p><strong>Frequency:</strong> {group.contributionFrequency}</p>
                <p><strong>Members:</strong> {group.currentMembers} / {group.numberOfMembers}</p>
                <p><strong>Starts:</strong> {new Date(group.startDate).toLocaleDateString()}</p>
              </div>
              <Link to={`/equib-groups/${group.id}`} className="button secondary view-details-button">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquibGroupListPage;