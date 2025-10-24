import { useEffect, useState, useMemo } from "react";
import RecipeList from "./RecipeList";
import "./App.css";
import Header from "../assets/Header2.png";
import SearchBar from "./SearchBar";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // searchResult needed to implement search bar functionnality
  // this becomes the element passed to the RecipeList instead of sending directly "recipes" array
  const [searchResult, setSearchResult] = useState(recipes);
  const [activeCategory, setActiveCategory] = useState("Alla");
  const [menuOpen, setMenuOpen] = useState(false);

  const flattenValues = (obj) => {
    return Object.values(obj)
      .map((v) =>
        v && typeof v === "object"
          ? flattenValues(v) // recursively flatten if finds nested object
          : String(v)
      )
      .join(" ");
  };

  const filterSearch = (input = "") => {
    const text = input.trim().toLowerCase();
    if (text) {
      const result = recipes.filter((r) => flattenValues(r).toLowerCase().includes(text));
      result.length > 0
        ? setSearchResult(result)
        : setSearchResult([{ message: "No results found" }]);
    } else setSearchResult(recipes);
  };

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

  // needed to load recipes onto searchResult as soon as they are fetched
  useEffect(() => {
    setSearchResult(recipes);
  }, [recipes]);

  const categories = useMemo(() => {
    const set = new Set();
    (searchResult || []).forEach((r) => (r.categories || []).forEach((c) => set.add(c)));
    return ["Alla", ...Array.from(set).sort()];
  }, [searchResult]);

  if (loading) {
    return <p>Laddar recept...</p>;
  }
  if (error) {
    return <p>Fel är: {error}</p>;
  }
  return (
    <div>
      <div className="simple-header">
        <img src="/Header3.png" className="header-logo" />
        <h3 className="header-title"></h3>
        <div className="header-search">
          <SearchBar onUserType={filterSearch} />
        </div>

        <div className="hamburger-container">
          <button
            className="hamburger-button"
            aria-expanded={menuOpen}
            aria-label="Open categories menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ☰
          </button>
          <div className={`hamburger-menu ${menuOpen ? "open" : ""}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={cat === activeCategory ? "active" : ""}
                onClick={() => {
                  setActiveCategory(cat);
                  setMenuOpen(false);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <>
        {/* <p>BEGIN</p> */}
        {/* <Recipe /> */}
        {/* <p>END</p> */}
        <RecipeList
          recipes={searchResult}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          showFilter={false}
        />
      </>
    </div>
  );
}

export default App;
