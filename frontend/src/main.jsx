import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";
import CategoryPage from "./components/CategoryPage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter gör att React Router kan tolka dina länkar */}
    <BrowserRouter>
      <Routes>
        {/* 🏠 Startsidan (App innehåller sökning och kategoriknappar) */}
        <Route path="/" element={<App />} />

        {/* 📂 Kategorisida (t.ex. /category/alkoholfri, /category/rom) */}
        <Route path="/category/:id" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
