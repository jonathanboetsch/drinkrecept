import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import RecipeList from "./RecipeList";
import "./App.css";
import Header from "../assets/Header2.png";
import SearchBar from "./SearchBar";
import Recipe from "./Recipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // searchResult needed to implement search bar functionnality
  // this becomes the element passed to the RecipeList instead of sending directly "recipes" array
  const [searchResult, setSearchResult] = useState(recipes);

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
          <SearchBar onUserType={filterSearch} />
          <RecipeList recipes={searchResult} />
        </>
      </div>
    </div>
  );
}

export default App;
