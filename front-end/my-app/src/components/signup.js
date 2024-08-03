import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useContext} from "react";
import noteContext from "./noteContext.js";

const SignupForm = () => {

  const navigate = useNavigate();
  const a = useContext(noteContext);  

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        console.log("The useeffect function works");
        const token = localStorage.getItem('token'); // Use getItem to retrieve the token

        if (token) {
          const response = await fetch('http://localhost:3000/verifyAuthentication', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) { 
            navigate('/Home');
            a.changeNav(false);
          } 
        }
      } catch (err) {
        console.error('Failed to fetch:', err); 
      }
    };

    checkAuthentication(); 
  }, []);

    
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Handle form submission logic
      let obj = {};
      obj.username = username;
      obj.password = password;
      let response = await fetch(`http://localhost:3000/person/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj), 
      });
  
      if (response.ok) {
        response = await response.json();
         let value = response.token;
         localStorage.setItem("token",value);
        //let value = localStorage.getItem("token");
        //console.log("gdcvdvcdgcvgdvcgdvcgvv");
        //console.log(value);
        console.log(response.token);
         navigate("/Home");
         a.changeNav(false);
      }else {
        alert("The username is already present");
      }
  
      
    } catch (err) {
      alert("There was some issue with the server.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputUsername">Username</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputUsername"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
