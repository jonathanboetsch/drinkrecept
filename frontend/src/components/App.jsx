import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./App.css";
import Header from "../assets/Header2.png";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";
import CategoryPage from "./CategoryPage";



/* =======================
   🔹 RECEPTSIDA (RecipePage)
   ======================= */
function RecipePage({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find((r) => String(r._id) === id);
  return recipe ? (
    <Recipe recipe={recipe} />
  ) : (
    <p>Receptet hittades inte</p>
  );
}

/* =======================
   🚀 HUVUDKOMPONENT (App)
   ======================= */
function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // searchResult används av sökfältet
  const [searchResult, setSearchResult] = useState(recipes);

  // Hjälpfunktion för att fläta ut receptobjekt för sökning
  const flattenValues = (obj) => {
    return Object.values(obj)
      .map((v) =>
        v && typeof v === "object"
          ? flattenValues(v)
          : String(v)
      )
      .join(" ");
  };

  // Filtrera recept vid sökning
  const filterSearch = (input = "") => {
    const text = input.trim().toLowerCase();
    if (text) {
      const result = recipes.filter((r) =>
        flattenValues(r).toLowerCase().includes(text)
      );
      result.length > 0
        ? setSearchResult(result)
        : setSearchResult([{ message: "No results found" }]);
    } else {
      setSearchResult(recipes);
    }
  };

  // Hämta recept från API
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

  // Uppdatera sökresultat när recepten laddas
  useEffect(() => {
    setSearchResult(recipes);
  }, [recipes]);

  if (loading) {
    return <p>Laddar recept...</p>;
  }

  if (error) {
    return <p>Fel är: {error}</p>;
  }

  /* =======================
     🎨 APP-UI MED ROUTER
     ======================= */
  return (
    <div>
      <div className="header-container">
        <img src={Header} alt="Header" className="header-image" />
        <SearchBar onUserType={filterSearch} />

        <Routes>
          {/* 🏠 Startsida */}
          <Route
            path="/"
            element={<RecipeList recipes={searchResult} />}
          />

          {/* 🧭 Kategorisida */}
          <Route
            path="/category/:id"
            element={<CategoryPage recipes={searchResult} />}
          />

          {/* 🍸 Enskild receptsida */}
          <Route
            path="/recipe/:id"
            element={<RecipePage recipes={searchResult} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
