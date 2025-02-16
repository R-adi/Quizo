// src/pages/Signup.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '../components/ui/label';
import { Button} from '../components/ui/button'; 
import { Input} from '../components/ui/input';// ShadCN components
import api from '../services/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await api.post('/auth/signup', { username, password });
      if (response.data.success) {
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (err:any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <div className="w-80">
        <Label>Username</Label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <Button onClick={handleSignup} className="mt-4 w-full">Signup</Button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;