'use client';
// ============================================================
// ACHIEVEMENTS PAGE — Badges, milestones, unlocked/locked
// ============================================================

import { motion } from 'framer-motion';
import { Lock, Trophy, Star, CheckCircle2 } from 'lucide-react';
import useUserStore from '@/store/userStore';

const ALL_BADGES = [
  // Streak badges
  { id:'streak_1',    name:'First Step',      icon:'👣', desc:'Study for 1 day',              req:{ type:'streak',   val:1 },  color:'from-emerald-500 to-teal-500' },
  { id:'streak_7',    name:'7-Day Warrior',   icon:'🔥', desc:'7-day study streak',           req:{ type:'streak',   val:7 },  color:'from-orange-500 to-red-500' },
  { id:'streak_30',   name:'Monthly Champion',icon:'⭐', desc:'30-day study streak',          req:{ type:'streak',   val:30},  color:'from-amber-500 to-yellow-500' },
  { id:'streak_75',   name:'75-Day Legend',   icon:'👑', desc:'75-day study streak',          req:{ type:'streak',   val:75},  color:'from-yellow-500 to-amber-500' },
  // Question badges
  { id:'q_10',        name:'Quick Starter',   icon:'🚀', desc:'Answer 10 questions',          req:{ type:'questions',val:10 }, color:'from-sky-500 to-blue-500' },
  { id:'q_100',       name:'Century',         icon:'💯', desc:'Answer 100 questions correctly',req:{ type:'correct',  val:100},color:'from-indigo-500 to-violet-500' },
  { id:'q_500',       name:'Half Thousand',   icon:'🎯', desc:'Answer 500 questions correctly',req:{ type:'correct',  val:500},color:'from-primary-500 to-secondary-500' },
  { id:'q_1000',      name:'Master Solver',   icon:'🏆', desc:'Answer 1,000 questions correctly',req:{ type:'correct',val:1000},color:'from-amber-500 to-orange-500' },
  // XP badges
  { id:'xp_500',      name:'XP Collector',   icon:'⚡', desc:'Earn 500 XP',                  req:{ type:'xp',       val:500 },color:'from-violet-500 to-purple-500' },
  { id:'xp_5000',     name:'XP Master',      icon:'💎', desc:'Earn 5,000 XP',                req:{ type:'xp',       val:5000},color:'from-cyan-500 to-sky-500' },
  // Level badges
  { id:'level_5',     name:'Rising Star',    icon:'🌟', desc:'Reach Level 5',                req:{ type:'level',    val:5 },  color:'from-rose-500 to-pink-500' },
  { id:'level_10',    name:'Expert',         icon:'🎖️', desc:'Reach Level 10',               req:{ type:'level',    val:10},  color:'from-amber-500 to-orange-500' },
  { id:'level_25',    name:'Grand Master',   icon:'🏅', desc:'Reach Level 25',               req:{ type:'level',    val:25},  color:'from-primary-500 to-secondary-500' },
  // Topic badges
  { id:'topic_1',     name:'Day 1 Complete', icon:'📚', desc:'Complete Day 1',               req:{ type:'topics',   val:1 },  color:'from-emerald-500 to-teal-500' },
  { id:'topic_10',    name:'10 Days Done',   icon:'📖', desc:'Complete 10 days',             req:{ type:'topics',   val:10},  color:'from-sky-500 to-blue-500' },
  { id:'topic_75',    name:'75-Day Graduate',icon:'🎓', desc:'Complete all 75 days!',        req:{ type:'topics',   val:75},  color:'from-yellow-500 to-amber-500' },
  // Word badges
  { id:'words_100',   name:'Word Learner',   icon:'🔤', desc:'Learn 100 new words',          req:{ type:'words',    val:100}, color:'from-teal-500 to-cyan-500' },
  { id:'words_1000',  name:'Vocabulary Guru',icon:'📚', desc:'Learn 1,000 words',            req:{ type:'words',    val:1000},color:'from-green-500 to-emerald-500' },
  // Accuracy badges
  { id:'acc_90',      name:'Sharp Shooter',  icon:'🎯', desc:'Maintain 90%+ accuracy',      req:{ type:'accuracy', val:90},  color:'from-rose-500 to-red-500' },
  { id:'acc_100',     name:'Perfectionist',  icon:'✨', desc:'Score 100% on any test',       req:{ type:'perfect',  val:1 },  color:'from-primary-500 to-violet-500' },
];

export default function AchievementsPage() {
  const { xp, level, streak, totalCorrectAnswers, totalTopicsCompleted, totalWordsLearned, getAccuracy } = useUserStore();
  const accuracy = getAccuracy();

  const isUnlocked = (badge) => {
    switch(badge.req.type) {
      case 'streak':    return streak >= badge.req.val;
      case 'questions': return (totalCorrectAnswers || 0) + 0 >= badge.req.val;
      case 'correct':   return totalCorrectAnswers >= badge.req.val;
      case 'xp':        return xp >= badge.req.val;
      case 'level':     return level >= badge.req.val;
      case 'topics':    return totalTopicsCompleted >= badge.req.val;
      case 'words':     return totalWordsLearned >= badge.req.val;
      case 'accuracy':  return accuracy >= badge.req.val;
      case 'perfect':   return false; // needs special tracking
      default:          return false;
    }
  };

  const unlockedCount = ALL_BADGES.filter(isUnlocked).length;

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <h1 className="text-4xl font-black text-white mb-1">🏆 Achievements</h1>
        <p className="text-slate-400">{unlockedCount} of {ALL_BADGES.length} badges unlocked</p>
      </motion.div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-white">Badge Progress</span>
          <span className="gradient-text font-black text-xl">{Math.round((unlockedCount/ALL_BADGES.length)*100)}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{width:0}} animate={{width:`${(unlockedCount/ALL_BADGES.length)*100}%`}} transition={{duration:1.2}} />
        </div>
      </div>

      {/* Badges Grid */}
      <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={{ visible:{ transition:{ staggerChildren:0.04 } } }} initial="hidden" animate="visible">
        {ALL_BADGES.map((badge) => {
          const unlocked = isUnlocked(badge);
          return (
            <motion.div key={badge.id}
              variants={{ hidden:{opacity:0,scale:0.85}, visible:{opacity:1,scale:1,transition:{duration:0.3}} }}
              whileHover={unlocked ? { scale:1.05, y:-3 } : {}}
              className={`card p-4 flex flex-col items-center text-center relative overflow-hidden transition-all ${
                unlocked ? 'border-yellow-500/30 bg-yellow-500/5' : 'opacity-50 filter grayscale'
              }`}>
              {unlocked && (
                <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-5`} />
              )}
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className={`text-xs font-bold mb-1 ${unlocked ? 'text-white' : 'text-slate-500'}`}>{badge.name}</p>
              <p className="text-[10px] text-slate-600">{badge.desc}</p>
              {unlocked
                ? <CheckCircle2 size={12} className="text-emerald-400 mt-2" />
                : <Lock size={12} className="text-slate-600 mt-2" />
              }
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
