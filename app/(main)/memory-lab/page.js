'use client';
// ============================================================
// MEMORY LAB — Spaced repetition flashcards, Leitner system
// Features: Flashcard decks, spaced repetition, retention score
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, RotateCcw, CheckCircle2, XCircle, Clock,
  Zap, BookOpen, TrendingUp, Play, Star, ChevronRight,
} from 'lucide-react';
import useUserStore from '@/store/userStore';

// ── Leitner Box system: 5 boxes, each reviewed less frequently ──
const LEITNER_BOXES = [
  { box: 1, label: 'Daily',     interval: 1,  color: 'text-rose-400',    bg: 'bg-rose-500/10' },
  { box: 2, label: 'Every 2d',  interval: 2,  color: 'text-amber-400',   bg: 'bg-amber-500/10' },
  { box: 3, label: 'Every 4d',  interval: 4,  color: 'text-yellow-400',  bg: 'bg-yellow-500/10' },
  { box: 4, label: 'Weekly',    interval: 7,  color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { box: 5, label: 'Mastered',  interval: 14, color: 'text-primary-400', bg: 'bg-primary-500/10' },
];

// ── Real grammar flashcard data ──
const FLASHCARD_DECKS = [
  {
    id: 'be-verb',
    title: 'Be Verb (am/is/are)',
    emoji: '🔤',
    totalCards: 20,
    color: 'from-indigo-500 to-blue-500',
    cards: [
      { id: 1, front: 'मैं खुश हूँ।',          back: 'I am happy.',           hint: 'I → am', box: 1 },
      { id: 2, front: 'वह डॉक्टर है।',         back: 'He is a doctor.',       hint: 'He → is', box: 1 },
      { id: 3, front: 'हम भारतीय हैं।',        back: 'We are Indians.',       hint: 'We → are', box: 2 },
      { id: 4, front: 'क्या वह तैयार है?',     back: 'Is he ready?',          hint: 'Question with "is"', box: 1 },
      { id: 5, front: 'मैं थका हुआ था।',       back: 'I was tired.',          hint: 'Past: I → was', box: 1 },
      { id: 6, front: 'वे खुश थे।',            back: 'They were happy.',      hint: 'Past plural → were', box: 2 },
      { id: 7, front: 'यह किताब अच्छी है।',    back: 'This book is good.',    hint: 'This → is', box: 3 },
      { id: 8, front: 'वह स्कूल में नहीं है।', back: "He is not in school.",  hint: 'Negative: is not', box: 1 },
    ]
  },
  {
    id: 'modals',
    title: 'Modal Verbs',
    emoji: '🔑',
    totalCards: 30,
    color: 'from-violet-500 to-purple-500',
    cards: [
      { id: 1, front: 'मैं English बोल सकता हूँ।',     back: 'I can speak English.',       hint: 'Ability → can', box: 1 },
      { id: 2, front: 'तुम्हें रोज़ practice करनी चाहिए।', back: 'You should practice daily.', hint: 'Advice → should', box: 1 },
      { id: 3, front: 'उसे समय पर आना होगा।',          back: 'He must come on time.',      hint: 'Obligation → must', box: 2 },
      { id: 4, front: 'क्या मैं अंदर आ सकता हूँ?',     back: 'May I come in?',              hint: 'Formal permission → may', box: 1 },
      { id: 5, front: 'वह देर से आ सकती है।',          back: 'She might be late.',          hint: 'Possibility → might', box: 1 },
      { id: 6, front: 'मुझे पानी चाहिए।',              back: 'I would like some water.',    hint: 'Polite request → would like', box: 2 },
      { id: 7, front: 'क्या आप मेरी मदद कर सकते हैं?', back: 'Could you help me, please?',  hint: 'Polite request → could', box: 3 },
      { id: 8, front: 'हमें जाना चाहिए।',             back: 'We ought to go.',             hint: 'Duty → ought to', box: 2 },
    ]
  },
  {
    id: 'tenses',
    title: 'All 12 Tenses',
    emoji: '⏰',
    totalCards: 48,
    color: 'from-amber-500 to-orange-500',
    cards: [
      { id: 1, front: 'मैं रोज़ खाना खाता हूँ।',          back: 'I eat food every day.',               hint: 'Simple Present: V1/V1+s', box: 1 },
      { id: 2, front: 'वह अभी पढ़ रही है।',               back: 'She is studying right now.',          hint: 'Present Continuous: is/am/are + V4', box: 1 },
      { id: 3, front: 'मैंने पत्र लिखा।',                 back: 'I wrote a letter.',                   hint: 'Simple Past: V2', box: 1 },
      { id: 4, front: 'जब मैं आया, वह सो रही थी।',        back: 'When I came, she was sleeping.',     hint: 'Past Continuous: was/were + V4', box: 2 },
      { id: 5, front: 'कल तक मैं काम पूरा कर लूँगा।',     back: 'I will have finished the work by tomorrow.', hint: 'Future Perfect: will have + V3', box: 2 },
      { id: 6, front: 'उसने खाना खा लिया है।',            back: 'She has eaten food.',                 hint: 'Present Perfect: have/has + V3', box: 1 },
      { id: 7, front: 'मैं घर जाऊँगा।',                   back: 'I will go home.',                     hint: 'Simple Future: will + V1', box: 1 },
      { id: 8, front: 'जब से आया हूँ, पढ़ रहा हूँ।',       back: 'I have been studying since I came.', hint: 'Present Perfect Continuous: have been + V4', box: 3 },
    ]
  },
  {
    id: 'vocabulary',
    title: 'Office Vocabulary',
    emoji: '💼',
    totalCards: 50,
    color: 'from-emerald-500 to-teal-500',
    cards: [
      { id: 1, front: 'Deadline',      back: 'समय सीमा — The final date for completing a task',    hint: 'Work context', box: 1 },
      { id: 2, front: 'Collaborate',   back: 'सहयोग करना — To work together on a project',         hint: 'Team work', box: 1 },
      { id: 3, front: 'Priority',      back: 'प्राथमिकता — Most important task to do first',        hint: 'Time management', box: 2 },
      { id: 4, front: 'Feedback',      back: 'प्रतिक्रिया — Comments on someone\'s work',           hint: 'Office communication', box: 1 },
      { id: 5, front: 'Negotiate',     back: 'बातचीत करना — To discuss to reach an agreement',     hint: 'Business context', box: 2 },
      { id: 6, front: 'Implement',     back: 'लागू करना — To put a plan or system into action',    hint: 'Strategy', box: 3 },
      { id: 7, front: 'Agenda',        back: 'कार्यसूची — List of topics for a meeting',            hint: 'Meetings', box: 2 },
      { id: 8, front: 'Stakeholder',   back: 'हितधारक — Person with interest in a project',        hint: 'Business term', box: 4 },
    ]
  },
];

// ── Stats ──
const DECK_STATS = {
  'be-verb':   { learned: 6, review: 2, total: 20 },
  'modals':    { learned: 5, review: 3, total: 30 },
  'tenses':    { learned: 4, review: 4, total: 48 },
  'vocabulary':{ learned: 3, review: 5, total: 50 },
};

// ── Active Flashcard Session ──
function FlashcardSession({ deck, onEnd }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped]     = useState(false);
  const [results, setResults]     = useState([]);    // {id, correct}
  const [done, setDone]           = useState(false);
  const { addXP, addCoins } = useUserStore();

  const cards  = deck.cards;
  const card   = cards[cardIndex];
  const total  = cards.length;
  const correct = results.filter(r => r.correct).length;

  const handleResult = (isCorrect) => {
    const newResults = [...results, { id: card.id, correct: isCorrect }];
    setResults(newResults);
    if (isCorrect) { addXP(5); addCoins(1); }

    if (cardIndex < total - 1) {
      setCardIndex(i => i + 1);
      setFlipped(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    const pct = Math.round((correct / total) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8">
        <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪'}</div>
        <h3 className="text-2xl font-black text-white mb-2">{correct}/{total} Correct</h3>
        <p className="text-slate-400 mb-6">{pct}% accuracy</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onEnd} className="btn-secondary px-6 py-3 flex items-center gap-2 text-sm">
            <RotateCcw size={16} /> Try Again
          </button>
          <button onClick={onEnd} className="btn-gradient px-6 py-3 flex items-center gap-2 text-sm">
            <Zap size={16} /> Done
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Card {cardIndex + 1} of {total}</span>
          <span className="text-emerald-400">{correct} correct so far</span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            animate={{ width: `${((cardIndex) / total) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      {/* Card */}
      <div className="relative cursor-pointer" style={{ perspective: 1000, height: 280 }}
        onClick={() => setFlipped(f => !f)}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d', position: 'absolute', inset: 0 }}
        >
          {/* Front */}
          <div className="absolute inset-0 card flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}>
            <p className="text-xs text-primary-400 font-semibold mb-4 uppercase tracking-wide">
              {deck.title} — Translate / Recall
            </p>
            <p className="text-3xl font-bold text-amber-200 hindi-text leading-relaxed">{card.front}</p>
            <p className="text-xs text-slate-600 mt-6">Tap to reveal answer</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 card flex flex-col items-center justify-center p-8 text-center bg-primary-500/5 border-primary-500/20"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <p className="text-xs text-emerald-400 font-semibold mb-2 uppercase tracking-wide">Answer</p>
            <p className="text-2xl font-bold text-white leading-relaxed">{card.back}</p>
            <p className="text-xs text-slate-500 mt-2">{card.hint}</p>
          </div>
        </motion.div>
      </div>

      {/* Action buttons (show only when flipped) */}
      <AnimatePresence>
        {flipped && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex gap-4">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => handleResult(false)}
              className="flex-1 py-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold flex items-center justify-center gap-2">
              <XCircle size={20} /> Didn't Know
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => handleResult(true)}
              className="flex-1 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={20} /> I Knew It!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MemoryLabPage() {
  const [activeDeck, setActiveDeck] = useState(null);
  const [sessionDeck, setSessionDeck] = useState(null);

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-white mb-1">🧠 Memory Lab</h1>
        <p className="text-slate-400">Spaced repetition flashcards — remember English forever</p>
      </motion.div>

      {/* Leitner Box Visual */}
      <div className="card p-5">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Brain size={18} className="text-primary-400" /> Leitner Box System
        </h2>
        <div className="flex items-end gap-2 overflow-x-auto pb-2">
          {LEITNER_BOXES.map((box, i) => (
            <div key={box.box} className="flex flex-col items-center gap-2 min-w-0 flex-1">
              <motion.div
                className={`w-full rounded-xl border ${box.bg} flex items-center justify-center`}
                style={{ height: `${40 + i * 15}px` }}
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.1 }}>
                <span className="text-xs font-bold text-slate-300">{8 - i * 1}</span>
              </motion.div>
              <p className={`text-[10px] font-semibold ${box.color} text-center`}>{box.label}</p>
              <p className="text-[9px] text-slate-600">Box {box.box}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">Cards move up when you know them, back to box 1 if you forget.</p>
      </div>

      {/* Active Session */}
      {sessionDeck ? (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">{sessionDeck.emoji} {sessionDeck.title}</h2>
            <button onClick={() => setSessionDeck(null)} className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Back to Decks
            </button>
          </div>
          <FlashcardSession deck={sessionDeck} onEnd={() => setSessionDeck(null)} />
        </div>
      ) : (
        // Deck Grid
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-amber-400" /> Flashcard Decks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FLASHCARD_DECKS.map((deck, i) => {
              const stats = DECK_STATS[deck.id] || { learned: 0, review: 0, total: deck.totalCards };
              const pct = Math.round((stats.learned / stats.total) * 100);
              return (
                <motion.div key={deck.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card p-5 cursor-pointer group"
                  onClick={() => setSessionDeck(deck)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${deck.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                      {deck.emoji}
                    </div>
                    {stats.review > 0 && (
                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {stats.review} to review
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-white mb-1">{deck.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{deck.totalCards} cards · {deck.cards.length} in session</p>
                  {/* Progress */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500">{stats.learned} mastered</span>
                    <span className="text-white font-semibold">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${deck.color}`}
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} />
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-slate-500">{stats.total - stats.learned} remaining</span>
                    <span className="text-xs text-primary-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Start <ChevronRight size={12} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card p-5 bg-primary-500/5 border-primary-500/15">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary-400" /> How Spaced Repetition Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-400">
          {[
            '🧠 Review cards just before you forget — optimal timing',
            '📈 Cards you know move to higher boxes (less frequent review)',
            '📉 Cards you forget go back to Box 1 (daily review)',
            '⚡ 15 min/day of flashcards beats 2 hours/week',
            '🔄 5 boxes = 5 levels of memory consolidation',
            '🎯 Goal: Move all cards to Box 5 (Mastered)',
          ].map((tip, i) => (
            <p key={i} className="flex items-start gap-2">{tip}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
