import { Effects } from '@/components/animate-ui/primitives/effects/effect';
import CarouselProgess from '@/components/common/CarouselProgess';

import { movieService } from '@/services/movieService';
import { MovieFilterParams } from '@/types/movie';

interface MovieSectionProps {
  title: string;
  params: MovieFilterParams;
}

export default async function MovieSection({ title, params }: MovieSectionProps) {
  const res = await movieService.getMovies(params);
  const movies = res?.data?.items;

  if (!movies) {
    return null;
  }
  return (
    <>
      <section className="w-full">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <Effects fade slide={{ direction: 'up' }} blur holdDelay={100} inView>
            <h2 className="mb-6 border-l-4 border-red-500 pl-4 font-heading text-xl font-bold capitalize">
              {title}
            </h2>
            <CarouselProgess movies={movies} />
          </Effects>
        </div>
      </section>
    </>
  );
}
