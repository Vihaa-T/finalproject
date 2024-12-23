// pages/adopt.js (or app/adopt/page.tsx)
import React from 'react';
import AdoptionRequestForm from '../components/AdoptionRequestForm'; // Adjust the path if needed

const AdoptPage = () => {
  return (
    <div>
      <h1>Adopt a Pet</h1>
      <p>Please fill in the details to submit your adoption request.</p>
      <AdoptionRequestForm />
    </div>
  );
};

export default AdoptPage;
