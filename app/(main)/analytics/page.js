'use client';
// Analytics Page — Detailed learning analytics with graphs

import { useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart2, TrendingUp, Target, Clock, Zap,
  Calendar, Brain, BookOpen, ArrowUp, ArrowDown,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import useUserStore    from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass px-3 py-2 rounded-xl text-xs border border-white/10">
      <p className="font-bold text-white mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

const COLORS = ['#6366f1', '#d946ef', '#10b981', '#f59e0b', '#f43f5e', '#06b6d4'];

// Topic type distribution
const TYPE_DATA = [
  { name: 'Grammar',    value: 32, color: '#6366f1' },
  { name: 'Vocabulary', value: 18, color: '#f59e0b' },
  { name: 'Spoken',     value: 10, color: '#d946ef' },
  { name: 'Writing',    value: 6,  color: '#f43f5e' },
  { name: 'Revision',   value: 5,  color: '#f97316' },
  { name: 'Other',      value: 4,  color: '#06b6d4' },
];

export default function AnalyticsPage() {
  const {
    xp, streak, level, totalQuestionsAttempted, totalCorrectAnswers,
    totalLessonsCompleted, totalTimeSpent, getAccuracy,
  } = useUserStore();
  const { dailyActivity, getHeatmapData } = useProgressStore();

  const accuracy = getAccuracy();

  // Build 30-day chart
  const chartData = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const act = dailyActivity?.[key];
      days.push({
        date: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        xp:        act?.xpEarned ?? 0,
        questions: act?.questionsAttempted ?? 0,
        correct:   act?.correctAnswers ?? 0,
        time:      act?.timeSpent ?? 0,
      });
    }
    return days;
  }, [dailyActivity]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <BarChart2 size={28} className="text-primary-400" /> Analytics
        </h1>
        <p className="text-slate-500">Deep dive into your learning data — kahan strong ho, kahan improve karo.</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total XP',        value: xp.toLocaleString(), icon: Zap,      color: 'text-violet-400',  change: null },
          { label: 'Accuracy',        value: `${accuracy}%`,       icon: Target,   color: 'text-emerald-400', change: null },
          { label: 'Lessons Done',    value: totalLessonsCompleted, icon: BookOpen, color: 'text-primary-400', change: null },
          { label: 'Time Studied',    value: `${totalTimeSpent}m`,  icon: Clock,    color: 'text-amber-400',   change: null },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <Icon size={18} className={color} />
              <span className="text-xs text-slate-600 bg-white/5 px-2 py-0.5 rounded-lg">All time</span>
            </div>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* XP Over Time */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Zap size={16} className="text-violet-400" /> XP Earned (Last 30 Days)
          </h3>
          <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg">Daily</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="xpArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} interval={6} />
            <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="xp" name="XP" stroke="#8b5cf6" strokeWidth={2} fill="url(#xpArea)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Questions + Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <Target size={16} className="text-emerald-400" /> Questions Per Day
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData.slice(-14)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="correct"   name="Correct"   fill="#10b981" radius={[3,3,0,0]} />
              <Bar dataKey="questions" name="Total"     fill="#6366f1" radius={[3,3,0,0]} opacity={0.4} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Topic distribution pie */}
        <div className="card p-5">
          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
            <Brain size={16} className="text-primary-400" /> Topic Distribution
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={TYPE_DATA} cx="50%" cy="50%" outerRadius={70} dataKey="value" nameKey="name">
                {TYPE_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.8} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} days`, name]} />
              <Legend iconSize={10} iconType="circle"
                formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '11px' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time studied chart */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2">
          <Clock size={16} className="text-amber-400" /> Time Studied (Minutes/Day)
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="date" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} interval={6} />
            <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="time" name="Minutes" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Start studying CTA */}
      {totalQuestionsAttempted === 0 && (
        <div className="card p-6 border-primary-500/20 bg-primary-500/5 text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="font-bold text-white mb-2">No data yet</h3>
          <p className="text-slate-400 text-sm mb-4">Start studying to see your analytics!</p>
          <Link href="/75-days-challenge/1" className="btn-primary inline-flex items-center gap-2">
            Start Day 1 →
          </Link>
        </div>
      )}
    </div>
  );
}
