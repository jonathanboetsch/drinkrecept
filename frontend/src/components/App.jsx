import { useEffect, useState } from "react";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./App.css";
import Header from "../assets/Header2.png";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";
import CategoryPage from "./CategoryPage";
import CategoryFilter from "./CategoryFilter";

function RecipePage({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find((r) => String(r._id) === id);
  return recipe ? <Recipe recipe={recipe} /> : <p>Receptet hittades inte</p>;
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

  if (loading) return <p>Laddar recept...</p>;
  if (error) return <p>Fel: {error}</p>;

  // 🔹 Skapa kategorilista
  const categories = ["Alla", ...new Set(recipes.flatMap((r) => r.categories || []))];

  // 🔹 Hitta aktiv kategori baserat på URL
  const currentCategory = location.pathname.startsWith("/category/")
    ? decodeURIComponent(location.pathname.split("/category/")[1])
    : "Alla";

  return (
    <div className="app-container">
      <img src={Header} alt="Header" className="header-image" />
      <SearchBar onUserType={filterSearch} />

      {/* ✅ Den enda CategoryFilter i hela appen */}
      <CategoryFilter
        categories={categories}
        activeCategory={currentCategory}
        linkToRoute={true}
      />

      <Routes>
        <Route path="/" element={<RecipeList recipes={searchResult} />} />
        <Route path="/category/:id" element={<CategoryPage recipes={searchResult} />} />
        <Route path="/recipe/:id" element={<RecipePage recipes={searchResult} />} />
      </Routes>
    </div>
  );
}

export default App;
