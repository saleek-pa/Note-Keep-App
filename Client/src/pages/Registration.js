import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../configs/Axios';
import '../styles/Register.css';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/register', { email, password });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response.data.error_message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value.trimStart())} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value.trimStart())} required />
        <button type="submit" className='add-btn'>Register</button>
      </form>
    </div>
  );
};

export default Registration;
