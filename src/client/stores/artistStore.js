var fetchJson = (path) => fetch(path).then(res => {
    if(!res.ok) {
        throw new Error(`Failed to get ${path}, status ${res.statusText}`);
    }
    return res.json();
})

export function getArtists() {
    return fetchJson('/api/artists');
}

export function getArtistById(id) {
    return fetchJson(`/api/artists/${id}`);
}