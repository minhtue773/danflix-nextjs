import CompanySection from '@/app/(main)/Home/CompanySection';
import MovieSection from '@/app/(main)/Home/MovieSection';
import CTA from '@/components/common/CTA';
import HeroBanner from './Home/HeroBanner';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <HeroBanner />
      <CompanySection />
      <MovieSection title="Phim nổi bật" params={{ limit: 10, type: 'phim-chieu-rap' }} />
      <MovieSection title="Phim lẻ mới cập nhật" params={{ limit: 10, type: 'phim-le' }} />
      <MovieSection title="Phim bộ mới cập nhật" params={{ limit: 10, type: 'phim-bo' }} />
      <CTA />
    </div>
  );
}
