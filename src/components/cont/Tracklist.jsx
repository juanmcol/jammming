import Track from "./Track";

function Tracklist({tracks}) {
    return (
        <div id="tracklist">
            {tracks.map((track, index) => {
                return (
                    <Track key={index} track={track} id={`track-${index + 1}`}/>
                )
            })}
        </div>
    )
}

export default Tracklist;