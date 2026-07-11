'use client';

/**
 * Dynamic Section Page — 75 Days Challenge
 * ==========================================
 * Renders the correct section component based on [day] and [section] URL params.
 * Uses Next.js dynamic imports for code splitting — each section loads on demand. 🚀
 *
 * Route: /75-days-challenge/[day]/[section]
 * Example: /75-days-challenge/3/vocabulary
 */

import { useState, useEffect, use } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SectionLayout from '@/components/challenge/SectionLayout';

// ============================================================
// SECTION METADATA — 20 sections for every day
// ============================================================
export const SECTIONS = [
  {
    id: 'overview',
    num: 1,
    icon: '🎯',
    title: 'Why This Matters',
    subtitle: 'Topic overview + learning goals',
    time: '5 min',
    xp: 10,
    color: 'from-violet-500 to-purple-600',
    dataKey: 'overview',
  },
  {
    id: 'theory',
    num: 2,
    icon: '📖',
    title: 'Concept & Theory',
    subtitle: 'Grammar rules + formulas + examples',
    time: '15 min',
    xp: 25,
    color: 'from-blue-500 to-cyan-600',
    dataKey: 'grammarTheory',
  },
  {
    id: 'mistakes',
    num: 3,
    icon: '⚠️',
    title: 'Common Mistakes',
    subtitle: 'Top errors + how to fix them',
    time: '10 min',
    xp: 20,
    color: 'from-orange-500 to-red-600',
    dataKey: 'commonMistakes',
  },
  {
    id: 'memory-tricks',
    num: 4,
    icon: '🧠',
    title: 'Memory Tricks',
    subtitle: 'Smart mnemonics + shortcuts',
    time: '8 min',
    xp: 15,
    color: 'from-pink-500 to-rose-600',
    dataKey: 'memoryTricks',
  },
  {
    id: 'vocabulary',
    num: 5,
    icon: '📝',
    title: 'Vocabulary',
    subtitle: 'Full word bank with Hindi meanings + IPA',
    time: '30 min',
    xp: 100,
    color: 'from-emerald-500 to-teal-600',
    dataKey: 'vocabulary',
  },
  {
    id: 'flashcards',
    num: 6,
    icon: '🃏',
    title: 'Flashcards',
    subtitle: 'Spaced repetition system',
    time: '20 min',
    xp: 50,
    color: 'from-yellow-500 to-amber-600',
    dataKey: 'flashcards',
  },
  {
    id: 'practice',
    num: 7,
    icon: '✍️',
    title: 'Practice (Hindi→English)',
    subtitle: 'Translation questions',
    time: '45 min',
    xp: 200,
    color: 'from-violet-600 to-indigo-700',
    dataKey: 'practice',
  },
  {
    id: 'dialogue',
    num: 8,
    icon: '💬',
    title: 'Dialogue Practice',
    subtitle: 'Role-play conversations',
    time: '15 min',
    xp: 30,
    color: 'from-sky-500 to-blue-600',
    dataKey: 'dialogues',
  },
  {
    id: 'conversation',
    num: 9,
    icon: '🗣️',
    title: 'Daily Conversations',
    subtitle: 'Office + daily life scenarios',
    time: '12 min',
    xp: 25,
    color: 'from-teal-500 to-green-600',
    dataKey: 'conversationPractice',
  },
  {
    id: 'speaking',
    num: 10,
    icon: '🎙️',
    title: 'Speaking & Pronunciation',
    subtitle: 'Shadowing + pronunciation drills',
    time: '20 min',
    xp: 40,
    color: 'from-purple-500 to-violet-600',
    dataKey: 'speaking',
  },
  {
    id: 'writing',
    num: 11,
    icon: '📄',
    title: 'Writing Drills',
    subtitle: 'Emails + sentences + exercises',
    time: '25 min',
    xp: 50,
    color: 'from-indigo-500 to-blue-600',
    dataKey: 'writing',
  },
  {
    id: 'listening',
    num: 12,
    icon: '🎧',
    title: 'Listening Practice',
    subtitle: 'Listen + comprehend + answer',
    time: '20 min',
    xp: 40,
    color: 'from-cyan-500 to-sky-600',
    dataKey: 'listening',
  },
  {
    id: 'reading',
    num: 13,
    icon: '📰',
    title: 'Reading Comprehension',
    subtitle: 'Passages + questions + analysis',
    time: '20 min',
    xp: 40,
    color: 'from-rose-500 to-pink-600',
    dataKey: 'reading',
  },
  {
    id: 'story',
    num: 14,
    icon: '📚',
    title: 'Story & Comprehension',
    subtitle: 'Read story + answer MCQs',
    time: '15 min',
    xp: 30,
    color: 'from-fuchsia-500 to-purple-600',
    dataKey: 'stories',
  },
  {
    id: 'essay',
    num: 15,
    icon: '✒️',
    title: 'Essay Writing',
    subtitle: 'Model essay + write your own',
    time: '20 min',
    xp: 45,
    color: 'from-orange-400 to-amber-500',
    dataKey: 'essays',
  },
  {
    id: 'study-plan',
    num: 16,
    icon: '📅',
    title: 'Daily Study Plan',
    subtitle: 'Morning routine + study schedule',
    time: '5 min',
    xp: 10,
    color: 'from-lime-500 to-green-600',
    dataKey: 'morningRoutine',
  },
  {
    id: 'revision',
    num: 17,
    icon: '🔄',
    title: 'Revision & Quick Quiz',
    subtitle: 'Key concepts + rapid fire quiz',
    time: '15 min',
    xp: 35,
    color: 'from-amber-500 to-yellow-600',
    dataKey: 'revision',
  },
  {
    id: 'test',
    num: 18,
    icon: '📊',
    title: 'Final Mock Test',
    subtitle: 'MCQs — Timed + Graded',
    time: '30 min',
    xp: 150,
    color: 'from-red-500 to-rose-600',
    dataKey: 'mockTest',
  },
  {
    id: 'milestones',
    num: 19,
    icon: '🏆',
    title: 'Milestones & Badges',
    subtitle: 'Achievements + XP tracker',
    time: '5 min',
    xp: 20,
    color: 'from-yellow-400 to-orange-500',
    dataKey: 'milestones',
  },
  {
    id: 'challenge-task',
    num: 20,
    icon: '🎯',
    title: "Today's Challenge",
    subtitle: 'Daily challenge task + completion',
    time: '10 min',
    xp: 50,
    color: 'from-violet-500 to-indigo-600',
    dataKey: 'challenge',
  },
];

// ============================================================
// DYNAMIC IMPORTS — code splitting for each section 🔥
// Each chunk only loads when user navigates to that section
// ============================================================

// Loading placeholder shown while the component chunk loads
const SectionLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-violet-400" />
      <p className="text-gray-400 text-sm animate-pulse">Loading section…</p>
    </div>
  </div>
);


const OverviewSection = dynamic(
  () => import('@/components/challenge/sections/OverviewSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const TheorySection = dynamic(
  () => import('@/components/challenge/sections/TheorySection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const MistakesSection = dynamic(
  () => import('@/components/challenge/sections/MistakesSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const MemoryTricksSection = dynamic(
  () => import('@/components/challenge/sections/MemoryTricksSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const VocabularySection = dynamic(
  () => import('@/components/challenge/sections/VocabularySection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const FlashcardsSection = dynamic(
  () => import('@/components/challenge/sections/FlashcardsSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const PracticeSection = dynamic(
  () => import('@/components/challenge/sections/PracticeSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const DialogueSection = dynamic(
  () => import('@/components/challenge/sections/DialogueSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const ConversationSection = dynamic(
  () => import('@/components/challenge/sections/ConversationSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const SpeakingSection = dynamic(
  () => import('@/components/challenge/sections/SpeakingSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const WritingSection = dynamic(
  () => import('@/components/challenge/sections/WritingSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const ListeningSection = dynamic(
  () => import('@/components/challenge/sections/ListeningSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const ReadingSection = dynamic(
  () => import('@/components/challenge/sections/ReadingSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const StorySection = dynamic(
  () => import('@/components/challenge/sections/StorySection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const EssaySection = dynamic(
  () => import('@/components/challenge/sections/EssaySection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const StudyPlanSection = dynamic(
  () => import('@/components/challenge/sections/StudyPlanSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const RevisionSection = dynamic(
  () => import('@/components/challenge/sections/RevisionSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const TestSection = dynamic(
  () => import('@/components/challenge/sections/TestSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const MilestonesSection = dynamic(
  () => import('@/components/challenge/sections/MilestonesSection'),
  { loading: SectionLoadingFallback, ssr: false },
);
const ChallengeTaskSection = dynamic(
  () => import('@/components/challenge/sections/ChallengeTaskSection'),
  { loading: SectionLoadingFallback, ssr: false },
);

// ============================================================
// SECTION → COMPONENT MAP
// Maps sectionId string → dynamically imported component
// ============================================================
const SECTION_COMPONENT_MAP = {
  overview: OverviewSection,
  theory: TheorySection,
  mistakes: MistakesSection,
  'memory-tricks': MemoryTricksSection,
  vocabulary: VocabularySection,
  flashcards: FlashcardsSection,
  practice: PracticeSection,
  dialogue: DialogueSection,
  conversation: ConversationSection,
  speaking: SpeakingSection,
  writing: WritingSection,
  listening: ListeningSection,
  reading: ReadingSection,
  story: StorySection,
  essay: EssaySection,
  'study-plan': StudyPlanSection,
  revision: RevisionSection,
  test: TestSection,
  milestones: MilestonesSection,
  'challenge-task': ChallengeTaskSection,
};

// ============================================================
// LOADING SKELETON — shown while API call is in-flight
// ============================================================
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 h-16 bg-white/5 backdrop-blur-xl border-b border-white/10 flex items-center px-6 gap-4">
        <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="w-48 h-3 rounded-full bg-white/10 animate-pulse" />
          <div className="w-32 h-2 rounded-full bg-white/10 animate-pulse" />
        </div>
        <div className="w-24 h-8 rounded-xl bg-white/10 animate-pulse" />
      </div>

      {/* Body skeleton */}
      <div className="flex">
        {/* Sidebar skeleton (desktop) */}
        <aside className="hidden lg:flex flex-col w-72 min-h-screen border-r border-white/10 p-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-xl bg-white/5 animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </aside>

        {/* Main content skeleton */}
        <main className="flex-1 p-6 space-y-4">
          <div className="w-3/4 h-8 rounded-xl bg-white/10 animate-pulse" />
          <div className="w-1/2 h-4 rounded-full bg-white/5 animate-pulse" />
          <div className="mt-8 grid gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-white/5 animate-pulse"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// 404 — SECTION NOT FOUND UI
// Shown when sectionId doesn't match any known section
// ============================================================
function SectionNotFound({ dayNum, sectionId }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      {/* Ambient blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Section not found
        </h1>
        <p className="text-gray-400 mb-2">
          <span className="text-red-400 font-mono bg-red-400/10 px-2 py-0.5 rounded">
            {sectionId}
          </span>{' '}
          doesn&apos;t exist in Day {dayNum}.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Maybe a typo in the URL? Check the day page for valid sections. 👇
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/75-days-challenge/${dayNum}`}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors text-white font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Day {dayNum}
          </Link>
          <Link
            href="/75-days-challenge"
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
          >
            All Days
          </Link>
        </div>

        {/* List valid section IDs as a hint */}
        <details className="mt-6 text-left">
          <summary className="text-gray-500 text-xs cursor-pointer hover:text-gray-300 transition-colors">
            Valid section IDs (click to reveal)
          </summary>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {SECTIONS.map((s) => (
              <Link
                key={s.id}
                href={`/75-days-challenge/${dayNum}/${s.id}`}
                className="text-xs font-mono px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                {s.id}
              </Link>
            ))}
          </div>
        </details>
      </motion.div>
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function SectionPage({ params }) {
  // Unwrap params (Next.js 15 async params pattern)
  const resolvedParams = use(params);
  const dayNum = parseInt(resolvedParams.day, 10);
  const sectionId = resolvedParams.section;

  // State
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lookup section metadata
  const sectionMeta = SECTIONS.find((s) => s.id === sectionId);
  // Lookup the section component
  const SectionComponent = SECTION_COMPONENT_MAP[sectionId];

  // ── Fetch day data from API ──────────────────────────────
  useEffect(() => {
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 75) {
      setError('Invalid day number. Must be between 1 and 75.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    async function fetchDayData() {
      try {
        // Only ask the API to include the heavy array this section actually
        // needs (vocabulary/practice/mockTest banks can be thousands of rows) —
        // every other section just needs its own lightweight JSON blob.
        const dataKeyParam = sectionMeta?.dataKey ? `?dataKey=${sectionMeta.dataKey}` : '';
        const res = await fetch(`/api/challenge/${dayNum}${dataKeyParam}`, {
          // Cache for 60s — data won't change within a session
          next: { revalidate: 60 },
        });

        if (!res.ok) {
          throw new Error(`API returned ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        if (!cancelled) {
          setDayData(json);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[SectionPage] Failed to fetch day data:', err);
          setError(err.message || 'Something went wrong fetching day data.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDayData();
    return () => {
      cancelled = true;
    };
  }, [dayNum, sectionMeta?.dataKey]);

  // ── Loading state ────────────────────────────────────────
  if (loading) return <PageSkeleton />;

  // ── Error state ─────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center"
        >
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Oops! Something broke 😅</h2>
          <p className="text-red-400 text-sm mb-6 font-mono bg-red-400/10 rounded-lg p-3">
            {error}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-medium transition-colors"
            >
              Try again
            </button>
            <Link
              href={`/75-days-challenge/${dayNum}`}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
            >
              Back to Day {dayNum}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Unknown section ID ──────────────────────────────────
  if (!sectionMeta || !SectionComponent) {
    return <SectionNotFound dayNum={dayNum} sectionId={sectionId} />;
  }

  // ── Render section inside SectionLayout ─────────────────
  return (
    <SectionLayout
      dayNum={dayNum}
      sectionId={sectionId}
      sectionMeta={sectionMeta}
      dayData={dayData}
      sections={SECTIONS}
    >
      {/* Every section component reads its own field off the full dayData
          object (data.overview, data.grammarTheory, data.vocabulary, ...),
          so pass the whole thing — the API already trims out whichever heavy
          bank this section didn't request via `?dataKey=`. */}
      <SectionComponent
        dayNum={dayNum}
        sectionMeta={sectionMeta}
        data={dayData}
        dayData={dayData}
      />
    </SectionLayout>
  );
}
