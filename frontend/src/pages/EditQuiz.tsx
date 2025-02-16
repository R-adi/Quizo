// src/pages/EditQuiz.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Label } from '../components/ui/label';
import { Button} from '../components/ui/button'; 
import { Input} from '../components/ui/input';  // ShadCN components
import api from '../services/api';

const EditQuiz = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await api.get(`/quizzes/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
    };
    fetchQuiz();
  }, [id]);

  const handleSubmit = async () => {
    if (!title || !description) return;
    await api.put(`/quizzes/${id}`, { title, description });
    navigate('/dashboard');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <div className="w-96">
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Label>Description</Label>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button onClick={handleSubmit} className="mt-4">Save Changes</Button>
      </div>
    </div>
  );
};

export default EditQuiz;