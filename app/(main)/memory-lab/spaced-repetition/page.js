'use client';
// Spaced Repetition Flashcards — Vocabulary and grammar cards with SRS algo

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Brain, RotateCcw, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, Zap } from 'lucide-react';
import useUserStore from '@/store/userStore';

// Flashcard deck
const FLASHCARDS = [
  // Day 1 — Simple Present
  { id: 1, front: 'मैं रोज़ स्कूल जाता हूँ।', back: 'I go to school every day.', topic: 'Simple Present', day: 1, level: 'A1' },
  { id: 2, front: 'वह खाना पकाती है।', back: 'She cooks food.', topic: 'Simple Present', day: 1, level: 'A1' },
  { id: 3, front: 'क्या तुम cricket खेलते हो?', back: 'Do you play cricket?', topic: 'Simple Present', day: 1, level: 'A1' },
  // Day 4 — Be Verb
  { id: 4, front: 'मैं एक छात्र हूँ।', back: 'I am a student.', topic: 'Be Verb', day: 4, level: 'A1' },
  { id: 5, front: 'वे बहुत होशियार हैं।', back: 'They are very intelligent.', topic: 'Be Verb', day: 4, level: 'A1' },
  { id: 6, front: 'क्या वह तैयार है?', back: 'Is she ready?', topic: 'Be Verb', day: 4, level: 'A1' },
  // Day 6 — Has/Have
  { id: 7, front: 'मेरे पास एक कुत्ता है।', back: 'I have a dog.', topic: 'Has/Have', day: 6, level: 'A1' },
  { id: 8, front: 'उसके पास बहुत पैसे हैं।', back: 'He has a lot of money.', topic: 'Has/Have', day: 6, level: 'A1' },
  // Day 7 — Had
  { id: 9, front: 'उसके पास पहले एक घर था।', back: 'He had a house before.', topic: 'Had', day: 7, level: 'A1' },
  { id: 10, front: 'जब मैं पहुँचा, वह जा चुकी थी।', back: 'When I arrived, she had already left.', topic: 'Past Perfect', day: 7, level: 'B1' },
  // Vocabulary
  { id: 11, front: 'Perseverance', back: 'दृढ़ता — The quality of continuing despite difficulties.\nEx: "His perseverance paid off."', topic: 'Vocabulary', day: 0, level: 'B2' },
  { id: 12, front: 'Eloquent', back: 'वाक्पटु — Expressing ideas clearly and persuasively.\nEx: "She gave an eloquent speech."', topic: 'Vocabulary', day: 0, level: 'B2' },
  { id: 13, front: 'Inevitable', back: 'अपरिहार्य — Impossible to avoid or prevent.\nEx: "Change is inevitable."', topic: 'Vocabulary', day: 0, level: 'B1' },
  { id: 14, front: 'Procrastinate', back: 'टालना — To delay or postpone action.\nEx: "Stop procrastinating!"', topic: 'Vocabulary', day: 0, level: 'B1' },
  { id: 15, front: 'Ambitious', back: 'महत्वाकांक्षी — Having a strong desire to succeed.\nEx: "She is very ambitious."', topic: 'Vocabulary', day: 0, level: 'A2' },
];

export default function SpacedRepetitionPage() {
  const [idx,       setIdx]       = useState(0);
  const [flipped,   setFlipped]   = useState(false);
  const [known,     setKnown]     = useState([]);
  const [unknown,   setUnknown]   = useState([]);
  const [completed, setCompleted] = useState(false);

  const { addXP, addCoins } = useUserStore();

  const card = FLASHCARDS[idx];
  const progress = Math.round(((idx) / FLASHCARDS.length) * 100);

  const handleKnow = useCallback(() => {
    setKnown(k => [...k, card.id]);
    addXP(5);
    addCoins(1);
    if (idx + 1 >= FLASHCARDS.length) setCompleted(true);
    else { setIdx(i => i + 1); setFlipped(false); }
  }, [card, idx, addXP, addCoins]);

  const handleDontKnow = useCallback(() => {
    setUnknown(u => [...u, card.id]);
    if (idx + 1 >= FLASHCARDS.length) setCompleted(true);
    else { setIdx(i => i + 1); setFlipped(false); }
  }, [card, idx]);

  const restart = () => {
    setIdx(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setCompleted(false);
  };

  if (completed) {
    const total = known.length + unknown.length;
    const pct   = total > 0 ? Math.round((known.length / total) * 100) : 0;
    return (
      <div className="max-w-lg mx-auto space-y-5">
        <Link href="/vocabulary-bank" className="text-sm text-slate-500 hover:text-white flex items-center gap-1">
          <ChevronLeft size={14} /> Vocabulary Bank
        </Link>
        <div className="card p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-white mb-2">Session Complete!</h2>
          <p className="text-slate-400 mb-6">You reviewed {total} flashcards</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
              <p className="text-3xl font-black text-accent-400">{known.length}</p>
              <p className="text-xs text-slate-500">Known ✅</p>
            </div>
            <div className="p-4 rounded-xl bg-danger-400/10 border border-danger-400/20">
              <p className="text-3xl font-black text-danger-400">{unknown.length}</p>
              <p className="text-xs text-slate-500">Review Again ❌</p>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-3 rounded-full bg-white/8 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-accent-500 to-emerald-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="text-sm text-slate-500 mt-1">{pct}% mastery this session</p>
          </div>
          <div className="flex gap-2">
            <button onClick={restart} className="btn-secondary flex-1 flex items-center justify-center gap-1.5">
              <RotateCcw size={14} /> Restart
            </button>
            <Link href="/vocabulary-bank" className="btn-primary flex-1 flex items-center justify-center gap-1.5">
              More Words <Zap size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <Link href="/vocabulary-bank" className="text-sm text-slate-500 hover:text-white flex items-center gap-1">
          <ChevronLeft size={14} /> Back
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Brain size={14} className="text-violet-400" />
          <span>Spaced Repetition</span>
        </div>
        <span className="text-xs text-slate-500">{idx + 1} / {FLASHCARDS.length}</span>
      </div>

      {/* Progress */}
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-primary-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Card Info */}
      <div className="flex items-center gap-2">
        <span className="badge text-xs text-primary-400 bg-primary-500/10 border border-primary-500/20">{card.topic}</span>
        <span className="badge text-xs text-slate-500 bg-white/5 border border-white/8">{card.level}</span>
        {card.day > 0 && <span className="text-xs text-slate-600">Day {card.day}</span>}
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setFlipped(f => !f)}
        className="cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <div
          className={`relative w-full transition-all duration-500 ${flipped ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d', minHeight: '240px' }}
        >
          {/* Front */}
          <div
            className="card p-8 text-center w-full absolute inset-0 flex flex-col items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider">Tap to reveal answer</p>
            <p className="hindi-text text-2xl font-bold text-white leading-relaxed">{card.front}</p>
            <p className="text-xs text-slate-600 mt-6">Click / tap anywhere on card</p>
          </div>

          {/* Back */}
          <div
            className="card p-8 text-center w-full absolute inset-0 flex flex-col items-center justify-center border-accent-500/30 bg-accent-500/5"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-xs text-accent-400 mb-4 uppercase tracking-wider font-bold">Answer</p>
            <p className="english-text text-xl font-bold text-white leading-relaxed whitespace-pre-line">{card.back}</p>
          </div>
        </div>
      </div>

      {/* Tap hint when not flipped */}
      {!flipped && (
        <p className="text-center text-xs text-slate-600">Tap card to see the English answer</p>
      )}

      {/* Action Buttons — show after flip */}
      {flipped && (
        <div className="flex gap-3">
          <button
            onClick={handleDontKnow}
            className="flex-1 py-3 rounded-xl bg-danger-400/15 border border-danger-400/20 text-danger-300 font-bold text-sm hover:bg-danger-400/25 transition-all flex items-center justify-center gap-2"
          >
            <ThumbsDown size={16} /> Study Again
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 py-3 rounded-xl bg-accent-500/15 border border-accent-500/20 text-accent-300 font-bold text-sm hover:bg-accent-500/25 transition-all flex items-center justify-center gap-2"
          >
            <ThumbsUp size={16} /> Got It! +5 XP
          </button>
        </div>
      )}

      {/* Session stats */}
      <div className="flex justify-center gap-6 text-xs text-slate-600">
        <span className="text-accent-400">✅ {known.length} known</span>
        <span className="text-danger-400">❌ {unknown.length} review</span>
        <span>{FLASHCARDS.length - idx - 1} remaining</span>
      </div>
    </div>
  );
}
