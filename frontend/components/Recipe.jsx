"use client";

import React, { useState, useEffect } from "react";

const RecipeApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    time: "",
    calories: "",
    servings: "",
    image: "",
    user: "",
  });

  // Load recipes from localStorage on component mount
  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    if (recipes.length > 0) {
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }, [recipes]);

  // Handle input changes
  const handleChange = (e) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  // Add new recipe
  const addRecipe = () => {
    if (newRecipe.name && newRecipe.description && newRecipe.user) {
      const updatedRecipes = [...recipes, { id: Date.now(), ...newRecipe }];
      setRecipes(updatedRecipes);
      localStorage.setItem("recipes", JSON.stringify(updatedRecipes)); // Save to LocalStorage
      setNewRecipe({ name: "", description: "", time: "", calories: "", servings: "", image: "", user: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">
      {/* Share Recipe Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-5"
        onClick={() => setShowForm(true)}
      >
        Share Your Recipe
      </button>

      {/* Recipe Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Your Recipe</h2>
            <input type="text" name="user" placeholder="Your Name" value={newRecipe.user} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="name" placeholder="Recipe Name" value={newRecipe.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <textarea name="description" placeholder="Description" value={newRecipe.description} onChange={handleChange} className="w-full p-2 border rounded mb-2"></textarea>
            <input type="text" name="time" placeholder="Time (e.g. 30 mins)" value={newRecipe.time} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="calories" placeholder="Calories (e.g. 400 cal)" value={newRecipe.calories} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="servings" placeholder="Servings (e.g. 2 servings)" value={newRecipe.servings} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="text" name="image" placeholder="Image URL (Optional)" value={newRecipe.image} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <div className="flex gap-2">
              <button onClick={addRecipe} className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600">Submit</button>
              <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white w-full py-2 rounded-md hover:bg-gray-500">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Recipe Section */}
      <div className="overflow-x-auto whitespace-nowrap flex gap-5 p-3">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden w-96 flex-shrink-0">
              <img src={recipe.image || "https://source.unsplash.com/400x300/?food"} alt={recipe.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{recipe.name}</h3>
                <p className="text-gray-600 text-sm">{recipe.description}</p>
                <div className="flex items-center gap-3 text-gray-500 text-xs mt-2">
                  <span>⏳ {recipe.time}</span>
                  <span>🔥 {recipe.calories}</span>
                  <span>🍽 {recipe.servings}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Shared by {recipe.user}</p>
                <button className="mt-3 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm">View Recipe</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recipes available. Share your first recipe!</p>
        )}
      </div>
    </div>
  );
};

export default RecipeApp;
