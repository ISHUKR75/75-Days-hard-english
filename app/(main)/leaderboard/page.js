'use client';
// Leaderboard Page — Global rankings, daily/weekly/all-time, animated
// Shows user rank, top students, achievement summary

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trophy, Star, Flame, Crown, Medal, Zap,
  TrendingUp, Users, ArrowUp, ArrowDown, Minus,
  Award, Target,
} from 'lucide-react';
import useUserStore from '@/store/userStore';

// ── Mock Leaderboard Data ────────────────────────────────────
// In production, this would come from a backend API
const generateStudents = () => [
  { rank:1,  name:'Arjun Sharma',   city:'Delhi',       xp:8420, streak:42, level:12, avatar:'A', change:'same',  badge:'🏆', days:68 },
  { rank:2,  name:'Priya Verma',    city:'Bangalore',   xp:7850, streak:35, level:11, avatar:'P', change:'up',    badge:'⭐', days:65 },
  { rank:3,  name:'Rahul Singh',    city:'Mumbai',      xp:7200, streak:28, level:10, avatar:'R', change:'up',    badge:'🔥', days:62 },
  { rank:4,  name:'Anjali Gupta',   city:'Pune',        xp:6800, streak:21, level:9,  avatar:'A', change:'down',  badge:'💡', days:58 },
  { rank:5,  name:'Vikash Kumar',   city:'Chennai',     xp:6340, streak:19, level:9,  avatar:'V', change:'up',    badge:'📚', days:55 },
  { rank:6,  name:'Neha Joshi',     city:'Hyderabad',   xp:5980, streak:15, level:8,  avatar:'N', change:'same',  badge:'🎯', days:52 },
  { rank:7,  name:'Amit Patel',     city:'Ahmedabad',   xp:5650, streak:14, level:8,  avatar:'A', change:'up',    badge:'✨', days:49 },
  { rank:8,  name:'Riya Mehta',     city:'Jaipur',      xp:5320, streak:12, level:7,  avatar:'R', change:'down',  badge:'🌟', days:47 },
  { rank:9,  name:'Suresh Yadav',   city:'Lucknow',     xp:4980, streak:10, level:7,  avatar:'S', change:'up',    badge:'💪', days:44 },
  { rank:10, name:'Divya Nair',     city:'Kochi',       xp:4720, streak:9,  level:6,  avatar:'D', change:'same',  badge:'🚀', days:42 },
  { rank:11, name:'Manish Rao',     city:'Indore',      xp:4450, streak:8,  level:6,  avatar:'M', change:'up',    badge:'📖', days:39 },
  { rank:12, name:'Pooja Agrawal',  city:'Nagpur',      xp:4180, streak:7,  level:6,  avatar:'P', change:'down',  badge:'💫', days:37 },
  { rank:13, name:'Arun Mishra',    city:'Bhopal',      xp:3920, streak:6,  level:5,  avatar:'A', change:'same',  badge:'🎓', days:35 },
  { rank:14, name:'Kavya Reddy',    city:'Vijayawada',  xp:3680, streak:5,  level:5,  avatar:'K', change:'up',    badge:'🌙', days:32 },
  { rank:15, name:'Rohit Thakur',   city:'Chandigarh',  xp:3450, streak:5,  level:5,  avatar:'R', change:'same',  badge:'🔑', days:30 },
];

const AVATAR_COLORS = [
  'from-indigo-500 to-blue-600',
  'from-purple-500 to-violet-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-sky-600',
];

const RANK_COLORS = {
  1: 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30',
  2: 'text-slate-300 bg-slate-500/15 border-slate-500/30',
  3: 'text-amber-600 bg-amber-600/15 border-amber-600/30',
};

const RANK_ICONS = { 1: '🥇', 2: '🥈', 3: '🥉' };

// ── Change indicator ──────────────────────────────────────────
function RankChange({ change }) {
  if (change === 'up')   return <ArrowUp   size={12} className="text-green-400" />;
  if (change === 'down') return <ArrowDown size={12} className="text-red-400"  />;
  return                        <Minus     size={12} className="text-slate-600" />;
}

// ── Student Row ────────────────────────────────────────────────
function StudentRow({ student, isCurrentUser, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const colorIndex = student.rank % AVATAR_COLORS.length;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.04 }}
      className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border transition-all group ${
        isCurrentUser
          ? 'border-primary-500/40 bg-primary-500/8'
          : 'border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10'
      }`}
    >
      {/* Rank */}
      <div className="w-10 flex items-center justify-center shrink-0">
        {student.rank <= 3 ? (
          <span className="text-xl">{RANK_ICONS[student.rank]}</span>
        ) : (
          <span className={`text-sm font-black w-8 h-8 flex items-center justify-center rounded-xl border ${
            RANK_COLORS[student.rank] || 'text-slate-500 bg-white/5 border-white/10'
          }`}>
            {student.rank}
          </span>
        )}
      </div>

      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${AVATAR_COLORS[colorIndex]} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md`}>
        {student.avatar}
      </div>

      {/* Name + City */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`font-bold text-sm truncate ${isCurrentUser ? 'text-primary-300' : 'text-white'}`}>
            {student.name}
            {isCurrentUser && <span className="text-[10px] text-primary-400 ml-1">(You)</span>}
          </p>
          <span className="text-base shrink-0">{student.badge}</span>
        </div>
        <p className="text-xs text-slate-600 truncate">{student.city} • Day {student.days}</p>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <div className="text-center">
          <p className="text-sm font-bold text-violet-300">{student.xp.toLocaleString()}</p>
          <p className="text-[10px] text-slate-600">XP</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-1">
            <Flame size={12} className="text-orange-400" />
            <p className="text-sm font-bold text-orange-300">{student.streak}</p>
          </div>
          <p className="text-[10px] text-slate-600">Streak</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-indigo-300">Lv.{student.level}</p>
          <p className="text-[10px] text-slate-600">Level</p>
        </div>
      </div>

      {/* Change indicator */}
      <div className="shrink-0">
        <RankChange change={student.change} />
      </div>
    </motion.div>
  );
}

// ── Top 3 Podium ──────────────────────────────────────────────
function Podium({ students }) {
  const top3 = students.slice(0, 3);
  const order = [top3[1], top3[0], top3[2]]; // Silver, Gold, Bronze display order
  const heights = ['h-24', 'h-32', 'h-16'];
  const colorMap = [
    'bg-gradient-to-t from-slate-600/50 to-slate-500/30 border-slate-500/30',
    'bg-gradient-to-t from-yellow-600/50 to-yellow-500/30 border-yellow-500/30',
    'bg-gradient-to-t from-amber-700/50 to-amber-600/30 border-amber-600/30',
  ];

  return (
    <div className="flex items-end justify-center gap-3 py-4">
      {order.map((s, i) => (
        <motion.div
          key={s.rank}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 150 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: i === 1 ? [0, -6, 0] : 0 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-center"
          >
            <div className={`text-3xl mb-1`}>{s.badge}</div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${AVATAR_COLORS[s.rank % AVATAR_COLORS.length]} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
              {s.avatar}
            </div>
            <p className="text-xs font-bold text-white mt-1 max-w-[72px] truncate">{s.name.split(' ')[0]}</p>
            <p className="text-[10px] text-slate-500">{s.xp.toLocaleString()} XP</p>
          </motion.div>

          <div className={`w-20 ${heights[i]} ${colorMap[i]} rounded-t-xl border flex items-center justify-center`}>
            <span className="text-xl font-black text-white">{RANK_ICONS[s.rank]}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('all-time');
  const students = generateStudents();
  const { level, xp, streak } = useUserStore();

  // Mock current user rank
  const userRank = 247;
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-600/20 via-yellow-600/15 to-orange-600/10 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg"
              >
                <Trophy size={22} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">Leaderboard</h1>
                <p className="text-sm text-amber-300 font-medium">Top learners across India 🇮🇳</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">Compete with 10,000+ students. Study hard, climb higher.</p>
          </div>

          {/* Your rank card */}
          <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Your Rank</p>
            <p className="text-3xl font-black text-yellow-300">#{userRank}</p>
            <p className="text-xs text-slate-500 mt-1">Top 2.5%</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <ArrowUp size={12} className="text-green-400" />
              <span className="text-xs text-green-400">+12 this week</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Time Period Tabs ─────────────────────────────────── */}
      <div className="flex gap-2">
        {[
          { id:'daily',    label:'Today'   },
          { id:'weekly',   label:'This Week'},
          { id:'monthly',  label:'This Month'},
          { id:'all-time', label:'All Time' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Podium (Top 3) ───────────────────────────────────── */}
      <div className="card p-6">
        <h3 className="text-center font-bold text-white text-lg mb-2">🏆 Top 3 Champions</h3>
        <Podium students={students} />
      </div>

      {/* ── Full Rankings ────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-bold text-white">Full Rankings</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users size={12} />
            10,247 students
          </div>
        </div>

        {students.map((student, i) => (
          <StudentRow
            key={student.rank}
            student={student}
            isCurrentUser={false}
            index={i}
          />
        ))}

        {/* Current user position */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-white/10" />
          <div className="flex items-center gap-2 py-2 px-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5" />
            <span className="text-xs text-slate-600">• • • {userRank - students.length} more students • • •</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/5" />
          </div>
          <StudentRow
            student={{
              rank: userRank, name:'You', city:'Your City',
              xp, streak, level, avatar:'Y', change:'up',
              badge:'🎯', days: Math.min(xp / 100, 75),
            }}
            isCurrentUser={true}
            index={0}
          />
        </div>
      </div>

      {/* ── How to Climb ─────────────────────────────────────── */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-emerald-400" />
          How to Climb the Leaderboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { icon:'⚡', title:'Earn More XP',     desc:'Complete daily lessons, answer questions, maintain streaks — every correct answer gives XP.' },
            { icon:'🔥', title:'Keep Your Streak', desc:"Don't break your streak! Study daily even for 10 minutes. Streak multiplier increases XP earned." },
            { icon:'🎯', title:'Complete Challenges',desc:'Daily challenges, weekly tests, and special events give bonus XP that boosts your rank fast.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 p-3 rounded-xl bg-white/3">
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{title}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
