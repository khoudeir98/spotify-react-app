import {useState} from "react";
import React from "react";
import "./AlbumData.css";

export default function AlbumData(props) {
    const { spotifyApi } = props;


    const artistsNames = props.data.artists.map( (artist) =>
        <a key={artist.id} href={artist.external_urls.spotify} className="box-fill" aria-label="artist-link">
            {artist.name}
        </a>
    );

    const albumName = (
        <a key={props.data.id} href={props.data.external_urls.spotify} className="box-fill" aria-label="album-link">
        {props.data.name}
        </a>);


    const albumArtMed = props.data.images.filter( (image) => image.width === 300)
        .map( (image) =>
            <img className="max-w-lg border-double border-4 border-black hover:border-green-200 hover:border-solid"
                 key={image.url} src={image.url} alt="album art 300"/>
        );


    const [tracklist, setTracklist] = useState(props.data?.tracks?.items ?
        props.data?.tracks?.items : null);
    const [showTracklist, setShowTracklist] = useState(false);
    const toggleTracklist = async () => {
        //TODO create function, possibly move to ArtistPage?
        //TODO dynamic limit (handle >50 tracks, "load more")
        if (tracklist === null) {
            const trackData = await spotifyApi.getAlbumTracks(props.data.id, { limit: 50 });
            setTracklist(trackData ? trackData.body.items : null);
        }
        setShowTracklist(!showTracklist);
    };

    return (
        <div key={props.data.id} className="album-item flex-col">
            <div className="album-artist gap-x-1">
                <span>{artistsNames}</span>
                <span>&nbsp;&mdash;&nbsp;</span>
                <span>{albumName}</span>
            </div>
            <div>
                <div className="album-art-med" role="button" onClick={toggleTracklist}>{albumArtMed}</div>
                <Tracklist tracks={tracklist} show={showTracklist} />
            </div>
        </div>
    );
}

function Tracklist({tracks, show}) {
    if (tracks === null || tracks.length === 0) return;

    return (
        <div className={show ? "tracklist" : "tracklist hidden"} data-testid="tracklist">
            <b>Tracklist:</b>
            <ol className="list-decimal list-inside">
                {tracks.map((track) => {
                    const duration = convertMsToMinutesSeconds(track.duration_ms)
                    return (
                        <li key={track.id} className="track" aria-label="tracklist-item">
                            <span aria-label="track-name">{track.name}</span>
                            <span aria-label="track-duration"> ({duration})</span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export function convertMsToMinutesSeconds(milliseconds) {
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
        ? `${minutes + 1}:00`
        : `${minutes}:${padTo2Digits(seconds)}`;
}