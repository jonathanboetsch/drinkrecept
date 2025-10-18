export default function Recipe({ recipe }) {
  const fallbackImage = "../assets/backupImage.png";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  return (
    <div className="recipe-card">
      {recipe.message && <p>{recipe.message}</p>}
      {console.log(recipe)}
      {!recipe.message && (
        <div>
          <h1>{recipe.title}</h1>
          <p>
            <strong>Beskrivning:</strong> {recipe.description || "Ingen beskrivning"}
          </p>
          {/* <img src={recipe.imageUrl} alt={recipe.title} width="300" onError={handleImageError} /> */}
          {recipe.imageUrl ? (
            <img src={recipe.imageUrl} alt={recipe.title} width="300" onError={handleImageError} />
          ) : null}
          <p>
            <strong>Tillagningstid:</strong> {recipe.timeInMins || "Okänt tillagningstid "} minuter
          </p>
          <p>
            <strong>Pris:</strong> {recipe.price || "Hittade ingen prisinformation "} kr
          </p>

          <h3>Kategorier</h3>
          <ul>
            {recipe.categories && recipe.categories.length > 0 ? (
              recipe.categories.map((cat, i) => <li key={i}>{cat}</li>)
            ) : (
              <li>Inga kategorier tillgängliga </li>
            )}
          </ul>

          <h3>Instruktioner</h3>
          <ol>
            {recipe.instructions && recipe.instructions.length > 0 ? (
              recipe.instructions.map((instr, i) => <li key={i}>{instr}</li>)
            ) : (
              <li>Inga instruktioner tillgängliga</li>
            )}
          </ol>

          <h3>Ingredienser</h3>
          <ul>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))
            ) : (
              <p> Inga ingredienser tillgängliga </p>
            )}
          </ul>

          <p>
            <strong>Genomsnittligt betyg:</strong>{" "}
            {recipe.avgRating ? recipe.avgRating : "Ingen än"}
          </p>
        </div>
      )}
    </div>
  );
}
