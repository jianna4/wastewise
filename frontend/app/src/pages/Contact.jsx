import React from 'react'
//import '../styiling/Contact.jsx' // Assuming you have a CSS file for styling
import {useState,useEffect} from 'react'
function Contact() {
  const[location,setLocation]=useState(null);
  const[address,setAddress]=useState('');
  const[error,setError]=useState(null);
  const getUserLocation=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          const{latitude:lat,longitude:lng}=position.coords;
          setLocation({lat,lng});
          reversepoints(lat,lng);
        },//you need to add a commaafter every callback
        (err)=>{
          
          setError(`eror is: ${err.mesage}`);
        },
        {enableHighAccuracy:true, timeout:10000, maximumAge:0}

      )
    }
    else{
      setError('geolocation is not supported in this location')
      alert('geolocation is not supported in this location')
      
    }
  }
  const reversepoints=async(lat,lng)=>{
    try{
      const responce=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data= await responce.json()
      if (data.address) {
        setAddress(formatAddress(data.address));
      }
    }
    catch(err){
      setAddress(formatAddress(data.address));
      setError("Could not retrieve address details");
    }
  }
  const formatAddress = (address) => {
    // Format the address as needed
    const parts = [];
    if (address.road) parts.push(address.road);
    if (address.house_number) parts.push(address.house_number);
    if (address.city || address.town || address.village) parts.push(address.city || address.town || address.village);
    if (address.country) parts.push(address.country);
    
    return parts.join(', ');
  };
  const manualLoction=(e)=>{
    e.preventDefault();//t make sure page doesnt reload
  }
  return (
    <div>Contact</div>
  )
}

export default Contact