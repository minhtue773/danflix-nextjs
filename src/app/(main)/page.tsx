import CompanySection from '@/app/(main)/Home/CompanySection';
import MovieSection from '@/app/(main)/Home/MovieSection';
import CTA from '@/components/common/CTA';
import HeroBanner from './Home/HeroBanner';
import FAQs from '@/components/faqs-2';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <HeroBanner />
      <CompanySection />
      <MovieSection title="Phim nổi bật" params={{ limit: 10, type: 'phim-chieu-rap' }} />
      <MovieSection title="Phim lẻ mới cập nhật" params={{ limit: 10, type: 'phim-le' }} />
      <MovieSection title="Phim bộ mới cập nhật" params={{ limit: 10, type: 'phim-bo' }} />
      <CTA />
      <div className="mx-auto w-full max-w-5xl px-4 pb-12 md:px-8 md:pb-20">
        <FAQs />
      </div>
    </div>
  );
}
