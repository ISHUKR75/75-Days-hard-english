'use client';
import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

const SECTIONS = [
  { href: '/memory-lab/flashcards',        emoji: '🃏', title: 'Flashcards',           desc: 'Classic spaced repetition flashcards for vocabulary.' },
  { href: '/memory-lab/spaced-repetition', emoji: '🔄', title: 'Spaced Repetition',    desc: 'Smart algorithm — review words just before you forget them.' },
];

export default function MemoryLabPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Zap size={28} className="text-violet-400" /> Memory Lab</h1>
        <p className="text-slate-500">Science-backed memory techniques to learn vocabulary faster.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map(({ href, emoji, title, desc }) => (
          <Link key={href} href={href} className="card p-6 group hover:border-violet-500/30 transition-all">
            <span className="text-3xl block mb-3">{emoji}</span>
            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-violet-300 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500 mb-4">{desc}</p>
            <span className="text-sm font-semibold text-violet-400 flex items-center gap-1">Start <ArrowRight size={14} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
