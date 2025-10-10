import React from "react";
import "./CategoryFilter.css";

export default function CategoryFilter({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="category-filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={cat === activeCategory ? "active" : ""}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
