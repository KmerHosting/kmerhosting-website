export function NavbarSkeleton() {
  return (
    <div className="hidden md:flex items-center gap-6">
      {/* Skeleton links */}
      <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
      <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
      <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>

      {/* Skeleton button */}
      <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
    </div>
  );
}
