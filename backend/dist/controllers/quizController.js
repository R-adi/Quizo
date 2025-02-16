var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import db from '../config/db.js';
export const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description } = req.body;
    const teacherId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id; // Get the logged-in user's ID from the session
    if (!title || !description || !teacherId) {
        return res.status(400).json({ message: 'Title, description, and teacher ID are required' });
    }
    try {
        // Insert the new quiz into the database
        const result = yield db.query('INSERT INTO quizzes (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *', [title, description, teacherId]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
export const getQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const teacherId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id; // Get the logged-in user's ID from the session
    try {
        // Fetch quizzes created by the logged-in user
        const result = yield db.query('SELECT * FROM quizzes WHERE teacher_id = $1', [teacherId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
export const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { title, description } = req.body;
    const teacherId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id; // Get the logged-in user's ID from the session
    if (!title || !description || !teacherId) {
        return res.status(400).json({ message: 'Title, description, and teacher ID are required' });
    }
    try {
        // Update the quiz only if it belongs to the logged-in user
        const result = yield db.query('UPDATE quizzes SET title = $1, description = $2 WHERE id = $3 AND teacher_id = $4 RETURNING *', [title, description, id, teacherId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Quiz not found or unauthorized' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
export const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const teacherId = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.id; // Get the logged-in user's ID from the session
    try {
        // Delete the quiz only if it belongs to the logged-in user
        const result = yield db.query('DELETE FROM quizzes WHERE id = $1 AND teacher_id = $2 RETURNING *', [id, teacherId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Quiz not found or unauthorized' });
        }
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
export default { createQuiz, getQuizzes, updateQuiz, deleteQuiz };
