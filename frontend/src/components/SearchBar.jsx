export default function SearchBar({ onUserType }) {
  return (
    <input
      type="search"
      className="search-bar"
      data-testid="search-input"
      placeholder="type your search here"
      onChange={(e) => onUserType(e.target.value)}
    />
  );
}
