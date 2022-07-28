import './App.css';
import SpotifyWebApi from 'spotify-web-api-node';
import { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route, Link,
} from "react-router-dom";
import GarbageStarter from "./components/GarbageStarter";
import SpotifyCallbackPage from "./components/SpotifyCallbackPage";
import { useEffect } from "react";
import LoginToSpotifyButton from "./components/LoginToSpotifyButton";
import ArtistPage from "./components/ArtistPage";

const ACCESS_TOKEN_LOCATION = "__ACCESS_TOKEN_LOCATION";

function App() {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      redirectUri: process.env.REACT_APP_REDIRECT_URL,
    });

    const [accessKey, setAccessKey] = useState(localStorage.getItem(ACCESS_TOKEN_LOCATION));
    const setEveryonesAccessKey = (stringKey) => {
        localStorage.setItem(ACCESS_TOKEN_LOCATION, stringKey);
        setAccessKey(stringKey);
    };

    useEffect(() => {
        spotifyApi.setAccessToken((accessKey))
    }, [accessKey]);

  return (
      <div className="App">
          <header className="App-header">
              <h1>Spotify Movie App.  <br /> React to the fun</h1>
              {<LoginToSpotifyButton overrideText={accessKey ? "Refresh Token" : null} />}
          </header>
          <main className="App-Main">
              <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GarbageStarter spotifyApi={spotifyApi} accessKey={accessKey}/>} />
                    <Route path="/artist" element={
                        <ArtistPage artistId={'43ZHCT0cAZBISjO8DG9PnE'} spotifyApi={spotifyApi} accessKey={accessKey} />
                    } />
                    <Route path="/artist/:artistId" element={(props) => (
                        <ArtistPage artistId={props.match.artistId} spotifyApi={spotifyApi} accessKey={accessKey} />
                    )} />
                    <Route path="/callback" element={
                        <SpotifyCallbackPage
                            accessKey={accessKey}
                            setEveryonesAccessKey={setEveryonesAccessKey}
                        />}
                    />
                </Routes>
              </BrowserRouter>
          </main>
      </div>
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