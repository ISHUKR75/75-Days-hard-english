'use client';
// Practice Page — Day 1: Basic of English
// Features: 500 Hindi questions, translation practice, sound effects, XP rewards, progress tracking
// This file contains exactly 500 Hindi-to-English translation questions for Day 1
// Each question has: hindi text, english answer, alternatives, hint, explanation, difficulty
// All comments are in simple English as requested

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { getQuestionsForDay } from '@/lib/practiceData';

// Lazy-load the shared quiz engine for better performance (audio API needs client-side only)
const PracticeQuizComponent = dynamic(() => import('@/components/quiz/PracticeQuiz'), {
  loading: () => (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

// Day 1 Practice Questions (500 Hindi questions)
// Real practice questions for Day 1 are sourced from lib/practiceData.js, which prefers
// handcrafted/real per-day banks and tops up to 950+ with the generated content engine —
// this keeps this static route's content identical to the dynamic /practice/[daySlug] route
// instead of the small stale array that used to live here.
const DAY_1_QUESTIONS = getQuestionsForDay(1);

// ============================================================
// Day 1 Practice Page — renders via the shared PracticeQuiz engine
// ============================================================
export default function Day1PracticePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <span className="text-slate-300">Day 1 Practice</span>
      </div>

      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          <BookOpen className="w-6 h-6 text-primary-400" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="badge-primary text-xs">Day 1</span>
          <h2 className="font-bold text-white">Basics of English — Subject + Verb + Object</h2>
          <p className="text-xs text-slate-500">{DAY_1_QUESTIONS.length} questions available</p>
        </div>
      </div>

      <PracticeQuizComponent
        questions={DAY_1_QUESTIONS}
        title="Day 1: Basics of English"
        backHref="/75-days-challenge/1"
        questionsPerSession={DAY_1_QUESTIONS.length}
        shuffleMode={true}
        allowPercentSelect={true}
      />
    </div>
  );
}