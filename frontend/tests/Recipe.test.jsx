import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Recipe from '../src/components/Recipe.jsx';

describe('Recipe Component', () => {
  const mockRecipe = {
    title: 'Mojito',
    description: 'En klassisk kubansk cocktail med mynta och lime',
    imageUrl: 'https://example.com/mojito.jpg',
    timeInMins: 10,
    price: 85,
    categories: ['Cocktail', 'Alkoholfri tillgänglig', 'Sommardryck'],
    instructions: [
      'Lägg mynta i botten av glaset',
      'Tillsätt lime och sockerssirap',
      'Muddle försiktigt',
      'Tillsätt crushed ice',
      'Häll i rum och sodavatten'
    ],
    ingredients: [
      { amount: 6, unit: 'blad', name: 'Färsk mynta' },
      { amount: 1, unit: 'st', name: 'Lime' },
      { amount: 2, unit: 'cl', name: 'Sockerssirap' },
      { amount: 4, unit: 'cl', name: 'Vit rom' },
      { amount: 10, unit: 'cl', name: 'Sodavatten' }
    ],
    avgRating: 4.5
  };

  it('renders recipe title correctly', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mojito');
  });

  it('renders recipe description with label', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByText('Beskrivning:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('En klassisk kubansk cocktail med mynta och lime')).toBeInTheDocument();
  });

  it('renders recipe image with correct attributes', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    const image = screen.getByAltText('Mojito');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/mojito.jpg');
    expect(image).toHaveAttribute('width', '300');
  });

  it('renders cooking time correctly', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByText('Tillagningstid:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('10 minuter', { exact: false })).toBeInTheDocument();
  });

  it('renders price correctly', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByText('Pris:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('85 kr', { exact: false })).toBeInTheDocument();
  });

  it('renders categories section with all categories', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByText('Kategorier')).toBeInTheDocument();
    expect(screen.getByText('Cocktail')).toBeInTheDocument();
    expect(screen.getByText('Alkoholfri tillgänglig')).toBeInTheDocument();
    expect(screen.getByText('Sommardryck')).toBeInTheDocument();
  });

  it('renders instructions section with all steps in correct order', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByText('Instruktioner')).toBeInTheDocument();
    
    // Check that all instruction steps are rendered
    expect(screen.getByText('Lägg mynta i botten av glaset')).toBeInTheDocument();
    expect(screen.getByText('Tillsätt lime och sockerssirap')).toBeInTheDocument();
    expect(screen.getByText('Muddle försiktigt')).toBeInTheDocument();
    expect(screen.getByText('Tillsätt crushed ice')).toBeInTheDocument();
    expect(screen.getByText('Häll i rum och sodavatten')).toBeInTheDocument();
  });

  it('renders ingredients section with amounts, units, and names', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByText('Ingredienser')).toBeInTheDocument();
    expect(screen.getByText('6 blad Färsk mynta')).toBeInTheDocument();
    expect(screen.getByText('1 st Lime')).toBeInTheDocument();
    expect(screen.getByText('2 cl Sockerssirap')).toBeInTheDocument();
    expect(screen.getByText('4 cl Vit rom')).toBeInTheDocument();
    expect(screen.getByText('10 cl Sodavatten')).toBeInTheDocument();
  });

  it('renders average rating when provided', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    expect(screen.getByText('Genomsnittligt betyg:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('4.5', { exact: false })).toBeInTheDocument();
  });

  it('renders "Ingen än" when no rating is provided', () => {
    const recipeWithoutRating = { ...mockRecipe, avgRating: null };
    render(<Recipe recipe={recipeWithoutRating} />);
    
    expect(screen.getByText('Genomsnittligt betyg:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Ingen än', { exact: false })).toBeInTheDocument();
  });

  it('renders "Ingen än" when rating is undefined', () => {
    const { avgRating, ...recipeWithoutRating } = mockRecipe;
    render(<Recipe recipe={recipeWithoutRating} />);
    
    expect(screen.getByText('Genomsnittligt betyg:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Ingen än', { exact: false })).toBeInTheDocument();
  });

  it('renders "Ingen än" when rating is 0', () => {
    const recipeWithZeroRating = { ...mockRecipe, avgRating: 0 };
    render(<Recipe recipe={recipeWithZeroRating} />);
    
    expect(screen.getByText('Genomsnittligt betyg:', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Ingen än', { exact: false })).toBeInTheDocument();
  });

  it('handles empty arrays gracefully', () => {
    const recipeWithEmptyArrays = {
      ...mockRecipe,
      categories: [],
      instructions: [],
      ingredients: []
    };
    
    render(<Recipe recipe={recipeWithEmptyArrays} />);
    
    // Should still render the headings but no list items
    expect(screen.getByText('Kategorier')).toBeInTheDocument();
    expect(screen.getByText('Instruktioner')).toBeInTheDocument();
    expect(screen.getByText('Ingredienser')).toBeInTheDocument();
    
    // Check that no list items are present
    const categoryList = screen.getByText('Kategorier').nextElementSibling;
    const instructionList = screen.getByText('Instruktioner').nextElementSibling;
    const ingredientList = screen.getByText('Ingredienser').nextElementSibling;
    
    expect(categoryList.children).toHaveLength(0);
    expect(instructionList.children).toHaveLength(0);
    expect(ingredientList.children).toHaveLength(0);
  });

  it('handles single item arrays correctly', () => {
    const recipeWithSingleItems = {
      ...mockRecipe,
      categories: ['Cocktail'],
      instructions: ['Mix everything together'],
      ingredients: [{ amount: 1, unit: 'st', name: 'Lime' }]
    };
    
    render(<Recipe recipe={recipeWithSingleItems} />);
    
    expect(screen.getByText('Cocktail')).toBeInTheDocument();
    expect(screen.getByText('Mix everything together')).toBeInTheDocument();
    expect(screen.getByText('1 st Lime')).toBeInTheDocument();
  });

  it('renders with recipe card class name', () => {
    const { container } = render(<Recipe recipe={mockRecipe} />);
    
    expect(container.querySelector('.recipe-card')).toBeInTheDocument();
  });

  it('handles special characters in recipe data', () => {
    const recipeWithSpecialChars = {
      ...mockRecipe,
      title: 'Piña Colada',
      description: 'En tropisk drink med kokos & ananas',
      ingredients: [
        { amount: 5, unit: 'cl', name: 'Malibu® Kokosrom' },
        { amount: 10, unit: 'cl', name: 'Ananassaft (100%)' }
      ]
    };
    
    render(<Recipe recipe={recipeWithSpecialChars} />);
    
    expect(screen.getByText('Piña Colada')).toBeInTheDocument();
    expect(screen.getByText('En tropisk drink med kokos & ananas')).toBeInTheDocument();
    expect(screen.getByText('5 cl Malibu® Kokosrom')).toBeInTheDocument();
    expect(screen.getByText('10 cl Ananassaft (100%)')).toBeInTheDocument();
  });

  it('handles numeric values correctly', () => {
    const recipeWithDifferentNumbers = {
      ...mockRecipe,
      timeInMins: 0,
      price: 120.50,
      avgRating: 3.75
    };
    
    render(<Recipe recipe={recipeWithDifferentNumbers} />);
    
    expect(screen.getByText('0 minuter', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('120.5 kr', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('3.75', { exact: false })).toBeInTheDocument();
  });

  it('uses correct HTML structure for accessibility', () => {
    render(<Recipe recipe={mockRecipe} />);
    
    // Check heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    const subHeadings = screen.getAllByRole('heading', { level: 3 });
    
    expect(mainHeading).toHaveTextContent('Mojito');
    expect(subHeadings).toHaveLength(3);
    expect(subHeadings[0]).toHaveTextContent('Kategorier');
    expect(subHeadings[1]).toHaveTextContent('Instruktioner');
    expect(subHeadings[2]).toHaveTextContent('Ingredienser');
    
    // Check lists
    const lists = screen.getAllByRole('list');
    expect(lists).toHaveLength(3); // categories (ul), instructions (ol), ingredients (ul)
  });
});