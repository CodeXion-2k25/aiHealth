"use client"
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const MoodTracker = () => {
  const [userData, setUserData] = useState(null);
  const [moodData, setMoodData] = useState([]);
  const [newMood, setNewMood] = useState(0);
  const [reason, setReason] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showInputPopup, setShowInputPopup] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedMoodData = localStorage.getItem("moodData");
    if (storedUserData) setUserData(JSON.parse(storedUserData));
    if (storedMoodData) setMoodData(JSON.parse(storedMoodData));
  }, []);

  useEffect(() => {
    if (userData) localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("moodData", JSON.stringify(moodData));
  }, [userData, moodData]);

  const handleUserSetup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userInfo = {
      name: formData.get("name"),
      age: formData.get("age"),
      environment: formData.get("environment"),
    };
    setUserData(userInfo);
  };

  const addMoodScore = () => {
    if (newMood <= 0 || newMood > 100) return;
    setMoodData((prevMoodData) => {
      const today = new Date().toLocaleDateString();
      const existingDay = prevMoodData.find((entry) => entry.date === today);
      let updatedMoodData;
      if (existingDay) {
        existingDay.mood += newMood;
        existingDay.reasons.push(reason);
        updatedMoodData = [...prevMoodData];
      } else {
        updatedMoodData = [...prevMoodData, { date: today, mood: newMood, reasons: [reason] }];
      }
      return updatedMoodData;
    });
    setNewMood(0);
    setReason("");
    setShowInputPopup(false);
  };

  return (
    <div className="w-full relative max-w-4xl mx-auto">
      {!userData ? (
        <form onSubmit={handleUserSetup} className="flex flex-col gap-4">
          <input name="name" placeholder="Enter your name" required className="border p-2 rounded" />
          <input name="age" type="number" placeholder="Enter your age" required className="border p-2 rounded" />
          <input name="environment" placeholder="Your environment (home, work, etc.)" required className="border p-2 rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Set Your Mood Tracker</button>
        </form>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData} onClick={(e) => e.activeLabel && setSelectedDay(e.activeLabel)}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend align="right" />
              <Line type="monotone" dataKey="mood" stroke="#20C997" dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>

          {selectedDay && (
            <div className="absolute top-10 right-10 bg-white shadow-md p-3 rounded border">
              <h3 className="text-lg font-bold">Mood Details for {selectedDay}</h3>
              {moodData
                .find((entry) => entry.date === selectedDay)
                ?.reasons.map((reason, index) => (
                  <p key={index}>{reason}</p>
                ))}
            </div>
          )}

          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => setShowInputPopup(true)}>
            Add Mood Score
          </button>

          {showInputPopup && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-5 rounded shadow-md w-96">
                <h3 className="text-lg font-bold mb-2">Add Mood Score</h3>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newMood}
                  onChange={(e) => setNewMood(Number(e.target.value))}
                  placeholder="Enter mood score (1-100)"
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for your mood"
                  className="border p-2 rounded w-full mb-2"
                />
                <button onClick={addMoodScore} className="bg-green-500 text-white p-2 rounded w-full">
                  Submit
                </button>
                <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded w-full" onClick={() => setShowInputPopup(false)}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoodTracker;
