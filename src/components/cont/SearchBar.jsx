function SearchBar({setSearch}) {
    const handleSearch = () => {
        setSearch(document.getElementById("search-bar").value);
    };

    return (
        <>
            <input id="search-bar" type="search" placeholder="type here..."></input>
            <button onClick={handleSearch}>Search</button>
        </>
    );
}

export default SearchBar;