import React from 'react';
import {useContext} from "react";
import noteContext from "./noteContext.js";

export default function DeleteButton({lenderName,versionNum}) {
   
    const a = useContext(noteContext);

  const handleClick = async () => {
   
   
   try {
    const response = await fetch(`http://localhost:3000/lender/${lenderName}/${versionNum}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         
      },

    });
    console.log("No exception is thrown.");
    a.update();
  } catch (err) {
    console.log('Failed to fetch.');
  }
      
  };

  return (
    <button type="button" className="btn btn-success" onClick={handleClick}>
      Delete The Lender Version
    </button>
  );
}
