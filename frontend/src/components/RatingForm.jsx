import Star from "./Star.jsx";
import "./Rating.css";
import { useEffect, useState } from "react";
import { useRecipesContext } from "./RecipesContext.jsx";

export default function RatingForm({ ratingLevels = [1, 2, 3, 4, 5], confirmationAction, recipe }) {
  const [userRating, setUserRating] = useState(null);
  const [ratingDisabled, setRatingDisabled] = useState(false);
  const [feedbackMessageOn, setFeedbackMessageOn] = useState(false);

  const { updateAvgRating, updateUserRatings, userRatings } = useRecipesContext();

  useEffect(() => {
    if (!userRatings?.length) return;
    const found = userRatings?.find((r) => r.recipeId === recipe._id)?.rating ?? null;
    setUserRating(found);
    setRatingDisabled(found !== null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRatings]);

  const handleRatingClick = (rating) => {
    if (ratingDisabled) return; // guard against double-clicks
    setRatingDisabled(true); // instant disable
    setUserRating(rating); // optional optimistic UI update
    setFeedbackMessageOn(true);
    setTimeout(() => setFeedbackMessageOn(false), 2000);

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
          const newAvgRating = Number(updatedRecipe.avgRating);
          updateAvgRating(recipe._id, newAvgRating);
          updateUserRatings(recipe._id, rating);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="rating-form">
      <div className="stars">
        {ratingLevels.map((val) => (
          <Star
            key={val}
            level={val} // each Star gets an increasing rating value
            confAction={confirmationAction} // thought to popup a "thank for your contribution"
            onRating={handleRatingClick} // user click on Star => set its rating value in the RatingForm
            recipe={recipe} // optional, put here for logging in the console when user clicks
            isHidden={ratingDisabled} // Star can this way update its css property dynamically
            imageUrl={
              userRating === null || val <= userRating
                ? "https://upload.wikimedia.org/wikipedia/commons/6/6e/Super_Mario_Bros._%E2%80%93_Overworld_Star.png"
                : "https://cdn3.iconfinder.com/data/icons/wpzoom-developer-icon-set/500/118-1024.png"
            }
          />
        ))}
      </div>
      <div className="feddback-message">{feedbackMessageOn && <p>Tack för din röst !!! </p>}</div>
    </div>
  );
}
