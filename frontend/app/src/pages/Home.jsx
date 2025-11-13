import React from 'react'
import '../styiling/Home.scss' // Assuming you have a CSS file for styling
import img from '../assets/img.png'
//import  img1 from '../assets/1.jpg'
//import img2 from '../assets/2.jpg'
import img3 from '../assets/21.jpg'
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
    <div className=' bg-gray-100'>
      <div className="  min-h-screen w-full bg-cover bg-no-repeat bg-center bg-fixed mt:10 flex flex-col md:justify-center  md:flex-row  items-center p-8"
           style={{ backgroundImage: `url(${back})` }}>
        <div className=' mt-20 text-center w-full md:w-1/2 '>
          <h1>Fast,Reliable & clean Garbage collection</h1>
          <p>book to get your gabage collected today,lets build a cleaner world one pick upat a time.</p>
          <div >
          <button className='px-6 py-2 rounded border-1 border-black bg-[#FFA500] 
  hover:scale-105 hover:border-4' onClick={() => navigate('/book')}><h6 class="text-6xl font-bold text-white"class="text-6xl font-bold text-white"class="text-6xl font-bold text-white"class="text-6xl font-bold text-white"class="text-6xl font-bold text-white"class="text-6xl font-bold text-white"class="text-20xl font-bol">Book a pickup</h6>
            </button>
            </div>
        </div>
        <div className=' w-full md:w-1/2  mt-8 md:mt-0'>
          <img src={img} alt='Home' className='img0' />

        </div>
        
      </div>
        <div className='uweh'><h1>Anywhere,anytime</h1></div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 '>
          <div className=' house shadow-lg rounded-lg'>
             
          </div>
          <div className=' com shadow-lg rounded-lg'>
           
           
          </div>
          <div className=' app shadow-lg rounded-lg'>

            
          </div>
        </div>
        <div className='flex flex-col sm:flex-row md:flex-row justify-between items-center p-8 bg-[#ffedd4] mb-2 gap-8 mt-8'>
          <div clasName=''>
            <h3>Making a cleaner world with every pickup</h3>
            <p>We are committed to providing fast, reliable, and clean garbage collection services to help keep our communities clean and healthy.</p>
            <div  className='bdiv'><button className='px-6 py-2 rounded border-1 border-black bg-[#FFA500] 
  hover:scale-105 hover:border-4' onClick={() => navigate('/about')}>Learn more</button></div>
          </div>
          
          <div className='w-full  bg-white p-8 rounded-xl shadow-lg'>
            <h3>We collect all types of waste:</h3>
            <ul className='mt-4'>
              <li className="flex align-center gap-3 "><FaWineBottle title="Plastic Waste" className='bg-orange-50' /> plastic waste</li>
              <li className="flex align-center gap-3"><FaAppleAlt title="food waste" className='icon'/> food waste</li>
              <li className="flex align-center gap-3"><FaLaptop title="e-waste"className='icon'/>e-waste</li>
              <li className="flex align-center gap-3"><FaRadiationAlt tittle="harzadious"className='icon'/> hazardous waste</li>
              <li className="flex align-center gap-3"><FaBuilding title="construction"className='icon'/> construction waste</li>
            </ul>
          </div>
        </div>
        <div className=' flex flex-col  md:flex-row justify-center items-center p-8 bg-[#f0f4f8] mb-2 mt-8'>
         
          <div className='w-full md:w-1/2'>
            <h1>Why choose us?</h1>
            <ul className='lists mt-4'>
              <li className="flex align-center gap-3"><FaBolt className='icons'/>  Fast and reliable service</li>
              <li className="flex align-center gap-3"><FaLeaf className='icons'/>  Eco-friendly practices</li>
              <li className="flex align-center gap-3"><FaUsers className='icons'/>  Community-focused initiatives</li>
              <li className="flex align-center gap-3"><FaUserTie className='icons'/>  Experienced and professional team</li>
              <li className="flex align-center gap-3"><FaTag className='icons'/>  Affordable pricing</li>
              <li className="flex align-center gap-3"><FaCalendarAlt className='icons'/>  Flexible scheduling options</li>
              <li className="flex align-center gap-3"><FaSmile className='icons'/>  Customer satisfaction guaranteed</li>
            </ul>
          </div>
           <div className='w-full md:w-1/2 mt-8 md:mt-0'>
            <img src={anime} alt='Home' className='' />
          </div>

        </div>
        <div className=''>
          <h1 className='base'>where we are based</h1>
          <div className=' flex flex-col md:flex-row justify-start md:gap-6 items-center p-8 bg-[#f0f4f8] mb-2 mt-8'>
            <div className=' w-full md:w-1/2'>
              <img src={img3} alt='location' className='rounded-xl' />
            </div>
            <div className='w-full md:w-1/2'>
              <h2 className='w-full mt-2'>We are located and available to allover the counties:</h2>
              <ul className='list'>
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