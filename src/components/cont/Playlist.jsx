import Track from "./Track";

function Playlist({playlist, setPlaylist, tracks}) {
    return (
        <>
            <h2 id="playlist-name">Playlist</h2>
            <input type="text" placeholder="Custom Name"></input>
            <div id="playlist-tracks">
                {playlist.map((track, index) => {
                    return (
                        <Track keyNum={index} track={track} index={index} tracks={tracks} playlist={playlist} setPlaylist={setPlaylist}/>
                    )
                })}
            </div>
            <button>Save To Spotify</button>
        </>
    )
}

export default Playlist;