import { useEffect, useState, useMemo } from "react";
import { Route, Routes, useParams, useMatch } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./App.css";
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
  const [activeCategory, setActiveCategory] = useState("Alla");

  const match = useMatch("/category/:id"); // 🔹 gets the id of the category from the URL path

  useEffect(() => {
    setActiveCategory(match?.params?.id || "Alla"); // 🔹 set active category based on the URI
  }, [match]);

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

  // needed to load recipes onto searchResult as soon as they are fetched
  useEffect(() => {
    setSearchResult(recipes);
  }, [recipes]);

  // const categories = useMemo(() => {
  //   const set = new Set();
  //   (searchResult || []).forEach((r) => (r.categories || []).forEach((c) => set.add(c)));
  //   return ["Alla", ...Array.from(set).sort()];
  // }, [searchResult]);

  // allCategories recalculates only when there is an update of recipes (f.ex. recipes re-fetched)
  const allCategories = useMemo(() => {
    return ["Alla", ...new Set(recipes.flatMap((r) => r.categories || []))].sort();
  }, [recipes]);

  const changeActiveCategory = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    // return <p>Laddar recept...</p>;
    return <p className="loading-message">Laddar recept...</p>;
  }
  if (error) {
    // return <p>Fel är: {error}</p>;
    return <p className="error-message">Fel är: {error}</p>;
  }

  if (loading) return <p className="loading-message">Laddar recept...</p>;
  if (error) return <p className="error-message">Fel är: {error}</p>;

  return (
    <div className="app-container">
      <header className="simple-header">
        <img src="/Header4.png" className="header-logo" />
        <h3 className="header-title"></h3>
        <div className="header-search">
          <SearchBar onUserType={filterSearch} />
        </div>

        <CategoryFilter
          categories={allCategories}
          activeCategory={activeCategory}
          linkToRoute={true}
          changeActiveCategory={changeActiveCategory}
        />
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<RecipeList recipes={searchResult} />} />
          <Route path="/category/:id" element={<CategoryPage recipes={searchResult} />} />
          <Route path="/recipe/:id" element={<RecipePage recipes={searchResult} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
