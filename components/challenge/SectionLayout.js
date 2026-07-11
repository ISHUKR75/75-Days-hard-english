'use client';

/**
 * SectionLayout — Shared wrapper for all 20 section pages
 * =========================================================
 * Provides the full chrome: sticky header, desktop sidebar,
 * mobile bottom bar, completion logic, confetti, and XP awards. 🎉
 *
 * Props:
 *   children     – The actual section component content
 *   dayNum       – Current day number (1-75)
 *   sectionId    – Current section slug e.g. 'vocabulary'
 *   sectionMeta  – Metadata object from SECTIONS array
 *   dayData      – Full day data from API
 *   sections     – Full SECTIONS array (passed from page)
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

// ============================================================
// HELPERS
// ============================================================

/** Fire a celebratory confetti burst 🎊 */
function fireConfetti() {
  // First burst — wide spread
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#8b5cf6', '#a855f7', '#06b6d4', '#10b981', '#f59e0b'],
  });

  // Second burst — from left
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#8b5cf6', '#ec4899', '#06b6d4'],
    });
  }, 200);

  // Third burst — from right
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#f59e0b', '#10b981', '#a855f7'],
    });
  }, 350);
}

// ============================================================
// SIDEBAR SECTION ITEM
// ============================================================
function SidebarItem({ section, isActive, isCompleted, dayNum }) {
  return (
    <Link
      href={`/75-days-challenge/${dayNum}/${section.id}`}
      className={cn(
        'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
        isActive
          ? `bg-gradient-to-r ${section.color} shadow-lg shadow-violet-500/20`
          : isCompleted
          ? 'bg-white/5 hover:bg-white/10 border border-emerald-500/20'
          : 'hover:bg-white/5 border border-transparent',
      )}
    >
      {/* Section icon */}
      <span className="text-lg flex-shrink-0 w-7 text-center leading-none">
        {section.icon}
      </span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm font-medium truncate',
            isActive ? 'text-white' : 'text-gray-300',
          )}
        >
          {section.title}
        </p>
        <p className="text-xs text-gray-500 truncate group-hover:text-gray-400 transition-colors">
          {section.time} · {section.xp} XP
        </p>
      </div>

      {/* Status badge */}
      <div className="flex-shrink-0">
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : isActive ? (
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        ) : null}
      </div>
    </Link>
  );
}

// ============================================================
// SUCCESS TOAST
// ============================================================
function SuccessToast({ xp, sectionTitle, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="success-toast"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 18, stiffness: 300 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999]
                     bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/40
                     rounded-2xl px-6 py-4 shadow-2xl shadow-emerald-500/20
                     flex items-center gap-4 min-w-[280px] max-w-sm"
        >
          <div className="text-3xl">🎉</div>
          <div>
            <p className="text-emerald-400 font-bold text-sm">Section Complete!</p>
            <p className="text-white font-medium text-xs">{sectionTitle}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">+{xp} XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// MOBILE BOTTOM NAV BAR
// ============================================================
function MobileBottomBar({
  prevSection,
  nextSection,
  dayNum,
  isCompleted,
  onComplete,
  isCompleting,
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden
                    bg-[#0a0a0f]/80 backdrop-blur-xl border-t border-white/10
                    flex items-center gap-2 px-4 py-3 safe-area-bottom"
    >
      {/* Prev */}
      {prevSection ? (
        <Link
          href={`/75-days-challenge/${dayNum}/${prevSection.id}`}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10
                     transition-colors text-gray-400 hover:text-white text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline truncate max-w-[80px]">
            {prevSection.title}
          </span>
        </Link>
      ) : (
        <div className="w-12" />
      )}

      {/* Mark Complete (center) */}
      <button
        onClick={onComplete}
        disabled={isCompleted || isCompleting}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl',
          'font-semibold text-sm transition-all duration-300',
          isCompleted
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
            : isCompleting
            ? 'bg-violet-600/50 text-white/70 cursor-wait'
            : 'bg-gradient-to-r from-violet-600 to-purple-500 text-white hover:shadow-lg hover:shadow-violet-500/25 active:scale-95',
        )}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Done!
          </>
        ) : isCompleting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving…
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Complete ✅
          </>
        )}
      </button>

      {/* Next */}
      {nextSection ? (
        <Link
          href={`/75-days-challenge/${dayNum}/${nextSection.id}`}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10
                     transition-colors text-gray-400 hover:text-white text-sm font-medium"
        >
          <span className="hidden xs:inline truncate max-w-[80px]">
            {nextSection.title}
          </span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="w-12" />
      )}
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

  // ── Stores ───────────────────────────────────────────────
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const lessons = useProgressStore((s) => s.lessons);
  const addXP = useGamificationStore((s) => s.addXP);

  // ── Derived state ────────────────────────────────────────
  const lessonKey = `day-${dayNum}-section-${sectionId}`;
  const isCompleted = Boolean(lessons?.[lessonKey]?.completed);

  // Current section index
  const currentIndex = sections.findIndex((s) => s.id === sectionId);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection =
    currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  // ── Local UI state ───────────────────────────────────────
  const [isCompleting, setIsCompleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle

  // Count completed sections for progress ring
  const completedCount = sections.filter(
    (s) => lessons?.[`day-${dayNum}-section-${s.id}`]?.completed,
  ).length;
  const progressPercent =
    sections.length > 0
      ? Math.round((completedCount / sections.length) * 100)
      : 0;

  // ── Complete handler ─────────────────────────────────────
  const handleComplete = useCallback(async () => {
    if (isCompleted || isCompleting) return;

    setIsCompleting(true);

    try {
      // 1. Record in progress store
      completeLesson(lessonKey, 100);

      // 2. Award XP via gamification store
      addXP(sectionMeta.xp, {
        source: `challenge_section_${sectionId}`,
        label: sectionMeta.title,
      });

      // 3. Fire confetti 🎉
      fireConfetti();

      // 4. Show success toast
      setShowToast(true);

      // 5. Call external callback if provided
      if (externalOnComplete) {
        externalOnComplete({ sectionId, sectionMeta, dayNum });
      }

      // 6. After 1.5s auto-navigate to next section
      setTimeout(() => {
        setShowToast(false);
        if (nextSection) {
          router.push(`/75-days-challenge/${dayNum}/${nextSection.id}`);
        } else {
          // Last section — go back to day overview
          router.push(`/75-days-challenge/${dayNum}`);
        }
      }, 1500);
    } catch (err) {
      console.error('[SectionLayout] Complete error:', err);
    } finally {
      setIsCompleting(false);
    }
  }, [
    isCompleted,
    isCompleting,
    completeLesson,
    lessonKey,
    addXP,
    sectionMeta,
    sectionId,
    externalOnComplete,
    dayNum,
    nextSection,
    router,
  ]);

  // ── Close mobile sidebar on route change ────────────────
  useEffect(() => {
    setSidebarOpen(false);
  }, [sectionId]);

  // ── Keyboard shortcut: Ctrl+Enter = complete ────────────
  useEffect(() => {
    function handleKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleComplete();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleComplete]);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">

      {/* ── Ambient background blobs ───────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={cn(
            'absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl',
            `bg-gradient-to-br ${sectionMeta?.color || 'from-violet-500 to-purple-600'}`,
          )}
        />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl bg-gradient-to-br from-cyan-500 to-blue-600" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          STICKY HEADER
      ══════════════════════════════════════════════════════════ */}
      <header
        className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl
                      border-b border-white/10 flex items-center gap-3 px-4 md:px-6 h-16"
      >
        {/* Back button */}
        <Link
          href={`/75-days-challenge/${dayNum}`}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center
                     rounded-xl bg-white/5 hover:bg-white/10 transition-colors
                     text-gray-400 hover:text-white"
          title="Back to Day overview"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        {/* Breadcrumb */}
        <div className="flex-1 min-w-0 hidden sm:block">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link
              href="/75-days-challenge"
              className="hover:text-gray-300 transition-colors truncate"
            >
              75 Days
            </Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link
              href={`/75-days-challenge/${dayNum}`}
              className="hover:text-gray-300 transition-colors"
            >
              Day {dayNum}
            </Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-white font-medium truncate">
              {sectionMeta?.title}
            </span>
          </nav>
        </div>

        {/* Mobile: section title only */}
        <div className="flex-1 min-w-0 sm:hidden">
          <p className="text-sm font-semibold text-white truncate">
            {sectionMeta?.icon} {sectionMeta?.title}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            Section{' '}
            <span className="text-white font-bold">{sectionMeta?.num}</span>/20
          </span>
          {/* Mini progress bar */}
          <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                `bg-gradient-to-r ${sectionMeta?.color || 'from-violet-500 to-purple-600'}`,
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-gray-600">{progressPercent}%</span>
        </div>

        {/* XP badge */}
        <div
          className="flex-shrink-0 flex items-center gap-1 bg-yellow-500/10
                        border border-yellow-500/20 rounded-xl px-2.5 py-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-yellow-400 font-bold text-xs">
            +{sectionMeta?.xp} XP
          </span>
        </div>

        {/* Mark Complete button (desktop) */}
        <button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          className={cn(
            'hidden md:flex flex-shrink-0 items-center gap-2',
            'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300',
            isCompleted
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
              : isCompleting
              ? 'bg-violet-600/50 text-white/70 cursor-wait'
              : 'bg-gradient-to-r from-violet-600 to-purple-500 text-white hover:shadow-lg hover:shadow-violet-500/30 active:scale-95',
          )}
          title="Mark section as complete (Ctrl+Enter)"
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Completed ✅
            </>
          ) : isCompleting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Mark Complete
            </>
          )}
        </button>

        {/* Mobile hamburger for sidebar */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="lg:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center
                     rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400"
          title="Toggle sections menu"
        >
          <span className="text-base">☰</span>
        </button>
      </header>

      {/* ═══════════════════════════════════════════════════════
          BODY (sidebar + main content)
      ══════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 relative z-10">

        {/* ── DESKTOP SIDEBAR ─────────────────────────────── */}
        <aside
          className="hidden lg:flex flex-col w-72 flex-shrink-0
                        min-h-[calc(100vh-4rem)] border-r border-white/10
                        bg-[#0a0a0f]/50 sticky top-16 h-[calc(100vh-4rem)]
                        overflow-y-auto"
        >
          {/* Sidebar header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Day {dayNum} Sections
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {completedCount}/{sections.length}
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  `bg-gradient-to-r ${sectionMeta?.color || 'from-violet-500 to-purple-600'}`,
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1.5">
              {progressPercent}% of Day {dayNum} done
            </p>
          </div>

          {/* Section list */}
          <nav className="p-3 flex flex-col gap-1 flex-1">
            {sections.map((section) => {
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
                />
              );
            })}
          </nav>

          {/* Sidebar footer — stats */}
          <div className="p-4 border-t border-white/10">
            <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total XP available</p>
                <p className="text-sm font-bold text-yellow-400 flex items-center gap-1 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                  {sections.reduce((acc, s) => acc + s.xp, 0)} XP
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Est. time</p>
                <p className="text-sm font-bold text-cyan-400 mt-0.5">
                  ~{sections.reduce((acc, s) => acc + parseInt(s.time), 0)} min
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MOBILE SLIDE-IN SIDEBAR ──────────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              />

              {/* Sidebar panel */}
              <motion.aside
                key="mobile-sidebar"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 z-50 w-72 flex flex-col
                             bg-[#0a0a0f] border-r border-white/10 overflow-y-auto lg:hidden"
              >
                {/* Mobile sidebar header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between mt-safe">
                  <div>
                    <p className="text-sm font-bold text-white">Day {dayNum} Sections</p>
                    <p className="text-xs text-gray-500">
                      {completedCount}/{sections.length} completed
                    </p>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg
                               bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Section list */}
                <nav className="p-3 flex flex-col gap-1 flex-1">
                  {sections.map((section) => {
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
                      />
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ────────────────────────────────── */}
        <main className="flex-1 min-w-0 overflow-x-hidden pb-24 lg:pb-10">
          {/* Section hero strip */}
          <div
            className={cn(
              'w-full px-4 md:px-8 py-6 border-b border-white/5',
              'bg-gradient-to-r opacity-90',
              sectionMeta?.color,
            )}
            style={{ backgroundSize: '200% 200%' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto flex items-center gap-4"
            >
              <span className="text-4xl md:text-5xl">{sectionMeta?.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                    Section {sectionMeta?.num} of {sections.length}
                  </span>
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-xs bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-full px-2 py-0.5 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Done
                    </span>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {sectionMeta?.title}
                </h1>
                <p className="text-white/70 text-sm mt-0.5">{sectionMeta?.subtitle}</p>
              </div>

              {/* Meta pills */}
              <div className="ml-auto hidden sm:flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-white text-xs font-medium">
                  <Star className="w-3 h-3" />
                  {sectionMeta?.time}
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-white text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  +{sectionMeta?.xp} XP
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actual section content */}
          <motion.div
            key={sectionId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
            className="max-w-4xl mx-auto px-4 md:px-8 py-8"
          >
            {children}
          </motion.div>

          {/* Desktop prev/next navigation */}
          <div className="hidden lg:flex max-w-4xl mx-auto px-4 md:px-8 pb-8">
            <div className="flex items-center justify-between w-full gap-4">
              {prevSection ? (
                <Link
                  href={`/75-days-challenge/${dayNum}/${prevSection.id}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5
                             hover:bg-white/10 border border-white/10 transition-all
                             text-gray-300 hover:text-white group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Previous</p>
                    <p className="text-sm font-medium">
                      {prevSection.icon} {prevSection.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  href={`/75-days-challenge/${dayNum}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5
                             hover:bg-white/10 border border-white/10 transition-all
                             text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-gray-500">Back to</p>
                    <p className="text-sm font-medium">Day {dayNum} Overview</p>
                  </div>
                </Link>
              )}

              {nextSection ? (
                <Link
                  href={`/75-days-challenge/${dayNum}/${nextSection.id}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5
                             hover:bg-white/10 border border-white/10 transition-all
                             text-gray-300 hover:text-white group ml-auto"
                >
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Next</p>
                    <p className="text-sm font-medium">
                      {nextSection.icon} {nextSection.title}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <Link
                  href={`/75-days-challenge/${dayNum}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl
                             bg-gradient-to-r from-emerald-600 to-teal-600
                             hover:shadow-lg hover:shadow-emerald-500/25
                             transition-all text-white font-medium ml-auto"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <div className="text-right">
                    <p className="text-xs text-white/70">All done!</p>
                    <p className="text-sm font-medium">Finish Day {dayNum}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE BOTTOM BAR
      ══════════════════════════════════════════════════════════ */}
      <MobileBottomBar
        prevSection={prevSection}
        nextSection={nextSection}
        dayNum={dayNum}
        isCompleted={isCompleted}
        onComplete={handleComplete}
        isCompleting={isCompleting}
      />

      {/* ═══════════════════════════════════════════════════════
          SUCCESS TOAST
      ══════════════════════════════════════════════════════════ */}
      <SuccessToast
        xp={sectionMeta?.xp}
        sectionTitle={sectionMeta?.title}
        visible={showToast}
      />
    </div>
  );
}
