import { beforeAll, test, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./components/App.jsx";

// Mocka fetch för att returnera testdata
beforeAll(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            title: "Testrecept",
            description: "Beskrivning",
            imageUrl: "test.jpg",
            timeInMins: 10,
            price: 50,
            categories: ["Drink"],
            instructions: ["Blanda", "Servera"],
            ingredients: [{ amount: 2, unit: "cl", name: "Vodka" }],
            avgRating: 4,
          },
        ]),
    })
  );
});

test("App laddar och visar receptkort", async () => {
  render(<App />);
  expect(screen.getByText(/Laddar recept/i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByText(/Testrecept/i)).toBeInTheDocument()
  );
  expect(screen.getByText(/Beskrivning/i)).toBeInTheDocument();
  expect(screen.getByText(/Vodka/i)).toBeInTheDocument();
});
