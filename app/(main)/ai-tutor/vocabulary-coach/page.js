'use client';
import Link from 'next/link';
import { Globe, Zap, ArrowRight, BookOpen } from 'lucide-react';

export default function VocabularyCoachPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Globe size={28} className="text-amber-400" /> Vocabulary Coach</h1>
        <p className="text-slate-500">AI-powered vocabulary learning — personalized to your weak areas.</p>
      </div>
      <div className="card p-6 text-center">
        <div className="text-5xl mb-4">📖</div>
        <h3 className="font-bold text-white text-lg mb-2">AI Vocabulary Coach</h3>
        <p className="text-slate-400 text-sm mb-6">The AI coach will track which words you struggle with and create personalized drills for you.</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {['Word of the Day', 'Spaced Repetition', 'Context Sentences', 'Pronunciation Guide'].map((f) => (
            <div key={f} className="p-3 rounded-xl bg-white/5 border border-white/8 text-sm text-slate-300 font-medium">{f}</div>
          ))}
        </div>
        <Link href="/vocabulary" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
          Browse Vocabulary <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
