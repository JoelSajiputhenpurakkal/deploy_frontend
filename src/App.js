import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeSummary from "./components/RecipeSummary";
import Wishlist from "./components/Wishlist.js";  // Import Wishlist component
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (query) => {
    setLoading(true);
    const API_ID = "5d9da354";
    const API_KEY = "5fc681fbb7ec51f9ca2d635101090ab4";
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setLoading(false);
  };

  return (
    <Router>
      <div className="App">
        <h1>Recipe Finder</h1>
        <SearchBar onSearch={fetchRecipes} />
        <Link to="/wishlist" className="wishlist-button">Wishlist</Link> {/* Wishlist button */}
        <Routes>
          <Route path="/" element={loading ? <p className="loading">Loading...</p> : <RecipeList recipes={recipes} />} />
          <Route path="/recipe-summary" element={<RecipeSummary />} />
          <Route path="/wishlist" element={<Wishlist />} />  {/* Wishlist route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
