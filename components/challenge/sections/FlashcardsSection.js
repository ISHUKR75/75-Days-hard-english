// ============================================================
// FlashcardsSection.js — Flashcard study system
// 3D flip animation, mastery tracking, multiple modes
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  ChevronLeft, ChevronRight, RotateCcw, CheckCircle, Shuffle,
  BookOpen, Zap, Target, Star, Filter, Keyboard, Brain, Trophy
} from 'lucide-react';

// ── Session modes ────────────────────────────────────────────
const MODES = [
  { id: 'all',    label: '📚 Learn All',    desc: 'Go through every card' },
  { id: 'weak',   label: '💪 Study Weak',   desc: 'Cards not yet mastered' },
  { id: 'random', label: '🎲 Random',       desc: 'Shuffled surprise mode' },
];

// ── Difficulty badge ─────────────────────────────────────────
const DiffBadge = ({ d }) => {
  const map = {
    easy:   'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    medium: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    hard:   'bg-red-400/10 text-red-400 border-red-400/20',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${map[d] || map.medium}`}>
      {d}
    </span>
  );
};

// ── Flip card ────────────────────────────────────────────────
function FlipCard({ card, flipped, onFlip }) {
  return (
    <div
      className="w-full cursor-pointer select-none"
      style={{ perspective: '1200px' }}
      onClick={onFlip}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d', position: 'relative' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className="w-full"
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[260px] backdrop-blur-xl"
        >
          <div className="text-xs text-violet-400 uppercase tracking-widest mb-4 font-semibold">
            {card?.category || 'Word'} · Tap to flip
          </div>
          <div className="text-4xl font-black text-white text-center mb-3 leading-tight">
            {card?.front || '—'}
          </div>
          {card?.difficulty && <DiffBadge d={card.difficulty} />}
          <div className="mt-6 text-gray-500 text-sm flex items-center gap-1">
            <RotateCcw size={13} /> flip card
          </div>
        </div>

        {/* Back */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
          className="bg-gradient-to-br from-violet-600/20 to-purple-500/10 border border-violet-400/30 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[260px] backdrop-blur-xl"
        >
          <div className="text-xs text-purple-400 uppercase tracking-widest mb-4 font-semibold">Answer</div>
          <div className="text-3xl font-black text-white text-center mb-4 leading-tight">
            {card?.back || '—'}
          </div>
          {card?.example && (
            <div className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-center mt-2">
              <p className="text-gray-200 text-sm italic">"{card.example}"</p>
              {card?.exampleHindi && (
                <p className="text-gray-400 text-xs mt-1">{card.exampleHindi}</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function FlashcardsSection({ data, dayNum }) {
  const rawCards = data?.flashcards?.flashcards ?? [];
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  // State
  const [mode, setMode] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [deck, setDeck] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem(`flash_mastered_day${dayNum}`);
    return new Set(saved ? JSON.parse(saved) : []);
  });
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Derived
  const categories = ['all', ...new Set(rawCards.map(c => c.category).filter(Boolean))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  // Build deck from filters + mode
  const buildDeck = useCallback(() => {
    let cards = rawCards;
    if (catFilter !== 'all') cards = cards.filter(c => c.category === catFilter);
    if (diffFilter !== 'all') cards = cards.filter(c => c.difficulty === diffFilter);
    if (mode === 'weak') cards = cards.filter(c => !mastered.has(c.id));
    if (mode === 'random') cards = [...cards].sort(() => Math.random() - 0.5);
    return cards.length ? cards : rawCards;
  }, [rawCards, catFilter, diffFilter, mode, mastered]);

  useEffect(() => {
    const d = buildDeck();
    setDeck(d);
    setCurrent(0);
    setFlipped(false);
  }, [catFilter, diffFilter, mode]);

  // Persist mastered
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`flash_mastered_day${dayNum}`, JSON.stringify([...mastered]));
    }
  }, [mastered, dayNum]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(f => !f); }
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'm' || e.key === 'M') toggleMastered();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, deck, flipped]);

  const navigate = (dir) => {
    const next = current + dir;
    if (next < 0 || next >= deck.length) return;
    setCurrent(next);
    setFlipped(false);
    setShowHint(false);
  };

  const toggleMastered = () => {
    const card = deck[current];
    if (!card) return;
    const alreadyMastered = mastered.has(card.id);
    setMastered(prev => {
      const n = new Set(prev);
      if (alreadyMastered) {
        n.delete(card.id);
      } else {
        n.add(card.id);
      }
      return n;
    });
    // Side-effects outside the updater to avoid setState-during-render
    if (!alreadyMastered) {
      addXP(5);
      setStreak(s => s + 1);
      recordQuestionResult?.(card.id, true);
    }
  };

  const card = deck[current];
  const masteredCount = deck.filter(c => mastered.has(c.id)).length;
  const masteredPct = deck.length ? Math.round((masteredCount / deck.length) * 100) : 0;

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="text-5xl mb-3">🃏</div>
        <h1 className="text-3xl font-black text-white mb-2">Flashcards</h1>
        <p className="text-gray-400">Tap to flip · Space to flip · → next · ← prev · M to master</p>
      </motion.div>

      {/* Stats bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="max-w-xl mx-auto grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: <Trophy size={15} />, label: 'Mastered', val: masteredCount, color: 'text-yellow-400' },
          { icon: <Target size={15} />, label: 'Remaining', val: deck.length - masteredCount, color: 'text-violet-400' },
          { icon: <Zap size={15} />, label: 'Streak', val: streak, color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <div className={`${s.color} flex justify-center mb-1`}>{s.icon}</div>
            <div className={`${s.color} font-bold text-xl`}>{s.val}</div>
            <div className="text-gray-500 text-xs">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span><span>{masteredPct}% mastered</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
            animate={{ width: `${masteredPct}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      {/* Mode selector */}
      <div className="max-w-xl mx-auto flex gap-2 mb-5 overflow-x-auto pb-1">
        {MODES.map(m => (
          <motion.button key={m.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setMode(m.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              mode === m.id ? 'bg-violet-500/30 border-violet-400/50 text-violet-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
            {m.label}
          </motion.button>
        ))}
      </div>

      {/* Category filter */}
      {categories.length > 1 && (
        <div className="max-w-xl mx-auto flex gap-2 mb-3 overflow-x-auto pb-1">
          {categories.map(c => (
            <motion.button key={c} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setCatFilter(c)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
                catFilter === c ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
              {c}
            </motion.button>
          ))}
        </div>
      )}

      {/* Difficulty filter */}
      <div className="max-w-xl mx-auto flex gap-2 mb-6 overflow-x-auto pb-1">
        {difficulties.map(d => (
          <motion.button key={d} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setDiffFilter(d)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all capitalize ${
              diffFilter === d ? 'bg-purple-500/20 border-purple-400/40 text-purple-300' : 'bg-white/5 border-white/10 text-gray-400'}`}>
            {d}
          </motion.button>
        ))}
      </div>

      {/* Card counter */}
      <div className="max-w-xl mx-auto flex justify-between items-center mb-4">
        <span className="text-gray-400 text-sm">{deck.length > 0 ? `${current + 1} / ${deck.length}` : '0 cards'}</span>
        {card && mastered.has(card.id) && (
          <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
            <CheckCircle size={12} /> Mastered
          </span>
        )}
      </div>

      {/* Flip card */}
      <div className="max-w-xl mx-auto mb-6">
        {deck.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
              <FlipCard card={card} flipped={flipped} onFlip={() => setFlipped(f => !f)} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Brain size={40} className="text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No cards match your filters</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)} disabled={current === 0}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 disabled:opacity-30 hover:bg-white/10 transition-all text-sm font-medium">
          <ChevronLeft size={18} /> Prev
        </motion.button>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={toggleMastered}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${
            card && mastered.has(card.id)
              ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
              : 'bg-gradient-to-r from-violet-600 to-purple-500 border-transparent text-white shadow-lg shadow-violet-500/30'}`}>
          <CheckCircle size={16} />
          {card && mastered.has(card.id) ? 'Unmark' : 'Mastered ✅'}
        </motion.button>

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate(1)} disabled={current === deck.length - 1}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 disabled:opacity-30 hover:bg-white/10 transition-all text-sm font-medium">
          Next <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Keyboard hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="max-w-xl mx-auto mt-6 flex flex-wrap gap-2 justify-center">
        {[['Space', 'Flip'], ['←→', 'Navigate'], ['M', 'Master']].map(([k, v]) => (
          <span key={k} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
            <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-mono text-xs">{k}</kbd> {v}
          </span>
        ))}
      </motion.div>

      {/* Completion celebration */}
      <AnimatePresence>
        {masteredCount === deck.length && deck.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="max-w-xl mx-auto mt-8 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-400/30 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-emerald-400 font-black text-xl mb-1">Deck Complete!</h3>
            <p className="text-gray-400 text-sm">You've mastered all {deck.length} cards. That's actually insane! 🔥</p>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setMastered(new Set()); setCurrent(0); setFlipped(false); }}
              className="mt-4 px-6 py-2 bg-emerald-500 text-white font-bold rounded-xl text-sm">
              Reset & Go Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
