import React, {useEffect, useState} from "react";
import AlbumData from "./AlbumData";

export default function ArtistPage(props) {
    const { artistId, spotifyApi } = props;

    const [artistData, setArtistData] = useState(null);
    const [artistAlbumData, setArtistAlbumData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect( () => {
        // Get Elvis' albums
        (async () => {
            const fetchedArtist = await spotifyApi.getArtist(artistId);
            setArtistData(fetchedArtist.body);
            const albums = await spotifyApi.getArtistAlbums(artistId);
            setArtistAlbumData(albums.body.items);
            setIsLoading(false);
        })();
    }, [artistId]);

    if(isLoading) return <div>LOADING PLEASE WAIT LOADING</div>;

    const artistName = (
        <h1 className="text-5xl">
            {artistData.name}
        </h1>);
    const artistImage = artistData.images.filter( (image) => image.width === 640)
        .map( (image) =>
            <img key={image.url} src={image.url} alt="artist picture 640" className="max-w-2xl"/>
        );

    const albums = artistAlbumData.map((data) =>
        <li key={data.id}><AlbumData data={data} /></li>
    );



    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                {artistName}
                {artistImage}
            </div>
            <ul className="grid grid-cols-3 gap-2">
                {albums}
            </ul>

        </div>
    );
}