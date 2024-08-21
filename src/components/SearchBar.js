import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query); // Call the onSearch function passed as a prop
      setQuery('');
      navigate('/deploy_frontend'); // Navigate to /deploy_frontend after search
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
