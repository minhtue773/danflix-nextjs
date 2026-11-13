import { getMovieImageUrl } from '@/lib/utils';
import { MoviePhimapi } from '@/types/movie';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieProps {
  movie: MoviePhimapi;
}

export default function CardMovie({ movie }: MovieProps) {
  return (
    <Link
      href={`/movies/${movie.slug}`}
      aria-label={`Xem phim ${movie.name}`}
      className="group block min-w-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-white/10 bg-muted shadow-lg shadow-black/20 transition-[border-color,box-shadow] duration-300 group-hover:border-primary/60 group-hover:shadow-xl group-hover:shadow-black/35">
        <Image
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
          src={getMovieImageUrl(movie.poster_url)}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 45vw, 20vw"
          alt={`Áp phích phim ${movie.name}`}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/10 opacity-90 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
          aria-hidden="true"
        />

        <div className="absolute top-2 right-2 left-2 flex items-start justify-between gap-2">
          {movie.tmdb?.type === 'tv' ? (
            <span className="rounded-md border border-white/15 bg-black/65 px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
              Series
            </span>
          ) : (
            <span />
          )}
          {movie.quality && (
            <span className="rounded-md bg-primary px-2 py-1 text-[10px] font-bold tracking-wide text-primary-foreground uppercase shadow-md">
              {movie.quality}
            </span>
          )}
        </div>

        <span
          className="pointer-events-none absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/35 text-white opacity-0 shadow-xl backdrop-blur-sm transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
          aria-hidden="true"
        >
          <Play className="ml-0.5 size-5 fill-current" />
        </span>

        <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-1 p-3 pt-10 text-white sm:p-4 sm:pt-12">
          <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-balance drop-shadow-md sm:text-base">
            {movie.name}
          </h3>
          {movie.origin_name && movie.origin_name !== movie.name && (
            <p className="truncate text-xs text-white/65">{movie.origin_name}</p>
          )}
          <div className="mt-1 flex min-w-0 items-center gap-2 text-[11px] font-medium text-white/75 sm:text-xs">
            {movie.year ? <span>{movie.year}</span> : null}
            {movie.year && movie.lang ? <span className="size-1 rounded-full bg-primary" /> : null}
            {movie.lang ? <span className="truncate">{movie.lang}</span> : null}
            {!movie.lang && movie.quality ? (
              <span className="truncate">{movie.episode_current}</span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
