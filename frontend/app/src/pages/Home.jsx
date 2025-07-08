import React from 'react'
import '../styiling/Home.scss' // Assuming you have a CSS file for styling
import img from '../assets/img.png'
//import  img1 from '../assets/1.jpg'
//import img2 from '../assets/2.jpg'
//import img3 from '../assets/3.jpg'
import anime from '../assets/anime.jpg'
import {useNavigate} from 'react-router-dom'
import back from '../assets/back.jpg'

import { FaBottleWater, FaBiohazard, FaHardHat, FaLaptop } from "react-icons/fa6";
import { GiRoastChicken, GiBrickWall } from "react-icons/gi";
import { MdDevices } from "react-icons/md";

function Home() {
  const navigate = useNavigate()
  return (
    <div className='Home'>
      <div className='container'>
        <div className='left'>
          <h1>Fast,Reliable & clean Garbage collection</h1>
          <p>book to get your gabage collected today,lets build a cleaner world one pick upat a time.</p>
          <button onClick={() => navigate('/book')}>Book a pickup</button>
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
            <button onClick={() => navigate('/about')}>Learn more</button>
          </div>
          <div className='info2'>
            <ul>
              <li>plastic waste</li>
              <li>food waste</li>
              <li>e-waste</li>
              <li>hazardous waste</li>
              <li>construction waste</li>
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
              <li>Fast and reliable service</li>
              <li>Eco-friendly practices</li>
              <li>Community-focused initiatives</li>
              <li>Experienced and professional team</li>
              <li>Affordable pricing</li>
              <li>Flexible scheduling options</li>
              <li>Customer satisfaction guaranteed</li>
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