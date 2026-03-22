// hooks
import {useState, useEffect} from 'react';

// components
import SearchBar from "./cont/SearchBar";
import SearchResults from "./cont/SearchResults";

// api
import getSpotifyToken from "../services/spotifyAPI";
import Playlist from './cont/Playlist';

/* TODO
- Check README
*/

function Main() {
    const [data, setData] = useState({"tracks":{"items":[]}, "artists":{"items":[]}, "albums":{"items":[]}});
    const [playlist, setPlaylist] = useState([]);
    const [uris, setUris] = useState([]);

    // Band-aid fix to automatically getting a new token, without having to delete local storage manually.
    // Figure out how to use the refresh_token.
    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            getSpotifyToken();
            localStorage.setItem('time_set', Date.now());
        } else if (Date.now() - Number(localStorage.getItem('time_set')) >= 3600000) {
            // maybe the refresh token function could go here...
            localStorage.removeItem('access_token');
            getSpotifyToken();
            localStorage.setItem('time_set', Date.now());
        }
    }, []);

    useEffect(() => {
        setUris(playlist.map((track) => track.uri))
    }, [playlist])

    return (
        <main>
            <div id="search-div">
                <h2 id="search-header">Search Spotify</h2>
                <div id="search-main">
                    <SearchBar setData={setData}/>
                    <SearchResults data={data} playlist={playlist} setPlaylist={setPlaylist}/>
                </div>
            </div>
            <div id="playlist-div">
                <h2 id="playlist-header">Create a Playlist</h2>
                <Playlist data={data} playlist={playlist} setPlaylist={setPlaylist} uris={uris}/>
            </div>
        </main>
    );
}

export default Main;