import "./Rating.css";

export default function Star({
  recipe,
  level,
  imageUrl = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Super_Mario_Bros._%E2%80%93_Overworld_Star.png",
  confAction = () => console.log(`user gave rating ${level} to recipe ${recipe.title}`),
  setRating,
  isHidden,
  setHiding,
}) {
  return (
    <div className="rating-unit">
      <img src={imageUrl} className="rating-icon" alt={`Star ${level}`} />
      <button
        className="rating-button"
        type="button"
        hidden={isHidden}
        onClick={() => {
          confAction(level);
          setRating(level);
          setHiding(true);
        }}
      />
    </div>
  );
}
