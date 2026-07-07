'use client';
import { useState } from 'react';
import { BookOpen, Zap, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function GrammarCheckPage() {
  const [text,    setText]    = useState('');
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);

  const checkGrammar = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setResult({ corrected: text + ' [Grammar check result will appear here once AI is integrated.]', issues: [] });
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><BookOpen size={28} className="text-indigo-400" /> Grammar Checker</h1>
        <p className="text-slate-500">Type any English sentence — AI will check and correct it.</p>
      </div>
      <div className="card p-5">
        <label className="block text-sm font-semibold text-slate-300 mb-2">Your Text</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Type or paste your English here…" className="input w-full resize-none mb-4" />
        <button onClick={checkGrammar} disabled={loading || !text.trim()} className="btn-primary flex items-center gap-2">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Checking…</> : <><Zap size={16} /> Check Grammar</>}
        </button>
      </div>
      {result && (
        <div className="card p-5 border-accent-500/20 bg-accent-500/5">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-400" /> Corrected Text</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{result.corrected}</p>
        </div>
      )}
    </div>
  );
}
