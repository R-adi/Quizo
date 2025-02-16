// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Label } from '../components/ui/label';
import { Button} from '../components/ui/button'; 
//import { Input} from '../components/ui/input';  // ShadCN components
import api from '../services/api';
import QuizList from '../components/QuizList';

interface Quiz {
  id: number; // or string
  title: string;
  description: string;
  teacher_id: number;
  created_at: string;
}
const Dashboard = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const teacherId = localStorage.getItem('userId'); // Fetch logged-in teacher's ID
      console.log('Fetched teacherId:', teacherId); // Debugging
  
      if (!teacherId) {
        console.error('No teacherId found in localStorage');
        return;
      }
  
      try {
        const response = await api.get(`/quizzes?teacherId=${teacherId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure auth token is sent
          },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
  
    fetchQuizzes();
  }, []);
  

  const handleDelete = async (id: any) => {
    await api.delete(`/quizzes/${id}`);
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Button onClick={() => navigate('/create-quiz')}>Create Quiz</Button>
      <QuizList quizzes={quizzes} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;