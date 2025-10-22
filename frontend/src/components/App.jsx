import { useEffect, useState } from "react";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./App.css";
import Header from "../assets/Header2.png";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";

function CategoryPage({ recipes }) {
  const { id } = useParams();
  const filtered = recipes.filter((r) => (r.categories || []).includes(id));
  return (
    <>
      <div className="category-page">
        <h2 className="category-title">Kategori: {id}</h2>
        <RecipeList recipes={filtered} />
      </div>
    </>
  );
}

function RecipePage({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find((r) => String(r._id) === id);
  // return recipe ? <Recipe recipe={recipe} /> : <p>Receptet hittades inte</p>;
  return (
    <div className="recipe-page">
      {recipe ? (
        <Recipe recipe={recipe} />
      ) : (
        <p className="not-found-message">Receptet hittades inte</p>
      )}
    </div>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const location = useLocation();

  // 🔹 Hjälper sökfältet fungera som innan
  const flattenValues = (obj) =>
    Object.values(obj)
      .map((v) => (v && typeof v === "object" ? flattenValues(v) : String(v)))
      .join(" ");

  const filterSearch = (input = "") => {
    const text = input.trim().toLowerCase();
    if (text) {
      const result = recipes.filter((r) =>
        flattenValues(r).toLowerCase().includes(text)
      );
      setSearchResult(result.length > 0 ? result : []);
    } else {
      setSearchResult(recipes);
    }
  };

  useEffect(() => {
    fetch("https://grupp3-jynxa.reky.se/recipes")
      .then((response) => {
        if (!response.ok)
          throw new Error("Något gick fel vid hämtning av recept");
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setSearchResult(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // return <p>Laddar recept...</p>;
    return <p className="loading-message">Laddar recept...</p>;
  }

  if (error) {
    // return <p>Fel är: {error}</p>;
    return <p className="error-message">Fel är: {error}</p>;
  }

  return (
    <div className="app-container">
      <header className="header-container">
        <img src={Header} alt="Header" className="header-image" />
        <SearchBar className="search-bar" onUserType={filterSearch} />
      </header>
      <main className="main-content">
        <div className="routes-container">
          <Routes>
            {/* 
            Make sure to navigate to /category/alkohol (without colon) 
            Example: <Link to={`/category/alkohol`}>Alkohol</Link>
          */}
            <Route path="/" element={<RecipeList recipes={searchResult} />} />
            <Route path="/category/:id" element={<CategoryPage recipes={searchResult} />} />
            <Route path="/recipe/:id" element={<RecipePage recipes={searchResult} />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
