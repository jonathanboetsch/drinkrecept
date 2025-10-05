import Recipe from "./Recipe.jsx"

export default function RecipeList({recipes}) {
    return (
      <div>
        {recipes.map((r, i) => (
        <Recipe key={i} recipe={r} />
        ))}
      </div>
    )
}