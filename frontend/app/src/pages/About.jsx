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
 const items = [
    {
      id: 1,
      title: "First Item",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Second Item",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "Third Item",
      image: "https://via.placeholder.com/150"
    }
  ];
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askBackend = async () => {//using function to make api call to backend not useeffect coz we want t use it whn you clickbutton ask
    const res = await fetch("http://127.0.0.1:8000/ask/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",//tells the backend that we are sending json data
      },
      body: JSON.stringify({ question }),//converts the question to a json string
    });
    const data = await res.json();//parse the json response from the backend
    setAnswer(data.answer || "No answer found");
  };
  //chatbot
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ask/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      const botMessage = {
        role: "bot",
        text: data.answer?.result || data.answer || "No response",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error: " + error.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='About'>
      <div className='w-full h-screen overflow-hidden'>
         <Carousel fade> {/* Add 'fade' for fade transition instead of slide */}
          <Carousel.Item interval={3000}> {/* Adjust interval as needed */}
             <img src={img1} alt="First slide" className='w-full h-screen object-cover object-center'/>
            <Carousel.Caption>
              <h3>Here for you</h3>
              <p>Our able team making sure that we leave your environment squicky clean</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img src={img2} alt="Second slide" className='w-full h-screen object-cover object-center'/>
            <Carousel.Caption>
              <h3>community service</h3>
              <p>We organise for commuijty inclusivity.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img src={img3} alt="Third slide" className='w-full h-screen object-cover object-center'/>
            <Carousel.Caption>
              <h3>For a better earth</h3>
              <p>yes yes yes.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#FFA500] text-white p-4 text-lg font-semibold">
          WasteWise Chatbot
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-orange-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}>
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-gray-200 text-gray-600 p-3 rounded-xl max-w-[80%]">
              Typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center border-t p-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendQuery()}
            placeholder="Ask me something..."
            className="flex-1 border rounded-xl px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={sendQuery}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            Send
          </button>
        </div>
      </div>
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
        
        <div className=' flex flex-col md:flex-row bg-[#ffedd4]'>
          <div className='doo doimg w-full md:w-1/2'>
            <img src={imgb} className='img'/>
          </div>
        <div className="doo w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-center">What We Do</h1>
          <p className="text-center md:text-start">We collect and sort all type of waste including</p>
        
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