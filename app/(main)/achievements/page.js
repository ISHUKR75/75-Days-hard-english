'use client';
// Achievements Page — All badges and rewards, locked and unlocked

import { Trophy, Star, Lock, CheckCircle2, Zap, Flame, Target, BookOpen, Crown, Award } from 'lucide-react';
import useUserStore from '@/store/userStore';

const ALL_BADGES = [
  // Streak badges
  { id: 'streak-3',    emoji: '🔥', name: 'Spark',         desc: '3-day streak',         xp: 50,   req: 'Maintain 3-day streak' },
  { id: 'streak-7',    emoji: '💥', name: 'On Fire',        desc: '7-day streak',         xp: 100,  req: 'Maintain 7-day streak' },
  { id: 'streak-14',   emoji: '⚡', name: 'Lightning',      desc: '14-day streak',        xp: 200,  req: 'Maintain 14-day streak' },
  { id: 'streak-30',   emoji: '🌟', name: 'Unstoppable',    desc: '30-day streak',        xp: 500,  req: 'Maintain 30-day streak' },
  { id: 'streak-75',   emoji: '👑', name: 'Legend',         desc: '75-day streak',        xp: 2000, req: 'Maintain 75-day streak' },
  // Question badges
  { id: 'q-100',       emoji: '🎯', name: 'First 100',      desc: '100 questions done',   xp: 50,   req: 'Answer 100 questions' },
  { id: 'q-500',       emoji: '🏹', name: 'Sharp Shooter',  desc: '500 questions done',   xp: 150,  req: 'Answer 500 questions' },
  { id: 'q-1000',      emoji: '💎', name: 'Diamond Mind',   desc: '1000 questions done',  xp: 500,  req: 'Answer 1,000 questions' },
  { id: 'q-5000',      emoji: '🚀', name: 'Rocket',         desc: '5000 questions done',  xp: 2000, req: 'Answer 5,000 questions' },
  // Level badges
  { id: 'level-5',     emoji: '⭐', name: 'Rising Star',    desc: 'Reached Level 5',      xp: 100,  req: 'Reach Level 5' },
  { id: 'level-10',    emoji: '🌙', name: 'Moon Walker',    desc: 'Reached Level 10',     xp: 300,  req: 'Reach Level 10' },
  { id: 'level-20',    emoji: '☀️', name: 'Sun Master',     desc: 'Reached Level 20',     xp: 1000, req: 'Reach Level 20' },
  // Day badges
  { id: 'day-10',      emoji: '🏗️', name: 'Builder',        desc: 'Completed Day 10',     xp: 200,  req: 'Complete 10 days' },
  { id: 'day-25',      emoji: '🌊', name: 'Surfer',         desc: 'Completed Day 25',     xp: 500,  req: 'Complete 25 days' },
  { id: 'day-50',      emoji: '🦅', name: 'Eagle',          desc: 'Completed Day 50',     xp: 1000, req: 'Complete 50 days' },
  { id: 'day-75',      emoji: '🏆', name: 'Champion',       desc: 'Completed 75 Days!',   xp: 5000, req: 'Complete all 75 days' },
  // Accuracy badges
  { id: 'acc-80',      emoji: '🎯', name: 'Sharp',          desc: '80% accuracy',         xp: 100,  req: 'Achieve 80% accuracy' },
  { id: 'acc-90',      emoji: '💫', name: 'Stellar',        desc: '90% accuracy',         xp: 300,  req: 'Achieve 90% accuracy' },
  { id: 'acc-100',     emoji: '🌠', name: 'Perfect',        desc: '100% on any test',     xp: 500,  req: 'Score 100% on any test' },
  // Vocabulary badges
  { id: 'vocab-100',   emoji: '📚', name: 'Word Collector', desc: '100 words learned',    xp: 100,  req: 'Learn 100 vocabulary words' },
  { id: 'vocab-1000',  emoji: '📖', name: 'Bibliophile',    desc: '1000 words learned',   xp: 1000, req: 'Learn 1,000 vocabulary words' },
  // Special
  { id: 'first-lesson',emoji: '🌱', name: 'First Step',     desc: 'First lesson done!',   xp: 25,   req: 'Complete your first lesson' },
  { id: 'night-owl',   emoji: '🦉', name: 'Night Owl',      desc: 'Studied after 10 PM',  xp: 50,   req: 'Study after 10 PM' },
  { id: 'early-bird',  emoji: '🐦', name: 'Early Bird',     desc: 'Studied before 7 AM',  xp: 50,   req: 'Study before 7 AM' },
];

export default function AchievementsPage() {
  const { badges, xp } = useUserStore();
  const earnedIds = new Set(badges.map((b) => b.id));

  const earned = ALL_BADGES.filter((b) => earnedIds.has(b.id));
  const locked = ALL_BADGES.filter((b) => !earnedIds.has(b.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Trophy size={28} className="text-amber-400" /> Achievements
        </h1>
        <p className="text-slate-500">{earned.length} / {ALL_BADGES.length} badges earned — complete challenges to unlock more!</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <p className="text-3xl font-black gradient-text">{earned.length}</p>
          <p className="text-xs text-slate-500 mt-1">Badges Earned</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-3xl font-black text-amber-400">{locked.length}</p>
          <p className="text-xs text-slate-500 mt-1">Still Locked</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-3xl font-black text-violet-400">{Math.round((earned.length / ALL_BADGES.length) * 100)}%</p>
          <p className="text-xs text-slate-500 mt-1">Completion</p>
        </div>
      </div>

      {/* Earned */}
      {earned.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-accent-400" /> Earned ({earned.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {earned.map((badge) => (
              <div key={badge.id} className="card p-4 text-center border-accent-500/20 bg-accent-500/5 hover:border-accent-500/40 transition-all cursor-default" title={badge.req}>
                <div className="text-3xl mb-2">{badge.emoji}</div>
                <p className="font-bold text-white text-xs mb-1">{badge.name}</p>
                <p className="text-[10px] text-slate-500 mb-2">{badge.desc}</p>
                <span className="text-[10px] font-bold text-violet-400">+{badge.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Lock size={18} className="text-slate-500" /> Locked ({locked.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {locked.map((badge) => (
            <div key={badge.id} className="card p-4 text-center opacity-50 cursor-default hover:opacity-70 transition-opacity" title={badge.req}>
              <div className="text-3xl mb-2 grayscale">{badge.emoji}</div>
              <p className="font-bold text-slate-400 text-xs mb-1">{badge.name}</p>
              <p className="text-[10px] text-slate-600 mb-2">{badge.req}</p>
              <span className="text-[10px] font-bold text-slate-600">+{badge.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
