'use client';
import { useState } from 'react';
import { PenTool, Zap, Loader2 } from 'lucide-react';

export default function WritingCheckerPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const check = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setResult({ score: 78, feedback: 'Good writing! Once AI integration is complete, you will get detailed feedback on grammar, vocabulary, coherence, and style.' });
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><PenTool size={28} className="text-rose-400" /> Writing Checker</h1>
        <p className="text-slate-500">Get AI feedback on your English writing — grammar, style, vocabulary.</p>
      </div>
      <div className="card p-5">
        <label className="block text-sm font-semibold text-slate-300 mb-2">Your Writing</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Write a paragraph, email, or essay here…" className="input w-full resize-none mb-4" />
        <button onClick={check} disabled={loading || !text.trim()} className="btn-primary flex items-center gap-2">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Checking…</> : <><Zap size={16} /> Check Writing</>}
        </button>
      </div>
      {result && (
        <div className="card p-5 border-primary-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center">
              <span className="text-xl font-black text-primary-300">{result.score}</span>
            </div>
            <div>
              <p className="font-bold text-white">Writing Score</p>
              <p className="text-xs text-slate-500">Out of 100</p>
            </div>
          </div>
          <p className="text-sm text-slate-300">{result.feedback}</p>
        </div>
      )}
    </div>
  );
}
