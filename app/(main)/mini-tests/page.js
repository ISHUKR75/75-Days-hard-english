'use client';
// Mini Tests Page — Topic-wise mini tests, timed mode, IELTS/TOEFL prep

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Timer, Target, Trophy, ArrowRight, Play, Lock, CheckCircle2 } from 'lucide-react';
import { getQuestionsForDay } from '@/lib/practiceData';
import useUserStore from '@/store/userStore';

const PracticeQuiz = dynamic(() => import('@/components/quiz/PracticeQuiz'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const MINI_TESTS = [
  { id: 'basics',     title: 'Basics Test',          emoji: '🔤', days: [1,2,3,4,5],     level: 'A1', desc: 'Simple present, be verb, imperatives', badge: 'Starter' },
  { id: 'possession', title: 'Possession Test',       emoji: '✋', days: [6,7,8],          level: 'A1', desc: 'Has/Have/Had, there is/are', badge: 'Day 6-9' },
  { id: 'modals',     title: 'Modal Verbs Test',      emoji: '🔑', days: [10,11,12],       level: 'A2', desc: 'Can/Could, Will, Should, Must', badge: 'Day 10-12' },
  { id: 'tenses-1',   title: 'Tenses Test 1',         emoji: '⏰', days: [13,14,15,16,17], level: 'A2', desc: 'Simple, Continuous, Perfect tenses', badge: 'Day 13-20' },
  { id: 'advanced-1', title: 'Advanced Test 1',       emoji: '🎓', days: [20,21,22,23,24], level: 'B1', desc: 'Conditionals, passive voice, reported speech', badge: 'Day 20-25' },
  { id: 'vocabulary', title: 'Vocabulary Mega Test',  emoji: '📚', days: [1,3,5,7,9],      level: 'A2', desc: 'Mixed vocabulary from multiple days', badge: 'Mixed' },
];

export default function MiniTestsPage() {
  const [activeTest, setActiveTest] = useState(null);
  const [questions,  setQuestions]  = useState([]);

  const { totalLessonsCompleted } = useUserStore();
  const currentDay = Math.min(totalLessonsCompleted + 1, 75);

  const startTest = (test) => {
    let pool = [];
    for (const d of test.days) {
      pool = pool.concat(getQuestionsForDay(d).slice(0, 6));
    }
    pool = pool.sort(() => Math.random() - 0.5).slice(0, 20);
    setQuestions(pool);
    setActiveTest(test);
  };

  if (activeTest && questions.length > 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <button
          onClick={() => { setActiveTest(null); setQuestions([]); }}
          className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1"
        >
          ← Back to Tests
        </button>
        <PracticeQuiz
          questions={questions}
          title={`${activeTest.title} — ${activeTest.emoji}`}
          backHref="/mini-tests"
          questionsPerSession={20}
          shuffleMode={false}
          onComplete={() => { setActiveTest(null); setQuestions([]); }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <Target size={26} className="text-primary-400" /> Mini Tests
          </h1>
          <p className="text-slate-500">Topic-wise 20-question tests — apni strength aur weakness pehchano</p>
        </div>
        <Link href="/scores" className="btn-secondary text-sm flex items-center gap-2 shrink-0">
          <Trophy size={14} /> My Scores
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MINI_TESTS.map((test) => {
          const maxDayRequired = Math.max(...test.days);
          const isLocked = maxDayRequired > currentDay;
          return (
            <div
              key={test.id}
              className={`card p-5 transition-all ${
                isLocked ? 'opacity-50' : 'hover:border-white/15 cursor-pointer'
              }`}
              onClick={() => !isLocked && startTest(test)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  isLocked ? 'bg-white/5' : 'bg-primary-500/15 border border-primary-500/20'
                }`}>
                  {isLocked ? <Lock size={20} className="text-slate-500" /> : test.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">{test.badge}</span>
                    <span className="text-[10px] text-slate-500">{test.level}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">{test.title}</h3>
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-3">{test.desc}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Timer size={11} /> ~10 min</span>
                <span className="flex items-center gap-1"><Target size={11} /> 20 questions</span>
              </div>
              {!isLocked && (
                <button className="btn-primary text-xs w-full mt-3 flex items-center justify-center gap-1.5">
                  <Play size={12} fill="currentColor" /> Start Test
                </button>
              )}
              {isLocked && (
                <p className="text-xs text-slate-600 mt-3 text-center">
                  Complete Day {maxDayRequired} to unlock
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="card p-4 bg-primary-500/5 border border-primary-500/15 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-semibold text-white">Want a longer challenge?</h3>
          <p className="text-xs text-slate-500">Quick Test mein mixed 10/20/30 questions available hain</p>
        </div>
        <Link href="/quick-test" className="btn-primary text-xs flex items-center gap-1.5">
          <Target size={12} /> Quick Test
        </Link>
      </div>
    </div>
  );
}
