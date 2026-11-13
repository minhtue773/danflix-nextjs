'use client';

import { SearchableSelect } from '@/components/common/SearchableSelect';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Spinner } from '@/components/ui/spinner';
import { Check, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';

// Data mẫu cho các danh mục lọc
const TYPES = [
  { value: 'phim-le', name: 'Phim Lẻ' },
  { value: 'phim-bo', name: 'Phim Bộ' },
  { value: 'phim-chieu-rap', name: 'Phim chiếu rạp' },
  { value: 'hoat-hinh', name: 'Hoạt Hình' },
  { value: 'tv-shows', name: 'TV Shows' },
];

const CATEGORIES = [
  {
    name: 'Tất cả',
    value: '',
  },
  {
    name: 'Bí Ẩn',
    value: 'bi-an',
  },
  {
    name: 'Chiến Tranh',
    value: 'chien-tranh',
  },
  {
    name: 'Chính Kịch',
    value: 'chinh-kich',
  },
  {
    name: 'Cổ Trang',
    value: 'co-trang',
  },
  {
    name: 'Gia Đình',
    value: 'gia-dinh',
  },
  {
    name: 'Hài Hước',
    value: 'hai-huoc',
  },
  {
    name: 'Hành Động',
    value: 'hanh-dong',
  },
  {
    name: 'Hình Sự',
    value: 'hinh-su',
  },
  {
    name: 'Học Đường',
    value: 'hoc-duong',
  },
  {
    name: 'Khoa Học',
    value: 'khoa-hoc',
  },
  {
    name: 'Kinh Dị',
    value: 'kinh-di',
  },
  {
    name: 'Kinh Điển',
    value: 'kinh-dien',
  },
  {
    name: 'Lịch Sử',
    value: 'lich-su',
  },
  {
    name: 'Miền Tây',
    value: 'mien-tay',
  },
  {
    name: 'Phim Ngắn',
    value: 'phim-ngan',
  },
  {
    name: 'Phiêu Lưu',
    value: 'phieu-luu',
  },
  {
    name: 'Thần Thoại',
    value: 'than-thoai',
  },
  {
    name: 'Thể Thao',
    value: 'the-thao',
  },
  {
    name: 'Trẻ Em',
    value: 'tre-em',
  },
  {
    name: 'Tài Liệu',
    value: 'tai-lieu',
  },
  {
    name: 'Tâm Lý',
    value: 'tam-ly',
  },
  {
    name: 'Tình Cảm',
    value: 'tinh-cam',
  },
  {
    name: 'Viễn Tưởng',
    value: 'vien-tuong',
  },
  {
    name: 'Võ Thuật',
    value: 'vo-thuat',
  },
  {
    name: 'Âm Nhạc',
    value: 'am-nhac',
  },
];

const COUNTRIES = [
  { value: '', name: 'Tất cả' },
  {
    name: 'Anh',
    value: 'anh',
  },
  {
    name: 'Ba Lan',
    value: 'ba-lan',
  },
  {
    name: 'Brazil',
    value: 'brazil',
  },
  {
    name: 'Bồ Đào Nha',
    value: 'bo-dao-nha',
  },
  {
    name: 'Canada',
    value: 'canada',
  },
  {
    name: 'Châu Phi',
    value: 'chau-phi',
  },
  {
    name: 'Hà Lan',
    value: 'ha-lan',
  },
  {
    name: 'Hàn Quốc',
    value: 'han-quoc',
  },
  {
    name: 'Hồng Kông',
    value: 'hong-kong',
  },
  {
    name: 'Indonesia',
    value: 'indonesia',
  },
  {
    name: 'Malaysia',
    value: 'malaysia',
  },
  {
    name: 'Mexico',
    value: 'mexico',
  },
  {
    name: 'Na Uy',
    value: 'na-uy',
  },
  {
    name: 'Nam Phi',
    value: 'nam-phi',
  },
  {
    name: 'Nga',
    value: 'nga',
  },
  {
    name: 'Nhật Bản',
    value: 'nhat-ban',
  },
  {
    name: 'Philippines',
    value: 'philippines',
  },
  {
    name: 'Pháp',
    value: 'phap',
  },
  {
    name: 'Quốc Gia Khác',
    value: 'quoc-gia-khac',
  },
  {
    name: 'Thái Lan',
    value: 'thai-lan',
  },
  {
    name: 'Thổ Nhĩ Kỳ',
    value: 'tho-nhi-ky',
  },
  {
    name: 'Thụy Sĩ',
    value: 'thuy-si',
  },
  {
    name: 'Thụy Điển',
    value: 'thuy-dien',
  },
  {
    name: 'Trung Quốc',
    value: 'trung-quoc',
  },
  {
    name: 'Tây Ban Nha',
    value: 'tay-ban-nha',
  },
  {
    name: 'UAE',
    value: 'uae',
  },
  {
    name: 'Ukraina',
    value: 'ukraina',
  },
  {
    name: 'Việt Nam',
    value: 'viet-nam',
  },
  {
    name: 'Âu Mỹ',
    value: 'au-my',
  },
  {
    name: 'Úc',
    value: 'uc',
  },
  {
    name: 'Ý',
    value: 'y',
  },
  {
    name: 'Đan Mạch',
    value: 'dan-mach',
  },
  {
    name: 'Đài Loan',
    value: 'dai-loan',
  },
  {
    name: 'Đức',
    value: 'duc',
  },
  {
    name: 'Ả Rập Xê Út',
    value: 'a-rap-xe-ut',
  },
  {
    name: 'Ấn Độ',
    value: 'an-do',
  },
];
const currentYear = new Date().getFullYear(); // Lấy năm hiện tại tự động (vd: 2026)
const startYear = 1950;

export const YEARS = [
  { value: '', name: 'Tất cả' },
  ...Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
    const year = (currentYear - index).toString();
    return { value: year, name: year };
  }),
];

export function FilterButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const activeFilterCount = [
    searchParams.get('type') && searchParams.get('type') !== 'phim-le',
    searchParams.get('category'),
    searchParams.get('country'),
    searchParams.get('year'),
  ].filter(Boolean).length;
  const hasFilterParams = ['type', 'category', 'country', 'year'].some((key) =>
    searchParams.has(key)
  );

  const handleSelect = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.set('page', '1');

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      // Bọc router.replace trong startTransition
      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [pathname, searchParams, router]
  );

  // Nút xóa sạch lọc
  const handleReset = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [pathname, router]);

  const renderFilterSection = (
    title: string,
    paramKey: string,
    options: { value: string; name: string }[],
    wide = false
  ) => {
    const currentValue = searchParams.get(paramKey) || (paramKey === 'type' ? 'phim-le' : '');
    const selectedOption = options.find((option) => option.value === currentValue);
    if (paramKey === 'year') {
      return (
        <section
          aria-labelledby={`filter-${paramKey}`}
          className="space-y-3 rounded-2xl border border-border/70 bg-background/65 p-4 sm:p-5"
        >
          <div>
            <h3 id={`filter-${paramKey}`} className="text-sm font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">Chọn năm ra mắt phim</p>
          </div>
          <SearchableSelect
            options={options}
            value={currentValue}
            onChange={(val) => handleSelect(paramKey, val)}
            placeholder="Tất cả các năm"
            searchPlaceholder="Gõ năm (vd: 2024)..."
          />
        </section>
      );
    }
    return (
      <section
        aria-labelledby={`filter-${paramKey}`}
        className={`min-w-0 space-y-3 rounded-2xl border border-border/70 bg-background/65 p-4 sm:p-5 ${wide ? 'md:col-span-2' : ''}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 id={`filter-${paramKey}`} className="text-sm font-semibold text-foreground">
              {title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedOption?.name || 'Chưa chọn'}
            </p>
          </div>
          {currentValue && currentValue !== 'phim-le' && (
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="size-3.5" aria-hidden="true" />
            </span>
          )}
        </div>
        <div className="-mx-4 flex [scrollbar-width:none] items-center gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
          {options.map((item) => {
            const isActive = currentValue === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(paramKey, item.value)}
                aria-pressed={isActive}
                className={`min-h-10 shrink-0 cursor-pointer rounded-xl border px-3.5 text-xs font-semibold capitalize transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none ${
                  isActive
                    ? 'border-primary/50 bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'border-border bg-card/70 text-muted-foreground hover:border-primary/40 hover:bg-accent hover:text-foreground'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger
        render={
          <Button
            variant="outline"
            className="h-11 cursor-pointer gap-2 rounded-xl border-border/80 bg-card px-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-accent"
            aria-label={
              activeFilterCount > 0
                ? `Mở bộ lọc, ${activeFilterCount} bộ lọc đang chọn`
                : 'Mở bộ lọc phim'
            }
          >
            <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
            <span>Bộ lọc</span>
            {activeFilterCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
        }
      />
      <DrawerContent className="max-h-[92dvh] border-border bg-background/95 shadow-2xl backdrop-blur-xl md:mx-auto md:max-h-[88dvh] md:max-w-5xl md:rounded-t-3xl">
        <DrawerHeader className="flex flex-row items-center justify-between gap-4 border-b border-border/70 px-5 pt-5 pb-4 text-left sm:px-7">
          <div className="min-w-0">
            <DrawerTitle className="font-heading text-lg font-bold sm:text-xl">
              Khám phá phim
            </DrawerTitle>
            <DrawerDescription className="mt-1">
              Chọn tiêu chí để tìm bộ phim phù hợp với bạn.
            </DrawerDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={!hasFilterParams || isPending}
            className="min-h-10 shrink-0 cursor-pointer gap-2 rounded-lg px-3 text-xs text-muted-foreground hover:text-foreground disabled:cursor-not-allowed"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Đặt lại
          </Button>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-7">
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {renderFilterSection('Loại phim', 'type', TYPES)}
            {renderFilterSection('Năm phát hành', 'year', YEARS)}
            {renderFilterSection('Thể loại', 'category', CATEGORIES, true)}
            {renderFilterSection('Quốc gia', 'country', COUNTRIES, true)}
          </div>
        </div>

        <DrawerFooter className="border-t border-border/70 bg-background/90 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-7">
          <DrawerClose
            render={
              <Button
                disabled={isPending}
                className="h-12 w-full cursor-pointer rounded-xl text-sm font-semibold shadow-lg shadow-primary/15 transition-colors motion-reduce:transition-none"
              >
                Xem kết quả
                {isPending && <Spinner data-icon="inline-start" />}
                {!isPending && <Check className="size-4" aria-hidden="true" />}
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
