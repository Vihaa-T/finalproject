"" 
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const pets = await pool.query('SELECT * FROM pets WHERE shelter_id = $1', [req.query.shelterId]);
        res.status(200).json(pets.rows);
        break;

      case 'POST':
        const { name, breed, age, medicalHistory, shelterId } = req.body;
        await pool.query(
          'INSERT INTO pets (name, breed, age, medical_history, shelter_id) VALUES ($1, $2, $3, $4, $5)',
          [name, breed, age, medicalHistory, shelterId]
        );
        res.status(201).json({ message: 'Pet added successfully' });
        break;

      case 'PUT':
        // Logic for updating pet info
        break;

      case 'DELETE':
        // Logic for deleting pet info
        break;

      default:
        res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
