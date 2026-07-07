'use client';
// 75 Days Challenge Overview Page — Grid of all 75 days
// Shows completion status, current day highlighted, locked future days

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar, CheckCircle2, Lock, Play, RotateCcw,
  Trophy, Target, Flame, Star, Filter,
} from 'lucide-react';
import DAYS_75_TOPICS, { TOPIC_TYPES, DIFFICULTY, getWeeklyTopics } from '@/lib/topics';
import useUserStore    from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ============================================================
// Heatmap / Type colors
// ============================================================
const TYPE_COLORS = {
  grammar:       'text-indigo-400',
  spoken:        'text-purple-400',
  pronunciation: 'text-cyan-400',
  vocabulary:    'text-amber-400',
  writing:       'text-rose-400',
  practice:      'text-emerald-400',
  revision:      'text-orange-400',
  professional:  'text-teal-400',
};

const TYPE_LABELS = {
  grammar:       'Grammar',
  spoken:        'Spoken',
  pronunciation: 'Pronunciation',
  vocabulary:    'Vocabulary',
  writing:       'Writing',
  practice:      'Practice',
  revision:      'Revision ✅',
  professional:  'Professional',
};

// ============================================================
// 75 Days Challenge Page
// ============================================================
export default function Days75Page() {
  const [filter, setFilter] = useState('all'); // all | type | week
  const [selectedType, setSelectedType] = useState(null);

  const { totalLessonsCompleted, streak } = useUserStore();
  const { topics } = useProgressStore();

  // Current day (1–75)
  const currentDay = Math.min(totalLessonsCompleted + 1, 75);
  const completedDays = totalLessonsCompleted;

  // Filter topics
  const filteredTopics = DAYS_75_TOPICS.filter((t) => {
    if (selectedType && t.type !== selectedType) return false;
    return true;
  });

  // Progress %
  const progress = Math.round((completedDays / 75) * 100);

  return (
    <div className="space-y-6">

      {/* ── Page Header ──────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <span className="text-3xl">📅</span>
          75 Days Challenge
        </h1>
        <p className="text-slate-500">Complete all 75 days to master English — from beginner to professional.</p>
      </div>

      {/* ── Progress Overview ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall progress */}
        <div className="card p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white">Overall Progress</h3>
            <span className="text-2xl font-black gradient-text">{progress}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/8 overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-1000"
              style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(99,102,241,0.5)' }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{completedDays} days completed</span>
            <span>{75 - completedDays} days remaining</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="card p-5 flex flex-col justify-between">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Current Day</p>
              <p className="text-3xl font-black gradient-text">{currentDay}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Streak</p>
              <p className="text-3xl font-black text-orange-400">🔥{streak}</p>
            </div>
          </div>
          <Link href={`/75-days-challenge/${currentDay}`}
            className="btn-primary text-sm py-2.5 flex items-center justify-center gap-2 mt-3">
            <Play size={14} fill="currentColor" />
            Continue Day {currentDay}
          </Link>
        </div>
      </div>

      {/* ── Type Filter ───────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedType(null)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            !selectedType ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/8 hover:text-slate-300'
          }`}
        >
          <Filter size={12} /> All Days
        </button>
        {Object.entries(TYPE_LABELS).map(([type, label]) => (
          <button
            key={type}
            onClick={() => setSelectedType(selectedType === type ? null : type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedType === type
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                : 'bg-white/5 text-slate-500 border border-white/8 hover:text-slate-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Days Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2.5">
        {filteredTopics.map((topic) => {
          const isCompleted = topic.day < currentDay;
          const isCurrent   = topic.day === currentDay;
          const isLocked    = topic.day > currentDay;
          const isRevision  = topic.type === TOPIC_TYPES.REVISION;

          return (
            <Link
              key={topic.day}
              href={isLocked ? '#' : `/75-days-challenge/${topic.day}`}
              title={topic.title}
              className={`
                relative flex flex-col items-center justify-center rounded-xl border cursor-pointer
                transition-all duration-200 p-2 aspect-square text-center
                ${isCompleted ? 'bg-accent-500/10 border-accent-500/30 hover:border-accent-500/50' : ''}
                ${isCurrent  ? 'bg-primary-500/15 border-primary-500/40 shadow-glow-primary animate-pulse-slow' : ''}
                ${isLocked   ? 'bg-white/2 border-white/5 cursor-not-allowed opacity-40' : ''}
                ${isRevision && !isLocked && !isCurrent ? 'bg-orange-500/10 border-orange-500/25' : ''}
              `}
            >
              {/* Day number */}
              <span className={`text-[10px] font-bold ${
                isCurrent ? 'text-primary-300' : isCompleted ? 'text-accent-400' : 'text-slate-600'
              }`}>
                {topic.day}
              </span>

              {/* Emoji */}
              <span className="text-sm my-0.5">{topic.emoji}</span>

              {/* Status icon */}
              {isCompleted && <CheckCircle2 size={10} className="text-accent-400 absolute top-1 right-1" />}
              {isCurrent   && <Play         size={10} className="text-primary-400 absolute top-1 right-1" fill="currentColor" />}
              {isLocked    && <Lock         size={10} className="text-slate-700 absolute top-1 right-1" />}
            </Link>
          );
        })}
      </div>

      {/* ── Legend ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        {[
          { color: 'bg-accent-500/30',   label: 'Completed' },
          { color: 'bg-primary-500/30',  label: 'Current Day' },
          { color: 'bg-white/5',         label: 'Locked' },
          { color: 'bg-orange-500/20',   label: 'Revision' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-sm ${color}`} />
            {label}
          </div>
        ))}
      </div>

      {/* ── Certificate CTA ──────────────────────────────── */}
      {completedDays >= 75 && (
        <div className="card p-6 border-yellow-500/30 bg-yellow-500/5 text-center">
          <div className="text-4xl mb-3">🏆</div>
          <h3 className="text-xl font-black text-white mb-2">Congratulations!</h3>
          <p className="text-slate-400 mb-4">You completed all 75 days! Claim your certificate.</p>
          <Link href="/75-days-challenge/certificate" className="btn-primary px-8 py-3">
            Get Certificate 🎓
          </Link>
        </div>
      )}
    </div>
  );
}
