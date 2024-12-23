// pages/api/auth/me.js
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await pool.query('SELECT id, email, name FROM users WHERE id = $1', [decoded.userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.rows[0]); // Return user data
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
