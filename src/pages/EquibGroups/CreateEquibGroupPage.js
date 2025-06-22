// src/pages/EquibGroups/CreateEquibGroupPage.js

import React, { useState } from 'react';
// Make sure 'Link' is included in this import statement:
import { useNavigate, Link } from 'react-router-dom'; // <-- ADD Link HERE!
import { useAuth } from '../../contexts/AuthContext';
import './CreateEquibGroupPage.css';

const CreateEquibGroupPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth(); // Get user and auth loading status

  const [formData, setFormData] = useState({
    groupName: '',
    description: '',
    contributionAmount: '', // Store as string initially
    contributionFrequency: 'monthly', // Default to monthly
    numberOfMembers: '',
    startDate: new Date().toISOString().split('T')[0], // Default to today's date
    bankAccountRequired: true, // Example: Assume Ahadu Bank account is required
    privacy: 'private', // 'public' or 'private'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Basic form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.groupName.trim()) errors.groupName = 'Group name is required.';
    if (!formData.description.trim()) errors.description = 'Description is required.';
    if (!formData.contributionAmount || parseFloat(formData.contributionAmount) <= 0) {
      errors.contributionAmount = 'Contribution amount must be a positive number.';
    }
    if (!formData.numberOfMembers || parseInt(formData.numberOfMembers) <= 1) {
      errors.numberOfMembers = 'Number of members must be at least 2.';
    }
    if (!formData.startDate) errors.startDate = 'Start date is required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(false);

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    if (!user) {
      setSubmissionError("You must be logged in to create an Equib group.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API call
      const newGroupData = {
        ...formData,
        contributionAmount: parseFloat(formData.contributionAmount),
        numberOfMembers: parseInt(formData.numberOfMembers),
        creatorId: user.id, // Assuming user object has an 'id'
        creatorEmail: user.email, // Or creatorUsername
        status: 'pending', // Initial status
      };

      // --- REPLACE WITH YOUR ACTUAL API CALL TO CREATE A GROUP ---
      console.log('Attempting to create group with data:', newGroupData);
      // Example API call:
      // const response = await fetch('/api/equib-groups', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${user.token}`, // If you use auth tokens
      //   },
      //   body: JSON.stringify(newGroupData),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to create group');
      // }

      // const createdGroup = await response.json();
      // console.log('Group created successfully:', createdGroup);

      // --- Simulate API Success ---
      await new Promise(resolve => setTimeout(resolve, 2000));
      const simulatedGroupId = `eqb-${Math.floor(Math.random() * 10000)}`;
      setSubmissionSuccess(true);
      console.log(`Simulated successful group creation with ID: ${simulatedGroupId}`);

      // Redirect to the new group's details page or group list
      setTimeout(() => {
        navigate(`/equib-groups/${simulatedGroupId}`); // Redirect after successful creation
        // OR navigate('/equib-groups'); // Redirect to list
      }, 1000);

    } catch (err) {
      console.error('Error creating equib group:', err);
      setSubmissionError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="create-group-container loading-state">
        <p>Loading user authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="create-group-container error-state">
        <p>You must be logged in to create an Equib group.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="create-group-page">
      <h2>Create New Equib Group</h2>
      <p className="page-description">Define the rules and details for your new Equib group.</p>

      <form onSubmit={handleSubmit} className="create-group-form">
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            required
          />
          {formErrors.groupName && <p className="error-message">{formErrors.groupName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
          {formErrors.description && <p className="error-message">{formErrors.description}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contributionAmount">Contribution Amount (ETB per cycle):</label>
          <input
            type="number"
            id="contributionAmount"
            name="contributionAmount"
            value={formData.contributionAmount}
            onChange={handleChange}
            min="1"
            required
          />
          {formErrors.contributionAmount && <p className="error-message">{formErrors.contributionAmount}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="contributionFrequency">Contribution Frequency:</label>
          <select
            id="contributionFrequency"
            name="contributionFrequency"
            value={formData.contributionFrequency}
            onChange={handleChange}
          >
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numberOfMembers">Number of Members:</label>
          <input
            type="number"
            id="numberOfMembers"
            name="numberOfMembers"
            value={formData.numberOfMembers}
            onChange={handleChange}
            min="2"
            required
          />
          {formErrors.numberOfMembers && <p className="error-message">{formErrors.numberOfMembers}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          {formErrors.startDate && <p className="error-message">{formErrors.startDate}</p>}
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="bankAccountRequired"
            name="bankAccountRequired"
            checked={formData.bankAccountRequired}
            onChange={handleChange}
          />
          <label htmlFor="bankAccountRequired">Ahadu Bank Account Required for Members</label>
        </div>

        <div className="form-group radio-group">
          <label>Privacy:</label>
          <div>
            <input
              type="radio"
              id="privacyPublic"
              name="privacy"
              value="public"
              checked={formData.privacy === 'public'}
              onChange={handleChange}
            />
            <label htmlFor="privacyPublic">Public (Anyone can join)</label>
          </div>
          <div>
            <input
              type="radio"
              id="privacyPrivate"
              name="privacy"
              value="private"
              checked={formData.privacy === 'private'}
              onChange={handleChange}
            />
            <label htmlFor="privacyPrivate">Private (Invite-only)</label>
          </div>
        </div>

        {submissionError && <p className="submission-error-message">{submissionError}</p>}
        {submissionSuccess && <p className="submission-success-message">Equib Group created successfully!</p>}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Group...' : 'Create Equib Group'}
        </button>
      </form>
    </div>
  );
};

export default CreateEquibGroupPage;