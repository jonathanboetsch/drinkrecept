import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://grupp3-jynxa.reky.se/recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av recept");
        }
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Laddar recept...</p>;
  }
  if (error) {
    return <p>Fel är: {error}</p>;
  }

  return (
    <>
      <RecipeList recipes={recipes} />
    </>
  );
}
export default App;
