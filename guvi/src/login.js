import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://13.126.48.93/login', { 
        email,
        password,
      });
      
      const { username } = response.data;
      
      console.log('Login successful');
      setError('');
      navigate('/home', { state: { username } }); 
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="emailgroup">
        <label className='emailtext'>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='emailbox'
          placeholder='example123@gmail.com'
        />
      </div>
      <div className="passwordgroup">
        <label className='passwordtext'>Password:</label>
        <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='passwordbox'
            placeholder='Enter the password'
          />
         
          {showPassword ? (
            <FaEyeSlash className="password-toggle" onClick={() => setShowPassword(false)} />
          ) : (
            <FaEye className="password-toggle" onClick={() => setShowPassword(true)} />
          )}
        
      </div>
      
      <div className="button-group">
        <button onClick={handleLogin} className="btnlogin">Login</button>
        <p className='acctext'>Doesn't have an account ? <button className="btnsign" onClick={handleSignup}>Sign Up</button></p>
      </div>
    </div>
    
  );
};

export default LoginPage;
