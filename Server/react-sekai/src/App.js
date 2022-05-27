import Navbar from "./components/Navbar/Navbar";
import Background from "./components/Background";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Homepage from "./components/Homepage/Homepage";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Post from "./components/Homepage/Post";
import { UserContext } from "./context/userContext";
import Test from "./components/Homepage/Test";
import CreatePost from "./components/Homepage/CreatePost";

function App() {
  return (
    <>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/Post" element={<Post />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/Register/Response" element={<Homepage />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/Post/Make" element={<CreatePost />} />
            {/* <Route path="/Post/:postName" element={<Test />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;
