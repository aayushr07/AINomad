"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const FestivalFinder = () => {
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    setEvents([]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/festivals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, interests }),
      });

      const data = await response.json();
      if (data.events) {
        setEvents(data.events);
      } else {
        console.error("Invalid response:", data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-4">🎉 Discover Festivals & Events</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 text-black rounded-lg bg-white/80 shadow-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Your interests (e.g., music, art, tech)..."
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full p-3 text-black rounded-lg bg-white/80 shadow-md"
          />
        </div>

        <motion.button
          onClick={fetchEvents}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-3 rounded-lg transition duration-300 shadow-lg"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Events"}
        </motion.button>

        {events.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-center mb-3">Upcoming Events:</h3>
            <ul className="space-y-3">
              {events.map((event, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/90 text-black p-3 rounded-lg shadow-md"
                >
                  <strong>{event.name}</strong> - {event.date} <br />
                  📍 {event.location} <br />
                  📝 {event.description}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FestivalFinder;
