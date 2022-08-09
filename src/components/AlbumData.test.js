import {render, screen, waitFor} from "@testing-library/react";
import AlbumData from "./AlbumData";
import { convertMsToMinutesSeconds } from "./AlbumData";
import userEvent from "@testing-library/user-event";


describe(AlbumData, () => {
    const albumDataFromAlbum = {
        artists: [
            {
                name: "batman",
                id:"2hazSY4Ef3aB9ATXW7F5w3",
                external_urls:{
                    "spotify":"https://open.spotify.com/artist/2hazSY4Ef3aB9ATXW7F5w3"
                },
            },
            {
                name: "robin",
                id:"SHASTA293832",
                external_urls:{
                    "spotify":"https://open.spotify.com/artist/SHASTA293832"
                },
            }
        ],
        images: [
            {
                "height":640,
                "url":"https://i.scdn.co/image/1",
                "width":640
            },
            {
                "height":300,
                "url":"https://i.scdn.co/image/2",
                "width":300
            }
        ],
        external_urls:{
            spotify:"https://open.spotify.com/album/5U4W9E5WsYb2jUQWePT8Xm"
        },
        name:"a batman and robin album",
        id:"5U4W9E5WsYb2jUQWePT8Xm",
        total_tracks:2,
        tracks:{
            href:"https://api.spotify.com/v1/albums/5U4W9E5WsYb2jUQWePT8Xm/tracks?offset=0&limit=50&locale=en-US,en;q=0.9",
            items:[
                {
                    artists:[
                        {
                            external_urls:{
                                spotify:"https://open.spotify.com/artist/2hazSY4Ef3aB9ATXW7F5w3"
                            },
                            id:"2hazSY4Ef3aB9ATXW7F5w3",
                            name:"batman",
                        }
                    ],
                    duration_ms:168226,
                    external_urls:{
                        spotify:"https://open.spotify.com/track/4wzuPyI0MiX5tjkcT7nu9K"
                    },
                    id:"4wzuPyI0MiX5tjkcT7nu9K",
                    name:"batman song",
                    track_number:1,
                },
                {
                    artists:[
                        {
                            external_urls:{
                                spotify:"https://open.spotify.com/artist/SHASTA293832"
                            },
                            id:"SHASTA293832",
                            name:"robin",
                        }
                    ],
                    available_markets:[

                    ],
                    duration_ms:240013,
                    external_urls:{
                        spotify:"https://open.spotify.com/track/2vMloVXd1y2snH0cZBOZgT"
                    },
                    id:"2vMloVXd1y2snH0cZBOZgT",
                    name:"robin song",
                    track_number:2,
                },
            ],
            limit:50,
            next:null,
            offset:0,
            previous:null,
            total:2
        },
    };
    const albumDataFromArtist = {
        "album_group": "album",
        "album_type": "album",
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/43ZHCT0cAZBISjO8DG9PnE"
                },
                "id": "43ZHCT0cAZBISjO8DG9PnE",
                "name": "Elvis Presley",
                "type": "artist"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0MvSBMGRQJY3mRwIbJsqF1"
                },
                "id": "0MvSBMGRQJY3mRwIbJsqF1",
                "name": "Royal Philharmonic Orchestra",
                "type": "artist"
            }
        ],
        "external_urls": {
            "spotify": "https://open.spotify.com/album/11FCLUM5m9GiuxjGEoTVF5"
        },
        "id": "11FCLUM5m9GiuxjGEoTVF5",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2737f4bc5b1bd50ee702887bf2b",
                "width": 640
            },
            {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e027f4bc5b1bd50ee702887bf2b",
                "width": 300
            },
            {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048517f4bc5b1bd50ee702887bf2b",
                "width": 64
            }
        ],
        "name": "Christmas with Elvis and the Royal Philharmonic Orchestra (Deluxe)",
        "release_date": "2017-11-24",
        "release_date_precision": "day",
        "total_tracks": 17,
        "type": "album"
    };
    const trackData = {
        artists: [
            {
                external_urls: {
                    spotify: "https://open.spotify.com/artist/2hazSY4Ef3aB9ATXW7F5w3"
                },
                href: "https://api.spotify.com/v1/artists/2hazSY4Ef3aB9ATXW7F5w3",
                id: "2hazSY4Ef3aB9ATXW7F5w3",
                name: "IZAL",
                type: "artist",
                uri: "spotify:artist:2hazSY4Ef3aB9ATXW7F5w3"
            }
        ],
        available_markets: [],
        disc_number: 1,
        duration_ms: 168226,
        explicit: false,
        external_urls: {
            spotify: "https://open.spotify.com/track/4wzuPyI0MiX5tjkcT7nu9K"
        },
        href: "https://api.spotify.com/v1/tracks/4wzuPyI0MiX5tjkcT7nu9K",
        id: "4wzuPyI0MiX5tjkcT7nu9K",
        is_local: false,
        name: "Despedida",
        preview_url: null,
        track_number: 1,
        type: "track",
        uri: "spotify:track:4wzuPyI0MiX5tjkcT7nu9K"
    };

    const mockSpotifyApi = {
        getAlbumTracks: jest.fn(),
    };
    beforeEach(() => {
        jest.resetAllMocks();
    });

    //when all album data is present
    test('shows all artist names from albumData', () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi} />);
        const testArtists = albumDataFromAlbum.artists.map( (artist) => artist.name);

        const artists = testArtists.map( (artist) => screen.getByText(artist).textContent);

        expect(artists.length === testArtists.length).toBeTruthy();
        expect(artists.every( (artist) => testArtists.includes(artist))).toBeTruthy();
    });

    test('has correct external urls to artists', () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi} />);
        const testArtistUrls = albumDataFromAlbum.artists.map((artist) => artist.external_urls.spotify);

        const artistUrls = screen.getAllByRole('link', {name: 'artist-link'})
            .map( (link) => link.getAttribute('href'));

        expect(artistUrls.length === testArtistUrls.length).toBeTruthy();
        expect(artistUrls.every( (url) => testArtistUrls.includes(url))).toBeTruthy();
    });

    test('shows album name in albumData', () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi} />);
        const testAlbumName = albumDataFromAlbum.name;

        const albumName = screen.getByText(testAlbumName).textContent;

        expect(albumName === testAlbumName).toBeTruthy();
    });

    test('has correct external url to album', () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi} />);
        const testAlbumUrl = albumDataFromAlbum.external_urls.spotify;

        const albumUrl = screen.getByRole('link', {name: 'album-link'})
            .getAttribute('href');

        expect(albumUrl === testAlbumUrl).toBeTruthy();
    });

    test('shows correct 300x300 image in albumData', () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi} />);
        const testImageUrls = albumDataFromAlbum.images.filter( (image) => image.width === 300)
            .map((image) => image.url );

        const imageUrls = screen.getAllByRole('img')
            .map( (image) => image.getAttribute('src'));

        expect(imageUrls.length).toBe(testImageUrls.length);
        expect(imageUrls.every( (url) => testImageUrls.includes(url))).toBeTruthy();
    });

    test('shows and hides tracklist onClick', async () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi} />);
        let tracklist = screen.getByTestId("tracklist");
        const button = screen.getByRole("button");

        expect(tracklist).toHaveClass("tracklist hidden", { exact: true });
        //this is giving "display: block" from the parent div
        //even though the hidden class applies "display: none"
        //possibly due to css context?
        //expect(tracklist).toHaveStyle("display: none");

        await userEvent.click(button);

        expect(tracklist).toHaveClass("tracklist", { exact: true });
        //noexpect(tracklist).toHaveStyle("display: block");
    });

    test('tracklist is present with correct data when component is hidden', () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi} />);
        const testTracks = albumDataFromAlbum.tracks.items.map( (track) => {
            const duration = convertMsToMinutesSeconds(track.duration_ms);
            return `${track.name} (${duration})`;
        });

        const tracklist = screen.getByTestId("tracklist");

        expect(tracklist).toHaveClass("tracklist hidden", { exact: true });
        expect(tracklist).not.toHaveClass("tracklist", { exact: true });

        expect(tracklist).toHaveTextContent("Tracklist:");
        //testTracks.forEach( (track) => expect(tracklist).toHaveTextContent(track));
        for (const track of testTracks) {
            expect(tracklist).toHaveTextContent(track);
        }
    });

    test("api isn't called to get album tracks when tracklist is already present", async () => {
        render(<AlbumData data={albumDataFromAlbum} spotifyApi={mockSpotifyApi}/>);
        const tracklist = screen.getByTestId("tracklist");
        const button = screen.getByRole("button");

        await userEvent.click(button);
        expect(mockSpotifyApi.getAlbumTracks).not.toHaveBeenCalled();
    });

    //when no tracklist is initially present (data from ArtistPage)
    test('tracklist does not exist before api call for album data', () => {
        render(<AlbumData data={albumDataFromArtist} spotifyApi={mockSpotifyApi} />);

        expect(screen.queryByTestId("tracklist")).toBeNull();
    });

    test('tracklist is fetched from api call and component is correctly rendered and shown', async () => {
        render(<AlbumData data={albumDataFromArtist} spotifyApi={mockSpotifyApi} />);
        const button = screen.getByRole("button");

        mockSpotifyApi.getAlbumTracks.mockResolvedValue({body: {items: [trackData]}})
        const trackDuration = convertMsToMinutesSeconds(trackData.duration_ms);
        const trackText = `${trackData.name} (${trackDuration})`;


        await userEvent.click(button);
        expect(mockSpotifyApi.getAlbumTracks).toHaveBeenCalled();

        let tracklist;
        await waitFor(() => {
            tracklist = screen.getByTestId("tracklist");
        });
        expect(tracklist).toHaveClass("tracklist", { exact: true })
        expect(tracklist).toHaveTextContent("Tracklist:");
        expect(tracklist).toHaveTextContent(trackText);
    });
});

