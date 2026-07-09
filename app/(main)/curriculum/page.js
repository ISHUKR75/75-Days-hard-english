'use client';
// Curriculum Page — Enhanced 75-Day Learning Journey
// Features: Weekly grouping, progress ring, search/filter, category legend, DayCard, Framer Motion

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Calendar, Target, Trophy, Zap, Flame,
  CheckCircle2, Clock, Search, ChevronDown, ChevronUp,
  ArrowLeft, Star, Sparkles, Filter, X, Navigation,
  Quote, RotateCcw, Play, Layers
} from 'lucide-react';
import { DAYS_75_TOPICS, getWeeklyTopics, TOPIC_TYPES } from '@/lib/topics';
import DayCard from '@/components/challenge/DayCard';
import useProgressStore from '@/store/progressStore';
import useUserStore from '@/store/userStore';

// ── Motivation quotes ──────────────────────────────────────────
const MOTIVATION_QUOTES = [
  { quote: "The secret to getting ahead is getting started.", author: "Mark Twain" },
  { quote: "Every expert was once a beginner.", author: "Helen Hayes" },
  { quote: "Language is the road map of a culture.", author: "Rita Mae Brown" },
  { quote: "One language sets you in a corridor for life. Two languages open every door.", author: "Frank Smith" },
  { quote: "The limits of my language mean the limits of my world.", author: "Ludwig Wittgenstein" },
  { quote: "To learn a language is to have one more window from which to look at the world.", author: "Chinese Proverb" },
  { quote: "A different language is a different vision of life.", author: "Federico Fellini" },
];

// ── Category meta ─────────────────────────────────────────────
const CATEGORY_META = {
  grammar:    { label: 'Grammar',    color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',    dot: 'bg-indigo-400' },
  spoken:     { label: 'Spoken',     color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',    dot: 'bg-purple-400' },
  vocabulary: { label: 'Vocabulary', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30',    dot: 'bg-orange-400' },
  writing:    { label: 'Writing',    color: 'bg-pink-500/20 text-pink-300 border-pink-500/30',          dot: 'bg-pink-400' },
  revision:   { label: 'Revision',   color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  practice:   { label: 'Practice',   color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',       dot: 'bg-amber-400' },
};

// ── Progress Ring (SVG) ────────────────────────────────────────
function ProgressRing({ pct = 0, size = 120, stroke = 10 }) {
  const radius = (size - stroke * 2) / 2;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <motion.circle
        cx={size/2} cy={size/2} r={radius}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Week header with collapse ─────────────────────────────────
function WeekSection({ week, days, currentDay, collapsed, onToggle, activeFilter, searchTerm, topicProgress }) {
  const filtered = days.filter(d => {
    const matchSearch = !searchTerm ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = activeFilter === 'all' || d.type === activeFilter;
    return matchSearch && matchFilter;
  });

  if (filtered.length === 0) return null;

  const completedInWeek = filtered.filter(d => d.day < currentDay).length;
  const weekPct = Math.round((completedInWeek / filtered.length) * 100);
  const weekStart = days[0].day;
  const weekEnd   = days[days.length - 1].day;

  return (
    <motion.div
      id={`week-${week}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      {/* Week header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/4 border border-white/8 hover:bg-white/6 transition-all mb-3 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-black text-sm">
            W{week}
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-sm">Week {week} — Days {weekStart}–{weekEnd}</p>
            <p className="text-xs text-slate-500">{completedInWeek}/{filtered.length} completed</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Mini progress bar */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                animate={{ width: `${weekPct}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
            <span className="text-xs text-slate-400 w-8">{weekPct}%</span>
          </div>
          {collapsed
            ? <ChevronDown size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
            : <ChevronUp  size={16} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          }
        </div>
      </button>

      {/* Day cards grid */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              {filtered.map((topic, idx) => {
                const status = topic.day < currentDay
                  ? 'completed'
                  : topic.day === currentDay
                  ? 'in-progress'
                  : topic.day <= currentDay + 2
                  ? 'available'
                  : 'locked';

                const progress = topicProgress?.[`day-${topic.day}`];
                const xpEarned = progress?.xp || (status === 'completed' ? 100 : 0);

                // Map topic type to DayCard category
                const catMap = {
                  grammar:    'Foundation',
                  spoken:     'Modals',
                  vocabulary: 'Vocabulary',
                  writing:    'Writing',
                  revision:   'Tenses',
                  practice:   'Tenses',
                };

                return (
                  <motion.div
                    key={topic.day}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.03 }}
                  >
                    <DayCard
                      day={topic.day}
                      title={topic.title}
                      emoji={topic.emoji}
                      category={catMap[topic.type] || 'Foundation'}
                      status={status}
                      xpEarned={xpEarned}
                      xpTotal={100}
                      href={`/learn/${topic.slug}`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Curriculum Page ──────────────────────────────────────
export default function CurriculumPage() {
  const [searchTerm,    setSearchTerm]    = useState('');
  const [activeFilter,  setActiveFilter]  = useState('all');
  const [collapsedWeeks, setCollapsedWeeks] = useState({});
  const [quoteIdx,      setQuoteIdx]      = useState(0);
  const topRef = useRef(null);

  const { totalLessonsCompleted } = useUserStore?.() || { totalLessonsCompleted: 3 };
  const { topics: topicProgress } = useProgressStore?.() || { topics: {} };
  const currentDay = (totalLessonsCompleted || 0) + 1;

  const weeks = getWeeklyTopics(); // returns [{week:1, days:[...]}, ...]

  // Overall progress
  const completedDays = DAYS_75_TOPICS.filter(d => d.day < currentDay).length;
  const overallPct    = Math.round((completedDays / 75) * 100);

  // Stats
  const grammarCount    = DAYS_75_TOPICS.filter(d => d.type === 'grammar').length;
  const vocabCount      = DAYS_75_TOPICS.filter(d => d.type === 'vocabulary').length;
  const writingCount    = DAYS_75_TOPICS.filter(d => d.type === 'writing').length;
  const revisionCount   = DAYS_75_TOPICS.filter(d => d.type === 'revision' || d.type === 'practice').length;

  // Total filtered count for search
  const totalFiltered = DAYS_75_TOPICS.filter(d => {
    const ms = !searchTerm || d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const mf = activeFilter === 'all' || d.type === activeFilter;
    return ms && mf;
  }).length;

  // Cycle quotes every 6s
  useEffect(() => {
    const t = setInterval(() => {
      setQuoteIdx(i => (i + 1) % MOTIVATION_QUOTES.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const toggleWeek = (w) =>
    setCollapsedWeeks(prev => ({ ...prev, [w]: !prev[w] }));

  const expandAll  = () => setCollapsedWeeks({});
  const collapseAll = () => {
    const all = {};
    weeks.forEach(w => { all[w.week] = true; });
    setCollapsedWeeks(all);
  };

  const scrollToToday = () => {
    const todayWeek = Math.ceil(currentDay / 7);
    const el = document.getElementById(`week-${todayWeek}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToWeek = (w) => {
    const el = document.getElementById(`week-${w}`);
    if (el) {
      setCollapsedWeeks(prev => ({ ...prev, [w]: false }));
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quote = MOTIVATION_QUOTES[quoteIdx];

  return (
    <div className="min-h-screen bg-surface-950 text-white" ref={topRef}>

      {/* ── Hero Header ───────────────────────────────────────── */}
      <header className="relative border-b border-white/5 py-8 px-4 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary-500/6 rounded-full blur-3xl -translate-y-1/3" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">

            {/* Left: Title + description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
                  <ArrowLeft size={14} /> Home
                </Link>
                <span className="text-slate-700">/</span>
                <span className="text-sm text-slate-400">Curriculum</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3">
                <span className="gradient-text">75 Days Hard</span>
                <br />
                <span className="text-white">English Curriculum</span>
              </h1>
              <p className="text-slate-400 max-w-xl text-base leading-relaxed mb-5">
                A complete, structured journey from absolute beginner to fluent professional English speaker.
                75 carefully designed lessons — one per day.
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scrollToToday}
                  className="btn-gradient flex items-center gap-2 text-sm px-5 py-2.5"
                >
                  <Navigation size={15} /> Jump to Today (Day {currentDay})
                </button>
                <Link href="/75-days-challenge" className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5">
                  <Play size={15} /> Start Challenge
                </Link>
              </div>
            </motion.div>

            {/* Right: Progress ring + stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Ring */}
              <div className="relative">
                <ProgressRing pct={overallPct} size={140} stroke={12} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">{overallPct}%</span>
                  <span className="text-xs text-slate-400">Complete</span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                {[
                  { label: 'Completed', value: completedDays, icon: CheckCircle2, color: 'text-emerald-400' },
                  { label: 'Remaining', value: 75 - completedDays, icon: Clock, color: 'text-amber-400' },
                  { label: 'Current Day', value: currentDay, icon: Flame, color: 'text-primary-400' },
                  { label: 'Total Days', value: 75, icon: Trophy, color: 'text-yellow-400' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                    <Icon size={14} className={`${color} mx-auto mb-1`} />
                    <p className={`text-xl font-black ${color}`}>{value}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 space-y-8">

        {/* ── Motivation Quote ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-r from-primary-500/8 to-secondary-500/8 border border-primary-500/15 rounded-2xl p-5"
          >
            <Quote size={20} className="text-primary-400/60 mb-2" />
            <p className="text-white font-semibold text-base italic mb-1">"{quote.quote}"</p>
            <p className="text-slate-400 text-sm">— {quote.author}</p>
            {/* Dots */}
            <div className="flex gap-1.5 absolute bottom-4 right-4">
              {MOTIVATION_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === quoteIdx ? 'bg-primary-400 w-4' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Category Legend ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-900/60 border border-white/8 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers size={16} className="text-slate-400" />
            <h2 className="font-bold text-white text-sm">Curriculum Breakdown</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { type: 'grammar',    count: grammarCount,  label: 'Grammar',    emoji: '📚' },
              { type: 'vocabulary', count: vocabCount,    label: 'Vocabulary', emoji: '🔤' },
              { type: 'writing',    count: writingCount,  label: 'Writing',    emoji: '✍️' },
              { type: 'revision',   count: revisionCount, label: 'Revision',   emoji: '🔄' },
            ].map(({ type, count, label, emoji }) => {
              const meta = CATEGORY_META[type];
              const isActive = activeFilter === type;
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(isActive ? 'all' : type)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    isActive
                      ? meta.color + ' border-current'
                      : 'bg-white/4 border-white/8 hover:bg-white/6 text-slate-300'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <p className="font-bold text-sm">{label}</p>
                    <p className="text-xs opacity-70">{count} days</p>
                  </div>
                  {/* small bar */}
                  <div className="ml-auto w-1.5 rounded-full bg-current opacity-40" style={{ height: `${Math.max(12, (count/75)*48)}px` }} />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Search & Filter Bar ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-3 items-stretch"
        >
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search topics, types (grammar, vocabulary...)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {totalFiltered} topic{totalFiltered !== 1 ? 's' : ''}
              {(searchTerm || activeFilter !== 'all') && ' found'}
            </span>
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 border border-primary-500/30 rounded-lg px-2 py-1"
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>

          <div className="flex gap-2 shrink-0">
            <button onClick={expandAll}  className="text-xs text-slate-400 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-colors">
              Expand All
            </button>
            <button onClick={collapseAll} className="text-xs text-slate-400 hover:text-white border border-white/10 rounded-lg px-3 py-2 transition-colors">
              Collapse All
            </button>
          </div>
        </motion.div>

        {/* ── Week Anchor Navigation ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {weeks.map(({ week }) => (
            <button
              key={week}
              onClick={() => scrollToWeek(week)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-medium ${
                Math.ceil(currentDay / 7) === week
                  ? 'bg-primary-500/20 border-primary-500/40 text-primary-300'
                  : 'bg-white/4 border-white/8 text-slate-400 hover:text-white hover:bg-white/8'
              }`}
            >
              W{week}
              {Math.ceil(currentDay / 7) === week && (
                <span className="ml-1 text-[9px] text-primary-400">●</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Weekly Groups ─────────────────────────────────────── */}
        <div>
          {weeks.map(({ week, days }) => (
            <WeekSection
              key={week}
              week={week}
              days={days}
              currentDay={currentDay}
              collapsed={!!collapsedWeeks[week]}
              onToggle={() => toggleWeek(week)}
              activeFilter={activeFilter}
              searchTerm={searchTerm}
              topicProgress={topicProgress}
            />
          ))}
        </div>

        {/* ── No results ────────────────────────────────────────── */}
        {totalFiltered === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <span className="text-5xl mb-4 block">🔍</span>
            <p className="text-white font-bold text-lg mb-1">No topics found</p>
            <p className="text-slate-400 text-sm mb-4">Try a different search term or clear your filters</p>
            <button
              onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
              className="btn-secondary text-sm flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={14} /> Reset Filters
            </button>
          </motion.div>
        )}

        {/* ── Bottom CTA ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-8 text-center"
        >
          <span className="text-4xl mb-4 block">🏆</span>
          <h2 className="text-2xl font-black text-white mb-2">Ready to Start Your Journey?</h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            75 days of structured learning. Every day builds on the last. Become fluent in English.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/75-days-challenge" className="btn-gradient flex items-center gap-2 px-6 py-3">
              <Flame size={18} /> Start 75 Days Challenge
            </Link>
            <Link href="/dashboard" className="btn-secondary flex items-center gap-2 px-6 py-3">
              <Target size={18} /> View Dashboard
            </Link>
          </div>
        </motion.div>

      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-primary-400" />
            75 Days Hard English — Complete curriculum to transform your English
          </p>
        </div>
      </footer>
    </div>
  );
}
