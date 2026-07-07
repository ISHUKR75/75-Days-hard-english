// Dashboard loading skeleton — shown while dashboard page data loads

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 bg-white/8 rounded-xl mb-2" />
          <div className="h-4 w-36 bg-white/5 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-white/8 rounded-xl" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/3 p-5">
            <div className="flex justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/8" />
              <div className="w-12 h-4 rounded-lg bg-white/5" />
            </div>
            <div className="h-8 w-20 bg-white/8 rounded-lg mb-1" />
            <div className="h-3 w-24 bg-white/5 rounded" />
          </div>
        ))}
      </div>

      {/* Middle row skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1,2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/3 p-5 h-44" />
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[1,2].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/3 p-5 h-64" />
        ))}
      </div>

      {/* Topics skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1,2,3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/3 p-5 h-28" />
        ))}
      </div>
    </div>
  );
}
