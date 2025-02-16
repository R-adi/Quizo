// src/routes/quizRoutes.ts
import express from 'express';
import quizController from '../controllers/quizController';
import middleware from '../middleware';

const router = express.Router();

// Apply the authenticate middleware to all quiz routes
router.use(middleware);

router.post('/quizzes', quizController.createQuiz); // Create a quiz
router.get('/quizzes', quizController.getQuizzes); // Get all quizzes for the logged-in user
router.put('/quizzes/:id', quizController.updateQuiz); // Update a quiz
router.delete('/quizzes/:id', quizController.deleteQuiz); // Delete a quiz

export default router;