import { Effects } from '@/components/animate-ui/primitives/effects/effect';
import CardMovie from '@/components/common/CardMovie';
import { AppPagination } from '@/components/common/CustomPagination';
import { movieService } from '@/services/movieService';
import { MoviePhimapi } from '@/types/movie';
import { StickyNoteOff } from 'lucide-react';
import RetryButton from '@/components/common/RetryButton';

interface MovieSearchListProps {
  q?: string;
  page?: string;
  limit?: string;
}

export async function MovieSearchList({ q = '', page = '1', limit = '10' }: MovieSearchListProps) {
  if (!q.trim()) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4 py-12 text-center text-muted-foreground">
        <StickyNoteOff size={50} aria-hidden="true" />
        <p className="text-lg font-medium">Nhập tên phim để bắt đầu tìm kiếm.</p>
      </div>
    );
  }

  let movies: MoviePhimapi[];
  let pagination;

  try {
    const res = await movieService.searchMovie(q, page, limit);
    movies = Array.isArray(res?.data?.items) ? res.data.items : [];
    pagination = res?.data?.params?.pagination;
  } catch (error) {
    console.error('Không thể tải kết quả tìm kiếm phim:', error);

    return (
      <div
        role="alert"
        className="flex min-h-100 flex-col items-center justify-center gap-4 py-12 text-center"
      >
        <p className="text-lg font-medium">Không thể tải kết quả tìm kiếm lúc này.</p>
        <RetryButton />
      </div>
    );
  }

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
