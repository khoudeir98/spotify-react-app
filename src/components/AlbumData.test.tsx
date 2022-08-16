import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AlbumData, { GetAlbumTracks } from "./AlbumData";
import {convertMsToMinutesSeconds} from "../common/utils";
import {Album, Track} from "../common/types";

describe(AlbumData, () => {
    const albumDataFromAlbum: Album = {
        artists: [
            {
                name: "batman",
                id:"2hazSY4Ef3aB9ATXW7F5w3",
                images: [
                    {
                        height: 640,
                        url: "https://i.scdn.co/image/ab6761610000e5eb9a93e273380982dff84c0d7c",
                        width: 640
                    }
                ],
                external_urls:{
                    "spotify":"https://open.spotify.com/artist/2hazSY4Ef3aB9ATXW7F5w3"
                },
                type: "artist"
            },
            {
                name: "robin",
                id:"SHASTA293832",
                images: [
                    {
                        height: 640,
                        url: "https://i.scdn.co/image/ab6761610000e5eb9a93e273380982dff84c0d7c",
                        width: 640
                    }
                ],
                external_urls:{
                    "spotify":"https://open.spotify.com/artist/SHASTA293832"
                },
                type: "artist"
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
        type: "album",
        release_date: "2012-12-21",
        release_date_precision: "day",
        id:"5U4W9E5WsYb2jUQWePT8Xm",
        total_tracks:2,
        tracks:{
            items:[
                {
                    artists:[
                        {
                            external_urls:{
                                spotify:"https://open.spotify.com/artist/2hazSY4Ef3aB9ATXW7F5w3"
                            },
                            id:"2hazSY4Ef3aB9ATXW7F5w3",
                            images: [
                                {
                                    height: 640,
                                    url: "https://i.scdn.co/image/ab6761610000e5eb9a93e273380982dff84c0d7c",
                                    width: 640
                                }
                            ],
                            name:"batman",
                            type: "artist"
                        }
                    ],
                    duration_ms:168226,
                    external_urls:{
                        spotify:"https://open.spotify.com/track/4wzuPyI0MiX5tjkcT7nu9K"
                    },
                    id:"4wzuPyI0MiX5tjkcT7nu9K",
                    name:"batman song",
                    track_number:1,
                    type: "track"
                },
                {
                    artists:[
                        {
                            external_urls:{
                                spotify:"https://open.spotify.com/artist/SHASTA293832"
                            },
                            id:"SHASTA293832",
                            images: [
                                {
                                    height: 640,
                                    url: "https://i.scdn.co/image/ab6761610000e5eb9a93e273380982dff84c0d7c",
                                    width: 640
                                }
                            ],
                            name:"robin",
                            type: "artist"
                        }
                    ],
                    duration_ms:240013,
                    external_urls:{
                        spotify:"https://open.spotify.com/track/2vMloVXd1y2snH0cZBOZgT"
                    },
                    id:"2vMloVXd1y2snH0cZBOZgT",
                    name:"robin song",
                    track_number:2,
                    type: "track"
                },
            ],
            limit:50,
            offset:0,
            total:2
        },
    };
    const albumDataFromArtist: Album = {
        artists: [
            {
                external_urls: {
                    spotify: "https://open.spotify.com/artist/43ZHCT0cAZBISjO8DG9PnE"
                },
                id: "43ZHCT0cAZBISjO8DG9PnE",
                images: [
                    {
                        height: 640,
                        url: "https://i.scdn.co/image/ab6761610000e5eb9a93e273380982dff84c0d7c",
                        width: 640
                    }
                ],
                name: "Elvis Presley",
                type: "artist"
            },
            {
                external_urls: {
                    spotify: "https://open.spotify.com/artist/0MvSBMGRQJY3mRwIbJsqF1"
                },
                id: "0MvSBMGRQJY3mRwIbJsqF1",
                images: [
                    {
                        height: 640,
                        url: "https://i.scdn.co/image/ab6761610000e5eb9a93e273380982dff84c0d7c",
                        width: 640
                    }
                ],
                name: "Royal Philharmonic Orchestra",
                type: "artist"
            }
        ],
        external_urls: {
            spotify: "https://open.spotify.com/album/11FCLUM5m9GiuxjGEoTVF5"
        },
        id: "11FCLUM5m9GiuxjGEoTVF5",
        images: [
            {
                height: 640,
                url: "https://i.scdn.co/image/ab67616d0000b2737f4bc5b1bd50ee702887bf2b",
                width: 640
            },
            {
                height: 300,
                url: "https://i.scdn.co/image/ab67616d00001e027f4bc5b1bd50ee702887bf2b",
                width: 300
            },
            {
                height: 64,
                url: "https://i.scdn.co/image/ab67616d000048517f4bc5b1bd50ee702887bf2b",
                width: 64
            }
        ],
        name: "Christmas with Elvis and the Royal Philharmonic Orchestra (Deluxe)",
        release_date: "2017-11-24",
        release_date_precision: "day",
        total_tracks: 17,
        type: "album"
    };
    const trackData: Track = {
        artists: [
            {
                external_urls: {
                    spotify: "https://open.spotify.com/artist/2hazSY4Ef3aB9ATXW7F5w3"
                },
                id: "2hazSY4Ef3aB9ATXW7F5w3",
                images: [
                    {
                        height: 640,
                        url: "https://i.scdn.co/image/ab6761610000e5eb9a93e273380982dff84c0d7c",
                        width: 640
                    }
                ],
                name: "IZAL",
                type: "artist",
            }
        ],
        duration_ms: 168226,
        external_urls: {
            spotify: "https://open.spotify.com/track/4wzuPyI0MiX5tjkcT7nu9K"
        },
        id: "4wzuPyI0MiX5tjkcT7nu9K",
        name: "Despedida",
        track_number: 1,
        type: "track",
    };

    const getAlbumTracks: GetAlbumTracks = jest.fn()  as jest.Mocked<GetAlbumTracks>;
    (getAlbumTracks as jest.Mock).mockResolvedValue({body: {items: [trackData]}});

    beforeEach(() => {
        jest.resetAllMocks();
    });

    const renderComponent = ({data = {} as Album, getAlbumTracks = jest.fn()}: {data?: Album, getAlbumTracks?: GetAlbumTracks}) => {
        return render(<AlbumData data={data} getAlbumTracks={getAlbumTracks}  />);
    }


    //when all album data is present
    test('shows all artist names from albumData', () => {
        renderComponent({ data: albumDataFromAlbum});
        const testArtists = albumDataFromAlbum.artists.map( (artist) => artist.name);

        const artists = testArtists.map( (artist) => screen.getByText(artist).textContent);

        expect(artists.length === testArtists.length).toBeTruthy();
        expect(artists.every( (artist) => testArtists.includes(artist!))).toBeTruthy();
    });

    test('has correct external urls to artists', () => {
        renderComponent({data: albumDataFromAlbum});
        const testArtistUrls = albumDataFromAlbum.artists.map((artist) => artist.external_urls.spotify);

        const artistUrls = screen.getAllByRole('link', {name: 'artist-link'})
            .map( (link) => link.getAttribute('href'));

        expect(artistUrls.length === testArtistUrls.length).toBeTruthy();
        expect(artistUrls.every( (url) => testArtistUrls.includes(url!))).toBeTruthy();
    });

    test('shows album name in albumData', () => {
        renderComponent({data: albumDataFromAlbum});
        const testAlbumName = albumDataFromAlbum.name;

        const albumName = screen.getByText(testAlbumName).textContent;

        expect(albumName === testAlbumName).toBeTruthy();
    });

    test('has correct external url to album', () => {
        renderComponent({data: albumDataFromAlbum});
        const testAlbumUrl = albumDataFromAlbum.external_urls.spotify;

        const albumUrl = screen.getByRole('link', {name: 'album-link'})
            .getAttribute('href');

        expect(albumUrl === testAlbumUrl).toBeTruthy();
    });

    test('shows correct 300x300 image in albumData', () => {
        renderComponent({data: albumDataFromAlbum});
        const testImageUrls = albumDataFromAlbum.images.filter( (image) => image.width === 300)
            .map((image) => image.url );

        const imageUrls = screen.getAllByRole('img')
            .map( (image) => image.getAttribute('src'));

        expect(imageUrls.length).toBe(testImageUrls.length);
        expect(imageUrls.every( (url) => testImageUrls.includes(url!))).toBeTruthy();
    });

    test('shows and hides tracklist onClick', async () => {
        renderComponent({data: albumDataFromAlbum});

        const tracklist = screen.getByTestId("tracklist");
        const button = screen.getByRole("button");

        expect(tracklist).toHaveClass("tracklist hidden", { exact: true });
        //TODO figure out why
        //this is giving "display: block" from the parent div
        //even though the hidden class applies "display: none"x
        //possibly due to css context?
        //using "visible" instead of "display" also fails
        //expect(tracklist).toHaveStyle("display: none");

        await userEvent.click(button);

        expect(tracklist).toHaveClass("tracklist", { exact: true });
        //expect(tracklist).toHaveStyle("display: block");
    });

    test('tracklist is present with correct data when component is hidden', () => {
        renderComponent({data: albumDataFromAlbum});

        const testTracks = albumDataFromAlbum.tracks?.items.map( (track) => {
            const duration = convertMsToMinutesSeconds(track.duration_ms);
            return `${track.name} (${duration})`;
        });

        const tracklist = screen.getByTestId("tracklist");

        expect(tracklist).toHaveClass("tracklist hidden", { exact: true });
        expect(tracklist).not.toHaveClass("tracklist", { exact: true });

        expect(tracklist).toHaveTextContent("Tracklist:");
        //testTracks.forEach( (track) => expect(tracklist).toHaveTextContent(track));
        for (const track of testTracks!) {
            expect(tracklist).toHaveTextContent(track);
        }
    });

    test("api isn't called to get album tracks when tracklist is already present", async () => {
        renderComponent({data: albumDataFromAlbum, getAlbumTracks});

        expect(screen.getByTestId("tracklist")).toBeInTheDocument();
        const button = screen.getByRole("button");

        await userEvent.click(button);
        expect(getAlbumTracks).not.toHaveBeenCalled();
    });

    //when no tracklist is initially present (data from ArtistPage)
    test('tracklist does not exist before api call for album data', () => {
        renderComponent({data: albumDataFromArtist, getAlbumTracks})

        expect(screen.queryByTestId("tracklist")).toBeNull();
    });

    test('tracklist is fetched from api call and component is correctly rendered and shown', async () => {
        renderComponent({data: albumDataFromArtist, getAlbumTracks})
        const button = screen.getByRole("button");

        (getAlbumTracks as jest.Mock).mockResolvedValue({body: {items: [trackData]}})
        const trackDuration = convertMsToMinutesSeconds(trackData.duration_ms);
        const trackText = `${trackData.name} (${trackDuration})`;


        await userEvent.click(button);
        expect(getAlbumTracks).toHaveBeenCalled();

        let tracklist;
        await waitFor(() => {
            tracklist = screen.getByTestId("tracklist");
        });
        expect(tracklist).toHaveClass("tracklist", { exact: true })
        expect(tracklist).toHaveTextContent("Tracklist:");
        expect(tracklist).toHaveTextContent(trackText);
    });
});