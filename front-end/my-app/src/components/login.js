import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "./noteContext.js";
import {useContext} from "react";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const a = useContext(noteContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Handle form submission logic
      let obj = {};
      obj.username = username;
      obj.password = password;
      let response = await fetch(`http://localhost:3000/person/login`, {
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
        
         navigate("/Home");
         a.changeNav(false);
      }else {
        alert("The password or the username is wrong.");
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
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
