"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Itinerary() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchItinerary = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = await fetch("http://localhost:5000/api/itinerary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start_date: startDate, end_date: endDate, location, departure_location: departureLocation, budget })
    });
    
    const data = await response.json();
    setItinerary(data);
    setLoading(false);
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Plan Your Perfect Trip ✈️🌍
      </h1>

      <motion.form onSubmit={fetchItinerary} 
        className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-md bg-opacity-50"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-2 gap-4">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full bg-gray-700 text-white" required />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full bg-gray-700 text-white" required />
          <input type="text" placeholder="Enter Destination" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 rounded w-full bg-gray-700 text-white" required />
          <input type="text" placeholder="Departure Location" value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)} className="border p-2 rounded w-full bg-gray-700 text-white" required />
          <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="border p-2 rounded w-full bg-gray-700 text-white" required />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition-all">Generate Itinerary</button>
        </div>
      </motion.form>

      {loading && <p className="text-xl text-center mt-6">Generating your itinerary...</p>}

      {itinerary && (
        <motion.div className="mt-10 w-full max-w-4xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-4xl font-bold text-center mb-6">Your Itinerary</h1>

          {/* Flights Section */}
          <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Flights ✈️</h2>
            {itinerary.flights.map((flight, i) => (
              <div key={i} className="mb-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-xl font-semibold">{flight.airline}</p>
                <p className="text-gray-300">{flight.departure} ➝ {flight.arrival}</p>
                <p className="text-blue-400">Price: {flight.price}</p>
              </div>
            ))}
          </div>

          {/* Hotels Section */}
          <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Recommended Hotels 🏨</h2>
            {itinerary.hotels.map((hotel, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
                <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                <p className="text-xl font-semibold">{hotel.name}</p>
                <p className="text-gray-300">📍 {hotel.location}</p>
                <p className="text-blue-400">💰 {hotel.price_per_night} | ⭐ {hotel.rating}</p>
              </div>
            ))}
          </div>

          {/* Day-wise Itinerary */}
          {itinerary.days.map((day, index) => (
            <motion.div key={index} className="mb-8 p-6 bg-gray-700 rounded-lg shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
              <h2 className="text-2xl font-semibold mb-4">{day.day} - {location}</h2>
              {day.activities.map((activity, i) => (
                <p key={i} className="text-gray-300">{activity.time} - {activity.place}</p>
              ))}
            </motion.div>
          ))}

          {/* Visa Details */}
          <div className="p-6 bg-gray-700 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">Visa Details 🛂</h2>
            <p className="text-gray-300">Required: {itinerary.visa_details.required ? "Yes" : "No"}</p>
            <p className="text-gray-300">Processing Time: {itinerary.visa_details.processing_time}</p>
            <p className="text-gray-300">Cost: {itinerary.visa_details.cost}</p>
            <p className="text-gray-300">Documents: {itinerary.visa_details.documents_needed.join(", ")}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
