import { useEffect, useState, useMemo } from "react";
import { Route, Routes, useParams, useMatch } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./App.css";
import Header from "../assets/Header2.png";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";
import CategoryFilter from "./CategoryFilter";

function CategoryPage({ recipes }) {
  const { id } = useParams();
  const filtered = recipes.filter((r) => (r.categories || []).includes(id));
  return (
    <div className="category-page">
      <h2 className="category-title"> {id}</h2>
      <RecipeList recipes={filtered} />
    </div>
  );
}

function RecipePage({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find((r) => String(r._id) === id);
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

  const match = useMatch("/category/:id"); // 🔹 gets the id of the category from the URL path
  const activeCategory = match?.params?.id || "Alla"; // 🔹 set active category based on the URI

  const flattenValues = (obj) =>
    Object.values(obj)
      .map((v) => (v && typeof v === "object" ? flattenValues(v) : String(v)))
      .join(" ");

  const filterSearch = (input = "") => {
    const text = input.trim().toLowerCase();
    if (text) {
      const result = recipes.filter((r) => flattenValues(r).toLowerCase().includes(text));
      setSearchResult(result.length > 0 ? result : []);
    } else {
      setSearchResult(recipes);
    }
  };

  useEffect(() => {
    fetch("https://grupp3-jynxa.reky.se/recipes")
      .then((response) => {
        if (!response.ok) throw new Error("Något gick fel vid hämtning av recept");
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setSearchResult(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // allCategories recalculates only when there is an update of recipes (f.ex. recipes re-fetched)
  const allCategories = useMemo(() => {
    return ["Alla", ...new Set(recipes.flatMap((r) => r.categories || []))].sort();
  }, [recipes]);

  if (loading) return <p className="loading-message">Laddar recept...</p>;
  if (error) return <p className="error-message">Fel är: {error}</p>;

  return (
    <div className="app-container">
      <header className="header-container">
        <img src={Header} alt="Header" className="header-image" />
        <SearchBar className="search-bar" onUserType={filterSearch} />
        <CategoryFilter
          categories={allCategories}
          activeCategory={activeCategory}
          linkToRoute={true}
        />
      </header>

      <main className="main-content">
        <div className="routes-container">
          <Routes>
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
