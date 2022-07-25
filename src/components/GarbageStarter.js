import logo from "../logo.svg";


export default function GarbageStarter(props) {
    const login = () => {
        const redirect = `https://accounts.spotify.com:443/authorize?client_id=` +
            `${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://${process.env.REACT_APP_REDIRECT_URL}` +
            `&scope=user-read-private%20user-read-email&state=NewYork`

        window.location = redirect;
    };

    const makeCall = () => {
        // Get album
        const ca_llData = props.spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
            .then(function(data) {
                console.log('Album information', data.body);
            }, function(err) {
                console.error(err);
            });


        console.log('callData', callData)
    }

    return (
        <header className="App-header">
            <button onClick={login}>Log In to Spotify</button>
            {props.accessKey !== null && <button onClick={makeCall}>Make Call</button>}


            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    );
};
