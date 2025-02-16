// src/routes/authRoutes.ts
import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

export default router;