import { useEffect, useMemo } from "react";
import Recipe from "./Recipe.jsx";
import "./RecipeList.css";

export default function RecipeList({
  recipes,
  activeCategory = "Alla",
  onSelectCategory = () => {},
}) {
  // 🧩 Create category list for validation
  const categories = useMemo(() => {
    const set = new Set();
    recipes.forEach((r) => (r.categories || []).forEach((c) => set.add(c)));
    return ["Alla", ...Array.from(set).sort()];
  }, [recipes]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      onSelectCategory("Alla");
    }
  }, [categories, activeCategory, onSelectCategory]);

  // 🔍 Filter recipes
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
