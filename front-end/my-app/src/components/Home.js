import React from 'react';
import DropdownComponent from './dropDown.js';
import LenderForm from './form.js';
import { useContext,useEffect, useState } from 'react';
import noteContext from "./noteContext.js";

const Home = () => {

const a = useContext(noteContext);
  return (
    <div>
      <DropdownComponent/>
      {a.active && <LenderForm/>}
    </div>
  );
};

export default Home;
