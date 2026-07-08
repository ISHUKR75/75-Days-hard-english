'use client';
// ============================================================
// ACHIEVEMENTS PAGE — Badges, streaks, milestones, rewards
// Features: Badge showcase, progress, locked/unlocked states,
// recent unlocks, celebration animations
// ============================================================

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy, Star, Zap, Flame, BookOpen, Mic, Target,
  Lock, CheckCircle2, Crown, Shield, Award, TrendingUp,
  Clock, Heart, Globe, GraduationCap, Brain, Volume2,
  PenTool, Headphones, BarChart2, ArrowRight, Sparkles,
} from 'lucide-react';
import { useGamificationStore } from '@/store/useGamificationStore';

// ── Animation variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -10 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 15 } },
};

// ── All badges definition ────────────────────────────────────
const ALL_BADGES = [
  // 🔥 Streak badges
  {
    id: 'streak_3',    category: 'streak',  icon: '🔥', name: '3-Day Starter',      desc: 'Maintain a 3-day learning streak',          req: 'Streak: 3 days',    xp: 30,   rarity: 'common',   color: 'from-orange-500 to-amber-500',   glow: 'shadow-orange-500/40'  },
  { id: 'streak_7',    category: 'streak',  icon: '🔥', name: '7-Day Warrior',      desc: 'Maintain a 7-day learning streak',          req: 'Streak: 7 days',    xp: 70,   rarity: 'common',   color: 'from-orange-500 to-red-500',     glow: 'shadow-orange-500/40'  },
  { id: 'streak_14',   category: 'streak',  icon: '⭐', name: '2-Week Champion',    desc: '14-day consecutive learning streak',        req: 'Streak: 14 days',   xp: 150,  rarity: 'rare',     color: 'from-amber-400 to-yellow-500',   glow: 'shadow-yellow-500/40'  },
  { id: 'streak_30',   category: 'streak',  icon: '🌟', name: '30-Day Legend',      desc: 'Incredible 30-day streak achieved!',        req: 'Streak: 30 days',   xp: 300,  rarity: 'epic',     color: 'from-yellow-400 to-amber-500',   glow: 'shadow-yellow-400/50'  },
  { id: 'streak_75',   category: 'streak',  icon: '👑', name: '75-Day King',        desc: 'Complete the full 75-day challenge!',       req: 'Streak: 75 days',   xp: 1000, rarity: 'legendary', color: 'from-yellow-300 to-amber-400',  glow: 'shadow-yellow-300/60'  },
  { id: 'streak_100',  category: 'streak',  icon: '💎', name: '100-Day Diamond',    desc: 'The rarest streak — 100 days!',            req: 'Streak: 100 days',  xp: 2000, rarity: 'legendary', color: 'from-cyan-300 to-blue-400',     glow: 'shadow-cyan-400/60'    },

  // 💯 Question milestones
  { id: 'q_10',        category: 'questions', icon: '✏️', name: 'First Practice',   desc: 'Answer your first 10 questions',            req: '10 correct answers', xp: 10,  rarity: 'common',   color: 'from-emerald-500 to-teal-500',   glow: 'shadow-emerald-500/40' },
  { id: 'q_50',        category: 'questions', icon: '📝', name: 'Getting Serious',  desc: 'Answer 50 questions correctly',             req: '50 correct answers', xp: 50,  rarity: 'common',   color: 'from-emerald-500 to-green-500',  glow: 'shadow-emerald-500/40' },
  { id: 'q_100',       category: 'questions', icon: '💯', name: 'Century',          desc: 'Answer 100 questions correctly',            req: '100 correct',        xp: 100, rarity: 'common',   color: 'from-green-500 to-emerald-600',  glow: 'shadow-green-500/40'   },
  { id: 'q_250',       category: 'questions', icon: '🎯', name: 'Sharp Shooter',    desc: 'Answer 250 questions correctly',            req: '250 correct',        xp: 250, rarity: 'rare',     color: 'from-blue-500 to-indigo-500',    glow: 'shadow-blue-500/40'    },
  { id: 'q_500',       category: 'questions', icon: '🏹', name: 'Half Thousand',    desc: 'Answer 500 questions correctly',            req: '500 correct',        xp: 500, rarity: 'rare',     color: 'from-indigo-500 to-violet-500',  glow: 'shadow-indigo-500/40'  },
  { id: 'q_1000',      category: 'questions', icon: '🏆', name: 'Master Solver',    desc: 'Answer 1000 questions correctly',           req: '1000 correct',       xp: 1000, rarity: 'epic',    color: 'from-violet-500 to-purple-600',  glow: 'shadow-violet-500/50'  },
  { id: 'q_2500',      category: 'questions', icon: '⚔️', name: 'Quiz Gladiator',   desc: '2500 questions correctly answered',         req: '2500 correct',       xp: 2500, rarity: 'legendary', color: 'from-rose-500 to-pink-600',   glow: 'shadow-rose-500/60'    },
  { id: 'q_5000',      category: 'questions', icon: '🔥', name: 'Unstoppable',      desc: '5000 questions — truly dedicated!',         req: '5000 correct',       xp: 5000, rarity: 'legendary', color: 'from-red-400 to-orange-500',  glow: 'shadow-red-400/60'     },

  // ⚡ Level badges
  { id: 'level_5',     category: 'level',   icon: '🌱', name: 'Sprouting',          desc: 'Reach level 5',                            req: 'Level 5',            xp: 50,   rarity: 'common',   color: 'from-green-400 to-emerald-500',  glow: 'shadow-green-400/40'   },
  { id: 'level_10',    category: 'level',   icon: '🌟', name: 'Rising Star',        desc: 'Reach level 10',                           req: 'Level 10',           xp: 100,  rarity: 'common',   color: 'from-yellow-400 to-amber-500',   glow: 'shadow-yellow-400/40'  },
  { id: 'level_25',    category: 'level',   icon: '⚡', name: 'Expert Learner',     desc: 'Reach level 25',                           req: 'Level 25',           xp: 500,  rarity: 'rare',     color: 'from-amber-400 to-yellow-500',   glow: 'shadow-amber-400/40'   },
  { id: 'level_50',    category: 'level',   icon: '👑', name: 'Grand Master',       desc: 'Reach level 50',                           req: 'Level 50',           xp: 1000, rarity: 'epic',     color: 'from-violet-400 to-purple-500',  glow: 'shadow-violet-400/50'  },
  { id: 'level_100',   category: 'level',   icon: '💫', name: 'Enlightened',        desc: 'Maximum level 100 achieved!',              req: 'Level 100',          xp: 5000, rarity: 'legendary', color: 'from-indigo-300 to-violet-400', glow: 'shadow-indigo-300/60'  },

  // 📚 Skill badges
  { id: 'grammar_5',   category: 'skills',  icon: '📖', name: 'Grammar Beginner',   desc: 'Complete 5 grammar topics',                req: '5 grammar topics',   xp: 50,   rarity: 'common',   color: 'from-indigo-500 to-blue-500',    glow: 'shadow-indigo-500/40'  },
  { id: 'grammar_all', category: 'skills',  icon: '📚', name: 'Grammar Master',     desc: 'Complete all grammar topics',              req: 'All grammar done',   xp: 500,  rarity: 'epic',     color: 'from-indigo-400 to-blue-600',    glow: 'shadow-indigo-400/50'  },
  { id: 'vocab_500',   category: 'skills',  icon: '🔤', name: 'Word Hoarder',       desc: 'Learn 500 vocabulary words',               req: '500 words learned',  xp: 200,  rarity: 'rare',     color: 'from-amber-500 to-yellow-500',   glow: 'shadow-amber-500/40'   },
  { id: 'vocab_1000',  category: 'skills',  icon: '📚', name: 'Vocabulary Guru',    desc: 'Learn 1000 vocabulary words',              req: '1000 words',         xp: 500,  rarity: 'epic',     color: 'from-yellow-400 to-amber-500',   glow: 'shadow-yellow-400/50'  },
  { id: 'speaking_all',category: 'skills',  icon: '🎤', name: 'Speaking Champion',  desc: 'Complete all speaking exercises',          req: 'All speaking done',  xp: 300,  rarity: 'rare',     color: 'from-pink-500 to-rose-500',      glow: 'shadow-pink-500/40'    },
  { id: 'writing_all', category: 'skills',  icon: '✍️', name: 'Writing Expert',     desc: 'Complete all writing exercises',           req: 'All writing done',   xp: 300,  rarity: 'rare',     color: 'from-rose-500 to-red-500',       glow: 'shadow-rose-500/40'    },
  { id: 'pronunciation_all', category: 'skills', icon: '🗣️', name: 'Pronunciation Pro', desc: 'Master all pronunciation topics',    req: 'All pronunciation',  xp: 300,  rarity: 'rare',     color: 'from-cyan-500 to-sky-500',       glow: 'shadow-cyan-500/40'    },

  // 🎯 Special badges
  { id: 'perfect_test', category: 'special', icon: '💎', name: 'Perfectionist',      desc: 'Score 100% on any test',                   req: 'One perfect score',  xp: 100,  rarity: 'rare',     color: 'from-sky-400 to-blue-500',       glow: 'shadow-sky-400/40'     },
  { id: 'perfect_5',    category: 'special', icon: '👑', name: 'Perfect Streak',     desc: 'Score 100% five times in a row',           req: '5 perfect scores',   xp: 500,  rarity: 'epic',     color: 'from-blue-400 to-indigo-500',    glow: 'shadow-blue-400/50'    },
  { id: 'speed_demon',  category: 'special', icon: '⚡', name: 'Speed Demon',        desc: 'Answer 10 questions under 30 seconds',     req: '10 fast answers',    xp: 150,  rarity: 'rare',     color: 'from-violet-500 to-purple-500',  glow: 'shadow-violet-500/40'  },
  { id: 'night_owl',    category: 'special', icon: '🦉', name: 'Night Owl',          desc: 'Practice after 10 PM',                     req: 'Study after 10 PM',  xp: 50,   rarity: 'common',   color: 'from-slate-500 to-blue-600',     glow: 'shadow-slate-500/40'   },
  { id: 'early_bird',   category: 'special', icon: '🌅', name: 'Early Bird',         desc: 'Practice before 7 AM',                     req: 'Study before 7 AM',  xp: 50,   rarity: 'common',   color: 'from-orange-400 to-amber-500',   glow: 'shadow-orange-400/40'  },
  { id: 'course_complete', category: 'special', icon: '🎓', name: '75-Day Graduate', desc: 'Complete the entire 75-day course!',        req: 'All 75 days done',   xp: 5000, rarity: 'legendary', color: 'from-yellow-300 to-amber-400',  glow: 'shadow-yellow-300/60'  },
];

const CATEGORIES = [
  { id: 'all',       label: 'All Badges',   icon: Award   },
  { id: 'streak',    label: 'Streak',       icon: Flame   },
  { id: 'questions', label: 'Questions',    icon: Target  },
  { id: 'level',     label: 'Level',        icon: Zap     },
  { id: 'skills',    label: 'Skills',       icon: Brain   },
  { id: 'special',   label: 'Special',      icon: Sparkles },
];

const RARITY_META = {
  common:    { label: 'Common',    color: 'text-slate-400',  bg: 'bg-slate-500/10',  border: 'border-slate-500/20' },
  rare:      { label: 'Rare',      color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'  },
  epic:      { label: 'Epic',      color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  legendary: { label: 'Legendary', color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20' },
};

// ── Badge Card ──────────────────────────────────────────────
function BadgeCard({ badge, isUnlocked, onClick }) {
  const rarity = RARITY_META[badge.rarity] || RARITY_META.common;

  return (
    <motion.button
      variants={badgeVariants}
      whileHover={isUnlocked ? { scale: 1.05, y: -4 } : { scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(badge, isUnlocked)}
      className={`
        relative rounded-2xl border p-5 text-left w-full overflow-hidden transition-all
        ${isUnlocked
          ? 'bg-white/5 border-white/15 hover:border-white/25'
          : 'bg-white/2 border-white/5 opacity-45 cursor-default'
        }
      `}
    >
      {/* Glow for unlocked */}
      {isUnlocked && (
        <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-5 pointer-events-none`} />
      )}

      {/* Rarity top bar */}
      {isUnlocked && (
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${badge.color}`} />
      )}

      {/* Badge Icon */}
      <div className="relative mb-3">
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto
          ${isUnlocked
            ? `bg-gradient-to-br ${badge.color} shadow-lg ${badge.glow}`
            : 'bg-white/5'
          }
        `}>
          {isUnlocked ? badge.icon : '🔒'}
        </div>
        {isUnlocked && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <CheckCircle2 size={10} className="text-white" />
          </motion.div>
        )}
      </div>

      {/* Badge name */}
      <h4 className={`font-bold text-sm text-center mb-1 ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
        {badge.name}
      </h4>

      {/* Rarity label */}
      <div className={`text-center`}>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rarity.bg} ${rarity.color} border ${rarity.border}`}>
          {rarity.label}
        </span>
      </div>

      {/* XP */}
      {isUnlocked && (
        <div className="flex items-center justify-center gap-1 mt-2">
          <Zap size={10} className="text-violet-400" />
          <span className="text-[10px] text-violet-400 font-semibold">+{badge.xp} XP</span>
        </div>
      )}
    </motion.button>
  );
}

// ── Badge Detail Modal ──────────────────────────────────────
function BadgeModal({ badge, isUnlocked, onClose }) {
  if (!badge) return null;
  const rarity = RARITY_META[badge.rarity] || RARITY_META.common;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="card p-8 max-w-sm w-full text-center relative overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-5 pointer-events-none`} />
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${badge.color}`} />

          {/* Icon */}
          <div className={`
            w-24 h-24 rounded-3xl mx-auto mb-5 flex items-center justify-center text-5xl
            ${isUnlocked ? `bg-gradient-to-br ${badge.color} shadow-2xl ${badge.glow}` : 'bg-white/5'}
          `}>
            {isUnlocked ? badge.icon : '🔒'}
          </div>

          <span className={`text-xs font-bold px-3 py-1 rounded-full ${rarity.bg} ${rarity.color} border ${rarity.border}`}>
            {rarity.label}
          </span>

          <h3 className="text-xl font-black text-white mt-3 mb-2">{badge.name}</h3>
          <p className="text-slate-400 text-sm mb-4">{badge.desc}</p>

          <div className="bg-white/5 rounded-xl p-3 mb-5">
            <p className="text-xs text-slate-500 mb-1">Requirement</p>
            <p className="text-sm font-semibold text-white">{badge.req}</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Zap size={16} className="text-violet-400" />
            <span className="font-bold text-violet-300">Reward: +{badge.xp} XP</span>
          </div>

          {isUnlocked ? (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 size={16} /> Badge Unlocked!
            </div>
          ) : (
            <p className="text-slate-500 text-sm">Keep learning to unlock this badge</p>
          )}

          <button
            onClick={onClose}
            className="mt-4 text-slate-500 hover:text-white text-sm transition-colors"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AchievementsPage() {
  const [category, setCategory]     = useState('all');
  const [selectedBadge, setSelected] = useState(null);
  const [selectedUnlocked, setSelectedUnlocked] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  const { badges: unlockedBadgeIds = [], xp = 0, level = 1, streak = 0, topicsCompleted = 0 } = useGamificationStore();

  const unlockedCount  = unlockedBadgeIds.length;
  const totalBadges    = ALL_BADGES.length;
  const unlockedPct    = Math.round((unlockedCount / totalBadges) * 100);

  // Trigger confetti if any badges unlocked
  useEffect(() => {
    if (!celebrated && unlockedCount > 0) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.3 }, colors: ['#6366f1', '#d946ef', '#f59e0b'] });
      setCelebrated(true);
    }
  }, [unlockedCount, celebrated]);

  const filteredBadges = category === 'all'
    ? ALL_BADGES
    : ALL_BADGES.filter(b => b.category === category);

  const recentUnlocked = ALL_BADGES.filter(b => unlockedBadgeIds.includes(b.id));

  const handleBadgeClick = (badge, isUnlocked) => {
    setSelected(badge);
    setSelectedUnlocked(isUnlocked);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
            <Trophy size={20} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">Achievements</h1>
        </div>
        <p className="text-slate-400 pl-1">Collect badges by learning, practicing, and maintaining streaks.</p>
      </motion.div>

      {/* ── Overview Stats ──────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Badges Earned',    value: `${unlockedCount}/${totalBadges}`, icon: Trophy,     color: 'text-yellow-400',  bg: 'bg-yellow-500/10' },
          { label: 'Completion',       value: `${unlockedPct}%`,                icon: Target,     color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Total XP',         value: xp.toLocaleString(),              icon: Zap,        color: 'text-violet-400',  bg: 'bg-violet-500/10'  },
          { label: 'Current Streak',   value: `${streak} 🔥`,                  icon: Flame,      color: 'text-orange-400',  bg: 'bg-orange-500/10'  },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <motion.div key={label} variants={fadeUp} className="card p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Badge Progress Bar ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-5 mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-white">Badge Collection Progress</h3>
          <span className="text-lg font-black gradient-text">{unlockedPct}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/8 overflow-hidden mb-2">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${unlockedPct}%` }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{ boxShadow: '0 0 10px rgba(251,191,36,0.4)' }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{unlockedCount} badges unlocked</span>
          <span>{totalBadges - unlockedCount} remaining</span>
        </div>
      </motion.div>

      {/* ── Recent Unlocks (if any) ─────────────────────── */}
      {recentUnlocked.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400" /> Recently Unlocked
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentUnlocked.map(badge => (
              <motion.button
                key={badge.id}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => handleBadgeClick(badge, true)}
                className="shrink-0 card p-4 text-center w-28 relative overflow-hidden border-yellow-500/20 bg-yellow-500/5"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${badge.color}`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl mx-auto mb-2 shadow-lg`}>
                  {badge.icon}
                </div>
                <p className="text-xs font-bold text-white">{badge.name}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Category Filter ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border
              ${category === id
                ? 'bg-primary-500/20 text-primary-300 border-primary-500/30'
                : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300 hover:bg-white/8'
              }
            `}
          >
            <Icon size={12} />
            {label}
            <span className="opacity-60">
              ({id === 'all' ? ALL_BADGES.length : ALL_BADGES.filter(b => b.category === id).length})
            </span>
          </button>
        ))}
      </div>

      {/* ── Badges Grid ──────────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        layout
      >
        <AnimatePresence>
          {filteredBadges.map(badge => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isUnlocked={unlockedBadgeIds.includes(badge.id)}
              onClick={handleBadgeClick}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Tips Section ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 card p-6 border-primary-500/20 bg-primary-500/5"
      >
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb size={18} className="text-yellow-400" /> How to Earn Badges Faster
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: '🔥', tip: 'Practice daily to build streaks — streak badges are the most common' },
            { icon: '✍️', tip: 'Answer questions in every session — quantity matters for question milestones' },
            { icon: '⚡', tip: 'Answer quickly for Speed Demon badge — under 30 seconds for 10 questions' },
            { icon: '🌅', tip: 'Study before 7 AM or after 10 PM to unlock Early Bird/Night Owl' },
            { icon: '💎', tip: 'Aim for 100% on tests to unlock Perfectionist badge' },
            { icon: '🏆', tip: 'Complete all 75 days for the legendary 75-Day Graduate badge' },
          ].map(({ icon, tip }) => (
            <div key={tip} className="flex items-start gap-3">
              <span className="text-xl shrink-0">{icon}</span>
              <p className="text-sm text-slate-400">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Badge Detail Modal ───────────────────────────── */}
      {selectedBadge && (
        <BadgeModal
          badge={selectedBadge}
          isUnlocked={selectedUnlocked}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
