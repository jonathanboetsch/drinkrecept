import { useEffect, useMemo, useState } from "react";
import Recipe from "./Recipe.jsx";
import { useRecipesContext } from "./RecipesContext.jsx";

export default function RecipeList() {
  const [activeCategory, setActiveCategory] = useState("Alla");
  const { searchResult: recipes } = useRecipesContext();

  // Skapa kategorilistan från de recept som hämtas från context
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
      {filteredRecipes?.length === 0 ? (
        <div data-testid="empty-state" className="empty-state-message">
          Inga recept hittades.
        </div>
      ) : (
        filteredRecipes.map((r, i) => <Recipe key={r._id ?? i} recipe={r} />)
      )}
    </div>
  );
}
