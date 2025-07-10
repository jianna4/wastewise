import React from 'react'
//import '../styiling/Header.jsx' // Assuming you have a CSS file for styling
import '../styiling/header.scss' // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom'
import img from '../assets/img.png'
function header() {
  return (
    <div className="header">
      <div className='left-header'>
        <img className='imgh'src={img}/>
        <h1>WasteWise.</h1>
        
        </div>
        <div className='right-header'>
          
            <Link className='link' to="/">Home</Link>
            <Link className='link' to="/about">About</Link>
            <Link className='link' to="/contact">Contact</Link>
            <Link className='link' to="/book">Book</Link>
            
        </div>
    </div>
  )
}

export default header