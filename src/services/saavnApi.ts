const BASE_URL = 'https://saavn.sumit.co/api';

export async function searchSongs(query: string, page: number = 1) {
    const response = await fetch(
        `${BASE_URL}/search/songs?query=${encodeURIComponent(query)}&page=${page}`
    );
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function getSongById(id: string) {
    const response = await fetch(`${BASE_URL}/songs/${id}`);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}
