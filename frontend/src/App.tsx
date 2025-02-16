// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz';
import EditQuiz from './pages/EditQuiz';

const App = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />}
        />
        <Route
          path="/create-quiz"
          element={isAuthenticated ? <CreateQuiz /> : <Navigate to="/signup" />}
        />
        <Route
          path="/edit-quiz/:id"
          element={isAuthenticated ? <EditQuiz /> : <Navigate to="/signup" />}
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;