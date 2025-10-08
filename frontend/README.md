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
•  Manages three state variables: recipes, loading, and error
•  Fetches data from https://grupp3-jynxa.reky.se/recipes on mount
•  Handles loading states, error states, and successful data fetching
•  Uses Swedish language for user messages
•  Renders a RecipeList component when data is successfully loaded

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
•  Testing Framework: Uses Vitest with jsdom environment
•  Testing Library: React Testing Library for component rendering and queries
•  Mocking Strategy: Mocks the RecipeList component and fetch API
•  Async Testing: Proper handling of asynchronous operations with waitFor
•  Isolation: Each test is independent with proper setup/teardown

Configuration Updates
I also updated the Vitest configuration to enable globals, making the test syntax cleaner and more consistent.

All tests are passing ✅, ensuring the App component works correctly across all scenarios!

