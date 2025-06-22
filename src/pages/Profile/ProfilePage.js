// src/pages/User/ProfilePage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as needed
import './ProfilePage.css'; // Import the CSS for this page

const ProfilePage = () => {
  const { user, isLoading: authLoading } = useAuth(); // Get authenticated user and auth loading state

  const [profileData, setProfileData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only attempt to fetch profile data if authentication is done and a user is logged in
    if (!authLoading && user) {
      const fetchProfile = async () => {
        setDataLoading(true);
        setError(null);
        try {
          // --- Simulate API call to fetch detailed user profile ---
          // In a real app, you would fetch data for the 'user.id'
          // const response = await fetch(`/api/users/${user.id}/profile`, {
          //   headers: {
          //     'Authorization': `Bearer ${user.token}`,
          //     'Content-Type': 'application/json'
          //   }
          // });
          // if (!response.ok) {
          //   throw new Error(`HTTP error! status: ${response.status}`);
          // }
          // const data = await response.json();
          // setProfileData(data);

          // --- Dummy Data for demonstration ---
          setTimeout(() => {
            // Merge basic user info from AuthContext with simulated additional data
            const dummyUserProfile = {
              id: user.id,
              username: user.username || user.email.split('@')[0], // Fallback if username not set
              email: user.email,
              joinedDate: '2024-01-15', // Example
              phone: '0912345678', // Example
              address: 'Addis Ababa, Ethiopia', // Example
              // Simulate Ahadu Bank Account presence
              bankAccountLinked: true,
              bankAccountNumber: '100020003000',
              // Add more profile specific data here
              totalContributions: 15000,
              totalPayouts: 50000,
              activeEquibGroups: 2,
            };
            setProfileData(dummyUserProfile);
            setDataLoading(false);
          }, 1000); // Simulate network delay
          // --- End Dummy Data ---

        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          setError("Failed to load profile details. Please try again.");
          setDataLoading(false);
        }
      };

      fetchProfile();
    } else if (!authLoading && !user) {
        // If auth check is done and no user, clear loading states (ProtectedRoute should redirect anyway)
        setDataLoading(false);
    }
  }, [authLoading, user]); // Re-run effect if auth status or user object changes

  // Handle Authentication Loading State
  if (authLoading) {
    return (
      <div className="profile-page-container loading-state">
        <p>Loading authentication status...</p>
      </div>
    );
  }

  // Handle cases where user is not logged in (ProtectedRoute should prevent direct access)
  if (!user) {
    return (
      <div className="profile-page-container error-state">
        <p>You need to be logged in to view your profile.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  // Handle Profile Data Loading
  if (dataLoading) {
    return (
      <div className="profile-page-container loading-state">
        <h2>Loading Your Profile...</h2>
        <p>Fetching user details.</p>
      </div>
    );
  }

  // Handle Data Fetch Error
  if (error) {
    return (
      <div className="profile-page-container error-state">
        <h2>Error</h2>
        <p>{error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  // Render the Profile content
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>{profileData.username}'s Profile</h1>
        <p className="email-display">{profileData.email}</p>
      </div>

      <section className="profile-details">
        <h2>Personal Information</h2>
        <div className="details-grid">
          <div><strong>Username:</strong> {profileData.username}</div>
          <div><strong>Email:</strong> {profileData.email}</div>
          <div><strong>Phone:</strong> {profileData.phone || 'N/A'}</div>
          <div><strong>Address:</strong> {profileData.address || 'N/A'}</div>
          <div><strong>Member Since:</strong> {new Date(profileData.joinedDate).toLocaleDateString()}</div>
        </div>
      </section>

      <section className="bank-details">
        <h2>Ahadu Bank Account</h2>
        {profileData.bankAccountLinked ? (
          <p><strong>Account Number:</strong> {profileData.bankAccountNumber}</p>
        ) : (
          <p>No Ahadu Bank account linked. <Link to="/link-bank">Link an account</Link></p>
        )}
      </section>

      <section className="equib-activity">
        <h2>My Equib Activity</h2>
        <div className="activity-summary">
          <p><strong>Total Contributions:</strong> ETB {profileData.totalContributions.toLocaleString()}</p>
          <p><strong>Total Payouts Received:</strong> ETB {profileData.totalPayouts.toLocaleString()}</p>
          <p><strong>Active Equib Groups:</strong> {profileData.activeEquibGroups}</p>
        </div>
        <div className="activity-actions">
            <Link to="/equib-groups" className="button secondary">View My Groups</Link>
            {/* You might add a link to detailed transactions here later */}
        </div>
      </section>

      <section className="profile-actions">
        {/* Placeholder for an Edit Profile page */}
        <Link to="/profile/edit" className="button primary">Edit Profile</Link>
        {/* You could add other actions like "Change Password" etc. */}
      </section>
    </div>
  );
};

export default ProfilePage;