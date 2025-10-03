import { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe.jsx";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // this is yet another comment for triggering a push to dev => tests Github Workflow deployment...

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
      {/* <p>BEGIN</p> */}
      {/* <Recipe /> */}
      {/* <p>END</p> */}
      {recipes.map((r, i) => (
        <Recipe key={i} recipe={r} />
      ))}
    </>
  );
}
export default App;
