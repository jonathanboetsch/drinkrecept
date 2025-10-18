import React, { useEffect, useMemo, useState } from "react";
import Recipe from "./Recipe.jsx";
import CategoryFilter from "./CategoryFilter.jsx";

export default function RecipeList({ recipes = [] }) {
  const [activeCategory, setActiveCategory] = useState("Alla");

  // Skapa kategorilistan från de recept som kommer in via props
  const categories = useMemo(() => {
    const set = new Set();
    recipes.forEach((r) => (r.categories || []).forEach((c) => set.add(c)));
    return ["Alla", ...Array.from(set).sort()];
  }, [recipes]);

  // Om aktiv kategori inte längre finns (t.ex. efter sökning) -> backa till "Alla"
  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory("Alla");
    }
  }, [categories, activeCategory]);

  // Filtrera på vald kategori ovanpå de (redan sök-filtrerade) recipes
  const filteredRecipes = useMemo(() => {
    return activeCategory === "Alla"
      ? recipes
      : recipes.filter((r) => (r.categories || []).includes(activeCategory));
  }, [recipes, activeCategory]);

  return (
    <div className="recipes-container">
      <div className="recipes-container__filter">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>
      <div className="recipes-container__items">
        {filteredRecipes.map((r, i) => (
          <Recipe key={r._id ?? i} recipe={r} />
        ))}
      </div>
    </div>
  );
}
