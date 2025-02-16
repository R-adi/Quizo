// src/app.ts
import express from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import cors from 'cors';
const app = express();
// Middleware to parse JSON requests
app.use(express.json());
// Session configuration
app.use(session({
    secret: 'Aditya', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
}));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));
// Routes
app.use('/api/auth', authRoutes); // Authentication routes (signup, login, logout)
app.use('/api', quizRoutes); // Quiz routes (protected by authenticate middleware)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
