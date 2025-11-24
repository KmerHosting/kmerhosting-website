export function PageSkeletons() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex-1">
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-72 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>

        {/* Content skeleton */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
          <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
          <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
