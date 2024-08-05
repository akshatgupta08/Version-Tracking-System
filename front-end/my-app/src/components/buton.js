import React from 'react';
import {useContext} from "react";
import noteContext from "./noteContext.js";

export default function Button({handler}) {
   /*<Button handler = {getTableData}/>} through the getTableData function, the data from the table is retrievd and is sent 
   to the backend. This component is the update button, which creates new versions of a lender and assigns
    the updates information to them.*/
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
    console.log(JSON.stringify(obj));
    alert("You created a lender version");
    a.update();
  } catch (err) {
    alert("Could not create a lender version.");
  }
      
  };

  return (
    <button type="button" className="btn btn-success" onClick={handleClick}>
      UPDATE
    </button>
  );
}
