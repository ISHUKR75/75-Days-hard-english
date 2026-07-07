'use client';
// Button Component - Reusable, animated button with multiple variants

import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============================================================
// Class Variance Authority (CVA) Variants
// ============================================================
const buttonVariants = cva(
  // Base styles applied to all buttons
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-95',
  {
    variants: {
      // Visual style variants
      variant: {
        primary:   'bg-gradient-primary text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5',
        secondary: 'bg-white/8 text-slate-200 border border-white/10 hover:bg-white/12 hover:border-white/20',
        ghost:     'text-slate-300 hover:bg-white/8 hover:text-white',
        danger:    'bg-danger-600 text-white hover:bg-danger-500 shadow-glow-danger/30',
        success:   'bg-accent-600 text-white hover:bg-accent-500 shadow-glow-accent/30',
        warning:   'bg-warning-500 text-surface-900 hover:bg-warning-400 font-bold',
        outline:   'border border-primary-500/50 text-primary-300 hover:bg-primary-500/10 hover:border-primary-500',
        gradient:  'btn-gradient text-white',
        link:      'text-primary-400 underline-offset-4 hover:underline p-0 h-auto',
      },
      // Size variants
      size: {
        xs:   'px-2.5 py-1.5 text-xs rounded-lg',
        sm:   'px-3.5 py-2 text-sm',
        md:   'px-5 py-2.5 text-sm',
        lg:   'px-6 py-3 text-base',
        xl:   'px-8 py-4 text-lg',
        icon: 'w-9 h-9 p-0 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
);

// ============================================================
// Helper for merging class names
// ============================================================
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ============================================================
// Button Component
// ============================================================
export default function Button({
  variant,       // Visual style
  size,          // Button size
  className,     // Extra class names
  children,      // Button content
  loading,       // Show loading spinner
  leftIcon,      // Icon before text
  rightIcon,     // Icon after text
  ...props       // All other HTML button props
}) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}

      {/* Left icon */}
      {!loading && leftIcon && (
        <span className="shrink-0">{leftIcon}</span>
      )}

      {/* Button text/content */}
      {children}

      {/* Right icon */}
      {!loading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}

// Named export for variant utility (used by other components)
export { buttonVariants };
