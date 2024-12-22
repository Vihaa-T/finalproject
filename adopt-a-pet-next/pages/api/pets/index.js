ECHO is on.
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { breed, age } = req.query;

  try {
    let query = 'SELECT * FROM pets WHERE 1=1';
    const params = [];

    if (breed) {
      query += ' AND breed = $1';
      params.push(breed);
    }

    if (age) {
      query += ` AND age <= $${params.length + 1}`;
      params.push(age);
    }

    const pets = await pool.query(query, params);
    res.status(200).json(pets.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
