import React from 'react'
//import '../styiling/Header.jsx' // Assuming you have a CSS file for styling
import '../styiling/header.scss' // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom'
function header() {
  return (
    <div className="header">
      <div className='left-header'>
        <h1>WasteWise</h1></div>
        <div className='right-header'>
          
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/book">Book</Link>
            
        </div>
    </div>
  )
}

export default header