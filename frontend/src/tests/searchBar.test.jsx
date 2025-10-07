import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import SearchBar from "../components/SearchBar";

const mockOnUserType = vi.fn();
render(<SearchBar onUserType={mockOnUserType} />);
const input = screen.getByPlaceholderText("type your search here");

test("Component returns the input typed by the user", () => {
  fireEvent.change(input, { target: { value: "foobar" } });

  expect(mockOnUserType).toHaveBeenCalledWith("foobar");
});
