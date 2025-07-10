import React from 'react'
//import '../styiling/About.scss' // Assuming you have a CSS file for styling
import {useState} from 'react'

const slides=[
  {image:'../assets/1.jpg', text:'making our country cleen a pickup at a time'},
  {image:'../assets/2.jpg', text:'Reliable garbage collection one click away'},
  {image:'../assets/3.jpg', text:'WasteWise: Your partner in a cleaner tomorrow'},
  {image:'../assets/1.jpg', text:'WasteWise: Eco-friendly and affordable'},
  ]
function About() {
  const [current, setCurrent] = useState(0);
  const NextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };
  const PrevoiusSlide = () => {
    setCurrent(((current - 1) + slides.length) % slides.length);
  };



  return (

    <div className='About'>
      <div classNmae='carousell'>
        <div className='COR-LEFT' onClick={PrevoiusSlide}>l</div>
        <div ClassName='cor-right' onclick={NextSlide}>R</div>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`cor-img ${index === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="slide-text">{slide.text}</div>
          </div>
        ))}
      </div>
      <div classNmae='who'>

        <div className='who-info'>
          <h1>Who We Are</h1>
          <p>At WasteWise, we are more than just a garbage collection service — we are a team driven by the mission to create cleaner, healthier communities. Founded with the simple goal of helping people properly manage their waste, we believe everyone deserves to live in a clean environment.</p>
        </div>

      </div>
      <div className='mission'>
        <h1>Our Mission</h1>
        <p>Our mission is to provide affordable, reliable, and eco-friendly waste collection services for homes, businesses, and institutions. We aim to reduce pollution, promote recycling, and educate the public on sustainable waste management practices.</p>
      </div>
      <div ClassName='start'>
        <h1>Why We Started</h1>
        <p>We started WasteWise because we saw a problem — uncollected garbage, illegal dumping, and communities struggling with waste. We knew we could do something about it. With passion and determination, we set out to offer a modern, community-centered solution that helps people keep their surroundings clean and safe.</p>
      </div>
      <div classNmae="do">
        <h1>What We Do</h1>
        <p>We collect and sort all type of waste including</p>
        <ul>
          <li>Plastic Waste</li>
          <li>Food Waste</li>
          <li>E-waste</li>
          <li>Hazardous Waste</li>
          <li>Construction Waste</li>


        </ul>
        <p>We also offer</p>
        <ul>
          <li>Recycling services</li>
          <li>Community clean-up events</li>
          <li>Awareness campaigns on recycling and waste separation</li>
        </ul>
      </div>
      <div className='community'>
        <h1>Our Commitment to the Environment</h1>
        <p>We believe a cleaner environment starts with action. That’s why we follow eco-friendly practices, such as sorting recyclable materials, using fuel-efficient trucks, and partnering with recycling companies. Every pickup we make is a step toward a greener future.</p>
      </div>
      <div classNmae='focus'>
        <h1>Community-Focused</h1>
        <p>Our work goes beyond waste collection. We are proud to support schools, local businesses, and neighborhoods through clean-up drives and educational programs. We’re here to help build a cleaner community — together.</p>
      </div>
    </div>
  );
}

export default About