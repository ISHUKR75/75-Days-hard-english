// ============================================================
// StudyPlanSection.js - Morning routine schedule timeline
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { Clock, CheckCircle, Sun, Zap, Calendar } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity }} />
  );
}

const TIME_COLORS = [
  'bg-violet-500/20 border-violet-500/30 text-violet-300',
  'bg-cyan-500/20 border-cyan-500/30 text-cyan-300',
  'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
  'bg-orange-500/20 border-orange-500/30 text-orange-300',
  'bg-pink-500/20 border-pink-500/30 text-pink-300',
  'bg-blue-500/20 border-blue-500/30 text-blue-300',
];

export default function StudyPlanSection({ data, dayNum }) {
  const [checked, setChecked] = useState({});

  const schedule = data?.morningRoutine?.schedule || [];

  const toggle = (idx) => setChecked(prev => ({ ...prev, [idx]: !prev[idx] }));

  const totalMinutes = schedule.reduce((sum, slot) => {
    const match = String(slot.duration || '').match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  const doneCount = Object.values(checked).filter(Boolean).length;
  const progress = schedule.length > 0 ? (doneCount / schedule.length) * 100 : 0;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-yellow-500 top-0 -right-10" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 left-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Sun className="w-6 h-6 text-yellow-400" />
            <h1 className="text-white font-black text-2xl">Study Plan 📅</h1>
          </div>
          <p className="text-gray-400 text-sm">Your personalized daily schedule — tick off as you go! ✅</p>
        </motion.div>

        {/* Morning message */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-2xl p-5 text-center">
          <p className="text-3xl mb-2">☀️</p>
          <p className="text-yellow-200 font-bold text-base">Rise & Shine, Champion!</p>
          <p className="text-gray-400 text-sm mt-1">Consistency beats perfection. Start your day strong! 💪</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-yellow-400">{schedule.length}</p>
            <p className="text-gray-500 text-xs">Activities</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-cyan-400">{totalMinutes}m</p>
            <p className="text-gray-500 text-xs">Total Time</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <p className="text-xl font-black text-emerald-400">{doneCount}</p>
            <p className="text-gray-500 text-xs">Completed</p>
          </div>
        </div>

        {/* Progress bar */}
        {schedule.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Daily progress</span>
              <span className="text-emerald-400 font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-emerald-500"
                animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>
        )}

        {schedule.length === 0 && (
          <div className="text-center text-gray-400 py-12">No schedule available today 📅</div>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-white/10" />

          <div className="space-y-3">
            {schedule.map((slot, idx) => {
              const isDone = checked[idx];
              const colorClass = TIME_COLORS[idx % TIME_COLORS.length];
              return (
                <motion.div key={idx}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06 }}
                  className={cn('relative flex items-start gap-4 pl-12',
                    isDone && 'opacity-60')}>
                  {/* Timeline dot */}
                  <div className={cn('absolute left-0 w-11 h-11 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all z-10',
                    isDone ? 'bg-emerald-500/20 border-emerald-500/60' : 'bg-white/10 border-white/20')}>
                    {isDone
                      ? <CheckCircle className="w-5 h-5 text-emerald-400" />
                      : <Clock className="w-4 h-4 text-gray-400" />}
                  </div>

                  {/* Card */}
                  <div className={cn('flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3',
                    isDone && 'bg-emerald-500/5 border-emerald-500/15')}>
                    <div>
                      {slot.time && (
                        <span className={cn('inline-block px-2 py-0.5 rounded-full border text-xs font-bold mb-1', colorClass)}>
                          {slot.time}
                        </span>
                      )}
                      <p className={cn('font-semibold text-sm', isDone ? 'text-gray-400 line-through' : 'text-white')}>
                        {slot.activity}
                      </p>
                      {slot.duration && (
                        <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                          <Zap className="w-3 h-3" /> {slot.duration}
                        </p>
                      )}
                    </div>
                    <button onClick={() => toggle(idx)}
                      className={cn('w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all',
                        isDone ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-white/10 border-white/20 hover:bg-white/20')}>
                      <CheckCircle className={cn('w-4 h-4', isDone ? 'text-emerald-400' : 'text-gray-600')} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* All done */}
        <AnimatePresence>
          {progress === 100 && schedule.length > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-5 text-center">
              <p className="text-3xl mb-1">🏆</p>
              <p className="text-emerald-400 font-bold">All activities complete!</p>
              <p className="text-gray-400 text-sm mt-1">You smashed today's study plan! 🔥</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
