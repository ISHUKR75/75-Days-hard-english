'use client';
// ============================================================
// VocabCard Component — Flashcard-style vocabulary component
// Props: word, hindi, ipa, example, hindiExample, synonyms,
//        antonyms, category, onMastered, isFlipped
// ============================================================

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Volume2, Star, BookOpen, RotateCcw, CheckCircle,
  AlertCircle, Minus, Tag,
} from 'lucide-react';

// ── Category color map ────────────────────────────────────────
const CATEGORY_COLORS = {
  Noun:        { bg: 'bg-blue-500/15',    border: 'border-blue-500/30',    text: 'text-blue-400'    },
  Verb:        { bg: 'bg-green-500/15',   border: 'border-green-500/30',   text: 'text-green-400'   },
  Adjective:   { bg: 'bg-purple-500/15',  border: 'border-purple-500/30',  text: 'text-purple-400'  },
  Adverb:      { bg: 'bg-orange-500/15',  border: 'border-orange-500/30',  text: 'text-orange-400'  },
  Phrase:      { bg: 'bg-pink-500/15',    border: 'border-pink-500/30',    text: 'text-pink-400'    },
  Idiom:       { bg: 'bg-yellow-500/15',  border: 'border-yellow-500/30',  text: 'text-yellow-400'  },
  Preposition: { bg: 'bg-cyan-500/15',    border: 'border-cyan-500/30',    text: 'text-cyan-400'    },
  default:     { bg: 'bg-white/8',        border: 'border-white/12',       text: 'text-slate-400'   },
};

// ── Mastery levels ────────────────────────────────────────────
const MASTERY = {
  unknown:  { label: 'Not Yet',       color: 'text-slate-400',   bg: 'bg-white/5',          border: 'border-white/10' },
  learning: { label: 'Need Practice', color: 'text-yellow-400',  bg: 'bg-yellow-500/10',    border: 'border-yellow-500/20' },
  known:    { label: 'Known',         color: 'text-blue-400',    bg: 'bg-blue-500/10',      border: 'border-blue-500/20' },
  mastered: { label: 'Mastered ✓',   color: 'text-emerald-400', bg: 'bg-emerald-500/10',   border: 'border-emerald-500/20' },
};

// ── Text-to-speech ────────────────────────────────────────────
function speak(text) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'en-US';
    utt.rate = 0.9;
    utt.pitch = 1;
    window.speechSynthesis.speak(utt);
  } catch (_) {}
}

// ── Pill component for synonyms/antonyms ─────────────────────
function Pill({ label, color = 'bg-white/8 text-slate-400 border-white/10' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${color}`}>
      {label}
    </span>
  );
}

// ── Highlight keyword in example sentence ────────────────────
function HighlightedExample({ text = '', keyword = '' }) {
  if (!keyword || !text) return <span>{text}</span>;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="bg-indigo-500/25 text-indigo-200 rounded px-0.5 not-italic font-semibold">{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
/**
 * VocabCard
 * @param {string}   word         - English word
 * @param {string}   hindi        - Hindi translation
 * @param {string}   ipa          - IPA pronunciation string
 * @param {string}   example      - English example sentence
 * @param {string}   hindiExample - Hindi example sentence
 * @param {string[]} synonyms     - Array of synonym strings
 * @param {string[]} antonyms     - Array of antonym strings
 * @param {string}   category     - Word category (Noun, Verb, etc.)
 * @param {Function} onMastered   - Called with (word, masteryLevel)
 * @param {boolean}  isFlipped    - Controlled flip state (optional)
 */
export default function VocabCard({
  word         = 'Example',
  hindi        = 'उदाहरण',
  ipa          = '/ɪɡˈzɑːmpəl/',
  example      = 'This is an example sentence.',
  hindiExample = 'यह एक उदाहरण वाक्य है।',
  synonyms     = [],
  antonyms     = [],
  category     = 'Noun',
  onMastered,
  isFlipped: controlledFlip,
}) {
  const [flipped,    setFlipped]    = useState(false);
  const [mastery,    setMastery]    = useState('unknown');
  const [bookmarked, setBookmarked] = useState(false);
  const [speaking,   setSpeaking]   = useState(false);
  const [showMasteryMenu, setShowMasteryMenu] = useState(false);

  // Use controlled flip if provided
  const isFlippedState = controlledFlip !== undefined ? controlledFlip : flipped;

  const catColors = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  const masteryInfo = MASTERY[mastery] || MASTERY.unknown;

  // ── Drag-to-flip on mobile ───────────────────────────────
  const dragX = useMotionValue(0);
  const cardRotate = useTransform(dragX, [-120, 0, 120], [-8, 0, 8]);
  const dragRef = useRef(null);

  const handleFlip = useCallback(() => {
    if (controlledFlip === undefined) setFlipped(f => !f);
  }, [controlledFlip]);

  const handleSpeak = useCallback((e) => {
    e.stopPropagation();
    setSpeaking(true);
    speak(word);
    setTimeout(() => setSpeaking(false), 1500);
  }, [word]);

  const handleBookmark = useCallback((e) => {
    e.stopPropagation();
    setBookmarked(b => !b);
  }, []);

  const handleMastery = useCallback((level, e) => {
    e.stopPropagation();
    setMastery(level);
    setShowMasteryMenu(false);
    if (onMastered) onMastered(word, level);
  }, [word, onMastered]);

  const toggleMasteryMenu = useCallback((e) => {
    e.stopPropagation();
    setShowMasteryMenu(m => !m);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      {/* ── Card flip container ─────────────────────────────── */}
      <motion.div
        ref={dragRef}
        style={{ rotateY: isFlippedState ? 180 : 0, rotateZ: cardRotate }}
        animate={{ rotateY: isFlippedState ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 80) handleFlip();
          dragX.set(0);
        }}
        onDrag={(_, info) => dragX.set(info.offset.x)}
        onClick={handleFlip}
        className="relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {/* ══════════════════════════════════════════════════
            FRONT FACE — English word + IPA
        ══════════════════════════════════════════════════ */}
        <div
          className="rounded-2xl border border-white/8 bg-surface-800/70 backdrop-blur-sm p-6 md:p-8 min-h-[300px] flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catColors.bg} ${catColors.text} ${catColors.border} flex items-center gap-1`}>
              <Tag size={10} />
              {category}
            </span>
            <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
              {/* TTS button */}
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={handleSpeak}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  speaking ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10'
                }`}
                title="Pronounce"
              >
                <Volume2 size={14} className={speaking ? 'animate-pulse' : ''} />
              </motion.button>
              {/* Bookmark */}
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={handleBookmark}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  bookmarked ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-slate-500 hover:text-yellow-400 hover:bg-yellow-500/10'
                }`}
                title="Bookmark"
              >
                <Star size={14} fill={bookmarked ? 'currentColor' : 'none'} />
              </motion.button>
            </div>
          </div>

          {/* Word + IPA */}
          <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
            <motion.h2
              key={word}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight"
            >
              {word}
            </motion.h2>
            {ipa && (
              <p className="text-base text-slate-400 font-mono mb-4">{ipa}</p>
            )}
            {/* Example sentence preview */}
            <p className="text-sm text-slate-500 italic max-w-xs leading-relaxed">
              "<HighlightedExample text={example} keyword={word} />"
            </p>
          </div>

          {/* Flip hint */}
          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-slate-600">
            <RotateCcw size={11} />
            <span>Tap to flip • Swipe to navigate</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            BACK FACE — Hindi + full details
        ══════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 rounded-2xl border border-indigo-500/20 bg-indigo-950/60 backdrop-blur-sm p-6 md:p-8 flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${catColors.bg} ${catColors.text} ${catColors.border}`}>
              {word}
            </span>
            <button
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
              onClick={handleSpeak}
              title="Pronounce"
            >
              <Volume2 size={14} />
            </button>
          </div>

          {/* Hindi word */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-center mb-5">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Hindi</p>
              <p className="text-3xl md:text-4xl font-bold text-amber-300 hindi-text">{hindi}</p>
            </div>

            {/* Example sentences */}
            <div className="space-y-2.5 mb-4">
              <div className="p-3 rounded-xl bg-white/4 border border-white/6">
                <p className="text-xs text-slate-500 mb-1">English</p>
                <p className="text-sm text-slate-300 italic example-text">
                  "<HighlightedExample text={example} keyword={word} />"
                </p>
              </div>
              {hindiExample && (
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                  <p className="text-xs text-slate-500 mb-1">Hindi</p>
                  <p className="text-sm text-amber-300/80 italic">{hindiExample}</p>
                </div>
              )}
            </div>

            {/* Synonyms */}
            {synonyms.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 font-medium">Synonyms</p>
                <div className="flex flex-wrap gap-1.5">
                  {synonyms.map((s, i) => (
                    <Pill key={i} label={s} color="bg-emerald-500/10 text-emerald-400 border-emerald-500/20" />
                  ))}
                </div>
              </div>
            )}

            {/* Antonyms */}
            {antonyms.length > 0 && (
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 font-medium">Antonyms</p>
                <div className="flex flex-wrap gap-1.5">
                  {antonyms.map((a, i) => (
                    <Pill key={i} label={a} color="bg-rose-500/10 text-rose-400 border-rose-500/20" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Mastery buttons (below card) ────────────────────── */}
      <div className="mt-4 flex items-center gap-2.5 justify-center" onClick={e => e.stopPropagation()}>
        {/* Need Practice */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={(e) => handleMastery('learning', e)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            mastery === 'learning'
              ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
              : 'bg-white/5 border-white/8 text-slate-400 hover:text-yellow-400 hover:border-yellow-500/25'
          }`}
        >
          <AlertCircle size={13} />
          Need Practice
        </motion.button>

        {/* Mastery indicator pill */}
        <div className={`px-3 py-2 rounded-xl text-xs font-bold border ${masteryInfo.bg} ${masteryInfo.border} ${masteryInfo.color}`}>
          {masteryInfo.label}
        </div>

        {/* Known */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={(e) => handleMastery('known', e)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            mastery === 'known'
              ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
              : 'bg-white/5 border-white/8 text-slate-400 hover:text-blue-400 hover:border-blue-500/25'
          }`}
        >
          <BookOpen size={13} />
          Known
        </motion.button>

        {/* Mastered */}
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={(e) => handleMastery('mastered', e)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
            mastery === 'mastered'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-white/5 border-white/8 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/25'
          }`}
        >
          <CheckCircle size={13} />
          Mastered
        </motion.button>
      </div>
    </div>
  );
}
