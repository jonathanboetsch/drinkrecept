import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, beforeEach } from "vitest";
import SearchBar from "../components/SearchBar";
import userEvent from "@testing-library/user-event";

function setup() {
  const mockOnUserType = vi.fn();
  render(<SearchBar onUserType={mockOnUserType} />);
  const input = screen.getByPlaceholderText("type your search here");
  return { mockOnUserType, input };
}

test("Component returns the input typed by the user", () => {
  const { mockOnUserType, input } = setup();

  fireEvent.change(input, { target: { value: "foobar" } });

  expect(mockOnUserType).toHaveBeenCalledWith("foobar");
});

test("Component calls onUserType on every keystroke", async () => {
  const { mockOnUserType, input } = setup();
  await userEvent.type(input, "foo"); // simulates real typing

  // Expect the callback to have been called 3 times (once per keystroke)
  expect(mockOnUserType).toHaveBeenCalledTimes(3);

  // Expect last call to have received the full string
  expect(mockOnUserType).toHaveBeenCalledWith("foo");
});

// Ensures the UI isn’t accidentally changed by refactors or CSS tweaks
test("renders with correct placeholder and type", () => {
  const { _, input } = setup();

  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute("type", "search");
  expect(input).toHaveClass("search-bar");
});

// Verifies consistent behavior when user deletes their search
test("calls onUserType with empty string when input is cleared", async () => {
  const { mockOnUserType, input } = setup();
  await userEvent.type(input, "foo");
  await userEvent.clear(input);

  expect(mockOnUserType).toHaveBeenLastCalledWith("");
});
