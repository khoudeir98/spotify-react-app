import {useState} from "react";
import AlbumData from "./AlbumData";

export default function GarbageStarter(props) {
    const { spotifyApi } = props;
    const makeCall = () => {
        // Get album
        spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
            .then(function(data) {
                setAlbumData(data.body);
            }, function(err) {
                console.error(err);
            });
    };

    const [albumData, setAlbumData] = useState(null);

    return (
        <>
            <div className="flex-row">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={makeCall}>Make Call</button>
            </div>
            <div className="flex-row">
                {albumData && <AlbumData data={albumData} key={albumData.id} spotifyApi={spotifyApi} />}
            </div>
        </>
    );
};
