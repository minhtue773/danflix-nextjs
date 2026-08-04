import BannerPage from '@/components/common/BannerPage';
import { FilterButton } from './FilterButton';
import { MovieFilterParams } from '@/types/movie';
import { MovieList } from './MovieList';
import { Suspense } from 'react';
import { MovieListSkeleton } from './MovieListSkeleton';

interface PageProps {
  searchParams: Promise<MovieFilterParams>;
}

export default async function Movies({ searchParams }: PageProps) {
  const breadcrumb = [
    {
      title: 'Movies',
      href: '/movies',
    },
  ];
  const resolvedParams = await searchParams;

  return (
    <>
      <BannerPage breadcrumb={breadcrumb} />
      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <FilterButton />
            </div>
            <Suspense key={JSON.stringify(resolvedParams)} fallback={<MovieListSkeleton />}>
              <MovieList searchParams={resolvedParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
