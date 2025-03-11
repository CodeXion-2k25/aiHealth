"use client";

import React, { useState, useEffect } from "react";

const WaterTracker = () => {
  const goal = 4000; // Total water goal in ml
  const step = 250; // Amount added per click
  const [current, setCurrent] = useState(0);

  // Load saved progress from localStorage when the component mounts
  useEffect(() => {
    const savedProgress = localStorage.getItem("waterProgress");
    if (savedProgress) {
      setCurrent(JSON.parse(savedProgress)); // Convert string to number
    }
  }, []);

  // Update localStorage whenever current value changes
  useEffect(() => {
    localStorage.setItem("waterProgress", JSON.stringify(current));
  }, [current]);

  const addWater = () => {
    setCurrent((prev) => Math.min(prev + step, goal)); // Ensures max 4000ml
  };

  const progress = (current / goal) * 100; // Convert to percentage

  return (
    <div className="flex items-center gap-3 w-full max-w-7xl mx-auto p-5">
      {/* Progress Bar Container */}
      <div className="relative w-full h-4 bg-blue-100 rounded-full overflow-hidden">
        {/* Dynamic Progress */}
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Display Text */}
      <span className="w-[180px] text-gray-600 text-sm font-popins font-semibold">
        {current}ml / {goal}ml
      </span>

      {/* Add Water Button */}
      <button
        onClick={addWater}
        className="w-[120px] bg-blue-500 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Add 250ml
      </button>
    </div>
  );
};

export default WaterTracker;
