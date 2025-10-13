import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const ghPagesFlag = import.meta.env.VITE_GH_PAGES;
const prNumber = import.meta.env.VITE_PR_NUMBER;

// console.log("GH_PAGES:", ghPagesFlag);
// console.log("PR_NUMBER:", prNumber);
// ...existing code...
console.log("import.meta.env:", import.meta.env);
// ...existing code...

const basename = ghPagesFlag ? `/drinkrecept/pr-${prNumber}/` : "/";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
