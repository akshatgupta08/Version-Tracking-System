import React from 'react';
import {useContext} from "react";
import noteContext from "./noteContext.js";

export default function Button({handler}) {
   
    const a = useContext(noteContext);

  const handleClick = async () => {
   
   const obj = handler();
   try {
    const response = await fetch(`http://localhost:3000/lender`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(obj), 
    });
    console.log("No exception is thrown.");
    //console.log("feel feel feel feel");
    console.log(JSON.stringify(obj));
    a.update();
  } catch (err) {
    console.log('Failed to fetch.');
  }
      
  };

  return (
    <button type="button" className="btn btn-success" onClick={handleClick}>
      UPDATE
    </button>
  );
}
