import React from 'react'
import '../Header.scss' // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom'
function header() {
  return (
    <div className="header">
        <h1>WasteWise</h1>
        <nav className="header-nav">
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/book">Book</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default header