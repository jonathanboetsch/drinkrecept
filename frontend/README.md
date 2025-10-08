# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Tests Summary 1

Summary

I've successfully analyzed the src/components/App.jsx component and created a comprehensive test suite for it. Here's what I accomplished:

Component Analysis
The App component is a React functional component that:
• Manages three state variables: recipes, loading, and error
• Fetches data from https://grupp3-jynxa.reky.se/recipes on mount
• Handles loading states, error states, and successful data fetching
• Uses Swedish language for user messages
• Renders a RecipeList component when data is successfully loaded

Test Suite (tests/App.test.jsx)
I created a comprehensive test file with 9 test cases covering:

1. Loading State: Verifies loading message displays initially
2. Network Error Handling: Tests error display when fetch fails
3. HTTP Error Handling: Tests error display when response is not ok
4. Successful Data Fetching: Verifies RecipeList renders with correct data
5. Empty Data Handling: Tests behavior with empty recipe array
6. API URL Verification: Ensures correct endpoint is called
7. JSON Parsing Errors: Tests handling of malformed responses
8. Single Fetch Behavior: Ensures useEffect dependency array works correctly
9. State Transitions: Tests the complete loading → success flow

Technical Details
• Testing Framework: Uses Vitest with jsdom environment
• Testing Library: React Testing Library for component rendering and queries
• Mocking Strategy: Mocks the RecipeList component and fetch API
• Async Testing: Proper handling of asynchronous operations with waitFor
• Isolation: Each test is independent with proper setup/teardown

Configuration Updates
I also updated the Vitest configuration to enable globals, making the test syntax cleaner and more consistent.

All tests are passing ✅, ensuring the App component works correctly across all scenarios!

## Tests summary 2

Summary

I've successfully analyzed the src/components/Recipe.jsx component and created a comprehensive test suite for it. Here's what I accomplished:

Component Analysis
The Recipe component is a presentational React component that:
• Accepts a recipe prop with complex nested data
• Renders a complete recipe card with Swedish labels
• Displays: title, description, image, time, price, categories, instructions, ingredients, and rating
• Uses proper HTML structure with headings, lists, and semantic elements
• Handles conditional rendering for ratings (shows "Ingen än" when no rating)

Test Suite (tests/Recipe.test.jsx)
I created a comprehensive test file with 18 test cases covering:

Core Functionality Tests:

1. Title Rendering: Verifies h1 heading displays correctly
2. Description Display: Tests label and content rendering
3. Image Attributes: Validates src, alt text, and width
4. Time Display: Tests cooking time with Swedish unit "minuter"
5. Price Display: Tests price with Swedish currency "kr"

Complex Data Structure Tests: 6. Categories List: Verifies all categories render in unordered list 7. Instructions Steps: Tests all instruction steps render in order 8. Ingredients Details: Validates amount, unit, and name display

Rating Logic Tests: 9. Valid Rating: Shows numeric rating when provided 10. Null Rating: Shows "Ingen än" for null values 11. Undefined Rating: Shows "Ingen än" for undefined values  
12. Zero Rating: Shows "Ingen än" for zero ratings (falsy value)

Edge Case Tests: 13. Empty Arrays: Handles empty categories, instructions, and ingredients 14. Single Items: Tests arrays with only one item 15. Special Characters: Handles Swedish characters and symbols 16. Numeric Variations: Tests different number formats (integers, decimals, zero)

Structure and Styling Tests: 17. CSS Class: Verifies .recipe-card class is applied 18. Accessibility: Tests proper heading hierarchy and list structure

Technical Features
• Testing Framework: Uses Vitest with jsdom environment
• Testing Library: React Testing Library for component rendering
• Semantic Testing: Uses proper roles and accessibility queries
• Edge Case Coverage: Handles missing data, empty arrays, and falsy values
• Data Validation: Tests complex nested object structure
• Swedish Language: Tests Swedish labels and formatting

Key Testing Strategies
• Realistic Mock Data: Uses authentic cocktail recipe structure
• Boundary Testing: Tests empty, single, and multiple items
• Conditional Rendering: Validates rating fallback logic
• Accessibility Testing: Ensures proper semantic HTML structure
• Content Validation: Verifies both labels and data display correctly

All tests are passing ✅, ensuring the Recipe component renders correctly across all scenarios and handles edge cases gracefully!

## Tests summary 3

Summary

I've successfully analyzed the src/components/RecipeList.jsx component and created a comprehensive test suite for it. Here's what I accomplished:

Component Analysis
The RecipeList component is a simple container React component that:
• Purpose: Maps over an array of recipes and renders a Recipe component for each
• Props: Accepts a recipes prop (array of recipe objects)
• Structure: Simple wrapper div containing mapped Recipe components
• Key Strategy: Uses array index as keys (potential performance consideration)
• Dependencies: Imports and renders the Recipe component

Test Suite (tests/RecipeList.test.jsx)
I created a comprehensive test file with 14 test cases covering:

Core Rendering Tests:

1. Basic Rendering: Verifies component renders without crashing
2. Count Verification: Ensures correct number of Recipe components render
3. Data Passing: Tests that recipe data is passed correctly to Recipe components
4. Render Order: Validates recipes appear in the correct sequence

Edge Case Tests: 5. Empty Array: Handles empty recipes array gracefully 6. Single Recipe: Tests rendering with just one recipe 7. Missing Properties: Handles recipes with missing/null properties 8. Mixed Data: Tests array with complete and incomplete recipes

Data Structure Tests: 9. Diverse Recipes: Tests recipes with different data structures 10. Special Characters: Handles Swedish characters and symbols properly 11. Large Dataset: Performance test with 50 recipes

Component Behavior Tests: 12. Structure Validation: Confirms wrapper div container exists 13. Props Updates: Tests re-rendering when recipes prop changes 14. Object Passing: Verifies complete recipe objects are passed to children

Technical Features
• Mocking Strategy: Mocks the Recipe component to isolate RecipeList testing
• Test Isolation: Each test is independent and focuses on RecipeList behavior
• Mock Design: Simple but effective mock that displays key recipe properties
• Edge Coverage: Tests empty arrays, single items, large datasets, and malformed data
• Performance Consideration: Tests behavior with large numbers of recipes (50 items)

Key Testing Strategies

Component Isolation
• Mocks Recipe component to test RecipeList in isolation
• Focuses on mapping logic and prop passing rather than Recipe rendering

Boundary Testing
• Empty arrays → ensures graceful handling
• Single item → validates minimal functionality  
• Large datasets → tests performance and scalability
• Malformed data → ensures robustness

Data Flow Validation
• Verifies each recipe object is passed intact to Recipe components
• Tests that array order is preserved in rendering
• Confirms re-rendering behavior on prop changes

Structural Testing
• Validates DOM structure (wrapper div)
• Tests element count matches input array length
• Ensures proper React key usage (indirectly through rendering)

Swedish Language Support
• Tests special Swedish characters (åäö)
• Validates Swedish recipe descriptions and titles
• Ensures proper encoding and display

Mock Strategy Benefits
The mocked Recipe component:
• Renders key properties (id, title, description) for verification
• Uses data-testid attributes for reliable selection
• Keeps tests fast by avoiding complex Recipe rendering
• Allows focused testing of mapping and prop-passing logic

All tests are passing ✅, ensuring the RecipeList component correctly handles recipe arrays of any size and composition, properly passes data to child components, and maintains structural integrity across all scenarios!
