// ============================================================
// MilestonesSection.js - Achievement cards with unlock celebration
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { Trophy, Lock, Zap, Star, Sparkles } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 8, repeat: Infinity }} />
  );
}

function ConfettiParticle({ color }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{ background: color, left: `${Math.random() * 100}%`, top: '-10px' }}
      animate={{ y: [0, 300], rotate: [0, 360], opacity: [1, 0] }}
      transition={{ duration: 1.5, ease: 'easeIn', delay: Math.random() * 0.5 }}
    />
  );
}

function MilestoneCard({ milestone, isUnlocked, idx }) {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
  }, [isUnlocked]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.08 }}
      whileHover={{ scale: isUnlocked ? 1.03 : 1.01 }}
      className={cn(
        'relative overflow-hidden bg-white/5 backdrop-blur-xl border rounded-2xl p-5 space-y-3',
        isUnlocked ? 'border-yellow-500/40' : 'border-white/10'
      )}
    >
      {/* Confetti */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          {['#f59e0b', '#8b5cf6', '#06b6d4', '#10b981'].map((c, i) => (
            <ConfettiParticle key={i} color={c} />
          ))}
        </div>
      )}

      {/* Badge + lock overlay */}
      <div className="flex items-start justify-between gap-3">
        <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0',
          isUnlocked ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-white/5 border border-white/10 grayscale')}>
          {milestone.badge || '🏅'}
        </div>
        <div className="flex flex-col items-end gap-1">
          {isUnlocked ? (
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
              ✅ Unlocked
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/15 text-gray-500 text-xs font-medium flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" /> Locked
            </span>
          )}
          <div className="flex items-center gap-1 text-yellow-400">
            <Zap className="w-3 h-3" />
            <span className="text-xs font-bold">+{milestone.xp || 0} XP</span>
          </div>
        </div>
      </div>

      <div>
        <p className={cn('font-bold text-sm', isUnlocked ? 'text-white' : 'text-gray-400')}>
          {milestone.title}
        </p>
        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{milestone.description}</p>
      </div>

      {/* Glow effect for unlocked */}
      {isUnlocked && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
      )}
    </motion.div>
  );
}

export default function MilestonesSection({ data, dayNum }) {
  const { xp, level } = useGamificationStore();
  const milestones = data?.milestones?.milestones || [];

  // Determine if milestone is unlocked based on XP
  const isUnlocked = (milestone) => {
    if (!milestone) return false;
    // Simple heuristic: if accumulated XP covers the milestone's XP value
    return (xp || 0) >= (milestone.xp || 0);
  };

  const unlockedCount = milestones.filter(m => isUnlocked(m)).length;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-96 h-96 bg-yellow-500 top-0 -right-20" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 left-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h1 className="text-white font-black text-2xl">Milestones & Badges 🏆</h1>
          </div>
          <p className="text-gray-400 text-sm">Collect achievements as you level up your English skills!</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-yellow-400">{unlockedCount}</p>
            <p className="text-gray-500 text-xs">Unlocked</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-gray-400">{milestones.length - unlockedCount}</p>
            <p className="text-gray-500 text-xs">Locked</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-violet-400">Lv.{level || 1}</p>
            <p className="text-gray-500 text-xs">Your Level</p>
          </div>
        </div>

        {/* Progress */}
        {milestones.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Achievement progress</span>
              <span className="text-yellow-400 font-bold">{unlockedCount}/{milestones.length}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                animate={{ width: milestones.length ? `${(unlockedCount / milestones.length) * 100}%` : '0%' }}
                transition={{ duration: 0.6 }} />
            </div>
          </div>
        )}

        {milestones.length === 0 && (
          <div className="text-center text-gray-400 py-12">No milestones defined yet 🏅</div>
        )}

        {/* Milestones grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {milestones.map((m, idx) => (
            <MilestoneCard key={m.id || idx} milestone={m} isUnlocked={isUnlocked(m)} idx={idx} />
          ))}
        </div>

        {/* Motivational footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-500/10 to-violet-500/10 border border-yellow-500/15 rounded-2xl p-4 text-center">
          <Sparkles className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
          <p className="text-gray-300 text-sm">Keep learning daily to unlock more badges! 🌟</p>
        </motion.div>
      </div>
    </div>
  );
}
