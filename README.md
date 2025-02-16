# Quizo - Quiz Management System

Quizo is a platform where teachers can create, manage, and view quizzes. It includes user authentication, CRUD operations for quizzes, and a responsive UI built with React and ShadCN components.

## Features
- **User Authentication**: Signup, login, and logout.
- **Quiz Management**: Create, view, update, and delete quizzes.
- **Responsive Design**: Mobile-friendly interface.
- **Session-Based Authentication**: Secure user sessions.
- **Quiz Creation Date**: Display the date when a quiz was created.
- **Multi-Choice Question Support**: Add multiple-choice questions to quizzes.
- **Timer Functionality**: Set a time limit for quiz completion.

  ## Screenshots
![Quizo Homepage](assets/screenshot.png)


## Tech Stack
- **Frontend**: React + TypeScript, ShadCN UI, Vite
- **Backend**: TypeScript, Express, PostgreSQL
- **Database**: PostgreSQL (via pgAdmin)

---

## Prerequisites
- Node.js (v18+)
- npm (v9+)
- PostgreSQL (v15+)
- Git

---

## Project Setup

### 1. Clone the Repository
```bash
cd quizo
```

### 2. Install Dependencies
#### Backend:
```bash
cd backend
npm install
```
#### Frontend:
```bash
cd ../frontend
npm install
```

### 3. Database Setup
Create a PostgreSQL database named `quizo`.

Run these SQL scripts in pgAdmin:
```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

-- Create quizzes table
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  teacher_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create questions table
CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  quiz_id INT REFERENCES quizzes(id),
  question_text TEXT NOT NULL
);

-- Create options table
CREATE TABLE options (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE
);
```

### 4. Configure Environment Variables
#### Backend (`backend/.env`):
```env
PORT=5000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=quizo
DB_PASSWORD=your_db_password
DB_PORT=5432
SESSION_SECRET=your-secret-key
```

### 5. Running the Application
#### Backend
```bash
cd backend
npm run dev
```
Server runs at `http://localhost:5000`.

#### Frontend
```bash
cd frontend
npm run dev
```
App runs at `http://localhost:5173`.

---

## API Documentation

### Authentication
| Endpoint     | Method | Description          | Request Body | Example Response |
|-------------|--------|----------------------|--------------|------------------|
| /auth/signup | POST  | Register a new teacher | `{ "username": "test", "password": "test" }` | `{ "success": true, "user": { "id": 1, "username": "test" } }` |
| /auth/login  | POST  | Log in a teacher | `{ "username": "test", "password": "test" }` | `{ "success": true, "user": { "id": 1, "username": "test" } }` |
| /auth/logout | POST  | Log out the current teacher | None | `{ "success": true, "message": "Logout successful" }` |

### Quiz Management (Requires Authentication)
| Endpoint     | Method | Description          | Request Body | Example Response |
|-------------|--------|----------------------|--------------|------------------|
| /quizzes | POST  | Create a quiz | `{ "title": "Quiz 1", "description": "Sample quiz" }` | `{ "id": 1, "title": "Quiz 1", "description": "Sample quiz", "teacher_id": 1, "created_at": "2023-10-15T12:34:56.789Z" }` |
| /quizzes | GET  | Get all quizzes | None | `[ { "id": 1, "title": "Quiz 1", "description": "Sample quiz", "created_at": "2023-10-15T12:34:56.789Z" }, ... ]` |
| /quizzes/:id | PUT  | Update a quiz | `{ "title": "Updated Quiz", "description": "New description" }` | `{ "id": 1, "title": "Updated Quiz", "description": "New description", "teacher_id": 1, "created_at": "2023-10-15T12:34:56.789Z" }` |
| /quizzes/:id | DELETE | Delete a quiz | None | `{ "success": true }` |

### Question Management
| Endpoint     | Method | Description          | Request Body | Example Response |
|-------------|--------|----------------------|--------------|------------------|
| /questions | POST  | Add a question | `{ "quiz_id": 1, "question_text": "What is React?" }` | `{ "id": 1, "quiz_id": 1, "question_text": "What is React?" }` |
| /questions/:id/options | POST | Add an option | `{ "option_text": "A JavaScript library", "is_correct": true }` | `{ "id": 1, "question_id": 1, "option_text": "A JavaScript library", "is_correct": true }` |

---

## Troubleshooting

### Common Issues
#### **CORS Errors**:
Ensure the backend CORS configuration includes the frontend URL (`http://localhost:5173`).
Example:
```typescript
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
```

#### **Database Connection**:
- Verify PostgreSQL credentials in `.env`.
- Ensure the database server is running.

#### **Session Issues**:
- Check if `SESSION_SECRET` is set in `.env`.
- Ensure `express-session` is properly configured.

#### **401 Unauthorized Errors**:
- Ensure the user is logged in before accessing protected routes.
- Verify the session is being sent with requests (`withCredentials: true` in Axios or Fetch).

---

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## Acknowledgments
- **ShadCN UI** for modern and responsive UI components.
- **Vite** for the fast and efficient frontend build tool.
- **Express and PostgreSQL** for the robust backend and database.

## Contact
For questions or feedback, please contact:
[Aditya Deshmukh] - [codadity@gmail.com]

Project Link: [https://github.com/R-adi/Quizo](https://github.com/R-adi/Quizo)

