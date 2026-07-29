'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import Link from 'next/link';

interface MovieTMDB {
  vote_average: number;
  type?: string;
}

interface Movie {
  _id?: string;
  name: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number | string;
  tmdb: MovieTMDB;
}

interface NavProps {
  movies: Movie[];
}

export default function HeroBanner({ movies }: NavProps) {
  return (
    <section className="w-full">
      <Carousel
        opts={{
          loop: true,
          duration: 35,
        }}
        plugins={[Fade()]}
      >
        <CarouselContent className="ml-0 h-full">
          {movies.map((item) => (
            <CarouselItem key={item._id} className="transform-gpu pl-0!">
              <div className="relative h-[75vh] w-full overflow-hidden mask-b-from-85%">
                <Image
                  src={`https://phimimg.com/` + item.thumb_url}
                  alt={item.name}
                  fill
                  priority
                  className="absolute inset-0 z-10 h-full w-full object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 z-20 bg-black/70" />
                <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(rgba(78,69,69,0.3)_1px,transparent_1px)] bg-size-[4px_4px]" />
                <div className="text-foreground absolute inset-0 z-40 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4 font-sans">
                    <div className="relative aspect-2/3 w-36 shrink-0 overflow-hidden rounded-md md:w-48">
                      <Image
                        src={`https://phimimg.com/` + item.poster_url}
                        alt={item.name}
                        className="object-cover"
                        sizes="(max-width: 768px) 144px, 192px"
                        priority
                        fill
                      />
                    </div>
                    <Link href={'/movies/123/ád'}>
                      <div className="space-y-1 text-center">
                        <h2 className="font-heading font-bold text-amber-400 md:text-2xl">
                          {item.name}
                        </h2>
                        <h2 className="font-semibold">{item.origin_name}</h2>
                      </div>
                    </Link>
                    <div className="flex items-center justify-center gap-2 text-[8px] md:justify-start md:text-[12px]">
                      <button className="rounded-md border border-amber-400 bg-amber-700 p-0.5 md:bg-transparent md:p-1.5">
                        <span className="font-bold text-amber-400">TMDB </span>
                        {Math.round(item.tmdb.vote_average * 10) / 10}
                      </button>
                      <button className="rounded-md bg-white p-0.5 font-bold text-black md:p-1.5">
                        T13
                      </button>
                      <button className="rounded-md border border-white bg-white p-0.5 text-black md:bg-transparent md:p-1.5 md:text-white">
                        {item.year}
                      </button>
                      <button className="rounded-md border border-white bg-white p-0.5 text-black uppercase md:bg-transparent md:p-1.5 md:text-white">
                        {item.tmdb.type ?? 'movie'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-50 hidden h-12 w-12 rounded-full border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:text-red-500 md:flex" />
        <CarouselNext className="right-4 z-50 hidden h-12 w-12 rounded-full border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:text-red-500 md:flex" />
      </Carousel>
    </section>
  );
}
