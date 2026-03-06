/* TODO
create filters for artist, playlist, etc.
create states for those filters
use &type=filter
use %2Cfilter to add more filters
put the filters in a string and add them to the end of the url
use &limit=number for to limit the maximum number of results to return
the limit goes at the end of the url
example: "https://api.spotify.com/v1/search?q=claire+de+lune&type=track%2Cplaylist&limit=3"

test to see what works or is allowed on a free account
manipulating account profile data, and adding a new playlist, might not be allowed without premium
currently getting 403 errors, when attempting to get the current user's profile with 'https://api.spotify.com/v1/me' 

list of what endpoint changes from Feb 2026
https://developer.spotify.com/documentation/web-api/references/changes/february-2026
*/

function SearchBar({setSearch}) {
    async function getData() {
        let accessToken = localStorage.getItem('access_token');
        let url = 'https://api.spotify.com/v1/search?q=claire+de+lune&type=track&limit=1';

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            setSearch(JSON.stringify(result));
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleSearch = () => {
        getData();
    };

    return (
        <>
            <input id="search-bar" type="search" placeholder="type here..."></input>
            <button onClick={handleSearch}>Search</button>
        </>
    );
}

export default SearchBar;