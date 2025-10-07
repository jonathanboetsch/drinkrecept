import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import SearchBar from "../components/SearchBar";

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
  render(<SearchBar onUserType={() => {}} />);

  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute("type", "search");
  expect(input).toHaveClass("search-bar");
});
