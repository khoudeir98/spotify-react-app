import "./App.css";
import SpotifyWebApi from "spotify-web-api-node";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GarbageStarter from "./components/GarbageStarter";
import SpotifyCallbackPage from "./components/SpotifyCallbackPage";
import LoginToSpotifyButton from "./components/LoginToSpotifyButton";
import ArtistPage from "./components/ArtistPage";

const ACCESS_TOKEN_LOCATION = "__ACCESS_TOKEN_LOCATION";

function App() {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      redirectUri: process.env.REACT_APP_REDIRECT_URL,
    });


    const [accessToken, setAccessToken] = useState(sessionStorage.getItem(ACCESS_TOKEN_LOCATION));
    const setEveryonesAccessToken = (stringKey: string) => {
        sessionStorage.setItem(ACCESS_TOKEN_LOCATION, stringKey);
        setAccessToken(stringKey);
    };

    useEffect(() => {
        if(accessToken) spotifyApi.setAccessToken(accessToken);
    }, [accessToken]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <div className="App">
          <header className="App-header">
              <div className="ml-4"><a href="/">Spotify App</a></div>
              <div className="my-4 mr-4">{<LoginToSpotifyButton spotifyApi={spotifyApi} overrideText={accessToken ? "Refresh Token" : null} />}</div>
          </header>
          <main className="App-Main">
              <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <GarbageStarter spotifyApi={spotifyApi} accessToken={accessToken}/>
                    } />
                    <Route path="/artist">
                        <Route path=":artistId" element={
                            <ArtistPage spotifyApi={spotifyApi} />
                        } />
                    </Route>
                    <Route path="/callback" element={
                        <SpotifyCallbackPage accessToken={accessToken} setEveryonesAccessToken={setEveryonesAccessToken} />
                    } />
                </Routes>
              </BrowserRouter>
          </main>
      </div>
  );
}

export default App;