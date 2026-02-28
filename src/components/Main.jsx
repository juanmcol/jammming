import {useState} from 'react';

import SearchBar from "./cont/SearchBar";
import SearchResults from "./cont/SearchResults";

/* TODO
- results should show spotify api data
- add tracks to playlist when clicked
- ability to name the playlist
- button to save the playlist to a spotify account
- add css
*/

function Main() {
    const [search, setSearch] = useState("");

    return (
        <main>
            <SearchBar setSearch={setSearch}/>
            <SearchResults results={search}/>
        </main>
    );
}

export default Main;