import GlassyCarousel, { type GlassyCarouselItem } from '@/components/ui/glassy-coverflow-carousel';
import { movieService } from '@/services/movieService';
import type { MoviePhimapi } from '@/types/movie';
import { getMovieImageUrl } from '@/lib/utils';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default async function HeroBanner() {
  let items: GlassyCarouselItem[] = [];

  try {
    const response = await movieService.getMovies({ type: 'phim-chieu-rap', limit: 8 });
    const movies: MoviePhimapi[] = Array.isArray(response?.data?.items) ? response.data.items : [];

    items = movies.map((movie) => ({
      id: movie._id || movie.slug,
      title: movie.name,
      subtitle: [movie.year, movie.quality, movie.lang].filter(Boolean).join(' · '),
      image: getMovieImageUrl(movie.poster_url, '/assets/images/NoImage.jpg'),
      href: `/movies/${movie.slug}`,
    }));
  } catch (error) {
    console.error('Không thể tải phim cho carousel trang chủ:', error);
  }

  if (items.length > 0) {
    return <GlassyCarousel items={items} />;
  }

  return (
    <section className="flex min-h-[420px] w-full flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="flex max-w-5xl flex-col items-center gap-4 sm:gap-6">
        <h1 className="text-4xl leading-tight font-medium md:text-7xl">
          Thế giới điện ảnh đỉnh cao <span className="tracking-tight">trên từng góc nhìn</span>
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Khám phá hàng ngàn bộ phim bom tấn, phim bộ đặc sắc và phim hoạt hình vietsub chất lượng
          cao. Trải nghiệm không gian giải trí mượt mà, cập nhật liên tục mỗi ngày.
        </p>
      </div>
      <Link
        href="/movies"
        className="group relative inline-flex h-12 items-center overflow-hidden rounded-full bg-primary py-1 pr-14 pl-6 text-sm font-medium text-primary-foreground transition-all duration-500 hover:pr-6 hover:pl-14"
      >
        <span className="relative z-10">Trải nghiệm</span>
        <span className="absolute right-1 flex size-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </span>
      </Link>
    </section>
  );
}
