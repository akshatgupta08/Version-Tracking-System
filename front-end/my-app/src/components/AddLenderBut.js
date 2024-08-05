import React from 'react'
import { useContext} from 'react';
import noteContext from "./noteContext.js";
/*When the button is clicked, the form to add a new Lender is rendered.*/
export default function AddLenderBut() {

const a = useContext(noteContext);
const handleClick  = ()=> {
    a.changeTable(false);
   a.setActive(true);
}

  return (
    <button type="button" className="btn btn-success" onClick={handleClick}>
    Add a new Lender
  </button>
  )
}
