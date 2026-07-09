'use client';
// ============================================================
// UNIVERSAL TOPIC PAGE - Handles ALL remaining categories:
// pronunciation, writing, real-life, soft-skills, listening,
// reading, practice
// Fetches data from /api/topics/[topicSlug] 
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Star, CheckCircle, XCircle,
  ChevronRight, ChevronLeft, Eye, Target, Trophy,
  Send, ArrowRight, Mic, PenTool, Headphones,
  BookMarked, Zap,
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
      const osc = ctx.createOscillator(); const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      if (type === 'correct') { osc.frequency.setValueAtTime(523, ctx.currentTime); osc.frequency.setValueAtTime(783, ctx.currentTime + 0.15); g.gain.setValueAtTime(0.3, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.3); }
      else { osc.frequency.setValueAtTime(200, ctx.currentTime); osc.type = 'sawtooth'; g.gain.setValueAtTime(0.2, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2); osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.2); }
    } catch(e) {}
  }, [getCtx]);
}

// Category metadata
const CATEGORY_META = {
  pronunciation: { icon: Mic, gradient: 'from-amber-600 via-orange-600 to-red-600', accent: 'amber' },
  writing: { icon: PenTool, gradient: 'from-blue-600 via-indigo-600 to-purple-600', accent: 'indigo' },
  'real-life': { icon: Zap, gradient: 'from-green-600 via-emerald-600 to-teal-600', accent: 'emerald' },
  'soft-skills': { icon: Star, gradient: 'from-violet-600 via-purple-600 to-fuchsia-600', accent: 'purple' },
  listening: { icon: Headphones, gradient: 'from-cyan-600 via-sky-600 to-blue-600', accent: 'sky' },
  reading: { icon: BookMarked, gradient: 'from-rose-600 via-pink-600 to-fuchsia-600', accent: 'pink' },
  practice: { icon: Target, gradient: 'from-lime-600 via-green-600 to-emerald-600', accent: 'green' },
};

const TABS = [
  { id: 'learn', icon: BookOpen, label: 'Learn' },
  { id: 'vocabulary', icon: BookMarked, label: 'Vocabulary' },
  { id: 'practice', icon: Target, label: 'Practice (1000 Q)' },
  { id: 'test', icon: Trophy, label: 'Test (400 Q)' },
];

export default function UniversalTopicPage() {
  const params = useParams();
  const topicSlug = params?.topicSlug || '';
  const playSound = useSound();
  
  // Parse category from slug path or try to determine it
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('learn');
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });
  const [foundCategory, setFoundCategory] = useState('');

  useEffect(() => {
    async function tryFetch() {
      setLoading(true);
      // Try categories in order until we find a match
      const categories = ['pronunciation', 'writing', 'real-life', 'soft-skills', 'listening', 'reading', 'practice'];
      for (const cat of categories) {
        try {
          const res = await fetch(`/api/topics/${cat}/${topicSlug}`);
          if (res.ok) {
            setData(await res.json());
            setFoundCategory(cat);
            break;
          }
        } catch(e) {}
      }
      setLoading(false);
    }
    if (topicSlug) tryFetch();
  }, [topicSlug]);

  const handleAnswer = useCallback((ok) => {
    playSound(ok ? 'correct' : 'wrong');
    setScore(p => ({ correct: p.correct + (ok?1:0), wrong: p.wrong + (ok?0:1), total: p.total + 1 }));
  }, [playSound]);

  if (loading) return (
    <div className="max-w-5xl mx-auto py-20 animate-pulse space-y-6">
      <div className="h-8 w-48 bg-slate-800 rounded-xl" />
      <div className="h-48 bg-slate-800 rounded-3xl" />
      <div className="h-96 bg-slate-800 rounded-3xl" />
    </div>
  );

  const title = data?.title || topicSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const meta = CATEGORY_META[foundCategory] || CATEGORY_META.practice;
  const Icon = meta.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-32">
      <Link href="/topics" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm">
        <ArrowLeft size={16} /> Back to Topics
      </Link>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${meta.gradient} p-6 md:p-10 shadow-2xl`}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Icon size={40} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white/60 text-sm uppercase tracking-wider mb-1">{foundCategory}</p>
            <h1 className="text-3xl md:text-4xl font-black text-white">{title}</h1>
            <p className="text-white/70 mt-2">🇮🇳 {data?.totalPracticeQuestions || 1000} Practice + {data?.totalTestQuestions || 400} Test Questions</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{score.correct}</div><div className="text-xs text-white/60">✅ Correct</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
              <div className="text-2xl font-black text-white">{score.wrong}</div><div className="text-xs text-white/60">❌ Wrong</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map(({ id, icon: TIcon, label }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
              tab === id ? 'bg-white/10 text-white border border-white/20' : 'bg-slate-900 text-slate-400 border border-slate-800'
            }`}>
            <TIcon size={16} /> {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {tab === 'learn' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
              <div className="prose prose-invert max-w-none">
                {(data?.content?.explanation || 'Loading...').split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-black text-white">{line.slice(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-indigo-400 mt-6">{line.slice(3)}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-4">{line.slice(4)}</h3>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i} className="text-slate-300">{line}</p>;
                })}
              </div>
              {data?.content?.rules?.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2"><Star className="text-amber-400" /> Rules</h3>
                  {data.content.rules.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">{i+1}</span>
                      <p className="text-slate-300 text-sm">{r}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === 'vocabulary' && <VocabList words={data?.vocabulary || []} />}
          {tab === 'practice' && <QEngine questions={data?.practice || []} onAnswer={handleAnswer} accent={meta.accent} />}
          {tab === 'test' && <QEngine questions={data?.test || []} onAnswer={handleAnswer} accent={meta.accent} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function VocabList({ words }) {
  const [page, setPage] = useState(1);
  const pp = 25; const tp = Math.ceil(words.length / pp);
  const cur = words.slice((page-1)*pp, page*pp);
  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">{words.length} words • Page {page}/{tp}</p>
      <div className="grid gap-3">
        {cur.map((w, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <span className="text-white font-bold">{w.word}</span>
            {w.ipa && <span className="text-slate-500 text-sm ml-2">{w.ipa}</span>}
            <p className="text-emerald-400 text-sm">🇮🇳 {w.hindi}</p>
            <p className="text-slate-400 text-sm italic">"{w.example}"</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1} className="px-4 py-2 rounded-xl bg-slate-800 text-white disabled:opacity-30"><ChevronLeft size={16}/></button>
        <span className="text-white text-sm py-2">{page}/{tp}</span>
        <button onClick={() => setPage(p => Math.min(tp, p+1))} disabled={page===tp} className="px-4 py-2 rounded-xl bg-slate-800 text-white disabled:opacity-30"><ChevronRight size={16}/></button>
      </div>
    </div>
  );
}

function QEngine({ questions, onAnswer, accent = 'indigo' }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle');
  const ref = useRef(null);
  const q = questions[idx] || {};
  const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g,'').trim();

  const check = () => { if(!input.trim())return; const ok=norm(input)===norm(q.english||''); setStatus(ok?'correct':'wrong'); onAnswer(ok); };
  const next = () => { setIdx(p=>Math.min(questions.length-1,p+1)); setInput(''); setStatus('idle'); setTimeout(()=>ref.current?.focus(),100); };

  if (questions.length === 0) return <div className="text-center py-20 text-slate-400">No questions.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div className={`h-full bg-gradient-to-r from-${accent}-500 to-${accent}-400 rounded-full`} animate={{ width: `${((idx+1)/questions.length)*100}%` }} />
        </div>
        <span className="text-sm text-slate-400 font-mono">{idx+1}/{questions.length}</span>
      </div>
      <motion.div key={idx} initial={{ opacity:0 }} animate={{ opacity:1 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <span className={`text-xs px-3 py-1 rounded-lg font-bold ${q.difficulty==='easy'?'bg-green-500/20 text-green-400':q.difficulty==='medium'?'bg-amber-500/20 text-amber-400':'bg-rose-500/20 text-rose-400'}`}>{q.difficulty?.toUpperCase()}</span>
        <div className={`bg-${accent}-500/5 border border-${accent}-500/10 rounded-2xl p-5`}>
          <p className="text-xs text-slate-400 mb-2">🇮🇳 Translate to English:</p>
          <p className="text-2xl text-white font-bold">{q.hindi}</p>
        </div>
        <input ref={ref} type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&status==='idle')check();}}
          placeholder="Type English..." disabled={status!=='idle'}
          className={`w-full px-5 py-4 rounded-2xl bg-slate-800 border text-white placeholder-slate-500 focus:outline-none text-lg ${status==='correct'?'border-emerald-500':'border-slate-700'} ${status==='wrong'?'border-rose-500':''}`} />
        {status==='correct' && <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"><p className="text-emerald-400 font-bold flex items-center gap-2"><CheckCircle size={20}/>Correct! 🎉 +10</p></div>}
        {status==='wrong' && <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20"><p className="text-rose-400 font-bold flex items-center gap-2"><XCircle size={20}/>Wrong ❌</p><p className="text-white text-sm mt-1">Answer: {q.english}</p></div>}
        <div className="flex gap-3">
          {status==='idle' ? (
            <button onClick={check} disabled={!input.trim()} className={`flex-1 px-6 py-3 rounded-2xl bg-${accent}-600 hover:bg-${accent}-500 text-white font-bold disabled:opacity-30 flex items-center justify-center gap-2`}><Send size={18}/>Check</button>
          ) : (
            <button onClick={next} className={`flex-1 px-6 py-3 rounded-2xl bg-${accent}-600 hover:bg-${accent}-500 text-white font-bold flex items-center justify-center gap-2`}>Next <ArrowRight size={18}/></button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
