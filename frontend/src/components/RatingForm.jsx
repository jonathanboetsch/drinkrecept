import Star from "./Star.jsx";
import "./Rating.css";
import { useState } from "react";

export default function RatingForm({ ratingLevels = [1, 2, 3, 4, 5], confirmationAction, recipe }) {
  const [rating, setRating] = useState(null);
  // TODO: add a mechanism to store and update all the recipes ratings.

  return (
    <div className="rating-form">
      {ratingLevels.map((val, i) => (
        <Star
          key={i}
          level={val} // each Star gets an increasing rating value
          confAction={confirmationAction} // thought to popup a "thank for your contribution"
          ratingSetter={setRating} // user click on Star => set its rating value in the RatingForm
          recipe={recipe} // optional, put here for logging in the console when user clicks
        />
      ))}
    </div>
  );
}
