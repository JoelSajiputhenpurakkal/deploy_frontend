import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeList = ({ recipes }) => {
  const navigate = useNavigate();

  const handleViewRecipe = (recipe) => {
    navigate("/recipe-summary", { state: { recipe: recipe.recipe } });
  };

  const handleLikeRecipe = async (recipe) => {
    const recipeData = {
      label: recipe.recipe.label,
      uri: recipe.recipe.uri,
      image: recipe.recipe.image,
      source: recipe.recipe.source,
      url: recipe.recipe.url,
    };

    // Log the data that will be sent to the backend
    console.log("Data being sent to backend:", recipeData);

    try {
      const response = await fetch("https://test-git-main-joelsajiputhenpurakkals-projects.vercel.app/api/recipes/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any additional headers if needed, such as authentication tokens
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to add recipe to wishlist: ${errorMessage}`);
      }

      alert('Recipe added to wishlist!');
    } catch (error) {
      console.error('Error adding recipe to wishlist:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="recipe-list">
      {recipes.length === 0 ? (
        <p>No recipes found. Try searching for something else.</p>
      ) : (
        recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <h2>{recipe.recipe.label}</h2>
            <p>Calories: {Math.round(recipe.recipe.calories)}</p>
            <button onClick={() => handleViewRecipe(recipe)}>View Recipe</button>
            <button onClick={() => handleLikeRecipe(recipe)}>Like</button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
