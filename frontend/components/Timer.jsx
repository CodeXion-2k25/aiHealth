"use client"
import React, { useState, useEffect } from "react";

const MeditationTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Load scores from local storage on mount
  useEffect(() => {
    const savedScore = localStorage.getItem("meditationScore");
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []);

  // Start or Stop the timer
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    } else {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  // Reset the timer and show score popup if > 1 minute
  const handleReset = () => {
    if (time > 60) {
      const calculatedScore = Math.floor(time / 10); // Example scoring logic
      setScore(calculatedScore);
      localStorage.setItem("meditationScore", JSON.stringify(calculatedScore));
      setShowScorePopup(true);
    }
    clearInterval(intervalId);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center p-4 border rounded shadow-md">
      <h2 className="text-lg font-semibold">Meditation Timer</h2>
      <p className="text-2xl font-bold mt-2">{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className={`px-4 py-2 text-white rounded ${isRunning ? "bg-red-500" : "bg-green-500"}`}
          onClick={handleStartStop}
        >
          {isRunning ? "Stop" : "Start Meditation"}
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handleReset}>
          Reset & Show Score
        </button>
      </div>

      {/* Score Popup */}
      {showScorePopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold">Meditation Score</h3>
            <p className="text-2xl text-green-600 font-bold">{score} Points</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowScorePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeditationTimer;