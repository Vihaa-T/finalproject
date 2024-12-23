import React, { useState } from 'react';

const AddPetForm = ({ shelterId }) => {
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    medicalHistory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...petData, shelterId }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message); // Show success message
      } else {
        alert('Failed to add pet');
      }
    } catch (err) {
      console.error('Error adding pet:', err);
      alert('Error adding pet');
    }
  };

  return (
    <div>
      <h1>Add New Pet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={petData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={petData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Medical History:</label>
          <input
            type="text"
            name="medicalHistory"
            value={petData.medicalHistory}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
};

export default AddPetForm;
