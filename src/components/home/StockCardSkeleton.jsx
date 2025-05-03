import { Skeleton } from "@/components/ui/skeleton";

export function StockCardSkeleton() {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center gap-3">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-32 h-3" />
      <Skeleton className="w-32 h-3" />
      <Skeleton className="w-20 h-5" />
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
  );
}
