import BannerPage from '@/components/common/BannerPage';
import SearchInput from './SearchInput';
import { MovieSearchList } from './MovieSearchList';
import { Suspense } from 'react';
import { MovieListSkeleton } from '../movies/MovieListSkeleton';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = '', page = '1', limit = '20' } = await searchParams;
  const breadcrumb = [
    {
      title: 'Tìm kiếm',
      href: '/search',
    },
  ];

  return (
    <>
      <BannerPage breadcrumb={breadcrumb} />
      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="space-y-6">
            {/* Thanh tìm kiếm ô Input (Client Component) */}
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-6 text-center text-2xl font-bold text-white md:text-3xl">
                Tìm kiếm phim
              </h1>
              <SearchInput />
            </div>
            <div className="text-sm text-zinc-400">
              Kết quả tìm kiếm cho: <span className="font-semibold text-white">"{q}"</span>
            </div>
            <Suspense key={`${q}-${page}`} fallback={<MovieListSkeleton />}>
              <MovieSearchList q={q} page={page} limit={limit} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
