// components/MovieList.tsx
import { Effects } from '@/components/animate-ui/primitives/effects/effect';
import CardMovie from '@/components/common/CardMovie';
import { AppPagination } from '@/components/common/CustomPagination';
import { movieService } from '@/services/movieService';
import { MovieFilterParams, MoviePhimapi } from '@/types/movie';
import { StickyNoteOff } from 'lucide-react';

interface MovieListProps {
  searchParams: MovieFilterParams;
}

export async function MovieList({ searchParams }: MovieListProps) {
  const apiRes = await movieService.getMovies(searchParams);

  const movies = apiRes?.data?.items || [];
  const pagination = apiRes?.data?.params?.pagination;
  const hasMovies = movies.length > 0;

  if (!hasMovies) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4 py-12 text-center text-foreground">
        <StickyNoteOff size={50} />
        <p className="text-lg font-medium">Không tìm thấy phim phù hợp</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
        <Effects
          holdDelay={70}
          fade
          slide={{ direction: 'up', offset: 30 }}
          blur={{ initialBlur: 6 }}
          inView
          delay={0}
        >
          {movies.map((item: MoviePhimapi) => (
            <CardMovie key={item.slug} movie={item} />
          ))}
        </Effects>
      </div>
      {hasMovies && pagination && (
        <div>
          <AppPagination pagination={pagination} />
        </div>
      )}
    </>
  );
}
