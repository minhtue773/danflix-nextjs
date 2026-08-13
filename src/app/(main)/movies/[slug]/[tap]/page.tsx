import { MovieEpisode, MoviePhimapi } from '@/types/movie';
import { movieService } from '@/services/movieService';
import BannerPage from '@/components/common/BannerPage';
import InfoMovie from './InfoMovie';

interface PageProps {
  params: Promise<{
    slug: string;
    tap: string;
  }>;
}

export default async function WatchPape({ params }: PageProps) {
  const { slug, tap } = await params;

  const data = await movieService.getMovieDetail(slug);
  const movie: MoviePhimapi = data?.movie;
  const episodes: MovieEpisode[] = data?.episodes || [];

  const breadcrumb = [
    {
      title: 'Phim',
      href: '/movies',
    },
    {
      title: `Phim ${data?.movie?.name}`,
      href: `/movies/${slug}`,
    },
    {
      title: `Watch`,
    },
  ];
  return (
    <>
      <BannerPage breadcrumb={breadcrumb} />
      <section className="@container bg-background py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <InfoMovie movie={movie} episodes={episodes} currentTapSlug={tap} movieSlug={slug} />
        </div>
      </section>
    </>
  );
}
