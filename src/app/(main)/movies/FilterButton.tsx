'use client';

import { SearchableSelect } from '@/components/common/SearchableSelect';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Spinner } from '@/components/ui/spinner';
import { Funnel, RotateCcw } from 'lucide-react';
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
  // Đổi / thêm param trên URL

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
    options: { value: string; name: string }[]
  ) => {
    const currentValue = searchParams.get(paramKey) || (paramKey === 'type' ? 'phim-le' : '');
    if (paramKey === 'year') {
      return (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <SearchableSelect
            options={options}
            value={currentValue}
            onChange={(val) => handleSelect(paramKey, val)}
            placeholder="Tất cả các năm"
            searchPlaceholder="Gõ năm (vd: 2024)..."
          />
        </div>
      );
    }
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <div className="-mx-4 flex scrollbar-none items-center gap-2 overflow-x-auto px-4 pb-1 [ms-overflow-style:none] md:flex-wrap md:overflow-auto [&::-webkit-scrollbar]:hidden">
          {options.map((item) => {
            const isActive = currentValue === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(paramKey, item.value)}
                className={`shrink-0 cursor-pointer rounded-md border px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  isActive
                    ? 'border-red-600 bg-red-600/20 text-white shadow-sm'
                    : 'border-border text-muted-foreground hover:bg-card hover:text-foreground'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger
        render={
          <Button variant={'default'} className={'rounded-md px-4'}>
            <Funnel className="mr-2 h-4 w-4" />
            Bộ lọc
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className={'font-sans'}>Lọc Phim</DrawerTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs text-muted-foreground"
          >
            <RotateCcw className="mr-1 h-3 w-3" /> Đặt lại
          </Button>
        </DrawerHeader>

        <div className="max-h-[70vh] flex-1 overflow-y-auto p-4">
          <div className="space-y-6 rounded-2xl bg-accent p-4">
            {renderFilterSection('Loại phim', 'type', TYPES)}
            {renderFilterSection('Thể loại', 'category', CATEGORIES)}
            {renderFilterSection('Quốc gia', 'country', COUNTRIES)}
            {renderFilterSection('Năm phát hành', 'year', YEARS)}
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose
            render={
              <Button disabled={isPending} className="w-full">
                Áp dụng / Đóng
                {isPending && <Spinner data-icon="inline-start" />}
              </Button>
            }
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
