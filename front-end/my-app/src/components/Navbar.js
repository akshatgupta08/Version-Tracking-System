import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import noteContext from "./noteContext.js";
import {useContext} from "react";
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
    const navigate = useNavigate();
    const handleClick = ()=>{
       a.changeNav(true);
       localStorage.setItem("token","Tom");
       navigate("/");
    }
    
    const a = useContext(noteContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand">Version Control</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {!(a.nav)?  (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="Home">Home</Link>
                        </li>
                    </ul>) : (<span className="nav-link">Home</span>)}
                   
                </div>
            </div>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
           { a.nav &&
           <>
            <Link to="/login">
            <button type="button" className="btn btn-outline-primary" style={{ width: '80px' }}>login</button>
            </Link> 
            <Link to="/">
            <button type="button" className="btn btn-outline-primary" style={{ width: '80px' }}>sign up</button>
            </Link>
            </>} 
            {!(a.nav) &&
            
            <button type="button" className="btn btn-outline-primary" style={{ width: '80px' }} onClick={handleClick}>logout</button>
            
            }
        </div>
        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Set title here',
    aboutText: 'About'
  };