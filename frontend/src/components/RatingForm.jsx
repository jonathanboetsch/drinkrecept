import Star from "./Star.jsx";
import "./Rating.css";
import { useState } from "react";
import { useUpdateAvgRating } from "./AvgRatingContext.jsx";

export default function RatingForm({ ratingLevels = [1, 2, 3, 4, 5], confirmationAction, recipe }) {
  // TODO: add a mechanism to store and update all the recipes ratings.
  const [isHidden, setHiding] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const updateAvgRating = useUpdateAvgRating();

  const handleRatingClick = (rating) => {
    const API_URL = "https://grupp3-jynxa.reky.se";
    const POST_RATING_URI = `/recipes/${recipe._id}/ratings`;
    const GET_URI = `/recipes/${recipe._id}`;

    if (recipe._id && rating !== null) {
      fetch(`${API_URL}${POST_RATING_URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to submit rating");
          return fetch(`${API_URL}${GET_URI}`);
        })
        .then((res2) => {
          if (!res2.ok) throw new Error("Failed to fetch the recipe for avgRating update");
          return res2.json();
        })
        .then((updatedRecipe) => {
          const userRating = Number(updatedRecipe.avgRating);
          setUserRating(userRating);
          setUserRating(rating);
          updateAvgRating(userRating);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="rating-form">
      {ratingLevels.map((val) => (
        <Star
          key={val}
          level={val} // each Star gets an increasing rating value
          confAction={confirmationAction} // thought to popup a "thank for your contribution"
          setRating={handleRatingClick} // user click on Star => set its rating value in the RatingForm
          recipe={recipe} // optional, put here for logging in the console when user clicks
          isHidden={isHidden} // Star can this way update its css property dynamically
          setHiding={setHiding} // A click on a Star sets hiding for all the Star components (isHidden=true)
          imageUrl={
            userRating === null || val <= userRating
              ? "https://upload.wikimedia.org/wikipedia/commons/6/6e/Super_Mario_Bros._%E2%80%93_Overworld_Star.png"
              : "https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/118-1024.png"
          }
        />
      ))}
    </div>
  );
}
