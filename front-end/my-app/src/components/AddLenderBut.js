import React from 'react'
import { useContext} from 'react';
import noteContext from "./noteContext.js";

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
