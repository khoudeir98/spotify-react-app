import logo from './logo.svg';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-node';
import { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import GarbageStarter from "./components/GarbageStarter";
import SpotifyCallbackPage from "./components/SpotifyCallbackPage";
import { useEffect } from "react";

const API_KEY_LOCATION = "SPOTIFY_API_KEY"
const apiKey = localStorage.getItem(API_KEY_LOCATION)

function App() {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      redirectUri: process.env.REACT_APP_REDIRECT_URL,
    });

    const [accessKey, setAccessKey] = useState(null);
    const setEveryonesAccessKey = (stringKey) => {
        setAccessKey(stringKey);
        spotifyApi.setAccessToken(stringKey)
    };


  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<GarbageStarter />} />
            <Route path="/callback" element={
                <SpotifyCallbackPage
                    accessKey={accessKey}
                    setEveryonesAccessKey={setEveryonesAccessKey}
                />}
            />
        </Routes>
      </BrowserRouter>
  );
}

export default App;

// spotifyApi.setAccessToken('<your_access_token>');

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//   function(data) {
//     console.log('Artist albums', data.body);
//   },
//   function(err) {
//     console.error(err);
//   }
// )