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
        const response = await axios.get(`http://13.126.48.93/api/user-details/${username}`);
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
      const response = await axios.post(`http://13.126.48.93/api/user-details/${username}`, {
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
      <h1 className='welcome'>Welcome {username}!</h1>
      <div className="container">
        <h2>Additional Details</h2>
        <button type="button" className="edit" onClick={handleEdit} disabled={isEditMode}>
           Edit
          </button>
        <form onSubmit={handleSubmit}>
          <div className="agegroup">
            <label className='agetxt'>Age:</label>
            <input 
             type='number'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              disabled={!isEditMode}
              className='agebox'
              
            />
          </div>
          <div className="dobgroup">
            <label>D.O.B:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              disabled={!isEditMode}
              className='dobbox'
              
            />
          </div>
          <div className="contactgroup">
            <label className='contacttxt'>Contact:</label>
            <input
              
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              disabled={!isEditMode}
              className='contactbox'
            />
          </div>
          <div className="gendergroup">
            <label>Gender:</label>
            <select className='genderbox'
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
          <div className="national">
            <label>Nationality:</label>
            <input className='nationalbox'
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
              disabled={!isEditMode}
              
            />
          </div>
          <div className="address">
            <label>Address:</label>
            <textarea className='addressbox'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={!isEditMode}
             
            />
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Home;
