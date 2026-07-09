'use client';
// ============================================================
// DayCard Component — Card for the 75-day curriculum grid
// Shows day number, topic title, emoji, completion status, XP
// Props: day, title, emoji, category, status, xpEarned, xpTotal, href, onClick
// ============================================================

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Play, CheckCircle, Loader2 } from 'lucide-react';

// ── Category color map ────────────────────────────────────────
const CATEGORY_COLORS = {
  Foundation:  { bg: 'bg-blue-500/15',   border: 'border-blue-500/30',   text: 'text-blue-400',   glow: 'shadow-blue-500/20'   },
  Modals:      { bg: 'bg-purple-500/15', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  Tenses:      { bg: 'bg-green-500/15',  border: 'border-green-500/30',  text: 'text-green-400',  glow: 'shadow-green-500/20'  },
  Vocabulary:  { bg: 'bg-orange-500/15', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
  Writing:     { bg: 'bg-pink-500/15',   border: 'border-pink-500/30',   text: 'text-pink-400',   glow: 'shadow-pink-500/20'   },
  default:     { bg: 'bg-white/5',       border: 'border-white/10',      text: 'text-slate-400',  glow: 'shadow-black/20'      },
};

// ── Status config ─────────────────────────────────────────────
const STATUS_CONFIG = {
  locked: {
    cardBg:     'bg-surface-900/40',
    cardBorder: 'border-white/5',
    glow:       '',
    cursor:     'cursor-not-allowed',
    opacity:    'opacity-50',
  },
  available: {
    cardBg:     'bg-surface-800/60',
    cardBorder: 'border-white/10',
    glow:       '',
    cursor:     'cursor-pointer',
    opacity:    '',
  },
  'in-progress': {
    cardBg:     'bg-primary-500/10',
    cardBorder: 'border-primary-500/40',
    glow:       'shadow-lg shadow-primary-500/20',
    cursor:     'cursor-pointer',
    opacity:    '',
  },
  completed: {
    cardBg:     'bg-emerald-500/8',
    cardBorder: 'border-emerald-500/30',
    glow:       '',
    cursor:     'cursor-pointer',
    opacity:    '',
  },
};

/**
 * Circular progress ring for in-progress state
 */
function ProgressRing({ pct = 0, size = 36, strokeWidth = 3 }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Track */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
      />
      {/* Fill */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke="#6366f1"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
    </svg>
  );
}

/**
 * Status Icon overlay shown on the card
 */
function StatusIcon({ status, xpPct }) {
  if (status === 'locked') {
    return (
      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <Lock size={13} className="text-slate-600" />
      </div>
    );
  }
  if (status === 'completed') {
    return (
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
        <CheckCircle size={15} className="text-emerald-400" />
      </div>
    );
  }
  if (status === 'in-progress') {
    return (
      <div className="relative w-9 h-9 flex items-center justify-center">
        <ProgressRing pct={xpPct} size={36} strokeWidth={3} />
        <Loader2 size={13} className="absolute text-primary-400 animate-spin" />
      </div>
    );
  }
  // available
  return (
    <div className="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
      <Play size={13} className="text-primary-400 ml-0.5" fill="currentColor" />
    </div>
  );
}

/**
 * DayCard
 * @param {number}  day        - Day number (1–75)
 * @param {string}  title      - Topic title
 * @param {string}  emoji      - Topic emoji
 * @param {string}  category   - Foundation | Modals | Tenses | Vocabulary | Writing
 * @param {string}  status     - 'locked' | 'available' | 'in-progress' | 'completed'
 * @param {number}  xpEarned   - XP earned so far on this day
 * @param {number}  xpTotal    - Total XP available for this day
 * @param {string}  href       - Navigation href (ignored when locked)
 * @param {Function} onClick   - Optional click override
 */
export default function DayCard({
  day       = 1,
  title     = 'Topic',
  emoji     = '📚',
  category  = 'Foundation',
  status    = 'locked',
  xpEarned  = 0,
  xpTotal   = 100,
  href      = '#',
  onClick,
}) {
  const isLocked   = status === 'locked';
  const isComplete = status === 'completed';
  const colors     = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  const statusCfg  = STATUS_CONFIG[status] || STATUS_CONFIG.available;
  const xpPct      = xpTotal > 0 ? Math.min(100, Math.round((xpEarned / xpTotal) * 100)) : 0;

  // Wrapper: Link when navigable, div when locked
  const Wrapper = isLocked ? 'div' : Link;
  const wrapperProps = isLocked
    ? {}
    : { href, onClick };

  return (
    <motion.div
      whileHover={isLocked ? {} : { scale: 1.04, y: -3 }}
      whileTap={isLocked ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group relative ${statusCfg.opacity}`}
    >
      <Wrapper
        {...wrapperProps}
        className={`
          block relative rounded-2xl border p-3 md:p-4
          backdrop-blur-sm overflow-hidden
          transition-all duration-200
          ${statusCfg.cardBg} ${statusCfg.cardBorder} ${statusCfg.glow} ${statusCfg.cursor}
          ${!isLocked ? 'hover:border-opacity-60' : ''}
        `}
      >
        {/* ── Glow overlay on hover ──────────────────────────── */}
        {!isLocked && (
          <div
            className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-br ${
                isComplete
                  ? 'from-emerald-500/8 to-transparent'
                  : status === 'in-progress'
                  ? 'from-primary-500/10 to-transparent'
                  : 'from-white/4 to-transparent'
              }
            `}
          />
        )}

        {/* ── Completed shimmer strip ───────────────────────── */}
        {isComplete && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
        )}

        {/* ── Current day pulse ring ────────────────────────── */}
        {status === 'in-progress' && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-400/60 to-transparent" />
        )}

        {/* ── Top row: day number + status icon ─────────────── */}
        <div className="flex items-start justify-between mb-2.5 relative z-10">
          <div className={`text-xs font-bold px-2 py-0.5 rounded-md ${colors.bg} ${colors.text} border ${colors.border}`}>
            Day {day}
          </div>
          <StatusIcon status={status} xpPct={xpPct} />
        </div>

        {/* ── Emoji ────────────────────────────────────────── */}
        <div className="text-2xl md:text-3xl mb-2 leading-none relative z-10 select-none">
          {isLocked ? '🔒' : emoji}
        </div>

        {/* ── Title ────────────────────────────────────────── */}
        <p className={`text-xs md:text-sm font-semibold leading-tight mb-2 relative z-10 truncate-2 ${
          isLocked ? 'text-slate-600' : isComplete ? 'text-emerald-300' : status === 'in-progress' ? 'text-primary-300' : 'text-slate-300'
        }`}>
          {title}
        </p>

        {/* ── Category badge ───────────────────────────────── */}
        {!isLocked && (
          <div className={`inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded-md ${colors.bg} ${colors.text} relative z-10 mb-2`}>
            {category}
          </div>
        )}

        {/* ── XP Progress bar (in-progress) ────────────────── */}
        {status === 'in-progress' && xpTotal > 0 && (
          <div className="relative z-10 mt-1">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
              <span>{xpEarned} XP</span>
              <span>{xpTotal} XP</span>
            </div>
            <div className="h-1 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                animate={{ width: `${xpPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </div>
        )}

        {/* ── XP earned badge (completed) ──────────────────── */}
        {isComplete && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-400 relative z-10 mt-1">
            <span>⚡</span>
            <span>+{xpEarned} XP</span>
          </div>
        )}

        {/* ── XP available (available) ─────────────────────── */}
        {status === 'available' && (
          <div className="flex items-center gap-1 text-[10px] text-slate-500 relative z-10 mt-1">
            <span>⚡</span>
            <span>{xpTotal} XP available</span>
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
}
