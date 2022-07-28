
export default function LoginToSpotifyButton(props) {
    const login = () => {
        const redirect = `https://accounts.spotify.com:443/authorize?client_id=` +
            `${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://${process.env.REACT_APP_REDIRECT_URL}` +
            `&scope=user-read-private%20user-read-email&state=NewYork`

        window.location = redirect;
    };
    return <button onClick={login}>{props?.overrideText || "Log In to Spotify"}</button>
}