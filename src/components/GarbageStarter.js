import logo from "../logo.svg";


export default function GarbageStarter () {
    const login = () => {
        const redirect = `https://accounts.spotify.com:443/authorize?client_id=` +
            `${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://${process.env.REACT_APP_REDIRECT_URL}` +
            `&scope=user-read-private%20user-read-email&state=NewYork`

        window.location = redirect;
    }
    return (
        <header className="App-header">
            <button onClick={login}>Log In to Spotify</button>

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
