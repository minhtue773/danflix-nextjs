import { Skeleton } from '@/components/ui/skeleton';

export function MovieListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-70 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
