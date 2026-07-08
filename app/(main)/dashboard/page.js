'use client';
// Dashboard Page — Main home screen after login
// Shows stats, progress, daily goals, recent activity, and recommendations

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame, Zap, Trophy, Target, BookOpen, ArrowRight,
  TrendingUp, Calendar, Star, CheckCircle2, Clock,
  Mic, Brain, BarChart2, Play, Lock, ChevronRight,
  PenTool, Volume2, MessageSquare,
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import useUserStore    from '@/store/userStore';
import useProgressStore from '@/store/progressStore';
import DAYS_75_TOPICS   from '@/lib/topics';

// Day labels for weekly chart
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ============================================================
// Custom Recharts Tooltip
// ============================================================
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-xl text-xs">
      <p className="font-bold text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ============================================================
// Dashboard Page Component
// ============================================================
export default function DashboardPage() {
  const {
    user, xp, coins, streak, level, levelXP, levelXPRequired,
    totalQuestionsAttempted, totalCorrectAnswers, totalLessonsCompleted,
    getLevelProgress, getAccuracy, getDailyGoalProgress, dailyGoal, dailyProgress,
  } = useUserStore();
  const { topics: topicProgress, getHeatmapData, dailyActivity } = useProgressStore();

  // Heatmap data (last 12 weeks shown)
  const heatmapData = getHeatmapData().slice(-84); // 12 weeks × 7 days
  const accuracy      = getAccuracy();
  const levelProgress = getLevelProgress();
  const dailyPercent  = getDailyGoalProgress();

  // Build real weekly data from dailyActivity store
  const weeklyData = DAY_LABELS.map((label, i) => {
    const d = new Date();
    const offset = (d.getDay() - i + 7) % 7;
    d.setDate(d.getDate() - offset);
    const key = d.toISOString().slice(0, 10);
    const act = (dailyActivity || {})[key] || {};
    return {
      day:       label,
      questions: act.questionsAttempted || 0,
      xp:        act.xpEarned           || 0,
      minutes:   act.timeSpent          || 0,
    };
  });

  // Current day (1-75)
  const currentDay = Math.min(totalLessonsCompleted + 1, 75);
  const currentTopic = DAYS_75_TOPICS[currentDay - 1];

  // Next 3 recommended topics
  const nextTopics = DAYS_75_TOPICS.slice(currentDay - 1, currentDay + 2);

  return (
    <div className="space-y-6">

      {/* ── Welcome Header ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">
            Namaste, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {streak > 0
              ? `🔥 ${streak}-day streak! Keep going!`
              : 'Start studying to build your streak!'}
          </p>
        </div>
        <Link href={`/75-days-challenge/${currentDay}`}
          className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2.5 shrink-0">
          Continue Day {currentDay}
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* ── Stats Cards Row ───────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
              <Flame size={18} className="text-orange-400 animate-streak-fire" />
            </div>
            <span className="text-xs text-slate-500">Current</span>
          </div>
          <p className="text-3xl font-black text-white">{streak}</p>
          <p className="text-xs text-slate-500 mt-0.5">Day Streak 🔥</p>
        </div>

        {/* XP & Level */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center">
              <Zap size={18} className="text-violet-400" />
            </div>
            <span className="text-xs text-violet-300 font-bold">Lv.{level}</span>
          </div>
          <p className="text-3xl font-black text-white">{xp.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total XP</p>
          {/* Level progress bar */}
          <div className="mt-3 h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-primary-500 transition-all duration-1000"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-600 mt-1">{levelXP} / {levelXPRequired} XP</p>
        </div>

        {/* Accuracy */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500/15 flex items-center justify-center">
              <Target size={18} className="text-accent-400" />
            </div>
            <span className="text-xs text-slate-500">{totalQuestionsAttempted} Q</span>
          </div>
          <p className="text-3xl font-black text-white">{accuracy}%</p>
          <p className="text-xs text-slate-500 mt-0.5">Accuracy</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400 transition-all duration-1000"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        {/* Coins */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
              <span className="text-lg">🪙</span>
            </div>
            <span className="text-xs text-slate-500">Earned</span>
          </div>
          <p className="text-3xl font-black text-white">{coins.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Coins</p>
        </div>
      </div>

      {/* ── Daily Goal + Current Topic ────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Goal */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white">Today's Goal</h3>
              <p className="text-xs text-slate-500">{dailyProgress} / {dailyGoal} minutes studied</p>
            </div>
            <div className="relative w-14 h-14">
              {/* Circular progress */}
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle
                  cx="28" cy="28" r="24" fill="none"
                  stroke="url(#goalGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - dailyPercent / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
                />
                <defs>
                  <linearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                {dailyPercent}%
              </span>
            </div>
          </div>

          {/* Habit pills */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: BookOpen, label: 'Learn',    done: false },
              { icon: Target,   label: 'Practice', done: false },
              { icon: Mic,      label: 'Speak',    done: false },
            ].map(({ icon: Icon, label, done }) => (
              <div key={label} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                done
                  ? 'bg-accent-500/10 border-accent-500/30 text-accent-300'
                  : 'bg-white/3 border-white/8 text-slate-500'
              }`}>
                {done
                  ? <CheckCircle2 size={18} className="text-accent-400" />
                  : <Icon size={18} className="text-slate-600" />
                }
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Current Topic */}
        {currentTopic && (
          <Link href={`/75-days-challenge/${currentDay}`} className="card p-5 group hover:border-primary-500/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-500/15 border border-primary-500/20 flex items-center justify-center text-2xl shrink-0">
                {currentTopic.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-primary text-xs">Day {currentDay}</span>
                  <span className="text-xs text-slate-500">{currentTopic.cefr}</span>
                </div>
                <h3 className="font-bold text-white text-base mb-1 group-hover:text-primary-300 transition-colors">
                  {currentTopic.title}
                </h3>
                <p className="text-xs text-slate-500 capitalize">{currentTopic.type} • {currentTopic.difficulty}</p>
              </div>
              <ChevronRight size={18} className="text-slate-600 group-hover:text-primary-400 transition-colors shrink-0 mt-1" />
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: '0%' }} />
            </div>
            <p className="text-xs text-slate-600 mt-1">0% complete — Start learning!</p>
          </Link>
        )}
      </div>

      {/* ── Activity Chart + Heatmap ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Activity Chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Weekly Activity</h3>
            <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="questions" name="Questions" stroke="#6366f1" strokeWidth={2} fill="url(#xpGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Heatmap */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">Learning Heatmap</h3>
            <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg">Last 12 weeks</span>
          </div>
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
            {/* Group by week — 12 columns × 7 rows */}
            {Array.from({ length: 12 }, (_, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1">
                {Array.from({ length: 7 }, (_, dayIdx) => {
                  const cellIdx = weekIdx * 7 + dayIdx;
                  const cell = heatmapData[cellIdx];
                  const level = cell?.level ?? 0;
                  const bg = [
                    'bg-white/4',
                    'bg-primary-900/60',
                    'bg-primary-700/60',
                    'bg-primary-500/60',
                    'bg-primary-400/80',
                  ][level];
                  return (
                    <div
                      key={dayIdx}
                      title={cell ? `${cell.date}: ${cell.count} questions` : ''}
                      className={`w-full aspect-square rounded-sm ${bg} hover:scale-125 transition-transform cursor-default`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs text-slate-600">
            <span>Less</span>
            {['bg-white/4', 'bg-primary-900/60', 'bg-primary-700/60', 'bg-primary-500/60', 'bg-primary-400/80'].map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ── Continue Learning ──────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Continue Learning</h2>
          <Link href="/75-days-challenge" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {nextTopics.map((topic, i) => {
            const isLocked = topic.day > currentDay;
            const isCurrent = topic.day === currentDay;
            return (
              <Link
                key={topic.day}
                href={isLocked ? '#' : `/75-days-challenge/${topic.day}`}
                className={`card p-5 group transition-all ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-500/30 cursor-pointer'
                } ${isCurrent ? 'border-primary-500/30 bg-primary-500/5' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`badge ${isCurrent ? 'badge-primary' : 'text-slate-500 bg-white/5 border border-white/8'}`}>
                    Day {topic.day}
                  </span>
                  {isLocked
                    ? <Lock size={14} className="text-slate-600" />
                    : isCurrent
                    ? <Play size={14} className="text-primary-400" fill="currentColor" />
                    : <CheckCircle2 size={14} className="text-accent-400" />
                  }
                </div>
                <div className="text-2xl mb-2">{topic.emoji}</div>
                <h3 className={`font-bold text-sm mb-1 ${isCurrent ? 'text-primary-300' : 'text-white'} group-hover:text-primary-300 transition-colors`}>
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 capitalize">{topic.type}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Quick Access ─────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Practice</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Target,   label: 'Practice Quiz',   href: '/assessment',        color: 'from-indigo-500 to-blue-500' },
            { icon: Mic,      label: 'Speaking',         href: '/speaking',          color: 'from-purple-500 to-pink-500' },
            { icon: Brain,    label: 'Brain Training',   href: '/brain-training',    color: 'from-violet-500 to-purple-500' },
            { icon: MessageSquare, label: 'AI Tutor',   href: '/ai-tutor',          color: 'from-cyan-500 to-teal-500' },
          ].map(({ icon: Icon, label, href, color }) => (
            <Link key={label} href={href}
              className="card p-4 flex flex-col items-center gap-3 text-center hover:border-white/15 group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Motivational Footer ───────────────────────────── */}
      <div className="card p-5 border-primary-500/20 bg-primary-500/5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💪</span>
          <div>
            <p className="font-bold text-white text-sm">
              {streak === 0
                ? "Start today — your first streak begins now!"
                : `${streak} days strong! Don't break the chain!`}
            </p>
            <p className="text-xs text-slate-500">
              {75 - (currentDay - 1)} more days to complete the challenge
            </p>
          </div>
        </div>
        <Link href={`/75-days-challenge/${currentDay}`}
          className="btn-primary text-sm px-4 py-2 shrink-0">
          Study Now →
        </Link>
      </div>
    </div>
  );
}
