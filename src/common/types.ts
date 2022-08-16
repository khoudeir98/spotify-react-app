export interface Image {
    height: number,
    url: string,
    width: number
}

export interface Artist {
    external_urls: {
        spotify: string
    },
    id: string,
    images: Image[],
    name: string,
    type: "artist"
}

export interface Track {
    artists: Artist[],
    duration_ms: number,
    external_urls: {
        spotify: string
    },
    id: string,
    name: string,
    track_number: number,
    type: "track"
}

export interface Album {
    artists: Artist[],
    external_urls: {
        spotify: string
    },
    id: string,
    images: Image[],
    name: string,
    type: "album",
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    tracks?: {
        items: Track[],
        limit: number,
        offset: number,
        total: number
    }
}