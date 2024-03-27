export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      className="searchbar"
      placeholder="Search for events"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};
