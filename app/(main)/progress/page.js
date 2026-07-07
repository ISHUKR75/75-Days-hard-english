'use client';
// Progress Page — Full learning progress with streaks, level, XP, and topic breakdown

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp, Flame, Trophy, Target, Zap, BookOpen,
  Star, Calendar, ChevronRight, CheckCircle2, Lock,
  BarChart2, ArrowRight, Clock,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from 'recharts';
import DAYS_75_TOPICS from '@/lib/topics';
import useUserStore    from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ============================================================
// Custom Tooltip
// ============================================================
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-900 border border-white/10 rounded-xl px-3 py-2 text-xs">
      <p className="font-bold text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

// ============================================================
// Progress Page
// ============================================================
export default function ProgressPage() {
  const [hoverDay, setHoverDay] = useState(null);

  const {
    xp, level, levelXP, levelXPRequired, streak, longestStreak,
    totalLessonsCompleted, totalQuestionsAttempted, totalCorrectAnswers,
    coins, badges, getLevelProgress, getAccuracy,
  } = useUserStore();

  const { getHeatmapData } = useProgressStore();

  const accuracy      = getAccuracy();
  const levelProgress = getLevelProgress();
  const currentDay    = Math.min(totalLessonsCompleted + 1, 75);
  const heatmapData   = getHeatmapData();

  // XP to next level
  const xpRemaining = levelXPRequired - levelXP;

  // Weekly chart (last 7 days from heatmap)
  const weeklyChart = heatmapData.slice(-7).map((d) => ({
    day: new Date(d.date).toLocaleDateString('en', { weekday: 'short' }),
    questions: d.count,
    level:     d.level,
  }));

  // Challenge completion %
  const challengePercent = Math.round(((currentDay - 1) / 75) * 100);

  // Topic status
  const topicStatus = DAYS_75_TOPICS.map(t => ({
    ...t,
    status: t.day < currentDay ? 'done' : t.day === currentDay ? 'current' : 'locked',
  }));

  const done    = topicStatus.filter(t => t.status === 'done').length;
  const locked  = topicStatus.filter(t => t.status === 'locked').length;

  return (
    <div className="space-y-6">

      {/* ── Header ───────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <TrendingUp size={28} className="text-primary-400" /> My Progress
        </h1>
        <p className="text-slate-500 mt-0.5">Detailed progress tracker — sab kuch ek jagah</p>
      </div>

      {/* ── Hero Stats ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Level */}
        <div className="card p-5 col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Star size={22} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Current Level</p>
              <p className="text-3xl font-black text-white">Lv.{level}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>{levelXP} XP</span>
              <span>{levelXPRequired} XP needed</span>
            </div>
            <div className="h-2 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-600">{xpRemaining} XP to next level</p>
          </div>
        </div>

        {/* Streak */}
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center mb-3">
            <Flame size={18} className="text-orange-400 animate-streak-fire" />
          </div>
          <p className="text-3xl font-black text-white">{streak}</p>
          <p className="text-xs text-slate-500">Day Streak</p>
          <p className="text-[10px] text-slate-600 mt-1">Best: {longestStreak} days</p>
        </div>

        {/* Total XP */}
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center mb-3">
            <Zap size={18} className="text-violet-400" />
          </div>
          <p className="text-3xl font-black text-white">{xp.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Total XP</p>
          <p className="text-[10px] text-slate-600 mt-1">{coins.toLocaleString()} coins</p>
        </div>

        {/* Accuracy */}
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-accent-500/15 flex items-center justify-center mb-3">
            <Target size={18} className="text-accent-400" />
          </div>
          <p className="text-3xl font-black text-white">{accuracy}%</p>
          <p className="text-xs text-slate-500">Accuracy</p>
          <p className="text-[10px] text-slate-600 mt-1">{totalQuestionsAttempted} questions</p>
        </div>
      </div>

      {/* ── 75-Day Challenge Progress ─────────────────────── */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              <Calendar size={16} className="text-primary-400" /> 75-Day Challenge
            </h3>
            <p className="text-xs text-slate-500">Day {currentDay} of 75 — {challengePercent}% complete</p>
          </div>
          <Link href="/75-days-challenge" className="btn-secondary text-xs flex items-center gap-1.5 px-3 py-1.5">
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Day 1</span>
            <span className="text-primary-400 font-semibold">Day {currentDay} ← You are here</span>
            <span>Day 75</span>
          </div>
          <div className="h-3 rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transition-all duration-1000"
              style={{ width: `${challengePercent}%` }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Completed', value: done, color: 'text-accent-400' },
            { label: 'Remaining', value: locked, color: 'text-slate-400' },
            { label: 'Days Left', value: 75 - (currentDay - 1), color: 'text-primary-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-3 rounded-xl bg-white/3 border border-white/5">
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Activity Heatmap ──────────────────────────────── */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white">Learning Heatmap</h3>
          <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg">Last 12 weeks</span>
        </div>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
          {Array.from({ length: 12 }, (_, wk) => (
            <div key={wk} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, dy) => {
                const idx = wk * 7 + dy;
                const cell = heatmapData[idx];
                const lvl  = cell?.level ?? 0;
                const bg   = ['bg-white/4','bg-primary-900/60','bg-primary-700/60','bg-primary-500/60','bg-primary-400/80'][lvl];
                return (
                  <div
                    key={dy}
                    title={cell ? `${cell.date}: ${cell.count} questions` : 'No data'}
                    className={`w-full aspect-square rounded-sm ${bg} hover:scale-125 transition-transform cursor-default`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
          <span>Less</span>
          {['bg-white/4','bg-primary-900/60','bg-primary-700/60','bg-primary-500/60','bg-primary-400/80'].map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* ── Weekly Activity Chart ─────────────────────────── */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-5">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={weeklyChart} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="qGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="questions" name="Questions" stroke="#6366f1" strokeWidth={2} fill="url(#qGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Badges ────────────────────────────────────────── */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Trophy size={16} className="text-amber-400" /> Badges & Achievements
          </h3>
          <span className="text-xs text-slate-500">{badges?.length || 0} earned</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
          {[
            { emoji: '🔥', label: '7-day streak',    earned: streak >= 7 },
            { emoji: '📚', label: 'First lesson',     earned: totalLessonsCompleted >= 1 },
            { emoji: '🎯', label: '100 questions',    earned: totalQuestionsAttempted >= 100 },
            { emoji: '⚡', label: '1000 XP',          earned: xp >= 1000 },
            { emoji: '🌟', label: '90% accuracy',     earned: accuracy >= 90 },
            { emoji: '📖', label: '10 days done',     earned: totalLessonsCompleted >= 10 },
            { emoji: '🏆', label: '25 days done',     earned: totalLessonsCompleted >= 25 },
            { emoji: '👑', label: 'Course complete',  earned: totalLessonsCompleted >= 75 },
          ].map(({ emoji, label, earned }) => (
            <div
              key={label}
              title={label}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all ${
                earned ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/3 border border-white/5 opacity-40'
              }`}
            >
              <span className={`text-2xl ${!earned && 'grayscale'}`}>{emoji}</span>
              <p className="text-[9px] text-slate-500 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────── */}
      <div className="card p-5 border-primary-500/20 bg-primary-500/5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-bold text-white">Keep Going! 💪</h3>
          <p className="text-sm text-slate-500">
            {75 - (currentDay - 1)} more days to complete the 75-day challenge!
          </p>
        </div>
        <Link href={`/75-days-challenge/${currentDay}`} className="btn-primary flex items-center gap-2">
          Day {currentDay} — Start <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
