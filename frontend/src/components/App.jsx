import { useEffect, useState, useMemo } from "react";
import { Route, Routes, useParams, useMatch } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./App.css";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";
import { RecipesContext, useRecipesContext } from "./RecipesContext";
import CategoryFilter from "./CategoryFilter";

function CategoryPage() {
  const { searchResult } = useRecipesContext();
  const { id } = useParams();
  const filtered = searchResult.filter((r) => (r.categories || []).includes(id));
  return (
    <div className="category-page">
      <h2 className="category-title"> {id}</h2>
      <RecipeList recipes={filtered} />
    </div>
  );
}

function RecipePage() {
  const { searchResult } = useRecipesContext();
  const { id } = useParams();
  const recipe = searchResult.find((r) => String(r._id) === String(id));
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
  // searchResult needed to implement search bar functionality
  // this becomes the element passed to the RecipeList instead of sending directly "recipes" array
  const [searchResult, setSearchResult] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Alla");
  const [userRatings, setUserRatings] = useState(() => {
    const storedRatings = localStorage.getItem("userRatings");
    return storedRatings ? JSON.parse(storedRatings) : [];
  });
  const API_URL = "https://grupp3-jynxa.reky.se/recipes";

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

  const initializeRatings = (data) => data.map((r) => ({ recipeId: r._id, rating: null }));

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Något gick fel vid hämtning av recept");
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setSearchResult(data);
        setUserRatings((prev) => {
          if (prev && prev.length > 0) return prev; // keep array if already populated
          return initializeRatings(data); // initialize null values otherwise
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false);
      });
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

  const updateAvgRating = (recipeId, newAvgRating) => {
    setRecipes((prev) =>
      prev.map((r) => (String(r._id) === String(recipeId) ? { ...r, avgRating: newAvgRating } : r))
    );
    setSearchResult((prev) =>
      prev.map((r) => (String(r._id) === String(recipeId) ? { ...r, avgRating: newAvgRating } : r))
    );
  };

  /* --- USER RATING INTEGRATION --- */

  // persist on disk whenever userRatings changes
  useEffect(() => {
    localStorage.setItem("userRatings", JSON.stringify(userRatings));
  }, [userRatings]);

  // update userRatings state var when user rates a recipe
  const updateUserRatings = (recipeId, rating) =>
    setUserRatings((prev) => {
      const found = prev.find((r) => String(r.recipeId) === String(recipeId));
      if (found) {
        return prev.map((r) => (String(r.recipeId) === String(recipeId) ? { ...r, rating } : r));
      } else {
        return [...prev, { recipeId, rating }];
      }
    });

  /* update values put in RecipesContext when recipes changes */
  const contextItems = useMemo(
    () => ({ searchResult, updateAvgRating, userRatings, updateUserRatings }),
    [userRatings, searchResult]
  );

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
      <header className="simple-header">
        <img src="/Header4.png" className="header-logo" alt="Recipe app logo" />
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
        <div className="routes-container">
          <RecipesContext.Provider value={contextItems}>
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
            </Routes>
          </RecipesContext.Provider>
        </div>
      </main>
    </div>
  );
}

export default App;
