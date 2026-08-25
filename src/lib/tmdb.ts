export default async function tmdb(url: string, params: Record<string, any> = {}) {
  if (!url || url.includes('undefined') || url.includes('null')) {
    console.log(`[TMDB Warning] Invalid URL requested: ${url}`);
    return null;
  }
  // Chuyển Object thành query string (ví dụ: ?append_to_response=...&language=vi-VN)
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `https://api.themoviedb.org/3/${url}${queryString ? `?${queryString}` : ''}`;

  try {
    const res = await fetch(fullUrl, {
      next: { revalidate: 60 * 60 * 6 },
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.log(`[TMDB API Error] ${res.status} ${res.statusText} - Path: ${url}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.log(`[TMDB Fetch Error] Path: ${url}`, error);
    return null;
  }
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export type TMDBImageSize =
  'w45' | 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'w1280' | 'original';

export function getTMDBImage(path: string | null | undefined, size: TMDBImageSize = 'w500') {
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
