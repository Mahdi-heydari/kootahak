export default function LinksSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-token-lg border border-border bg-background p-5 shadow-token-sm"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-token-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-muted" />
              <div className="h-2 w-2/3 rounded bg-muted" />
            </div>
          </div>
          <div className="mt-5 h-11 rounded-token-md bg-muted" />
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="h-3 w-16 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
