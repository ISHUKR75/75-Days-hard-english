'use client';
// ============================================================
// BOOKMARKS PAGE — Saved questions, lessons, vocabulary
// Features: Save anything, organize by category, quick access,
// search, bulk actions, study mode
// ============================================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Bookmark, BookmarkCheck, Search, Trash2, Globe,
  BookOpen, Mic, PenTool, Brain, Target, Zap,
  Filter, X, ChevronRight, Play, Volume2,
  ArrowRight, Eye, Clock, Star, BarChart2,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

const CATEGORY_META = {
  question:    { icon: Target,    label: 'Questions',    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  vocabulary:  { icon: Globe,     label: 'Vocabulary',   color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   },
  grammar:     { icon: BookOpen,  label: 'Grammar',      color: 'text-indigo-400',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/20'  },
  speaking:    { icon: Mic,       label: 'Speaking',     color: 'text-pink-400',    bg: 'bg-pink-500/10',    border: 'border-pink-500/20'    },
  writing:     { icon: PenTool,   label: 'Writing',      color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20'    },
  lesson:      { icon: Brain,     label: 'Lessons',      color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20'  },
};

const DEFAULT_BOOKMARKS = [
  {
    id: 1,
    type: 'question',
    title: 'मुझे कल ऑफिस जाना है।',
    subtitle: 'Hindi → English Translation',
    answer: 'I have to go to the office tomorrow.',
    day: 15,
    topic: 'Use of Have To',
    difficulty: 'intermediate',
    savedAt: '2024-01-20',
  },
  {
    id: 2,
    type: 'vocabulary',
    title: 'Resilient',
    subtitle: 'लचीला / मजबूत — able to recover from difficulties',
    answer: '"She remained resilient through every hardship."',
    day: null,
    topic: 'Power Words',
    difficulty: 'intermediate',
    savedAt: '2024-01-21',
  },
  {
    id: 3,
    type: 'grammar',
    title: 'Present Perfect vs Simple Past',
    subtitle: 'When to use "have done" vs "did"',
    answer: 'Use Present Perfect when connected to present. Use Simple Past for finished past with time marker.',
    day: 33,
    topic: 'Perfect Tenses',
    difficulty: 'advanced',
    savedAt: '2024-01-22',
  },
  {
    id: 4,
    type: 'vocabulary',
    title: 'Articulate',
    subtitle: 'स्पष्ट रूप से बोलना — able to express ideas clearly',
    answer: '"She gave an articulate presentation to the board."',
    day: null,
    topic: 'Professional Vocabulary',
    difficulty: 'advanced',
    savedAt: '2024-01-23',
  },
  {
    id: 5,
    type: 'question',
    title: 'वह काम कर रही होगी।',
    subtitle: 'Future Continuous Tense',
    answer: 'She will be working.',
    day: 48,
    topic: 'Future Continuous',
    difficulty: 'intermediate',
    savedAt: '2024-01-24',
  },
  {
    id: 6,
    type: 'speaking',
    title: 'Job Interview Opener',
    subtitle: 'Self-introduction for interviews',
    answer: '"Good morning! My name is [Name]. I am from [City]. I have 3 years of experience in..."',
    day: null,
    topic: 'Interview English',
    difficulty: 'intermediate',
    savedAt: '2024-01-25',
  },
  {
    id: 7,
    type: 'writing',
    title: 'Formal Email Opening',
    subtitle: 'How to start a professional email',
    answer: '"I hope this email finds you well. I am writing to [purpose]..."',
    day: null,
    topic: 'Email Writing',
    difficulty: 'beginner',
    savedAt: '2024-01-26',
  },
  {
    id: 8,
    type: 'lesson',
    title: 'Day 6: Has / Have',
    subtitle: 'Complete lesson on Has and Have usage',
    answer: 'HAS → He/She/It. HAVE → I/You/We/They',
    day: 6,
    topic: 'Has / Have',
    difficulty: 'beginner',
    savedAt: '2024-01-27',
  },
  {
    id: 9,
    type: 'vocabulary',
    title: 'Nevertheless',
    subtitle: 'फिर भी — in spite of that',
    answer: '"It was raining. Nevertheless, we continued the match."',
    day: null,
    topic: 'Transition Words',
    difficulty: 'advanced',
    savedAt: '2024-01-28',
  },
  {
    id: 10,
    type: 'grammar',
    title: 'Active vs Passive Voice',
    subtitle: 'How to convert active to passive',
    answer: 'Active: Subject does the action. Passive: Object + is/was + V3 + by + Subject',
    day: 52,
    topic: 'Voice',
    difficulty: 'intermediate',
    savedAt: '2024-01-29',
  },
];

const DIFFICULTY_COLORS = {
  beginner:     'text-emerald-400 bg-emerald-500/10',
  intermediate: 'text-amber-400 bg-amber-500/10',
  advanced:     'text-rose-400 bg-rose-500/10',
};

// ── Bookmark Card ─────────────────────────────────────────────
function BookmarkCard({ bookmark, onRemove, onStudy }) {
  const meta = CATEGORY_META[bookmark.type] || CATEGORY_META.lesson;
  const Icon = meta.icon;
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      layout
      className={`rounded-2xl border p-5 ${meta.bg} ${meta.border} group relative`}
    >
      {/* Type badge */}
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-1.5 text-xs font-bold ${meta.color}`}>
          <Icon size={12} />
          {meta.label}
        </div>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setRevealed(!revealed)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
            title={revealed ? 'Hide answer' : 'Reveal answer'}
          >
            <Eye size={13} />
          </button>
          <button
            onClick={() => onRemove(bookmark.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Content */}
      <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">{bookmark.title}</h3>
      <p className="text-xs text-slate-500 mb-3 line-clamp-1">{bookmark.subtitle}</p>

      {/* Answer (toggle reveal) */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white/5 rounded-xl p-3 mb-3 border border-white/8">
              <p className="text-xs text-slate-300 leading-relaxed">{bookmark.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {bookmark.day && (
            <span className="text-[10px] text-slate-600">Day {bookmark.day}</span>
          )}
          <span className={`text-[10px] px-1.5 py-0.5 rounded-md capitalize ${DIFFICULTY_COLORS[bookmark.difficulty] || ''}`}>
            {bookmark.difficulty}
          </span>
        </div>
        {bookmark.day && (
          <Link href={`/75-days-challenge/${bookmark.day}`} className="text-[10px] text-primary-400 hover:text-primary-300 flex items-center gap-0.5">
            Go to lesson <ChevronRight size={10} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(DEFAULT_BOOKMARKS);
  const [search, setSearch]       = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [studyMode, setStudyMode] = useState(false);
  const [studyIdx, setStudyIdx]   = useState(0);
  const [studyRevealed, setStudyRevealed] = useState(false);

  const filtered = useMemo(() => bookmarks.filter(b => {
    const matchCat    = catFilter === 'all' || b.type === catFilter;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }), [bookmarks, catFilter, search]);

  const handleRemove = (id) => setBookmarks(prev => prev.filter(b => b.id !== id));

  const handleClearAll = () => {
    if (window.confirm('Remove all bookmarks?')) setBookmarks([]);
  };

  // Study mode
  const currentStudy = filtered[studyIdx];

  if (studyMode && filtered.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pb-12 max-w-lg mx-auto">
        <div className="w-full mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-400">{studyIdx + 1} / {filtered.length}</p>
          <button onClick={() => { setStudyMode(false); setStudyIdx(0); setStudyRevealed(false); }} className="text-sm text-slate-400 hover:text-white border border-white/10 px-4 py-1.5 rounded-xl transition-all">
            Exit Study Mode
          </button>
        </div>

        {/* Progress */}
        <div className="w-full h-1.5 bg-white/8 rounded-full mb-8 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${((studyIdx) / filtered.length) * 100}%` }} />
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={studyIdx}
            initial={{ opacity: 0, x: 40, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full card p-8 text-center min-h-48 flex flex-col items-center justify-center gap-4 mb-8"
          >
            <div className="text-xs text-slate-500 uppercase tracking-wider">{CATEGORY_META[currentStudy?.type]?.label}</div>
            <h2 className="text-2xl font-black text-white">{currentStudy?.title}</h2>
            <p className="text-slate-400 text-sm">{currentStudy?.subtitle}</p>
            {studyRevealed && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mt-2">
                <p className="text-sm text-emerald-200 leading-relaxed">{currentStudy?.answer}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4 w-full">
          {!studyRevealed ? (
            <button onClick={() => setStudyRevealed(true)} className="flex-1 btn-primary py-3">
              Reveal Answer
            </button>
          ) : (
            <>
              <button onClick={() => { setStudyIdx(i => Math.max(0, i - 1)); setStudyRevealed(false); }} disabled={studyIdx === 0} className="flex-1 btn-secondary py-3 disabled:opacity-40">
                ← Previous
              </button>
              <button onClick={() => { if (studyIdx < filtered.length - 1) { setStudyIdx(i => i + 1); setStudyRevealed(false); } else { setStudyMode(false); } }} className="flex-1 btn-primary py-3">
                {studyIdx < filtered.length - 1 ? 'Next →' : 'Finish ✅'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
              <Bookmark size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">Bookmarks</h1>
              <p className="text-slate-400 text-sm">{bookmarks.length} saved items</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {filtered.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setStudyMode(true); setStudyIdx(0); setStudyRevealed(false); }}
                className="flex items-center gap-2 text-sm btn-primary px-5 py-2.5"
              >
                <Brain size={14} /> Study Mode
              </motion.button>
            )}
            {bookmarks.length > 0 && (
              <button onClick={handleClearAll} className="text-xs text-slate-500 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 px-3 py-2 rounded-xl transition-all flex items-center gap-1.5">
                <Trash2 size={12} /> Clear All
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Stats ───────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-6">
        {Object.entries(CATEGORY_META).map(([type, meta]) => {
          const count = bookmarks.filter(b => b.type === type).length;
          if (count === 0) return null;
          const Icon = meta.icon;
          return (
            <div key={type} className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${meta.bg} ${meta.border}`}>
              <Icon size={13} className={meta.color} />
              <span className={`text-sm font-bold ${meta.color}`}>{count}</span>
              <span className="text-xs text-slate-500">{meta.label}</span>
            </div>
          );
        })}
      </motion.div>

      {/* ── Search + Filter ──────────────────────────────── */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookmarks…"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/8 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 text-sm" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setCatFilter('all')} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${catFilter === 'all' ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
            All ({bookmarks.length})
          </button>
          {Object.entries(CATEGORY_META).map(([type, meta]) => {
            const count = bookmarks.filter(b => b.type === type).length;
            const Icon = meta.icon;
            return (
              <button key={type} onClick={() => setCatFilter(type)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${catFilter === type ? `${meta.bg} ${meta.color} ${meta.border}` : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
                <Icon size={10} /> {meta.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bookmarks Grid ───────────────────────────────── */}
      {filtered.length > 0 ? (
        <motion.div variants={stagger} initial="hidden" animate="visible" layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map(bookmark => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} onRemove={handleRemove} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔖</div>
          <p className="text-slate-400 font-semibold mb-2">{search || catFilter !== 'all' ? 'No matching bookmarks' : 'No bookmarks yet'}</p>
          <p className="text-slate-600 text-sm mb-6">
            {search || catFilter !== 'all' ? 'Try a different filter' : 'Bookmark questions, vocabulary, and lessons to review later'}
          </p>
          <Link href="/75-days-challenge" className="btn-primary inline-flex items-center gap-2 text-sm">
            <Play size={14} /> Start Learning
          </Link>
        </div>
      )}
    </div>
  );
}
