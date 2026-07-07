'use client';
// Stat Card - Displays a single metric with icon, value, and label
// Used on dashboard and profile pages

import { clsx }    from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

// ============================================================
// StatCard Component
// ============================================================
export default function StatCard({
  icon,           // React node (emoji or icon component)
  label,          // Label text (e.g., "Day Streak")
  value,          // Main value (e.g., 7)
  suffix,         // Optional suffix (e.g., " days", " XP")
  change,         // Optional +/- change indicator
  changeType,     // 'up' | 'down' | 'neutral'
  gradient,       // Custom gradient class for the icon bg
  glowColor,      // CSS color for glow effect
  className,
  onClick,
}) {
  return (
    <div
      className={cn(
        'card p-5 flex flex-col gap-3 cursor-pointer group',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Icon + Change row */}
      <div className="flex items-center justify-between">
        {/* Icon bubble */}
        <div
          className={cn(
            'w-11 h-11 rounded-2xl flex items-center justify-center text-xl',
            gradient || 'bg-primary-500/15',
          )}
          style={glowColor ? { boxShadow: `0 0 16px ${glowColor}40` } : undefined}
        >
          {icon}
        </div>

        {/* Change indicator */}
        {change !== undefined && (
          <span className={cn(
            'text-xs font-semibold px-2 py-1 rounded-lg',
            changeType === 'up'      && 'text-accent-400 bg-accent-500/10',
            changeType === 'down'    && 'text-danger-400 bg-danger-500/10',
            changeType === 'neutral' && 'text-slate-400 bg-white/5',
          )}>
            {changeType === 'up'   && '↑ '}
            {changeType === 'down' && '↓ '}
            {change}
          </span>
        )}
      </div>

      {/* Value + Label */}
      <div>
        <p className="text-2xl font-black text-white group-hover:gradient-text transition-all">
          {value}
          {suffix && (
            <span className="text-base font-medium text-slate-400 ml-1">{suffix}</span>
          )}
        </p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
