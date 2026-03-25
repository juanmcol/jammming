function Track({keyNum, track, index, tracks, playlist, setPlaylist, buttonSymbol}) {
    function handleClick(e) {
        const button = e.target;
        const buttonDiv = button.parentElement;
        const track = buttonDiv.parentElement;
        const div = track.parentElement;

        if (div.id === "tracklist") {
            setPlaylist(
                [
                    ...playlist,
                    tracks[track.id]
                ]
            );
        } else {
            setPlaylist (
                playlist.filter((current, index) => index !== Number(track.id))
            )
        }
    }

    return (
        <div key={keyNum} id={String(index)} className="track">
            <img src={track.album.images[0] != undefined ? track.album.images[0].url : ""} alt=""/>
            <div className="track-info">
                <p className="track-name">{track.name}</p>
                <p className="track-artists">by {track.artists[0].name}</p>
                <p className="track-album">{track.album.name}</p>
            </div>
            <div className="button-area">
                <button className="track-button" onClick={handleClick}>{buttonSymbol}</button>
            </div>
        </div>
    )
}

export default Track;