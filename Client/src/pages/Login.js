import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../configs/Axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', { email, password });
      localStorage.setItem("token", response.data.data)
      navigate('/');
    } catch (error) {
      alert('Login failed:', error.response.data.error_message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value.trimStart())} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value.trimStart())} required />
        <button type="submit" className='add-btn'>Login</button>
      </form>
    </div>
  );
};

export default Login;
