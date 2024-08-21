import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        const response = await fetch("https://test-git-main-joelsajiputhenpurakkals-projects.vercel.app/api/recipes/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch liked recipes");
        }

        const data = await response.json();
        setLikedRecipes(data);
      } catch (error) {
        console.error("Error fetching liked recipes:", error);
      }
    };

    fetchLikedRecipes();
  }, []);

  const handleDeleteRecipe = async (id) => {
    try {
      const response = await fetch(`https://test-git-main-joelsajiputhenpurakkals-projects.vercel.app/api/recipes/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      // Update the UI by removing the deleted recipe
      setLikedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleViewRecipe = (recipe) => {
    window.open(recipe.url, "_blank");
  };

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {likedRecipes.length === 0 ? (
        <p>No liked recipes found.</p>
      ) : (
        <div className="recipe-list">
          {likedRecipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <img src={recipe.image} alt={recipe.label} />
              <h2>{recipe.label}</h2>
              <p>Source: {recipe.source}</p>
              <div className="button-group">
                <button onClick={() => handleViewRecipe(recipe)}>View Recipe</button>
                <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
