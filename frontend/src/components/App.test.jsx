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

describe("App", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading state initially", () => {
    render(<App />);
    expect(screen.getByText(/Laddar recept/i)).toBeInTheDocument();
  });

  it("renders recipes after successful fetch", async () => {
    const mockRecipes = [
      { id: 1, name: "Mojito" },
      { id: 2, name: "Gin Tonic" },
    ];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipes,
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Mojito")).toBeInTheDocument();
      expect(screen.getByText("Gin Tonic")).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Fel är:/i)).toBeInTheDocument();
    });
  });

  it("shows error message if fetch throws", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Fel är:/i)).toBeInTheDocument();
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });
});
