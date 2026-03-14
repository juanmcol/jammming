import Tracklist from "./Tracklist";

function SearchResults({data}) {
    function Artists() {
        return (
            <div id="artists">
                {data.artists.items.map((artist) => {
                    return (
                        <>
                            <img src={artist.images[0] !== undefined ? artist.images[0].url : ""} alt=""/>
                            <p>{artist.name}</p>
                        </>
                    )
                })}
            </div>
        )
    }

    function Albums() {
        return (
            <div id="albums">
                {data.albums.items.map((album) => {
                    return (
                        <>
                            <img src={album.images[0] !== undefined ? album.images[0].url : ""} alt=""/>
                            <p>{album.name}</p>
                            <p>By {album.artists[0].name}</p>
                            <p>Total Tracks: {album.total_tracks}</p>
                            <p>Release Date: {album.release_date}</p>
                        </>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            {data.tracks != undefined ? <Tracklist tracks={data.tracks.items} /> : null }
            {data.artists != undefined ? <Artists /> : null}
            {data.albums != undefined ? <Albums /> : null }
        </>
    );
}

export default SearchResults;