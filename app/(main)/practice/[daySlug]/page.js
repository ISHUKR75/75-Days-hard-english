'use client';
// Practice Day Page — Hindi→English translation quiz for a specific day
// Uses the universal PracticeQuiz component with real question data
// Features: sound effects, XP, score tracking, session summary

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap } from 'lucide-react';
import { getQuestionsForDay } from '@/lib/practiceData';
import DAYS_75_TOPICS, { getTopicByDay } from '@/lib/topics';

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
// Practice Day Page
// ============================================================
export default function PracticeDayPage() {
  const params  = useParams();
  const dayNum  = parseInt(String(params?.daySlug || 'day-1').replace(/^day-/, '') || '1', 10);
  const topic   = getTopicByDay(dayNum);
  const questions = getQuestionsForDay(dayNum);

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
        <span className="text-slate-300">Practice</span>
      </div>

      {/* ── Topic Info Banner ────────────────────────────── */}
      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-2xl shrink-0">
          {topic.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="badge-primary text-xs">Day {dayNum}</span>
            <span className="text-xs text-slate-500 capitalize">{topic.type}</span>
            <span className="text-xs text-slate-500">{topic.cefr}</span>
          </div>
          <h2 className="font-bold text-white">{topic.title}</h2>
          <p className="text-xs text-slate-500">{questions.length} questions available</p>
        </div>
        <Link href={`/75-days-challenge/${dayNum}`}
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* ── Quiz Instructions ─────────────────────────────── */}
      <div className="card p-4 bg-amber-500/5 border border-amber-500/15">
        <p className="text-sm text-amber-200 font-semibold mb-2">📖 How to practice:</p>
        <ul className="space-y-1 text-xs text-slate-400">
          <li>• Hindi sentence padhkar uski <strong className="text-white">English translation</strong> type karo</li>
          <li>• Answer case-insensitive hai — "I am" aur "i am" dono sahi hain</li>
          <li>• Trailing punctuation matter nahi karta (. ! ? optional)</li>
          <li>• <strong className="text-white">Hint</strong> button se help lo, <strong className="text-white">Reveal</strong> se jawab dekho</li>
          <li>• Sahi answer par 🔊 sound, ❌ galat par bhi sound milega</li>
          <li>• Har sahi jawab par <strong className="text-violet-300">+10 XP</strong> milta hai</li>
        </ul>
      </div>

      {/* ── The Quiz ──────────────────────────────────────── */}
      <PracticeQuiz
        questions={questions}
        title={`Day ${dayNum}: ${topic.title}`}
        backHref={`/75-days-challenge/${dayNum}`}
        questionsPerSession={Math.min(20, questions.length)}
        shuffleMode={true}
      />
    </div>
  );
}
