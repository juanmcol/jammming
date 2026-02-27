import {useState} from 'react';

function SearchBar({search, setSearch}) {
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <input type="text" className="search-bar" placeholder="search"
        value={search} onChange={handleSearch}></input>
    );
}

export default SearchBar;