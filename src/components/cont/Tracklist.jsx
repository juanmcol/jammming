import Track from "./Track";

function Tracklist({tracks, playlist, setPlaylist}) {

    return (
        <div id="tracklist">
            {tracks.map((track, index) => {
                return (
                    <Track keyNum={index} track={track} index={index} tracks={tracks} playlist={playlist} setPlaylist={setPlaylist}/>
                )
            })}
        </div>
    )
}

export default Tracklist;