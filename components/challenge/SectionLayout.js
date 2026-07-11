'use client';

/**
 * SectionLayout — Shared wrapper for all 20 section pages
 * =========================================================
 * Provides the full chrome: sticky header, desktop sidebar,
 * mobile bottom bar, completion logic, confetti, and XP awards.
 *
 * UPGRADED: More Gen Z, more immersive, better animations,
 * friendlier tone, and section-specific color theming.
 *
 * Props:
 *   children     – The actual section component content
 *   dayNum       – Current day number (1-75)
 *   sectionId    – Current section slug e.g. 'vocabulary'
 *   sectionMeta  – Metadata object from SECTIONS array
 *   dayData      – Full day data from API
 *   sections     – Full SECTIONS array (passed from page)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useProgressStore from '@/store/progressStore';
import { useGamificationStore } from '@/store/useGamificationStore';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Lock,
  BookOpen,
  Menu,
  X,
  Flame,
  Trophy,
  Sparkles,
  Clock,
  Target,
  Play,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

// ============================================================
// HELPERS
// ============================================================

/** Fire a celebratory confetti burst 🎊 */
function fireConfetti() {
  // Main burst
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#8b5cf6', '#a855f7', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
    scalar: 1.2,
  });
  // Left side burst
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.65 },
      colors: ['#8b5cf6', '#ec4899', '#06b6d4'],
    });
  }, 150);
  // Right side burst
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.65 },
      colors: ['#f59e0b', '#10b981', '#a855f7'],
    });
  }, 300);
  // Stars burst
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 360,
      origin: { x: 0.5, y: 0.4 },
      shapes: ['star'],
      colors: ['#f59e0b', '#fbbf24', '#fcd34d'],
      scalar: 1.5,
    });
  }, 500);
}

/** Play a completion sound using Web Audio API */
function playCompletionSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    // Chord: C major + octave
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + i * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.8);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.8);
    });
  } catch (_) {
    // AudioContext blocked — silently skip
  }
}

// ============================================================
// SIDEBAR SECTION ITEM
// ============================================================
function SidebarItem({ section, isActive, isCompleted, dayNum, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.035, duration: 0.3 }}
    >
      <Link
        href={`/75-days-challenge/${dayNum}/${section.id}`}
        className={cn(
          'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
          isActive
            ? `bg-gradient-to-r ${section.color} shadow-lg`
            : isCompleted
            ? 'bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20'
            : 'hover:bg-white/6 border border-transparent hover:border-white/10',
        )}
      >
        {/* Section icon */}
        <span className="text-lg flex-shrink-0 w-7 text-center leading-none transition-transform group-hover:scale-110">
          {isCompleted && !isActive ? '✅' : section.icon}
        </span>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm font-semibold truncate leading-tight',
            isActive ? 'text-white' : isCompleted ? 'text-emerald-300' : 'text-gray-300',
          )}>
            {section.title}
          </p>
          <p className="text-[11px] text-gray-500 truncate mt-0.5 group-hover:text-gray-400 transition-colors">
            {section.time} · +{section.xp} XP
          </p>
        </div>

        {/* Status */}
        <div className="flex-shrink-0 w-5">
          {isCompleted && !isActive ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : isActive ? (
            <motion.div
              className="w-2 h-2 rounded-full bg-white"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================
// SUCCESS TOAST — fires when section is marked complete
// ============================================================
function SuccessToast({ xp, sectionTitle, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="success-toast"
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 16, stiffness: 280 }}
          className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[9999]
                     bg-[#0f0f1a]/95 backdrop-blur-2xl border border-emerald-500/40
                     rounded-2xl px-6 py-4 shadow-2xl shadow-emerald-500/20
                     flex items-center gap-4 min-w-[300px] max-w-sm"
        >
          {/* Animated check */}
          <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-emerald-400 font-bold text-sm">Section crushed! 🔥</p>
            <p className="text-gray-300 text-xs truncate mt-0.5">{sectionTitle}</p>
          </div>

          {/* XP badge */}
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="flex items-center gap-1.5 bg-yellow-500/15 border border-yellow-500/30 rounded-xl px-3 py-2 flex-shrink-0"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 font-black text-base">+{xp}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// MOBILE BOTTOM NAV BAR
// ============================================================
function MobileBottomBar({ prevSection, nextSection, dayNum, isCompleted, onComplete, isCompleting }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden
                    bg-[#080810]/90 backdrop-blur-2xl border-t border-white/10
                    flex items-center gap-2 px-3 py-3">
      {/* Previous */}
      {prevSection ? (
        <Link
          href={`/75-days-challenge/${dayNum}/${prevSection.id}`}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10
                     transition-all text-gray-400 hover:text-white text-sm font-medium border border-white/5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline text-xs truncate max-w-[70px]">
            {prevSection.title}
          </span>
        </Link>
      ) : (
        <div className="w-10" />
      )}

      {/* Complete button */}
      <motion.button
        onClick={onComplete}
        disabled={isCompleted || isCompleting}
        whileTap={{ scale: isCompleted ? 1 : 0.96 }}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl',
          'font-bold text-sm transition-all duration-300',
          isCompleted
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
            : isCompleting
            ? 'bg-violet-600/40 text-white/60 cursor-wait'
            : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 active:scale-95',
        )}
      >
        {isCompleted ? (
          <><CheckCircle2 className="w-4 h-4" /> Done ✅</>
        ) : isCompleting ? (
          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
        ) : (
          <><Sparkles className="w-4 h-4" /> Mark Done 🎯</>
        )}
      </motion.button>

      {/* Next */}
      {nextSection ? (
        <Link
          href={`/75-days-challenge/${dayNum}/${nextSection.id}`}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10
                     transition-all text-gray-400 hover:text-white text-sm font-medium border border-white/5"
        >
          <span className="hidden xs:inline text-xs truncate max-w-[70px]">
            {nextSection.title}
          </span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}

// ============================================================
// ANIMATED PROGRESS RING — shows day completion %
// ============================================================
function MiniProgressRing({ percent, size = 44 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black text-violet-300">{percent}%</span>
      </div>
    </div>
  );
}

// ============================================================
// SECTION LAYOUT — MAIN EXPORT
// ============================================================
export default function SectionLayout({
  children,
  dayNum,
  sectionId,
  sectionMeta,
  dayData,
  sections = [],
  onComplete: externalOnComplete,
}) {
  const router = useRouter();

  // ── Stores ────────────────────────────────────────────────
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const lessons = useProgressStore((s) => s.lessons);
  const addXP = useGamificationStore((s) => s.addXP);

  // ── Derived state ─────────────────────────────────────────
  const lessonKey = `day-${dayNum}-section-${sectionId}`;
  const isCompleted = Boolean(lessons?.[lessonKey]?.completed);

  const currentIndex = sections.findIndex((s) => s.id === sectionId);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  const completedCount = sections.filter(
    (s) => lessons?.[`day-${dayNum}-section-${s.id}`]?.completed,
  ).length;
  const progressPercent = sections.length > 0
    ? Math.round((completedCount / sections.length) * 100)
    : 0;

  // ── Local UI state ────────────────────────────────────────
  const [isCompleting, setIsCompleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Complete handler ──────────────────────────────────────
  const handleComplete = useCallback(async () => {
    if (isCompleted || isCompleting) return;
    setIsCompleting(true);
    try {
      completeLesson(lessonKey, 100);
      addXP(sectionMeta.xp, {
        source: `challenge_section_${sectionId}`,
        label: sectionMeta.title,
      });
      fireConfetti();
      playCompletionSound();
      setShowToast(true);
      if (externalOnComplete) {
        externalOnComplete({ sectionId, sectionMeta, dayNum });
      }
      setTimeout(() => {
        setShowToast(false);
        if (nextSection) {
          router.push(`/75-days-challenge/${dayNum}/${nextSection.id}`);
        } else {
          router.push(`/75-days-challenge/${dayNum}`);
        }
      }, 1800);
    } catch (err) {
      console.error('[SectionLayout] Complete error:', err);
    } finally {
      setIsCompleting(false);
    }
  }, [isCompleted, isCompleting, completeLesson, lessonKey, addXP, sectionMeta, sectionId, externalOnComplete, dayNum, nextSection, router]);

  // ── Close mobile sidebar on section change ────────────────
  useEffect(() => { setSidebarOpen(false); }, [sectionId]);

  // ── Keyboard shortcut: Ctrl+Enter = complete ─────────────
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleComplete();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleComplete]);

  // ── Extract gradient colors for the section theme ─────────
  const sectionColor = sectionMeta?.color || 'from-violet-500 to-purple-600';
  const dayTopic = dayData?.topic?.title || dayData?.title || `Day ${dayNum}`;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-[#07070f] text-white flex flex-col">

      {/* ── Ambient background — section-specific color ─────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-right blob based on section color */}
        <motion.div
          key={sectionId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={cn(
            'absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full blur-3xl',
            `bg-gradient-to-br ${sectionColor}`,
          )}
          style={{ opacity: 0.07 }}
        />
        {/* Bottom-left blob */}
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-br from-cyan-500 to-blue-600"
          style={{ opacity: 0.04 }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════════════
          STICKY HEADER
      ══════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#07070f]/85 backdrop-blur-2xl
                          border-b border-white/8 flex items-center gap-3 px-4 md:px-6 h-15 py-2.5">

        {/* Back to day overview */}
        <Link
          href={`/75-days-challenge/${dayNum}`}
          className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl
                     bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/15
                     transition-all text-gray-400 hover:text-white group"
          title="Back to Day overview"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-medium hidden sm:block">Day {dayNum}</span>
        </Link>

        {/* Breadcrumb — desktop only */}
        <div className="flex-1 min-w-0 hidden md:flex items-center gap-1.5 text-xs text-gray-500">
          <Link href="/75-days-challenge" className="hover:text-gray-300 transition-colors">
            75 Days
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-700" />
          <Link href={`/75-days-challenge/${dayNum}`} className="hover:text-gray-300 transition-colors truncate max-w-[120px]">
            {dayTopic}
          </Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0 text-gray-700" />
          <span className="text-white font-semibold truncate">
            {sectionMeta?.icon} {sectionMeta?.title}
          </span>
        </div>

        {/* Mobile: section title */}
        <div className="flex-1 min-w-0 md:hidden">
          <p className="text-sm font-bold text-white truncate">
            {sectionMeta?.icon} {sectionMeta?.title}
          </p>
        </div>

        {/* Section progress indicator */}
        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/5 rounded-xl px-3 py-1.5 border border-white/8">
            <Target className="w-3.5 h-3.5 text-gray-500" />
            <span>
              <span className="text-white font-bold">{sectionMeta?.num}</span>
              <span className="text-gray-600">/20</span>
            </span>
            {/* Mini progress bar */}
            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden ml-1">
              <motion.div
                className={cn('h-full rounded-full bg-gradient-to-r', sectionColor)}
                initial={{ width: 0 }}
                animate={{ width: `${(sectionMeta?.num / 20) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>

        {/* XP badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-shrink-0 flex items-center gap-1.5 bg-amber-500/10
                        border border-amber-500/20 rounded-xl px-2.5 py-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300 font-black text-xs">+{sectionMeta?.xp}</span>
          <span className="text-amber-500 text-[10px] font-medium hidden sm:block">XP</span>
        </motion.div>

        {/* Mark Complete button — desktop */}
        <motion.button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          whileHover={!isCompleted ? { scale: 1.03 } : {}}
          whileTap={!isCompleted ? { scale: 0.97 } : {}}
          className={cn(
            'hidden md:flex flex-shrink-0 items-center gap-2',
            'px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300',
            isCompleted
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
              : isCompleting
              ? 'bg-violet-600/40 text-white/60 cursor-wait'
              : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40',
          )}
          title="Mark section as complete (Ctrl+Enter)"
        >
          {isCompleted ? (
            <><CheckCircle2 className="w-4 h-4" /> Done ✅</>
          ) : isCompleting ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Mark Done</>
          )}
        </motion.button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="lg:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center
                     rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 transition-all text-gray-400 hover:text-white"
          title="Toggle sections menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </header>

      {/* ════════════════════════════════════════════════════════
          BODY — sidebar + main content
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 relative z-10">

        {/* ── DESKTOP SIDEBAR ─────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-[268px] flex-shrink-0
                          min-h-[calc(100vh-60px)] border-r border-white/8
                          bg-[#07070f]/60 sticky top-[60px] h-[calc(100vh-60px)]
                          overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

          {/* Sidebar header */}
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">
                Day {dayNum} Journey
              </p>
              <MiniProgressRing percent={progressPercent} />
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className={cn('h-full rounded-full bg-gradient-to-r', sectionColor)}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-[11px] text-gray-600">
                {completedCount}/{sections.length} sections done
              </p>
              {completedCount > 0 && (
                <span className="text-[11px] text-emerald-500 font-semibold">
                  🔥 Keep going!
                </span>
              )}
            </div>
          </div>

          {/* Section list */}
          <nav className="p-2 flex flex-col gap-0.5 flex-1">
            {sections.map((section, idx) => {
              const key = `day-${dayNum}-section-${section.id}`;
              const done = Boolean(lessons?.[key]?.completed);
              const active = section.id === sectionId;
              return (
                <SidebarItem
                  key={section.id}
                  section={section}
                  isActive={active}
                  isCompleted={done}
                  dayNum={dayNum}
                  index={idx}
                />
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-3 border-t border-white/8">
            <div className="bg-white/4 rounded-xl p-3 border border-white/8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">
                    Total XP Available
                  </p>
                  <p className="text-sm font-black text-amber-400 flex items-center gap-1 mt-0.5">
                    <Zap className="w-3.5 h-3.5" />
                    {sections.reduce((acc, s) => acc + s.xp, 0)} XP
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">
                    Est. Time
                  </p>
                  <p className="text-sm font-black text-cyan-400 mt-0.5 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" />
                    ~{sections.reduce((acc, s) => acc + parseInt(s.time), 0)} min
                  </p>
                </div>
              </div>
              {/* Today's XP earned */}
              {completedCount > 0 && (
                <div className="mt-2 pt-2 border-t border-white/8">
                  <p className="text-[10px] text-gray-500">
                    XP earned so far:{' '}
                    <span className="text-amber-400 font-black">
                      +{sections
                        .filter((s) => lessons?.[`day-${dayNum}-section-${s.id}`]?.completed)
                        .reduce((acc, s) => acc + s.xp, 0)} XP
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ── MOBILE SLIDE-IN SIDEBAR ───────────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                key="mobile-sidebar"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 z-50 w-[280px] flex flex-col
                             bg-[#07070f] border-r border-white/10 overflow-y-auto lg:hidden"
              >
                {/* Mobile header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between pt-safe">
                  <div>
                    <p className="text-sm font-black text-white">Day {dayNum} Sections</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {completedCount}/{sections.length} completed · {progressPercent}%
                    </p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl
                               bg-white/5 hover:bg-white/10 text-gray-400 transition-colors border border-white/8"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="px-4 py-3 border-b border-white/8">
                  <div className="w-full h-2 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      className={cn('h-full rounded-full bg-gradient-to-r', sectionColor)}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>

                {/* Section list */}
                <nav className="p-2 flex flex-col gap-0.5 flex-1">
                  {sections.map((section, idx) => {
                    const key = `day-${dayNum}-section-${section.id}`;
                    const done = Boolean(lessons?.[key]?.completed);
                    const active = section.id === sectionId;
                    return (
                      <SidebarItem
                        key={section.id}
                        section={section}
                        isActive={active}
                        isCompleted={done}
                        dayNum={dayNum}
                        index={idx}
                      />
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT AREA ─────────────────────────────── */}
        <main className="flex-1 min-w-0 overflow-x-hidden pb-28 lg:pb-12">

          {/* ── SECTION HERO BANNER — Full-width, dramatic, distinct per section ── */}
          <div className="relative w-full overflow-hidden border-b border-white/8">

            {/* Deep gradient background — unique per section */}
            <div
              className={cn('absolute inset-0 bg-gradient-to-br opacity-25', sectionColor)}
            />
            {/* Radial glow center-right */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 75% 50%, rgba(255,255,255,0.07) 0%, transparent 55%)',
              }}
            />
            {/* Dot grid pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '22px 22px',
              }}
            />
            {/* Bottom fade to body */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#07070f] to-transparent" />

            <motion.div
              key={sectionId}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10"
            >
              {/* Top row: breadcrumb + nav arrows */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
                  <Link href="/75-days-challenge" className="hover:text-white/60 transition-colors">75 Days</Link>
                  <ChevronRight className="w-3 h-3" />
                  <Link href={`/75-days-challenge/${dayNum}`} className="hover:text-white/60 transition-colors">Day {dayNum}</Link>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-white/60 font-medium">{sectionMeta?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {prevSection && (
                    <Link
                      href={`/75-days-challenge/${dayNum}/${prevSection.id}`}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 transition-all text-gray-300 hover:text-white text-xs font-medium group"
                      title={prevSection.title}
                    >
                      <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="hidden sm:inline truncate max-w-[80px]">Prev</span>
                    </Link>
                  )}
                  {nextSection && (
                    <Link
                      href={`/75-days-challenge/${dayNum}/${nextSection.id}`}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 transition-all text-gray-300 hover:text-white text-xs font-medium group"
                      title={nextSection.title}
                    >
                      <span className="hidden sm:inline truncate max-w-[80px]">Next</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Main hero content */}
              <div className="flex items-start gap-5">
                {/* Big emoji badge */}
                <motion.div
                  initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.08 }}
                  className={cn(
                    'w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0',
                    'text-3xl md:text-4xl shadow-2xl border border-white/20',
                    `bg-gradient-to-br ${sectionColor}`,
                  )}
                  style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                >
                  {sectionMeta?.icon}
                </motion.div>

                <div className="flex-1 min-w-0">
                  {/* Section number badge */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-white/40">
                      <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-white/60 text-[10px] font-black">{sectionMeta?.num}</span>
                      Section {sectionMeta?.num} of {sections.length}
                    </span>
                    {isCompleted && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-2.5 py-0.5 font-bold"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Completed ✅
                      </motion.span>
                    )}
                  </div>

                  {/* Title — big and bold */}
                  <motion.h1
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-1.5"
                  >
                    {sectionMeta?.title}
                  </motion.h1>

                  {/* Subtitle */}
                  <p className="text-white/50 text-sm md:text-base">
                    {sectionMeta?.subtitle}
                  </p>

                  {/* Meta pills: time + XP + day */}
                  <div className="flex items-center gap-2 flex-wrap mt-3">
                    <span className="flex items-center gap-1 text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                      <Clock className="w-3 h-3" /> {sectionMeta?.time}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-1 font-semibold">
                      <Zap className="w-3 h-3" /> +{sectionMeta?.xp} XP
                    </span>
                    <span className="text-xs text-white/30 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                      Day {dayNum} · 75 Days Hard English
                    </span>
                  </div>
                </div>
              </div>

              {/* Section progress strip */}
              <div className="mt-6 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    className={cn('h-full rounded-full bg-gradient-to-r', sectionColor)}
                    initial={{ width: 0 }}
                    animate={{ width: `${(sectionMeta?.num / sections.length) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
                <span className="text-[11px] text-white/30 flex-shrink-0">
                  {Math.round((sectionMeta?.num / sections.length) * 100)}% through today
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── SECTION CONTENT ─────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={sectionId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative"
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* ── BOTTOM COMPLETE BUTTON (desktop) ─────────────── */}
          <div className="hidden lg:flex justify-center items-center gap-4 px-8 py-8">
            {prevSection && (
              <Link
                href={`/75-days-challenge/${dayNum}/${prevSection.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10
                           border border-white/10 transition-all text-gray-400 hover:text-white text-sm font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                {prevSection.title}
              </Link>
            )}
            <motion.button
              onClick={handleComplete}
              disabled={isCompleted || isCompleting}
              whileHover={!isCompleted ? { scale: 1.04, y: -1 } : {}}
              whileTap={!isCompleted ? { scale: 0.97 } : {}}
              className={cn(
                'flex items-center gap-2.5 px-7 py-3 rounded-2xl text-base font-black',
                'transition-all duration-300 shadow-lg',
                isCompleted
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default shadow-emerald-500/10'
                  : isCompleting
                  ? 'bg-violet-600/40 text-white/60 cursor-wait'
                  : `bg-gradient-to-r ${sectionColor} text-white shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40`,
              )}
              title="Mark section as complete (Ctrl+Enter)"
            >
              {isCompleted ? (
                <><CheckCircle2 className="w-5 h-5" /> Section Done! 🎉</>
              ) : isCompleting ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Mark This Section Done 🎯</>
              )}
            </motion.button>
            {nextSection && (
              <Link
                href={`/75-days-challenge/${dayNum}/${nextSection.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10
                           border border-white/10 transition-all text-gray-400 hover:text-white text-sm font-medium"
              >
                {nextSection.title}
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>

      {/* ── MOBILE BOTTOM BAR ─────────────────────────────────── */}
      <MobileBottomBar
        prevSection={prevSection}
        nextSection={nextSection}
        dayNum={dayNum}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        isCompleting={isCompleting}
      />

      {/* ── SUCCESS TOAST ─────────────────────────────────────── */}
      <SuccessToast
        xp={sectionMeta?.xp || 0}
        sectionTitle={sectionMeta?.title || ''}
        visible={showToast}
      />
    </div>
  );
}
