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
    <motion.div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Plan Your Perfect Trip ✈️🌍</h1>
      
      <form onSubmit={fetchItinerary} className="mb-8 grid grid-cols-2 gap-4">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" required />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full" required />
        <input type="text" placeholder="Enter Destination" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 rounded w-full" required />
        <input type="text" placeholder="Departure Location" value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)} className="border p-2 rounded w-full" required />
        <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="border p-2 rounded w-full" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">Generate Itinerary</button>
      </form>

      {loading && <p className="text-center text-xl">Generating your itinerary...</p>}
      {itinerary && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-bold text-center mb-6">Your Itinerary</h1>
          {itinerary.days.map((day, index) => (
            <motion.div key={index} className="mb-8 p-4 bg-gray-100 rounded-lg shadow-lg" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
              <h2 className="text-2xl font-semibold mb-4">{day.day} - {location}</h2>
              <div className="border-l-4 border-blue-500 pl-4">
                {day.activities.map((activity, i) => (
                  <motion.div key={i} className="mb-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }}>
                    <strong>{activity.time}</strong> - {activity.place}
                    <p className="text-gray-600">{activity.details}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          <h2 className="text-3xl font-bold mt-8">Flights ✈️</h2>
          <div className="grid grid-cols-2 gap-4">
            {itinerary.flights.map((flight, i) => (
              <motion.div key={i} className="p-4 bg-white shadow-md rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.2 }}>
                <p className="text-lg font-bold">{flight.airline}</p>
                <p className="text-gray-700">{flight.departure} ➝ {flight.arrival}</p>
                <p className="text-blue-600 font-semibold">{flight.price}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mt-8">Hotels 🏨</h2>
          <div className="grid grid-cols-2 gap-4">
            {itinerary.hotels.map((hotel, i) => (
              <motion.div key={i} className="p-4 bg-white shadow-md rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.2 }}>
                <p className="text-lg font-bold">{hotel.name}</p>
                <p className="text-gray-700">📍 {hotel.location}</p>
                <p className="text-blue-600 font-semibold">💰 {hotel.price_per_night} | ⭐ {hotel.rating}</p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl font-bold mt-8">Visa Details 🛂</h2>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="text-gray-700">Required: {itinerary.visa_details.required ? "Yes" : "No"}</p>
            <p className="text-gray-700">Processing Time: {itinerary.visa_details.processing_time}</p>
            <p className="text-gray-700">Cost: {itinerary.visa_details.cost}</p>
            <p className="text-gray-700">Documents: {itinerary.visa_details.documents_needed.join(", ")}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
