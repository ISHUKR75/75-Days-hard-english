'use client';
// ============================================================
// DASHBOARD PAGE - Main user dashboard with real data
// ============================================================

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trophy, Target, Flame, Zap, BookOpen, CheckCircle,
  TrendingUp, Clock, Star, Award, BarChart2, Activity,
  Calendar, Brain, MessageSquare, PenTool, Volume2,
  ArrowRight, Play, Lock, Sparkles, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import CountUp from 'react-countup';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend
} from 'recharts';
import confetti from 'canvas-confetti';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ── Animation Variants ───────────────────────────────────────
const fadeIn  = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

// ── Motivational quotes (changes by day of year) ─────────────
const QUOTES = [
  { text: "Every expert was once a beginner. Keep going.", author: "Helen Hayes" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Language is the road map of a culture.", author: "Rita Mae Brown" },
  { text: "One language sets you in a corridor for life. Two open every door along the way.", author: "Frank Smith" },
  { text: "Learning another language is like becoming another person.", author: "Haruki Murakami" },
  { text: "To have another language is to possess a second soul.", author: "Charlemagne" },
  { text: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" },
];

const getDailyQuote = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return QUOTES[dayOfYear % QUOTES.length];
};

// ── Topic plan for the 75-day journey ────────────────────────
const TOPIC_PLAN = [
  { day: 1,  title: 'Basic Greetings',       icon: '👋', href: '/practice/day-1'  },
  { day: 2,  title: 'Introductions',          icon: '🤝', href: '/practice/day-2'  },
  { day: 3,  title: 'Numbers & Time',         icon: '🔢', href: '/practice/day-3'  },
  { day: 4,  title: 'Colors & Shapes',        icon: '🎨', href: '/practice/day-4'  },
  { day: 5,  title: 'Family Members',         icon: '👨‍👩‍👧', href: '/practice/day-5'  },
  { day: 6,  title: 'Food & Drinks',          icon: '🍽️', href: '/practice/day-6'  },
  { day: 7,  title: 'Daily Routine',          icon: '📅', href: '/practice/day-7'  },
  { day: 8,  title: 'Weather & Seasons',      icon: '🌤️', href: '/practice/day-8'  },
  { day: 9,  title: 'Shopping & Money',       icon: '🛍️', href: '/practice/day-9'  },
  { day: 10, title: 'Travel & Directions',    icon: '🗺️', href: '/practice/day-10' },
];

// ── Skeleton loader ───────────────────────────────────────────
function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-xl bg-white/8 ${className}`} />
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function DashboardPage() {
  const [mounted, setMounted]         = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);

  // Real data from stores
  const {
    xp: totalXP, level, coins, streak,
    totalQuestionsAttempted: questionsAttempted,
    totalCorrectAnswers: questionsCorrect,
    totalTopicsCompleted: topicsCompleted,
    totalTimeSpent,
    badges, achievements,
    dailyProgress, dailyGoal,
    levelXP, levelXPRequired,
    getAccuracy, getLevelProgress,
    user,
  } = useUserStore();

  const { dailyActivity, getHeatmapData, topics: progressTopics } = useProgressStore();

  const accuracy        = getAccuracy();
  const levelProgress   = getLevelProgress();
  const totalTopics     = 75;
  const quote           = getDailyQuote();
  const currentDay      = Math.min(topicsCompleted + 1, 75);

  // Build last 7 days chart from real dailyActivity
  const weeklyData = (() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return Array.from({ length: 7 }, (_, i) => {
      const d   = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      const act = dailyActivity?.[key] || {};
      return {
        day:       days[d.getDay()],
        xp:        act.xpEarned        || 0,
        questions: act.questionsAttempted || 0,
        accuracy:  act.questionsAttempted > 0
          ? Math.round((act.questionsCorrect / act.questionsAttempted) * 100)
          : 0,
      };
    });
  })();

  // Recent activity feed
  const recentActivity = (() => {
    if (!dailyActivity) return [];
    return Object.entries(dailyActivity)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 5)
      .map(([date, act]) => ({
        date,
        label: `Answered ${act.questionsAttempted} questions`,
        xp:    act.xpEarned || 0,
        accuracy: act.questionsAttempted > 0
          ? Math.round((act.questionsCorrect / act.questionsAttempted) * 100)
          : 0,
      }));
  })();

  useEffect(() => {
    setMounted(true);
    setHeatmapData(getHeatmapData(84));
  }, [getHeatmapData]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-surface-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36" />)}
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1">
              Welcome back, {user?.name || 'Student'}! 👋
            </h1>
            <p className="text-slate-400 text-sm">
              Day <span className="text-primary-400 font-bold">{currentDay}</span> of your 75-day journey
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/practice/day-${currentDay}`}
                className="btn-gradient px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 text-sm"
              >
                <Play size={16} fill="white" />
                Continue Learning
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Motivational Quote ──────────────────────────────── */}
        <AnimatedSection>
          <div className="card p-5 border border-primary-500/20 bg-gradient-to-r from-primary-500/5 to-secondary-500/5">
            <div className="flex items-start gap-3">
              <Sparkles size={18} className="text-primary-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium italic">"{quote.text}"</p>
                <p className="text-slate-500 text-xs mt-1">— {quote.author}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Stat Cards ───────────────────────────────────────── */}
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          <StatCard
            icon={Zap} label="Total XP" color="from-indigo-500 to-purple-500"
            badge={`Level ${level}`} trend={`${levelXP}/${levelXPRequired} to next`}
            value={totalXP}
          />
          <StatCard
            icon={Trophy} label="Coins" color="from-amber-500 to-orange-500"
            badge="💰" trend="Spend in shop"
            value={coins}
          />
          <StatCard
            icon={Flame} label="Day Streak" color="from-red-500 to-orange-500"
            badge="🔥" trend={streak > 0 ? 'Keep it up!' : 'Start today!'}
            value={streak}
            onClick={() => streak > 0 && confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } })}
          />
          <StatCard
            icon={Target} label="Accuracy" color="from-emerald-500 to-teal-500"
            badge="✓" trend={`${questionsCorrect}/${questionsAttempted} correct`}
            value={accuracy} suffix="%"
          />
        </motion.div>

        {/* ── Level Progress + Journey ─────────────────────────── */}
        <AnimatedSection>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-white">75-Day Journey</h2>
                <p className="text-slate-400 text-sm">{topicsCompleted} of {totalTopics} days completed</p>
              </div>
              <span className="text-2xl font-black gradient-text">
                {Math.round((topicsCompleted / totalTopics) * 100)}%
              </span>
            </div>
            <div className="progress-bar mb-2">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(topicsCompleted / totalTopics) * 100}%` }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-5">
              <span>Day 1</span><span>Day 75</span>
            </div>

            {/* Level progress */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">Level {level} → {level + 1}</span>
                <span className="text-xs text-slate-400">{levelXP} / {levelXPRequired} XP</span>
              </div>
              <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mt-5">
              {[
                { label: 'Questions',  value: questionsAttempted, color: 'text-white' },
                { label: 'Correct',    value: questionsCorrect,   color: 'text-emerald-400' },
                { label: 'Wrong',      value: questionsAttempted - questionsCorrect, color: 'text-rose-400' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <p className={`text-2xl font-bold ${color}`}>
                    <CountUp end={value} duration={1.5} />
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Today's Plan ─────────────────────────────────────── */}
        <AnimatedSection>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar size={20} className="text-primary-400" />
                Today's Plan
              </h3>
              <Link href="/curriculum" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                Full curriculum <ChevronRight size={13} />
              </Link>
            </div>

            {/* Daily goal bar */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/8 mb-4">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Daily Goal: {dailyProgress} / {dailyGoal} min</span>
                <span className={dailyProgress >= dailyGoal ? 'text-emerald-400' : 'text-primary-400'}>
                  {Math.min(100, Math.round((dailyProgress / dailyGoal) * 100))}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  animate={{ width: `${Math.min(100, (dailyProgress / dailyGoal) * 100)}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {TOPIC_PLAN.map((topic) => {
                const isDone = topic.day <= topicsCompleted;
                const isCurrent = topic.day === currentDay;
                return (
                  <Link key={topic.day} href={topic.href}>
                    <motion.div
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-colors ${
                        isCurrent
                          ? 'border-primary-500/50 bg-primary-500/15 shadow-md shadow-primary-500/20'
                          : isDone
                          ? 'border-emerald-500/30 bg-emerald-500/8'
                          : 'border-white/8 bg-white/3 hover:bg-white/6'
                      }`}
                    >
                      <div className="text-xl mb-1">{isDone ? '✅' : topic.icon}</div>
                      <p className={`text-[10px] font-semibold leading-tight ${
                        isCurrent ? 'text-primary-300' : isDone ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        Day {topic.day}
                      </p>
                      <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">{topic.title}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Charts 2-col ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Weekly Activity */}
          <AnimatedSection>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={18} className="text-primary-400" />
                Weekly Activity
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="xp" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 3 }} activeDot={{ r: 5 }} name="XP" />
                  <Line type="monotone" dataKey="questions" stroke="#d946ef" strokeWidth={2} dot={false} name="Questions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>

          {/* Accuracy Trend */}
          <AnimatedSection>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart2 size={18} className="text-secondary-400" />
                Daily Accuracy
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '11px' }} />
                  <YAxis domain={[0, 100]} stroke="#64748b" style={{ fontSize: '11px' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(v) => [`${v}%`, 'Accuracy']}
                  />
                  <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                    {weeklyData.map((entry, i) => (
                      <Cell key={i} fill={entry.accuracy >= 80 ? '#10b981' : entry.accuracy >= 60 ? '#6366f1' : '#f43f5e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedSection>
        </div>

        {/* ── Activity Heatmap ──────────────────────────────────── */}
        <AnimatedSection>
          <div className="card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-primary-400" />
              Activity Heatmap
              <span className="text-sm font-normal text-slate-500 ml-1">(Last 84 days)</span>
            </h3>
            <div className="overflow-x-auto pb-2">
              <HeatmapCalendar data={heatmapData} />
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
              <span>Less</span>
              {['bg-white/5', 'bg-emerald-900/40', 'bg-emerald-700/50', 'bg-emerald-500/60', 'bg-emerald-400/80'].map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </AnimatedSection>

        {/* ── Recent Activity + Achievements ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Recent Activity Feed */}
          <AnimatedSection>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={18} className="text-emerald-400" />
                Recent Activity
              </h3>
              {recentActivity.length > 0 ? (
                <div className="space-y-2.5">
                  {recentActivity.map((item, i) => (
                    <motion.div
                      key={item.date}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/4 hover:bg-white/7 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                          <BookOpen size={14} className="text-primary-400" />
                        </div>
                        <div>
                          <p className="text-sm text-white font-medium">{item.label}</p>
                          <p className="text-xs text-slate-500">{item.date} • {item.accuracy}% accuracy</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-yellow-400">+{item.xp} XP</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <BookOpen size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No activity yet. Start practicing!</p>
                  <Link href={`/practice/day-1`} className="mt-3 inline-block text-xs text-primary-400 hover:text-primary-300">
                    Begin Day 1 →
                  </Link>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Achievements */}
          <AnimatedSection>
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award size={18} className="text-yellow-400" />
                  Achievements
                </h3>
                <Link href="/achievements" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  View All <ArrowRight size={13} />
                </Link>
              </div>
              {achievements.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {achievements.slice(0, 6).map((a, i) => (
                    <motion.div
                      key={a.id || i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="achievement-card unlocked"
                    >
                      <span className="text-3xl mb-1">{a.icon || '🏅'}</span>
                      <p className="text-[10px] font-semibold text-white text-center leading-tight">{a.name || a.title}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Award size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Earn achievements by practicing daily!</p>
                </div>
              )}

              {/* Default locked achievements to show */}
              {achievements.length === 0 && (
                <div className="grid grid-cols-3 gap-3 mt-3">
                  {[
                    { name: '7-Day Streak', icon: '🔥' },
                    { name: 'Grammar Master', icon: '📖' },
                    { name: '100 Questions', icon: '💯' },
                  ].map((a) => (
                    <div key={a.name} className="achievement-card locked relative">
                      <span className="text-3xl mb-1 opacity-40">{a.icon}</span>
                      <p className="text-[10px] text-slate-600 text-center">{a.name}</p>
                      <Lock size={12} className="absolute top-1.5 right-1.5 text-slate-600" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* ── Recommendations ───────────────────────────────────── */}
        <AnimatedSection>
          <div className="card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-400" />
              Recommended for You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TOPIC_PLAN.slice(currentDay - 1, currentDay + 2).map((topic) => {
                const isDone = topic.day <= topicsCompleted;
                return (
                  <Link key={topic.day} href={topic.href}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/8 hover:border-primary-500/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{topic.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">Day {topic.day}: {topic.title}</p>
                          <p className="text-xs text-slate-500">
                            {isDone ? 'Review again' : topic.day === currentDay ? 'Continue now' : 'Coming up'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          isDone ? 'bg-emerald-500/15 text-emerald-400' :
                          topic.day === currentDay ? 'bg-primary-500/15 text-primary-400' :
                          'bg-white/5 text-slate-500'
                        }`}>
                          {isDone ? '✅ Done' : topic.day === currentDay ? '▶ Current' : '🔒 Upcoming'}
                        </span>
                        <ArrowRight size={14} className="text-slate-500" />
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

/** Animated section wrapper with intersection observer */
function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Stat Card with animated counter */
function StatCard({ icon: Icon, label, value, suffix = '', color, badge, trend, onClick }) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="card p-5 cursor-pointer relative overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-8 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color}`}>
            <Icon size={18} className="text-white" />
          </div>
          {badge && (
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10 text-slate-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-3xl font-black text-white mb-1">
          <CountUp end={typeof value === 'number' ? value : 0} duration={1.5} separator="," />{suffix}
        </p>
        <p className="text-sm text-slate-400">{label}</p>
        {trend && (
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp size={11} />
            {trend}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/** Heatmap Calendar - real data from progressStore */
function HeatmapCalendar({ data }) {
  const getColor = (level) => {
    if (level === 0) return 'bg-white/5';
    if (level === 1) return 'bg-emerald-900/50';
    if (level === 2) return 'bg-emerald-700/60';
    if (level === 3) return 'bg-emerald-500/70';
    return 'bg-emerald-400/90';
  };

  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="flex gap-1 min-w-max">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1">
          {week.map((day, di) => (
            <motion.div
              key={di}
              whileHover={{ scale: 1.4 }}
              className={`heatmap-cell ${getColor(day.level)} cursor-pointer transition-colors`}
              title={`${day.date}: ${day.count} questions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
