export default function PageSkeleton() {
  return (
    <div className="animate-pulse grid gap-4">
      <div className="h-8 w-1/3 bg-black/5 dark:bg-white/10 rounded" />
      <div className="h-4 w-2/3 bg-black/5 dark:bg-white/10 rounded" />
      <div className="h-40 bg-black/5 dark:bg-white/10 rounded" />
    </div>
  );
}
