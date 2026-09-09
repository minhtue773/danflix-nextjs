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

export default function ButtonSearch() {
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const router = useRouter();
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data: movies = [], isFetching } = useQuery({
    queryKey: ['search-movies', debouncedKeyword],
    queryFn: async () => {
      const res = await movieService.searchMovie(debouncedKeyword, '1', '10');
      return res?.data?.items || [];
    },
    enabled: !!debouncedKeyword.trim(),
    staleTime: 1000 * 60 * 10,
  });

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/movies/${slug}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        type="button"
        className={'touch-manipulation'}
        onClick={() => setOpen(true)}
        size="icon-sm"
        variant={'ghost'}
      >
        <Search className="text-card-foreground" />
      </Button>

      <CommandDialog
        className="mx-auto w-full p-4 md:max-w-3xl!"
        open={open}
        onOpenChange={setOpen}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Tìm kiếm phim..."
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

            <CommandEmpty>No results found.</CommandEmpty>

            {!isFetching && movies.length > 0 && (
              <>
                <CommandGroup heading="Phim gợi ý">
                  {movies.map((movie: MoviePhimapi) => (
                    <CommandItem
                      key={movie._id}
                      value={movie.name}
                      onSelect={() => {
                        handleSelect(movie.slug);
                      }}
                      className="flex cursor-pointer items-center gap-3 p-2"
                    >
                      <Image
                        src={movie.poster_url}
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
                  onSelect={() => {
                    const target = debouncedKeyword.trim();
                    setOpen(false);
                    setKeyword(''); // Clear input trong Modal
                    if (target) {
                      router.push(`/search?q=${encodeURIComponent(target)}`);
                    }
                  }}
                  className="flex w-full cursor-pointer justify-center py-2 text-center text-red-500"
                >
                  Xem tất cả kết quả cho "{debouncedKeyword}"
                </CommandItem>
                </CommandGroup>
              
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
