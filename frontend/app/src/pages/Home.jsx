import React from 'react'
import '../styiling/Home.scss' // Assuming you have a CSS file for styling
import img from '../assets/img.png'
//import  img1 from '../assets/1.jpg'
//import img2 from '../assets/2.jpg'
//import img3 from '../assets/3.jpg'
import anime from '../assets/anime.jpg'
import {useNavigate} from 'react-router-dom'
import back from '../assets/back.jpg'

import { FaWineBottle, FaAppleAlt, FaLaptop, FaRadiationAlt, FaBuilding } from 'react-icons/fa';
import {
  FaBolt,           // Fast service
  FaLeaf,           // Eco-friendly
  FaUsers,          // Community
  FaUserTie,        // Professional team
  FaTag,            // Affordable pricing
  FaCalendarAlt,    // Scheduling
  FaSmile           // Satisfaction
} from 'react-icons/fa';

function Home() {
  const navigate = useNavigate()
  return (
    <div className='Home'>
      <div className='container'>
        <div className='left'>
          <h1>Fast,Reliable & clean Garbage collection</h1>
          <p>book to get your gabage collected today,lets build a cleaner world one pick upat a time.</p>
          <div className='bdiv'>
          <button className='button' onClick={() => navigate('/book')}>Book a pickup
            </button>
            </div>
        </div>
        <div className='right'>
          <img src={img} alt='Home' className='img0' />

        </div>
        <img src={back} alt='location' className='back' />
      </div>

        <div className='pickups'>
          <div className='pickup house'>
             <h1>Home </h1>
          </div>
          <div className='pickup com'>
           
            <h1>community</h1>
          </div>
          <div className='pickup app'>

            <h1>appartments</h1>
          </div>
        </div>
        <div className='info'>
          <div clasName='info1'>
            <h3>Making a cleaner world with every pickup</h3>
            <p>We are committed to providing fast, reliable, and clean garbage collection services to help keep our communities clean and healthy.</p>
            <div  className='bdiv'><button className='button' onClick={() => navigate('/about')}>Learn more</button></div>
          </div>
          <div className='info2'>
            <ul>
              <li><FaWineBottle title="Plastic Waste" className='icon' /> plastic waste</li>
              <li><FaAppleAlt title="food waste" className='icon'/> food waste</li>
              <li><FaLaptop title="e-waste"className='icon'/>e-waste</li>
              <li><FaRadiationAlt tittle="harzadious"className='icon'/> hazardous waste</li>
              <li><FaBuilding title="construction"className='icon'/> construction waste</li>
            </ul>
          </div>
        </div>
        <div className='container2'>
          <div className='container-left'>
            <img src={anime} alt='Home' className='anime' />
          </div>
          <div className='container-right'>
            <h1>Why choose us?</h1>
            <ul>
              <li><FaBolt className='icons'/>  Fast and reliable service</li>
              <li><FaLeaf className='icons'/>  Eco-friendly practices</li>
              <li><FaUsers className='icons'/>  Community-focused initiatives</li>
              <li><FaUserTie className='icons'/>  Experienced and professional team</li>
              <li><FaTag className='icons'/>  Affordable pricing</li>
              <li><FaCalendarAlt className='icons'/>  Flexible scheduling options</li>
              <li><FaSmile className='icons'/>  Customer satisfaction guaranteed</li>
            </ul>
          </div>

        </div>
        <div className='based'>
          <h1 className='base'>where we are based</h1>
          <div className='based-container'>
            <div classNmae='based-left'>
              <img src='https://cdn-icons-png.flaticon.com/512/684/684908.png' alt='location' className='location' />
            </div>
            <div classNmae='based-right'>
              <h2>We are located and available to allover the counties:</h2>
              <ul>
                <li>Kericho</li>
                <li>Nakuru</li>
                <li>Nairobi</li>
                <li>Uasin Gishu</li>
                <li>Bomet</li>
                <li>Nyandarua</li>
              </ul>  
            </div>
          </div>

        </div>

      
    </div>
  )
}

export default Home