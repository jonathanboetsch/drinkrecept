import Star from "./Star.jsx";
import "./Rating.css";
import { useEffect, useState } from "react";

export default function RatingForm({ ratingLevels = [1, 2, 3, 4, 5], confirmationAction, recipe }) {
  const [rating, setRating] = useState(null);
  // TODO: add a mechanism to store and update all the recipes ratings.
  const [isHidden, setHiding] = useState(false);

  return (
    <div className="rating-form">
      {ratingLevels.map((val, i) => (
        <Star
          key={i}
          level={val} // each Star gets an increasing rating value
          confAction={confirmationAction} // thought to popup a "thank for your contribution"
          setRating={setRating} // user click on Star => set its rating value in the RatingForm
          recipe={recipe} // optional, put here for logging in the console when user clicks
          isHidden={isHidden} // Star can this way update its css property dynamically
          setHiding={setHiding} // A click on a Star sets hiding for all the Star components (isHidden=true)
        />
      ))}
    </div>
  );
}
