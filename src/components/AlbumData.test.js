import { render, screen } from "@testing-library/react";
import AlbumData from "./AlbumData";
import { convertMsToMinutesSeconds } from "./AlbumData";


describe(AlbumData, () => {
    const data = {
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

    test('shows all artist names in albumData', () => {
        render(<AlbumData data={data} />);
        const testArtists = data.artists.map( (artist) => artist.name);

        const artists = testArtists.map( (artist) => screen.getByText(artist).textContent);

        expect(artists.length === testArtists.length).toBeTruthy();
        expect(artists.every( (artist) => testArtists.includes(artist))).toBeTruthy();
    });

    test('has correct external urls to artists', () => {
        render(<AlbumData data={data}/>);
        const testArtistUrls = data.artists.map((artist) => artist.external_urls.spotify);

        const artistUrls = screen.getAllByRole('link', {name: 'artist-link'})
            .map( (link) => link.getAttribute('href'));

        expect(artistUrls.length === testArtistUrls.length).toBeTruthy();
        expect(artistUrls.every( (url) => testArtistUrls.includes(url))).toBeTruthy();
    });

    test('shows album name in albumData', () => {
        render(<AlbumData data={data} />);
        const testAlbumName = data.name;

        const albumName = screen.getByText(testAlbumName).textContent;

        expect(albumName === testAlbumName).toBeTruthy();
    });

    test('has correct external url to album', () => {
        render(<AlbumData data={data}/>);
        const testAlbumUrl = data.external_urls.spotify;

        const albumUrl = screen.getByRole('link', {name: 'album-link'})
            .getAttribute('href');

        expect(albumUrl === testAlbumUrl).toBeTruthy();
    });



    test('shows correct 300x300 image in albumData', () => {
        render(<AlbumData data={data} />);
        const testImageUrls = data.images.filter( (image) => image.width === 300)
            .map((image) => image.url );

        const imageUrls = screen.getAllByRole('img')
            .map( (image) => image.getAttribute('src'));

        expect(imageUrls.length).toBe(testImageUrls.length);
        expect(imageUrls.every( (url) => testImageUrls.includes(url))).toBeTruthy();
    });

    test('shows correct tracklist and durations in albumData', () => {
        render(<AlbumData data={data} />);
        const testTracks = data.tracks.items.map( (track) => {
            const duration = convertMsToMinutesSeconds(track.duration_ms);
            return `${track.name} (${duration})`;
        });

        const tracks = screen.getAllByRole('listitem', {name: "tracklist-item"})
            .map ( (track) => track.textContent);

        expect(tracks.every( (track) => testTracks.includes(track))).toBeTruthy();

    });
});