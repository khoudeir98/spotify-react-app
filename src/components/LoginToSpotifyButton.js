export default function LoginToSpotifyButton(props) {
    const login = () => {
        const redirect = `https://accounts.spotify.com:443/authorize?client_id=` +
            `${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://${process.env.REACT_APP_REDIRECT_URL}` +
            `&scope=user-read-private%20user-read-email&state=NewYork&resettingToken=true`

        window.location = redirect;
    };
    return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={login}>{props?.overrideText || "Log In to Spotify"}</button>
}