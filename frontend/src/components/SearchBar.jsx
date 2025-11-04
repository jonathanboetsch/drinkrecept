export default function SearchBar({ onUserType }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="type your search here" // need to be kept as is for the unit tests to find the component
      onChange={(e) => onUserType(e.target.value)}
    />
  );
}
