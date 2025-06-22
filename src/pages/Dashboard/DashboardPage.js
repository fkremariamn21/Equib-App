// src/pages/Dashboard/DashboardPage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for navigation
import { useAuth } from '../../contexts/AuthContext'; // Adjust this path if necessary
import './DashboardPage.css'; // Make sure this CSS file exists for styling

const DashboardPage = () => {
  const { user, isLoading } = useAuth(); // Get user and loading state from AuthContext

  // State for dashboard specific data
  const [dashboardData, setDashboardData] = useState({
    activeGroups: 0,
    upcomingContribution: { amount: 0, date: 'N/A', groupName: 'N/A' },
    nextPayout: { amount: 0, date: 'N/A', groupName: 'N/A' },
    totalSaved: 0,
    recentActivities: [],
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if authentication is done and user is logged in
    if (!isLoading && user) {
      const fetchDashboardData = async () => {
        setDataLoading(true);
        setError(null);
        try {
          // --- Simulate API call to fetch dashboard summary ---
          // In a real app, you would make an actual API request here:
          // const response = await fetch('/api/user/dashboard-summary', {
          //   headers: {
          //     'Authorization': `Bearer ${user.token}`, // Assuming user object has a token
          //     'Content-Type': 'application/json'
          //   }
          // });
          // if (!response.ok) {
          //   throw new Error(`HTTP error! status: ${response.status}`);
          // }
          // const data = await response.json();
          // setDashboardData(data);

          // --- Dummy Data for demonstration ---
          setTimeout(() => {
            setDashboardData({
              activeGroups: 3,
              upcomingContribution: { amount: 5000, date: '2025-07-10', groupName: 'Ahadu Savings Group 001' },
              nextPayout: { amount: 30000, date: '2025-08-01', groupName: 'Community Equib Alpha' },
              totalSaved: 155000, // Example: Total across all groups you've participated in
              recentActivities: [
                { id: 1, type: 'contribution', group: 'Ahadu Savings Group 001', amount: 5000, date: '2025-06-20' },
                { id: 2, type: 'payout', group: 'Family Equib Beta', amount: 20000, date: '2025-06-15' },
                { id: 3, type: 'group_joined', group: 'Community Equib Alpha', date: '2025-06-10' },
              ],
            });
            setDataLoading(false);
          }, 1500); // Simulate network delay
          // --- End Dummy Data ---

        } catch (err) {
          console.error("Failed to fetch dashboard data:", err);
          setError("Failed to load dashboard data. Please try again.");
          setDataLoading(false);
        }
      };

      fetchDashboardData();
    } else if (!isLoading && !user) {
      // If auth check is done and no user, clear loading states
      setDataLoading(false);
    }
  }, [isLoading, user]); // Re-run effect if auth loading state or user changes

  // 1. Handle Authentication Loading State (from useAuth)
  if (isLoading) {
    return (
      <div className="dashboard-container loading-state">
        <p>Loading application data...</p>
        {/* You can add a spinner here */}
      </div>
    );
  }

  // 2. Handle cases where user is not logged in (ProtectedRoute should prevent this, but good fallback)
  if (!user) {
    return (
      <div className="dashboard-container error-state">
        <p>You need to be logged in to view the dashboard.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  // 3. Handle Dashboard Specific Data Loading
  if (dataLoading) {
    return (
      <div className="dashboard-container loading-state">
        <h2>Loading your Equib Dashboard...</h2>
        <p>Fetching your latest equib information.</p>
        {/* Add a more specific spinner/loading indicator here */}
      </div>
    );
  }

  // 4. Handle Dashboard Specific Data Fetch Error
  if (error) {
    return (
      <div className="dashboard-container error-state">
        <h2>Error loading Dashboard</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // 5. Render the actual Dashboard content
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {user.username || user.email || 'Ahadu Bank Customer'}!</h1> {/* Adjust based on your user object */}
        <p>Overview of your Equib groups and activities.</p>
      </div>

      <section className="dashboard-summary-cards">
        <div className="card">
          <h3>Active Groups</h3>
          <p className="card-value">{dashboardData.activeGroups}</p>
          <Link to="/equib-groups">View All Groups</Link>
        </div>
        <div className="card">
          <h3>Upcoming Contribution</h3>
          <p className="card-value">ETB {dashboardData.upcomingContribution.amount.toLocaleString()}</p>
          <p>{dashboardData.upcomingContribution.groupName} on {dashboardData.upcomingContribution.date}</p>
        </div>
        <div className="card">
          <h3>Next Payout</h3>
          <p className="card-value">ETB {dashboardData.nextPayout.amount.toLocaleString()}</p>
          <p>{dashboardData.nextPayout.groupName} on {dashboardData.nextPayout.date}</p>
        </div>
        <div className="card">
          <h3>Total Saved (Estimated)</h3>
          <p className="card-value">ETB {dashboardData.totalSaved.toLocaleString()}</p>
          <p>Across all your equib participations.</p>
        </div>
      </section>

      <section className="dashboard-recent-activity">
        <h2>Recent Activity</h2>
        {dashboardData.recentActivities.length > 0 ? (
          <ul>
            {dashboardData.recentActivities.map(activity => (
              <li key={activity.id}>
                <strong>{activity.type === 'contribution' ? 'Contributed' :
                         activity.type === 'payout' ? 'Received Payout' :
                         'Activity'}</strong>
                {activity.amount && ` ETB ${activity.amount.toLocaleString()}`}
                {" "} in "{activity.group}" on {activity.date}.
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent activity to display.</p>
        )}
      </section>

      <section className="dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/create-equib-group" className="button primary">
            Create New Equib Group
          </Link>
          <Link to="/equib-groups" className="button secondary">
            Explore My Groups
          </Link>
          {/* Add more links for joining groups, making payments, etc. */}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;