// A grey pulsing box shown while data is loading.
// Set the size with className, for example: <Skeleton className="h-6 w-40" />
export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />;
}