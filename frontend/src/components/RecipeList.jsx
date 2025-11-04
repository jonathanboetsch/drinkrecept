import { useMemo } from "react";
import Recipe from "./Recipe";
import { useRecipesContext } from "./RecipesContext";
import PropTypes from "prop-types";

export default function RecipeList({ recipes: propRecipes, activeCategory = "Alla" }) {
  // prefer explicitly passed recipes (e.g. CategoryPage passes a pre-filtered list),
  // otherwise fall back to the searchResult provided via RecipesContext
  const { searchResult: contextRecipes = [] } = useRecipesContext() || {};

  const filteredRecipes = useMemo(() => {
    const recipes = propRecipes ?? contextRecipes ?? [];
    if (!recipes) return [];
    return activeCategory === "Alla"
      ? recipes
      : recipes.filter((r) => (r.categories || []).includes(activeCategory));
  }, [propRecipes, contextRecipes, activeCategory]);

  return (
    <div className="recipes-container">
      {filteredRecipes?.map((r, i) => (
        <Recipe key={r._id ?? i} recipe={r} />
      ))}
    </div>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)), // can be empty (see fallback above)
  activeCategory: PropTypes.string.isRequired,
};
