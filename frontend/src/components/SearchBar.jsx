export default function SearchBar({ onUserType }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="type your search here"
      onChange={(e) => onUserType(e.target.value)}
    />
  );
}
