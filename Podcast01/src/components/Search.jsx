import React, { useState } from 'react';
import Fuse from 'fuse.js';

const Search = ({ data, updateData }) => {
  const [searchText, setSearchText] = useState('');

  const options = {
    keys: ['title'], // Fields to search in
    threshold: 0.3, // Fuzzy matching threshold (0 to 1)
  };

  const fuse = new Fuse(data, options);
  const results = fuse.search(searchText);
  const filteredData = searchText ? results.map((result) => result.item) : data;

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearchClick = () => {
    // Sort the filteredData by genre (assuming the 'genre' field exists in the data)
    const sortedData = [...filteredData];
    if (sortedData.length > 0 && sortedData[0].hasOwnProperty('genre')) {
      sortedData.sort((a, b) => a.genre.localeCompare(b.genre));
    }
    updateData(sortedData);
  };
  

  return (
    <div className="search-container">
      <input type="text" value={searchText} onChange={handleSearch} placeholder="Search by title" />
      <button onClick={handleSearchClick}>Search</button>
      {/* Render the sorted and filtered data */}
      <ul className="show-list">
        {filteredData.map((show) => (
          <li key={show.id}>
            {/* Your show item UI here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
