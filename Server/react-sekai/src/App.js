import Navbar from './components/Navbar/Navbar'
import Background from './components/Background'
import Login  from './components/Login/Login';
import Register from './components/Login/Register';
import Homepage from './components/Homepage/Homepage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className='container'>
      <Navbar/>
      <Background />
      <Router>
        <Routes>
          <Route path = "/Register" element = { <Register/> }/>
          <Route path = "/Login" element = { <Login/> }/>
          <Route path = "/Homepage" element = {<Homepage/>}/>
          <Route path = "/Register/Response" element = {<Homepage/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
