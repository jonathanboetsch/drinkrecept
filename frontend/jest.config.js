export const testEnvironment = "jsdom";
export const transform = {
  "^.+\\.jsx?$": "babel-jest",
};
export const moduleFileExtensions = ["js", "jsx", "json", "node"];
export const testPathIgnorePatterns = ["/node_modules/", "/dist/"];
export const setupFilesAfterEnv = ["<rootDir>/src/setupTests.js"];
