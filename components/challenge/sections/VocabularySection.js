// ============================================================
// VocabularySection.js
// Full-featured vocabulary study component with search, filters,
// mastery tracking, flip mode, TTS, and animated card grid.
// ============================================================

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  Search, Filter, Volume2, Star, CheckCircle2, XCircle,
  ChevronRight, ChevronLeft, RotateCcw, Trophy, Zap,
  Clock, Target, Eye, EyeOff, Lightbulb
} from 'lucide-react';

// ─── CEFR level color mapping ────────────────────────────────
const CEFR_COLORS = {
  A0: 'bg-gray-500/30 text-gray-300',
  A1: 'bg-green-500/30 text-green-300',
  A2: 'bg-emerald-500/30 text-emerald-300',
  B1: 'bg-blue-500/30 text-blue-300',
  B2: 'bg-violet-500/30 text-violet-300',
  C1: 'bg-orange-500/30 text-orange-300',
  C2: 'bg-red-500/30 text-red-300',
};

// ─── Part of speech color mapping ────────────────────────────
const POS_COLORS = {
  noun: 'bg-cyan-500/20 text-cyan-300',
  verb: 'bg-orange-500/20 text-orange-300',
  adjective: 'bg-pink-500/20 text-pink-300',
  adverb: 'bg-yellow-500/20 text-yellow-300',
  pronoun: 'bg-purple-500/20 text-purple-300',
  preposition: 'bg-teal-500/20 text-teal-300',
  conjunction: 'bg-indigo-500/20 text-indigo-300',
  interjection: 'bg-red-500/20 text-red-300',
};

// ─── Speak a word using Web Speech API ───────────────────────
function speakWord(word) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(word);
  utt.lang = 'en-US';
  utt.rate = 0.85;
  window.speechSynthesis.speak(utt);
}

// ─── PAGE SIZE constant ───────────────────────────────────────
const PAGE_SIZE = 50;

// ─── SORT OPTIONS ─────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' },
  { value: 'cefr', label: 'CEFR Level' },
  { value: 'mastered', label: 'Mastered Last' },
];

// ─── SESSION SIZE BUTTONS (%) ─────────────────────────────────
const SESSION_SIZES = [20, 40, 60, 80, 100];

// ─── CEFR order for sorting ───────────────────────────────────
const CEFR_ORDER = { A0: 0, A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

// ============================================================
// WordCard Component
// ============================================================
function WordCard({ word, isMastered, onToggleMastered, flipMode, index }) {
  const [expanded, setExpanded] = useState(false);
  const [flipped, setFlipped] = useState(false);

  // In flip mode the card first shows Hindi side
  const handleCardClick = () => {
    if (flipMode) {
      setFlipped((f) => !f);
    } else {
      setExpanded((e) => !e);
    }
  };

  const posColor = POS_COLORS[word.partOfSpeech?.toLowerCase()] || 'bg-white/10 text-gray-300';
  const cefrColor = CEFR_COLORS[word.cefrLevel] || 'bg-white/10 text-gray-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.6), duration: 0.35 }}
      layout
      className={`relative rounded-2xl border cursor-pointer select-none transition-all duration-200
        ${isMastered
          ? 'bg-emerald-500/10 border-emerald-500/30'
          : 'bg-white/5 border-white/10 hover:border-violet-500/40 hover:bg-white/8'
        } backdrop-blur-xl`}
      onClick={handleCardClick}
    >
      {/* Mastered ribbon */}
      {isMastered && (
        <div className="absolute top-2 right-2 z-10">
          <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
            <CheckCircle2 size={13} /> Mastered
          </span>
        </div>
      )}

      <div className="p-4">
        {/* ── FLIP MODE ── */}
        {flipMode ? (
          <AnimatePresence mode="wait">
            {!flipped ? (
              /* Hindi side */
              <motion.div
                key="hindi"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="min-h-[80px] flex flex-col items-center justify-center gap-2"
              >
                <p className="text-2xl font-bold text-white text-center">{word.hindi}</p>
                <p className="text-gray-400 text-xs">Tap to reveal English</p>
              </motion.div>
            ) : (
              /* English revealed side */
              <motion.div
                key="english"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="min-h-[80px] flex flex-col items-center justify-center gap-1"
              >
                <p className="text-2xl font-bold text-white text-center">{word.word}</p>
                {word.ipa && (
                  <p className="text-violet-300 text-sm font-mono">{word.ipa}</p>
                )}
                <p className="text-gray-300 text-sm">{word.simpleMeaning}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          /* ── NORMAL MODE ── */
          <>
            {/* Top row: word + TTS */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white truncate">{word.word}</h3>
                {word.ipa && (
                  <span className="text-violet-300 text-xs font-mono">{word.ipa}</span>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); speakWord(word.word); }}
                className="p-2 rounded-xl bg-violet-500/20 hover:bg-violet-500/40 text-violet-300 transition-colors flex-shrink-0"
                title="Listen"
              >
                <Volume2 size={15} />
              </button>
            </div>

            {/* Hindi + meaning */}
            <div className="mb-3">
              <p className="text-orange-300 font-semibold text-sm">{word.hindi}</p>
              <p className="text-gray-300 text-sm mt-0.5 line-clamp-2">{word.simpleMeaning}</p>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {word.partOfSpeech && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${posColor}`}>
                  {word.partOfSpeech}
                </span>
              )}
              {word.cefrLevel && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${cefrColor}`}>
                  {word.cefrLevel}
                </span>
              )}
              {word.category && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                  {word.category}
                </span>
              )}
            </div>

            {/* Expanded section */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  {/* Synonyms */}
                  {word.synonyms?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        Synonyms
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {word.synonyms.map((s, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Antonyms */}
                  {word.antonyms?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
                        Antonyms
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {word.antonyms.map((a, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example sentences */}
                  {word.sentences?.length > 0 && (
                    <div>
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
                        Example Sentences
                      </p>
                      <div className="space-y-2">
                        {word.sentences.slice(0, 3).map((s, i) => (
                          <div key={i} className="bg-white/5 rounded-xl p-2.5">
                            {s.context && (
                              <span className="text-violet-400 text-xs font-medium block mb-1">
                                [{s.context}]
                              </span>
                            )}
                            <p className="text-gray-200 text-sm">{s.sentence}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand hint */}
            {!expanded && (
              <p className="text-gray-500 text-xs mt-1">Tap to expand ↓</p>
            )}
          </>
        )}

        {/* Mastered toggle button */}
        <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleMastered(word.id); }}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl transition-all ${
              isMastered
                ? 'bg-emerald-500/20 text-emerald-400 hover:bg-red-500/20 hover:text-red-400'
                : 'bg-white/10 text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400'
            }`}
          >
            {isMastered ? (
              <><CheckCircle2 size={14} /> Mastered ✅</>
            ) : (
              <><Star size={14} /> Mark Mastered</>
            )}
          </button>
          {!flipMode && (
            <button
              onClick={(e) => { e.stopPropagation(); speakWord(word.word); }}
              className="text-gray-500 hover:text-violet-400 transition-colors"
            >
              <Volume2 size={14} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN VocabularySection
// ============================================================
export default function VocabularySection({ data, dayNum }) {
  // ── Stores ─────────────────────────────────────────────────
  const addXP = useGamificationStore((s) => s.addXP);
  const markWordLearned = useProgressStore((s) => s.markWordLearned);
  const storedVocab = useProgressStore((s) => s.vocabulary);

  // ── Vocabulary array (safe fallback) ──────────────────────
  const allWords = useMemo(() => data?.vocabulary || [], [data]);

  // ── Local mastery state (mirrors store for UI reactivity) ──
  const [mastered, setMastered] = useState(() => {
    const init = {};
    allWords.forEach((w) => {
      if (storedVocab?.[w.id]?.mastered) init[w.id] = true;
    });
    return init;
  });

  // ── Search & filter state ──────────────────────────────────
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCefr, setActiveCefr] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [activePos, setActivePos] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [sessionPct, setSessionPct] = useState(100);
  const [flipMode, setFlipMode] = useState(false);
  const [page, setPage] = useState(1);

  // ── Derive filter options from data ────────────────────────
  const categories = useMemo(() => {
    const cats = new Set(allWords.map((w) => w.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [allWords]);

  const cefrLevels = useMemo(() => {
    const lvls = new Set(allWords.map((w) => w.cefrLevel).filter(Boolean));
    return ['All', ...Array.from(lvls).sort((a, b) => (CEFR_ORDER[a] ?? 99) - (CEFR_ORDER[b] ?? 99))];
  }, [allWords]);

  const difficulties = useMemo(() => {
    const d = new Set(allWords.map((w) => w.difficulty).filter(Boolean));
    return ['All', ...Array.from(d)];
  }, [allWords]);

  const partsOfSpeech = useMemo(() => {
    const p = new Set(allWords.map((w) => w.partOfSpeech).filter(Boolean));
    return ['All', ...Array.from(p).sort()];
  }, [allWords]);

  // ── Session slice (by %) ───────────────────────────────────
  const sessionWords = useMemo(() => {
    const count = Math.ceil((sessionPct / 100) * allWords.length);
    return allWords.slice(0, count);
  }, [allWords, sessionPct]);

  // ── Filtered + sorted words ────────────────────────────────
  const filteredWords = useMemo(() => {
    let words = sessionWords;

    // Text search
    if (search.trim()) {
      const q = search.toLowerCase();
      words = words.filter(
        (w) =>
          w.word?.toLowerCase().includes(q) ||
          w.hindi?.toLowerCase().includes(q) ||
          w.simpleMeaning?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'All') words = words.filter((w) => w.category === activeCategory);

    // CEFR filter
    if (activeCefr !== 'All') words = words.filter((w) => w.cefrLevel === activeCefr);

    // Difficulty filter
    if (activeDifficulty !== 'All') words = words.filter((w) => w.difficulty === activeDifficulty);

    // Part of speech filter
    if (activePos !== 'All') words = words.filter((w) => w.partOfSpeech === activePos);

    // Sort
    if (sortBy === 'az') words = [...words].sort((a, b) => a.word?.localeCompare(b.word));
    else if (sortBy === 'za') words = [...words].sort((a, b) => b.word?.localeCompare(a.word));
    else if (sortBy === 'cefr') {
      words = [...words].sort(
        (a, b) => (CEFR_ORDER[a.cefrLevel] ?? 99) - (CEFR_ORDER[b.cefrLevel] ?? 99)
      );
    } else if (sortBy === 'mastered') {
      words = [...words].sort((a, b) => (mastered[a.id] ? 1 : 0) - (mastered[b.id] ? 1 : 0));
    }

    return words;
  }, [sessionWords, search, activeCategory, activeCefr, activeDifficulty, activePos, sortBy, mastered]);

  // Reset to page 1 on filter change
  useEffect(() => { setPage(1); }, [search, activeCategory, activeCefr, activeDifficulty, activePos, sortBy, sessionPct]);

  // ── Paginated slice ────────────────────────────────────────
  const paginatedWords = useMemo(
    () => filteredWords.slice(0, page * PAGE_SIZE),
    [filteredWords, page]
  );

  // ── Toggle mastered ────────────────────────────────────────
  // Compute new value BEFORE calling setMastered so we can run
  // side-effects (store writes, XP) safely outside the updater.
  const handleToggleMastered = useCallback((wordId) => {
    const nowMastered = !mastered[wordId];
    setMastered((prev) => ({ ...prev, [wordId]: nowMastered }));
    markWordLearned(wordId, nowMastered);
    if (nowMastered) addXP(5, { reason: 'vocabulary_mastered' });
  }, [mastered, markWordLearned, addXP]);

  // ── Mastery stats ──────────────────────────────────────────
  const masteredCount = useMemo(() => Object.values(mastered).filter(Boolean).length, [mastered]);
  const totalSession = sessionWords.length;
  const masteredPct = totalSession > 0 ? Math.round((masteredCount / totalSession) * 100) : 0;

  // ── Category chips scroll ref ──────────────────────────────
  const chipScrollRef = useRef(null);

  // ── Chip component (reusable) ──────────────────────────────
  const Chip = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 ${
        active
          ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
          : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6 pb-8">
      {/* ── Hero stats banner ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-500/20 border border-violet-500/30 p-5 backdrop-blur-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white">
              📝 {allWords.length.toLocaleString()} Words
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">
              across {categories.length - 1} categories
            </p>
          </div>
          {/* Mastery progress */}
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Mastered</span>
              <span className="text-emerald-400 font-bold">
                {masteredCount}/{totalSession} ({masteredPct}%)
              </span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${masteredPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
          {/* Flip mode toggle */}
          <button
            onClick={() => setFlipMode((f) => !f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              flipMode
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                : 'bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10'
            }`}
          >
            <RotateCcw size={14} />
            {flipMode ? 'Flip Mode ON' : 'Flip Mode'}
          </button>
        </div>
      </motion.div>

      {/* ── Session size selector ─────────────────────────────── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-gray-400 text-sm font-semibold flex-shrink-0">
            Session Size:
          </span>
          <div className="flex gap-2 flex-wrap">
            {SESSION_SIZES.map((pct) => (
              <button
                key={pct}
                onClick={() => setSessionPct(pct)}
                className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
                  sessionPct === pct
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <span className="text-violet-300 text-sm font-semibold">
            = {Math.ceil((sessionPct / 100) * allWords.length).toLocaleString()} words
          </span>
        </div>
      </div>

      {/* ── Search bar ───────────────────────────────────────── */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search words, Hindi, meanings..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            <XCircle size={16} />
          </button>
        )}
      </div>

      {/* ── Filter rows ──────────────────────────────────────── */}
      <div className="space-y-3">
        {/* Category chips (horizontal scroll) */}
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Category</p>
          <div
            ref={chipScrollRef}
            className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* CEFR + Difficulty + POS + Sort in a responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* CEFR filter */}
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1.5">CEFR</p>
            <div className="flex gap-1.5 flex-wrap">
              {cefrLevels.map((lvl) => (
                <Chip
                  key={lvl}
                  label={lvl}
                  active={activeCefr === lvl}
                  onClick={() => setActiveCefr(lvl)}
                />
              ))}
            </div>
          </div>
          {/* Difficulty */}
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1.5">Difficulty</p>
            <div className="flex gap-1.5 flex-wrap">
              {difficulties.map((d) => (
                <Chip
                  key={d}
                  label={d}
                  active={activeDifficulty === d}
                  onClick={() => setActiveDifficulty(d)}
                />
              ))}
            </div>
          </div>
          {/* Part of speech */}
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1.5">Part of Speech</p>
            <div className="flex gap-1.5 flex-wrap">
              {partsOfSpeech.map((p) => (
                <Chip
                  key={p}
                  label={p}
                  active={activePos === p}
                  onClick={() => setActivePos(p)}
                />
              ))}
            </div>
          </div>
          {/* Sort */}
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1.5">Sort</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-violet-500/50"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-[#1a1a2e]">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Results count ────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          Showing <span className="text-white font-semibold">{paginatedWords.length}</span> of{' '}
          <span className="text-violet-400 font-semibold">{filteredWords.length}</span> words
          {search && <span className="text-gray-500"> matching "{search}"</span>}
        </p>
        <p className="text-emerald-400 text-sm font-semibold">
          ✅ {masteredCount} mastered
        </p>
      </div>

      {/* ── Flip mode instruction ─────────────────────────────── */}
      <AnimatePresence>
        {flipMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-3 text-cyan-300 text-sm text-center"
          >
            🔄 <strong>Flip Mode:</strong> Cards show Hindi first — tap to reveal the English word!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Word card grid ────────────────────────────────────── */}
      {paginatedWords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedWords.map((word, index) => (
            <WordCard
              key={word.id || word.word}
              word={word}
              isMastered={!!mastered[word.id]}
              onToggleMastered={handleToggleMastered}
              flipMode={flipMode}
              index={index % PAGE_SIZE}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">😕 No words match your filters</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); setActiveCefr('All'); setActiveDifficulty('All'); setActivePos('All'); }}
            className="mt-4 px-4 py-2 bg-violet-600/30 text-violet-300 rounded-xl hover:bg-violet-600/50 transition-all text-sm"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* ── Load more / pagination ───────────────────────────── */}
      {paginatedWords.length < filteredWords.length && (
        <div className="flex flex-col items-center gap-3 pt-4">
          <p className="text-gray-500 text-sm">
            {paginatedWords.length} of {filteredWords.length} words loaded
          </p>
          <div className="w-full max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(paginatedWords.length / filteredWords.length) * 100}%` }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
          >
            Load More ({Math.min(PAGE_SIZE, filteredWords.length - paginatedWords.length)} more)
          </motion.button>
        </div>
      )}

      {/* ── Mastery summary at bottom ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-3 mt-4"
      >
        {[
          { label: 'Mastered', value: masteredCount, color: 'text-emerald-400', icon: '✅' },
          { label: 'Remaining', value: totalSession - masteredCount, color: 'text-orange-400', icon: '📚' },
          { label: 'Progress', value: `${masteredPct}%`, color: 'text-violet-400', icon: '🎯' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-xl"
          >
            <p className="text-2xl mb-1">{stat.icon}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
