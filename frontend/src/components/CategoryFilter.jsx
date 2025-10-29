import React from "react";
import { Link } from "react-router-dom";
import "./CategoryFilter.css";

export default function CategoryFilter({ categories, activeCategory, linkToRoute = false }) {
  return (
    <div className="category-filter">
      {categories.map(
        (cat) =>
          linkToRoute && (
            <Link
              key={cat}
              to={cat === "Alla" ? "/" : `/category/${cat}`}
              className={`category-filter__button${
                cat === activeCategory ? " category-filter__button--active" : ""
              }`}
            >
              {cat}
            </Link>
          )
      )}
    </div>
  );
}
