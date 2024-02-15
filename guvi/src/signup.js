import React, { useState } from 'react';
import axios from 'axios'; 
import './SignupPage.css'; 
import { useNavigate } from 'react-router-dom'; 

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address.');
    return;
  }
    if ( username && password && password === confirmPassword) {
      try {
        await axios.post('http://13.126.48.93/sign', { 
          email,
          user: username,
          password,
        });
        
        console.log('Signup successful');
        setError('');
        alert('Registered successfully!');
        navigate('/');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setError('Email is already registered. Please use a different email.');
       } 
       else if(error.response && error.response.status === 408) {
        setError('Username is already taken');
     } 
       
       else {
          console.error('Error signing up:', error);
          setError('Error signing up. Please try again later.');
        }
      }
    } else {
      setError('Please enter valid email, username, and matching passwords');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="emailgroup">
        <label className='emailtext'>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='emailbox'
          placeholder='Enter valid ID'
          style={{ fontSize: '15px' }}
        />
      </div>
      <div className="usernamegroup">
        <label className='usernametext'>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='usernamebox'
          placeholder='Enter your username'
          style={{ fontSize: '14px' }}
        />
      </div>
      <div className="passwordgroup">
        <label className='passwordtext'>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='passwordbox'
          placeholder='Enter strong password'
          style={{ fontSize: '14px' }}

        />
      </div>
      <div className="confirmpasswordgroup">
        <label className='confirmtext'>Re-enter:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='confirmpasswordbox'
          placeholder='Re-enter password'
          style={{ fontSize: '14px' }}
        />
      </div>
      <div className="button-group">
        <button onClick={handleSignup} className="btnsignup">Register</button>
      </div>
    </div>
  );
};

export default SignupPage;
