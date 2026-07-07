'use client';
// Badge Component - Small label/tag for status, difficulty, etc.

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for merging class names
function cn(...inputs) { return twMerge(clsx(inputs)); }

// ============================================================
// Badge Component
// ============================================================
export default function Badge({ variant = 'default', size = 'md', className, children, ...props }) {
  // Variant styles
  const variants = {
    default:     'bg-white/8 text-slate-300 border border-white/10',
    primary:     'bg-primary-500/20 text-primary-300 border border-primary-500/30',
    secondary:   'bg-secondary-500/20 text-secondary-300 border border-secondary-500/30',
    success:     'bg-accent-500/20 text-accent-300 border border-accent-500/30',
    warning:     'bg-warning-500/20 text-warning-300 border border-warning-500/30',
    danger:      'bg-danger-500/20 text-danger-300 border border-danger-500/30',
    xp:          'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    coin:        'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    streak:      'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    // Difficulty variants
    beginner:     'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    elementary:   'bg-sky-500/20 text-sky-300 border border-sky-500/30',
    intermediate: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    advanced:     'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    // CEFR variants
    A0: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
    A1: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    A2: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
    B1: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    B2: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    C1: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    C2: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  };

  // Size styles
  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-md',
    md: 'px-2.5 py-0.5 text-xs rounded-lg',
    lg: 'px-3 py-1 text-sm rounded-lg',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold',
        variants[variant] || variants.default,
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
