// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '../components/ui/label';
import { Button} from '../components/ui/button'; 
import { Input} from '../components/ui/input';  // ShadCN components
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 

  // src/pages/Login.tsx
  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { username, password });
  
      if (response.data.success) {
        localStorage.setItem('isAuthenticated', 'true'); 
        localStorage.setItem('userId', response.data.userId); // Store user ID
        navigate('/dashboard'); 
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="w-80">
        <Label>Username</Label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        <Label>Password</Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500">{error}</p>}
        <Button onClick={handleLogin} className="mt-4 w-full">Login</Button>
      </div>
    </div>
  );
};

export default Login;