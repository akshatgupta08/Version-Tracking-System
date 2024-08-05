import React, { useContext,useEffect, useState } from 'react';
import Table from "./table.js";
import noteContext from "./noteContext.js";

export default function DropdownComponent(){
  const [data, setData] = useState(null);
  const [naam,newnaam] = useState("Lenders Dropdown");
  const a = useContext(noteContext);

  let dd = []; 
 
const changeName = (nnn)=> {
  a.changeTable(true);
  a.setActive(false);
    newnaam(nnn); /*The newnaam variable displays the lender name and version selected by the user.*/
}

useEffect(() => {
  console.log("this runs");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/lender", {
        method: "GET"
      });
      dd = await response.json();
      console.log(dd);
      setData(dd);
    } catch (err) {
      alert("Failed to load the lenders.");
    }
  };

  fetchData();
  
}, [a.state]);
/* <Table data = {naam}/>  the element at the end of the code passes the lender name and version to the 
     table element and the information regarding the lender version is displayed.*/
  return (
    <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height:"300px" ,right: "100px"}}>
    <div className="dropdown dropdown-hover"  style = {{ display: 'block', justifyContent: 'center', alignItems: 'center' ,right: "100px"}}>
    
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style = {{position: "sticky", marginLeft: "auto"}}
      >
        {naam}
      </button>
      
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {data && data.map((item, index) => (
            
          <li key={index} className="dropdown-item" onClick={()=>changeName(`${item.name} version ${item.version}`)}>
            {console.log(item.name)}
            {`${item.name} version ${item.version}`}
          </li>
        ))}
      </ul>
     
      <div style = {{ display: 'block', margin: "50px",position:"sticky", height: "50px"}}>
         <Table data = {naam}/>  
      </div>
    </div>
    </div>
  );
  
};


