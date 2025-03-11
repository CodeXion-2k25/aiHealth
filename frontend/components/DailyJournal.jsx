"use client";

import React, { useState, useEffect } from "react";

const MoodJournal = () => {
  const [progress, setProgress] = useState(1);
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("moodEntries")) || [];
    setEntries(savedEntries);
    setProgress(savedEntries.length + 1);
  }, []);

  // Save to localStorage
  const saveEntry = () => {
    if (!entry.trim()) return;

    const newEntries = [...entries, { id: progress, text: entry }];
    setEntries(newEntries);
    localStorage.setItem("moodEntries", JSON.stringify(newEntries));

    setProgress((prev) => (prev < 10 ? prev + 1 : 10));
    setEntry("");
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Progress Bar */}
      <div className="relative flex gap-1 mb-3">
        <input
          type="range"
          min="1"
          max="10"
          value={progress}
          readOnly
          className="w-full accent-blue-500"
        />
        <span className=" text-sm font-semibold">{progress}/10</span>
      </div>

      {/* Journal Entry */}
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="How are you feeling today? What's on your mind?"
        className="w-full h-24 border rounded p-2 resize-none"
      ></textarea>

      {/* Buttons */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={saveEntry}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Journal Entry
        </button>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Show Previous Entries
        </button>
      </div>

      {/* Previous Entries Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-2">Previous Entries</h3>
            <ul className="max-h-40 overflow-auto border p-2 rounded">
              {entries.length > 0 ? (
                entries.map((e) => <li key={e.id} className="mb-1">{e.text}</li>)
              ) : (
                <p>No previous entries</p>
              )}
            </ul>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodJournal;
