import HeroBanner from '@/components/pages/Home/HeroBanner';
import CompanySection from '@/components/pages/Home/CompanySection';
import MovieSection from '@/components/pages/Home/MovieSection';
import CTA from '@/components/common/CTA';
import { AnimateInView } from '@/components/animate/AnimateInView';

export default function Home() {
  const movies = [
    {
      tmdb: {
        id: '286791',
        type: 'tv',
        season: 1,
        vote_average: 7.7,
        vote_count: 15,
      },
      imdb: {
        id: 'tt37499375',
        vote_average: 7.2,
        vote_count: 220,
      },
      modified: {
        time: '2026-07-27T16:39:53.867Z',
      },
      _id: '390c177edc5866c87d55be2372632892',
      name: 'DIGIMON BEATBREAK',
      slug: 'digimon-beatbreak',
      origin_name: 'Digimon Beatbreak',
      alternative_names: [
        '数码兽 BEATBREAK',
        '数码暴龙 BEATBREAK',
        'デジモンビートブレイク',
        'Dejimon Bītobureiku',
        'DIGIMON BEATBREAK（デジモンビートブレイク）',
        'DIGIMON BEATBREAK',
      ],
      type: 'hoathinh',
      thumb_url: 'upload/vod/20251111-1/b9d5ee4209289a3e9ba05a7b002f8e0c.jpg',
      poster_url: 'upload/vod/20251111-1/0db4abb38dc3193efe0ac7c3d7d4753b.jpg',
      sub_docquyen: false,
      chieurap: false,
      time: '23 phút/tập',
      episode_current: 'Tập 40',
      quality: 'FHD',
      lang: 'Vietsub',
      lang_key: ['vs'],
      year: 2025,
      category: [
        {
          name: 'Hành Động',
          slug: 'hanh-dong',
          id: '9822be111d2ccc29c7172c78b8af8ff5',
        },
        {
          name: 'Khoa Học',
          slug: 'khoa-hoc',
          id: '0bcf4077916678de9b48c89221fcf8ae',
        },
        {
          name: 'Phiêu Lưu',
          slug: 'phieu-luu',
          id: '66c78b23908113d478d8d85390a244b4',
        },
        {
          name: 'Trẻ Em',
          slug: 'tre-em',
          id: '0c853f6238e0997ee318b646bb1978bc',
        },
        {
          name: 'Viễn Tưởng',
          slug: 'vien-tuong',
          id: '68564911f00849030f9c9c144ea1b931',
        },
      ],
      country: [
        {
          name: 'Nhật Bản',
          slug: 'nhat-ban',
          id: 'd4097fbffa8f7149a61281437171eb83',
        },
      ],
      last_episodes: [
        {
          server_name: 'Vietsub',
          is_ai: false,
          name: 'Tập 40',
        },
      ],
    },
    {
      tmdb: {
        id: '1264804',
        type: 'movie',
        season: null,
        vote_average: 4,
        vote_count: 2,
      },
      imdb: {
        id: null,
        vote_average: 0,
        vote_count: 0,
      },
      modified: {
        time: '2026-07-27T16:37:06.967Z',
      },
      _id: '6a678932b70f67df3a0c2e66',
      name: 'Quái Thú Vực Sâu',
      slug: 'quai-thu-vuc-sau',
      origin_name: 'The Monster In The Abyss',
      alternative_names: ['Abyssal.Beast', '심연거수', '深渊巨兽'],
      type: 'single',
      thumb_url: 'uploads/movies/20260727/quai-thu-vuc-sau-thumb.webp',
      poster_url: 'uploads/movies/20260727/quai-thu-vuc-sau-poster.webp',
      sub_docquyen: false,
      chieurap: false,
      time: '72 phút',
      episode_current: 'Full',
      quality: 'FHD',
      lang: 'Vietsub + Thuyết Minh',
      lang_key: ['vs', 'tm'],
      year: 2024,
      category: [
        {
          name: 'Chính Kịch',
          slug: 'chinh-kich',
          id: '37a7b38b6184a5ebd3c43015aa20709d',
        },
        {
          name: 'Lịch Sử',
          slug: 'lich-su',
          id: 'f8ec3e9b77c509fdf64f0c387119b916',
        },
        {
          name: 'Phiêu Lưu',
          slug: 'phieu-luu',
          id: '66c78b23908113d478d8d85390a244b4',
        },
        {
          name: 'Tâm Lý',
          slug: 'tam-ly',
          id: 'a7b065b92ad356387ef2e075dee66529',
        },
        {
          name: 'Viễn Tưởng',
          slug: 'vien-tuong',
          id: '68564911f00849030f9c9c144ea1b931',
        },
      ],
      country: [
        {
          name: 'Trung Quốc',
          slug: 'trung-quoc',
          id: '3e075636c731fe0f889c69e0bf82c083',
        },
      ],
      last_episodes: [
        {
          server_name: 'Vietsub',
          is_ai: false,
          name: 'Full',
        },
        {
          server_name: 'Thuyết Minh',
          is_ai: false,
          name: 'Full',
        },
      ],
    },
  ];

  return (
    <>
      <HeroBanner movies={movies} />

      <section className="w-full py-12 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <CompanySection />
        </div>
      </section>

      <AnimateInView variant="blurIn">
        <section className="w-full pb-12 md:pb-20">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <MovieSection title="Phim nổi bật" movies={movies} />
          </div>
        </section>
      </AnimateInView>

      <AnimateInView variant="blurIn">
        <section className="w-full pb-12 md:pb-20">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
            <MovieSection title="Phim lẻ mới cập nhật" movies={movies} />
          </div>
        </section>
      </AnimateInView>

      <section className="w-full pb-12 md:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <MovieSection title="Phim bộ mới cập nhật" movies={movies} />
        </div>
      </section>

      <section className="w-full pb-12 md:pb-20">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <CTA />
        </div>
      </section>
    </>
  );
}
