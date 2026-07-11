// ============================================================
// MemoryTricksSection.js — Memory Tricks / Mnemonics
// Fun mnemonic cards with quiz mode and remembered tracking
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  Brain, Zap, CheckCircle, RotateCcw, Star,
  Lightbulb, Eye, BookOpen, Trophy, ChevronLeft, ChevronRight, Target
} from 'lucide-react';

// ── Category color map ───────────────────────────────────────
const CAT_COLORS = {
  tense:       'from-violet-500/20 to-purple-500/10 border-violet-400/30',
  preposition: 'from-cyan-500/20 to-blue-500/10 border-cyan-400/30',
  article:     'from-blue-500/20 to-indigo-500/10 border-blue-400/30',
  spelling:    'from-orange-500/20 to-amber-500/10 border-orange-400/30',
  vocabulary:  'from-emerald-500/20 to-teal-500/10 border-emerald-400/30',
  grammar:     'from-fuchsia-500/20 to-pink-500/10 border-fuchsia-400/30',
  default:     'from-white/5 to-white/0 border-white/10',
};
const catGrad = (cat) => CAT_COLORS[cat?.toLowerCase()] || CAT_COLORS.default;

const CAT_CHIP = {
  tense:       'bg-violet-400/10 text-violet-300 border-violet-400/20',
  preposition: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
  article:     'bg-blue-400/10 text-blue-300 border-blue-400/20',
  spelling:    'bg-orange-400/10 text-orange-300 border-orange-400/20',
  vocabulary:  'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  grammar:     'bg-fuchsia-400/10 text-fuchsia-300 border-fuchsia-400/20',
  default:     'bg-white/10 text-gray-300 border-white/10',
};
const catChip = (cat) => CAT_CHIP[cat?.toLowerCase()] || CAT_CHIP.default;

// ── Flip-card quiz component ─────────────────────────────────
function QuizFlipCard({ trick, onRemembered, onSkip }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full" style={{ perspective: '1200px' }}>
      <motion.div
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className="w-full"
      >
        {/* Front — Topic */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="bg-gradient-to-br from-violet-600/20 to-purple-500/10 border border-violet-400/30 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[240px] cursor-pointer"
          onClick={() => setFlipped(true)}
        >
          <div className="text-xs text-violet-400 uppercase tracking-widest mb-4 font-semibold">Remember this topic</div>
          <div className="text-3xl font-black text-white text-center mb-4">{trick?.topic || '—'}</div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${catChip(trick?.category)}`}>
            {trick?.category || 'Grammar'}
          </span>
          <p className="text-gray-500 text-sm mt-4 flex items-center gap-1">
            <Eye size={13} /> tap to reveal trick
          </p>
        </div>

        {/* Back — Trick */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
          className="bg-gradient-to-br from-cyan-600/20 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-6 flex flex-col justify-between min-h-[240px]"
        >
          <div>
            <div className="text-xs text-cyan-400 uppercase tracking-widest mb-3 font-semibold">The Trick 🧠</div>
            <div className="bg-white/10 border border-white/10 rounded-xl p-4 mb-3">
              <p className="text-white font-semibold text-sm leading-relaxed">{trick?.trick || '—'}</p>
            </div>
            {trick?.example && (
              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-xl p-3">
                <p className="text-yellow-200 text-sm italic">📌 {trick.example}</p>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={onSkip}
              className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm font-medium hover:bg-white/10">
              Skip
            </motion.button>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={onRemembered}
              className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-500/20">
              Remembered! 🧠
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Trick study card ─────────────────────────────────────────
function TrickCard({ trick, index, remembered, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className={`bg-gradient-to-br ${catGrad(trick.category)} border rounded-2xl p-5 transition-all ${
        remembered ? 'ring-1 ring-emerald-400/30' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${catChip(trick.category)}`}>
            {trick.category || 'Grammar'}
          </span>
          <h3 className="text-white font-black text-lg mt-2 leading-tight">{trick.topic}</h3>
        </div>
        {remembered && (
          <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold ml-3 flex-shrink-0">
            <CheckCircle size={14} /> Done
          </span>
        )}
      </div>

      {/* Visual mnemonic box */}
      {trick.visual && (
        <div className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
          <span className="text-2xl">{trick.visual}</span>
          <span className="text-white/70 text-sm font-medium">{trick.visual}</span>
        </div>
      )}

      {/* Trick explanation */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-2">
          <Lightbulb size={15} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-white text-sm leading-relaxed">{trick.trick}</p>
        </div>
      </div>

      {/* Example */}
      {trick.example && (
        <div className="flex items-start gap-2 bg-yellow-400/5 border border-yellow-400/15 rounded-xl px-4 py-3 mb-4">
          <span className="text-yellow-400 text-sm font-bold flex-shrink-0">📌</span>
          <p className="text-yellow-100 text-sm italic leading-relaxed">{trick.example}</p>
        </div>
      )}

      {/* "Remembered" toggle */}
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
        onClick={() => onToggle(trick.id)}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all border ${
          remembered
            ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
        }`}
      >
        <Brain size={14} />
        {remembered ? 'Remembered! 🧠' : 'Mark as Remembered'}
      </motion.button>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function MemoryTricksSection({ data, dayNum }) {
  const tricks = data?.memoryTricks?.tricks ?? [];
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  const [catFilter, setCatFilter] = useState('all');
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [remembered, setRemembered] = useState(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem(`memory_remembered_day${dayNum}`);
    return new Set(saved ? JSON.parse(saved) : []);
  });

  // Categories
  const categories = ['all', ...new Set(tricks.map(t => t.category).filter(Boolean))];

  // Filtered tricks
  const filtered = tricks.filter(t =>
    catFilter === 'all' || t.category === catFilter
  );

  const rememberedCount = filtered.filter(t => remembered.has(t.id)).length;
  const rememberedPct = filtered.length ? Math.round((rememberedCount / filtered.length) * 100) : 0;

  // Quiz deck: not yet remembered
  const quizDeck = filtered.filter(t => !remembered.has(t.id));
  const quizCard = quizDeck[quizIndex % Math.max(1, quizDeck.length)];

  // Persist
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`memory_remembered_day${dayNum}`, JSON.stringify([...remembered]));
    }
  }, [remembered, dayNum]);

  const toggleRemembered = (id) => {
    setRemembered(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); }
      else { n.add(id); addXP(5); recordQuestionResult?.(id, true); }
      return n;
    });
  };

  const handleQuizRemembered = () => {
    if (!quizCard) return;
    toggleRemembered(quizCard.id);
    setQuizIndex(i => i + 1);
  };

  const handleQuizSkip = () => {
    setQuizIndex(i => i + 1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center mb-8">
        <div className="text-5xl mb-3">🧠</div>
        <h1 className="text-3xl font-black text-white mb-2">Never Forget Grammar Again!</h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          These memory tricks are lowkey genius 💡 Learn one, remember it forever. Your brain will thank you fr fr.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="max-w-2xl mx-auto grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: <Brain size={16} />, label: 'Remembered', val: rememberedCount, color: 'text-violet-400' },
          { icon: <Target size={16} />, label: 'Remaining', val: filtered.length - rememberedCount, color: 'text-cyan-400' },
          { icon: <Trophy size={16} />, label: 'Progress', val: `${rememberedPct}%`, color: 'text-yellow-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className={`${s.color} flex justify-center mb-1`}>{s.icon}</div>
            <div className={`${s.color} font-bold text-xl`}>{s.val}</div>
            <div className="text-gray-500 text-xs">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Memory progress</span><span>{rememberedPct}% locked in 🔒</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
            animate={{ width: `${rememberedPct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Mode toggle */}
      <div className="max-w-2xl mx-auto flex gap-3 mb-5">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setQuizMode(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
            !quizMode ? 'bg-violet-500/30 border-violet-400/50 text-violet-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
          <BookOpen size={15} /> Study Mode
        </motion.button>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => { setQuizMode(true); setQuizIndex(0); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
            quizMode ? 'bg-cyan-500/30 border-cyan-400/50 text-cyan-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
          <Zap size={15} /> Quiz Mode
        </motion.button>
      </div>

      {/* Category filters */}
      <div className="max-w-2xl mx-auto flex gap-2 mb-6 overflow-x-auto pb-1">
        {categories.map(c => (
          <motion.button key={c} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => { setCatFilter(c); setQuizIndex(0); }}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
              catFilter === c
                ? 'bg-violet-500/20 border-violet-400/40 text-violet-300'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}>
            {c}
          </motion.button>
        ))}
      </div>

      {/* ── QUIZ MODE ── */}
      {quizMode ? (
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">
              Quiz: {quizDeck.length > 0 ? Math.min(quizIndex + 1, quizDeck.length) : 0} / {quizDeck.length}
            </span>
            <span className="text-violet-400 text-sm font-semibold">
              {quizDeck.length} left to learn
            </span>
          </div>

          {quizDeck.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div key={quizIndex}
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -30 }}
                transition={{ duration: 0.25 }}>
                <QuizFlipCard
                  trick={quizCard}
                  onRemembered={handleQuizRemembered}
                  onSkip={handleQuizSkip}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center bg-gradient-to-br from-violet-600/20 to-cyan-600/10 border border-violet-400/20 rounded-2xl p-10">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-white font-black text-2xl mb-2">Absolute Beast! 🔥</h3>
              <p className="text-gray-400 text-sm mb-5">You've remembered all tricks in this category. Your memory is insane!</p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setRemembered(prev => {
                    const n = new Set(prev);
                    filtered.forEach(t => n.delete(t.id));
                    return n;
                  });
                  setQuizIndex(0);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-violet-500/30">
                <RotateCcw size={14} className="inline mr-2" /> Reset & Go Again
              </motion.button>
            </motion.div>
          )}
        </div>
      ) : (
        /* ── STUDY MODE ── */
        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Brain size={36} className="mx-auto mb-3 opacity-40" />
              <p>No tricks in this category yet</p>
            </div>
          ) : (
            filtered.map((trick, i) => (
              <TrickCard
                key={trick.id}
                trick={trick}
                index={i}
                remembered={remembered.has(trick.id)}
                onToggle={toggleRemembered}
              />
            ))
          )}
        </div>
      )}

      {/* Completion celebration */}
      <AnimatePresence>
        {!quizMode && rememberedCount === filtered.length && filtered.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto mt-10 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-400/30 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-white font-black text-2xl mb-2">Memory Unlocked!</h3>
            <p className="text-gray-400 text-sm mb-2">
              You've remembered all {filtered.length} memory tricks. That's genuinely impressive. 💜
            </p>
            <p className="text-violet-400 text-sm">Switch to Quiz Mode to test yourself!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
