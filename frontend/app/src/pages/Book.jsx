import React from 'react'
//import '../styiling/Contact.jsx' // Assuming you have a CSS file for styling
import {useState,useEffect} from 'react'
import img from '../assets/tru.jpg'
import '../styiling/Book.scss'
import axios from 'axios';
function Book() {
  const[location,setLocation]=useState(null);
  const[address,setAddress]=useState('');
  const[error,setError]=useState(null);

  // 1. State for data fetched from backend
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [areas, setAreas] = useState([]);

  // 2. State for what user selects
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedSubcounty, setSelectedSubcounty] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [rawResponse, setRawResponse] = useState("");

   // --- Fetch Counties on Page Load ---
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/counties/")
      .then((res) => {
        setCounties(res.data); // Store counties in state
      })
      .catch((err) => console.error(err));
  }, []); 

   // --- Fetch Subcounties when County changes ---
  useEffect(() => {
    if (selectedCounty) {
      axios.get(`http://127.0.0.1:8000/api/counties/${selectedCounty}/subcounties/`)
        .then((res) => {
          setSubcounties(res.data); // Store subcounties
          setAreas([]); // Reset areas when county changes
          setSelectedSubcounty(""); // Clear subcounty selection
          setSelectedArea(""); // Clear area selection
        })
        .catch((err) => console.error(err));
    } else {
      setSubcounties([]);
      setAreas([]);
    }
  }, [selectedCounty]); // Runs every time selectedCounty changes

  // --- Fetch Areas when Subcounty changes ---
  useEffect(() => {
    if (selectedSubcounty) {
      axios.get(`http://127.0.0.1:8000/api/subcounties/${selectedSubcounty}/areas/`)
        .then((res) => {
          setAreas(res.data); // Store areas
          setSelectedArea(""); // Clear area selection
        })
        .catch((err) => console.error(err));
    } else {
      setAreas([]);
    }
  }, [selectedSubcounty]); // Runs every time selectedSubcounty changes

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
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!selectedArea || !pickupDate || !location) {
    alert("Please select area, pickup date, and allow location");
    return;
  }

  const payload = {
    area_id: selectedArea,
    pickup_date: pickupDate,
    latitude: location.lat,
    longitude: location.lng,
    address: address,
  };

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/bookings/create/", payload, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access')}`,
    "Content-Type": "application/json",
      },
    });

    alert("Booking created successfully!");
    console.log(res.data);
  } catch (err) {
    console.error(err);
    alert("Failed to create booking");
  }
};

  return (
  <div className='book'>
    <div className='containerb'>
      
      <div className='book-containerb'>
       <div className='bo leftb'>
       <h2>welcome dear user</h2>
       <p>book a collection and get to expirience a smooth ride cleaning your environment</p>
       <ul>
        <li></li>
       </ul>
       </div>
       <div>
        <form onSubmit={handleSubmit}>
  {/* County Dropdown */}
  <select value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)}>
    <option value="">Select County</option>
    {counties.map((county) => (
      <option key={county.id} value={county.id}>
        {county.name}
      </option>
    ))}
  </select>

  {/* Subcounty Dropdown */}
  <select
    value={selectedSubcounty}
    onChange={(e) => setSelectedSubcounty(e.target.value)}
    disabled={!selectedCounty}
  >
    <option value="">Select Subcounty</option>
    {subcounties.map((subcounty) => (
      <option key={subcounty.id} value={subcounty.id}>
        {subcounty.name}
      </option>
    ))}
  </select>

  {/* Area Dropdown */}
  <select
    value={selectedArea}
    onChange={(e) => setSelectedArea(e.target.value)}
    disabled={!selectedSubcounty}
  >
    <option value="">Select Area</option>
    {areas.map((area) => (
      <option key={area.id} value={area.id}>
        {area.name}
      </option>
    ))}
  </select>

  {/* Pickup Date */}
  <input
    type="date"
    value={pickupDate}
    onChange={(e) => setPickupDate(e.target.value)}
  />

  {/* Get Location */}
  <button type="button" onClick={getUserLocation}>
    Get My Location
  </button>

  {/* Show location details */}
  {location && (
    <p>
      Latitude: {location.lat}, Longitude: {location.lng}
    </p>
  )}
  {address && <p>Address: {address}</p>}
  <textarea
    value={rawResponse}
    onChange={(e) => setRawResponse(e.target.value)}
    rows={6}
    style={{ width: "100%" }}
    placeholder="Raw API response will appear here"
  />

  {/* Submit Booking */}
  <button type="submit">Submit Booking</button>
</form>

       </div>
        
      </div>
      
       </div>
       <div className='space'>
     </div>
  </div>
  )
}

export default Book