export default function fetchJson(path) {
    return fetch(path).then(res => {
        if(!res.ok) {
            throw new Error(`Failed to get ${path}, status ${res.statusText}`);
        }
        return res.json();
    });
}