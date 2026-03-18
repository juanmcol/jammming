import Track from "./Track";

function Playlist({data, playlist, setPlaylist, uris}) {
    // click handler for the "Save To Spotify" button (WIP)
    async function createPlaylist(urisArray) {
        if (localStorage.getItem('access_token') != null) {
            let accessToken = localStorage.getItem('access_token');
            let url = 'https://api.spotify.com/v1/me/playlists';
            let playlistName = document.getElementById("playlist-name").value;
            
            if (playlistName === "") {
                playlistName = "My Jammming Playlist";
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Bearer ' + accessToken,
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        name: playlistName,
                        description: "Jammming playlist description",
                        public: true,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
    
                const result = await response.json();
                sessionStorage.setItem('playlist_id', result.id);
            } catch (error) {
                console.error(error.message);
                return;
            }

            url = `https://api.spotify.com/v1/playlists/${sessionStorage.getItem('playlist_id')}/items`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Bearer ' + accessToken,
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        uris: urisArray,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                await response.json();
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <>
            <h2>Playlist</h2>
            <input type="text" placeholder="Custom Name" id="playlist-name"></input>
            <div id="playlist-tracks">
                {
                    data.tracks != undefined ? 
                        playlist.map((track, index) =>
                                <Track keyNum={index} track={track} index={index} tracks={data.tracks.items}
                                playlist={playlist} setPlaylist={setPlaylist} buttonSymbol={"-"}/>
                        )
                    :
                        null
                }
            </div>
            <button onClick={() => createPlaylist(uris)}>Save To Spotify</button>
        </>
    )
}

export default Playlist;