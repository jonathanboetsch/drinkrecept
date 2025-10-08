import { useEffect, useState } from "react";
import RecipeList from "./RecipeList";
import "./App.css";
import Header from "../assets/Header2.png";

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

<div>

  <div className="header-container">
    <img src={Header} alt="Header" className="header-image" />






   <>
      {/* <p>BEGIN</p> */}
      {/* <Recipe /> */}
      {/* <p>END</p> */}
      <RecipeList recipes={recipes} />
    </>
    </div>

</div>
);
}

export default App;



