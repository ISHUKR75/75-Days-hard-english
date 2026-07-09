'use client';
// ============================================================
// LEADERBOARD PAGE - Competitive rankings
// ============================================================

import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Star, Flame, TrendingUp, ChevronUp } from 'lucide-react';

const PLAYERS = [
  { rank: 1, name: 'Rahul Sharma', avatar: '👨‍💻', points: 45890, streak: 42, level: 28, change: 0 },
  { rank: 2, name: 'Priya Singh', avatar: '👩‍🎓', points: 42150, streak: 38, level: 26, change: 1 },
  { rank: 3, name: 'Amit Kumar', avatar: '🧑‍💼', points: 39870, streak: 35, level: 25, change: -1 },
  { rank: 4, name: 'Sneha Patel', avatar: '👩‍💻', points: 37200, streak: 30, level: 23, change: 2 },
  { rank: 5, name: 'Vikram Reddy', avatar: '🧑‍🏫', points: 35500, streak: 28, level: 22, change: 0 },
  { rank: 6, name: 'Ananya Gupta', avatar: '👩‍🔬', points: 33100, streak: 25, level: 21, change: 3 },
  { rank: 7, name: 'Rohit Verma', avatar: '🧑‍⚕️', points: 30900, streak: 22, level: 20, change: -2 },
  { rank: 8, name: 'Kavita Iyer', avatar: '👩‍🎨', points: 28750, streak: 20, level: 19, change: 1 },
  { rank: 9, name: 'Manish Jain', avatar: '🧑‍🚀', points: 26800, streak: 18, level: 18, change: 0 },
  { rank: 10, name: 'Divya Nair', avatar: '👩‍⚖️', points: 25000, streak: 15, level: 17, change: -1 },
  { rank: 11, name: 'You', avatar: '🫵', points: 15420, streak: 12, level: 12, change: 4, isUser: true },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const rowV = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Crown className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white">Leaderboard</h1>
            <p className="text-white/70 mt-1">🇮🇳 Top learners — अपना ranking ऊपर ले जाओ!</p>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {[PLAYERS[1], PLAYERS[0], PLAYERS[2]].map((p, i) => {
          const place = [2, 1, 3][i];
          const colors = { 1: 'from-yellow-500 to-amber-500', 2: 'from-slate-300 to-slate-400', 3: 'from-amber-700 to-orange-800' };
          const heights = { 1: 'h-32', 2: 'h-24', 3: 'h-20' };
          return (
            <motion.div key={p.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center">
              <div className="text-4xl mb-2">{p.avatar}</div>
              <p className="text-white font-bold text-sm text-center truncate w-full">{p.name}</p>
              <p className="text-amber-400 font-bold text-sm">{p.points.toLocaleString()}</p>
              <div className={`w-full ${heights[place]} mt-3 rounded-t-xl bg-gradient-to-b ${colors[place]} flex items-center justify-center`}>
                <span className="text-3xl font-black text-white">{place === 1 ? '👑' : place === 2 ? '🥈' : '🥉'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Rankings Table */}
      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-2 text-center">Points</div>
          <div className="col-span-2 text-center">Streak</div>
          <div className="col-span-2 text-center">Level</div>
        </div>

        {PLAYERS.map(p => (
          <motion.div key={p.rank} variants={rowV}
            className={`grid grid-cols-12 items-center px-4 py-3 border-b border-slate-800/50 hover:bg-white/2 transition-colors ${
              p.isUser ? 'bg-primary-500/5 border-l-2 border-l-primary-500' : ''
            }`}>
            <div className="col-span-1 font-bold text-slate-400">
              {p.rank <= 3 ? ['🥇','🥈','🥉'][p.rank-1] : p.rank}
            </div>
            <div className="col-span-5 flex items-center gap-3">
              <span className="text-2xl">{p.avatar}</span>
              <div>
                <span className={`font-bold text-sm ${p.isUser ? 'text-primary-400' : 'text-white'}`}>{p.name}</span>
                {p.change > 0 && <span className="text-emerald-400 text-xs ml-2 flex items-center gap-0.5 inline-flex"><ChevronUp size={12} />{p.change}</span>}
              </div>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-amber-400 font-bold text-sm">{p.points.toLocaleString()}</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-orange-400 font-bold text-sm flex items-center justify-center gap-1"><Flame size={14} />{p.streak}</span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-violet-400 font-bold text-sm">Lv.{p.level}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
