
export default function LoginToSpotifyButton(props) {
    const { spotifyApi } = props;
    const login = () => {
        const redirect = `https://accounts.spotify.com:443/authorize?client_id=` +
            `${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://${process.env.REACT_APP_REDIRECT_URL}` +
            `&scope=user-read-private%20user-read-email&state=NewYork`

        window.location = redirect;

        //TODO switch to client credentials flow (function doesnt exist?)
        /*spotifyApi.clientCredentialsGrant().then(
            function (data) {
                console.log(data);
            }
        );*/
    };
    return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={login}>{props?.overrideText || "Log In to Spotify"}</button>
}