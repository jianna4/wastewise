import React from 'react'
//import '../styiling/About.scss' // Assuming you have a CSS file for styling
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/22.jpg'
import img2 from '../assets/21.jpg'
import img3 from '../assets/23.jpg'
import {useState} from 'react'
import '../styiling/About.scss'
import imgb from '../assets/hey.jpg'
import imgc from '../assets/anime.jpg'

function About() {
 
  return (
    <div className='About'>
      <div className='carousell'>
         <Carousel fade> {/* Add 'fade' for fade transition instead of slide */}
          <Carousel.Item interval={3000}> {/* Adjust interval as needed */}
             <img src={img1} alt="First slide" className='imgca'/>
            <Carousel.Caption>
              <h3>Here for you</h3>
              <p>Our able team making sure that we leave your environment squicky clean</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img src={img2} alt="Second slide" className='imgca'/>
            <Carousel.Caption>
              <h3>community service</h3>
              <p>We organise for commuijty inclusivity.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img src={img3} alt="Third slide" className='imgca'/>
            <Carousel.Caption>
              <h3>For a better earth</h3>
              <p>yes yes yes.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
        <div className="columns-containera">
             <div className="column">
              <h3>Who We Are</h3>
               <p>At WasteWise, we are more than just a garbage collection service — we are a team driven by the mission to create cleaner, healthier communities. Founded with the simple goal of helping people properly manage their waste, we believe everyone deserves to live in a clean environment.</p>
             </div>
        
             <div className="column">
              <h3>Our Mission</h3>
               <p>Our mission is to provide affordable, reliable, and eco-friendly waste collection services for homes, businesses, and institutions. We aim to reduce pollution, promote recycling, and educate the public on sustainable waste management practices.</p>
             </div>
        
             <div className="column">
               <h3>Why We Started</h3>
               <p>We started WasteWise because we saw a problem — uncollected garbage, illegal dumping, and communities struggling with waste. We knew we could do something about it. With passion and determination, we set out to offer a modern, community-centered solution that helps people keep their surroundings clean and safe.</p>
             </div>
           </div>
        
        <div className='alldo'>
          <div className='doo doimg'>
            <img src={imgb} className='img'/>
          </div>
        <div className="doo">
          <h1>What We Do</h1>
          <p>We collect and sort all type of waste including</p>
        
            <ol className="custom-numbered-list">
              <li>
                <span className="list-title">Plastic Waste</span>
                <span className="list-description">this includes allburnables</span>
              </li>
              <li>
                <span className="list-title">Food Waste</span>
                <span className="list-description">this is all the kitchen refuse</span>
              </li>
              <li>
                <span className="list-title">E-waste</span>
                <span className="list-description">Another thing for the electronics</span>
              </li>
              <li>
                <span className="list-title">Construction Waste</span>
                <span className="list-description">all debri</span>
              </li>
            </ol>
           
          
        </div>
        </div>
        <div className='community'>
          
         <div className='community-text'>
          <h1>Our Commitment to the Environment</h1>
          <p>We believe a cleaner environment starts with action. That’s why we follow eco-friendly practices, such as sorting recyclable materials, using fuel-efficient trucks, and partnering with recycling companies. Every pickup we make is a step toward a greener future.</p>
          <button className='btna'>Donate</button>
        </div>
        <div className='community-img'>
            <img src={imgc}className='imgc'/>
          </div>
        </div>
        <div className='also'>  
          <h1>We also offer</h1>
        </div>
          <div className="columns-container">
             <div className="column">
              <h3>Recycling Services</h3>
               <p>Content for first column goes here...</p>
             </div>
        
             <div className="column">
              <h3>Community clean-up events</h3>
               <p>Content for second column with potentially more text that might wrap to multiple lines</p>
             </div>
        
             <div className="column">
               <h3>Awareness campaigns on recycling and waste separation</h3>
               <p>Short content</p>
             </div>
           </div>
        
       
        <div className='focus'>
          <h1>Community-Focused</h1>
          <p>Our work goes beyond waste collection. We are proud to support schools, local businesses, and neighborhoods through clean-up drives and educational programs. We’re here to help build a cleaner community — together.</p>
        </div>
      
    </div>
  );
}

export default About