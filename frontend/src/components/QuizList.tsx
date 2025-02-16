import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'; // ShadCN button component
import { Quiz } from '../types'; 

interface QuizListProps {
  quizzes: Quiz[]; // Array of quizzes to display
  onDelete: (id: number) => void; 
}

const QuizList: React.FC<QuizListProps> = ({ quizzes, onDelete }) => {
  const navigate = useNavigate();

  // If there are no quizzes, display a message
  if (quizzes.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-8">
        <p>No quizzes found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
          <p className="text-gray-600 mb-4">{quiz.description}</p>
          <div className='w-[170px] px-2 py-1 font-semibold mb-2 bg-yellow-200 rounded-sm'>
          <p className="text-sm text-gray-800">
            Created on: {new Date(quiz.created_at).toLocaleDateString()}
          </p>
          </div>
         
          <div className="flex space-x-2">
            <Button
              onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
              className="flex-1 hover:bg-gray-400 hover:text-black"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(quiz.id)}
              className="flex-1  hover:bg-red-800"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;