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
      {categories.map((cat) => {
        const normalized = cat.toLowerCase(); // säker jämförelse
        const isActive = cat === activeCategory;

        const btn = (
          <button
            className={isActive ? "active" : ""}
            onClick={!linkToRoute ? () => onSelectCategory(cat) : undefined}
          >
            {cat}
          </button>
        );

        // Om länkar används → wrappa korrekt i Link
        return linkToRoute ? (
          <Link key={cat} to={`/category/${cat.toLowerCase()}`}>
            {btn}
          </Link>
        ) : (
          <React.Fragment key={normalized}>{btn}</React.Fragment>
        );
      })}
    </div>
  );
}
