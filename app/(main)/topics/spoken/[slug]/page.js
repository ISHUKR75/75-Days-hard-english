'use client';
// ============================================================
// INDIVIDUAL SPOKEN TOPIC PAGE
// Reuses the same interactive pattern as Grammar
// Fetches data from /api/topics/spoken/[slug]
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Star, CheckCircle, XCircle,
  ChevronRight, ChevronLeft, Eye, Target, Trophy,
  Brain, Send, ArrowRight, HelpCircle, Mic, Play,
} from 'lucide-react';

// ── Sound Hook ───────────────────────────────────────────────
function useSound() {
  const ctxRef = useRef(null);
  const getCtx = useCallback(() => {
    if (!ctxRef.current && typeof window !== 'undefined') ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return ctxRef.current;
  }, []);

  return useCallback((type) => {
    try {
      const ctx = getCtx(); if (!ctx) return;
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      if (type === 'correct') { osc.frequency.setValueAtTime(523, ctx.currentTime); osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3); }
      else if (type === 'wrong') { osc.frequency.setValueAtTime(200, ctx.currentTime); osc.type = 'sawtooth'; gain.gain.setValueAtTime(0.2, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.25); }
    } catch(e) {}
  }, [getCtx]);
}

// ── Sections ─────────────────────────────────────────────────
const SECTIONS = [
  { id: 'learn', icon: BookOpen, label: 'Learn & Conversations' },
  { id: 'practice', icon: Target, label: 'Practice (1000 Q)' },
  { id: 'test', icon: Trophy, label: 'Test (400 Q)' },
];

export default function SpokenTopicPage() {
  const { slug } = useParams();
  const playSound = useSound();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('learn');
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/topics/spoken/${slug}`);
        if (res.ok) setData(await res.json());
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    }
    if (slug) load();
  }, [slug]);

  const handleAnswer = useCallback((isCorrect) => {
    playSound(isCorrect ? 'correct' : 'wrong');
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));
  }, [playSound]);

  if (loading) return (
    <div className="max-w-5xl mx-auto py-20 animate-pulse space-y-6">
      <div className="h-8 w-64 bg-slate-800 rounded-xl" />
      <div className="h-48 bg-slate-800 rounded-3xl" />
      <div className="h-96 bg-slate-800 rounded-3xl" />
    </div>
  );

  const title = data?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-32">
      <Link href="/topics/spoken" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
        <ArrowLeft size={16} /> Back to Spoken English
      </Link>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-rose-500/20 border-2 border-rose-500/30 flex items-center justify-center shrink-0">
            <Mic size={40} className="text-rose-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">{title}</h1>
            <p className="text-slate-400 text-lg">🇮🇳 {data?.totalPracticeQuestions || 1000} प्रैक्टिस + {data?.totalTestQuestions || 400} टेस्ट क्वेश्चन</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-emerald-400">{score.correct}</div>
              <div className="text-xs text-emerald-400/70">Correct ✅</div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-rose-400">{score.wrong}</div>
              <div className="text-xs text-rose-400/70">Wrong ❌</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === id ? 'bg-rose-500/20 text-white border border-rose-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {activeTab === 'learn' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Star className="text-amber-400" /> Concept & Conversations</h2>
              <div className="prose prose-invert max-w-none">
                {(data?.content?.explanation || '').split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-black text-white">{line.replace('# ', '')}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-rose-400 mt-6">{line.replace('## ', '')}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-4">{line.replace('### ', '')}</h3>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-slate-300 leading-relaxed">{line}</p>;
                })}
              </div>
            </div>
          )}

          {activeTab === 'practice' && <PracticeEngine questions={data?.practice || []} onAnswer={handleAnswer} />}
          {activeTab === 'test' && <PracticeEngine questions={data?.test || []} onAnswer={handleAnswer} isTest />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Reusable Practice Engine ─────────────────────────────────
function PracticeEngine({ questions, onAnswer, isTest = false }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const inputRef = useRef(null);
  const q = questions[idx] || {};
  const total = questions.length;
  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  const check = () => {
    if (!input.trim()) return;
    const ok = normalize(input) === normalize(q.english || '');
    setStatus(ok ? 'correct' : 'wrong');
    onAnswer(ok);
  };

  const next = () => {
    setIdx(p => Math.min(total - 1, p + 1));
    setInput(''); setStatus('idle');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  if (total === 0) return <div className="text-center py-20 text-slate-400">No questions available.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
            animate={{ width: `${((idx + 1) / total) * 100}%` }} />
        </div>
        <span className="text-sm text-slate-400 font-mono">{idx + 1}/{total}</span>
      </div>

      <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <span className={`text-xs px-3 py-1 rounded-lg font-bold ${q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : q.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {q.difficulty?.toUpperCase()} {isTest ? '• TEST MODE' : ''}
          </span>
          <span className="text-slate-600 text-xs">Q#{idx + 1}</span>
        </div>

        <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-5">
          <p className="text-xs text-rose-400/70 mb-2">🇮🇳 Translate to English:</p>
          <p className="text-2xl text-white font-bold">{q.hindi}</p>
        </div>

        <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && status === 'idle') check(); }}
          placeholder="Type your English translation..." disabled={status !== 'idle'}
          className={`w-full px-5 py-4 rounded-2xl bg-slate-800 border text-white placeholder-slate-500 focus:outline-none transition-all text-lg ${
            status === 'correct' ? 'border-emerald-500 bg-emerald-500/5' :
            status === 'wrong' ? 'border-rose-500 bg-rose-500/5' :
            'border-slate-700 focus:ring-2 focus:ring-rose-500/50'
          }`} />

        {status === 'correct' && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="text-emerald-400" size={24} />
            <div><p className="text-emerald-400 font-bold">Correct! 🎉 +10 Points</p></div>
          </div>
        )}
        {status === 'wrong' && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <XCircle className="text-rose-400" size={24} />
            <div><p className="text-rose-400 font-bold">Incorrect ❌</p><p className="text-white text-sm">Answer: {q.english}</p></div>
          </div>
        )}

        <div className="flex gap-3">
          {status === 'idle' ? (
            <>
              <button onClick={check} disabled={!input.trim()} className="flex-1 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all disabled:opacity-30 flex items-center justify-center gap-2">
                <Send size={18} /> Check Answer
              </button>
              <button onClick={() => { setStatus('wrong'); onAnswer(false); }}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-amber-400 hover:bg-slate-700"><Eye size={18} /></button>
            </>
          ) : (
            <button onClick={next} className="flex-1 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center justify-center gap-2">
              Next <ArrowRight size={18} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
