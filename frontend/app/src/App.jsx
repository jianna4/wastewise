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
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App