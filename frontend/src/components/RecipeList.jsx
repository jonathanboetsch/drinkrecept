import { useEffect, useMemo } from "react";
import Recipe from "./Recipe.jsx";
import "./RecipeList.css";

export default function RecipeList({ recipes, activeCategory = "Alla" }) {
  const filteredRecipes = useMemo(() => {
    return activeCategory === "Alla"
      ? recipes
      : recipes.filter((r) => (r.categories || []).includes(activeCategory));
  }, [recipes, activeCategory]);

  return (
    <div className="recipes-container">
      {filteredRecipes?.map((r, i) => (
        <Recipe key={r._id ?? i} recipe={r} />
      ))}
    </div>
  );
}
