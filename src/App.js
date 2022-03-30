import Navbar from './components/Navbar/Navbar'
import Background from './components/Background'
import { Login } from './components/Login';
import { Register } from './components/Login/index';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <div className='container'>
      <Navbar/>
      <Background />
      <Router>
        <Routes>
          <Route path = "/Register" element = {<Register/>}/>
          <Route path = "/Login" element = {<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
