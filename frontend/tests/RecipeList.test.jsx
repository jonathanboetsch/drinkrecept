import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeList from '../src/components/RecipeList.jsx';

// Mock the Recipe component to isolate RecipeList testing
vi.mock('../src/components/Recipe.jsx', () => ({
  default: ({ recipe }) => (
    <div data-testid={`recipe-${recipe.id}`} data-recipe-title={recipe.title}>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
    </div>
  ),
}));

describe('RecipeList Component', () => {
  const mockRecipes = [
    {
      id: 1,
      title: 'Mojito',
      description: 'En klassisk kubansk cocktail med mynta och lime',
      imageUrl: 'https://example.com/mojito.jpg',
      timeInMins: 10,
      price: 85,
      categories: ['Cocktail', 'Sommardryck'],
      instructions: ['Lägg mynta i glaset', 'Tillsätt lime'],
      ingredients: [
        { amount: 6, unit: 'blad', name: 'Mynta' },
        { amount: 1, unit: 'st', name: 'Lime' }
      ],
      avgRating: 4.5
    },
    {
      id: 2,
      title: 'Margarita',
      description: 'En mexikansk cocktail med tequila och lime',
      imageUrl: 'https://example.com/margarita.jpg',
      timeInMins: 8,
      price: 95,
      categories: ['Cocktail', 'Mexikansk'],
      instructions: ['Blanda ingredienser', 'Servera med is'],
      ingredients: [
        { amount: 4, unit: 'cl', name: 'Tequila' },
        { amount: 2, unit: 'cl', name: 'Cointreau' }
      ],
      avgRating: 4.2
    },
    {
      id: 3,
      title: 'Piña Colada',
      description: 'En tropisk cocktail med kokos och ananas',
      imageUrl: 'https://example.com/pina-colada.jpg',
      timeInMins: 12,
      price: 110,
      categories: ['Cocktail', 'Tropisk'],
      instructions: ['Mixa alla ingredienser', 'Garnera med ananas'],
      ingredients: [
        { amount: 5, unit: 'cl', name: 'Kokosmjölk' },
        { amount: 10, unit: 'cl', name: 'Ananassaft' }
      ],
      avgRating: 3.8
    }
  ];

  it('renders without crashing with valid recipes', () => {
    render(<RecipeList recipes={mockRecipes} />);
    expect(screen.getByTestId('recipe-1')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-2')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-3')).toBeInTheDocument();
  });

  it('renders the correct number of Recipe components', () => {
    render(<RecipeList recipes={mockRecipes} />);
    
    const recipeElements = screen.getAllByTestId(/^recipe-\d+$/);
    expect(recipeElements).toHaveLength(3);
  });

  it('passes correct recipe data to each Recipe component', () => {
    render(<RecipeList recipes={mockRecipes} />);
    
    // Check that each recipe title is rendered (via mocked Recipe component)
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Piña Colada')).toBeInTheDocument();
    
    // Check that descriptions are rendered
    expect(screen.getByText('En klassisk kubansk cocktail med mynta och lime')).toBeInTheDocument();
    expect(screen.getByText('En mexikansk cocktail med tequila och lime')).toBeInTheDocument();
    expect(screen.getByText('En tropisk cocktail med kokos och ananas')).toBeInTheDocument();
  });

  it('renders recipes in the correct order', () => {
    render(<RecipeList recipes={mockRecipes} />);
    
    const recipeElements = screen.getAllByTestId(/^recipe-\d+$/);
    
    // Check that recipes appear in the order they were provided
    expect(recipeElements[0]).toHaveAttribute('data-recipe-title', 'Mojito');
    expect(recipeElements[1]).toHaveAttribute('data-recipe-title', 'Margarita');
    expect(recipeElements[2]).toHaveAttribute('data-recipe-title', 'Piña Colada');
  });

  it('handles empty recipes array gracefully', () => {
    const { container } = render(<RecipeList recipes={[]} />);
    
    // Should render the wrapper div but no Recipe components
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild.tagName).toBe('DIV');
    expect(container.firstChild.children).toHaveLength(0);
    
    // Should not have any recipe elements
    expect(screen.queryByTestId(/^recipe-\d+$/)).not.toBeInTheDocument();
  });

  it('handles single recipe correctly', () => {
    const singleRecipe = [mockRecipes[0]];
    render(<RecipeList recipes={singleRecipe} />);
    
    const recipeElements = screen.getAllByTestId(/^recipe-\d+$/);
    expect(recipeElements).toHaveLength(1);
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.queryByText('Margarita')).not.toBeInTheDocument();
  });

  it('renders wrapper div container', () => {
    const { container } = render(<RecipeList recipes={mockRecipes} />);
    
    // Check that the component renders a div as the root element
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild.tagName).toBe('DIV');
  });

  it('handles recipes with different data structures', () => {
    const diverseRecipes = [
      {
        id: 1,
        title: 'Simple Recipe',
        description: 'Basic description',
        categories: [],
        instructions: [],
        ingredients: []
      },
      {
        id: 2,
        title: 'Complex Recipe',
        description: 'Detailed description with special chars: åäö & symbols',
        timeInMins: 0,
        price: 0,
        avgRating: null
      }
    ];
    
    render(<RecipeList recipes={diverseRecipes} />);
    
    expect(screen.getByText('Simple Recipe')).toBeInTheDocument();
    expect(screen.getByText('Complex Recipe')).toBeInTheDocument();
    expect(screen.getByText('Basic description')).toBeInTheDocument();
    expect(screen.getByText('Detailed description with special chars: åäö & symbols')).toBeInTheDocument();
  });

  it('handles recipes with missing or null properties', () => {
    const recipesWithMissingProps = [
      {
        id: 1,
        title: 'Minimal Recipe'
        // Missing other properties
      },
      {
        id: 2,
        title: 'Recipe with nulls',
        description: null,
        imageUrl: null,
        categories: null
      }
    ];
    
    render(<RecipeList recipes={recipesWithMissingProps} />);
    
    expect(screen.getByText('Minimal Recipe')).toBeInTheDocument();
    expect(screen.getByText('Recipe with nulls')).toBeInTheDocument();
  });

  it('re-renders when recipes prop changes', () => {
    const initialRecipes = [mockRecipes[0]];
    const { rerender } = render(<RecipeList recipes={initialRecipes} />);
    
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.queryByText('Margarita')).not.toBeInTheDocument();
    
    // Update props with different recipes
    const updatedRecipes = [mockRecipes[1], mockRecipes[2]];
    rerender(<RecipeList recipes={updatedRecipes} />);
    
    expect(screen.queryByText('Mojito')).not.toBeInTheDocument();
    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Piña Colada')).toBeInTheDocument();
  });

  it('handles large number of recipes', () => {
    // Create a large array of recipes
    const manyRecipes = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      title: `Recipe ${index + 1}`,
      description: `Description for recipe ${index + 1}`,
      categories: [`Category ${index % 5 + 1}`],
      instructions: [`Step 1 for recipe ${index + 1}`],
      ingredients: [{ amount: 1, unit: 'st', name: `Ingredient ${index + 1}` }]
    }));
    
    render(<RecipeList recipes={manyRecipes} />);
    
    const recipeElements = screen.getAllByTestId(/^recipe-\d+$/);
    expect(recipeElements).toHaveLength(50);
    
    // Check first and last recipes
    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText('Recipe 50')).toBeInTheDocument();
  });

  it('passes complete recipe objects to Recipe components', () => {
    render(<RecipeList recipes={mockRecipes} />);
    
    // Verify that each Recipe component receives the complete recipe object
    // This is tested indirectly by checking that our mock Recipe component
    // can access and render the recipe properties
    const recipeWithId1 = screen.getByTestId('recipe-1');
    const recipeWithId2 = screen.getByTestId('recipe-2');
    const recipeWithId3 = screen.getByTestId('recipe-3');
    
    expect(recipeWithId1).toHaveAttribute('data-recipe-title', 'Mojito');
    expect(recipeWithId2).toHaveAttribute('data-recipe-title', 'Margarita');
    expect(recipeWithId3).toHaveAttribute('data-recipe-title', 'Piña Colada');
  });

  it('maintains component structure with different recipe content', () => {
    const specialRecipes = [
      {
        id: 999,
        title: 'Recipe with "quotes" and special chars: åäö',
        description: 'Description with <HTML> tags and & symbols'
      }
    ];
    
    const { container } = render(<RecipeList recipes={specialRecipes} />);
    
    // Should still maintain the basic div wrapper structure
    expect(container.firstChild.tagName).toBe('DIV');
    expect(container.firstChild.children).toHaveLength(1);
    
    // Content should be properly rendered
    expect(screen.getByText('Recipe with "quotes" and special chars: åäö')).toBeInTheDocument();
    expect(screen.getByText('Description with <HTML> tags and & symbols')).toBeInTheDocument();
  });

  it('handles recipes array with mixed valid and incomplete data', () => {
    const mixedRecipes = [
      mockRecipes[0], // Complete recipe
      { id: 2, title: 'Incomplete Recipe' }, // Minimal recipe
      mockRecipes[2], // Another complete recipe
      { id: 4 } // Very incomplete recipe (missing title)
    ];
    
    render(<RecipeList recipes={mixedRecipes} />);
    
    const recipeElements = screen.getAllByTestId(/^recipe-\d+$/);
    expect(recipeElements).toHaveLength(4);
    
    // Should render all recipes regardless of completeness
    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByText('Incomplete Recipe')).toBeInTheDocument();
    expect(screen.getByText('Piña Colada')).toBeInTheDocument();
  });
});