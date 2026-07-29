// components/MovieList.tsx
import CardMovie from '@/components/common/CardMovie';
import { AppPagination } from '@/components/common/CustomPagination';
import { movieService } from '@/services/movieService';
import { MovieFilterParams, MoviePhimapi } from '@/types/movie';

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
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <p className="text-lg font-medium">Không tìm thấy phim phù hợp</p>
        <p className="text-sm">Vui lòng thử lại với bộ lọc khác.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
        {movies.map((item: MoviePhimapi, index: number) => (
          <div
            key={item.slug}
            className="animate-in duration-500 ease-out fade-in-0 fill-mode-backwards zoom-in-90 slide-in-from-bottom-4"
            style={{ animationDelay: `${(index % 10) * 50}ms` }}
          >
            <CardMovie movie={item} />
          </div>
        ))}
      </div>
      {hasMovies && pagination && (
        <div>
          <AppPagination pagination={pagination} />
        </div>
      )}
    </>
  );
}
