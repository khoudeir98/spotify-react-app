import React, {useState} from "react";
import "./AlbumData.css";
import SpotifyWebApi from "spotify-web-api-node";
import {Album, Track} from "../common/types";
import {convertMsToMinutesSeconds} from "../common/utils";


export default function AlbumData({data: albumData, spotifyApi}: {data: Album, spotifyApi: SpotifyWebApi}) {

    const artistsNames = albumData.artists.map( (artist) =>
        <a key={artist.id} href={artist.external_urls.spotify} className="box-fill" aria-label="artist-link">
            {artist.name}
        </a>
    );

    const albumName = (
        <a key={albumData.id} href={albumData.external_urls.spotify} className="box-fill" aria-label="album-link">
        {albumData.name}
        </a>);


    const albumArtMed = albumData.images.filter( (image) => image.width === 300)
        .map( (image) =>
            <img className="max-w-lg border-double border-4 border-black hover:border-green-200 hover:border-solid"
                 key={image.url} src={image.url} alt="album art 300"/>
        );


    const [tracklist, setTracklist] = useState(albumData?.tracks?.items ?? null);
    const [showTracklist, setShowTracklist] = useState(false);
    const toggleTracklist = async () => {
        //TODO dynamic limit ("load more")
        if (tracklist === null) {
            const fetchedTrackData = await spotifyApi.getAlbumTracks(albumData.id, { limit: 50 });
            const trackData: Track[] = fetchedTrackData.body.items;
            setTracklist(trackData ?? null);
        }
        setShowTracklist(!showTracklist);
    };

    return (
        <div key={albumData.id} className="album-item flex-col">
            <div className="album-artist gap-x-1">
                <span>{artistsNames}</span>
                <span>&nbsp;&mdash;&nbsp;</span>
                <span>{albumName}</span>
            </div>
            <div>
                <div className="album-art-med" role="button" onClick={toggleTracklist}>{albumArtMed}</div>
                {tracklist !== null && tracklist.length !== 0 &&
                    <Tracklist tracks={tracklist} show={showTracklist} />}
            </div>
        </div>
    );
}


function Tracklist({tracks, show}: {tracks: Track[], show: boolean}) {
    //if (tracks === null || tracks.length === 0) return null;

    return (
        <div className={show ? "tracklist" : "tracklist hidden"} data-testid="tracklist">
            <b>Tracklist:</b>
            <ol className="list-decimal list-inside">
                {tracks.map( (track: Track) => {
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

