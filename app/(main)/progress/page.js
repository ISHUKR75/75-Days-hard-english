'use client';
// ============================================================
// PROGRESS PAGE - Visual progress tracking with Recharts
// ============================================================

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2, TrendingUp, Trophy, Target, Flame, Star,
  BookOpen, Mic, PenTool, Volume2, Brain, Calendar, Zap,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend,
} from 'recharts';
import useProgressStore from '@/store/progressStore';
import useUserStore from '@/store/userStore';
import CountUp from 'react-countup';

// ── Mock weekly data (would come from progressStore in production) ──
const WEEKLY_DATA = [
  { day: 'Mon', grammar: 45, vocab: 30, speaking: 20, total: 95 },
  { day: 'Tue', grammar: 60, vocab: 40, speaking: 35, total: 135 },
  { day: 'Wed', grammar: 35, vocab: 55, speaking: 25, total: 115 },
  { day: 'Thu', grammar: 70, vocab: 45, speaking: 40, total: 155 },
  { day: 'Fri', grammar: 50, vocab: 60, speaking: 30, total: 140 },
  { day: 'Sat', grammar: 80, vocab: 70, speaking: 55, total: 205 },
  { day: 'Sun', grammar: 40, vocab: 35, speaking: 15, total: 90 },
];

// ── Category mastery data ──
const MASTERY_DATA = [
  { subject: 'Grammar', A: 72, fullMark: 100 },
  { subject: 'Vocabulary', A: 58, fullMark: 100 },
  { subject: 'Speaking', A: 45, fullMark: 100 },
  { subject: 'Writing', A: 38, fullMark: 100 },
  { subject: 'Listening', A: 52, fullMark: 100 },
  { subject: 'Pronunciation', A: 41, fullMark: 100 },
];

// ── Monthly streak data ──
const MONTHLY_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  minutes: Math.floor(Math.random() * 60) + 10,
  questions: Math.floor(Math.random() * 100) + 20,
}));

const STAT_CARDS = [
  { label: 'Questions Solved', value: 2847, icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { label: 'Current Streak', value: 12, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/10', suffix: ' days' },
  { label: 'Topics Completed', value: 47, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10', suffix: '/275' },
  { label: 'Total Points', value: 15420, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { label: 'Study Hours', value: 38, icon: Calendar, color: 'text-violet-400', bg: 'bg-violet-500/10', suffix: ' hrs' },
  { label: 'Accuracy', value: 82, icon: TrendingUp, color: 'text-pink-400', bg: 'bg-pink-500/10', suffix: '%' },
];

export default function ProgressPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <BarChart2 className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white">My Progress</h1>
            <p className="text-white/70 mt-1">🇮🇳 अपनी learning journey को track करो!</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CARDS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={`${s.bg} rounded-2xl p-4 border border-white/5`}>
              <Icon size={20} className={s.color} />
              <div className={`text-2xl font-black ${s.color} mt-2`}>
                <CountUp end={s.value} duration={2} />{s.suffix || ''}
              </div>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance Area Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-indigo-400" /> Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={WEEKLY_DATA}>
              <defs>
                <linearGradient id="colorGrammar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVocab" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#475569" fontSize={12} />
              <YAxis stroke="#475569" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '13px' }} />
              <Legend />
              <Area type="monotone" dataKey="grammar" stroke="#818cf8" fillOpacity={1} fill="url(#colorGrammar)" strokeWidth={2} />
              <Area type="monotone" dataKey="vocab" stroke="#34d399" fillOpacity={1} fill="url(#colorVocab)" strokeWidth={2} />
              <Area type="monotone" dataKey="speaking" stroke="#f472b6" fillOpacity={0.1} fill="transparent" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Mastery Radar Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><Brain size={18} className="text-purple-400" /> Skill Mastery</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={MASTERY_DATA}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={12} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
              <Radar name="Mastery" dataKey="A" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Monthly Study Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><Calendar size={18} className="text-amber-400" /> Monthly Study (Minutes per Day)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={MONTHLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#475569" fontSize={11} />
            <YAxis stroke="#475569" fontSize={11} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '13px' }} />
            <Bar dataKey="minutes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
