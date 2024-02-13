import React, { useState, useEffect } from 'react';
import './Home.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
 
  const [isEditMode, setIsEditMode] = useState(false); 
 
  const location = useLocation();
  const { username } = location.state || {};
 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:6006/api/user-details/${username}`);
        const userData = response.data;
        if (userData) {
          setAge(userData.age || '');
          setDob(userData.dob || '');
          setContact(userData.contact || '');
          setGender(userData.gender || '');
          setNationality(userData.nationality || '');
          setAddress(userData.address || '');
          if (Object.values(userData).some(value => value === null)) {
            setIsEditMode(true); 
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:6006/api/user-details/${username}`, {
        age,
        dob,
        contact,
        gender,
        nationality,
        address,
      });
      console.log('Submitted:', response.data);
      alert('Submitted Successfully');
      setIsEditMode(false);
      
    } catch (error) {
      console.error('Error submitting details:', error);
     
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
    
  };

  return (
    <div>
      <h1>WELCOME! {username}</h1>
      <div className="container">
        <h2>Add Personal Details</h2>
        <button type="button" className="btn-submit" onClick={handleEdit} disabled={isEditMode}>
            Edit
          </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              disabled={!isEditMode}
              
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              disabled={!isEditMode}
              
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              disabled={!isEditMode}
             
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              disabled={!isEditMode}
             
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nationality:</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
              disabled={!isEditMode}
              
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={!isEditMode}
             
            />
          </div>
          <button type="submit" className="btn-submit">
            submit
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Home;
