export function CardSkeleton() {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-4">
      <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
    </div>
  );
}

export function ButtonSkeleton() {
  return <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>;
}

export function InputSkeleton() {
  return <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>;
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <InputSkeleton />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <InputSkeleton />
      </div>
      <ButtonSkeleton />
    </div>
  );
}
