import React, {useEffect} from 'react';
import { Navigate } from "react-router-dom";

export default function SpotifyCallbackPage(props) {
    useEffect(() => {
        const params = window.location.hash.match(/access_token=([^&]*)&/);
        if(params !== null) {
            const accessToken = params[1];
            if (accessToken) props.setEveryonesAccessToken(accessToken);
        }
    }, [window.location]);

    return props.accessToken === null ? <></> : <Navigate to={"/"}/>;
}