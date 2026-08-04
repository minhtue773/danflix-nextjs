import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonMovieTabs() {
  return (
    <div className="w-full space-y-4">
      {/* 1. Skeleton cho TabsList */}
      <div className="flex h-10 w-full items-center rounded-lg bg-muted p-1">
        <Skeleton className="h-full flex-1 rounded-md" />
        <Skeleton className="h-full flex-1 rounded-md bg-transparent" />
      </div>

      {/* 2. Skeleton cho TabsContent (Diễn viên) */}
      <div className="space-y-4 py-4">
        {/* Title Skeleton */}
        <Skeleton className="h-7 w-28" />

        {/* Grid Diễn Viên Skeleton */}
        <div className="grid max-h-[55vh] grid-cols-4 gap-4 overflow-hidden rounded-xl md:grid-cols-8">
          {/* Render giả lập 8 - 12 Avatar diễn viên */}
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              {/* Avatar Tròn */}
              <Skeleton className="h-12 w-12 rounded-full md:h-14 md:w-14" />
              {/* Tên Diễn Viên */}
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
