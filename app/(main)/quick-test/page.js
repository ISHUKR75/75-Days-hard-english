'use client';
// Quick Test Page — Random mixed questions from all topics
// Timed quiz with instant scoring and results

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Timer, Zap, BarChart2, RefreshCw } from 'lucide-react';
import { getQuestionsForDay } from '@/lib/practiceData';

const PracticeQuiz = dynamic(() => import('@/components/quiz/PracticeQuiz'), {
  loading: () => (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

// ============================================================
// Build a mixed question pool from multiple days
// ============================================================
function buildMixedPool(days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], count = 20) {
  let pool = [];
  for (const d of days) {
    const qs = getQuestionsForDay(d);
    pool = pool.concat(qs.slice(0, 5)); // 5 from each day
  }
  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}

const TEST_MODES = [
  { id: 'quick',    label: '10 Questions',  count: 10,  time: '5 min',  emoji: '⚡', desc: 'Quick warm-up' },
  { id: 'standard', label: '20 Questions', count: 20,  time: '10 min', emoji: '🎯', desc: 'Standard test' },
  { id: 'challenge', label: '30 Questions', count: 30, time: '15 min', emoji: '🏆', desc: 'Full challenge' },
];

export default function QuickTestPage() {
  const [mode,    setMode]    = useState(null);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  const startTest = (selectedMode) => {
    const pool = buildMixedPool([1,2,3,4,5,6,7,8,9,10,11,12], selectedMode.count);
    setQuestions(pool);
    setMode(selectedMode);
    setStarted(true);
  };

  const resetTest = () => {
    setStarted(false);
    setMode(null);
    setQuestions([]);
  };

  if (started && questions.length > 0) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/quick-test" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Test Selection
          </Link>
          <button onClick={resetTest} className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5">
            <RefreshCw size={12} /> New Test
          </button>
        </div>
        <PracticeQuiz
          questions={questions}
          title={`Quick Test — ${mode.label}`}
          backHref="/quick-test"
          questionsPerSession={mode.count}
          shuffleMode={false}
          onComplete={resetTest}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
        <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-300">Quick Test</span>
      </div>

      <div className="text-center py-4">
        <div className="text-5xl mb-3">⚡</div>
        <h1 className="text-3xl font-black text-white mb-2">Quick Test</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Mixed questions from all topics — Hindi se English translation karo,
          score dekho, aur apni progress track karo.
        </p>
      </div>

      {/* Mode Selection */}
      <div className="space-y-3">
        <h2 className="font-bold text-white text-lg">Select Test Mode</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEST_MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => startTest(m)}
              className="card p-5 text-left group hover:border-primary-500/40 hover:bg-primary-500/5 transition-all cursor-pointer"
            >
              <div className="text-3xl mb-3">{m.emoji}</div>
              <h3 className="font-black text-white text-lg mb-0.5 group-hover:text-primary-300 transition-colors">
                {m.label}
              </h3>
              <p className="text-xs text-slate-500 mb-3">{m.desc}</p>
              <div className="flex items-center gap-2">
                <Timer size={12} className="text-slate-500" />
                <span className="text-xs text-slate-500">~{m.time}</span>
                <span className="ml-auto text-xs text-primary-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Start →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="card p-4 bg-amber-500/5 border border-amber-500/15">
        <p className="text-sm text-amber-200 font-semibold mb-2">📋 Test Rules:</p>
        <ul className="space-y-1 text-xs text-slate-400">
          <li>• Hindi sentence ko English mein translate karo</li>
          <li>• Case-insensitive — "I am" aur "i am" dono sahi hain</li>
          <li>• Har sahi answer = +10 XP + 1 Coin</li>
          <li>• Streak maintain karo — bonus XP milega</li>
          <li>• "Reveal" button se answer dekho (no XP)</li>
        </ul>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2">
        <Link href="/practice/day-1" className="btn-secondary text-xs flex items-center gap-1.5">
          <Zap size={12} /> Day 1 Practice
        </Link>
        <Link href="/75-days-challenge" className="btn-secondary text-xs flex items-center gap-1.5">
          📅 All 75 Days
        </Link>
        <Link href="/progress" className="btn-secondary text-xs flex items-center gap-1.5">
          <BarChart2 size={12} /> My Progress
        </Link>
      </div>
    </div>
  );
}
