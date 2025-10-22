import { Link, useLocation } from "react-router-dom";
import "./App.css";
import RatingForm from "./RatingForm";

function calculateDifficulty(timeInMins) {
  // Enkel logik för att bestämma svårighetsgrad baserat på tid
  if (
    timeInMins === null ||
    timeInMins === undefined ||
    isNaN(Number(timeInMins)) ||
    Number(timeInMins) <= 0
  )
    return "Okänd";
  if (timeInMins < 10) return "Lätt";
  if (timeInMins <= 30) return "Medel";
  return "Svår";
}

import RatingForm from "./RatingForm";

export default function Recipe({ recipe }) {
  const location = useLocation(); // information about the URL path, notably `pathname`
  if (!recipe) {
    return <div className="recipe-not-found">Receptet hittades inte.</div>;
  }
  const fallbackImage = "/backupImage.png";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };
  // Beräkna svårighetsgrad för det enskilda receptet
  const difficulty = calculateDifficulty(recipe.timeInMins);


  return (
    <div className="recipe-container">
      {recipe.message && <p className="recipe-message">{recipe.message}</p>}
      {!recipe.message && (
        <div className="recipe-card">
          <Link
            to={recipe._id && `/recipe/${recipe._id}`}
            className="recipe-link"
            aria-label={`Öppna recept: ${recipe.title}`}
          />
          <h1>{recipe.title}</h1>
          <p>
            <strong>Beskrivning:</strong> {recipe.description || "Ingen beskrivning"}
          </p>
          <img src={recipe.imageUrl} alt={recipe.title} width="300" onError={handleImageError} />
          <p className="recipe-time">
            <strong>Tillagningstid:</strong> {recipe.timeInMins || "Okänt tillagningstid "} minuter
          </p>
          <p className="recipe-difficulty">
            <strong>Svårighetsgrad:</strong> {difficulty}
          </p>
          <p className="recipe-price">
            <strong>Pris:</strong> {recipe.price || "Hittade ingen prisinformation "} kr
          </p>

          {!location.pathname.startsWith("/recipe/") && (
            <section>
              <h3>Kategorier</h3>
              <ul>
                {recipe.categories && recipe.categories.length > 0 ? (
                  recipe.categories.map((cat, i) => <li key={i}>{cat}</li>)
                ) : (
                  <li>Inga kategorier tillgängliga </li>
                )}
              </ul>
            </section>
          )}

          <section>
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
          </section>

          {location.pathname.startsWith("/recipe/") && (
            <section>
              <h3>Instruktioner</h3>
              <ol>
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((instr, i) => <li key={i}>{instr}</li>) // elements ordered inside the original array
                ) : (
                  <li>Inga instruktioner tillgängliga</li>
                )}
              </ol>
            </section>
          )}

          <p className="recipe-rating">
            <strong>Genomsnittligt betyg:</strong>{" "}
            {recipe.avgRating ? recipe.avgRating : "Ingen än"}
          </p>
          {<RatingForm recipe={recipe} />}
        </div>
      )}
    </div>
  );
}
