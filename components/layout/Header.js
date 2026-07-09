'use client';
// ============================================================
// Header Component — Page-level header for content pages
// Used at top of: topics, lessons, practice, tests, vocabulary pages
// Props: title, subtitle, emoji, breadcrumbs, actions, showProgress, progress, stats
// ============================================================

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home, TrendingUp, Clock, Target, CheckCircle } from 'lucide-react';

// ── Animation Variants ────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (pct) => ({
    width: `${pct}%`,
    transition: { duration: 1.2, ease: 'easeOut', delay: 0.4 },
  }),
};

// ── Stat icon map ─────────────────────────────────────────────
const STAT_ICONS = {
  questions: Target,
  accuracy:  TrendingUp,
  time:      Clock,
  completed: CheckCircle,
};

/**
 * Header
 * @param {string}   title         - Main page title
 * @param {string}   subtitle      - Secondary description line
 * @param {string}   emoji         - Leading emoji
 * @param {Array}    breadcrumbs   - [{label, href}] — rendered as clickable crumbs
 * @param {Array}    actions       - [{label, href, onClick, variant, icon}]
 * @param {boolean}  showProgress  - Show animated progress bar below title
 * @param {number}   progress      - 0–100 progress value
 * @param {Array}    stats         - [{key, label, value, suffix, color}]
 */
export default function Header({
  title       = 'Page Title',
  subtitle    = '',
  emoji       = '',
  breadcrumbs = [],
  actions     = [],
  showProgress = false,
  progress     = 0,
  stats        = [],
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-6 md:mb-8"
    >
      {/* ── Breadcrumbs ───────────────────────────────────────── */}
      {breadcrumbs.length > 0 && (
        <motion.nav
          variants={itemVariants}
          className="flex items-center gap-1.5 mb-3 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Home size={12} />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={11} className="text-slate-600" />
              {crumb.href && i < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-xs text-slate-400 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </motion.nav>
      )}

      {/* ── Main Header Row ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* Left: title + subtitle */}
        <motion.div variants={itemVariants} className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            {emoji && (
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
                className="text-3xl md:text-4xl leading-none shrink-0 select-none"
                aria-hidden="true"
              >
                {emoji}
              </motion.span>
            )}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
              <span className="gradient-text">{title}</span>
            </h1>
          </div>

          {subtitle && (
            <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed mt-1">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Right: action buttons */}
        {actions.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2.5 flex-wrap shrink-0"
          >
            {actions.map((action, i) => {
              const ActionIcon = action.icon || null;
              const isGradient = action.variant === 'gradient' || (!action.variant && i === 0);
              const isSecondary = action.variant === 'secondary';
              const isDanger = action.variant === 'danger';

              const baseClass = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap';
              const variantClass = isGradient
                ? 'btn-gradient text-white shadow-lg'
                : isSecondary
                ? 'btn-secondary'
                : isDanger
                ? 'bg-danger-500/15 text-danger-300 border border-danger-500/25 hover:bg-danger-500/25'
                : 'bg-white/8 border border-white/10 text-slate-300 hover:text-white hover:bg-white/12';

              const Wrapper = action.href ? Link : 'button';
              const wrapperProps = action.href
                ? { href: action.href }
                : { onClick: action.onClick, type: 'button' };

              return (
                <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Wrapper {...wrapperProps} className={`${baseClass} ${variantClass}`}>
                    {ActionIcon && <ActionIcon size={15} />}
                    {action.label}
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* ── Progress Bar ─────────────────────────────────────── */}
      {showProgress && (
        <motion.div variants={itemVariants} className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">Progress</span>
            <span className="text-xs font-bold text-primary-400">{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar h-2.5">
            <motion.div
              className="progress-fill"
              variants={progressVariants}
              custom={Math.min(100, Math.max(0, progress))}
            />
          </div>
        </motion.div>
      )}

      {/* ── Stats Row ────────────────────────────────────────── */}
      {stats.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-3 mt-5"
        >
          {stats.map((stat, i) => {
            const Icon = STAT_ICONS[stat.key] || Target;
            const colorClass = stat.color || 'text-slate-400';
            const bgClass = stat.bgColor || 'bg-white/5';
            const borderClass = stat.borderColor || 'border-white/8';

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04, y: -1 }}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border ${bgClass} ${borderClass} cursor-default`}
              >
                <Icon size={14} className={colorClass} />
                <div>
                  <span className={`text-sm font-bold text-white`}>
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-xs font-normal text-slate-400 ml-0.5">{stat.suffix}</span>
                    )}
                  </span>
                  <span className="text-xs text-slate-500 ml-1.5">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* ── Decorative divider ───────────────────────────────── */}
      <motion.div
        variants={itemVariants}
        className="mt-5 h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(99,102,241,0.4) 0%, rgba(217,70,239,0.25) 50%, transparent 100%)',
        }}
      />
    </motion.div>
  );
}
