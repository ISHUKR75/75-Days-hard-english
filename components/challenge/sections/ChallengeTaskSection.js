// ============================================================
// ChallengeTaskSection.js - Daily challenge task completion
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { Target, CheckCircle, Share2, Copy, Check, Zap, Star } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 8, repeat: Infinity }} />
  );
}

function ConfettiPop() {
  const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ background: colors[i % colors.length], left: `${10 + Math.random() * 80}%`, top: '50%' }}
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: [-20, -80 - Math.random() * 80], x: [(Math.random() - 0.5) * 100], opacity: [1, 0], scale: [1, 0.5] }}
          transition={{ duration: 1.2, delay: Math.random() * 0.3, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default function ChallengeTaskSection({ data, dayNum }) {
  const [completed, setCompleted] = useState({});
  const [justCompleted, setJustCompleted] = useState(false);
  const [copied, setCopied] = useState(false);

  const challenge = data?.challenge || {};
  const tasks = challenge.tasks || [];

  // Handle both array of strings and array of objects
  const normalizedTasks = tasks.map(t =>
    typeof t === 'string' ? { title: t, description: '' } : t
  );

  const completedCount = Object.values(completed).filter(Boolean).length;
  const allDone = normalizedTasks.length > 0 && completedCount === normalizedTasks.length;

  const toggleTask = (idx) => {
    const wasAllDone = completedCount === normalizedTasks.length - 1 && !completed[idx];
    setCompleted(prev => ({ ...prev, [idx]: !prev[idx] }));
    if (wasAllDone) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 2500);
    }
  };

  const shareText = `🚀 Day ${dayNum} Challenge Complete!\n\nI finished today's English challenge:\n${normalizedTasks.map((t, i) => `✅ ${t.title}`).join('\n')}\n\n#EnglishLearning #Challenge`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-96 h-96 bg-orange-500 top-0 -left-20" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 right-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Target className="w-6 h-6 text-orange-400" />
            <h1 className="text-white font-black text-2xl">Daily Challenge 🎯</h1>
          </div>
          <p className="text-gray-400 text-sm">Complete all tasks to earn your daily badge!</p>
        </motion.div>

        {/* Progress */}
        {normalizedTasks.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Tasks completed</span>
              <span className="text-orange-400 font-bold">{completedCount}/{normalizedTasks.length}</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
                animate={{ width: normalizedTasks.length ? `${(completedCount / normalizedTasks.length) * 100}%` : '0%' }}
                transition={{ duration: 0.5 }} />
            </div>
          </div>
        )}

        {normalizedTasks.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
            No challenge tasks for today 🎯
          </div>
        )}

        {/* Task list */}
        <div className="space-y-3">
          {normalizedTasks.map((task, idx) => {
            const isDone = completed[idx];
            return (
              <motion.div key={idx}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.07 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => toggleTask(idx)}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all select-none',
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                )}>
                {/* Checkbox */}
                <div className={cn('w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                  isDone ? 'bg-emerald-500 border-emerald-500' : 'border-white/30')}>
                  {isDone && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('font-semibold text-sm', isDone ? 'text-emerald-400 line-through' : 'text-white')}>
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{task.description}</p>
                  )}
                  {task.xp && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400 text-xs font-semibold">+{task.xp} XP</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion celebration */}
        <AnimatePresence>
          {allDone && (
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="relative bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-2xl p-6 text-center overflow-hidden">
              {justCompleted && <ConfettiPop />}
              <p className="text-4xl mb-2">🎉</p>
              <p className="text-white font-black text-xl">Challenge Complete!</p>
              <p className="text-gray-400 text-sm mt-1">You absolutely crushed it today! 🔥</p>
              <div className="flex justify-center gap-2 mt-4">
                <Star className="w-4 h-4 text-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share progress */}
        {allDone && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-violet-400" />
              <h3 className="text-white font-bold text-sm">Share Your Progress! 📢</h3>
            </div>
            <p className="text-gray-400 text-xs whitespace-pre-line leading-relaxed">{shareText}</p>
            <button onClick={handleCopy}
              className={cn('flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all',
                copied ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/20 text-gray-400 hover:text-white')}>
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to share</>}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
