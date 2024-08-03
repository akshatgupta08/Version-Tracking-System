import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home.js";
import LenderForm from "./components/form.js";
import React, { useState } from 'react';
import DropdownComponent from './components/dropDown.js';
import LoginForm from "./components/login.js";
import SignupForm from "./components/signup.js";
import NoteState from "./components/NoteState.js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
 

  return (
    <>
    <NoteState>
      <Router>
        <Navbar title="TextUtils"/>
        <div className="container my-3">
          <Routes>
          <Route exact path="/login" element= {<LoginForm/>}/>
          <Route exact path="/" element= {<SignupForm/>}/>
           <Route exact path="/Home" heading="Version Control System for Lenders" element= {<Home/>}/>
          </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
