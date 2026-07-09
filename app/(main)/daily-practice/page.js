'use client';
// ============================================================
// DAILY PRACTICE PAGE - Today's practice with multiple exercises
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, BookOpen, Mic, PenTool, Volume2,
  ChevronRight, Flame, Star, Trophy, Zap,
  CheckCircle, XCircle, ArrowRight, Send, Clock,
  RefreshCw, Brain,
} from 'lucide-react';

// ── Daily exercises based on current day ─────────────────────
const EXERCISES = [
  { id: 'grammar', title: 'Grammar Challenge', icon: BookOpen, emoji: '📝', color: 'from-indigo-500 to-purple-500', questions: 20, time: '10 min' },
  { id: 'vocabulary', title: 'Vocabulary Boost', icon: Target, emoji: '📚', color: 'from-emerald-500 to-teal-500', questions: 15, time: '8 min' },
  { id: 'translation', title: 'Hindi → English', icon: RefreshCw, emoji: '🔄', color: 'from-amber-500 to-orange-500', questions: 25, time: '15 min' },
  { id: 'speaking', title: 'Speaking Warm-up', icon: Mic, emoji: '🗣️', color: 'from-pink-500 to-rose-500', questions: 10, time: '10 min' },
  { id: 'listening', title: 'Listening Practice', icon: Volume2, emoji: '🎧', color: 'from-cyan-500 to-sky-500', questions: 10, time: '8 min' },
  { id: 'writing', title: 'Writing Exercise', icon: PenTool, emoji: '✍️', color: 'from-violet-500 to-purple-500', questions: 5, time: '15 min' },
];

// Sample daily practice questions (Hindi to English)
const DAILY_QUESTIONS = [
  { hindi: 'मैं एक इंजीनियर हूँ।', english: 'I am an engineer.', difficulty: 'easy' },
  { hindi: 'क्या तुम स्कूल जा रहे हो?', english: 'Are you going to school?', difficulty: 'easy' },
  { hindi: 'उसने कल एक किताब पढ़ी।', english: 'He read a book yesterday.', difficulty: 'medium' },
  { hindi: 'हम अगले साल विदेश जाएंगे।', english: 'We will go abroad next year.', difficulty: 'medium' },
  { hindi: 'अगर मैं अमीर होता, तो मैं एक बड़ा घर खरीदता।', english: 'If I were rich, I would buy a big house.', difficulty: 'hard' },
  { hindi: 'वह दो घंटे से पढ़ रही है।', english: 'She has been studying for two hours.', difficulty: 'medium' },
  { hindi: 'मुझे अंग्रेज़ी बोलनी आती है।', english: 'I can speak English.', difficulty: 'easy' },
  { hindi: 'तुम्हें यह काम कल तक पूरा करना होगा।', english: 'You will have to finish this work by tomorrow.', difficulty: 'medium' },
  { hindi: 'काश मैंने उसकी बात मानी होती।', english: 'I wish I had listened to him.', difficulty: 'hard' },
  { hindi: 'बच्चे बगीचे में खेल रहे हैं।', english: 'The children are playing in the garden.', difficulty: 'easy' },
  { hindi: 'उसने कभी विदेश यात्रा नहीं की है।', english: 'He has never traveled abroad.', difficulty: 'medium' },
  { hindi: 'मैं तुम्हें एक अच्छी सलाह दे सकता हूँ।', english: 'I can give you good advice.', difficulty: 'medium' },
  { hindi: 'जब तक तुम वहाँ पहुँचोगे, ट्रेन जा चुकी होगी।', english: 'By the time you reach there, the train will have left.', difficulty: 'hard' },
  { hindi: 'कृपया दरवाज़ा बंद कर दीजिए।', english: 'Please close the door.', difficulty: 'easy' },
  { hindi: 'मुझे नहीं पता कि वह कहाँ रहता है।', english: 'I do not know where he lives.', difficulty: 'medium' },
  { hindi: 'अगर मैं तुम्हारी जगह होता, तो मैं वह नौकरी ले लेता।', english: 'If I were in your place, I would take that job.', difficulty: 'hard' },
  { hindi: 'हमें रोज़ व्यायाम करना चाहिए।', english: 'We should exercise every day.', difficulty: 'easy' },
  { hindi: 'वह एक बहुत ही मेहनती लड़की है।', english: 'She is a very hardworking girl.', difficulty: 'easy' },
  { hindi: 'क्या तुम कभी दिल्ली गए हो?', english: 'Have you ever been to Delhi?', difficulty: 'medium' },
  { hindi: 'जब मैं बच्चा था, मैं रोज़ क्रिकेट खेलता था।', english: 'When I was a child, I used to play cricket every day.', difficulty: 'medium' },
];

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

export default function DailyPracticePage() {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const playSound = useSound();
  const inputRef = useRef(null);

  const q = DAILY_QUESTIONS[idx] || {};
  const total = DAILY_QUESTIONS.length;
  const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  const check = () => {
    if (!input.trim()) return;
    const ok = norm(input) === norm(q.english);
    setStatus(ok ? 'correct' : 'wrong');
    playSound(ok ? 'correct' : 'wrong');
    setScore(p => ({ correct: p.correct + (ok?1:0), wrong: p.wrong + (ok?0:1) }));
  };

  const next = () => {
    setIdx(p => Math.min(total - 1, p + 1));
    setInput(''); setStatus('idle');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const today = new Date();
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];
  const dateStr = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  if (!started) {
    return (
      <div className="max-w-5xl mx-auto space-y-8 pb-32">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
          <div className="relative z-10">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">{dayOfWeek} • {dateStr}</p>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Daily Practice</h1>
            <p className="text-white/80 text-lg">🇮🇳 आज का अभ्यास — {total} सवाल, Hindi to English Translation</p>
          </div>
        </motion.div>

        {/* Exercise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXERCISES.map((ex, i) => {
            const Icon = ex.icon;
            return (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/30 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ex.color} flex items-center justify-center mb-3`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{ex.emoji} {ex.title}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300">{ex.questions} Q</span>
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300 flex items-center gap-1"><Clock size={10} /> {ex.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setStarted(true)}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-black text-xl transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3"
        >
          <Flame size={24} /> Start Today's Practice ({total} Questions)
        </motion.button>
      </div>
    );
  }

  // Practice Mode
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-32">
      {/* Score Bar */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-xl font-black text-emerald-400">{score.correct}</div>
            <div className="text-xs text-slate-500">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-rose-400">{score.wrong}</div>
            <div className="text-xs text-slate-500">Wrong</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-amber-400">
              {(score.correct + score.wrong) > 0 ? Math.round((score.correct / (score.correct + score.wrong)) * 100) : 0}%
            </div>
            <div className="text-xs text-slate-500">Accuracy</div>
          </div>
        </div>
        <span className="text-sm text-slate-400 font-mono">{idx + 1} / {total}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
          animate={{ width: `${((idx + 1) / total) * 100}%` }} />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className={`text-xs px-3 py-1 rounded-lg font-bold ${q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : q.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {q.difficulty?.toUpperCase()}
            </span>
            <span className="text-slate-600 text-xs">Q#{idx + 1}</span>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5">
            <p className="text-xs text-amber-400/70 mb-2">🇮🇳 Translate to English:</p>
            <p className="text-2xl text-white font-bold">{q.hindi}</p>
          </div>

          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && status === 'idle') check(); }}
            placeholder="Type your English translation here..."
            disabled={status !== 'idle'}
            className={`w-full px-5 py-4 rounded-2xl bg-slate-800 border text-white placeholder-slate-500 focus:outline-none text-lg ${
              status === 'correct' ? 'border-emerald-500 bg-emerald-500/5' :
              status === 'wrong' ? 'border-rose-500 bg-rose-500/5' :
              'border-slate-700 focus:ring-2 focus:ring-amber-500/50'
            }`} />

          {status === 'correct' && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <CheckCircle className="text-emerald-400" size={24} />
              <p className="text-emerald-400 font-bold">Correct! 🎉 +10 Points</p>
            </div>
          )}
          {status === 'wrong' && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <div className="flex items-center gap-3">
                <XCircle className="text-rose-400" size={24} />
                <p className="text-rose-400 font-bold">Incorrect ❌</p>
              </div>
              <p className="text-white text-sm mt-2">✅ Correct: <strong>{q.english}</strong></p>
            </div>
          )}

          <div className="flex gap-3">
            {status === 'idle' ? (
              <button onClick={check} disabled={!input.trim()}
                className="flex-1 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold disabled:opacity-30 flex items-center justify-center gap-2 shadow-lg">
                <Send size={18} /> Check Answer
              </button>
            ) : (
              <button onClick={next}
                className="flex-1 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg">
                {idx < total - 1 ? <>Next <ArrowRight size={18} /></> : <>Finish 🏆</>}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
