import { MoviePhimapi } from '@/types/movie';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MovieProps {
  movie: MoviePhimapi;
}

export default function CardMovie({ movie }: MovieProps) {
  return (
    <>
      <Link href={`/movies/${movie.tmdb.id}/${movie.slug}`}>
        <div className="group relative aspect-2/3 overflow-hidden rounded-lg border">
          <Image
            fill
            className="h-full w-full object-cover transition-all duration-150 ease-in group-hover:scale-110"
            src={`https://phimimg.com/` + movie.poster_url}
            sizes="(max-width: 768px) 144px, 192px"
            alt={movie.name}
          />
          {movie.tmdb.type === 'tv' && (
            <div className="bg-primary text-primary-foreground absolute top-0 right-0 rounded-bl-lg p-1 px-4 text-sm">
              TV
            </div>
          )}
          <div className="text-foreground absolute right-0 bottom-0 left-0 z-10 flex flex-col gap-1 bg-black/70 mask-t-from-90% p-2 backdrop-blur-md">
            <h3 className="truncate text-sm capitalize text-shadow-red-300 text-shadow-xs">
              {movie.name}
            </h3>
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <p>{movie.year}</p>
              <Dot size={12} />
              <p>{movie.quality}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
