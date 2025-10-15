import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Recipe from "./Recipe.jsx";
import SearchBar from "./SearchBar.jsx";
import Header from "../assets/Header2.png";
import "./CategoryPage.css";

const API_URL = "https://grupp3-jynxa.reky.se/recipes";

export default function CategoryPage() {
  const { id } = useParams(); // t.ex. "alkoholfri"
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 Ny state för sökning
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Hämta alla recept
  useEffect(() => {
    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error("Kunde inte hämta recept");
        return r.json();
      })
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // 🔍 Filtrera på kategori + sökterm
  useEffect(() => {
    if (!recipes.length) return;

    const normalized = id?.trim().toLowerCase() || "";
    const term = searchTerm.trim().toLowerCase();

    const match = recipes.filter((r) => {
      const inCategory = (r.categories || [])
        .map((c) => c.trim().toLowerCase())
        .includes(normalized);

      const inSearch =
        !term ||
        Object.values(r)
          .join(" ")
          .toLowerCase()
          .includes(term);

      return inCategory && inSearch;
    });

    setFiltered(match);
  }, [recipes, id, searchTerm]);

  const title =
    id && id.length
      ? id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
      : "Kategori";

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>Fel: {error}</p>;

  return (
    <div className="category-page">
      {/* 🖼 Header och sökfält */}
      <div className="header-container">
        <img src={Header} alt="Header" className="header-image" />
        <SearchBar onUserType={setSearchTerm} /> {/* 🔹 Filtrerar lokalt */}
      </div>

      {/* 🧭 Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-home">
          🏠 Start
        </Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{title}</span>
      </nav>

      {/* 🏷 Rubrik */}
      <h2 className="category-heading">{title} – drinkar</h2>

      {/* 🍸 Lista med recept */}
      {filtered.length === 0 ? (
        <p>Inga recept i kategorin “{title}”.</p>
      ) : (
        <div className="recipe-list">
          {filtered.map((r) => (
            <Recipe key={r._id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
