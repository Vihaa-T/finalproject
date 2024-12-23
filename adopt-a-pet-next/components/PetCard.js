const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">
      <h2>{pet.name}</h2>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age} years old</p>
      <p>Medical History: {pet.medical_history}</p>
    </div>
  );
};

export default PetCard;
