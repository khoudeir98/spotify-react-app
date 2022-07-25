import React, {useEffect, useState} from 'react';
import { Navigate } from "react-router-dom";

export default function SpotifyCallbackPage(props) {
    useEffect(() => {
        const params = window.location.hash.match(/access_token=([^&]*)&/);
        if(params !== null) {
            const accessToken = params[1];
            if (accessToken) props.setEveryonesAccessKey(accessToken)
        }
    }, [window.location])

    return props.accessKey === null ? <></> : <Navigate to={"/"}/>;
}