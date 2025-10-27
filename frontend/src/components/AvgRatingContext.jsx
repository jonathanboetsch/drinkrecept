import { useContext, createContext } from "react";

export const UpdateAvgRatingContext = createContext(null);

export function useUpdateAvgRating() {
  return useContext(UpdateAvgRatingContext);
}
