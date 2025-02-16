// src/pages/CreateQuiz.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '../components/ui/label';
import { Button} from '../components/ui/button'; 
import { Input} from '../components/ui/input';  // ShadCN components
import api from '../services/api';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title || !description) return;

    try {
      const teacherId = localStorage.getItem('userId'); // Fetch logged-in teacher's ID
      await api.post('/quizzes', { title, description, teacherId });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <div className="w-96">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Label>Description</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button onClick={handleSubmit} className="mt-4">Submit</Button>
      </div>
    </div>
  );
};

export default CreateQuiz;