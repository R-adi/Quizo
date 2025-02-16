import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button'; // ShadCN button component

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    // Clear any user-related data from local storage or state
    localStorage.removeItem('isAuthenticated'); // Example: Remove authentication flag
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <Link to="/dashboard" className="text-white text-xl font-bold">
          Quizo
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {/* Create Quiz Button */}
          <Link to="/create-quiz">
            <Button variant="outline" className="text-white bg-transparent hover:bg-gray-100">
              Create Quiz
            </Button>
          </Link>

          {/* Logout Button */}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;