import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './apis/AuthContext';

import Header from './components/Headers';
import Footer from './components/Footers';

import Home from './pages/Home';
import About from './pages/About';
import Book from './pages/Book';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

import PrivateRoute from './apis/PrivateRoute';

import './App.css';
function App() {
  return (
    <div className="App">
    
    <Router>
      <Header className='header'/>
      <AuthProvider> 
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={
          <PrivateRoute>
          <Book />
          </PrivateRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </AuthProvider>
      <Footer className='footer'/>
    </Router>
     
    </div>
  )
}

export default App