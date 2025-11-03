export default function SearchBar({ onUserType, value }) {
  return (
    <input
      type="search"
      className="search-bar"
      data-testid="search-input"
      placeholder="type your search here"
      value={value}
      onChange={(e) => onUserType(e.target.value)}
    />
  );
}
