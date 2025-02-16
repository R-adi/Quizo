// src/controllers/quizController.ts
import { Request, Response } from 'express';
import db from '../config/db';

export const createQuiz:any = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const teacherId = req.session.user?.id; // Get the logged-in user's ID from the session

  if (!title || !description || !teacherId) {
    return res.status(400).json({ message: 'Title, description, and teacher ID are required' });
  }

  try {
    // Insert the new quiz into the database
    const result = await db.query(
      'INSERT INTO quizzes (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, teacherId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  const teacherId = req.session.user?.id; // Get the logged-in user's ID from the session

  try {
    // Fetch quizzes created by the logged-in user
    const result = await db.query('SELECT * FROM quizzes WHERE teacher_id = $1', [teacherId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateQuiz:any = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const teacherId = req.session.user?.id; // Get the logged-in user's ID from the session

  if (!title || !description || !teacherId) {
    return res.status(400).json({ message: 'Title, description, and teacher ID are required' });
  }

  try {
    // Update the quiz only if it belongs to the logged-in user
    const result = await db.query(
      'UPDATE quizzes SET title = $1, description = $2 WHERE id = $3 AND teacher_id = $4 RETURNING *',
      [title, description, id, teacherId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Quiz not found or unauthorized' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteQuiz:any = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teacherId = req.session.user?.id; // Get the logged-in user's ID from the session

  try {
    // Delete the quiz only if it belongs to the logged-in user
    const result = await db.query('DELETE FROM quizzes WHERE id = $1 AND teacher_id = $2 RETURNING *', [id, teacherId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Quiz not found or unauthorized' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default { createQuiz, getQuizzes, updateQuiz, deleteQuiz };