'use client';

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
import { Funnel } from 'lucide-react';
import { useState } from 'react';

export function FilterButton() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
    console.log('Value đã chọn:', value);
    // Tại đây bạn có thể gọi API hoặc filter danh sách phim
  };
  const CATEGORIES = [
    { value: '', name: 'Tất cả' },
    { value: 'kinh-di', name: 'Phim Kinh Dị' },
    { value: 'hanh-dong', name: 'Phim Hành Động' },
    { value: 'tinh-cam', name: 'Phim Tình Cảm' },
    { value: 'hoat-hinh', name: 'Phim Hoạt Hình' },
  ];

  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger
        render={
          <Button variant={'default'} className={'rounded-md px-4'}>
            <Funnel />
            Bộ lọc
          </Button>
        }
      />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className={'font-sans'}>Lọc Phim</DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="overflow-y-scroll rounded-2xl bg-accent p-4 group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full">
            <div className="space-y-4">
              <h2 className="font-bold">Thể loại</h2>
              <div className="flex flex-wrap items-center gap-4">
                {CATEGORIES.map((item) => {
                  // 3. Kiểm tra xem category này có đang active không
                  const isActive = selectedCategory === item.value;
                  return (
                    <div
                      key={item.value}
                      onClick={() => handleSelect(item.value)}
                      className={`cursor-pointer rounded-md border p-2 text-xs font-semibold capitalize transition-colors ${
                        isActive
                          ? 'border-red-600 bg-red-600/20 font-medium'
                          : 'border-border text-muted-foreground hover:bg-card'
                      }`}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button>Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
