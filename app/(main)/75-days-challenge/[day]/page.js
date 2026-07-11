'use client';

// ============================================================
// DAY OVERVIEW PAGE — 75-Day English Challenge
// Gen Z styled, glassmorphism, framer-motion animations
// Shows all 20 sections for a given day as clickable cards
// ============================================================

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useProgressStore from '@/store/progressStore';
import { useGamificationStore } from '@/store/useGamificationStore';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Clock,
  Star,
  Zap,
  BookOpen,
  Trophy,
  Play,
  ChevronRight,
} from 'lucide-react';

// ============================================================
// ALL 20 SECTIONS DEFINITION
// Each section maps to a route: /75-days-challenge/[day]/[id]
// ============================================================
const SECTIONS = [
  { id: 'overview',           num: 1,  icon: '🎯', title: 'Why This Matters',          subtitle: 'Topic overview + learning goals',           time: '5 min',  xp: 10,  color: 'from-violet-500 to-purple-600',   dataKey: 'overview' },
  { id: 'theory',             num: 2,  icon: '📖', title: 'Concept & Theory',           subtitle: 'Grammar rules + formulas + examples',       time: '15 min', xp: 25,  color: 'from-blue-500 to-cyan-600',       dataKey: 'grammarTheory' },
  { id: 'mistakes',           num: 3,  icon: '⚠️', title: 'Common Mistakes',            subtitle: 'Top errors + how to fix them',              time: '10 min', xp: 20,  color: 'from-orange-500 to-red-600',      dataKey: 'commonMistakes' },
  { id: 'memory-tricks',      num: 4,  icon: '🧠', title: 'Memory Tricks',              subtitle: 'Smart mnemonics + shortcuts',               time: '8 min',  xp: 15,  color: 'from-pink-500 to-rose-600',       dataKey: 'memoryTricks' },
  { id: 'vocabulary',         num: 5,  icon: '📝', title: 'Vocabulary — 1000 Words',    subtitle: 'Full word bank with Hindi meanings + IPA',  time: '30 min', xp: 100, color: 'from-emerald-500 to-teal-600',    dataKey: 'vocabulary' },
  { id: 'flashcards',         num: 6,  icon: '🃏', title: 'Flashcards',                 subtitle: 'Spaced repetition system',                  time: '20 min', xp: 50,  color: 'from-yellow-500 to-amber-600',    dataKey: 'flashcards' },
  { id: 'practice',           num: 7,  icon: '✍️', title: 'Practice (Hindi→English)',   subtitle: '1400 translation questions',                time: '45 min', xp: 200, color: 'from-violet-600 to-indigo-700',   dataKey: 'practice' },
  { id: 'dialogue',           num: 8,  icon: '💬', title: 'Dialogue Practice',          subtitle: 'Role-play conversations',                   time: '15 min', xp: 30,  color: 'from-sky-500 to-blue-600',        dataKey: 'dialogues' },
  { id: 'conversation',       num: 9,  icon: '🗣️', title: 'Daily Conversations',        subtitle: 'Office + daily life scenarios',             time: '12 min', xp: 25,  color: 'from-teal-500 to-green-600',      dataKey: 'conversationPractice' },
  { id: 'speaking',           num: 10, icon: '🎙️', title: 'Speaking & Pronunciation',   subtitle: 'Shadowing + pronunciation drills',          time: '20 min', xp: 40,  color: 'from-purple-500 to-violet-600',   dataKey: 'speaking' },
  { id: 'writing',            num: 11, icon: '📄', title: 'Writing Drills',             subtitle: 'Emails + sentences + exercises',            time: '25 min', xp: 50,  color: 'from-indigo-500 to-blue-600',     dataKey: 'writing' },
  { id: 'listening',          num: 12, icon: '🎧', title: 'Listening Practice',         subtitle: 'Listen + comprehend + answer',              time: '20 min', xp: 40,  color: 'from-cyan-500 to-sky-600',        dataKey: 'listening' },
  { id: 'reading',            num: 13, icon: '📰', title: 'Reading Comprehension',      subtitle: 'Passages + questions + analysis',           time: '20 min', xp: 40,  color: 'from-rose-500 to-pink-600',       dataKey: 'reading' },
  { id: 'story',              num: 14, icon: '📚', title: 'Story & Comprehension',      subtitle: 'Read story + answer MCQs',                  time: '15 min', xp: 30,  color: 'from-fuchsia-500 to-purple-600',  dataKey: 'stories' },
  { id: 'essay',              num: 15, icon: '✒️', title: 'Essay Writing',              subtitle: 'Model essay + write your own',              time: '20 min', xp: 45,  color: 'from-orange-400 to-amber-500',    dataKey: 'essays' },
  { id: 'study-plan',         num: 16, icon: '📅', title: 'Daily Study Plan',           subtitle: 'Morning routine + study schedule',          time: '5 min',  xp: 10,  color: 'from-lime-500 to-green-600',      dataKey: 'morningRoutine' },
  { id: 'revision',           num: 17, icon: '🔄', title: 'Revision & Quick Quiz',      subtitle: 'Key concepts + rapid fire quiz',            time: '15 min', xp: 35,  color: 'from-amber-500 to-yellow-600',    dataKey: 'revision' },
  { id: 'test',               num: 18, icon: '📊', title: 'Final Mock Test',            subtitle: '400 MCQs — Timed + Graded',                 time: '30 min', xp: 150, color: 'from-red-500 to-rose-600',        dataKey: 'mockTest' },
  { id: 'milestones',         num: 19, icon: '🏆', title: 'Milestones & Badges',        subtitle: 'Achievements + XP tracker',                 time: '5 min',  xp: 20,  color: 'from-yellow-400 to-orange-500',   dataKey: 'milestones' },
  { id: 'challenge-task',     num: 20, icon: '🎯', title: "Today's Challenge",          subtitle: 'Daily challenge task + completion',         time: '10 min', xp: 50,  color: 'from-violet-500 to-indigo-600',   dataKey: 'challenge' },
];

// Total XP available in a day
const TOTAL_DAILY_XP = SECTIONS.reduce((sum, s) => sum + s.xp, 0);

// ============================================================
// ANIMATION VARIANTS
// ============================================================

// Fade-in-up for hero elements
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// Staggered container for section cards grid
const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Individual card animation
const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};

// Blob pulse animation
const blobVariants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.18, 0.25, 0.18],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ============================================================
// LOADING SKELETON COMPONENT
// ============================================================
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-6 px-4">
      {/* Animated gradient text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-6xl mb-4 animate-bounce">📚</div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Loading your day...
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Preparing all 20 sections for you ✨</p>
      </motion.div>

      {/* Skeleton cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl mt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            className="h-28 rounded-2xl bg-white/5 border border-white/10"
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// ERROR STATE COMPONENT
// ============================================================
function ErrorState({ dayNum, onRetry }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-6xl">😅</div>
      <h2 className="text-2xl font-bold text-white">Oops! Something went wrong</h2>
      <p className="text-gray-400 text-sm max-w-sm">
        Couldn't load Day {dayNum} data. Check your connection and try again!
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-semibold text-sm"
      >
        Try Again 🔄
      </motion.button>
      <Link href="/75-days-challenge" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
        ← Back to Challenge
      </Link>
    </div>
  );
}

// ============================================================
// CIRCULAR PROGRESS RING — SVG based
// ============================================================
function ProgressRing({ percentage, size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      {/* Percentage text in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-xs text-gray-400">done</span>
      </div>
    </div>
  );
}

// ============================================================
// HERO STATS PILL COMPONENT
// ============================================================
function StatPill({ icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2`}>
      <span className="text-lg">{icon}</span>
      <div>
        <div className={`text-sm font-bold ${color}`}>{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION CARD COMPONENT
// ============================================================
function SectionCard({ section, dayNum, isCompleted, index }) {
  const href = `/75-days-challenge/${dayNum}/${section.id}`;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="group relative"
    >
      <Link href={href} className="block h-full">
        {/* Card container — glassmorphism */}
        <div
          className={`
            relative h-full overflow-hidden
            bg-white/5 backdrop-blur-xl
            border rounded-2xl
            transition-all duration-300
            ${isCompleted
              ? 'border-emerald-500/40 shadow-emerald-500/10 shadow-lg'
              : 'border-white/10 group-hover:border-white/25 group-hover:shadow-xl group-hover:shadow-violet-500/10'
            }
          `}
        >
          {/* Gradient tint overlay at 15% opacity */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-300 rounded-2xl`}
          />

          {/* Completed overlay shimmer */}
          {isCompleted && (
            <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl" />
          )}

          {/* Content */}
          <div className="relative z-10 p-4 flex flex-col gap-3 h-full">

            {/* Top row: emoji circle + section number + completed badge */}
            <div className="flex items-start justify-between">
              {/* Gradient emoji circle */}
              <div
                className={`
                  w-11 h-11 rounded-xl flex items-center justify-center text-xl
                  bg-gradient-to-br ${section.color} bg-opacity-80
                  shadow-lg
                `}
              >
                {section.icon}
              </div>

              {/* Right side: completed check OR section number */}
              <div className="flex flex-col items-end gap-1">
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-1 text-emerald-400"
                  >
                    <CheckCircle2 size={18} />
                  </motion.div>
                ) : (
                  <span className="text-xs font-bold text-gray-500 bg-white/5 border border-white/10 rounded-lg px-2 py-0.5">
                    #{section.num}
                  </span>
                )}
              </div>
            </div>

            {/* Title + subtitle */}
            <div className="flex-1">
              <h3 className={`font-bold text-sm leading-tight ${isCompleted ? 'text-emerald-300' : 'text-white'}`}>
                {section.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">
                {section.subtitle}
              </p>
            </div>

            {/* Bottom row: time badge + XP badge */}
            <div className="flex items-center justify-between gap-2">
              {/* Time */}
              <div className="flex items-center gap-1 text-gray-400">
                <Clock size={11} />
                <span className="text-xs">{section.time}</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-2 py-0.5">
                <Zap size={10} />
                <span className="text-xs font-bold">+{section.xp} XP</span>
              </div>
            </div>

            {/* Completed text */}
            {isCompleted && (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} />
                Completed! ✅
              </div>
            )}

          </div>

          {/* Hover glow border effect */}
          <div
            className={`
              absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-gradient-to-br ${section.color}
            `}
            style={{ padding: '1px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}
          />

        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================
// MAIN DAY OVERVIEW PAGE COMPONENT
// ============================================================
export default function DayOverviewPage() {
  // ─── Routing ──────────────────────────────────────────────
  const params = useParams();
  const dayNum = Number(params?.day) || 1;

  // ─── Stores ───────────────────────────────────────────────
  const lessons = useProgressStore((state) => state.lessons);
  const { xp, level, streak } = useGamificationStore();

  // ─── Local state ──────────────────────────────────────────
  const [dayData, setDayData]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  // ─── Fetch day data ───────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function fetchDayData() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/challenge/${dayNum}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setDayData(json);
        }
      } catch (err) {
        console.error('[DayOverview] Failed to fetch day data:', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDayData();
    return () => { cancelled = true; };
  }, [dayNum, retryKey]);

  // ─── Derived: which sections are completed ────────────────
  const completedSectionIds = useMemo(() => {
    // Each completed section is stored with key: "day-{dayNum}-section-{sectionId}-complete"
    const completed = new Set();
    SECTIONS.forEach((section) => {
      const key = `day-${dayNum}-section-${section.id}-complete`;
      if (lessons?.[key]?.completed) {
        completed.add(section.id);
      }
    });
    return completed;
  }, [lessons, dayNum]);

  // ─── Progress percentage ──────────────────────────────────
  const completedCount = completedSectionIds.size;
  const progressPercent = Math.round((completedCount / SECTIONS.length) * 100);

  // ─── Find first incomplete section (for CTA) ─────────────
  const firstIncompleteSection = useMemo(() => {
    return SECTIONS.find((s) => !completedSectionIds.has(s.id)) || SECTIONS[0];
  }, [completedSectionIds]);

  // ─── Render states ────────────────────────────────────────
  if (loading) return <LoadingSkeleton />;
  if (error)   return <ErrorState dayNum={dayNum} onRetry={() => setRetryKey(k => k + 1)} />;

  // ─── Destructure API data for display ────────────────────
  // NOTE: topic is an object {title, emoji, cefr, difficulty, type} from the API
  const {
    topic: topicObj = {},
    stats    = {},
    overview = {},
  } = dayData || {};

  // Extract individual fields from the topic object
  const {
    title      = `Day ${dayNum}`,
    emoji      = '📘',
    cefr       = 'A1',
    difficulty = 'Beginner',
  } = topicObj;

  const {
    practiceCount    = 0,
    vocabularyCount  = 0,
    mockTestCount    = 0,
    flashcardsCount  = 0,
  } = stats;

  // Friendly summary from overview or fallback
  const friendlySummary = overview?.summary
    || `Get ready to level up your English game today! 🚀 Day ${dayNum} is packed with vocabulary, practice, and fun challenges. Let's crush it!`;

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-x-hidden">

      {/* =====================================================
          BACKGROUND — Animated gradient blobs (framer-motion)
          Three large blobs: purple, cyan, indigo
          ===================================================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Blob 1 — Purple (top left) */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Blob 2 — Cyan (top right) */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute -top-20 -right-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '2s',
          }}
        />
        {/* Blob 3 — Indigo (bottom center) */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* =====================================================
          MAIN CONTENT — relative z-10
          ===================================================== */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">

        {/* ===================================================
            TOP NAVIGATION BAR
            - Back button, Day badge, CEFR + difficulty chips
            =================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-8"
        >
          {/* Left: Back + Day badge */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Back button */}
            <Link href="/75-days-challenge">
              <motion.div
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 border border-white/10 rounded-xl px-3 py-2"
              >
                <ArrowLeft size={16} />
                <span className="text-sm font-medium">Back</span>
              </motion.div>
            </Link>

            {/* Day badge */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-violet-600/30 to-purple-600/30 border border-violet-500/30 rounded-xl px-3 py-2">
              <span className="text-violet-300 text-sm font-bold">Day {dayNum}</span>
              <span className="text-gray-500 text-xs">/ 75</span>
            </div>
          </div>

          {/* Right: CEFR chip + difficulty chip + streak */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* CEFR */}
            <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-2.5 py-1">
              {cefr}
            </span>
            {/* Difficulty */}
            <span className="text-xs font-bold text-orange-300 bg-orange-500/10 border border-orange-500/30 rounded-lg px-2.5 py-1">
              {difficulty}
            </span>
            {/* Streak */}
            {streak > 0 && (
              <span className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-2.5 py-1 flex items-center gap-1">
                🔥 {streak} day streak
              </span>
            )}
          </div>
        </motion.div>

        {/* ===================================================
            HERO SECTION
            - Topic emoji + name (large), tagline
            - Glassmorphism card with progress ring + stats
            =================================================== */}

        {/* Topic heading */}
        <motion.div
          {...fadeInUp}
          className="mb-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="text-5xl sm:text-6xl">{emoji}</span>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent leading-tight">
                {title}
              </h1>
              {difficulty && (
                <p className="text-gray-400 text-sm sm:text-base mt-1 capitalize">{difficulty} level • {cefr}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-7 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

            {/* Progress ring */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <ProgressRing percentage={progressPercent} size={130} strokeWidth={10} />
              <p className="text-xs text-gray-400 text-center">
                {completedCount}/{SECTIONS.length} sections
              </p>
            </div>

            {/* Right: summary + stats grid */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              {/* Friendly summary */}
              <div>
                <p className="text-white text-sm sm:text-base leading-relaxed">
                  {friendlySummary}
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <StatPill icon="📝" label="Vocabulary" value={vocabularyCount || '1000+'} color="text-emerald-400" />
                <StatPill icon="✍️" label="Practice Q's" value={practiceCount || '1400+'} color="text-cyan-400" />
                <StatPill icon="📊" label="Mock Test" value={mockTestCount ? `${mockTestCount} Q's` : '400 Q\'s'} color="text-orange-400" />
                <StatPill icon="🃏" label="Flashcards" value={flashcardsCount || '50+'} color="text-violet-400" />
              </div>

              {/* XP earned today bar */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star size={14} />
                  <span className="text-xs font-bold">Your XP: {xp}</span>
                </div>
                <div className="flex items-center gap-1.5 text-violet-400">
                  <Trophy size={14} />
                  <span className="text-xs font-bold">Level {level}</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Zap size={14} />
                  <span className="text-xs font-bold">{TOTAL_DAILY_XP} XP available today</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ===================================================
            SECTIONS GRID HEADING
            =================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex items-center justify-between mb-5 flex-wrap gap-2"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <BookOpen size={20} className="text-violet-400" />
              All 20 Sections
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Click any card to jump right in 👇
            </p>
          </div>

          {/* Completed badge */}
          {completedCount > 0 && (
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-3 py-1.5">
              <CheckCircle2 size={14} />
              <span className="text-xs font-semibold">{completedCount} completed</span>
            </div>
          )}
        </motion.div>

        {/* ===================================================
            SECTIONS GRID
            4 cols desktop, 2 cols tablet, 1 col mobile
            staggerChildren animation
            =================================================== */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {SECTIONS.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              dayNum={dayNum}
              isCompleted={completedSectionIds.has(section.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* ===================================================
            WHAT YOU'LL LEARN — from overview.whatYouWillLearn
            Only shown if API returns this data
            =================================================== */}
        {overview?.whatYouWillLearn?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-7 mb-8"
          >
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-xl">🎓</span>
              What you'll learn today
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {overview.whatYouWillLearn.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.4 }}
                  className="flex items-start gap-3 bg-white/3 border border-white/5 rounded-xl p-3"
                >
                  <span className="text-xl flex-shrink-0">{item.icon || '✅'}</span>
                  <div>
                    <div className="text-white text-sm font-semibold">{item.topic}</div>
                    {item.detail && (
                      <div className="text-gray-400 text-xs mt-0.5">{item.detail}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===================================================
            MOTIVATIONAL BANNER — Gen Z energy
            =================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="relative overflow-hidden bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/20 rounded-2xl p-5 mb-8 text-center"
        >
          {/* Shimmer particles */}
          <div className="absolute inset-0 pointer-events-none">
            {['top-2 left-4', 'top-3 right-8', 'bottom-3 left-12', 'bottom-2 right-6'].map((pos, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-violet-400`}
              />
            ))}
          </div>

          <p className="text-white font-bold text-base sm:text-lg relative z-10">
            🔥 You got this! Every section completed = more XP + closer to fluency!
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 relative z-10">
            No cap — consistent daily practice is the real cheat code 💯
          </p>
        </motion.div>

        {/* ===================================================
            QUICK SECTION PROGRESS — visual strip
            Shows all 20 sections as small colored dots
            =================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Section Progress</h3>
            <span className="text-xs text-gray-400">{completedCount} / {SECTIONS.length} done</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
            />
          </div>
          {/* Dot indicators */}
          <div className="flex flex-wrap gap-1.5">
            {SECTIONS.map((section) => {
              const done = completedSectionIds.has(section.id);
              return (
                <Link key={section.id} href={`/75-days-challenge/${dayNum}/${section.id}`} title={section.title}>
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`
                      w-5 h-5 rounded-md text-xs flex items-center justify-center
                      transition-all duration-200 cursor-pointer
                      ${done
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-gray-500 hover:bg-violet-500/30'
                      }
                    `}
                    title={section.title}
                  >
                    {done ? '✓' : section.num}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* =====================================================
          STICKY BOTTOM CTA
          "Start Day N" or "Continue Day N" → first incomplete section
          ===================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 bg-[#0a0a0f]/80 backdrop-blur-xl border-t border-white/10"
      >
        <div className="max-w-lg mx-auto flex items-center gap-3">

          {/* Progress pill */}
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
              {dayNum}
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-none">{progressPercent}%</div>
              <div className="text-gray-500 text-xs leading-none">done</div>
            </div>
          </div>

          {/* CTA button */}
          <Link href={`/75-days-challenge/${dayNum}/${firstIncompleteSection.id}`} className="flex-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-violet-500/30 transition-all duration-200 text-sm sm:text-base"
            >
              <Play size={16} fill="white" />
              <span>
                {completedCount === 0
                  ? `Start Day ${dayNum} 🚀`
                  : completedCount === SECTIONS.length
                    ? `Review Day ${dayNum} 🎉`
                    : `Continue Day ${dayNum} ⚡`
                }
              </span>
              <ChevronRight size={16} />
            </motion.div>
          </Link>

        </div>
      </motion.div>

    </div>
  );
}
