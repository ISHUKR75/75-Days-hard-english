'use client';
// ============================================================
// LEADERBOARD PAGE — Top learners, rankings, weekly/all-time
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Flame, Zap, TrendingUp } from 'lucide-react';
import useUserStore from '@/store/userStore';

// Mock leaderboard data (real data will come from backend)
const LEADERBOARD_DATA = {
  weekly: [
    { rank:1, name:'Priya Sharma',  city:'Mumbai',    xp:2480, streak:21, level:18, avatar:'P', color:'from-amber-400 to-yellow-500',  badge:'🥇' },
    { rank:2, name:'Rahul Kumar',   city:'Delhi',     xp:2150, streak:15, level:16, avatar:'R', color:'from-slate-400 to-slate-500',   badge:'🥈' },
    { rank:3, name:'Amit Singh',    city:'Bangalore', xp:1980, streak:12, level:15, avatar:'A', color:'from-amber-600 to-orange-600',  badge:'🥉' },
    { rank:4, name:'Sneha Patel',   city:'Ahmedabad', xp:1740, streak:10, level:13, avatar:'S', color:'from-indigo-500 to-blue-600',   badge:null },
    { rank:5, name:'Vikram Rao',    city:'Chennai',   xp:1560, streak:9,  level:12, avatar:'V', color:'from-emerald-500 to-teal-600',  badge:null },
    { rank:6, name:'Anjali Verma',  city:'Jaipur',    xp:1320, streak:8,  level:11, avatar:'A', color:'from-purple-500 to-violet-600', badge:null },
    { rank:7, name:'Karan Mehta',   city:'Pune',      xp:1200, streak:7,  level:10, avatar:'K', color:'from-pink-500 to-rose-600',     badge:null },
    { rank:8, name:'Divya Gupta',   city:'Lucknow',   xp:1050, streak:6,  level:9,  avatar:'D', color:'from-cyan-500 to-sky-600',      badge:null },
    { rank:9, name:'Rohan Das',     city:'Kolkata',   xp:920,  streak:5,  level:8,  avatar:'R', color:'from-orange-500 to-amber-600',  badge:null },
    { rank:10,name:'Meera Nair',    city:'Kochi',     xp:800,  streak:5,  level:7,  avatar:'M', color:'from-lime-500 to-green-600',    badge:null },
  ],
  allTime: [
    { rank:1, name:'Priya Sharma',   city:'Mumbai',    xp:18400,streak:75, level:45, avatar:'P', color:'from-amber-400 to-yellow-500',  badge:'🥇' },
    { rank:2, name:'Aakash Tiwari',  city:'Varanasi',  xp:16200,streak:68, level:42, avatar:'A', color:'from-slate-400 to-slate-500',   badge:'🥈' },
    { rank:3, name:'Ritu Agarwal',   city:'Jaipur',    xp:14900,streak:62, level:39, avatar:'R', color:'from-amber-600 to-orange-600',  badge:'🥉' },
    { rank:4, name:'Sachin Verma',   city:'Nagpur',    xp:13200,streak:55, level:36, avatar:'S', color:'from-indigo-500 to-blue-600',   badge:null },
    { rank:5, name:'Kavita Mishra',  city:'Bhopal',    xp:11800,streak:50, level:33, avatar:'K', color:'from-emerald-500 to-teal-600',  badge:null },
  ]
};

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('weekly');
  const { xp, level, streak, user } = useUserStore();
  const data = LEADERBOARD_DATA[period];

  // Find user rank (mock)
  const myRank = 47;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <h1 className="text-4xl font-black text-white mb-1">🏆 Leaderboard</h1>
        <p className="text-slate-400">Compete with English learners across India</p>
      </motion.div>

      {/* Period Toggle */}
      <div className="flex gap-2">
        {['weekly','allTime'].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              period === p ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-400 border border-white/8 hover:text-white'
            }`}>
            {p === 'weekly' ? '📅 This Week' : '🏆 All Time'}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 py-6">
        {/* 2nd Place */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
          className="flex flex-col items-center gap-2">
          <div className="text-3xl">🥈</div>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data[1].color} flex items-center justify-center text-2xl font-black text-white`}>
            {data[1].avatar}
          </div>
          <p className="text-sm font-bold text-white">{data[1].name.split(' ')[0]}</p>
          <p className="text-xs text-amber-400 font-bold">{data[1].xp.toLocaleString()} XP</p>
          <div className="w-20 h-20 bg-slate-600/30 rounded-t-xl flex items-end justify-center pb-2">
            <span className="text-2xl font-black text-slate-400">2</span>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="flex flex-col items-center gap-2">
          <div className="text-4xl">👑</div>
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${data[0].color} flex items-center justify-center text-3xl font-black text-white ring-4 ring-amber-400/50 shadow-glow-warning`}>
            {data[0].avatar}
          </div>
          <p className="text-base font-bold text-white">{data[0].name.split(' ')[0]}</p>
          <p className="text-sm text-amber-400 font-bold">{data[0].xp.toLocaleString()} XP</p>
          <div className="w-24 h-28 bg-amber-500/20 rounded-t-xl flex items-end justify-center pb-2 border-2 border-amber-500/30">
            <span className="text-3xl font-black text-amber-400">1</span>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
          className="flex flex-col items-center gap-2">
          <div className="text-3xl">🥉</div>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data[2].color} flex items-center justify-center text-2xl font-black text-white`}>
            {data[2].avatar}
          </div>
          <p className="text-sm font-bold text-white">{data[2].name.split(' ')[0]}</p>
          <p className="text-xs text-amber-400 font-bold">{data[2].xp.toLocaleString()} XP</p>
          <div className="w-20 h-14 bg-amber-700/20 rounded-t-xl flex items-end justify-center pb-2">
            <span className="text-2xl font-black text-amber-700">3</span>
          </div>
        </motion.div>
      </div>

      {/* Full Leaderboard List */}
      <div className="space-y-2">
        {data.map((entry, i) => (
          <motion.div key={entry.rank}
            initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*0.05}}
            className={`card p-4 flex items-center gap-4 ${
              entry.rank <= 3 ? 'border-amber-500/20 bg-amber-500/3' : ''
            }`}>
            <span className={`w-8 text-center font-black ${
              entry.rank === 1 ? 'text-yellow-400 text-xl' :
              entry.rank === 2 ? 'text-slate-400 text-lg' :
              entry.rank === 3 ? 'text-amber-700 text-lg' :
              'text-slate-500 text-base'
            }`}>{entry.badge || `#${entry.rank}`}</span>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${entry.color} flex items-center justify-center text-sm font-black text-white shrink-0`}>
              {entry.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">{entry.name}</p>
              <p className="text-xs text-slate-500">{entry.city} · Lv.{entry.level}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1 text-orange-400 text-xs font-bold"><Flame size={12}/>{entry.streak}</div>
                <p className="text-[10px] text-slate-600">streak</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-primary-300">{entry.xp.toLocaleString()}</p>
                <p className="text-[10px] text-slate-600">XP</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* My Rank */}
      <div className="card p-4 border-primary-500/30 bg-primary-500/8 flex items-center gap-4">
        <span className="w-8 text-center font-black text-primary-300">#{myRank}</span>
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-sm font-black text-white shrink-0">
          {user?.name?.[0] || 'S'}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{user?.name || 'You'} (You)</p>
          <p className="text-xs text-slate-400">Keep practicing to climb the rankings!</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-black text-primary-300">{xp.toLocaleString()}</p>
          <p className="text-[10px] text-slate-600">XP</p>
        </div>
      </div>
    </div>
  );
}
