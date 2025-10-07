import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, beforeEach } from "vitest";
import SearchBar from "../components/SearchBar";
import userEvent from "@testing-library/user-event";

let mockOnUserType;
let input;

beforeEach(() => {
  mockOnUserType = vi.fn();
  render(<SearchBar onUserType={mockOnUserType} />);
  input = screen.getByPlaceholderText("type your search here");
});

test("Component returns the input typed by the user", () => {
  fireEvent.change(input, { target: { value: "foobar" } });

  expect(mockOnUserType).toHaveBeenCalledWith("foobar");
});

test("Component calls onUserType on every keystroke", async () => {
  await userEvent.type(input, "foo"); // simulates real typing

  // Expect the callback to have been called 3 times (once per keystroke)
  expect(mockOnUserType).toHaveBeenCalledTimes(3);

  // Expect last call to have received the full string
  expect(mockOnUserType).toHaveBeenCalledWith("foo");
});
