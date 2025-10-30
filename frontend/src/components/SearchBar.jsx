export default function SearchBar({ onUserType }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="🔍 Search here..."
      onChange={(e) => onUserType(e.target.value)}
    />
  );
}
