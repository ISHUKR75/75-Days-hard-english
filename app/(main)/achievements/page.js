'use client';
// ============================================================
// ACHIEVEMENTS PAGE - Badges and gamification
// ============================================================

import { motion } from 'framer-motion';
import { Trophy, Star, Lock, CheckCircle, Medal, Flame, Zap, Crown, Target, BookOpen } from 'lucide-react';

const ACHIEVEMENTS = [
  { id: 1, title: 'First Step', desc: 'Complete your first lesson', emoji: '🏅', earned: true, date: '2024-01-01' },
  { id: 2, title: 'Grammar Novice', desc: 'Complete 5 Grammar topics', emoji: '📝', earned: true, date: '2024-01-05' },
  { id: 3, title: 'Vocabulary Builder', desc: 'Learn 100 new words', emoji: '📚', earned: true, date: '2024-01-10' },
  { id: 4, title: 'Week Warrior', desc: 'Study 7 days in a row', emoji: '🔥', earned: true, date: '2024-01-15' },
  { id: 5, title: 'Quiz Champion', desc: 'Score 100% in any test', emoji: '🏆', earned: true, date: '2024-01-20' },
  { id: 6, title: 'Speed Learner', desc: 'Complete 3 topics in one day', emoji: '⚡', earned: false },
  { id: 7, title: 'Grammar Master', desc: 'Complete all 94 Grammar topics', emoji: '👨‍🏫', earned: false },
  { id: 8, title: 'Vocabulary King', desc: 'Learn 1000 words', emoji: '👑', earned: false },
  { id: 9, title: 'Speaking Star', desc: 'Complete all Speaking topics', emoji: '🌟', earned: false },
  { id: 10, title: 'Writing Pro', desc: 'Complete all Writing topics', emoji: '✍️', earned: false },
  { id: 11, title: 'Perfect Month', desc: 'Study every day for 30 days', emoji: '📅', earned: false },
  { id: 12, title: '75 Day Legend', desc: 'Complete the entire 75-day challenge', emoji: '🏅', earned: false },
  { id: 13, title: 'Question Machine', desc: 'Solve 5000 questions', emoji: '🤖', earned: false },
  { id: 14, title: 'Early Bird', desc: 'Study before 6 AM', emoji: '🌅', earned: false },
  { id: 15, title: 'Night Owl', desc: 'Study after 11 PM', emoji: '🦉', earned: false },
  { id: 16, title: 'Brain Surgeon', desc: 'Score 100% in Brain Training', emoji: '🧠', earned: false },
  { id: 17, title: 'Polyglot Path', desc: 'Complete Translation Practice', emoji: '🌐', earned: false },
  { id: 18, title: 'All-Rounder', desc: 'Practice all 10 categories', emoji: '🎯', earned: false },
];

const containerV = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const cardV = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } };

export default function AchievementsPage() {
  const earned = ACHIEVEMENTS.filter(a => a.earned).length;
  const total = ACHIEVEMENTS.length;
  const pct = Math.round((earned / total) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Trophy className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white">Achievements</h1>
            <p className="text-white/80 mt-1">{earned} / {total} earned • {pct}% Complete</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-6 h-3 bg-black/20 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full bg-white/80 rounded-full" />
        </div>
      </motion.div>

      {/* Badges Grid */}
      <motion.div variants={containerV} initial="hidden" animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {ACHIEVEMENTS.map(a => (
          <motion.div key={a.id} variants={cardV}
            className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
              a.earned
                ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40 hover:-translate-y-1'
                : 'bg-slate-900/50 border-slate-800 opacity-50'
            }`}>
            <div className={`text-5xl mb-3 ${a.earned ? '' : 'grayscale'}`}>{a.emoji}</div>
            <h3 className={`font-bold text-sm mb-1 ${a.earned ? 'text-white' : 'text-slate-600'}`}>{a.title}</h3>
            <p className={`text-xs ${a.earned ? 'text-slate-400' : 'text-slate-700'}`}>{a.desc}</p>
            {a.earned ? (
              <div className="mt-3 flex items-center justify-center gap-1 text-emerald-400 text-xs">
                <CheckCircle size={12} /> Earned
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-center gap-1 text-slate-700 text-xs">
                <Lock size={12} /> Locked
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
