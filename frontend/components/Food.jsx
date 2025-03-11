"use client";

import React, { useState, useEffect } from "react";

const MealTracker = () => {
  // Default meal structure with placeholders
  const defaultMeals = {
    Breakfast: { name: "", calories: "", time: "" },
    Lunch: { name: "", calories: "", time: "" },
    Dinner: { name: "", calories: "", time: "" },
  };

  // State to store meal data
  const [meals, setMeals] = useState(defaultMeals);
  const [inputMeal, setInputMeal] = useState(defaultMeals);
  const [isEditing, setIsEditing] = useState({
    Breakfast: false,
    Lunch: false,
    Dinner: false,
  });

  // Load saved meals from localStorage on mount
  useEffect(() => {
    const savedMeals = localStorage.getItem("meals");
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
  }, []);

  // Save meals to localStorage when updated
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  // Handle input changes
  const handleChange = (e, mealType) => {
    setInputMeal({
      ...inputMeal,
      [mealType]: { ...inputMeal[mealType], [e.target.name]: e.target.value },
    });
  };

  // Save meal to state and localStorage
  const saveMeal = (mealType) => {
    setMeals({
      ...meals,
      [mealType]: inputMeal[mealType],
    });
    setIsEditing({ ...isEditing, [mealType]: false }); // Close input after saving
  };

  return (
    <div className="max-w-8xl mx-auto mt-10 p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(meals).map((mealType) => (
          <div key={mealType} className="bg-green-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">{mealType}</h2>

            {isEditing[mealType] ? (
              // Show input fields when editing
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Meal Name"
                  value={inputMeal[mealType].name}
                  onChange={(e) => handleChange(e, mealType)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="calories"
                  placeholder="Calories"
                  value={inputMeal[mealType].calories}
                  onChange={(e) => handleChange(e, mealType)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="time"
                  name="time"
                  value={inputMeal[mealType].time}
                  onChange={(e) => handleChange(e, mealType)}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => saveMeal(mealType)}
                  className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            ) : meals[mealType].name ? (
              // Show saved meal
              <div className=" bg-white/20 backdrop-blur-lg shadow-lg rounded-xl border border-white/20 px-6 py-2">
                <p className="font-semibold">{meals[mealType].name}</p>
                <p className="text-sm text-gray-500">{meals[mealType].calories} calories</p>
                <p className="text-xs text-gray-400 mt-1">🕒 {meals[mealType].time}</p>
                <button
                  onClick={() => setIsEditing({ ...isEditing, [mealType]: true })}
                  className="mt-2 text-blue-500 text-sm hover:underline"
                >
                  Edit
                </button>
              </div>
            ) : (
              // Show "Please set a data" with an "Add Data" button
              <div className="text-gray-400 text-center">
                <p className="mb-2">Please set a data</p>
                <button
                  onClick={() => setIsEditing({ ...isEditing, [mealType]: true })}
                  className="text-blue-500 hover:underline"
                >
                  Add Data
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealTracker;
