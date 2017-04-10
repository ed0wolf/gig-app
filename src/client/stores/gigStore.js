import fetchJson from './fetchJson';

export function getGigsFiltersForArtist(artistId) {
    return fetchJson(`/api/gigs/${artistId}/filters`);
}