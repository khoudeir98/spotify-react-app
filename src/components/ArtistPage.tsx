import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import AlbumData from "./AlbumData";
import {Album, Artist} from "../common/types"

export default function ArtistPage({spotifyApi}: {spotifyApi: SpotifyWebApi}) {
    const { artistId = "" } = useParams();

    const [artistData, setArtistData] = useState<Artist | null>(null);
    const [artistAlbumData, setArtistAlbumData] = useState<Album[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect( () => {
        (async () => {
            const fetchedArtist = await spotifyApi.getArtist(artistId);
            const artist: Artist = fetchedArtist.body as Artist;
            setArtistData(artist);
            const fetchedAlbums = await spotifyApi.getArtistAlbums(artistId);
            const albums: Album[] = fetchedAlbums.body.items as unknown as Album[];
            setArtistAlbumData(albums);

            setIsLoading(false);
        })();
    }, [artistId]);

    if(isLoading || artistData === null || artistAlbumData === null) return <div>LOADING PLEASE WAIT LOADING</div>;

    const artistName = (
        <h1 className="text-5xl pb-1">
            {artistData.name}
        </h1>);
    const artistImage = artistData.images.filter( (image) => image.width === 640)
        .map( (image) =>
            <img key={image.url} src={image.url} alt="artist 640" className="max-w-2xl border-solid border-4 border-gray-600"/>
        );

    const albums = artistAlbumData.map( (data) =>
        <li key={data.id}><AlbumData data={data} getAlbumTracks={spotifyApi.getAlbumTracks.bind(spotifyApi)} /></li>
    );

    return (
        <div className="grid grid-cols-1 divide-y">
            <div className="flex flex-col justify-center items-center p-1">
                {artistName}
                {artistImage}
            </div>
            <ul className="grid grid-cols-3 gap-1 divide-x-2 divide-y-2">
                {albums}
            </ul>
        </div>
    );
}