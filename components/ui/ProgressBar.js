'use client';
// Progress Bar Component - Animated fill bar for showing completion %

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

// ============================================================
// ProgressBar Component
// ============================================================
export default function ProgressBar({
  value = 0,          // 0–100
  max = 100,
  variant = 'primary', // primary | success | warning | danger | xp
  size = 'md',         // sm | md | lg
  animated = true,     // Animate fill on mount
  showLabel = false,   // Show % inside bar
  label,               // Custom label text
  className,
  barClassName,
}) {
  // Animate from 0 on mount
  const [current, setCurrent] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      // Delay slightly so animation is visible
      const timer = setTimeout(() => {
        setCurrent(Math.min(100, Math.max(0, (value / max) * 100)));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrent(Math.min(100, Math.max(0, (value / max) * 100)));
    }
  }, [value, max]);

  // Variant fill gradients
  const variantStyles = {
    primary: 'from-primary-500 to-secondary-500',
    success: 'from-accent-500 to-accent-400',
    warning: 'from-warning-500 to-warning-400',
    danger:  'from-danger-500 to-danger-400',
    xp:      'from-violet-600 to-primary-500',
    streak:  'from-orange-500 to-red-500',
    coin:    'from-yellow-500 to-amber-400',
  };

  // Track height by size
  const sizeStyles = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
    xl: 'h-6',
  };

  const gradient = variantStyles[variant] || variantStyles.primary;
  const height   = sizeStyles[size] || sizeStyles.md;

  return (
    <div className={cn('w-full', className)}>
      {/* Optional label row */}
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-slate-400">{label}</span>
          {showLabel && (
            <span className="text-xs font-semibold text-slate-300">{Math.round(current)}%</span>
          )}
        </div>
      )}

      {/* Track */}
      <div className={cn(
        'w-full rounded-full overflow-hidden',
        height,
        'bg-white/8'
      )}>
        {/* Animated fill */}
        <div
          className={cn(
            'h-full rounded-full bg-gradient-to-r',
            gradient,
            barClassName
          )}
          style={{
            width: `${current}%`,
            transition: animated ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            boxShadow: current > 0 ? `0 0 8px rgba(99,102,241,0.5)` : 'none',
          }}
        />
      </div>
    </div>
  );
}
