// src/controllers/authController.ts
import { Request, Response } from 'express';
import db from '../config/db';

// Signup function
export const signup:any = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Insert the new user into the database (store plain text password)
    const result = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, password]
    );

    res.status(201).json({ success: true, user: result.rows[0] });
  } catch (error) {
    if ((error as any).code === '23505') { // Unique constraint violation (duplicate username)
      res.status(400).json({ message: 'Username already exists' });
    } else {
      console.error('Error during signup:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

// Login function
export const login:any = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored plain text password
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Store user info in session
    req.session.user = { id: user.id, username: user.username };

    // Send `userId` explicitly
    res.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
};


// Logout function
export const logout:any = (req: Request, res: Response) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logout successful' });
  });
};

// Export all functions as a default object
export default { signup, login, logout };