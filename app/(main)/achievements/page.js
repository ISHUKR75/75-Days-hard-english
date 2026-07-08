'use client';
// Achievements Page — All badges, XP milestones, streaks, and rewards
// Fully animated with progress tracking from Zustand stores

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trophy, Star, Lock, CheckCircle2, Zap, Flame, Target,
  BookOpen, Crown, Award, Globe, Mic, PenTool, Brain,
  TrendingUp, Calendar, Users, MessageSquare,
} from 'lucide-react';
import useUserStore    from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ── Badge Definitions ─────────────────────────────────────────
const BADGE_CATEGORIES = [
  {
    title: 'Streak Badges',
    icon: Flame,
    color: 'from-orange-500 to-red-500',
    badges: [
      { id:'streak-3',   name:'On Fire!',         emoji:'🔥',  desc:'3-day streak',             xp:50,   unlock: (s) => s.streak >= 3   },
      { id:'streak-7',   name:'Week Warrior',     emoji:'🔥🔥', desc:'7-day streak',            xp:100,  unlock: (s) => s.streak >= 7   },
      { id:'streak-14',  name:'Two Weeks Strong', emoji:'⚡',  desc:'14-day streak',            xp:200,  unlock: (s) => s.streak >= 14  },
      { id:'streak-30',  name:'Month Master',     emoji:'🌟',  desc:'30-day streak',            xp:500,  unlock: (s) => s.streak >= 30  },
      { id:'streak-75',  name:'75 Days Champion', emoji:'🏆',  desc:'75-day streak',            xp:2000, unlock: (s) => s.streak >= 75  },
    ],
  },
  {
    title: 'XP & Level Badges',
    icon: Zap,
    color: 'from-violet-500 to-purple-500',
    badges: [
      { id:'xp-100',    name:'First Steps',      emoji:'👣',  desc:'Earn 100 XP',              xp:0,    unlock: (s) => s.xp >= 100    },
      { id:'xp-500',    name:'Learner',           emoji:'📖',  desc:'Earn 500 XP',              xp:0,    unlock: (s) => s.xp >= 500    },
      { id:'xp-1000',   name:'Scholar',           emoji:'🎓',  desc:'Earn 1,000 XP',            xp:0,    unlock: (s) => s.xp >= 1000   },
      { id:'xp-5000',   name:'Expert',            emoji:'⭐',  desc:'Earn 5,000 XP',            xp:0,    unlock: (s) => s.xp >= 5000   },
      { id:'level-5',   name:'Level 5 Achieved',  emoji:'⚡',  desc:'Reach Level 5',            xp:0,    unlock: (s) => s.level >= 5   },
      { id:'level-10',  name:'Double Digits',     emoji:'💎',  desc:'Reach Level 10',           xp:0,    unlock: (s) => s.level >= 10  },
    ],
  },
  {
    title: 'Learning Badges',
    icon: BookOpen,
    color: 'from-indigo-500 to-blue-500',
    badges: [
      { id:'day-1',     name:'First Day',         emoji:'🌱',  desc:'Complete Day 1',           xp:50,   unlock: (s,p) => p.completedDays >= 1  },
      { id:'day-7',     name:'Week Done',          emoji:'✅',  desc:'Complete 7 days',          xp:200,  unlock: (s,p) => p.completedDays >= 7  },
      { id:'day-30',    name:'Month Champion',    emoji:'📅',  desc:'Complete 30 days',          xp:500,  unlock: (s,p) => p.completedDays >= 30 },
      { id:'day-50',    name:'Halfway Hero',       emoji:'🦸',  desc:'Complete 50 days',         xp:1000, unlock: (s,p) => p.completedDays >= 50 },
      { id:'day-75',    name:'75 Day Graduate',   emoji:'🎓',  desc:'Complete all 75 days',      xp:5000, unlock: (s,p) => p.completedDays >= 75 },
      { id:'perfect-quiz','name':'Perfect Quiz',  emoji:'💯',  desc:'Score 100% on a quiz',     xp:100,  unlock: () => false },
    ],
  },
  {
    title: 'Practice Badges',
    icon: Target,
    color: 'from-emerald-500 to-teal-500',
    badges: [
      { id:'q-100',     name:'Practice Makes Perfect','emoji':'✍️', desc:'Answer 100 questions',    xp:100,  unlock: (s,p) => p.totalQuestionsAttempted >= 100 },
      { id:'q-500',     name:'Question Crusher',     emoji:'💪',  desc:'Answer 500 questions',    xp:300,  unlock: (s,p) => p.totalQuestionsAttempted >= 500 },
      { id:'q-1000',    name:'Thousand Club',        emoji:'🔥',  desc:'Answer 1,000 questions',  xp:500,  unlock: (s,p) => p.totalQuestionsAttempted >= 1000},
      { id:'correct-50','name':'Accuracy Star',      emoji:'🎯',  desc:'Get 50 answers correct',   xp:150,  unlock: (s,p) => p.totalCorrect >= 50            },
      { id:'daily-goal','name':'Daily Achiever',     emoji:'🌅',  desc:'Reach daily goal once',   xp:50,   unlock: () => false },
    ],
  },
  {
    title: 'Special Badges',
    icon: Crown,
    color: 'from-amber-500 to-yellow-500',
    badges: [
      { id:'early-bird', name:'Early Bird',        emoji:'🐦',  desc:'Study before 7 AM',       xp:75,   unlock: () => false },
      { id:'night-owl',  name:'Night Owl',         emoji:'🦉',  desc:'Study after 10 PM',       xp:75,   unlock: () => false },
      { id:'coins-100',  name:'Coin Collector',    emoji:'🪙',  desc:'Earn 100 coins',          xp:0,    unlock: (s) => s.coins >= 100  },
      { id:'coins-500',  name:'Treasure Hunter',   emoji:'💰',  desc:'Earn 500 coins',          xp:0,    unlock: (s) => s.coins >= 500  },
      { id:'share',      name:'Spread the Word',   emoji:'📢',  desc:'Share your progress',     xp:50,   unlock: () => false },
      { id:'complete',   name:'The Graduate',      emoji:'🎓',  desc:'Finish the full course',   xp:10000,unlock: (s,p) => p.completedDays >= 75 },
    ],
  },
];

// ── Badge Card Component ──────────────────────────────────────
function BadgeCard({ badge, unlocked, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
      className={`relative flex flex-col items-center p-4 rounded-2xl border text-center transition-all ${
        unlocked
          ? 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/8'
          : 'border-white/8 bg-white/3 opacity-50 grayscale'
      }`}
    >
      {/* Unlocked glow */}
      {unlocked && (
        <div className="absolute inset-0 rounded-2xl bg-yellow-500/5 blur-sm" />
      )}

      <div className={`relative text-4xl mb-3 ${unlocked ? 'filter-none' : 'opacity-30'}`}>
        {badge.emoji}
      </div>

      <div className="relative">
        <p className={`font-bold text-sm mb-1 ${unlocked ? 'text-white' : 'text-slate-600'}`}>
          {badge.name}
        </p>
        <p className={`text-xs leading-relaxed ${unlocked ? 'text-slate-400' : 'text-slate-700'}`}>
          {badge.desc}
        </p>
        {badge.xp > 0 && (
          <p className={`text-xs font-bold mt-2 ${unlocked ? 'text-violet-400' : 'text-slate-700'}`}>
            +{badge.xp} XP
          </p>
        )}
      </div>

      {/* Lock icon for locked badges */}
      {!unlocked && (
        <div className="absolute top-2 right-2">
          <Lock size={12} className="text-slate-700" />
        </div>
      )}

      {/* Check for unlocked */}
      {unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2"
        >
          <CheckCircle2 size={14} className="text-green-400" />
        </motion.div>
      )}
    </motion.div>
  );
}

// ── XP Progress Ring ──────────────────────────────────────────
function XPRing({ xp, level, levelXPRequired, levelProgress }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (levelProgress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="120" height="120" className="-rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke="url(#xpGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - strokeDash }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-black text-white leading-none">Lv.{level}</p>
        <p className="text-xs text-violet-300">{levelProgress}%</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AchievementsPage() {
  const { xp, coins, streak, level, levelXPRequired, getLevelProgress } = useUserStore();
  const progressData = useProgressStore();

  const levelProgress = getLevelProgress?.() || 0;

  const { unlockedCount, totalCount } = useMemo(() => {
    let unlocked = 0, total = 0;
    BADGE_CATEGORIES.forEach(cat => {
      cat.badges.forEach(badge => {
        total++;
        if (badge.unlock({ xp, coins, streak, level }, {
          completedDays: progressData.completedDays || 0,
          totalQuestionsAttempted: progressData.totalQuestionsAttempted || 0,
          totalCorrect: progressData.totalCorrect || 0,
        })) unlocked++;
      });
    });
    return { unlockedCount: unlocked, totalCount: total };
  }, [xp, coins, streak, level, progressData]);

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
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* XP Ring */}
          <div className="shrink-0">
            <XPRing xp={xp} level={level} levelXPRequired={levelXPRequired} levelProgress={levelProgress} />
          </div>

          {/* Stats */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">Achievements</h1>
            <p className="text-slate-400 text-sm mb-4">
              {unlockedCount} of {totalCount} badges unlocked — Keep going!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label:'Total XP',    value:xp,         color:'text-violet-300', icon:'⚡' },
                { label:'Coins',       value:coins,      color:'text-yellow-300', icon:'🪙' },
                { label:'Day Streak',  value:streak,     color:'text-orange-300', icon:'🔥' },
                { label:'Level',       value:`Lv.${level}`,color:'text-indigo-300',icon:'🎯' },
              ].map(({ label, value, color, icon }) => (
                <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/8 text-center">
                  <p className="text-base">{icon}</p>
                  <p className={`text-lg font-black ${color}`}>{value}</p>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Badges: {unlockedCount}/{totalCount}</span>
            <span>{Math.round((unlockedCount/totalCount)*100)}% complete</span>
          </div>
          <div className="h-2 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount/totalCount)*100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Badge Categories ─────────────────────────────────── */}
      {BADGE_CATEGORIES.map((category, ci) => {
        const catUnlocked = category.badges.filter(b => b.unlock(
          { xp, coins, streak, level },
          {
            completedDays: progressData.completedDays || 0,
            totalQuestionsAttempted: progressData.totalQuestionsAttempted || 0,
            totalCorrect: progressData.totalCorrect || 0,
          }
        )).length;

        return (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon size={18} className="text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">{category.title}</h2>
              </div>
              <span className="text-sm text-slate-500">{catUnlocked}/{category.badges.length}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {category.badges.map((badge, bi) => {
                const unlocked = badge.unlock(
                  { xp, coins, streak, level },
                  {
                    completedDays: progressData.completedDays || 0,
                    totalQuestionsAttempted: progressData.totalQuestionsAttempted || 0,
                    totalCorrect: progressData.totalCorrect || 0,
                  }
                );
                return (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    unlocked={unlocked}
                    index={bi + ci * 5}
                  />
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
