export default function Recipe({recipe}) {
    return (
      <div className="recipe-card">
      <h1>{recipe.title}</h1>
      <p><strong>Beskrivning:</strong> {recipe.description}</p>

      <img src={recipe.imageUrl} alt={recipe.title} width="300" />

      <p><strong>Tillagningstid:</strong> {recipe.timeInMins} minuter</p>
      <p><strong>Pris:</strong> {recipe.price} kr</p>

      <h3>Kategorier</h3>
      <ul>
        {recipe.categories.map((cat, i) => (
          <li key={i}>{cat}</li>
        ))}
      </ul>

      <h3>Instruktioner</h3>
      <ol>
        {recipe.instructions.map((instr, i) => (
          <li key={i}>{instr}</li>
        ))}
      </ol>

      <h3>Ingredienser</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>

      <p>
        <strong>Genomsnittligt betyg:</strong>{" "}
        {recipe.avgRating ? recipe.avgRating : "Ingen än"}
      </p>
    </div>
    )
}