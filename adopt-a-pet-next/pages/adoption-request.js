import React from 'react'; // Import the AdoptionRequestForm component
import AdoptionRequestForm from '../components/AdoptionRequestForm';

/**
 * AdoptionRequestPage Component
 * This page serves as a wrapper for the AdoptionRequestForm component,
 * providing a dedicated route for users to submit adoption requests.
 */

const AdoptionRequestPage = () => {
  return (
    <div>
      <AdoptionRequestForm />
    </div>
  );
};

export default AdoptionRequestPage;
