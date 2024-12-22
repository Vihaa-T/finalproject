"" 
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, petId } = req.body;

  try {
    await pool.query(
      'INSERT INTO adoption_requests (user_id, pet_id, status) VALUES ($1, $2, $3)',
      [userId, petId, 'Pending']
    );

    res.status(201).json({ message: 'Adoption request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
