// frontend/src/components/App.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import React from "react";
import {
  vi,
  describe,
  beforeEach,
  afterEach,
  it,
  global,
  expect,
} from "vitest";

// Mock RecipeList to simplify output
vi.mock("./RecipeList", () => ({
  default: ({ recipes }) => (
    <div>
      {recipes.map((r) => (
        <div key={r.id}>{r.name}</div>
      ))}
    </div>
  ),
}));

describe("App Component", () => {
  // Mock fetch before each test
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  // console.log(vi)
  console.log(vi);
});
