import { useContext, createContext } from "react";

export const RecipesContext = createContext(null);

export function useRecipesContext() {
  return useContext(RecipesContext);
}
