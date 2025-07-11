import React from 'react'
//import '../styiling/Header.jsx' // Assuming you have a CSS file for styling
import '../styiling/header.scss' // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom'
import img from '../assets/img.png'
import { useLocation } from 'react-router-dom'
function Header() {
  const location=useLocation();
  const isBook=location.pathname === '/book';
  return (
    <div className={`header ${isBook ? 'book' : ''}`}>
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

export default Header