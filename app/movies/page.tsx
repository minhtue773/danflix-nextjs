import CardMovie from '@/components/common/CardMovie';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Funnel } from 'lucide-react';
import { AppPagination } from '@/components/common/CustomPagination';
import BannerPage from '@/components/common/BannerPage';
import { FilterButton } from './filter';

export default function Movies() {
  const breadcrumb = [
    {
      title: 'Movies',
      href: '/movies',
    },
  ];

  const movies = [
    {
      tmdb: {
        id: '1147266-6',
        type: 'movie',
        season: null,
        vote_average: 6.4,
        vote_count: 47,
      },
      imdb: {
        id: 'tt33478321',
        vote_average: 0,
        vote_count: 16,
      },
      modified: {
        time: '2026-05-24T01:27:15.000Z',
      },
      _id: '803d1665f18163c7851eadf4f7ed6120',
      name: 'Tiên Tri Tử Thần',
      slug: 'tien-tri-tu-than',
      origin_name: 'You Will Die In 6 Hours',
      alternative_names: [
        '六小时后你将死去',
        'You Will Die In 6 Hours',
        'Morirás en 6 horas',
        '6시간 후 너는 죽는다',
      ],
      type: 'single',
      thumb_url: 'upload/vod/20250226-1/1125e0b8a8f1d66744bdc1019f2f0e3e.jpg',
      poster_url: 'upload/vod/20260524-1/ce4cb2ee8e2161c773a1e311bd9000dd.jpg',
      sub_docquyen: false,
      chieurap: true,
      time: '91 phút',
      episode_current: 'Full',
      quality: 'FHD',
      lang: 'Vietsub',
      lang_key: ['vs'],
      year: 2024,
      category: [
        {
          name: 'Tâm Lý',
          slug: 'tam-ly',
          id: 'a7b065b92ad356387ef2e075dee66529',
        },
        {
          name: 'Tình Cảm',
          slug: 'tinh-cam',
          id: 'bb2b4b030608ca5984c8dd0770f5b40b',
        },
        {
          name: 'Hình Sự',
          slug: 'hinh-su',
          id: '7a035ac0b37f5854f0f6979260899c90',
        },
        {
          name: 'Chính Kịch',
          slug: 'chinh-kich',
          id: '37a7b38b6184a5ebd3c43015aa20709d',
        },
      ],
      country: [
        {
          name: 'Hàn Quốc',
          slug: 'han-quoc',
          id: '05de95be5fc404da9680bbb3dd8262e6',
        },
      ],
      last_episodes: [
        {
          server_name: 'Vietsub',
          is_ai: false,
          name: 'Full',
        },
      ],
    },
    {
      tmdb: {
        id: '1380898',
        type: 'movie',
        season: null,
        vote_average: 6.6,
        vote_count: 5,
      },
      imdb: {
        id: 'tt39371602',
        vote_average: 0,
        vote_count: 7,
      },
      modified: {
        time: '2026-05-11T07:59:33.000Z',
      },
      _id: 'ba441cd4df34d166bc3a655b090eccd0',
      name: 'Double Exposure',
      slug: 'double-exposure',
      origin_name: 'Double Exposure',
      alternative_names: ['Double Exposure', '双重曝光', '이중노출'],
      type: 'single',
      thumb_url: 'upload/vod/20260511-1/59643535315bda5339384985e8a3baf9.jpg',
      poster_url: 'upload/vod/20260511-1/ffc54e3b6a880643da9a37148245d030.jpg',
      sub_docquyen: false,
      chieurap: false,
      time: '81 phút',
      episode_current: 'Full',
      quality: 'FHD',
      lang: 'Vietsub',
      lang_key: ['vs'],
      year: 2024,
      category: [
        {
          name: 'Chính Kịch',
          slug: 'chinh-kich',
          id: '37a7b38b6184a5ebd3c43015aa20709d',
        },
      ],
      country: [
        {
          name: 'Hàn Quốc',
          slug: 'han-quoc',
          id: '05de95be5fc404da9680bbb3dd8262e6',
        },
      ],
      last_episodes: [
        {
          server_name: 'Vietsub',
          is_ai: false,
          name: 'Full',
        },
      ],
    },
    {
      tmdb: {
        id: '861047',
        type: 'movie',
        season: null,
        vote_average: 6.2,
        vote_count: 10,
      },
      imdb: {
        id: 'tt26730336',
        vote_average: 6,
        vote_count: 183,
      },
      modified: {
        time: '2026-04-09T03:36:40.000Z',
      },
      _id: 'b5932e1bc9bc30711f71a60a3d5c965c',
      name: 'Sự Thật Sau Giấc Ngủ',
      slug: 'su-that-sau-giac-ngu',
      origin_name: 'While You Were Sleeping',
      alternative_names: ['وقتی تو خواب بودی', 'While You Were Sleeping', '당신이 잠든 사이'],
      type: 'single',
      thumb_url: 'upload/vod/20260409-1/66081c21f3cbca0f764f85ea7426d33e.jpg',
      poster_url: 'upload/vod/20260409-1/054939b7aab94b8d0076bd5dce622787.jpg',
      sub_docquyen: false,
      chieurap: false,
      time: '100 phút',
      episode_current: 'Full',
      quality: 'FHD',
      lang: 'Vietsub',
      lang_key: ['vs'],
      year: 2024,
      category: [
        {
          name: 'Bí Ẩn',
          slug: 'bi-an',
          id: '2fb53017b3be83cd754a08adab3e916c',
        },
        {
          name: 'Chính Kịch',
          slug: 'chinh-kich',
          id: '37a7b38b6184a5ebd3c43015aa20709d',
        },
        {
          name: 'Tâm Lý',
          slug: 'tam-ly',
          id: 'a7b065b92ad356387ef2e075dee66529',
        },
      ],
      country: [
        {
          name: 'Hàn Quốc',
          slug: 'han-quoc',
          id: '05de95be5fc404da9680bbb3dd8262e6',
        },
      ],
      last_episodes: [
        {
          server_name: 'Vietsub',
          is_ai: false,
          name: 'Full',
        },
      ],
    },
  ];

  const pagination = {
    totalItems: 63,
    totalItemsPerPage: 24,
    currentPage: 1,
    totalPages: 3,
  };
  return (
    <>
      <BannerPage breadcrumb={breadcrumb} />
      <section className="w-full py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <FilterButton />
              <Select value={'year.desc'}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Sắp xếp theo..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="modified.time.desc">Mới cập nhật</SelectItem>
                    <SelectItem value="modified.time.asc">Cập nhật cũ nhất</SelectItem>
                    <SelectItem value="year.desc">Năm: mới nhất</SelectItem>
                    <SelectItem value="year.asc">Năm: cũ nhất</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
              {movies.map((item) => (
                <CardMovie key={item.slug} movie={item} />
              ))}
            </div>
            <div>
              <AppPagination pagination={pagination} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
