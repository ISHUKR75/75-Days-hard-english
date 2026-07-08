'use client';
// ============================================================
// DASHBOARD PAGE - Main user dashboard with complete analytics
// Features: Stats cards, graphs, heatmaps, progress tracking, weak area detection
// Inspired by: Linear, Stripe, Vercel dashboards
// ============================================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Target, Flame, Zap, BookOpen, CheckCircle,
  TrendingUp, Clock, Star, Award, BarChart2, Activity,
  Calendar, Brain, MessageSquare, PenTool, Volume2,
  ArrowRight, Play, Lock
} from 'lucide-react';
import Link from 'next/link';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend
} from 'recharts';
import confetti from 'canvas-confetti';

// Import custom hooks and stores
import { useProgressStore } from '@/store/useProgressStore';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useStreakStore } from '@/store/useStreakStore';

// ============================================================
// Animation Variants
// ============================================================
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// ============================================================
// Mock Data (Replace with real data from stores)
// ============================================================
const MOCK_DAILY_PROGRESS = [
  { day: 'Mon', xp: 120, questions: 15, accuracy: 85 },
  { day: 'Tue', xp: 150, questions: 20, accuracy: 90 },
  { day: 'Wed', xp: 180, questions: 25, accuracy: 88 },
  { day: 'Thu', xp: 140, questions: 18, accuracy: 82 },
  { day: 'Fri', xp: 200, questions: 28, accuracy: 92 },
  { day: 'Sat', xp: 160, questions: 22, accuracy: 87 },
  { day: 'Sun', xp: 190, questions: 26, accuracy: 91 }
];

const MOCK_TOPIC_ACCURACY = [
  { topic: 'Grammar', accuracy: 92, questions: 150 },
  { topic: 'Vocabulary', accuracy: 88, questions: 200 },
  { topic: 'Speaking', accuracy: 78, questions: 80 },
  { topic: 'Writing', accuracy: 85, questions: 100 },
  { topic: 'Listening', accuracy: 90, questions: 120 },
  { topic: 'Reading', accuracy: 95, questions: 110 }
];

const MOCK_SKILL_DISTRIBUTION = [
  { skill: 'Grammar', score: 90 },
  { skill: 'Vocabulary', score: 85 },
  { skill: 'Speaking', score: 75 },
  { skill: 'Writing', score: 80 },
  { skill: 'Listening', score: 88 },
  { skill: 'Reading', score: 92 }
];

const MOCK_TIME_SPENT = [
  { name: 'Grammar', value: 35, color: '#6366f1' },
  { name: 'Vocabulary', value: 25, color: '#d946ef' },
  { name: 'Speaking', value: 15, color: '#10b981' },
  { name: 'Writing', value: 15, color: '#f59e0b' },
  { name: 'Listening', value: 10, color: '#f43f5e' }
];

const MOCK_ACHIEVEMENTS = [
  { id: 1, name: '7-Day Streak', icon: '🔥', unlocked: true, date: '2024-01-15' },
  { id: 2, name: 'Grammar Master', icon: '📖', unlocked: true, date: '2024-01-20' },
  { id: 3, name: '100 Questions', icon: '💯', unlocked: true, date: '2024-01-22' },
  { id: 4, name: 'Speaking Champion', icon: '🎤', unlocked: false },
  { id: 5, name: '30-Day Streak', icon: '⭐', unlocked: false },
  { id: 6, name: 'Vocab Guru', icon: '📚', unlocked: false }
];

// Heatmap data (365 days)
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const level = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
    data.push({
      date: date.toISOString().split('T')[0],
      count: level
    });
  }
  return data;
};

// ============================================================
// DASHBOARD PAGE COMPONENT
// ============================================================
export default function DashboardPage() {
  // State
  const [heatmapData, setHeatmapData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month, year

  // Zustand stores (will be implemented)
  // const { totalXP, level, coins } = useGamificationStore();
  // const { streak, lastActiveDate } = useStreakStore();
  // const { topics, accuracy, questionsAttempted } = useProgressStore();

  // Mock data for now
  const totalXP = 1250;
  const level = 8;
  const coins = 540;
  const streak = 12;
  const questionsAttempted = 487;
  const questionsCorrect = 425;
  const accuracy = Math.round((questionsCorrect / questionsAttempted) * 100);
  const topicsCompleted = 15;
  const totalTopics = 75;

  useEffect(() => {
    setHeatmapData(generateHeatmapData());
  }, []);

  // Trigger confetti on mount (for celebration)
  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen bg-surface-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ============================================================
            HEADER SECTION
        ============================================================ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-slate-400">
              You're on Day {topicsCompleted} of your 75-day journey
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/dashboard/practice"
                className="btn-gradient px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
              >
                <Play size={18} />
                Continue Learning
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ============================================================
            TOP STATS CARDS
        ============================================================ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* XP Card */}
          <StatCard
            icon={Zap}
            label="Total XP"
            value={totalXP.toLocaleString()}
            color="from-indigo-500 to-purple-500"
            badge={`Level ${level}`}
            trend="+120 today"
          />

          {/* Coins Card */}
          <StatCard
            icon={Trophy}
            label="Coins"
            value={coins.toLocaleString()}
            color="from-amber-500 to-orange-500"
            badge="💰"
            trend="+40 this week"
          />

          {/* Streak Card */}
          <StatCard
            icon={Flame}
            label="Day Streak"
            value={streak}
            color="from-red-500 to-orange-500"
            badge="🔥"
            trend="Keep it up!"
            onClick={triggerCelebration}
          />

          {/* Accuracy Card */}
          <StatCard
            icon={Target}
            label="Accuracy"
            value={`${accuracy}%`}
            color="from-emerald-500 to-teal-500"
            badge="✓"
            trend={`${questionsCorrect}/${questionsAttempted}`}
          />
        </motion.div>

        {/* ============================================================
            PROGRESS OVERVIEW
        ============================================================ */}
        <motion.div variants={fadeIn} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Progress</h2>
              <p className="text-slate-400 text-sm">
                {topicsCompleted} of {totalTopics} days completed
              </p>
            </div>
            <span className="text-3xl font-black gradient-text">
              {Math.round((topicsCompleted / totalTopics) * 100)}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="progress-bar mb-4">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(topicsCompleted / totalTopics) * 100}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{questionsAttempted}</p>
              <p className="text-sm text-slate-500">Questions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">{questionsCorrect}</p>
              <p className="text-sm text-slate-500">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-rose-400">{questionsAttempted - questionsCorrect}</p>
              <p className="text-sm text-slate-500">Wrong</p>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            CHARTS SECTION - 2 Column Layout
        ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Daily Progress Chart */}
          <motion.div variants={fadeIn} className="card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity size={20} className="text-primary-400" />
              Weekly Activity
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={MOCK_DAILY_PROGRESS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="xp"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Topic Accuracy Chart */}
          <motion.div variants={fadeIn} className="card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart2 size={20} className="text-secondary-400" />
              Topic Accuracy
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={MOCK_TOPIC_ACCURACY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="topic"
                  stroke="#64748b"
                  style={{ fontSize: '11px' }}
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar
                  dataKey="accuracy"
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Skill Distribution Radar */}
          <motion.div variants={fadeIn} className="card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Brain size={20} className="text-emerald-400" />
              Skill Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={MOCK_SKILL_DISTRIBUTION}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="skill"
                  stroke="#64748b"
                  style={{ fontSize: '11px' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  stroke="#64748b"
                  style={{ fontSize: '10px' }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Time Spent Pie Chart */}
          <motion.div variants={fadeIn} className="card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={20} className="text-amber-400" />
              Time Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={MOCK_TIME_SPENT}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {MOCK_TIME_SPENT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* ============================================================
            ACTIVITY HEATMAP
        ============================================================ */}
        <motion.div variants={fadeIn} className="card p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-primary-400" />
            Activity Heatmap
            <span className="text-sm font-normal text-slate-400 ml-2">
              (Last 365 days)
            </span>
          </h3>
          <div className="overflow-x-auto">
            <HeatmapCalendar data={heatmapData} />
          </div>
        </motion.div>

        {/* ============================================================
            ACHIEVEMENTS
        ============================================================ */}
        <motion.div variants={fadeIn} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award size={20} className="text-yellow-400" />
              Achievements
            </h3>
            <Link
              href="/dashboard/achievements"
              className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {MOCK_ACHIEVEMENTS.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </motion.div>

        {/* ============================================================
            WEAK AREAS & RECOMMENDATIONS
        ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weak Areas */}
          <motion.div variants={fadeIn} className="card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target size={20} className="text-rose-400" />
              Areas to Improve
            </h3>
            <div className="space-y-3">
              <WeakArea
                topic="Speaking Practice"
                score={78}
                improvement="+5%"
                icon={MessageSquare}
              />
              <WeakArea
                topic="Writing Skills"
                score={82}
                improvement="+3%"
                icon={PenTool}
              />
              <WeakArea
                topic="Pronunciation"
                score={75}
                improvement="+8%"
                icon={Volume2}
              />
            </div>
          </motion.div>

          {/* Recommended Topics */}
          <motion.div variants={fadeIn} className="card p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-400" />
              Recommended for You
            </h3>
            <div className="space-y-3">
              <RecommendedTopic
                title="Passive Voice - Part 2"
                reason="Based on your weak areas"
                progress={0}
              />
              <RecommendedTopic
                title="Speaking Practice - Office"
                reason="Continue your learning path"
                progress={60}
              />
              <RecommendedTopic
                title="Advanced Vocabulary"
                reason="Next in your curriculum"
                progress={0}
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

/**
 * Stat Card Component
 * Displays a key metric with icon, value, and trend
 */
function StatCard({ icon: Icon, label, value, color, badge, trend, onClick }) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="card p-5 cursor-pointer relative overflow-hidden group"
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color} bg-opacity-20`}>
            <Icon size={20} className="text-white" />
          </div>
          {badge && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-slate-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-3xl font-black text-white mb-1">{value}</p>
        <p className="text-sm text-slate-400">{label}</p>
        {trend && (
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={12} />
            {trend}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Heatmap Calendar Component
 * Shows activity over 365 days
 */
function HeatmapCalendar({ data }) {
  const getColor = (count) => {
    if (count === 0) return 'bg-white/5';
    if (count === 1) return 'bg-emerald-900/40';
    if (count === 2) return 'bg-emerald-700/50';
    if (count === 3) return 'bg-emerald-500/60';
    return 'bg-emerald-400/80';
  };

  // Group data by weeks
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="flex gap-1">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-1">
          {week.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`heatmap-cell ${getColor(day.count)}`}
              title={`${day.date}: ${day.count} activities`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Achievement Badge Component
 */
function AchievementBadge({ achievement }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
    >
      <span className="text-4xl mb-2">{achievement.icon}</span>
      <p className="text-xs font-semibold text-white text-center">
        {achievement.name}
      </p>
      {!achievement.unlocked && (
        <Lock size={16} className="absolute top-2 right-2 text-slate-600" />
      )}
    </motion.div>
  );
}

/**
 * Weak Area Component
 */
function WeakArea({ topic, score, improvement, icon: Icon }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-rose-500/20">
          <Icon size={16} className="text-rose-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{topic}</p>
          <p className="text-xs text-slate-500">Score: {score}%</p>
        </div>
      </div>
      <span className="text-xs font-semibold text-emerald-400">{improvement}</span>
    </div>
  );
}

/**
 * Recommended Topic Component
 */
function RecommendedTopic({ title, reason, progress }) {
  return (
    <div className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-slate-500">{reason}</p>
        </div>
        {progress > 0 && (
          <span className="text-xs font-semibold text-primary-400">{progress}%</span>
        )}
      </div>
      {progress > 0 && (
        <div className="progress-bar h-1.5">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
