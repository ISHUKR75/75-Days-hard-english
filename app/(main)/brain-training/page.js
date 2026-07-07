'use client';
// Brain Training Page — Memory and recall games

import { useState } from 'react';
import Link from 'next/link';
import { Brain, Zap, Target, Clock, Star, ArrowRight, Play, Trophy } from 'lucide-react';

const GAMES = [
  {
    id:       'word-match',
    emoji:    '🃏',
    title:    'Word Match',
    desc:     'Match English words with their Hindi meanings. Memory card game.',
    type:     'Memory',
    duration: '5 min',
    xp:       20,
    color:    'from-indigo-500 to-blue-500',
    href:     '/brain-training/word-match',
  },
  {
    id:       'fill-blank',
    emoji:    '✏️',
    title:    'Fill in the Blank',
    desc:     'Complete sentences using the correct word or grammar form.',
    type:     'Grammar',
    duration: '10 min',
    xp:       30,
    color:    'from-violet-500 to-purple-500',
    href:     '/brain-training/fill-blank',
  },
  {
    id:       'word-order',
    emoji:    '🔀',
    title:    'Word Order',
    desc:     'Rearrange scrambled words to form correct English sentences.',
    type:     'Sentence',
    duration: '8 min',
    xp:       25,
    color:    'from-emerald-500 to-teal-500',
    href:     '/brain-training/word-order',
  },
  {
    id:       'speed-vocab',
    emoji:    '⚡',
    title:    'Speed Vocabulary',
    desc:     'How many words can you identify in 60 seconds? Beat your record!',
    type:     'Vocabulary',
    duration: '1 min',
    xp:       15,
    color:    'from-amber-500 to-orange-500',
    href:     '/brain-training/speed-vocab',
  },
  {
    id:       'error-hunt',
    emoji:    '🔍',
    title:    'Error Hunt',
    desc:     'Find the grammar mistake hidden in each sentence.',
    type:     'Grammar',
    duration: '7 min',
    xp:       25,
    color:    'from-rose-500 to-pink-500',
    href:     '/brain-training/error-hunt',
  },
  {
    id:       'translation-race',
    emoji:    '🏁',
    title:    'Translation Race',
    desc:     'Translate Hindi sentences to English as fast as possible!',
    type:     'Translation',
    duration: '5 min',
    xp:       30,
    color:    'from-cyan-500 to-sky-500',
    href:     '/brain-training/translation-race',
  },
];

export default function BrainTrainingPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Brain size={28} className="text-violet-400" /> Brain Training
        </h1>
        <p className="text-slate-500">Fun mini-games to sharpen your English — vocabulary, grammar, and translation.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '🎮', value: '0',  label: 'Games Played' },
          { icon: '⭐', value: '0',  label: 'XP from Games' },
          { icon: '🏆', value: '—',  label: 'Best Score' },
        ].map(({ icon, value, label }) => (
          <div key={label} className="card p-4 text-center">
            <span className="text-2xl block mb-1">{icon}</span>
            <p className="text-xl font-black text-white">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Game cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GAMES.map((game) => (
          <div key={game.id} className="card p-6 group hover:border-primary-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                {game.emoji}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="badge-primary text-xs">{game.type}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={10} /> {game.duration}
                </span>
              </div>
            </div>

            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-primary-300 transition-colors">
              {game.title}
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">{game.desc}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-violet-400 flex items-center gap-1">
                <Zap size={11} /> +{game.xp} XP
              </span>
              <Link href={game.href}
                className="flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group-hover:gap-2.5">
                Play <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard teaser */}
      <div className="card p-5 border-amber-500/20 bg-amber-500/5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="font-bold text-white">Brain Training Leaderboard</p>
              <p className="text-sm text-slate-500">Compete with other students — who scores highest?</p>
            </div>
          </div>
          <Link href="/leaderboard" className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
            View Rankings <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
