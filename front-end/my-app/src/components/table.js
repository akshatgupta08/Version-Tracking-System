import React, { useContext,useEffect, useState, useRef } from 'react';
import Button from "./buton.js";
import DeleteButton from "./delButton.js";
import AddLenderBut from "./AddLenderBut.js";
import noteContext from "./noteContext.js";

/*export default function Table({ data }) {
  const [rows, setRows] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const wordsArray = data.split(' ');
      const lenderName = wordsArray[0];
      const version = wordsArray[2];
      let info = {};
      
      try {
        console.log(`http://localhost:3000/lender/${lenderName}/${version}`);
        const response = await fetch(`http://localhost:3000/lender/${lenderName}/${version}`, {
          method: 'GET',
        });
        info = await response.json();
        console.log(info);
      } catch (err) {
        console.log('Failed to fetch.');
      }

      if (info && info.filters) {
        const tableRows = info.filters.map((filter, index) => (
          <tr key={index}>
            <td>{filter.name}</td>
            <td>{filter.expressions}</td>
          </tr>
        ));
        setRows(tableRows);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (tableRef.current) {
      editTable(tableRef.current);
    }
  }, [rows]);

  function editTable(table) {
    const cells = table.getElementsByTagName('td');
    const numOfCells = cells.length;
    for (let i = 0; i < numOfCells; i++) {
      cells[i].onclick = function() {
        if (this.hasAttribute('data-clicked')) {
          return;
        }
        this.setAttribute('data-clicked', 'yes');
        this.setAttribute('data-text', this.innerHTML);
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.value = this.innerHTML;
        input.style.width = this.offsetWidth - this.clientLeft * 2 + 'px';
        input.style.height = this.offsetHeight - this.clientTop * 2 + 'px';
        input.style.border = '0px';
        input.style.fontFamily = 'inherit';
        input.style.fontSize = 'inherit';
        input.style.textAlign = 'inherit';
        input.style.backgroundColor = 'LightGoldenRodYellow';
        input.onblur = function() {
          const td = input.parentElement;
          const orig_text = td.getAttribute('data-text');
          const current_text = this.value;
          if (orig_text !== current_text) {
            td.removeAttribute('data-clicked');
            td.removeAttribute('data-text');
            td.innerHTML = current_text;
            td.style.cssText = 'padding: 5px';
            // Trigger saveChange function or any other callback here if needed
          } else {
            td.removeAttribute('data-clicked');
            td.removeAttribute('data-text');
            td.innerHTML = orig_text;
            td.style.cssText = 'padding: 5px';
          }
        };
        this.innerHTML = '';
        this.style.cssText = 'padding: 0px 0px';
        this.append(input);
        input.select();
      };
    }
  }

  return (
    <div id="info_table" className="container">
      <table ref={tableRef} className="table table-striped table-bordered table-hover" style={{ width: '900px' }}>
        <thead>
          <tr style = {{position: "sticky"}}>
            <th style={{ backgroundColor: '#212ea473' }}>Name</th>
            <th style={{ backgroundColor: '#212ea473' }}>Expression</th>
          </tr>
        </thead>
        <tbody id="rows">
          {rows}
        </tbody>
      </table>
    </div>
  );
}*/


export default function Table({ data }) {
  
  const [rows, setRows] = useState([]);
  const tableRef = useRef(null);
  let arr = data.split(' ');
  let name = arr[0];
  let versi = arr[2];
  const a = useContext(noteContext);

  const getTableData = () => {
    const wordsArray = data.split(' ');
    const cells = tableRef.current.getElementsByTagName('td');
    const numOfCells = cells.length;
    const filters = [];
    for (let i = 0; i < numOfCells; i += 2) {
      filters.push({
        name: cells[i].innerText,
        expressions: cells[i + 1].innerText,
      });
    }
    return {
      lender: wordsArray[0],
      version: 4,
      filters
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      // Clear previous rows
      setRows([]);
      
      const wordsArray = data.split(' ');
      const lenderName = wordsArray[0];
      const version = wordsArray[2];
      let info = {};
      
      try {
        const response = await fetch(`http://localhost:3000/lender/${lenderName}/${version}`, {
          method: 'GET'
         
        });
        info = await response.json();
        console.log(info);
      } catch (err) {
        console.log('Failed to fetch.');
      }

      if (info && info.filters) {
        const tableRows = info.filters.map((filter, index) => (
          <tr key={index}>
            <td>{filter.name}</td>
            <td>{filter.expressions}</td>
          </tr>
        ));
        setRows(tableRows);
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    if (tableRef.current) {
      editTable(tableRef.current);
    }
  }, [rows]);

  function editTable(table) {
    const cells = table.getElementsByTagName('td');
    const numOfCells = cells.length;
    for (let i = 0; i < numOfCells; i++) {
      cells[i].onclick = function() {
        if (this.hasAttribute('data-clicked')) {
          return;
        }
        this.setAttribute('data-clicked', 'yes');
        this.setAttribute('data-text', this.innerHTML);
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.value = this.innerHTML;
        input.style.width = this.offsetWidth - this.clientLeft * 2 + 'px';
        input.style.height = this.offsetHeight - this.clientTop * 2 + 'px';
        input.style.border = '0px';
        input.style.fontFamily = 'inherit';
        input.style.fontSize = 'inherit';
        input.style.textAlign = 'inherit';
        input.style.backgroundColor = 'LightGoldenRodYellow';
        input.onblur = function() {
          const td = input.parentElement;
          const orig_text = td.getAttribute('data-text');
          const current_text = this.value;
          if (orig_text !== current_text) {
            td.removeAttribute('data-clicked');
            td.removeAttribute('data-text');
            td.innerHTML = current_text;
            td.style.cssText = 'padding: 5px';
            // Trigger saveChange function or any other callback here if needed
          } else {
            td.removeAttribute('data-clicked');
            td.removeAttribute('data-text');
            td.innerHTML = orig_text;
            td.style.cssText = 'padding: 5px';
          }
        };
        this.innerHTML = '';
        this.style.cssText = 'padding: 0px 0px';
        this.append(input);
        input.select();
      };
    }
  }

  return (
    <div id="info_table" className="container">
      <table ref={tableRef} className="table table-striped table-bordered table-hover" style={{ width: '900px' }}>
        <thead>
          <tr style={{ position: 'sticky' }}>
            <th style={{ backgroundColor: '#212ea473' }}>Name {a.tableView && <Button handler = {getTableData}/>}</th>
            <div style = {{backgroundColor: '#212ea473'}}>
            
            <th>Expression {a.tableView && <Button handler = {getTableData}/>} {a.tableView && <DeleteButton lenderName = {name} versionNum = {versi}/>} <AddLenderBut/></th> 
            </div>
          </tr>
        </thead>
        <tbody id="rows">
          {a.tableView && rows}
        </tbody>
      </table>
    </div>
  );
}

