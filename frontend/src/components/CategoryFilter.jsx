import React from "react";
import { Link } from "react-router-dom";
import "./CategoryFilter.css";

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  linkToRoute = false,
}) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          // className={cat === activeCategory ? "active" : ""}
          className={`category-filter__button${
            cat === activeCategory ? " category-filter__button--active" : ""
          }`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
