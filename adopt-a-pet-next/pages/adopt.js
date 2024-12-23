// pages/adopt.js (or app/adopt/page.tsx)
import React from 'react';
import AdoptionRequestForm from '../components/AdoptionRequestForm'; // Adjust the path if needed

const AdoptPage = () => {
  return (
    <div>
      
      <p>Please fill the details below to submit your adoption request.</p>
      <AdoptionRequestForm /> //call the adopt request form
    </div>
  );
};

export default AdoptPage;
