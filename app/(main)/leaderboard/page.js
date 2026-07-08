'use client';
// ============================================================
// LEADERBOARD PAGE — Weekly, Monthly, All-Time rankings
// Features: Podium top 3, full rankings, your position,
// animated entries, comparison stats
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Crown, Medal, Star, Zap, Flame, Target,
  TrendingUp, TrendingDown, Minus, Users, ArrowRight,
  Globe, Calendar, Clock, BarChart2, Award, ChevronUp,
} from 'lucide-react';
import { useGamificationStore } from '@/store/useGamificationStore';
import useUserStore from '@/store/userStore';

// ── Animation variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// ── Mock leaderboard data — realistic Indian English learners ──
const MOCK_USERS_WEEKLY = [
  { rank:1,  name:'Arjun Sharma',    city:'Bangalore',   xp:2840, streak:18, level:24, accuracy:94, days:12, avatar:'A', color:'from-violet-500 to-indigo-600',  trend:'up',   change:'+2' },
  { rank:2,  name:'Priya Patel',     city:'Mumbai',      xp:2650, streak:21, level:22, accuracy:91, days:11, avatar:'P', color:'from-pink-500 to-rose-600',      trend:'up',   change:'+1' },
  { rank:3,  name:'Rahul Kumar',     city:'Delhi',       xp:2420, streak:15, level:21, accuracy:89, days:10, avatar:'R', color:'from-emerald-500 to-teal-600',   trend:'same', change:'='  },
  { rank:4,  name:'Sneha Reddy',     city:'Hyderabad',   xp:2180, streak:14, level:19, accuracy:88, days:9,  avatar:'S', color:'from-amber-500 to-orange-600',   trend:'up',   change:'+3' },
  { rank:5,  name:'Vikram Rao',      city:'Chennai',     xp:2050, streak:12, level:18, accuracy:86, days:9,  avatar:'V', color:'from-sky-500 to-blue-600',       trend:'down', change:'-1' },
  { rank:6,  name:'Anjali Singh',    city:'Pune',        xp:1980, streak:11, level:17, accuracy:85, days:8,  avatar:'A', color:'from-rose-500 to-pink-600',      trend:'up',   change:'+2' },
  { rank:7,  name:'Kiran Gupta',     city:'Jaipur',      xp:1850, streak:9,  level:16, accuracy:84, days:8,  avatar:'K', color:'from-teal-500 to-cyan-600',      trend:'down', change:'-2' },
  { rank:8,  name:'Mohit Verma',     city:'Ahmedabad',   xp:1720, streak:8,  level:15, accuracy:82, days:7,  avatar:'M', color:'from-orange-500 to-amber-600',   trend:'up',   change:'+1' },
  { rank:9,  name:'Pooja Iyer',      city:'Kochi',       xp:1650, streak:7,  level:14, accuracy:81, days:7,  avatar:'P', color:'from-indigo-500 to-violet-600',  trend:'same', change:'='  },
  { rank:10, name:'Suresh Nair',     city:'Coimbatore',  xp:1580, streak:7,  level:14, accuracy:80, days:6,  avatar:'S', color:'from-cyan-500 to-sky-600',       trend:'down', change:'-1' },
  { rank:11, name:'Deepa Mishra',    city:'Lucknow',     xp:1490, streak:6,  level:13, accuracy:79, days:6,  avatar:'D', color:'from-green-500 to-emerald-600',  trend:'up',   change:'+4' },
  { rank:12, name:'Aakash Joshi',    city:'Nagpur',      xp:1420, streak:5,  level:12, accuracy:77, days:5,  avatar:'A', color:'from-purple-500 to-violet-600',  trend:'down', change:'-1' },
  { rank:13, name:'Riya Mehta',      city:'Surat',       xp:1350, streak:5,  level:12, accuracy:76, days:5,  avatar:'R', color:'from-rose-400 to-pink-500',      trend:'up',   change:'+2' },
  { rank:14, name:'Nikhil Tiwari',   city:'Bhopal',      xp:1280, streak:4,  level:11, accuracy:75, days:5,  avatar:'N', color:'from-blue-500 to-sky-600',       trend:'same', change:'='  },
  { rank:15, name:'Kavya Reddy',     city:'Visakhapatnam', xp:1210, streak:4, level:11, accuracy:74, days:4, avatar:'K', color:'from-amber-400 to-yellow-500',   trend:'down', change:'-3' },
  { rank:16, name:'Ankit Yadav',     city:'Kanpur',      xp:1140, streak:3,  level:10, accuracy:73, days:4,  avatar:'A', color:'from-teal-400 to-cyan-500',      trend:'up',   change:'+1' },
  { rank:17, name:'Shreya Patel',    city:'Vadodara',    xp:1080, streak:3,  level:10, accuracy:71, days:4,  avatar:'S', color:'from-violet-400 to-purple-500',  trend:'up',   change:'+2' },
  { rank:18, name:'Rohit Sharma',    city:'Indore',      xp:1010, streak:2,  level:9,  accuracy:70, days:3,  avatar:'R', color:'from-orange-400 to-red-500',     trend:'down', change:'-2' },
  { rank:19, name:'Divya Kapoor',    city:'Agra',        xp:940,  streak:2,  level:9,  accuracy:69, days:3,  avatar:'D', color:'from-pink-400 to-rose-500',      trend:'same', change:'='  },
  { rank:20, name:'Yash Agarwal',    city:'Meerut',      xp:880,  streak:1,  level:8,  accuracy:68, days:2,  avatar:'Y', color:'from-sky-400 to-blue-500',       trend:'up',   change:'+1' },
];

const MOCK_USERS_MONTHLY = MOCK_USERS_WEEKLY.map((u, i) => ({
  ...u,
  xp: u.xp * 4 + Math.floor(Math.random() * 500),
  streak: Math.min(u.streak * 3, 30),
  days: Math.min(u.days * 4, 28),
})).sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

const MOCK_USERS_ALL = MOCK_USERS_WEEKLY.map((u, i) => ({
  ...u,
  xp: u.xp * 20 + Math.floor(Math.random() * 2000),
  streak: Math.min(u.streak * 10, 100),
  days: Math.min(u.days * 10, 75),
  level: u.level + Math.floor(Math.random() * 10),
})).sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

const PERIOD_DATA = {
  weekly:  { users: MOCK_USERS_WEEKLY,  label: 'This Week',  icon: Calendar  },
  monthly: { users: MOCK_USERS_MONTHLY, label: 'This Month', icon: Clock     },
  alltime: { users: MOCK_USERS_ALL,     label: 'All Time',   icon: Globe     },
};

// ── Podium Card ──────────────────────────────────────────────
function PodiumUser({ user, position }) {
  const heights = { 1: 'h-36', 2: 'h-28', 3: 'h-20' };
  const delays  = { 1: 0.3, 2: 0.1, 3: 0.2 };
  const order   = { 1: 'order-2', 2: 'order-1', 3: 'order-3' };
  const icons   = { 1: '🥇', 2: '🥈', 3: '🥉' };
  const crowns  = {
    1: { color: 'text-yellow-400', icon: Crown, size: 24, glow: 'shadow-yellow-500/60' },
    2: { color: 'text-slate-300',  icon: Medal, size: 20, glow: 'shadow-slate-400/40'  },
    3: { color: 'text-amber-600',  icon: Award, size: 20, glow: 'shadow-amber-600/40'  },
  };
  const c = crowns[position];
  const CrownIcon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delays[position], type: 'spring', stiffness: 200, damping: 20 }}
      className={`flex flex-col items-center ${order[position]}`}
    >
      {/* Crown */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: position * 0.3 }}
      >
        <CrownIcon size={c.size} className={c.color} />
      </motion.div>

      {/* Avatar */}
      <div className={`
        w-16 h-16 rounded-2xl bg-gradient-to-br ${user.color} 
        flex items-center justify-center text-white font-black text-xl mb-2
        shadow-lg ${c.glow} border-2 border-white/20
        ${position === 1 ? 'w-20 h-20 text-2xl' : ''}
      `}>
        {user.avatar}
      </div>

      {/* Name */}
      <p className={`font-bold text-white text-center text-sm ${position === 1 ? 'text-base' : ''}`}>
        {user.name.split(' ')[0]}
      </p>
      <p className="text-xs text-slate-500 mb-2">{user.city}</p>

      {/* XP */}
      <div className="flex items-center gap-1 mb-3">
        <Zap size={12} className="text-violet-400" />
        <span className="text-sm font-bold text-violet-300">{user.xp.toLocaleString()} XP</span>
      </div>

      {/* Podium base */}
      <div className={`
        w-24 ${heights[position]} rounded-t-xl flex items-start justify-center pt-2
        ${position === 1 ? 'bg-gradient-to-b from-yellow-500/30 to-yellow-500/10 border border-yellow-500/30 w-28' : ''}
        ${position === 2 ? 'bg-gradient-to-b from-slate-400/20 to-slate-400/5 border border-slate-400/20' : ''}
        ${position === 3 ? 'bg-gradient-to-b from-amber-700/20 to-amber-700/5 border border-amber-700/20' : ''}
      `}>
        <span className="text-2xl">{icons[position]}</span>
      </div>
    </motion.div>
  );
}

// ── Rank Row ─────────────────────────────────────────────────
function RankRow({ user, isYou, index }) {
  const trendIcon = user.trend === 'up' ? TrendingUp : user.trend === 'down' ? TrendingDown : Minus;
  const trendColor = user.trend === 'up' ? 'text-emerald-400' : user.trend === 'down' ? 'text-rose-400' : 'text-slate-500';
  const TrendIcon = trendIcon;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ x: 4 }}
      className={`
        flex items-center gap-4 p-4 rounded-xl border transition-all
        ${isYou
          ? 'bg-primary-500/10 border-primary-500/30 ring-1 ring-primary-500/20'
          : 'bg-white/3 border-white/6 hover:bg-white/5 hover:border-white/12'
        }
      `}
    >
      {/* Rank */}
      <div className={`
        w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-black text-sm
        ${user.rank <= 3
          ? user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : user.rank === 2 ? 'bg-slate-400/20 text-slate-300' : 'bg-amber-600/20 text-amber-500'
          : 'bg-white/5 text-slate-500'
        }
      `}>
        {user.rank}
      </div>

      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
        {user.avatar}
      </div>

      {/* Name + City */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`font-semibold text-sm ${isYou ? 'text-primary-300' : 'text-white'}`}>
            {user.name}
            {isYou && <span className="ml-2 text-[10px] bg-primary-500/20 text-primary-300 px-2 py-0.5 rounded-full border border-primary-500/30">You</span>}
          </p>
        </div>
        <p className="text-xs text-slate-500">{user.city} · Day {user.days}</p>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-4 text-xs">
        <div className="text-center">
          <p className="font-bold text-white">{user.streak}🔥</p>
          <p className="text-slate-600">streak</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-violet-300">{user.xp.toLocaleString()}</p>
          <p className="text-slate-600">XP</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-emerald-300">{user.accuracy}%</p>
          <p className="text-slate-600">acc</p>
        </div>
      </div>

      {/* Trend */}
      <div className={`shrink-0 flex items-center gap-1 ${trendColor}`}>
        <TrendIcon size={14} />
        <span className="text-xs font-semibold">{user.change}</span>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function LeaderboardPage() {
  const [period, setPeriod] = useState('weekly');
  const { xp = 0, streak = 0, level = 1 } = useGamificationStore();
  const { user } = useUserStore();

  const { users, label } = PERIOD_DATA[period];
  const top3   = users.slice(0, 3);
  const rest   = users.slice(3);

  // Simulated "Your Rank" — put user at position 23
  const YOUR_RANK = { rank: 23, name: user?.name || 'You', city: 'Your City', xp, streak, level, accuracy: 82, days: 5, avatar: (user?.name?.[0] || 'Y').toUpperCase(), color: 'from-primary-500 to-secondary-500', trend: 'up', change: '+5' };

  const totalLearners = 10847;

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <Trophy size={20} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">Leaderboard</h1>
        </div>
        <p className="text-slate-400">Compete with {totalLearners.toLocaleString()}+ English learners from across India.</p>
      </motion.div>

      {/* ── Period Tabs ─────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-8">
        {Object.entries(PERIOD_DATA).map(([key, { label, icon: Icon }]) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border
              ${period === key
                ? 'bg-primary-500/20 text-primary-300 border-primary-500/30'
                : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300 hover:bg-white/8'
              }
            `}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ── Your Position Card ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-5 mb-8 border-primary-500/25 bg-primary-500/5"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/30">
            {YOUR_RANK.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-white">Your Position</p>
              <span className="badge-primary text-xs">#{YOUR_RANK.rank}</span>
            </div>
            <p className="text-xs text-slate-500">Top {Math.round((YOUR_RANK.rank / totalLearners) * 100)}% of all learners this week</p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-2xl font-black text-violet-300">{xp.toLocaleString()} XP</p>
            <p className="text-xs text-slate-500">{streak}🔥 streak · Lv.{level}</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <TrendingUp size={16} />
            <span className="text-sm font-bold">+5 this week</span>
          </div>
        </div>

        {/* Distance to next rank */}
        <div className="mt-4 p-3 bg-white/5 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>Distance to rank #{YOUR_RANK.rank - 1}</span>
            <span className="text-primary-400 font-semibold">
              {(users[YOUR_RANK.rank - 2]?.xp || 0) - xp > 0
                ? `${((users[YOUR_RANK.rank - 2]?.xp || 0) - xp).toLocaleString()} XP needed`
                : 'Already ahead!'}
            </span>
          </div>
          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all"
              style={{ width: `${Math.min((xp / (users[YOUR_RANK.rank - 2]?.xp || xp + 100)) * 100, 100)}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Podium Top 3 ────────────────────────────────── */}
      <div className="card p-8 mb-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />
        <h3 className="text-center text-lg font-bold text-white mb-8 flex items-center justify-center gap-2">
          <Crown size={18} className="text-yellow-400" /> Top 3 — {label}
        </h3>
        <div className="flex items-end justify-center gap-4 md:gap-8">
          {[top3[1], top3[0], top3[2]].filter(Boolean).map((user, i) => {
            const positions = [2, 1, 3];
            return <PodiumUser key={user.rank} user={user} position={positions[i]} />;
          })}
        </div>
      </div>

      {/* ── Full Rankings ────────────────────────────────── */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Users size={18} className="text-slate-400" /> Rankings 4–20
        </h3>
        <p className="text-xs text-slate-500">{totalLearners.toLocaleString()} total learners</p>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        {rest.map((user, index) => (
          <RankRow
            key={user.rank}
            user={user}
            isYou={false}
            index={index}
          />
        ))}

        {/* Your rank (shown separately if not in top 20) */}
        <div className="py-3 flex items-center gap-2">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs text-slate-600 px-3">Your position</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>
        <RankRow user={YOUR_RANK} isYou={true} index={20} />
      </motion.div>

      {/* ── How Rankings Work ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 card p-6"
      >
        <h3 className="font-bold text-white mb-4">How Rankings Work</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-400">
          <div className="flex items-start gap-3">
            <Zap size={16} className="text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-xs mb-1">XP Points</p>
              <p>Earn XP by answering questions, completing lessons, and passing tests.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Flame size={16} className="text-orange-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-xs mb-1">Streak Bonus</p>
              <p>7+ day streaks give 1.5× XP multiplier on all correct answers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BarChart2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-xs mb-1">Weekly Reset</p>
              <p>Weekly rankings reset every Monday. Monthly and All-Time are cumulative.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
