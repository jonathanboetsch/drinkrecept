import Recipe from "./Recipe.jsx"

export default function RecipeList({recipes}) {
    return (
      <div className="recipes-container">
        {recipes.map((r, i) => (
          <Recipe key={i} recipe={r} />
        ))}
      </div>
    )
}