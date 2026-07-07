'use client';
// All Topics Page — Browse all 75 topics by category/type

import { useState }  from 'react';
import Link          from 'next/link';
import { Search, Filter, ChevronRight, Lock, CheckCircle2, Play, BookOpen } from 'lucide-react';
import DAYS_75_TOPICS, { TOPIC_TYPES } from '@/lib/topics';
import useUserStore from '@/store/userStore';

const TYPE_LABELS = {
  grammar:       { label: 'Grammar',       emoji: '📚', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  spoken:        { label: 'Spoken',         emoji: '🗣️', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  pronunciation: { label: 'Pronunciation',  emoji: '🔊', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  vocabulary:    { label: 'Vocabulary',     emoji: '📖', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  writing:       { label: 'Writing',        emoji: '✍️', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  practice:      { label: 'Practice',       emoji: '🎯', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  revision:      { label: 'Revision',       emoji: '🔄', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  professional:  { label: 'Professional',   emoji: '💼', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
};

const DIFF_COLORS = {
  beginner:     'diff-easy',
  elementary:   'diff-easy',
  intermediate: 'diff-medium',
  advanced:     'diff-hard',
  expert:       'diff-hard',
};

export default function TopicsPage() {
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState('all');
  const [view,   setView]     = useState('grid'); // grid | list
  const { totalLessonsCompleted } = useUserStore();

  const currentDay = totalLessonsCompleted + 1;

  const filtered = DAYS_75_TOPICS.filter((t) => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <BookOpen size={28} className="text-primary-400" /> All Topics
        </h1>
        <p className="text-slate-500">75 carefully structured topics — grammar se lekar professional English tak.</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search topics…" className="input pl-10 text-sm w-full" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              filter === 'all' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/8'
            }`}>All</button>
          {Object.entries(TYPE_LABELS).map(([type, { label, emoji }]) => (
            <button key={type} onClick={() => setFilter(type)}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === type ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/8'
              }`}>{emoji} {label}</button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-slate-500">{filtered.length} topics found</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((topic) => {
          const isCompleted = topic.day < currentDay;
          const isCurrent   = topic.day === currentDay;
          const isLocked    = topic.day > currentDay;
          const typeInfo    = TYPE_LABELS[topic.type] || { label: topic.type, emoji: '📌', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' };

          return (
            <Link
              key={topic.day}
              href={isLocked ? '#' : `/75-days-challenge/${topic.day}`}
              className={`card p-5 group transition-all ${
                isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-500/30 cursor-pointer'
              } ${isCurrent ? 'border-primary-500/30 bg-primary-500/5' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl shrink-0 mt-0.5">{topic.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-500">Day {topic.day}</span>
                    <span className={`badge text-xs border ${typeInfo.color}`}>{typeInfo.emoji} {typeInfo.label}</span>
                    <span className={`badge text-xs ${DIFF_COLORS[topic.difficulty] || 'diff-easy'}`}>{topic.cefr}</span>
                  </div>
                  <h3 className={`font-bold text-sm mb-1.5 group-hover:text-primary-300 transition-colors ${
                    isCurrent ? 'text-primary-300' : 'text-white'
                  }`}>{topic.title}</h3>
                </div>
                <div className="shrink-0">
                  {isCompleted && <CheckCircle2 size={16} className="text-accent-400" />}
                  {isCurrent   && <Play size={16} className="text-primary-400" fill="currentColor" />}
                  {isLocked    && <Lock size={16} className="text-slate-700" />}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={32} className="text-slate-600 mb-3" />
          <p className="text-slate-500">No topics found</p>
        </div>
      )}
    </div>
  );
}
