'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryUrl = searchParams.get('q') || '';
  const [value, setValue] = useState(queryUrl);
  const debouncedValue = useDebounce(value, 400);

  // Ref để lưu trữ queryUrl hiện tại, tránh trigger useEffect khi chỉ đổi URL
  const currentQueryRef = useRef(queryUrl);

  // 1. Khi URL thay đổi từ bên ngoài (ví dụ ButtonSearch)
  useEffect(() => {
    if (queryUrl !== currentQueryRef.current) {
      currentQueryRef.current = queryUrl;
      setValue(queryUrl); // Cập nhật input theo URL mới
    }
  }, [queryUrl]);

  // 2. Chỉ đẩy URL khi giá trị người dùng gõ thực sự khác với URL hiện tại
  useEffect(() => {
    const trimmed = debouncedValue.trim();

    // Nếu giá trị gõ trùng với URL hiện tại -> BỎ QUA (Chặn vòng lặp ở đây)
    if (trimmed === currentQueryRef.current) return;

    if (trimmed) {
      currentQueryRef.current = trimmed;
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else if (currentQueryRef.current !== '') {
      currentQueryRef.current = '';
      router.push('/search');
    }
  }, [debouncedValue, router]);

  return (
    <div className="relative">
      <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập tên phim"
        className="border bg-accent! py-4! pl-11 text-base text-white placeholder:text-muted-foreground"
      />
    </div>
  );
}
