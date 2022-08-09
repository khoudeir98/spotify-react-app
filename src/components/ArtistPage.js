import React, {useEffect, useState} from "react";
import AlbumData from "./AlbumData";
import {useParams} from "react-router-dom";

export default function ArtistPage(props) {
    const { spotifyApi } = props;
    const { artistId } = useParams();

    const [artistData, setArtistData] = useState(null);
    const [artistAlbumData, setArtistAlbumData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect( () => {
        (async () => {
            const fetchedArtist = await spotifyApi.getArtist(artistId);
            setArtistData(fetchedArtist.body);
            const albums = await spotifyApi.getArtistAlbums(artistId);
            setArtistAlbumData(albums.body.items);

            setIsLoading(false);
        })();
    }, [artistId]); // eslint-disable-line react-hooks/exhaustive-deps

    if(isLoading) return <div>LOADING PLEASE WAIT LOADING</div>;

    const artistName = (
        <h1 className="text-5xl pb-1">
            {artistData.name}
        </h1>);
    const artistImage = artistData.images.filter( (image) => image.width === 640)
        .map( (image) =>
            <img key={image.url} src={image.url} alt="artist 640" className="max-w-2xl border-solid border-4 border-gray-600"/>
        );

    const albums = artistAlbumData.map( (data) =>
        <li key={data.id}><AlbumData data={data} spotifyApi={spotifyApi} /></li>
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