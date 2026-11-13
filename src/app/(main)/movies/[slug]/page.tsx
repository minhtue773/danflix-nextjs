import { MovieEpisode, MoviePhimapi } from '@/types/movie';
import { Heart, MessageCircleMore, Play, Plus, Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CollapsibleWrapper } from './CollapsibleWrapper';
import { Button } from '@/components/ui/button';
import MovieTabs from './MovieTabs';
import { movieService } from '@/services/movieService';
import { Suspense } from 'react';
import SkeletonMovieTabs from './SkeletonMovieTabs';
import stripHtml from '@/lib/stripHtml';
interface PageProps {
  params: Promise<{ slug: string }>; // Dành cho Next.js 15
}
export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await movieService.getMovieDetail(slug);
  const movie: MoviePhimapi = data?.movie;
  const episodes: MovieEpisode[] = data?.episodes || [];

  const firstEpisodeSlug = episodes?.[0]?.server_data?.[0]?.slug || 'tap-01';
  return (
    <>
      <div className="relative isolate w-full">
        <div className="relative block h-[65vh] w-full bg-background mask-b-from-50%">
          <Image
            fill
            priority
            className="object-cover"
            src={movie?.thumb_url}
            alt={`Thumbnail of ${movie?.name}`}
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-0 z-20 bg-black/60 backdrop-blur-xs" />
        </div>

        <div className="relative z-60 mx-auto max-w-5xl -translate-y-12 px-4 pb-8 md:-translate-y-20 md:px-8">
          <div className="isolate grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1 -mt-25 flex flex-col items-center gap-4 md:mt-0 md:items-start">
              <div className="relative aspect-2/3 w-50 md:w-62">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={movie?.name}
                  src={movie?.poster_url}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <h1 className="font-heading text-2xl font-bold text-white">{movie?.name}</h1>
                <h3 className="text-md text-[#FFD875]">{movie?.origin_name}</h3>
              </div>

              <CollapsibleWrapper>
                <>
                  <div className="space-y-4">
                    <div className="space-x-3 text-[12px]">
                      <button className="rounded-sm border border-white px-2 py-1 text-white">
                        {movie?.year}
                      </button>
                      <button className="rounded-sm border border-white px-2 py-1 text-white">
                        <span className="font-bold text-amber-400">IMDB</span>{' '}
                        {Math.round(movie?.tmdb?.vote_average * 10) / 10}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[12px]">
                      {movie?.category?.map((item) => (
                        <button
                          key={item.id}
                          className="rounded-sm bg-white/20 px-2 py-1 text-white"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="text-white">
                        <b>Giới thiệu:</b>
                      </div>
                      <div className="text-justify text-white/60">
                        {stripHtml(movie?.content) || 'Đang cập nhật'}
                      </div>
                    </div>

                    {movie?.tmdb?.type === 'movie' ? (
                      <div className="space-y-4">
                        <div className="w-fit rounded-md border border-green-700 bg-green-500/40 px-4 py-1 text-sm">
                          {movie?.episode_current}
                        </div>
                        <div className="self-start text-sm text-white">
                          <b>Thời lượng:</b> {movie?.time}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-fit rounded-md border border-green-700 bg-green-500/40 px-4 py-1 text-sm">
                          {movie?.episode_current} / {movie?.episode_total}
                        </div>
                        <div className="self-start text-sm text-white">
                          <b>Thời lượng:</b> {movie?.time}
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-white">
                      <b>Quốc gia:</b> {movie?.country.map((item) => item.name).join(', ')}
                    </div>
                  </div>
                </>
              </CollapsibleWrapper>
            </div>
            <div className="z-10 col-span-2 flex flex-col gap-8">
              <div className="flex flex-col items-center justify-between gap-4 text-white md:flex-row">
                <Link href={`/movies/${movie?.slug}/${firstEpisodeSlug}`}>
                  <Button
                    size="lg"
                    className="cursor-pointer gap-3 rounded-full px-8 py-6 font-heading text-lg"
                  >
                    <Play />
                    Watch
                  </Button>
                </Link>
                <div className="flex items-center gap-4">
                  <button className="flex cursor-pointer flex-col items-center gap-1 bg-transparent p-2 hover:text-red-500">
                    <Heart />
                    <p className="text-sm">Yêu thích</p>
                  </button>
                  <button className="flex cursor-pointer flex-col items-center gap-1 bg-transparent p-2 hover:text-red-500">
                    <Plus />
                    <p className="text-sm">Thêm vào</p>
                  </button>
                  <button className="flex cursor-pointer flex-col items-center gap-1 bg-transparent p-2 hover:text-red-500">
                    <Share />
                    <p className="text-sm">Chia sẽ</p>
                  </button>
                  <button className="flex cursor-pointer flex-col items-center gap-1 bg-transparent p-2 hover:text-red-500">
                    <MessageCircleMore />
                    <p className="text-sm">Bình luận</p>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Suspense fallback={<SkeletonMovieTabs />}>
                  <MovieTabs type={movie?.tmdb?.type} id={movie?.tmdb?.id} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
