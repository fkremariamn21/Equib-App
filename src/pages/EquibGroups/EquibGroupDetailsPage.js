// src/pages/EquibGroups/EquibGroupDetailsPage.js

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as needed
import './EquibGroupDetailsPage.css'; // Optional: for specific styling (make sure this file exists!)

const EquibGroupDetailsPage = () => {
  const { id } = useParams(); // Get group ID from URL (e.g., /equib-groups/EQB123)
  const navigate = useNavigate(); // This line is now used
  const { user, isLoading: authLoading } = useAuth(); // Get authenticated user and auth loading state

  const [groupDetails, setGroupDetails] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching group details based on ID
  useEffect(() => {
    if (!authLoading && user) { // Only fetch if auth is ready and user is logged in
      const fetchGroupDetails = async () => {
        setDataLoading(true);
        setError(null);
        try {
          // --- Simulate API call to fetch specific group details ---
          // In a real app, you would make an actual API request here:
          // const response = await fetch(`/api/equib-groups/${id}`, {
          //   headers: {
          //     'Authorization': `Bearer ${user.token}`,
          //     'Content-Type': 'application/json'
          //   }
          // });
          // if (!response.ok) {
          //   throw new Error(`HTTP error! status: ${response.status}`);
          // }
          // const data = await response.json();
          // setGroupDetails(data);

          // --- Dummy Data for demonstration based on a specific ID ---
          setTimeout(() => {
            const dummyGroups = {
              'eqb-123': { // Example Group 1 (ID matches what CreateEquibGroupPage might generate)
                id: 'eqb-123',
                name: 'Ahadu Community Equib Alpha',
                description: 'A friendly monthly equib group for community members facilitated by Ahadu Bank.',
                contributionAmount: 5000,
                contributionFrequency: 'monthly',
                numberOfMembers: 6,
                startDate: '2025-07-01',
                bankAccountRequired: true,
                privacy: 'public',
                creator: { id: user.id, username: user.username || user.email }, // Assuming current user is creator
                members: [
                  { id: 'user1', username: 'john_doe', email: 'john@example.com', joinedDate: '2025-07-01' },
                  { id: 'user2', username: 'jane_smith', email: 'jane@example.com', joinedDate: '2025-07-01' },
                  { id: 'user3', username: 'bob_johnson', email: 'bob@example.com', joinedDate: '2025-07-01' },
                  { id: 'user4', username: user.username || user.email, email: user.email, joinedDate: '2025-07-01' }, // Current user
                  { id: 'user5', username: 'alice_wong', email: 'alice@example.com', joinedDate: '2025-07-01' },
                  { id: 'user6', username: 'mike_brown', email: 'mike@example.com', joinedDate: '2025-07-01' },
                ],
                schedule: [
                  { cycle: 1, recipient: 'john_doe', date: '2025-07-25', status: 'completed' },
                  { cycle: 2, recipient: 'jane_smith', date: '2025-08-25', status: 'upcoming' },
                  { cycle: 3, recipient: 'bob_johnson', date: '2025-09-25', status: 'upcoming' },
                  { cycle: 4, recipient: user.username || user.email, date: '2025-10-25', status: 'upcoming' }, // Current user's turn
                  { cycle: 5, recipient: 'alice_wong', date: '2025-11-25', status: 'upcoming' },
                  { cycle: 6, recipient: 'mike_brown', date: '2025-12-25', status: 'upcoming' },
                ],
                recentTransactions: [
                    { type: 'contribution', member: 'john_doe', amount: 5000, date: '2025-07-01' },
                    { type: 'contribution', member: 'jane_smith', amount: 5000, date: '2025-07-01' },
                    { type: 'payout', member: 'john_doe', amount: 30000, date: '2025-07-25' },
                ]
              },
              'eqb-456': { // Another example group
                  id: 'eqb-456',
                  name: 'Ahadu Staff Equib',
                  description: 'Internal staff equib for team building.',
                  contributionAmount: 2000,
                  contributionFrequency: 'weekly',
                  numberOfMembers: 5,
                  startDate: '2025-06-01',
                  bankAccountRequired: true,
                  privacy: 'private',
                  creator: { id: 'user7', username: 'manager_x' },
                  members: [
                      { id: 'user7', username: 'manager_x' },
                      { id: 'user8', username: 'dev_y' },
                      { id: 'user9', username: 'hr_z' },
                      { id: 'user10', username: 'finance_a' },
                      { id: 'user11', username: 'ops_b' }
                  ],
                  schedule: [], // simplified
                  recentTransactions: []
              }
            };

            const foundGroup = dummyGroups[id];
            if (foundGroup) {
              setGroupDetails(foundGroup);
            } else {
              setError("Equib group not found.");
            }
            setDataLoading(false);
          }, 1000); // Simulate network delay
          // --- End Dummy Data ---

        } catch (err) {
          console.error("Failed to fetch group details:", err);
          setError("Failed to load group details. Please try again.");
          setDataLoading(false);
        }
      };

      fetchGroupDetails();
    } else if (!authLoading && !user) {
        // If auth check is done and no user, clear loading states and prepare for redirect/message
        setDataLoading(false);
    }
  }, [id, authLoading, user]); // Re-run effect if ID, auth status, or user changes

  // Determine if the current user is the creator or a member for displaying specific actions
  const isCreator = groupDetails && user && groupDetails.creator.id === user.id;
  const isMember = groupDetails && user && groupDetails.members.some(member => member.id === user.id);

  // 1. Handle Authentication Loading State
  if (authLoading) {
    return (
      <div className="group-details-container loading-state">
        <p>Loading authentication status...</p>
      </div>
    );
  }

  // 2. Handle cases where user is not logged in (ProtectedRoute should prevent this for private groups)
  if (!user) {
    return (
      <div className="group-details-container error-state">
        <p>You need to be logged in to view group details.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  // 3. Handle Group Data Loading
  if (dataLoading) {
    return (
      <div className="group-details-container loading-state">
        <h2>Loading Equib Group Details...</h2>
        <p>Fetching group information for ID: {id}</p>
      </div>
    );
  }

  // 4. Handle Group Data Fetch Error (e.g., group not found)
  if (error) {
    return (
      <div className="group-details-container error-state">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/equib-groups">Back to Group List</Link>
      </div>
    );
  }

  // If groupDetails is null after loading (e.g., not found), provide a fallback.
  // This check is mostly for safety if `error` state isn't explicitly set for 'not found'.
  if (!groupDetails) {
      return (
          <div className="group-details-container error-state">
              <h2>Group Not Found</h2>
              <p>The Equib group with ID "{id}" does not exist or you do not have access.</p>
              <Link to="/equib-groups">Back to Group List</Link>
          </div>
      );
  }

  // 5. Render the actual Group Details content
  return (
    <div className="equib-group-details-page">
      <div className="details-header">
        <h1>{groupDetails.name} <span className={`privacy-tag ${groupDetails.privacy}`}>{groupDetails.privacy}</span></h1>
        <p className="group-id">Group ID: {groupDetails.id}</p>
        <p>{groupDetails.description}</p>
      </div>

      <section className="group-summary">
        <h2>Group Overview</h2>
        <div className="summary-grid">
          <div><strong>Contribution:</strong> ETB {groupDetails.contributionAmount.toLocaleString()} per {groupDetails.contributionFrequency}</div>
          <div><strong>Members:</strong> {groupDetails.members.length} / {groupDetails.numberOfMembers}</div>
          <div><strong>Start Date:</strong> {new Date(groupDetails.startDate).toLocaleDateString()}</div>
          <div><strong>Creator:</strong> {groupDetails.creator.username || groupDetails.creator.email}</div>
          <div><strong>Ahadu Bank Account Required:</strong> {groupDetails.bankAccountRequired ? 'Yes' : 'No'}</div>
        </div>
      </section>

      {/* Conditional actions based on user's role/status */}
      <section className="group-actions">
        {isCreator && (
          <Link to={`/equib-groups/${id}/edit`} className="button primary">Edit Group</Link>
        )}
        {isMember && !isCreator && (
            <button className="button secondary" onClick={() => alert('Simulating "Make Contribution"')}>Make My Contribution</button>
        )}
        {!isMember && groupDetails.privacy === 'public' && (
          <button className="button primary" onClick={() => alert('Simulating "Join Group"')}>Join Group</button>
        )}
        {isMember && (
            <Link to={`/equib-groups/${id}/my-payments`} className="button secondary">My Payments/Payouts</Link>
        )}
        {/* Added a button that uses the 'navigate' function */}
        <button onClick={() => navigate('/equib-groups')} className="button tertiary">
            Back to All Groups
        </button>
      </section>


      <section className="group-members">
        <h2>Members ({groupDetails.members.length})</h2>
        {groupDetails.members.length > 0 ? (
          <ul>
            {groupDetails.members.map((member) => (
              <li key={member.id}>
                {member.username || member.email} {member.id === user.id ? '(You)' : ''}
                {member.id === groupDetails.creator.id && ' (Creator)'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No members in this group yet.</p>
        )}
      </section>

      <section className="group-schedule">
        <h2>Contribution & Payout Schedule</h2>
        {groupDetails.schedule.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Cycle</th>
                <th>Recipient</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {groupDetails.schedule.map((cycle) => (
                <tr key={cycle.cycle} className={cycle.status}>
                  <td>{cycle.cycle}</td>
                  <td>{cycle.recipient}</td>
                  <td>{new Date(cycle.date).toLocaleDateString()}</td>
                  <td>{cycle.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Schedule is not yet defined or available.</p>
        )}
      </section>

      <section className="group-transactions">
        <h2>Recent Transactions</h2>
        {groupDetails.recentTransactions.length > 0 ? (
            <ul>
                {groupDetails.recentTransactions.map((tx, index) => (
                    <li key={index}>
                        <strong>{tx.type === 'contribution' ? 'Contribution' : 'Payout'}:</strong>
                        {" "} {tx.member} {tx.type === 'contribution' ? 'contributed' : 'received'} ETB {tx.amount.toLocaleString()} on {new Date(tx.date).toLocaleDateString()}.
                    </li>
                ))}
            </ul>
        ) : (
            <p>No recent transactions for this group.</p>
        )}
      </section>
    </div>
  );
};

export default EquibGroupDetailsPage;