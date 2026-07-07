'use client';
// Daily Practice Page — Today's practice set + mixed review

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Target, Calendar, Zap } from 'lucide-react';
import { getQuestionsForDay } from '@/lib/practiceData';
import useUserStore from '@/store/userStore';

const PracticeQuiz = dynamic(() => import('@/components/quiz/PracticeQuiz'), {
  loading: () => (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

export default function DailyPracticePage() {
  const { totalLessonsCompleted } = useUserStore();
  const currentDay = Math.min(totalLessonsCompleted + 1, 75);

  // Mix questions from today + 2 previous days for review
  const todayQs = getQuestionsForDay(currentDay);
  const prevQs  = currentDay > 1
    ? getQuestionsForDay(Math.max(1, currentDay - 1)).slice(0, 10)
    : [];
  const prev2Qs = currentDay > 2
    ? getQuestionsForDay(Math.max(1, currentDay - 2)).slice(0, 5)
    : [];

  const allQuestions = [...todayQs, ...prevQs, ...prev2Qs];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-slate-300">Daily Practice</span>
      </div>

      <div className="card p-5 border-primary-500/20 bg-primary-500/5">
        <div className="flex items-center gap-3 mb-3">
          <Calendar size={20} className="text-primary-400" />
          <div>
            <h1 className="text-xl font-black text-white">Daily Practice</h1>
            <p className="text-xs text-slate-500">Day {currentDay} ke questions + revision</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 rounded-xl bg-white/5">
            <p className="text-lg font-black text-primary-400">{todayQs.length}</p>
            <p className="text-[10px] text-slate-500">Today's</p>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <p className="text-lg font-black text-amber-400">{prevQs.length}</p>
            <p className="text-[10px] text-slate-500">Yesterday's</p>
          </div>
          <div className="p-2 rounded-xl bg-white/5">
            <p className="text-lg font-black text-slate-400">{prev2Qs.length}</p>
            <p className="text-[10px] text-slate-500">2 Days Ago</p>
          </div>
        </div>
      </div>

      <PracticeQuiz
        questions={allQuestions}
        title="Daily Practice"
        backHref="/dashboard"
        questionsPerSession={20}
        shuffleMode={true}
      />
    </div>
  );
}
