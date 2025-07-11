import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Headers';
import Footer from './components/Footers';

import Home from './pages/Home';
import About from './pages/About';
import Book from './pages/Book';
import Contact from './pages/Contact';
import './App.css';
function App() {
  return (
    <div className="App">
      
    <Router>
      <Header className='header'/>
      <Routes clasName='pages'>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer className='footer'/>
    </Router>
    </div>
  )
}

export default App