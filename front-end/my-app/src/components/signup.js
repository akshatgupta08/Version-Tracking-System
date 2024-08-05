import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useContext} from "react";
import noteContext from "./noteContext.js";

const SignupForm = () => {

  const navigate = useNavigate();
  const a = useContext(noteContext);  
  /*Before loading the home page, the useEffect() function checks if the user
  already has the token in the local storage, which would mean that the 
  user does not have to login again. The user will be directed to the home page.*/
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
        alert("Log in if you have previously."); 
      }
    };

    checkAuthentication(); 
  }, []);

    
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
/*If the user logs in again, then the credentials are checked by the backend and a token is returned.*/
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
         console.log(response.token);
         navigate("/Home"); /*The user is directed to the home page.*/
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
