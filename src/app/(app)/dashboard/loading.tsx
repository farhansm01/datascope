// Instant loading skeleton shown while the dashboard server component fetches data.
import Skeleton from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Banner skeleton */}
      <Skeleton className="h-44 w-full rounded-2xl" />

      {/* Metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>

      {/* Quick launch cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
