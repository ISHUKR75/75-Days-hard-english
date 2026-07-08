'use client';
// Memory Lab — Spaced Repetition Flashcards + Active Recall System
// Inspired by Anki, Duolingo, and the Leitner System

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  RotateCcw, Zap, Calendar, Star, Trophy, Clock,
  BookOpen, Target, TrendingUp, Flame, Play, Pause,
} from 'lucide-react';
import useUserStore    from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ── Flashcard data ─────────────────────────────────────────
const FLASHCARD_DECKS = [
  {
    id: 'imperatives',
    title: 'Imperative Sentences',
    emoji: '⚡',
    color: 'from-indigo-500 to-blue-600',
    count: 50,
    cards: [
      { front: 'दरवाज़ा बंद करो।',          back: 'Close the door.',          level: 0 },
      { front: 'यहाँ बैठो।',                back: 'Sit here.',                level: 0 },
      { front: 'मुझे बताओ।',               back: 'Tell me.',                 level: 0 },
      { front: 'खाना खाओ।',                back: 'Eat food.',                level: 0 },
      { front: 'सावधान रहो।',              back: 'Be careful.',              level: 0 },
      { front: 'कृपया यहाँ sign करें।',    back: 'Please sign here.',        level: 0 },
      { front: 'जल्दी आओ।',               back: 'Come quickly.',            level: 0 },
      { front: 'शांत रहो।',               back: 'Stay calm.',               level: 0 },
      { front: 'रिपोर्ट submit करो।',      back: 'Submit the report.',       level: 0 },
      { front: 'मेरी बात सुनो।',           back: 'Listen to me.',            level: 0 },
    ],
  },
  {
    id: 'be-verb',
    title: 'Be Verb (Am/Is/Are)',
    emoji: '🔤',
    color: 'from-purple-500 to-pink-600',
    count: 60,
    cards: [
      { front: 'मैं एक छात्र हूँ।',         back: 'I am a student.',          level: 0 },
      { front: 'वह डॉक्टर है।',             back: 'He is a doctor.',          level: 0 },
      { front: 'हम खुश हैं।',              back: 'We are happy.',            level: 0 },
      { front: 'क्या तुम ठीक हो?',          back: 'Are you okay?',            level: 0 },
      { front: 'वह थकी हुई है।',            back: 'She is tired.',            level: 0 },
      { front: 'मैं तैयार हूँ।',             back: 'I am ready.',             level: 0 },
      { front: 'वे लोग बाहर हैं।',          back: 'They are outside.',        level: 0 },
      { front: 'यह किताब मेरी है।',         back: 'This book is mine.',       level: 0 },
    ],
  },
  {
    id: 'modals',
    title: 'Modal Verbs (Can/Should/Must)',
    emoji: '🔑',
    color: 'from-emerald-500 to-teal-600',
    count: 80,
    cards: [
      { front: 'मैं English बोल सकता हूँ।', back: 'I can speak English.',      level: 0 },
      { front: 'तुम्हें डॉक्टर के पास जाना चाहिए।', back: 'You should see a doctor.', level: 0 },
      { front: 'उसे समय से आना चाहिए।',    back: 'He must come on time.',    level: 0 },
      { front: 'क्या मैं जा सकता हूँ?',    back: 'Can I go?',               level: 0 },
      { front: 'शायद वह आए।',              back: 'He may come.',             level: 0 },
      { front: 'मुझे काम करना चाहिए।',     back: 'I should work.',           level: 0 },
      { front: 'क्या आप मुझे help कर सकते हैं?', back: 'Can you help me?',  level: 0 },
      { front: 'तुम्हें यह ज़रूर करना चाहिए।', back: 'You must do this.',   level: 0 },
    ],
  },
  {
    id: 'vocabulary-daily',
    title: 'Daily Vocabulary',
    emoji: '📖',
    color: 'from-amber-500 to-orange-600',
    count: 100,
    cards: [
      { front: 'आमतौर पर (usually)',        back: 'I usually wake up at 7.',  level: 0 },
      { front: 'ध्यान से (carefully)',      back: 'Read carefully.',          level: 0 },
      { front: 'तुरंत (immediately)',       back: 'Come immediately.',        level: 0 },
      { front: 'हमेशा (always)',           back: 'Always be honest.',        level: 0 },
      { front: 'शायद (probably)',          back: 'He probably knows.',       level: 0 },
      { front: 'स्पष्ट रूप से (clearly)',  back: 'Speak clearly.',          level: 0 },
      { front: 'जल्दी (quickly)',          back: 'Do it quickly.',           level: 0 },
      { front: 'ध्यान दो (pay attention)', back: 'Pay attention please.',    level: 0 },
    ],
  },
];

// ── Leitner Box labels ─────────────────────────────────────
const LEITNER_BOXES = [
  { box: 0, label: 'New',        color: 'bg-slate-500',   review: 'Daily'    },
  { box: 1, label: 'Learning',   color: 'bg-red-500',     review: 'Daily'    },
  { box: 2, label: 'Reviewing',  color: 'bg-amber-500',   review: 'Every 2d' },
  { box: 3, label: 'Practiced',  color: 'bg-blue-500',    review: 'Every 4d' },
  { box: 4, label: 'Known',      color: 'bg-emerald-500', review: 'Weekly'   },
];

// ── Flip Card component ───────────────────────────────────
function FlipCard({ card, onResult }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      {/* Card */}
      <div
        className="w-full cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(v => !v)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full h-52"
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-xs text-slate-500 mb-3 uppercase tracking-widest">Hindi — Click to reveal</p>
            <p className="text-2xl font-bold text-white">{card.front}</p>
            <p className="text-xs text-slate-600 mt-4">👆 Click to see English</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-xs text-emerald-400 mb-3 uppercase tracking-widest">English ✅</p>
            <p className="text-2xl font-bold text-emerald-300">{card.back}</p>
          </div>
        </motion.div>
      </div>

      {/* Hint */}
      {!flipped && (
        <p className="text-xs text-slate-600 animate-pulse">Click the card to flip it</p>
      )}

      {/* Result buttons — show after flip */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 w-full"
          >
            <button
              onClick={() => onResult(false)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-semibold text-sm hover:bg-red-500/20 transition-all"
            >
              <XCircle size={18} /> Didn't know
            </button>
            <button
              onClick={() => onResult(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold text-sm hover:bg-emerald-500/20 transition-all"
            >
              <CheckCircle2 size={18} /> Got it! ✅
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Study Session ──────────────────────────────────────────
function StudySession({ deck, onComplete }) {
  const cards       = [...deck.cards];
  const [index,     setIndex]     = useState(0);
  const [results,   setResults]   = useState([]);
  const [startTime] = useState(Date.now());
  const { recordAnswer } = useUserStore();

  const handleResult = (correct) => {
    const newResults = [...results, correct];
    setResults(newResults);
    recordAnswer(correct); // recordAnswer internally awards XP+coins on correct

    if (index + 1 >= cards.length) {
      const correctCount = newResults.filter(Boolean).length;
      const timeMin      = Math.round((Date.now() - startTime) / 60000);
      onComplete({ correct: correctCount, total: cards.length, time: timeMin });
    } else {
      setIndex(i => i + 1);
    }
  };

  const progress = Math.round(((index) / cards.length) * 100);
  const current  = cards[index];

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>{index + 1} / {cards.length} cards</span>
          <span>{results.filter(Boolean).length} correct</span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <FlipCard card={current} onResult={handleResult} />
        </motion.div>
      </AnimatePresence>

      {/* Quit */}
      <div className="text-center">
        <button
          onClick={() => onComplete({ correct: results.filter(Boolean).length, total: results.length, time: 0 })}
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          End session early
        </button>
      </div>
    </div>
  );
}

// ── Session complete ───────────────────────────────────────
function SessionComplete({ result, onRestart, onBack }) {
  const accuracy = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-8"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 0.6 }}
        className="text-6xl"
      >
        {accuracy >= 80 ? '🎉' : accuracy >= 50 ? '👍' : '💪'}
      </motion.div>
      <div>
        <h3 className="text-2xl font-black text-white mb-2">Session Complete!</h3>
        <p className="text-slate-400 text-sm">
          {accuracy >= 80 ? 'Excellent work! You\'re getting stronger!' : 'Keep practicing — you\'ll get there!'}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
        {[
          { label: 'Correct',  value: result.correct, color: 'text-emerald-400' },
          { label: 'Accuracy', value: `${accuracy}%`, color: 'text-indigo-400' },
          { label: 'Time',     value: `${result.time}m`,  color: 'text-amber-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card p-4 text-center">
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <button onClick={onRestart} className="btn-primary flex items-center gap-2 px-6 py-3">
          <RotateCcw size={16} /> Study Again
        </button>
        <button onClick={onBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 text-sm font-semibold">
          <ArrowLeft size={16} /> Back to Decks
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function MemoryLabPage() {
  const [selectedDeck, setSelectedDeck]   = useState(null);
  const [sessionMode,  setSessionMode]    = useState(false); // false=overview, true=studying
  const [sessionResult, setSessionResult] = useState(null);
  const { streak, xp } = useUserStore();

  const handleStartDeck = (deck) => {
    setSelectedDeck(deck);
    setSessionMode(true);
    setSessionResult(null);
  };

  const handleComplete = (result) => {
    setSessionResult(result);
    setSessionMode(false);
  };

  const handleBack = () => {
    setSelectedDeck(null);
    setSessionResult(null);
    setSessionMode(false);
  };

  // If in session
  if (sessionMode && selectedDeck) {
    return (
      <div className="max-w-lg mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <button onClick={handleBack} className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Exit
          </button>
          <span className="text-sm font-bold text-white">{selectedDeck.title}</span>
          <span className="text-sm">{selectedDeck.emoji}</span>
        </div>
        <StudySession deck={selectedDeck} onComplete={handleComplete} />
      </div>
    );
  }

  // If session complete
  if (sessionResult) {
    return (
      <div className="max-w-lg mx-auto">
        <SessionComplete result={sessionResult} onRestart={() => handleStartDeck(selectedDeck)} onBack={handleBack} />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <span>🧠</span> Memory Lab
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Spaced repetition, flashcards, and active recall</p>
        </div>
        <Link href="/memory-lab/spaced-repetition"
          className="btn-primary text-sm px-4 py-2 flex items-center gap-2 shrink-0">
          <Zap size={14} /> Smart Review
        </Link>
      </div>

      {/* ── Stats ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: BookOpen,   label: 'Total Cards',    value: '298',   color: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
          { icon: Brain,      label: 'Mastered',       value: '0',     color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { icon: Flame,      label: 'Day Streak',     value: streak,  color: 'text-orange-400',  bg: 'bg-orange-500/10' },
          { icon: Zap,        label: 'Total XP',       value: xp,      color: 'text-violet-400',  bg: 'bg-violet-500/10' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="card p-4">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-2`}>
              <Icon size={16} className={color} />
            </div>
            <p className={`text-xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Leitner Box visualization ────────────────────── */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Trophy size={16} className="text-amber-400" /> Leitner Learning System
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {LEITNER_BOXES.map(({ box, label, color, review }) => (
            <div key={box} className="text-center">
              <div className={`${color} rounded-lg h-16 flex items-center justify-center text-white font-black text-lg mb-1.5`}>
                {box === 0 ? '∞' : box}
              </div>
              <p className="text-xs font-semibold text-slate-300">{label}</p>
              <p className="text-[10px] text-slate-600">{review}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3 text-center">
          Sahi answer → card moves right | Galat → card goes back to box 1
        </p>
      </div>

      {/* ── Flashcard Decks ──────────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Flashcard Decks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FLASHCARD_DECKS.map((deck) => (
            <motion.div
              key={deck.id}
              whileHover={{ y: -3 }}
              className="card p-5 group hover:border-white/15 cursor-pointer relative overflow-hidden"
              onClick={() => handleStartDeck(deck)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${deck.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              <div className="flex items-start gap-4 relative">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${deck.color} flex items-center justify-center text-2xl shadow-lg shrink-0`}>
                  {deck.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm mb-1 group-hover:text-indigo-300 transition-colors">
                    {deck.title}
                  </h3>
                  <p className="text-xs text-slate-500">{deck.count} cards • Hindi → English</p>

                  {/* Mini progress */}
                  <div className="mt-2 h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <div className="h-full w-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  </div>
                  <p className="text-[10px] text-slate-600 mt-1">0% mastered</p>
                </div>
                <Play size={16} className="text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0" fill="currentColor" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Sub-sections ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: '🔄', title: 'Spaced Repetition', desc: 'AI-optimized review schedule', href: '/memory-lab/spaced-repetition', badge: 'SRS' },
          { icon: '📊', title: 'Progress Stats',    desc: 'Track your memory curve',       href: '/memory-lab/flashcards',        badge: null },
          { icon: '🧩', title: 'All Flashcards',    desc: 'Browse all cards by topic',     href: '/memory-lab/flashcards',        badge: null },
        ].map(({ icon, title, desc, href, badge }) => (
          <Link key={title} href={href} className="card p-4 hover:border-white/15 group flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white text-sm">{title}</p>
                {badge && <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-1.5 py-0.5 rounded-md font-bold">{badge}</span>}
              </div>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <ArrowRight size={14} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
