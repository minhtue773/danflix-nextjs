import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMovieImageUrl(
  posterUrl?: string,
  fallback = '/images/poster-placeholder.jpg'
): string {
  if (!posterUrl) return fallback;

  if (posterUrl.startsWith('http://') || posterUrl.startsWith('https://')) {
    return posterUrl;
  }

  const cleanPath = posterUrl.startsWith('/') ? posterUrl : `/${posterUrl}`;
  return `https://phimimg.com${cleanPath}`;
}
