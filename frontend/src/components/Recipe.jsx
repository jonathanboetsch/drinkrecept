import { Link, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

export default function Recipe({ recipe }) {
  const fallbackImage = "/backupImage.png";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const location = useLocation(); // information about the URL path, notably `pathname`

  return (
    <div>
      {recipe.message && <p>{recipe.message}</p>}
      {/* console.log(recipe); */}
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
          <p>
            <strong>Tillagningstid:</strong> {recipe.timeInMins || "Okänt tillagningstid "} minuter
          </p>
          <p>
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

          <p>
            <strong>Genomsnittligt betyg:</strong>{" "}
            {recipe.avgRating ? recipe.avgRating : "Ingen än"}
          </p>
        </div>
      )}
    </div>
  );
}
