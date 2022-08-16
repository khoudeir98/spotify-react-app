import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

export default function SpotifyCallbackPage(props) {
    let params = window.location.hash.match(/access_token=([^&]*)&/);
    const [tokenSet, setTokenSet] = useState(false);

    useEffect(() => {
        params = window.location.hash.match(/access_token=([^&]*)&/);
        if(params !== null) {
            const accessToken = params[1];
            if (accessToken) props.setEveryonesAccessToken(accessToken);
        }
        setTokenSet(true)
    }, [window.location]);

    return (tokenSet) ?  <Navigate to={"/"}/> : <></>;
}