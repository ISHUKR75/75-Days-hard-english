'use client';
// ============================================================
// ALL TOPICS PAGE — Complete 75-Day Curriculum Browser
// Features: All 75 days, filters, search, progress tracking,
// week groupings, animated cards, locked/unlocked states
// ============================================================

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Mic, Volume2, PenTool, Brain, Globe, Target,
  CheckCircle2, Lock, Play, Search, Filter, Star, Zap,
  RotateCcw, Trophy, ChevronRight, Calendar, Flame,
  MessageSquare, Headphones, BarChart2, ArrowRight,
  GraduationCap, BookMarked, Lightbulb, Clock, Award,
  TrendingUp, Hash, X,
} from 'lucide-react';
import DAYS_75_TOPICS from '@/lib/topics';
import { useGamificationStore } from '@/store/useGamificationStore';

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── Type metadata ───────────────────────────────────────────
const TYPE_META = {
  grammar:       { label: 'Grammar',       icon: BookOpen,     color: 'text-indigo-400',  bg: 'bg-indigo-500/15',  border: 'border-indigo-500/30',  gradient: 'from-indigo-500 to-blue-500'       },
  spoken:        { label: 'Speaking',      icon: Mic,          color: 'text-pink-400',    bg: 'bg-pink-500/15',    border: 'border-pink-500/30',    gradient: 'from-pink-500 to-rose-500'         },
  pronunciation: { label: 'Pronunciation', icon: Volume2,      color: 'text-cyan-400',    bg: 'bg-cyan-500/15',    border: 'border-cyan-500/30',    gradient: 'from-cyan-500 to-sky-500'          },
  vocabulary:    { label: 'Vocabulary',    icon: Globe,        color: 'text-amber-400',   bg: 'bg-amber-500/15',   border: 'border-amber-500/30',   gradient: 'from-amber-500 to-orange-500'      },
  writing:       { label: 'Writing',       icon: PenTool,      color: 'text-rose-400',    bg: 'bg-rose-500/15',    border: 'border-rose-500/30',    gradient: 'from-rose-500 to-red-500'          },
  practice:      { label: 'Practice',      icon: Target,       color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', gradient: 'from-emerald-500 to-teal-500'      },
  revision:      { label: 'Revision',      icon: RotateCcw,    color: 'text-orange-400',  bg: 'bg-orange-500/15',  border: 'border-orange-500/30',  gradient: 'from-orange-500 to-amber-500'      },
  professional:  { label: 'Professional',  icon: Trophy,       color: 'text-teal-400',    bg: 'bg-teal-500/15',    border: 'border-teal-500/30',    gradient: 'from-teal-500 to-emerald-500'      },
  listening:     { label: 'Listening',     icon: Headphones,   color: 'text-sky-400',     bg: 'bg-sky-500/15',     border: 'border-sky-500/30',     gradient: 'from-sky-500 to-blue-500'          },
  reading:       { label: 'Reading',       icon: BookMarked,   color: 'text-violet-400',  bg: 'bg-violet-500/15',  border: 'border-violet-500/30',  gradient: 'from-violet-500 to-purple-500'     },
  'real-life':   { label: 'Real Life',     icon: MessageSquare,color: 'text-green-400',   bg: 'bg-green-500/15',   border: 'border-green-500/30',   gradient: 'from-green-500 to-emerald-500'     },
};

const DIFFICULTY_COLORS = {
  beginner:     'text-emerald-400 bg-emerald-500/10',
  elementary:   'text-blue-400 bg-blue-500/10',
  intermediate: 'text-amber-400 bg-amber-500/10',
  'upper-intermediate': 'text-orange-400 bg-orange-500/10',
  advanced:     'text-rose-400 bg-rose-500/10',
};

const CEFR_COLORS = {
  A0: 'text-slate-400', A1: 'text-emerald-400', A2: 'text-sky-400',
  B1: 'text-violet-400', B2: 'text-amber-400', C1: 'text-rose-400', C2: 'text-red-500',
};

// ── Week groupings ──────────────────────────────────────────
const WEEKS = [
  { label: 'Week 1', days: [1, 7],   title: 'Foundation',       emoji: '🏗️', color: 'from-emerald-500 to-teal-500' },
  { label: 'Week 2', days: [8, 14],  title: 'Basic Grammar',    emoji: '📝', color: 'from-sky-500 to-blue-500' },
  { label: 'Week 3', days: [15, 21], title: 'Modal Verbs I',    emoji: '🔑', color: 'from-violet-500 to-purple-500' },
  { label: 'Week 4', days: [22, 28], title: 'Modal Verbs II',   emoji: '⚡', color: 'from-amber-500 to-orange-500' },
  { label: 'Week 5', days: [29, 35], title: 'Advanced Modals',  emoji: '🎯', color: 'from-pink-500 to-rose-500' },
  { label: 'Week 6', days: [36, 42], title: 'Tenses Part I',    emoji: '⏰', color: 'from-indigo-500 to-blue-500' },
  { label: 'Week 7', days: [43, 49], title: 'Tenses Part II',   emoji: '🕐', color: 'from-cyan-500 to-sky-500' },
  { label: 'Week 8', days: [50, 56], title: 'Voice & Clause',   emoji: '🗣️', color: 'from-teal-500 to-emerald-500' },
  { label: 'Week 9', days: [57, 63], title: 'Vocabulary',       emoji: '📚', color: 'from-orange-500 to-amber-500' },
  { label: 'Week 10', days: [64, 70], title: 'Fluency',         emoji: '🚀', color: 'from-rose-500 to-pink-500' },
  { label: 'Week 11', days: [71, 75], title: 'Professional',    emoji: '🏆', color: 'from-yellow-500 to-amber-500' },
];

const ALL_TYPES = ['all', ...Object.keys(TYPE_META)];

// ── Progress bar component ──────────────────────────────────
function AnimatedProgressBar({ value, max, color = 'bg-gradient-to-r from-primary-500 to-secondary-500' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const pct = Math.round((value / max) * 100);
  return (
    <div ref={ref} className="h-2.5 rounded-full bg-white/8 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{ boxShadow: '0 0 8px rgba(99,102,241,0.4)' }}
      />
    </div>
  );
}

// ── Topic Card ───────────────────────────────────────────────
function TopicCard({ topic, isCompleted, isCurrent, isLocked, index }) {
  const meta = TYPE_META[topic.type] || TYPE_META.grammar;
  const Icon = meta.icon;
  const diffColor = DIFFICULTY_COLORS[topic.difficulty] || 'text-slate-400 bg-white/5';
  const cefrColor = CEFR_COLORS[topic.cefr] || 'text-slate-400';

  return (
    <motion.div variants={cardVariants} layout>
      <Link
        href={isLocked ? '#' : `/75-days-challenge/${topic.day}`}
        className={`
          group block rounded-2xl border p-4 relative overflow-hidden transition-all duration-300
          ${isCompleted ? 'bg-emerald-500/5 border-emerald-500/25 hover:border-emerald-500/40' : ''}
          ${isCurrent  ? 'bg-primary-500/8 border-primary-500/40 shadow-lg shadow-primary-500/10' : ''}
          ${isLocked   ? 'bg-white/2 border-white/5 cursor-not-allowed opacity-45' : ''}
          ${!isCompleted && !isCurrent && !isLocked ? 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15' : ''}
        `}
      >
        {/* Glow on current */}
        {isCurrent && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 pointer-events-none" />
        )}

        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg ${meta.bg} ${meta.color} border ${meta.border}`}>
              Day {topic.day}
            </span>
            <span className={`text-[10px] font-semibold ${cefrColor}`}>{topic.cefr}</span>
          </div>
          {isCompleted && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
          {isCurrent  && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}><Play size={16} className="text-primary-400 shrink-0" fill="currentColor" /></motion.div>}
          {isLocked   && <Lock size={14} className="text-slate-600 shrink-0" />}
        </div>

        {/* Emoji + Title */}
        <div className="flex items-center gap-3 mb-3">
          <motion.span
            className="text-2xl shrink-0"
            whileHover={!isLocked ? { scale: 1.3, rotate: 10 } : {}}
          >
            {topic.emoji}
          </motion.span>
          <h3 className={`font-bold text-sm leading-tight line-clamp-2 ${isLocked ? 'text-slate-600' : 'text-white'}`}>
            {topic.title}
          </h3>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Icon size={11} className={meta.color} />
            <span className={`text-[10px] font-semibold ${meta.color}`}>{meta.label}</span>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-md capitalize ${diffColor}`}>
            {topic.difficulty?.split('-')[0]}
          </span>
        </div>

        {/* Hover arrow */}
        {!isLocked && (
          <motion.div
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -4 }}
            whileHover={{ x: 0 }}
          >
            <ChevronRight size={14} className={meta.color} />
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}

// ── Week Section ──────────────────────────────────────────────
function WeekSection({ week, topics, completedCount, currentDay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const weekTopics = topics.filter(t => t.day >= week.days[0] && t.day <= week.days[1]);
  if (weekTopics.length === 0) return null;
  const weekCompleted = weekTopics.filter(t => t.day < currentDay).length;
  const pct = Math.round((weekCompleted / weekTopics.length) * 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      {/* Week header */}
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${week.color} flex items-center justify-center text-lg shrink-0`}>
          {week.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-bold text-white">{week.label}: {week.title}</h3>
            <span className="text-xs text-slate-500">Days {week.days[0]}–{week.days[1]}</span>
            <span className="text-xs font-semibold text-emerald-400">{weekCompleted}/{weekTopics.length} done</span>
          </div>
          <div className="mt-1.5 w-40">
            <AnimatedProgressBar value={weekCompleted} max={weekTopics.length} />
          </div>
        </div>
        <span className={`text-xl font-black ${pct === 100 ? 'text-emerald-400' : 'text-slate-600'}`}>{pct}%</span>
      </div>

      {/* Topics grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
      >
        {weekTopics.map((topic) => (
          <TopicCard
            key={topic.day}
            topic={topic}
            isCompleted={topic.day < currentDay}
            isCurrent={topic.day === currentDay}
            isLocked={topic.day > currentDay}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function TopicsPage() {
  const [search, setSearch]         = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [view, setView]             = useState('week'); // 'week' | 'grid' | 'list'
  const [showSearch, setShowSearch] = useState(false);

  const { topicsCompleted, level, xp, streak } = useGamificationStore();
  const currentDay = Math.min((topicsCompleted || 0) + 1, 75);
  const completedCount = topicsCompleted || 0;
  const progress = Math.round((completedCount / 75) * 100);

  // All topics from the lib
  const allTopics = DAYS_75_TOPICS || [];

  // Filtered topics
  const filteredTopics = useMemo(() => {
    return allTopics.filter(t => {
      const matchType   = typeFilter === 'all' || t.type === typeFilter;
      const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [allTopics, typeFilter, search]);

  const isFiltering = typeFilter !== 'all' || search.length > 0;

  return (
    <div className="min-h-screen pb-12">
      {/* ── Page Header ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white">75-Day Curriculum</h1>
            </div>
            <p className="text-slate-400 ml-13 pl-1">
              Hindi se English — zero se fluency tak. Complete every day to master English.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/75-days-challenge/${currentDay}`}
              className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
              <Play size={14} fill="currentColor" /> Continue Day {currentDay}
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ── Stats Row ───────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
      >
        {[
          { icon: Calendar, label: 'Days Completed', value: completedCount, max: 75, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
          { icon: Zap,      label: 'Level',          value: `Lv.${level || 1}`, color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { icon: Flame,    label: 'Day Streak',     value: streak || 0, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { icon: TrendingUp, label: 'Progress',     value: `${progress}%`, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map(({ icon: Icon, label, value, max, color, bg }) => (
          <motion.div key={label} variants={fadeUp}
            className="card p-4 flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Overall Progress ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-5 mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-white">Overall Progress</h3>
            <p className="text-xs text-slate-500">{completedCount} completed · {75 - completedCount} remaining</p>
          </div>
          <span className="text-3xl font-black gradient-text">{progress}%</span>
        </div>
        <AnimatedProgressBar value={completedCount} max={75} />
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>Day 1 — Basics</span>
          <span>Day 75 — Professional English 🏆</span>
        </div>
      </motion.div>

      {/* ── Search + Filter Bar ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mb-6 space-y-3"
      >
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search topics… (e.g. 'tense', 'modal', 'vocabulary')"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 focus:bg-white/8 transition-all text-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {ALL_TYPES.map(type => {
            const meta = TYPE_META[type];
            const Icon = meta?.icon || Filter;
            const isActive = typeFilter === type;
            return (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border
                  ${isActive
                    ? (meta ? `${meta.bg} ${meta.color} ${meta.border}` : 'bg-primary-500/20 text-primary-300 border-primary-500/30')
                    : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300 hover:bg-white/8'
                  }
                `}
              >
                <Icon size={11} />
                {meta?.label || 'All Topics'}
                {type !== 'all' && (
                  <span className="opacity-60">
                    ({(allTopics || []).filter(t => t.type === type).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* View Toggle + Results */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing <span className="text-white font-semibold">{filteredTopics.length}</span> topics
            {isFiltering && <span> · <button onClick={() => { setSearch(''); setTypeFilter('all'); }} className="text-primary-400 hover:underline">Clear filters</button></span>}
          </p>
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/8">
            {[
              { id: 'week', icon: '📅' },
              { id: 'grid', icon: '⊞' },
              { id: 'list', icon: '☰' },
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`px-2.5 py-1 rounded-md text-xs transition-all ${view === v.id ? 'bg-white/15 text-white' : 'text-slate-500 hover:text-white'}`}
              >
                {v.icon} {v.id.charAt(0).toUpperCase() + v.id.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Content: Week View ───────────────────────────── */}
      {view === 'week' && !isFiltering && (
        <div>
          {WEEKS.map(week => (
            <WeekSection
              key={week.label}
              week={week}
              topics={allTopics}
              completedCount={completedCount}
              currentDay={currentDay}
            />
          ))}
        </div>
      )}

      {/* ── Content: Grid View or Filtered ──────────────── */}
      {(view === 'grid' || isFiltering) && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        >
          <AnimatePresence>
            {filteredTopics.map(topic => (
              <TopicCard
                key={topic.day}
                topic={topic}
                isCompleted={topic.day < currentDay}
                isCurrent={topic.day === currentDay}
                isLocked={topic.day > currentDay}
              />
            ))}
          </AnimatePresence>
          {filteredTopics.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-slate-400 font-semibold">No topics found</p>
              <p className="text-slate-600 text-sm mt-1">Try a different search or filter</p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ── Content: List View ──────────────────────────── */}
      {view === 'list' && !isFiltering && (
        <div className="space-y-2">
          {allTopics.map(topic => {
            const meta = TYPE_META[topic.type] || TYPE_META.grammar;
            const Icon = meta.icon;
            const isCompleted = topic.day < currentDay;
            const isCurrent   = topic.day === currentDay;
            const isLocked    = topic.day > currentDay;
            return (
              <motion.div
                key={topic.day}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={isLocked ? '#' : `/75-days-challenge/${topic.day}`}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl border transition-all group
                    ${isCompleted ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/35' : ''}
                    ${isCurrent  ? 'bg-primary-500/8 border-primary-500/35' : ''}
                    ${isLocked   ? 'bg-white/2 border-white/5 cursor-not-allowed opacity-40' : ''}
                    ${!isCompleted && !isCurrent && !isLocked ? 'bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15' : ''}
                  `}
                >
                  <span className={`text-[11px] font-bold w-12 text-center shrink-0 px-2 py-1 rounded-lg ${meta.bg} ${meta.color}`}>
                    #{topic.day}
                  </span>
                  <span className="text-xl shrink-0">{topic.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${isLocked ? 'text-slate-600' : 'text-white'}`}>{topic.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Icon size={10} className={meta.color} />
                      <span className={`text-[10px] ${meta.color}`}>{meta.label}</span>
                      <span className={`text-[10px] ${CEFR_COLORS[topic.cefr] || 'text-slate-500'}`}>{topic.cefr}</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {isCompleted && <CheckCircle2 size={16} className="text-emerald-400" />}
                    {isCurrent  && <Play size={16} className="text-primary-400" fill="currentColor" />}
                    {isLocked   && <Lock size={14} className="text-slate-600" />}
                    {!isCompleted && !isCurrent && !isLocked && (
                      <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Legend ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 flex flex-wrap gap-4 text-xs text-slate-500"
      >
        {[
          { color: 'bg-emerald-500/25 border-emerald-500/30', label: '✅ Completed' },
          { color: 'bg-primary-500/25 border-primary-500/30', label: '▶ Current Day' },
          { color: 'bg-white/5 border-white/8',               label: '🔒 Locked' },
          { color: 'bg-orange-500/15 border-orange-500/25',   label: '🔄 Revision' },
        ].map(({ color, label }) => (
          <div key={label} className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border ${color}`}>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Completion CTA ───────────────────────────────── */}
      {completedCount >= 75 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 card p-8 border-yellow-500/30 bg-yellow-500/5 text-center"
        >
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-2xl font-black text-white mb-2">You did it! 75 Days Complete!</h3>
          <p className="text-slate-400 mb-6">Congratulations on completing the entire 75-day journey. Get your certificate!</p>
          <Link href="/75-days-challenge/certificate" className="btn-gradient inline-flex items-center gap-2 px-8 py-4 text-base">
            <GraduationCap size={20} /> Get My Certificate 🎓
          </Link>
        </motion.div>
      )}
    </div>
  );
}
