import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Recipe from "./Recipe.jsx";
import "./CategoryPage.css";

export default function CategoryPage({ recipes = [] }) {
  const { id } = useParams(); // t.ex. "alkoholfri"

  const title = id
    ? id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
    : "Kategori";

  // Filtrera mot URL-parametern
  const filtered = useMemo(() => {
    if (!id || id.toLowerCase() === "alla") return recipes;
    const needle = id.trim().toLowerCase();
    return recipes.filter((r) =>
      (r.categories || []).some(
        (c) => c && c.toLowerCase() === needle
      )
    );
  }, [recipes, id]);

  return (
    <div className="category-page">
      <nav className="breadcrumb">
        <Link to="/" className="breadcrumb-home">🏠 Start</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{title}</span>
      </nav>

      {/* Titel – undvik “– Drinkar” dublett */}
      <h2 className="category-heading">{title} </h2>

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
