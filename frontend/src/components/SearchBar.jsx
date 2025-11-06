export default function SearchBar({ onUserType, value, className = "" }) {
  return (
    <div className="header-search" style={{ position: "relative", display: "inline-block" }}>
      <input
        type="search"
        className={className}
        data-testid="search-input"
        placeholder="type your search here"
        value={value}
        onChange={(e) => onUserType(e.target.value)}
      />
      {value && value.length > 0 && (
        <button
          type="button"
          data-testid="clear-search"
          aria-label="Rensa sökfält"
          style={{
            position: "absolute",
            right: 4,
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.2em",
            color: "#888",
          }}
          onClick={() => onUserType("")}
        >
          ×
        </button>
      )}
    </div>
  );
}
