'use client';
// ============================================================
// INDIVIDUAL VOCABULARY TOPIC PAGE  
// Fetches massive data from /api/topics/vocabulary/[slug]
// Shows word list + practice + test with scoring & sounds
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Star, CheckCircle, XCircle,
  ChevronRight, ChevronLeft, Eye, Target, Trophy,
  Send, ArrowRight, Volume2,
} from 'lucide-react';

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
      else if (type === 'wrong') { osc.frequency.setValueAtTime(200, ctx.currentTime); osc.type = 'sawtooth'; g.gain.setValueAtTime(0.2, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2); }
    } catch(e) {}
  }, [getCtx]);
}

const TABS = [
  { id: 'words', icon: BookOpen, label: 'Word List (1000)' },
  { id: 'practice', icon: Target, label: 'Practice (1000 Q)' },
  { id: 'test', icon: Trophy, label: 'Test (400 Q)' },
];

export default function VocabTopicPage() {
  const { slug } = useParams();
  const playSound = useSound();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('words');
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try { const r = await fetch(`/api/topics/vocabulary/${slug}`); if (r.ok) setData(await r.json()); }
      catch(e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [slug]);

  const handleAnswer = useCallback((ok) => {
    playSound(ok ? 'correct' : 'wrong');
    setScore(p => ({ correct: p.correct + (ok?1:0), wrong: p.wrong + (ok?0:1), total: p.total + 1 }));
  }, [playSound]);

  if (loading) return <div className="max-w-5xl mx-auto py-20 animate-pulse"><div className="h-48 bg-slate-800 rounded-3xl" /></div>;

  const title = data?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-32">
      <Link href="/topics/vocabulary" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm"><ArrowLeft size={16} /> Back to Vocabulary</Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center text-4xl shrink-0">{data?.emoji || '📚'}</div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{title}</h1>
            <p className="text-slate-400">🇮🇳 1000 शब्द • Hindi meaning • IPA • Examples</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-emerald-400">{score.correct}</div><div className="text-xs text-emerald-400/70">Correct</div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-rose-400">{score.wrong}</div><div className="text-xs text-rose-400/70">Wrong</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${tab === id ? 'bg-emerald-500/20 text-white border border-emerald-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800'}`}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {tab === 'words' && <WordList words={data?.vocabulary || []} />}
          {tab === 'practice' && <QEngine questions={data?.practice || []} onAnswer={handleAnswer} />}
          {tab === 'test' && <QEngine questions={data?.test || []} onAnswer={handleAnswer} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WordList({ words }) {
  const [page, setPage] = useState(1);
  const pp = 25;
  const tp = Math.ceil(words.length / pp);
  const current = words.slice((page-1)*pp, page*pp);

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">{words.length} words total • Page {page}/{tp}</p>
      <div className="grid gap-3">
        {current.map((w, i) => (
          <motion.div key={w.id||i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-emerald-500/30 transition-all">
            <div className="flex justify-between mb-1">
              <span className="text-white font-bold text-lg">{w.word}</span>
              {w.ipa && <span className="text-slate-500 text-sm">{w.ipa}</span>}
            </div>
            <p className="text-emerald-400 text-sm">🇮🇳 {w.hindi}</p>
            <p className="text-slate-400 text-sm italic mt-1">"{w.example}"</p>
            {w.synonyms?.length > 0 && <p className="text-xs text-slate-500 mt-1">Synonyms: {w.synonyms.join(', ')}</p>}
            {w.antonyms?.length > 0 && <p className="text-xs text-slate-500">Antonyms: {w.antonyms.join(', ')}</p>}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center gap-3 pt-4">
        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="px-4 py-2 rounded-xl bg-slate-800 text-white disabled:opacity-30"><ChevronLeft size={16} /></button>
        <span className="text-white text-sm py-2">{page}/{tp}</span>
        <button onClick={() => setPage(p => Math.min(tp, p+1))} disabled={page===tp} className="px-4 py-2 rounded-xl bg-slate-800 text-white disabled:opacity-30"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
}

function QEngine({ questions, onAnswer }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const ref = useRef(null);
  const q = questions[idx] || {};
  const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim();

  const check = () => { if(!input.trim())return; const ok=norm(input)===norm(q.english||''); setStatus(ok?'correct':'wrong'); onAnswer(ok); };
  const next = () => { setIdx(p=>Math.min(questions.length-1,p+1)); setInput(''); setStatus('idle'); setTimeout(()=>ref.current?.focus(),100); };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" animate={{ width: `${((idx+1)/questions.length)*100}%` }} />
        </div>
        <span className="text-sm text-slate-400 font-mono">{idx+1}/{questions.length}</span>
      </div>
      <motion.div key={idx} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
          <p className="text-xs text-emerald-400/70 mb-2">🇮🇳 Translate:</p>
          <p className="text-2xl text-white font-bold">{q.hindi}</p>
        </div>
        <input ref={ref} type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&status==='idle')check();}}
          placeholder="Type English translation..." disabled={status!=='idle'}
          className={`w-full px-5 py-4 rounded-2xl bg-slate-800 border text-white placeholder-slate-500 focus:outline-none text-lg ${status==='correct'?'border-emerald-500 bg-emerald-500/5':status==='wrong'?'border-rose-500 bg-rose-500/5':'border-slate-700 focus:ring-2 focus:ring-emerald-500/50'}`} />
        {status==='correct' && <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"><CheckCircle className="text-emerald-400" size={24}/><p className="text-emerald-400 font-bold">Correct! 🎉</p></div>}
        {status==='wrong' && <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3"><XCircle className="text-rose-400" size={24}/><div><p className="text-rose-400 font-bold">Wrong ❌</p><p className="text-white text-sm">Answer: {q.english}</p></div></div>}
        <div className="flex gap-3">
          {status==='idle' ? (
            <button onClick={check} disabled={!input.trim()} className="flex-1 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold disabled:opacity-30 flex items-center justify-center gap-2"><Send size={18}/>Check</button>
          ) : (
            <button onClick={next} className="flex-1 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2">Next <ArrowRight size={18}/></button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
