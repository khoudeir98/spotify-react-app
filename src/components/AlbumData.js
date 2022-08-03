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
            <img className="max-w-lg border-double border-4 border-black hover:border-green-200 hover:border-solid" key={image.url} src={image.url} alt="album art 300"/>
        );


    const [tracklist, setTracklist] = useState(props.data?.tracks?.items ?
        mapTracklist(props.data.tracks.items) : null);

    const [showTracklist, setShowTracklist] = useState(false);
    const toggleTracklist = () => {
        if (tracklist === null) {
            //TODO create function, possibly move to ArtistPage?
            spotifyApi.getAlbumTracks(props.data.id, { limit: 50 }).then( //TODO dynamic limit (handle >50 tracks, "load more")
                (data) => setTracklist( mapTracklist(data.body.items) )
            );
        }
        setShowTracklist(!showTracklist);
    }

    return (
        <div key={props.data.id} className="album-item flex-col">
            <div className="album-artist gap-x-1">
                <span>{artistsNames}</span>
                <span>&nbsp;&mdash;&nbsp;</span>
                <span>{albumName}</span>
            </div>
            <div>
                <div className="album-art-med" onClick={toggleTracklist}>{albumArtMed}</div>
                <div className={showTracklist ? "tracklist" : "tracklist hidden"}>
                    {tracklist !== null && <b>Tracklist:</b>}
                    <ol className="list-decimal list-inside">{tracklist}</ol>
                </div>
            </div>
        </div>
    );
}

function mapTracklist(tracksArr) {
    return tracksArr.map( (track) => {
        const duration = convertMsToMinutesSeconds(track.duration_ms)
        return (
            <li key={track.id} className="track" aria-label="tracklist-item">
                <span aria-label="track-name">{track.name}</span> <span aria-label="track-duration">({duration})</span>
            </li>
        );
    });
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
        ? `${minutes + 1}:00`
        : `${minutes}:${padTo2Digits(seconds)}`;
}