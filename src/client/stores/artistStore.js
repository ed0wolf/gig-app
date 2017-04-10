import fetchJson from './fetchJson';

export function getArtists() {
    return fetchJson('/api/artists');
}

export function getArtistById(id) {
    return fetchJson(`/api/artists/${id}`);
}