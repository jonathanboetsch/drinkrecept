// frontend/src/components/Recipe.test.jsx
import { render, screen } from "@testing-library/react";
import Recipe from "./Recipe";

describe("App Component", () => {
  test("renders Recipe", () => {
    render(<Recipe />);
    expect(screen.getByText("Beskrivning")).toBeInTheDocument();
  });
});
