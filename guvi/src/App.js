
import './App.css';
import { Routes, Route } from 'react-router-dom';

import SignupPage from './signup';
import LoginPage from './login';
import Home from './home';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<LoginPage />}/>
    <Route path='/signup' element={<SignupPage />}/>
    <Route path='home' element={<Home />}/>

   </Routes>
    </div>
  );
}

export default App;
