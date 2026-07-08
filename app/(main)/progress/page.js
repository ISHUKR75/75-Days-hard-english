'use client';
// ============================================================
// PROGRESS & ANALYTICS PAGE — Complete learning analytics
// Features: Stats overview, charts, heatmap, strength/weakness,
// personal records, time distribution
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp, Zap, Flame, Target, BookOpen, Clock,
  Calendar, BarChart2, Star, Award, Brain, CheckCircle2,
  ArrowUpRight, ArrowDownRight, Activity, Globe,
  PenTool, Mic, Volume2, Headphones, Trophy, Download,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend, AreaChart, Area,
} from 'recharts';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/useProgressStore';

// ── Animation variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ── Generate mock data ───────────────────────────────────────
const generateWeeklyData = () => [
  { day: 'Mon', xp: 120, questions: 15, accuracy: 85, minutes: 22 },
  { day: 'Tue', xp: 180, questions: 22, accuracy: 91, minutes: 35 },
  { day: 'Wed', xp: 90,  questions: 11, accuracy: 78, minutes: 18 },
  { day: 'Thu', xp: 210, questions: 28, accuracy: 93, minutes: 42 },
  { day: 'Fri', xp: 160, questions: 19, accuracy: 88, minutes: 30 },
  { day: 'Sat', xp: 240, questions: 31, accuracy: 96, minutes: 48 },
  { day: 'Sun', xp: 190, questions: 25, accuracy: 90, minutes: 38 },
];

const generateMonthlyData = () => Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  xp: Math.floor(Math.random() * 200 + 50),
  questions: Math.floor(Math.random() * 30 + 5),
  accuracy: Math.floor(Math.random() * 20 + 75),
}));

const SKILL_DATA = [
  { skill: 'Grammar',      score: 88, questions: 320, correct: 282 },
  { skill: 'Vocabulary',   score: 82, questions: 280, correct: 230 },
  { skill: 'Speaking',     score: 74, questions: 150, correct: 111 },
  { skill: 'Writing',      score: 79, questions: 200, correct: 158 },
  { skill: 'Listening',    score: 85, questions: 180, correct: 153 },
  { skill: 'Reading',      score: 91, questions: 220, correct: 200 },
];

const TIME_DISTRIBUTION = [
  { name: 'Grammar',    value: 35, color: '#6366f1' },
  { name: 'Vocabulary', value: 22, color: '#f59e0b' },
  { name: 'Speaking',   value: 15, color: '#ec4899' },
  { name: 'Writing',    value: 13, color: '#f43f5e' },
  { name: 'Listening',  value: 10, color: '#06b6d4' },
  { name: 'Reading',    value: 5,  color: '#10b981' },
];

const TOPIC_PROGRESS = [
  { topic: 'Imperative Sentence',  day: 3,  accuracy: 96, attempts: 25, status: 'mastered'    },
  { topic: 'Be Verb (is/am/are)',  day: 4,  accuracy: 92, attempts: 30, status: 'mastered'    },
  { topic: 'Has / Have',           day: 6,  accuracy: 88, attempts: 22, status: 'proficient'  },
  { topic: 'Use of There',         day: 9,  accuracy: 84, attempts: 19, status: 'proficient'  },
  { topic: 'Use of Want',          day: 11, accuracy: 78, attempts: 15, status: 'learning'    },
  { topic: 'Use of Can',           day: 16, accuracy: 72, attempts: 12, status: 'learning'    },
  { topic: 'Should Have',          day: 23, accuracy: 65, attempts: 8,  status: 'weak'        },
  { topic: 'Present Continuous',   day: 33, accuracy: 61, attempts: 6,  status: 'weak'        },
];

const STATUS_META = {
  mastered:   { label: 'Mastered',   color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' },
  proficient: { label: 'Proficient', color: 'text-blue-400',    bg: 'bg-blue-500/15',    border: 'border-blue-500/30'    },
  learning:   { label: 'Learning',   color: 'text-amber-400',   bg: 'bg-amber-500/15',   border: 'border-amber-500/30'   },
  weak:       { label: 'Needs Work', color: 'text-rose-400',    bg: 'bg-rose-500/15',    border: 'border-rose-500/30'    },
};

// ── Custom tooltip ───────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-900 border border-white/10 rounded-xl p-3 shadow-xl">
        <p className="text-sm font-semibold text-white mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs" style={{ color: p.color }}>
            {p.name}: <span className="font-bold">{typeof p.value === 'number' && p.name !== 'accuracy' ? p.value.toLocaleString() : `${p.value}${p.name === 'accuracy' ? '%' : ''}`}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Animated counter ─────────────────────────────────────────
function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const end = typeof value === 'number' ? value : parseInt(value) || 0;
    const duration = 1500;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ── Heatmap Calendar ─────────────────────────────────────────
function HeatmapCalendar() {
  const data = Array.from({ length: 365 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (364 - i));
    const hasPractice = i > 330 || (Math.random() > 0.35);
    const level = hasPractice ? Math.floor(Math.random() * 5) : 0;
    return { date: d.toISOString().split('T')[0], level };
  });

  const getColor = (level) => {
    const colors = ['bg-white/5', 'bg-emerald-900/50', 'bg-emerald-700/60', 'bg-emerald-500/70', 'bg-emerald-400/85'];
    return colors[level] || colors[0];
  };

  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div>
      <div className="flex gap-0.5 overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5 shrink-0">
            {week.map((day, di) => (
              <div
                key={di}
                className={`w-2.5 h-2.5 rounded-sm ${getColor(day.level)} hover:opacity-100 transition-opacity cursor-default`}
                title={`${day.date}: ${day.level > 0 ? `${day.level * 20}+ XP` : 'No activity'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
        <span>Less</span>
        {[0,1,2,3,4].map(l => (
          <div key={l} className={`w-3 h-3 rounded-sm ${getColor(l)}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ProgressPage() {
  const [period, setPeriod] = useState('week');
  const { xp = 0, level = 1, streak = 0, totalQuestionsAttempted = 0, totalQuestionsCorrect = 0, topicsCompleted = 0, stats } = useGamificationStore();

  const accuracy = totalQuestionsAttempted > 0 ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100) : 0;
  const weeklyData  = generateWeeklyData();
  const monthlyData = generateMonthlyData();
  const chartData   = period === 'week' ? weeklyData : monthlyData;

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <BarChart2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">My Progress</h1>
              <p className="text-slate-400 text-sm">Detailed analytics of your learning journey</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2 rounded-xl transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>
      </motion.div>

      {/* ── Period Selector ─────────────────────────────── */}
      <div className="flex gap-2 mb-8">
        {[
          { id: 'week',  label: 'This Week'   },
          { id: 'month', label: 'This Month'  },
          { id: 'year',  label: 'This Year'   },
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border
              ${period === p.id ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* ── Key Stats ───────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { icon: Zap,        label: 'Total XP',         value: xp,                   suffix: '',   color: 'text-violet-400',  bg: 'bg-violet-500/10', sub: `Level ${level}` },
          { icon: Target,     label: 'Accuracy',         value: accuracy,             suffix: '%',  color: 'text-emerald-400', bg: 'bg-emerald-500/10', sub: `${totalQuestionsCorrect}/${totalQuestionsAttempted}` },
          { icon: Flame,      label: 'Best Streak',      value: stats?.longestStreak || streak, suffix: '🔥', color: 'text-orange-400', bg: 'bg-orange-500/10', sub: `Current: ${streak}` },
          { icon: Calendar,   label: 'Days Completed',   value: topicsCompleted,      suffix: '/75', color: 'text-indigo-400', bg: 'bg-indigo-500/10', sub: `${Math.round((topicsCompleted/75)*100)}% done` },
        ].map(({ icon: Icon, label, value, suffix, color, bg, sub }) => (
          <motion.div key={label} variants={fadeUp} className="card p-5 relative overflow-hidden group">
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${bg.replace('/10', '/5')}`} />
            <div className="relative z-10">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={16} className={color} />
              </div>
              <p className={`text-2xl md:text-3xl font-black ${color}`}>
                <AnimatedCounter value={typeof value === 'number' ? value : 0} suffix={suffix} />
              </p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
              <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Activity Chart ──────────────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity size={18} className="text-primary-400" />
            Daily Activity
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-400" /><span className="text-slate-500">XP</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-slate-500">Accuracy%</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData.slice(0, 7)}>
            <defs>
              <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 12 }} />
            <YAxis stroke="#475569" tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="xp"       stroke="#6366f1" fill="url(#xpGrad)"  strokeWidth={2.5} dot={{ fill: '#6366f1', r: 3 }} activeDot={{ r: 5 }} name="XP" />
            <Area type="monotone" dataKey="accuracy" stroke="#10b981" fill="url(#accGrad)" strokeWidth={2.5} dot={{ fill: '#10b981', r: 3 }} activeDot={{ r: 5 }} name="accuracy" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Charts Row ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Skill Radar */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card p-6">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Brain size={18} className="text-emerald-400" />
            Skill Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={SKILL_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="skill" stroke="#64748b" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#334155" tick={{ fontSize: 10 }} />
              <Radar name="Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Time Distribution Pie */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card p-6">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Clock size={18} className="text-amber-400" />
            Time Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={TIME_DISTRIBUTION} cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={3} dataKey="value">
                {TIME_DISTRIBUTION.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ── Topic Accuracy Bar Chart ─────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <BarChart2 size={18} className="text-violet-400" />
          Skill Accuracy by Category
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={SKILL_DATA} barCategoryGap="25%">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="skill" stroke="#475569" tick={{ fontSize: 11 }} />
            <YAxis stroke="#475569" tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="url(#barGrad)" radius={[6, 6, 0, 0]} name="accuracy" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Activity Heatmap ─────────────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-primary-400" />
          Activity Heatmap
          <span className="text-sm font-normal text-slate-500">— Last 365 days</span>
        </h3>
        <div className="overflow-x-auto">
          <HeatmapCalendar />
        </div>
      </motion.div>

      {/* ── Topic Progress Table ─────────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card p-6 mb-6">
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <BookOpen size={18} className="text-indigo-400" />
          Topic-by-Topic Progress
        </h3>
        <div className="space-y-3">
          {TOPIC_PROGRESS.map(topic => {
            const meta = STATUS_META[topic.status];
            return (
              <div key={topic.topic} className="flex items-center gap-4 p-3 bg-white/3 rounded-xl hover:bg-white/5 transition-colors">
                <span className={`text-xs font-bold shrink-0 w-10 text-center px-1.5 py-1 rounded-lg bg-white/5 text-slate-400`}>
                  D{topic.day}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{topic.topic}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 max-w-32 h-1.5 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          topic.accuracy >= 90 ? 'bg-emerald-400' : topic.accuracy >= 75 ? 'bg-blue-400' : topic.accuracy >= 60 ? 'bg-amber-400' : 'bg-rose-400'
                        }`}
                        style={{ width: `${topic.accuracy}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{topic.attempts} attempts</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${topic.accuracy >= 90 ? 'text-emerald-400' : topic.accuracy >= 75 ? 'text-blue-400' : topic.accuracy >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {topic.accuracy}%
                  </p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${meta.color} ${meta.bg} ${meta.border}`}>
                    {meta.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Personal Records ─────────────────────────────── */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="card p-6">
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Trophy size={18} className="text-yellow-400" />
          Personal Records
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Best Streak',      value: `${stats?.longestStreak || 7} days`,  icon: '🔥', color: 'text-orange-400' },
            { label: 'Most XP in a Day', value: '340 XP',  icon: '⚡', color: 'text-violet-400' },
            { label: 'Best Accuracy',    value: '100%',    icon: '🎯', color: 'text-emerald-400' },
            { label: 'Most Questions',   value: '52 Q/day', icon: '📝', color: 'text-blue-400'   },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="text-center p-4 bg-white/4 rounded-xl border border-white/8">
              <div className="text-2xl mb-2">{icon}</div>
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
