function calculateDifficulty(timeInMins) {
  // Enkel logik för att bestämma svårighetsgrad baserat på tid
  if (!timeInMins || timeInMins <= 0) return 'Okänd';
  if (timeInMins < 10) return "Lätt";
  if (timeInMins <= 30) return "Medel";
  return "Svår";
}

export default function Recipe({ recipe }) {
  if (!recipe) {
    return <div className="recipe-not-found">Receptet hittades inte.</div>;
  }

  const fallbackImage = "../assets/backupImage.png";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  // Beräkna svårighetsgrad för det enskilda receptet
  const difficulty = calculateDifficulty(recipe.timeInMins);

  return (
    <div className="recipe-card">
      {recipe.message && <p className="recipe-message">{recipe.message}</p>}
      {!recipe.message && (
        <div className="recipe-content">
          <h1 className="recipe-title">{recipe.title}</h1>

          <p className="recipe-description">
            <strong>Beskrivning:</strong> {recipe.description || "Ingen beskrivning"}
          </p>
          {/* <img src={recipe.imageUrl} alt={recipe.title} width="300" onError={handleImageError} /> */}
          {recipe.imageUrl ? (
            <img
              className="recipe-image"
              src={recipe.imageUrl}
              alt={recipe.title}
              width="300"
              onError={handleImageError}
            />
          ) : null}
          <p className="recipe-time">
            <strong>Tid / Tillagningstid:</strong> {recipe.timeInMins || "Okänd tillagningstid "}{" "}
            minuter
          </p>
          <p className="recipe-difficulty">
            <strong>Svårighetsgrad:</strong> {difficulty}
          </p>
          <p className="recipe-price">
            <strong>Pris:</strong> {recipe.price || "Hittade ingen prisinformation "} kr
          </p>

          <h3 className="recipe-section-title">Kategorier</h3>
          <ul className="recipe-categories">
            {recipe.categories && recipe.categories.length > 0 ? (
              recipe.categories.map((cat, i) => <li key={i}>{cat}</li>)
            ) : (
              <li className="recipe-category-empty">Inga kategorier tillgängliga </li>
            )}
          </ul>

          <h3 className="recipe-section-title">Instruktioner</h3>
          <ol className="recipe-instructions">
            {recipe.instructions && recipe.instructions.length > 0 ? (
              recipe.instructions.map((instr, i) => <li key={i}>{instr}</li>)
            ) : (
              <li className="recipe-instruction-empty">Inga instruktioner tillgängliga</li>
            )}
          </ol>

          <h3 className="recipe-section-title">Ingredienser</h3>
          <ul className="recipe-ingredients">
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ing, i) => (
                <li key={i} className="recipe-ingredient">
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))
            ) : (
              <p className="recipe-ingredient-empty"> Inga ingredienser tillgängliga </p>
            )}
          </ul>

          <p className="recipe-rating">
            <strong>Genomsnittligt betyg:</strong>{" "}
            {recipe.avgRating ? recipe.avgRating : "Ingen än"}
          </p>
        </div>
      )}
    </div>
  );
}
