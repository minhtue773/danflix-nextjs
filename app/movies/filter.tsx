'use client';

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
import { Funnel, RotateCcw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Data mẫu cho các danh mục lọc
const TYPES = [
  { value: 'phim-le', name: 'Phim Lẻ' },
  { value: 'phim-bo', name: 'Phim Bộ' },
  { value: 'phim-chieu-rap', name: 'Phim chiếu rạp' },
  { value: 'hoat-hinh', name: 'Hoạt Hình' },
  { value: 'tv-shows', name: 'TV Shows' },
];

const CATEGORIES = [
  { value: '', name: 'Tất cả' },
  { value: 'kinh-di', name: 'Phim Kinh Dị' },
  { value: 'hanh-dong', name: 'Phim Hành Động' },
  { value: 'tinh-cam', name: 'Phim Tình Cảm' },
  { value: 'hoat-hinh', name: 'Phim Hoạt Hình' },
];

const COUNTRIES = [
  { value: '', name: 'Tất cả' },
  { value: 'trung-quoc', name: 'Trung Quốc' },
  { value: 'han-quoc', name: 'Hàn Quốc' },
  { value: 'au-my', name: 'Âu Mỹ' },
  { value: 'nhat-ban', name: 'Nhật Bản' },
];

const YEARS = [
  { value: '', name: 'Tất cả' },
  { value: '2026', name: '2026' },
  { value: '2025', name: '2025' },
  { value: '2024', name: '2024' },
  { value: '2023', name: '2023' },
];

export function FilterButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Đổi / thêm param trên URL
  const handleSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key); // Chọn "Tất cả" thì xóa param khỏi URL
    }

    // Luôn reset về page 1 khi bộ lọc thay đổi
    params.set('page', '1');

    // Cập nhật URL -> Trigger Server Component cha render lại
    router.push(`${pathname}?${params.toString()}`);
  };

  // Nút xóa sạch lọc
  const handleReset = () => {
    router.push(pathname);
  };

  const renderFilterSection = (
    title: string,
    paramKey: string,
    options: { value: string; name: string }[]
  ) => {
    const currentValue = searchParams.get(paramKey) || (paramKey === 'type' ? 'phim-le' : '');

    return (
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <div className="flex flex-wrap items-center gap-2">
          {options.map((item) => {
            const isActive = currentValue === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleSelect(paramKey, item.value)}
                className={`cursor-pointer rounded-md border px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
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
          <DrawerClose render={<Button className="w-full">Áp dụng / Đóng</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
