import { useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryFilter.css";

export default function CategoryFilter({
  categories,
  activeCategory,
  changeActiveCategory,
  linkToRoute = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
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
            <div className="category-button-and-link" key={cat}>
              <button
                className={cat === activeCategory ? "active" : ""}
                onClick={() => {
                  setMenuOpen(false);
                  changeActiveCategory(cat);
                }}
              >
                {cat}
              </button>
              {linkToRoute && (
                <Link className="invisible-hitbox" to={cat === "Alla" ? "/" : `/category/${cat}`}>
                  {cat}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
