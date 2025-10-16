import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/components/App.jsx';

// Mock the RecipeList component since we're testing App in isolation
vi.mock('../src/components/RecipeList', () => ({
  default: ({ recipes }) => (
    <div data-testid="recipe-list">
      {recipes.map((recipe, index) => (
        <div key={index} data-testid={`recipe-${index}`}>
          {recipe.name || `Recipe ${index}`}
        </div>
      ))}
    </div>
  ),
}));

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('App Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading message initially', () => {
    // Mock a pending promise to keep component in loading state
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    render(<App />);
    
    expect(screen.getByText('Laddar recept...')).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith('https://grupp3-jynxa.reky.se/recipes');
  });

  it('renders error message when fetch fails', async () => {
    const errorMessage = 'Network error';
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(`Fel är: ${errorMessage}`)).toBeInTheDocument();
    });

    expect(screen.queryByText('Laddar recept...')).not.toBeInTheDocument();
  });

  it('renders error message when response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Fel är: Något gick fel vid hämtning av recept')).toBeInTheDocument();
    });

    expect(screen.queryByText('Laddar recept...')).not.toBeInTheDocument();
  });

  it('renders RecipeList with recipes when fetch is successful', async () => {
    const mockRecipes = [
      { id: 1, name: 'Mojito' },
      { id: 2, name: 'Piña Colada' },
      { id: 3, name: 'Margarita' },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRecipes),
    });

    render(<App />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText('Laddar recept...')).not.toBeInTheDocument();
    });

    // Check that RecipeList is rendered with correct data
    expect(screen.getByTestId('recipe-list')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-0')).toHaveTextContent('Mojito');
    expect(screen.getByTestId('recipe-1')).toHaveTextContent('Piña Colada');
    expect(screen.getByTestId('recipe-2')).toHaveTextContent('Margarita');
  });

  it('renders RecipeList with empty array when no recipes returned', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Laddar recept...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('recipe-list')).toBeInTheDocument();
    expect(screen.queryByTestId('recipe-0')).not.toBeInTheDocument();
  });

  it('calls fetch with correct URL', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    render(<App />);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://grupp3-jynxa.reky.se/recipes');
  });

  it('handles JSON parsing error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON')),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Fel är: Invalid JSON')).toBeInTheDocument();
    });

    expect(screen.queryByText('Laddar recept...')).not.toBeInTheDocument();
  });

  it('only fetches data once on mount', async () => {
    const mockRecipes = [{ id: 1, name: 'Test Recipe' }];
    
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockRecipes),
    });

    const { rerender } = render(<App />);

    await waitFor(() => {
      expect(screen.queryByText('Laddar recept...')).not.toBeInTheDocument();
    });

    // Re-render the component
    rerender(<App />);

    // Fetch should still only have been called once
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('displays loading state correctly during transition', async () => {
    let resolvePromise;
    const fetchPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    mockFetch.mockReturnValueOnce(fetchPromise);

    render(<App />);

    // Should show loading initially
    expect(screen.getByText('Laddar recept...')).toBeInTheDocument();
    expect(screen.queryByTestId('recipe-list')).not.toBeInTheDocument();
    expect(screen.queryByText(/Fel är:/)).not.toBeInTheDocument();

    // Resolve the fetch
    resolvePromise({
      ok: true,
      json: () => Promise.resolve([{ id: 1, name: 'Test Recipe' }]),
    });

    // Wait for loading to disappear and content to appear
    await waitFor(() => {
      expect(screen.queryByText('Laddar recept...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('recipe-list')).toBeInTheDocument();
  });
});