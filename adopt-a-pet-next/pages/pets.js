import React, { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';  

const PetsList = ({ shelterId }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`/api/pets?shelterId=${shelterId}`);
        if (res.ok) {
          const data = await res.json();
          setPets(data);  // Update state with the fetched pets
        } else {
          console.error('Failed to fetch pets');
        }
      } catch (err) {
        console.error('Error fetching pets:', err);
      }
    };
    fetchPets();
  }, [shelterId]);

  return (
    <div>
      <h1>Pets Available for Adoption</h1>
      <div className="pets-list">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />  // display pet card componant
          ))
        ) : (
          <p>No pets available</p>
        )}
      </div>
    </div>
  );
};

export default PetsList;
