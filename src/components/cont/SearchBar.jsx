/* Possible Extra Filters Idea and Guide
create filters/types for artist, playlist, etc.
use select/dropdown for a simple search, checkboxes and textboxes for an advanced search
create states for those filters
display textboxes when filters are enabled
add the text values in those boxes to the url

the following may not be the entirely accurate,
use &type=typeName
use filter%3 to add more filters
use %2CtypeName to add more types
put the filters in a string and add them to the end of the url
use &limit=number for to limit the maximum number of results to return
the limit goes at the end of the url
example: "https://api.spotify.com/v1/search?q=remaster%20track:Doxy%20artist:Miles%20Davis&type=album&limit=3"
example: "https://api.spotify.com/v1/search?q=Clair%20de%20lune%20artist:Claude%20Debussy&type=track%2Calbum&limit=5"

using + is supposedly better for query strings
example: "https://api.spotify.com/v1/search?q=Clair+de+lune%20artist:Claude+Debussy&type=track%2Calbum&limit=5"
"https://api.spotify.com/v1/search?q=fly+me+to+the+moon&type=track&limit=10"

possible filters
artist and year for albums, artists, and tracks
album for albums, and tracks
genre for artists, and tracks
isrc?, and track for tracks
track, artist, and year for albums

list of endpoint changes, Feb 2026
https://developer.spotify.com/documentation/web-api/references/changes/february-2026
*/

import { useState } from "react";


function SearchBar({setData}) {
    // search bar
    const [search, setSearch] = useState("fly%20me%20to%20the%20moon");
    const handleSearchBar = (e) => {
        let text = e.target.value;
        text = text.replaceAll(" ", "%20");
        setSearch(text);
    }

    // categories
    const [category, setCategory] = useState("track");
    const handleCategory = (e) => {
        if (e.target.value === "track")
            setCategory("track");
        else if (e.target.value === "artist")
            setCategory("artist");
        else if (e.target.value === "album")
            setCategory("album");
    }

    // get api data
    async function getData() {
        let accessToken = localStorage.getItem('access_token');
        // let url = 'https://api.spotify.com/v1/search?q=clair+de+lune&type=track&limit=5';
        // let url = 'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album';
        let url = 'https://api.spotify.com/v1/search?q=';
        url += search;
        url += "&type=" + category + "&limit=10";

        if (search !== "") {
            try {
                const response = await fetch(url, {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
    
                const result = await response.json();
                sessionStorage.setItem('data', JSON.stringify(result));
                sessionStorage.setItem('query', url);
                setData(result);
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    // search button onClick event handler, get api data
    const handleSearchButton = () => {
        getData();
    };

    return (
        <div id="search-bar-div">
            <input type="search" id="search-bar" placeholder="type here..." onChange={handleSearchBar}></input>
            <label htmlFor="category-select"></label>
            <select name="categories" id="category-select" onChange={handleCategory}>
                <option value="track">track</option>
                <option value="artist">artist</option>
                <option value="album">album</option>
            </select>
            <button onClick={handleSearchButton}>search</button>
        </div>
    );
}

export default SearchBar;