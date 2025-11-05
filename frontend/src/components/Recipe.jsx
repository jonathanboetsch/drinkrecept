import { Link, useLocation } from "react-router-dom";
import "./App.css";
import RatingForm from "./RatingForm";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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

export default function Recipe({ recipe }) {
  const location = useLocation(); // information about the URL path, notably `pathname`

  // Hooks must be called unconditionally — move them before any early return.
  const [comments, setComments] = useState(recipe?.comments || []);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [thankYou, setThankYou] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments from backend when component mounts or recipe._id changes
  useEffect(() => {
    async function getComments() {
      if (!recipe?._id) return;
      try {
        const res = await fetch(`https://grupp3-jynxa.reky.se/recipes/${recipe._id}/comments`);
        if (!res.ok) throw new Error("Kunde inte hämta kommentarer");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        // Optionally handle error
        console.error("Något gick fel vid hämtning av kommentarer: ", err);
      }
    }
    getComments();
  }, [recipe?._id]);

  if (!recipe) {
    return <div className="recipe-not-found">Receptet hittades inte.</div>;
  }
  const fallbackImage = "/backupImage.png";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };
  // Beräkna svårighetsgrad för det enskilda receptet
  const difficulty = calculateDifficulty(recipe.timeInMins);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setThankYou(false);
    try {
      const res = await fetch(`https://grupp3-jynxa.reky.se/recipes/${recipe._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment }),
      });
      if (!res.ok) throw new Error("Kunde inte skicka kommentar");
      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setName("");
      setComment("");
      setThankYou(true);
    } catch (err) {
      alert("Något gick fel: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {recipe.message && <p className="recipe-message">{recipe.message}</p>}
      {!recipe.message && (
        <div className="recipe-card">
          {!location.pathname.startsWith("/recipe/") && (
            <Link
              to={recipe._id && `/recipe/${recipe._id}`}
              className="recipe-link"
              aria-label={`Öppna recept: ${recipe.title}`}
            />
          )}
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
            <strong>Rating:</strong>{" "}
            {recipe.avgRating ? Number(recipe.avgRating).toFixed(1) : "Ingen än"}
          </p>
          {location.pathname.startsWith("/recipe/") && <RatingForm recipe={recipe} />}
        </div>
      )}
      {location.pathname.startsWith("/recipe/") && (
        <div>
          <section
            style={{
              marginTop: "2rem",
              width: "100%",
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3>Lämna en kommentar</h3>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <input
                type="text"
                placeholder="Ditt namn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
              />
              <textarea
                placeholder="Din kommentar"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={3}
                style={{ padding: "0.5rem", borderRadius: 4, border: "1px solid #ccc" }}
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Skickar..." : "Skicka kommentar"}
              </button>
            </form>
            {thankYou && (
              <p style={{ color: "green", marginTop: "0.5rem" }}>Tack för din kommentar!</p>
            )}
          </section>
          <section
            style={{
              marginTop: "2rem",
              width: "100%",
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <h3>Kommentarer</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {comments.length === 0 && <li>Inga kommentarer än.</li>}
              {comments.map((c, i) => (
                <li
                  key={i}
                  style={{
                    borderBottom: "1px solid #eee",
                    marginBottom: "0.5rem",
                    paddingBottom: "0.5rem",
                  }}
                >
                  <strong>{c.name}</strong>: {c.comment}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

Recipe.propTypes = {
  _id: PropTypes.string.isRequired,

  title: PropTypes.string.isRequired,

  description: PropTypes.string.isRequired,

  imageUrl: PropTypes.string, // not required since there is a fallback image

  timeInMins: PropTypes.number.isRequired,

  price: PropTypes.number.isRequired,

  categories: PropTypes.arrayOf(PropTypes.string).isRequired,

  instructions: PropTypes.arrayOf(PropTypes.string).isRequired,

  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,

      amount: PropTypes.number.isRequired,

      unit: PropTypes.string.isRequired,

      _id: PropTypes.string.isRequired,
    }).isRequired
  ),

  avgRating: PropTypes.number, // not available if no user rated it yet
};
