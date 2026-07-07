// Global loading screen — shown during page transitions

export default function Loading() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo/spinner */}
        <div className="relative w-16 h-16">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 border-r-secondary-500 animate-spin" />
          {/* Inner pulsing dot */}
          <div className="absolute inset-3 rounded-full bg-gradient-primary animate-pulse-slow" />
        </div>

        {/* Loading text */}
        <div className="text-slate-400 text-sm font-medium animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}
