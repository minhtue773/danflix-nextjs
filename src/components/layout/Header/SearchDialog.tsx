'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Loader2, Search } from 'lucide-react';
import Image from 'next/image';
import { movieService } from '@/services/movieService';
import { MoviePhimapi } from '@/types/movie';
import { getMovieImageUrl } from '@/lib/utils';

interface SearchDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export default function SearchDialog({
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
}: SearchDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen ?? internalOpen;
  const [keyword, setKeyword] = React.useState('');
  const router = useRouter();
  const normalizedKeyword = useDebounce(keyword.trim(), 300);
  const setOpen = (nextOpen: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const {
    data: movies = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['search-movies', normalizedKeyword],
    queryFn: async (): Promise<MoviePhimapi[]> => {
      const res = await movieService.searchMovie(normalizedKeyword, '1', '10');
      return Array.isArray(res?.data?.items) ? res.data.items : [];
    },
    enabled: open && Boolean(normalizedKeyword),
    staleTime: 1000 * 60 * 10,
  });

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/movies/${slug}`);
  };

  const handleViewAll = () => {
    setOpen(false);
    setKeyword('');
    router.push(`/search?q=${encodeURIComponent(normalizedKeyword)}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {!hideTrigger && (
        <Button
          type="button"
          className="touch-manipulation"
          onClick={() => setOpen(true)}
          aria-label="Tìm kiếm phim"
          size="icon-sm"
          variant="ghost"
        >
          <Search className="text-card-foreground" />
        </Button>
      )}

      <CommandDialog
        className="mx-auto w-full p-4 md:max-w-3xl!"
        open={open}
        onOpenChange={setOpen}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Tìm kiếm phim..."
            aria-label="Tìm kiếm phim"
            value={keyword}
            onValueChange={setKeyword}
            className="text-base"
          />
          <CommandList>
            {isFetching && (
              <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}

            {isError ? (
              <p role="alert" className="p-4 text-center text-sm text-destructive">
                Không thể tải gợi ý tìm kiếm. Vui lòng thử lại.
              </p>
            ) : (
              <CommandEmpty>
                {normalizedKeyword ? 'Không tìm thấy phim phù hợp.' : 'Nhập tên phim để tìm kiếm.'}
              </CommandEmpty>
            )}

            {!isFetching && movies.length > 0 && (
              <CommandGroup heading="Phim gợi ý">
                {movies.map((movie) => (
                  <CommandItem
                    key={movie._id}
                    value={movie.name}
                    onSelect={() => handleSelect(movie.slug)}
                    className="flex cursor-pointer items-center gap-3 p-2"
                  >
                    <Image
                      src={getMovieImageUrl(movie.poster_url)}
                      alt={movie.name}
                      width={48}
                      height={72}
                      className="aspect-2/3 h-auto w-12 rounded object-cover"
                    />
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="truncate text-sm font-semibold">{movie.name}</span>
                      <span className="truncate text-xs">{movie.origin_name}</span>
                      <span className="text-xs text-muted-foreground">
                        {movie.year} • {movie.quality}
                      </span>
                    </div>
                  </CommandItem>
                ))}
                <CommandItem
                  onSelect={handleViewAll}
                  className="flex w-full cursor-pointer justify-center py-2 text-center text-red-500"
                >
                  Xem tất cả kết quả cho &quot;{normalizedKeyword}&quot;
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
