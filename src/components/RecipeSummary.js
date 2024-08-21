import React from "react";
import { useLocation } from "react-router-dom";

const RecipeSummary = () => {
  const location = useLocation();
  const { recipe } = location.state || {};

  if (!recipe) {
    return <p>No recipe found</p>;
  }

  return (
    <div className="summary-page">
      <h2>{recipe.label}</h2>
      <img src={recipe.image} alt={recipe.label} />
      <p>{recipe.ingredientLines.length ? "Ingredients:" : "No ingredients listed"}</p>
      <ul>
        {recipe.ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
    </div>
  );
};

export default RecipeSummary;
