'use client'; // Client-side rendering — needed for interactive quiz and sound effects

// ============================================================
// DAY 5: DEMONSTRATIVE PRONOUNS — Complete Practice Page
// 75 Days Hard English Course
// Topic: This / That / These / Those
// Hindi: यह / वह / ये / वे
// Total Questions: 800+
// Subtopics: This (near singular), That (far singular), These (near plural), Those (far plural)
// File: app/(main)/practice/day-5/page.js
// ============================================================

// ── Imports ──────────────────────────────────────────────────
import dynamic from 'next/dynamic'; // Lazy loading for quiz component
import Link from 'next/link'; // Next.js navigation
import { BookOpen, ArrowLeft, Target, Star, Brain, Zap } from 'lucide-react'; // Icons
import { getQuestionsForDay } from '@/lib/practiceData'; // Real per-day question bank

// ── Lazy-load the PracticeQuiz component ─────────────────────
const PracticeQuizComponent = dynamic(
  () => import('@/components/quiz/PracticeQuiz'),
  {
    loading: () => (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
    ssr: false, // Audio needs browser
  }
);

// ============================================================
// DAY 5 QUESTIONS — Demonstrative Pronouns (This/That/These/Those)
// 800+ questions covering all patterns and contexts
// ============================================================
// Real practice questions for Day 5 are sourced from lib/practiceData.js, which prefers
// handcrafted/real per-day banks and tops up to 950+ with the generated content engine —
// this keeps this static route's content identical to the dynamic /practice/[daySlug] route
// instead of the small stale array that used to live here.
const DAY_5_QUESTIONS = getQuestionsForDay(5);

// ============================================================
// PAGE COMPONENT — Day 5 Practice Interface
// ============================================================
export default function Day5PracticePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ── Breadcrumb ────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <Link href="/75-days-challenge/5" className="hover:text-white transition-colors">Day 5</Link>
        <span>/</span>
        <span className="text-slate-300">Practice</span>
      </div>

      {/* ── Topic Banner ──────────────────────────────────── */}
      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          👆
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="badge-primary text-xs">Day 5</span>
            <span className="text-xs text-slate-500">Grammar</span>
            <span className="text-xs text-slate-500">A1 Level</span>
          </div>
          <h2 className="font-bold text-white">Demonstrative Pronouns — This / That / These / Those</h2>
          <p className="text-xs text-slate-500">{DAY_5_QUESTIONS.length}+ questions available</p>
        </div>
        <Link href="/75-days-challenge/5"
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* ── Quick Reference Card ──────────────────────────── */}
      <div className="card p-4 bg-amber-500/5 border border-amber-500/15">
        <p className="text-sm text-amber-200 font-semibold mb-2">📌 Demonstrative Pronoun Rules:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-blue-500/10 rounded-lg p-2">
            <p className="text-blue-300 font-bold mb-1">NEAR (पास)</p>
            <p className="text-white">THIS = यह (1 thing)</p>
            <p className="text-white">THESE = ये (many things)</p>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-2">
            <p className="text-purple-300 font-bold mb-1">FAR (दूर)</p>
            <p className="text-white">THAT = वह (1 thing)</p>
            <p className="text-white">THOSE = वे (many things)</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2">THIS/THAT + IS (singular) | THESE/THOSE + ARE (plural)</p>
      </div>

      {/* ── Quiz Component ────────────────────────────────── */}
      <PracticeQuizComponent
        questions={DAY_5_QUESTIONS}
        title="Day 5: Demonstrative Pronouns Practice"
        backHref="/75-days-challenge/5"
        questionsPerSession={DAY_5_QUESTIONS.length}
        shuffleMode={true}
        showProgress={true}
        showScore={true}
        allowPercentSelect={true}
      />

    </div>
  );
}
