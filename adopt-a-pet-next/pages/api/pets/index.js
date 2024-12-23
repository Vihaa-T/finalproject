import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { breed, age, limit = 10, offset = 0 } = req.query;

  try {
    let query = 'SELECT * FROM pets WHERE 1=1';
    const params = [];

    // Add filters dynamically
    if (breed) {
      params.push(breed);
      query += ` AND breed = $${params.length}`;
    }

    if (age) {
      params.push(age);
      query += ` AND age <= $${params.length}`;
    }

    // Add pagination
    params.push(limit, offset);
    query += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

    // Execute query
    const pets = await pool.query(query, params);

    // Handle empty results
    if (pets.rows.length === 0) {
      return res.status(404).json({ message: 'No pets found', pets: [] });
    }

    res.status(200).json(pets.rows);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
}
