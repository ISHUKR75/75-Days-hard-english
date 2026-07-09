'use client';
// ============================================================
// BRAIN TRAINING PAGE - Word games and vocabulary exercises
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Star, Trophy, Timer, RefreshCw, CheckCircle, XCircle, Sparkles } from 'lucide-react';

// ── Word Scramble Game ───────────────────────────────────────
const WORDS = [
  { word: 'BEAUTIFUL', hint: 'Attractive, pleasing', hindi: 'सुंदर' },
  { word: 'IMPORTANT', hint: 'Of great significance', hindi: 'महत्वपूर्ण' },
  { word: 'EDUCATION', hint: 'Process of learning', hindi: 'शिक्षा' },
  { word: 'KNOWLEDGE', hint: 'Information and skills', hindi: 'ज्ञान' },
  { word: 'PRACTICE', hint: 'Repeated exercise', hindi: 'अभ्यास' },
  { word: 'LANGUAGE', hint: 'System of communication', hindi: 'भाषा' },
  { word: 'SENTENCE', hint: 'Group of words expressing idea', hindi: 'वाक्य' },
  { word: 'GRAMMAR', hint: 'Rules of language', hindi: 'व्याकरण' },
  { word: 'VOCABULARY', hint: 'Collection of words', hindi: 'शब्दावली' },
  { word: 'TRANSLATE', hint: 'Convert to another language', hindi: 'अनुवाद करना' },
  { word: 'CONFIDENT', hint: 'Self-assured', hindi: 'आत्मविश्वासी' },
  { word: 'EXCELLENT', hint: 'Extremely good', hindi: 'उत्कृष्ट' },
  { word: 'EXPERIENCE', hint: 'Knowledge from doing', hindi: 'अनुभव' },
  { word: 'PRONOUNCE', hint: 'To say a word', hindi: 'उच्चारण करना' },
  { word: 'COMMUNICATE', hint: 'Share information', hindi: 'संवाद करना' },
  { word: 'UNDERSTAND', hint: 'Comprehend meaning', hindi: 'समझना' },
  { word: 'DIFFERENT', hint: 'Not the same', hindi: 'अलग' },
  { word: 'NECESSARY', hint: 'Required, needed', hindi: 'ज़रूरी' },
  { word: 'DETERMINE', hint: 'To decide firmly', hindi: 'निर्धारित करना' },
  { word: 'ACCOMPLISH', hint: 'Achieve, complete', hindi: 'पूरा करना' },
];

function scramble(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('') === word ? scramble(word) : arr.join('');
}

function useSound() {
  const ctxRef = useRef(null);
  const getCtx = useCallback(() => {
    if (!ctxRef.current && typeof window !== 'undefined') ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  }, []);
  return useCallback((type) => {
    try {
      const ctx = getCtx(); if (!ctx) return;
      const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      if (type === 'correct') { osc.frequency.setValueAtTime(523, ctx.currentTime); osc.frequency.setValueAtTime(783, ctx.currentTime + 0.15); g.gain.setValueAtTime(0.3, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3); }
      else { osc.frequency.setValueAtTime(200, ctx.currentTime); osc.type = 'sawtooth'; g.gain.setValueAtTime(0.2, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2); }
    } catch(e) {}
  }, [getCtx]);
}

export default function BrainTrainingPage() {
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [timeLeft, setTimeLeft] = useState(30);
  const playSound = useSound();
  const inputRef = useRef(null);

  const currentWord = WORDS[idx] || {};

  useEffect(() => {
    setScrambled(scramble(currentWord.word || 'TEST'));
    setTimeLeft(30);
  }, [idx, currentWord.word]);

  // Timer
  useEffect(() => {
    if (status !== 'idle' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus('wrong');
          playSound('wrong');
          setScore(p => ({ ...p, wrong: p.wrong + 1 }));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status, timeLeft, playSound]);

  const check = () => {
    if (!input.trim()) return;
    const ok = input.toUpperCase().trim() === currentWord.word;
    setStatus(ok ? 'correct' : 'wrong');
    playSound(ok ? 'correct' : 'wrong');
    setScore(p => ({ correct: p.correct + (ok?1:0), wrong: p.wrong + (ok?0:1) }));
  };

  const next = () => {
    setIdx(p => (p + 1) % WORDS.length);
    setInput(''); setStatus('idle');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Brain className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">Brain Training</h1>
            <p className="text-white/70 mt-1">🇮🇳 Word Scramble — अक्षरों को सही क्रम में जमाओ!</p>
          </div>
        </div>
      </motion.div>

      {/* Score Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-xl font-black text-emerald-400">{score.correct}</div>
            <div className="text-xs text-slate-500">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-rose-400">{score.wrong}</div>
            <div className="text-xs text-slate-500">Wrong</div>
          </div>
        </div>
        <div className={`text-2xl font-black ${timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      {/* Game Card */}
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          
          {/* Scrambled Word */}
          <div className="text-center py-6">
            <p className="text-sm text-purple-400/70 mb-4 uppercase tracking-wider">Unscramble this word:</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {scrambled.split('').map((char, i) => (
                <motion.div
                  key={`${i}-${char}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-12 h-14 rounded-xl bg-purple-500/20 border-2 border-purple-500/30 flex items-center justify-center text-2xl font-black text-white"
                >
                  {char}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hints */}
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-sm px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400">💡 {currentWord.hint}</span>
            <span className="text-sm px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400">🇮🇳 {currentWord.hindi}</span>
          </div>

          {/* Input */}
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value.toUpperCase())}
            onKeyDown={e => { if (e.key === 'Enter' && status === 'idle') check(); }}
            placeholder="Type the correct word..."
            disabled={status !== 'idle'}
            className={`w-full px-5 py-4 rounded-2xl bg-slate-800 border text-white text-center text-2xl font-bold tracking-widest focus:outline-none ${
              status === 'correct' ? 'border-emerald-500 bg-emerald-500/5' :
              status === 'wrong' ? 'border-rose-500 bg-rose-500/5' :
              'border-slate-700 focus:ring-2 focus:ring-purple-500/50'
            }`} />

          {status === 'correct' && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <p className="text-emerald-400 font-bold text-lg flex items-center justify-center gap-2"><CheckCircle size={20} /> Correct! 🎉</p>
            </div>
          )}
          {status === 'wrong' && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
              <p className="text-rose-400 font-bold flex items-center justify-center gap-2"><XCircle size={20} /> Wrong!</p>
              <p className="text-white text-lg font-bold mt-1">Answer: {currentWord.word}</p>
            </div>
          )}

          <button onClick={status === 'idle' ? check : next} disabled={status === 'idle' && !input.trim()}
            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all disabled:opacity-30 shadow-lg">
            {status === 'idle' ? '🔍 Check Answer' : '➡️ Next Word'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
