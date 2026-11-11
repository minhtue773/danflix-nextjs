import { Effects } from '@/components/animate-ui/primitives/effects/effect';
import CarouselProgess from '@/components/common/CarouselProgess';
import RetryButton from '@/components/common/RetryButton';

import { movieService } from '@/services/movieService';
import { MovieFilterParams, MoviePhimapi } from '@/types/movie';

interface MovieSectionProps {
  title: string;
  params: MovieFilterParams;
}

export default async function MovieSection({ title, params }: MovieSectionProps) {
  let movies: MoviePhimapi[];

  try {
    const res = await movieService.getMovies(params);
    movies = Array.isArray(res?.data?.items) ? res.data.items : [];
  } catch (error) {
    console.error(`Không thể tải danh sách phim "${title}":`, error);

    return (
      <section className="w-full" aria-labelledby={`movie-section-${params.type}`}>
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <h2
            id={`movie-section-${params.type}`}
            className="mb-4 border-l-4 border-red-500 pl-4 font-heading text-xl font-bold capitalize"
          >
            {title}
          </h2>
          <div
            role="alert"
            className="flex flex-col items-start gap-3 rounded-lg border border-border p-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
          >
            <p>Không thể tải danh sách phim lúc này. Vui lòng thử lại sau.</p>
            <RetryButton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <Effects fade slide={{ direction: 'up' }} blur holdDelay={100} inView>
          <h2
            id={`movie-section-${params.type}`}
            className="mb-6 border-l-4 border-red-500 pl-4 font-heading text-xl font-bold capitalize"
          >
            {title}
          </h2>
          {movies.length > 0 ? (
            <CarouselProgess movies={movies} />
          ) : (
            <p className="py-6 text-sm text-muted-foreground">Chưa có phim trong danh sách này.</p>
          )}
        </Effects>
      </div>
    </section>
  );
}

export function MovieSectionSkeleton({ title }: { title: string }) {
  return (
    <section className="w-full" aria-label={`Đang tải ${title}`} role="status">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <h2 className="mb-6 border-l-4 border-red-500 pl-4 font-heading text-xl font-bold capitalize">
          {title}
        </h2>
        <div className="-ml-4 flex overflow-hidden md:-ml-6" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="basis-1/2 pl-4 md:basis-1/5 md:pl-6">
              <div className="aspect-2/3 animate-pulse rounded-lg bg-muted" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
