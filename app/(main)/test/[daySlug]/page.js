'use client';
// Test Day Page — Timed & graded exam for a specific day
// Uses the universal PracticeQuiz component with isTest=true
// Features: countdown timer, disabled hints, detailed grading

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Trophy } from 'lucide-react';
import { getTestQuestionsForDay } from '@/lib/testData';
import { getTopicByDay } from '@/lib/topics';

// Lazy-load the quiz component for better performance
const PracticeQuiz = dynamic(() => import('@/components/quiz/PracticeQuiz'), {
  loading: () => (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false, // Audio API requires client-side
});

// ============================================================
// Test Day Page
// ============================================================
export default function TestDayPage() {
  const params  = useParams();
  const dayNum  = parseInt(String(params?.daySlug || 'day-1').replace(/^day-/, '') || '1', 10);
  const topic   = getTopicByDay(dayNum);
  const questions = getTestQuestionsForDay(dayNum);

  if (!topic) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">❓</div>
        <h2 className="text-xl font-bold text-white mb-2">Day not found</h2>
        <Link href="/75-days-challenge" className="btn-primary">← Back to Challenge</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* ── Breadcrumb ───────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <Link href={`/75-days-challenge/${dayNum}`} className="hover:text-white transition-colors">
          Day {dayNum}
        </Link>
        <span>/</span>
        <span className="text-slate-300">Test</span>
      </div>

      {/* ── Topic Info Banner ────────────────────────────── */}
      <div className="card p-4 border-rose-500/20 bg-rose-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-2xl shrink-0">
          📝
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="badge-primary bg-rose-500/20 text-rose-300 border-rose-500/30 text-xs">Day {dayNum} Test</span>
            <span className="text-xs text-slate-500 capitalize">{topic.type}</span>
            <span className="text-xs text-slate-500">{topic.cefr}</span>
          </div>
          <h2 className="font-bold text-white">{topic.title} — Exam</h2>
          <p className="text-xs text-slate-500">{questions.length} questions available</p>
        </div>
        <Link href={`/75-days-challenge/${dayNum}`}
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* ── Test Rules Banner ─────────────────────────────── */}
      <div className="card p-4 bg-rose-500/5 border border-rose-500/15">
        <p className="text-sm text-rose-300 font-semibold mb-2">📋 Exam Rules:</p>
        <ul className="space-y-1 text-xs text-slate-400">
          <li>• <strong className="text-white">Time Limit:</strong> You have 30 seconds per question. Timer will count down.</li>
          <li>• <strong className="text-white">No Assistance:</strong> Hints and answer reveals are disabled during the test.</li>
          <li>• <strong className="text-white">Grading:</strong> Score &gt;= 70% to pass the day's exam and earn bonus XP.</li>
          <li>• <strong className="text-white">Submit:</strong> Press Enter or click 'Submit & Next' to confirm your answer.</li>
        </ul>
      </div>

      {/* ── The Quiz Component (in Test Mode) ──────────────── */}
      <PracticeQuiz
        questions={questions}
        title={`Day ${dayNum} Exam: ${topic.title}`}
        backHref={`/75-days-challenge/${dayNum}`}
        questionsPerSession={Math.min(40, questions.length)}
        shuffleMode={true}
        isTest={true}
      />
    </div>
  );
}
