import React, { useEffect, useMemo, useState } from "react";
import Recipe from "./Recipe.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import "./RecipeList.css";

export default function RecipeList({ recipes = [] }) {
  const [activeCategory, setActiveCategory] = useState("Alla");

  // 🧩 Skapa kategorilistan från alla recept
  const categories = useMemo(() => {
    const set = new Set();
    recipes.forEach((r) => (r.categories || []).forEach((c) => set.add(c)));
    return ["Alla", ...Array.from(set).sort()];
  }, [recipes]);

  // 🔄 Om aktiv kategori inte längre finns (t.ex. efter sökning) → gå tillbaka till "Alla"
  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory("Alla");
    }
  }, [categories, activeCategory]);

  // 🔍 Filtrera recepten baserat på vald kategori
  const filteredRecipes = useMemo(() => {
    return activeCategory === "Alla"
      ? recipes
      : recipes.filter((r) => (r.categories || []).includes(activeCategory));
  }, [recipes, activeCategory]);

  // 🎨 UI-layout
  return (
    <main className="recipes-page">
      {/* 🟢 Kategorifilter högst upp */}
      <section className="categories-section">
        <CategoryFilter
         categories={categories}
        activeCategory={activeCategory}
         onSelectCategory={setActiveCategory}
         linkToRoute={true} // 🟢 detta aktiverar länkar
        />

      </section>

      {/* 🔹 Receptlistan under */}
      <section className="recipes-section">
        <h2 className="page-title">Drinkar</h2>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((r, i) => (
            <Recipe key={r._id ?? i} recipe={r} />
          ))
        ) : (
          <p>Inga recept hittades.</p>
        )}
      </section>
    </main>
  );
}
