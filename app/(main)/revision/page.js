'use client';
// Revision Hub — Daily, weekly, monthly revision schedules

import { useState } from 'react';
import Link from 'next/link';
import { RotateCcw, Calendar, CheckCircle2, Clock, ArrowRight, BookOpen, Zap, Star } from 'lucide-react';
import DAYS_75_TOPICS from '@/lib/topics';
import useUserStore from '@/store/userStore';

// ============================================================
// Spaced Repetition Intervals
// ============================================================
const REVISION_SCHEDULE = [
  { day: 1,  label: 'Same Day',    desc: 'Just learned — revise tonight',        emoji: '📅', interval: 0 },
  { day: 2,  label: 'Next Day',    desc: '1 day after learning',                  emoji: '🌅', interval: 1 },
  { day: 4,  label: '3 Days',      desc: '3 days after first lesson',             emoji: '🗓️', interval: 3 },
  { day: 8,  label: '1 Week',      desc: '7 days — weekly revision',              emoji: '📆', interval: 7 },
  { day: 16, label: '2 Weeks',     desc: '14 days — bi-weekly check',             emoji: '🔄', interval: 14 },
  { day: 31, label: '1 Month',     desc: '30 days — monthly revision',            emoji: '🗃️', interval: 30 },
  { day: 61, label: '2 Months',    desc: '60 days — final review before exam',    emoji: '🏆', interval: 60 },
];

const QUICK_REVISION_TOPICS = [
  { title: 'Be Verb (am/is/are)', day: 4, emoji: '🔤', level: 'A1', reviewed: false },
  { title: 'Has / Have', day: 6, emoji: '✋', level: 'A1', reviewed: false },
  { title: 'Simple Present', day: 1, emoji: '🌅', level: 'A1', reviewed: true },
  { title: 'Imperative Sentences', day: 3, emoji: '⚡', level: 'A1', reviewed: true },
  { title: 'Modals — Can/Could', day: 12, emoji: '🔑', level: 'A2', reviewed: false },
  { title: 'Want To / Need To', day: 11, emoji: '🌟', level: 'A2', reviewed: false },
];

// ============================================================
// Revision Page
// ============================================================
export default function RevisionPage() {
  const { totalLessonsCompleted } = useUserStore();
  const [activeTab, setActiveTab] = useState('daily');
  const currentDay = Math.min(totalLessonsCompleted + 1, 75);

  // Topics done so far
  const doneTopics = DAYS_75_TOPICS.filter(t => t.day < currentDay).slice(-10);

  const tabs = [
    { id: 'daily',   label: 'Daily',   emoji: '📅' },
    { id: 'weekly',  label: 'Weekly',  emoji: '📆' },
    { id: 'monthly', label: 'Monthly', emoji: '🗃️' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <RotateCcw size={26} className="text-amber-400" /> Revision Hub
        </h1>
        <p className="text-slate-500">Spaced repetition se cheezein hamesha yaad rahengi — regular revision is the key!</p>
      </div>

      {/* Why Revision Card */}
      <div className="card p-5 border-amber-500/20 bg-amber-500/5">
        <h2 className="font-bold text-white mb-2 flex items-center gap-2">
          <Star size={16} className="text-amber-400" /> Spaced Repetition — Kyun Zaroori Hai?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Research kehti hai ki hum 70% cheezein 24 ghante mein bhool jaate hain agar revision na karo.
          <strong className="text-white"> Spaced repetition</strong> is curve ko todta hai —
          sahi time par revision karo aur topic hamesha ke liye yaad ho jaata hai.
        </p>
      </div>

      {/* Spaced Repetition Schedule */}
      <div className="card p-5">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-primary-400" /> Ideal Revision Schedule
        </h2>
        <div className="space-y-2">
          {REVISION_SCHEDULE.map(({ day, label, desc, emoji, interval }) => (
            <div key={day} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
              <span className="text-xl shrink-0">{emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                interval === 0  ? 'text-emerald-400 bg-emerald-500/15' :
                interval <= 3  ? 'text-sky-400 bg-sky-500/15' :
                interval <= 14 ? 'text-amber-400 bg-amber-500/15' :
                'text-orange-400 bg-orange-500/15'
              }`}>
                Day {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Switch */}
      <div className="flex gap-1 border-b border-white/8">
        {tabs.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
              activeTab === id
                ? 'border-primary-500 text-primary-300'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* Daily Revision */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-400">Aaj revise karne ke liye topics — yesterday ke lessons + older ones</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_REVISION_TOPICS.map(({ title, day, emoji, level, reviewed }) => (
              <div
                key={day}
                className={`card p-4 flex items-center gap-3 ${reviewed ? 'opacity-60' : 'hover:border-white/15'} transition-all`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                  reviewed ? 'bg-accent-500/15' : 'bg-white/5'
                }`}>
                  {reviewed ? '✅' : emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-bold text-primary-400">Day {day}</span>
                    <span className="text-[10px] text-slate-500">{level}</span>
                  </div>
                  <h3 className="font-semibold text-white text-sm line-clamp-1">{title}</h3>
                </div>
                {!reviewed ? (
                  <Link href={`/practice/day-${day}`}
                    className="btn-primary text-xs px-3 py-1.5 shrink-0 flex items-center gap-1">
                    <Zap size={11} /> Revise
                  </Link>
                ) : (
                  <span className="text-xs text-accent-400 shrink-0">Done ✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          <Link href="/revision/weekly" className="card p-5 hover:border-primary-500/30 transition-all flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📆</span>
              <div>
                <h3 className="font-bold text-white">This Week's Revision</h3>
                <p className="text-xs text-slate-500">Days 1–7 topics — full review with practice quiz</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-primary-400 shrink-0" />
          </Link>
          {doneTopics.map(topic => (
            <div key={topic.day} className="card p-4 flex items-center gap-3">
              <span className="text-xl">{topic.emoji}</span>
              <div className="flex-1">
                <span className="text-xs font-bold text-primary-400">Day {topic.day}</span>
                <h4 className="font-semibold text-white text-sm">{topic.title}</h4>
              </div>
              <Link href={`/practice/day-${topic.day}`}
                className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                <RotateCcw size={11} /> Revise
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Monthly */}
      {activeTab === 'monthly' && (
        <div className="space-y-4">
          <Link href="/revision/monthly" className="card p-5 hover:border-primary-500/30 transition-all flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🗃️</span>
              <div>
                <h3 className="font-bold text-white">Monthly Review Test</h3>
                <p className="text-xs text-slate-500">50 mixed questions from all covered topics</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-primary-400 shrink-0" />
          </Link>
          <div className="card p-5 border-amber-500/15 bg-amber-500/5">
            <h3 className="font-semibold text-white mb-2">📊 Monthly Progress</h3>
            <p className="text-sm text-slate-400">
              {currentDay > 1
                ? `You have completed ${currentDay - 1} out of 75 days this month. Keep the momentum going!`
                : 'Start your 75-day journey today — Day 1 awaits!'}
            </p>
            <Link href={`/75-days-challenge/${currentDay}`} className="btn-primary text-xs mt-3 inline-flex items-center gap-1.5">
              Continue Day {currentDay} <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
