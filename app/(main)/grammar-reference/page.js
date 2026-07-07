'use client';
import Link from 'next/link';
import { BookMarked, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const GRAMMAR_TOPICS = [
  { id: 'be-verb',        emoji: '📌', title: 'Be Verb (Am/Is/Are)',     level: 'A0', desc: 'The most basic verb in English.' },
  { id: 'has-have',       emoji: '📌', title: 'Has / Have',              level: 'A0', desc: 'Possession and perfect tenses.' },
  { id: 'simple-present', emoji: '⏰', title: 'Simple Present Tense',   level: 'A1', desc: 'Daily habits and facts.' },
  { id: 'simple-past',    emoji: '⏪', title: 'Simple Past Tense',      level: 'A1', desc: 'Completed actions in the past.' },
  { id: 'simple-future',  emoji: '⏩', title: 'Simple Future Tense',    level: 'A1', desc: 'Plans and predictions.' },
  { id: 'present-cont',   emoji: '🔄', title: 'Present Continuous',     level: 'A2', desc: 'Actions happening right now.' },
  { id: 'past-cont',      emoji: '🔄', title: 'Past Continuous',        level: 'A2', desc: 'Actions in progress in the past.' },
  { id: 'present-perfect',emoji: '✅', title: 'Present Perfect',        level: 'B1', desc: 'Experience and recent past.' },
  { id: 'past-perfect',   emoji: '✅', title: 'Past Perfect',           level: 'B1', desc: 'Action before another past action.' },
  { id: 'modals-basic',   emoji: '🔑', title: 'Basic Modals',           level: 'A2', desc: 'Can, Could, Will, Would.' },
  { id: 'modals-adv',     emoji: '🔑', title: 'Advanced Modals',        level: 'B1', desc: 'Must, Should, May, Might.' },
  { id: 'passive-voice',  emoji: '🔀', title: 'Passive Voice',          level: 'B2', desc: 'Subject receives the action.' },
  { id: 'conditionals',   emoji: '❓', title: 'Conditionals (If)',       level: 'B1', desc: 'Real and unreal conditions.' },
  { id: 'reported-speech',emoji: '💬', title: 'Reported Speech',        level: 'B2', desc: 'Reporting what someone said.' },
  { id: 'articles',       emoji: '🔤', title: 'Articles (A/An/The)',     level: 'A2', desc: 'When to use which article.' },
  { id: 'prepositions',   emoji: '📍', title: 'Prepositions',           level: 'A2', desc: 'In, on, at, by, for, since…' },
];

const LEVELS = ['All', 'A0', 'A1', 'A2', 'B1', 'B2'];
const DIFF_MAP = { A0: 'diff-easy', A1: 'diff-easy', A2: 'diff-easy', B1: 'diff-medium', B2: 'diff-hard' };

export default function GrammarReferencePage() {
  const [search, setSearch] = useState('');
  const [level,  setLevel]  = useState('All');

  const filtered = GRAMMAR_TOPICS.filter((t) => {
    const ms = !search || t.title.toLowerCase().includes(search.toLowerCase());
    const ml = level === 'All' || t.level === level;
    return ms && ml;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <BookMarked size={28} className="text-primary-400" /> Grammar Reference
        </h1>
        <p className="text-slate-500">Complete grammar guide — A0 to C2. Click any topic to study.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search grammar topics…" className="input pl-10 text-sm w-full" />
        </div>
        <div className="flex gap-2">
          {LEVELS.map((l) => (
            <button key={l} onClick={() => setLevel(l)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${level === l ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-500 border border-white/8'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <Link key={t.id} href={`/grammar-reference/${t.id}`}
            className="card p-5 group hover:border-primary-500/30 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{t.emoji}</span>
              <span className={`badge text-xs ml-auto ${DIFF_MAP[t.level] || 'diff-easy'}`}>{t.level}</span>
            </div>
            <h3 className="font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">{t.title}</h3>
            <p className="text-xs text-slate-500">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
