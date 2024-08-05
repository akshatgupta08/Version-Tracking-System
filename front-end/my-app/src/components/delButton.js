import React from 'react';
import {useContext} from "react";
import noteContext from "./noteContext.js";

export default function DeleteButton({lenderName,versionNum}) {
  /*The lenderName and the version are passed as props. When the button is clicked, the lender version gets deleted.*/ 
    const a = useContext(noteContext);

  const handleClick = async () => {
   
   
   try {
    const response = await fetch(`http://localhost:3000/lender/${lenderName}/${versionNum}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         
      },

    });
    alert("You deleted"+ lenderName + " " + versionNum);
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
