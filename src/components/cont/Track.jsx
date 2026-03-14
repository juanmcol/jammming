function Track({index, track, id}) {
    return (
        <div index={index} className="track" id={id}>
            <img src={track.album.images[0] != undefined ? track.album.images[0].url : ""} alt=""/>
            <p>{track.name}</p>
            <p>by {track.artists[0].name}</p>
            <p>{track.album.name}</p>
            <button className="add-button">Add</button>
        </div>
    )
}

export default Track;