'use client';

import * as React from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Progress } from '@/components/ui/progress';
import { MoviePhimapi } from '@/types/movie';
import CardMovie from '@/components/common/CardMovie';

interface CarouselWithProgressProps {
  movies: MoviePhimapi[];
}

export default function CarouselProgress({ movies }: CarouselWithProgressProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const progress = count > 0 ? (current * 100) / count : 0;

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (!movies || movies.length === 0) return null;

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent className="-ml-4 md:-ml-6">
        {movies.map((movie) => (
          <CarouselItem key={movie.slug} className="basis-1/2 pl-4 md:basis-1/5 md:pl-6">
            <CardMovie movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
        <Progress className="w-32" value={progress} />
      </div>
    </Carousel>
  );
}
