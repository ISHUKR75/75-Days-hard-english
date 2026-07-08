'use client';
// 75 Days Challenge Overview Page — Beautiful hero + 75-day grid with progress ring
// Framer Motion stagger, week dividers, filter bar, completion status

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, CheckCircle2, Lock, Play, RotateCcw,
  Trophy, Target, Flame, Star, Filter, Zap, BookOpen,
  Mic, PenTool, TrendingUp, Award, ChevronRight,
} from 'lucide-react';
import DAYS_75_TOPICS, { TOPIC_TYPES, getWeeklyTopics } from '@/lib/topics';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ─── Constants ───────────────────────────────────────────────
const FILTERS = [
  { key: 'all',        label: '🌟 All Days' },
  { key: 'grammar',    label: '📚 Grammar' },
  { key: 'vocabulary', label: '📖 Vocabulary' },
  { key: 'spoken',     label: '🗣️ Speaking' },
  { key: 'writing',    label: '✍️ Writing' },
  { key: 'revision',   label: '🔄 Revision' },
  { key: 'practice',   label: '🎯 Practice' },
];

const TYPE_BG = {
  grammar:    'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30',
  spoken:     'from-purple-500/20 to-purple-500/5 border-purple-500/30',
  vocabulary: 'from-amber-500/20 to-amber-500/5 border-amber-500/30',
  writing:    'from-rose-500/20 to-rose-500/5 border-rose-500/30',
  practice:   'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
  revision:   'from-orange-500/20 to-orange-500/5 border-orange-500/30',
  'real-life':'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
};

const TYPE_TEXT = {
  grammar:    'text-indigo-300',
  spoken:     'text-purple-300',
  vocabulary: 'text-amber-300',
  writing:    'text-rose-300',
  practice:   'text-emerald-300',
  revision:   'text-orange-300',
  'real-life':'text-cyan-300',
};

const CEFR_COLOR = {
  A0: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  A1: 'bg-green-500/20 text-green-300 border-green-500/30',
  A2: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  B1: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  B2: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  C1: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  C2: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

// ─── Progress Ring SVG ────────────────────────────────────────
function ProgressRing({ completed, total, size = 140 }) {
  const pct     = completed / total;
  const radius  = (size - 20) / 2;
  const circ    = 2 * Math.PI * radius;
  const offset  = circ * (1 - pct);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10} />
        {/* Progress */}
        <circle
          cx={size/2} cy={size/2} r={radius} fill="none"
          stroke="url(#ringGrad)" strokeWidth={10}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white">{completed}</span>
        <span className="text-xs text-slate-500">/ {total} days</span>
      </div>
    </div>
  );
}

// ─── Day Card ────────────────────────────────────────────────
function DayCard({ topic, isCompleted, isCurrent, isLocked, index }) {
  const typeBg   = TYPE_BG[topic.type]   || 'from-slate-500/10 to-slate-500/5 border-slate-500/20';
  const typeText = TYPE_TEXT[topic.type] || 'text-slate-400';

  const cardClass = [
    'relative group rounded-2xl border p-3 flex flex-col items-center gap-1.5 text-center transition-all duration-200',
    isCompleted ? 'bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50 hover:scale-105 cursor-pointer' : '',
    isCurrent   ? 'bg-gradient-to-b from-primary-500/20 to-primary-500/5 border-primary-500/50 ring-2 ring-primary-500/30 shadow-lg shadow-primary-500/10 cursor-pointer scale-105' : '',
    isLocked    ? 'bg-white/2 border-white/6 opacity-40 cursor-not-allowed' : '',
    !isCompleted && !isCurrent && !isLocked ? `bg-gradient-to-b ${typeBg} hover:opacity-80 hover:scale-105 cursor-pointer` : '',
  ].join(' ');

  const inner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.012, duration: 0.3 }}
      className={cardClass}
    >
      {/* Status badge */}
      <div className="absolute top-1.5 right-1.5">
        {isCompleted && <CheckCircle2 size={12} className="text-emerald-400" />}
        {isCurrent   && <motion.div animate={{ scale: [1,1.3,1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Play size={11} className="text-primary-400" fill="currentColor" /></motion.div>}
        {isLocked    && <Lock size={11} className="text-slate-600" />}
      </div>

      {/* Day number */}
      <span className={`text-[9px] font-black tracking-wide ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-primary-300' : 'text-slate-500'}`}>
        {topic.day}
      </span>

      {/* Emoji */}
      <span className="text-base leading-none">{topic.emoji}</span>

      {/* CEFR badge */}
      <span className={`text-[8px] font-bold px-1 py-0.5 rounded border ${CEFR_COLOR[topic.cefr] || 'bg-slate-500/20 text-slate-400 border-slate-500/30'}`}>
        {topic.cefr}
      </span>
    </motion.div>
  );

  if (isLocked) return inner;
  return <Link href={`/75-days-challenge/${topic.day}`}>{inner}</Link>;
}

// ─── Week Divider ─────────────────────────────────────────────
function WeekDivider({ weekNum, days, completedUpTo }) {
  const weekCompleted = days.filter(d => d.day < completedUpTo).length;
  const pct = Math.round((weekCompleted / days.length) * 100);
  return (
    <div className="col-span-full">
      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-white/8" />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8">
          <Calendar size={11} className="text-slate-500" />
          <span className="text-xs font-bold text-slate-400">Week {weekNum}</span>
          <span className="text-[10px] text-slate-600">• Days {days[0].day}–{days[days.length-1].day}</span>
          {pct === 100 && <span className="text-[10px] text-emerald-400 font-bold">✓ Done</span>}
          {pct > 0 && pct < 100 && <span className="text-[10px] text-primary-400">{pct}%</span>}
        </div>
        <div className="flex-1 h-px bg-white/8" />
      </div>
    </div>
  );
}

// ─── Stats Card ───────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xl font-black text-white">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function Days75Page() {
  const [activeFilter, setActiveFilter] = useState('all');

  const { totalLessonsCompleted, streak, xp, level } = useUserStore();
  const { dailyActivity } = useProgressStore();

  const completedDays = Math.min(totalLessonsCompleted, 75);
  const currentDay    = Math.min(completedDays + 1, 75);
  const progress      = Math.round((completedDays / 75) * 100);
  const weeks         = getWeeklyTopics();

  // Compute heatmap activity days
  const activeDaysCount = Object.keys(dailyActivity || {}).length;

  const filteredTopics = DAYS_75_TOPICS.filter(t =>
    activeFilter === 'all' || t.type === activeFilter
  );

  // Group filtered topics by week for week-divider display
  const weekGroups = weeks.map(w => ({
    ...w,
    filtered: w.days.filter(d => activeFilter === 'all' || d.type === activeFilter),
  })).filter(w => w.filtered.length > 0);

  const showingAll = activeFilter === 'all';

  return (
    <div className="space-y-8 pb-12">

      {/* ── Hero Section ─────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/40 border border-white/10 p-8">
        {/* Glow orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Progress Ring */}
          <div className="shrink-0">
            <ProgressRing completed={completedDays} total={75} size={150} />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <span className="text-3xl">📅</span>
              <h1 className="text-3xl md:text-4xl font-black text-white">75 Days Challenge</h1>
            </div>
            <p className="text-slate-400 text-lg mb-4 max-w-lg">
              Master English from <span className="text-emerald-400 font-semibold">A0 Beginner</span> to{' '}
              <span className="text-violet-400 font-semibold">C1 Advanced</span> — one day at a time.
            </p>

            {/* Progress bar */}
            <div className="max-w-md mb-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>{completedDays} days completed</span>
                <span className="font-bold text-white">{progress}%</span>
              </div>
              <div className="h-3 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{ boxShadow: '0 0 12px rgba(99,102,241,0.4)' }}
                />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href={`/75-days-challenge/${currentDay}`}
                className="btn-primary flex items-center gap-2 px-5 py-2.5"
              >
                <Play size={15} fill="currentColor" />
                Continue Day {currentDay}
              </Link>
              <Link href="/revision" className="btn-secondary flex items-center gap-2 px-5 py-2.5">
                <RotateCcw size={15} />
                Revision Hub
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="shrink-0 grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="card p-3 text-center min-w-[90px]">
              <p className="text-2xl font-black text-orange-400">🔥{streak}</p>
              <p className="text-[10px] text-slate-500 mt-1">Day Streak</p>
            </div>
            <div className="card p-3 text-center min-w-[90px]">
              <p className="text-2xl font-black gradient-text">{xp.toLocaleString()}</p>
              <p className="text-[10px] text-slate-500 mt-1">Total XP</p>
            </div>
            <div className="card p-3 text-center min-w-[90px]">
              <p className="text-2xl font-black text-violet-400">Lv.{level}</p>
              <p className="text-[10px] text-slate-500 mt-1">Your Level</p>
            </div>
            <div className="card p-3 text-center min-w-[90px]">
              <p className="text-2xl font-black text-teal-400">{activeDaysCount}</p>
              <p className="text-[10px] text-slate-500 mt-1">Active Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats Row ──────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={BookOpen}    label="Grammar Days"    value={DAYS_75_TOPICS.filter(t=>t.type==='grammar').length}    color="bg-indigo-500/15 text-indigo-400" />
        <StatCard icon={Target}      label="Vocabulary Days" value={DAYS_75_TOPICS.filter(t=>t.type==='vocabulary').length} color="bg-amber-500/15 text-amber-400" />
        <StatCard icon={Mic}         label="Speaking Days"   value={DAYS_75_TOPICS.filter(t=>t.type==='spoken').length}     color="bg-purple-500/15 text-purple-400" />
        <StatCard icon={RotateCcw}   label="Revision Days"   value={DAYS_75_TOPICS.filter(t=>t.type==='revision').length}   color="bg-orange-500/15 text-orange-400" />
      </div>

      {/* ── Filter Bar ───────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <Filter size={14} className="text-slate-600 shrink-0" />
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 ${
              activeFilter === f.key
                ? 'bg-primary-500/20 text-primary-300 border-primary-500/40'
                : 'bg-white/4 text-slate-500 border-white/8 hover:text-slate-300 hover:border-white/15'
            }`}
          >
            {f.label}
          </button>
        ))}
        {activeFilter !== 'all' && (
          <span className="text-xs text-slate-500 ml-2 shrink-0">
            {filteredTopics.length} days
          </span>
        )}
      </div>

      {/* ── Days Grid with Week Dividers ─────────────────── */}
      {showingAll ? (
        /* Show with week dividers */
        <div className="space-y-2">
          {weekGroups.map(({ week, days, filtered }) => (
            <div key={week}>
              {/* Week header */}
              <div className="flex items-center gap-3 py-3">
                <div className="flex-1 h-px bg-white/8" />
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
                  <Calendar size={12} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-400">Week {week}</span>
                  <span className="text-[10px] text-slate-600">Days {days[0].day}–{days[days.length-1].day}</span>
                  {days.every(d => d.day < currentDay) && (
                    <span className="text-[10px] text-emerald-400 font-bold ml-1">✓ Complete</span>
                  )}
                </div>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Day cards row */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2.5">
                {days.map((topic, idx) => (
                  <DayCard
                    key={topic.day}
                    topic={topic}
                    index={(week - 1) * 7 + idx}
                    isCompleted={topic.day < currentDay}
                    isCurrent={topic.day === currentDay}
                    isLocked={topic.day > currentDay}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Filtered view — flat grid */
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2.5">
          <AnimatePresence>
            {filteredTopics.map((topic, idx) => (
              <DayCard
                key={topic.day}
                topic={topic}
                index={idx}
                isCompleted={topic.day < currentDay}
                isCurrent={topic.day === currentDay}
                isLocked={topic.day > currentDay}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Legend ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        {[
          { cls: 'bg-emerald-500/30 border border-emerald-500/40',  label: 'Completed' },
          { cls: 'bg-primary-500/30 border border-primary-500/50',  label: 'Current Day' },
          { cls: 'bg-white/5 border border-white/8 opacity-50',     label: 'Locked' },
          { cls: 'bg-orange-500/20 border border-orange-500/30',    label: 'Revision Day' },
          { cls: 'bg-amber-500/20 border border-amber-500/30',      label: 'Vocabulary Day' },
        ].map(({ cls, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 rounded-lg ${cls}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Completion Banner ────────────────────────────── */}
      {completedDays >= 75 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-amber-500/5 text-center"
        >
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-2xl font-black text-white mb-2">You Completed the 75 Days Challenge!</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Incredible commitment! You've gone from A0 to C1 in just 75 days.
            Claim your personalized certificate of achievement.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/75-days-challenge/certificate" className="btn-primary px-8 py-3 flex items-center gap-2">
              <Award size={16} /> Get Certificate 🎓
            </Link>
            <Link href="/assessment/mock-test" className="btn-secondary px-6 py-3 flex items-center gap-2">
              <Target size={16} /> Take Final Mock Test
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
