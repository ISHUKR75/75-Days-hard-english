'use client';
// Leaderboard Page — Top learners, weekly ranks, and personal stats

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Medal, Flame, Star, Zap, TrendingUp, ArrowRight, Crown } from 'lucide-react';
import useUserStore from '@/store/userStore';

// ──────────────────────────────────────────────────────────────
// Mock leaderboard data (in production, this would come from a DB)
// ──────────────────────────────────────────────────────────────
const generateLeaderboard = () => {
  const names = [
    'Priya Sharma', 'Rahul Verma', 'Anita Singh', 'Vikram Patel',
    'Neha Gupta', 'Arjun Mishra', 'Pooja Yadav', 'Suresh Kumar',
    'Meena Joshi', 'Deepak Tiwari', 'Kavya Nair', 'Rohan Mehta',
    'Swati Agarwal', 'Amit Jha', 'Riya Bose', 'Kiran Reddy',
    'Gaurav Saxena', 'Shruti Das', 'Manish Dubey', 'Sunita Rao',
  ];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Jaipur'];
  return names.map((name, i) => ({
    rank: i + 1,
    name,
    city: cities[i % cities.length],
    xp: Math.floor(8000 - i * 280 + Math.random() * 150),
    streak: Math.floor(75 - i * 3 + Math.random() * 5),
    lessons: Math.floor(75 - i * 2),
    badge: i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : i < 10 ? '⭐' : '📚',
    level: Math.floor(30 - i * 1.2),
    accuracy: Math.floor(95 - i * 1.5),
  }));
};

const LEADERBOARD = generateLeaderboard();

const TABS = [
  { id: 'weekly',   label: 'Weekly',   emoji: '📆' },
  { id: 'alltime',  label: 'All Time',  emoji: '🏆' },
  { id: 'friends',  label: 'Friends',  emoji: '👥' },
];

const RANK_COLORS = {
  1: 'from-yellow-500 to-amber-500',
  2: 'from-slate-300 to-slate-400',
  3: 'from-orange-600 to-amber-700',
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('weekly');
  const { xp, streak, level, totalLessonsCompleted, getAccuracy } = useUserStore();

  // Find user rank (mock)
  const userRank = 47;

  const top3 = LEADERBOARD.slice(0, 3);
  const rest  = LEADERBOARD.slice(3);

  return (
    <div className="space-y-6">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <Trophy size={28} className="text-amber-400" /> Leaderboard
          </h1>
          <p className="text-slate-500">India ke top English learners — aap kahan hain?</p>
        </div>
        <Link href="/progress" className="btn-secondary text-sm flex items-center gap-2 shrink-0">
          <TrendingUp size={14} /> My Progress
        </Link>
      </div>

      {/* ── My Rank Card ─────────────────────────────────── */}
      <div className="card p-5 border-primary-500/20 bg-primary-500/5">
        <p className="text-xs text-slate-500 mb-2">📍 Your Rank This Week</p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-14 h-14 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
            <span className="text-2xl font-black text-primary-300">#{userRank}</span>
          </div>
          <div className="flex-1">
            <p className="font-black text-white text-lg">You</p>
            <div className="flex gap-3 text-xs text-slate-400 flex-wrap mt-0.5">
              <span className="flex items-center gap-1"><Zap size={11} className="text-violet-400" /> {xp.toLocaleString()} XP</span>
              <span className="flex items-center gap-1"><Flame size={11} className="text-orange-400" /> {streak} streak</span>
              <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" /> Lv.{level}</span>
            </div>
          </div>
          <Link href="/quick-test" className="btn-primary text-xs flex items-center gap-1.5 shrink-0">
            <Zap size={12} /> Earn XP
          </Link>
        </div>
      </div>

      {/* ── Tabs ──────────────────────────────────────────── */}
      <div className="flex gap-1 border-b border-white/8">
        {TABS.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
              activeTab === id
                ? 'border-amber-500 text-amber-300'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* ── Top 3 Podium ─────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[top3[1], top3[0], top3[2]].map((p, i) => {
          const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
          const height = actualRank === 1 ? 'h-32' : actualRank === 2 ? 'h-24' : 'h-20';
          return (
            <div key={p.rank} className="flex flex-col items-center gap-2">
              <div className="text-2xl">{p.badge}</div>
              <p className="text-center font-bold text-white text-xs leading-tight">{p.name.split(' ')[0]}</p>
              <p className="text-center text-[10px] text-slate-500">{p.xp.toLocaleString()} XP</p>
              <div className={`w-full rounded-t-xl ${height} flex items-end justify-center pb-2 bg-gradient-to-t ${RANK_COLORS[actualRank] || 'from-slate-600 to-slate-700'} opacity-80`}>
                <span className="text-white font-black text-lg">#{actualRank}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Full List ─────────────────────────────────────── */}
      <div className="space-y-2">
        {(activeTab === 'friends' ? LEADERBOARD.slice(0, 5) : rest).map((player) => (
          <div
            key={player.rank}
            className="card p-4 flex items-center gap-3"
          >
            {/* Rank */}
            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <span className={`text-xs font-black ${
                player.rank <= 10 ? 'text-amber-400' : 'text-slate-500'
              }`}>
                {player.rank}
              </span>
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {player.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-white text-sm">{player.name}</p>
                <span className="text-sm">{player.badge}</span>
              </div>
              <p className="text-xs text-slate-500">{player.city} · Lv.{player.level}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs shrink-0">
              <div className="hidden sm:flex flex-col items-center">
                <span className="text-amber-400 font-bold">{player.streak}</span>
                <span className="text-slate-600">streak</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-violet-400 font-bold">{player.xp.toLocaleString()}</span>
                <span className="text-slate-600">XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Motivation ───────────────────────────────────── */}
      <div className="card p-5 border-amber-500/15 bg-amber-500/5 text-center">
        <Crown size={32} className="text-amber-400 mx-auto mb-3" />
        <h3 className="font-black text-white text-lg mb-1">Climb the Ranks! 🚀</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
          Har roz practice karo, XP kamate raho, streak maintain karo —
          aur top 10 mein apni jagah banao!
        </p>
        <Link href="/quick-test" className="btn-primary inline-flex items-center gap-2">
          <Zap size={15} /> Start Earning XP
        </Link>
      </div>
    </div>
  );
}
