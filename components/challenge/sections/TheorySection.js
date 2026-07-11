// ============================================================
// TheorySection.js - Grammar theory with expandable accordions
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { ChevronDown, CheckCircle, BookOpen, Lightbulb, Tag, BarChart2 } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const RULE_COLORS = [
  'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'bg-pink-500/20 text-pink-300 border-pink-500/30',
];

function Blob({ className }) {
  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 7, repeat: Infinity }}
    />
  );
}

export default function TheorySection({ data, dayNum }) {
  const [openId, setOpenId] = useState(null);
  const [understood, setUnderstood] = useState({});

  const sections = data?.grammarTheory?.sections || [];

  const understoodCount = Object.values(understood).filter(Boolean).length;
  const progress = sections.length > 0 ? (understoodCount / sections.length) * 100 : 0;

  const toggleUnderstood = (id) => {
    setUnderstood(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatTheory = (text = '') => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return null;
      const isNumbered = /^\d+[\.\)]/.test(line.trim());
      return (
        <p key={i} className={cn('text-gray-300 text-sm leading-relaxed', isNumbered && 'pl-4')}>
          {line}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-violet-600 top-10 -right-20" />
      <Blob className="w-64 h-64 bg-cyan-500 bottom-10 left-10" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible"
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-violet-400" />
            <h1 className="text-white font-black text-2xl">Grammar Theory 📖</h1>
          </div>
          {/* Progress bar */}
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">{understoodCount} / {sections.length} sections understood</span>
            <span className="text-emerald-400 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Accordion Sections */}
        {sections.length === 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate="visible"
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center text-gray-400">
            No theory sections available for today.
          </motion.div>
        )}

        {sections.map((sec, idx) => {
          const isOpen = openId === sec.id;
          const isUnderstood = understood[sec.id];
          return (
            <motion.div
              key={sec.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07 }}
              className={cn(
                'bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-colors',
                isUnderstood ? 'border-emerald-500/40' : 'border-white/10'
              )}
            >
              {/* Accordion Header */}
              <button
                className="w-full flex items-center justify-between p-5 text-left group"
                onClick={() => setOpenId(isOpen ? null : sec.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className={cn('font-semibold text-base', isUnderstood ? 'text-emerald-400' : 'text-white')}>
                    {sec.title}
                  </span>
                  {isUnderstood && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.div>
              </button>

              {/* Accordion Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-5 border-t border-white/10 pt-4">
                      {/* Theory Text */}
                      {sec.theory && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-violet-400 text-xs font-semibold uppercase tracking-wide">
                            <Lightbulb className="w-3.5 h-3.5" /> Theory
                          </div>
                          <div className="space-y-1">{formatTheory(sec.theory)}</div>
                        </div>
                      )}

                      {/* Examples Table */}
                      {sec.examples && sec.examples.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-2">
                            📝 Examples
                          </div>
                          <div className="rounded-xl overflow-hidden border border-white/10">
                            {sec.examples.map((ex, i) => (
                              <div key={i} className={cn(
                                'px-4 py-3 flex gap-3 text-sm',
                                i % 2 === 0 ? 'bg-white/5' : 'bg-white/[0.02]'
                              )}>
                                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {i + 1}
                                </span>
                                <span className="text-gray-300">{typeof ex === 'string' ? ex : ex.sentence || ex.example || JSON.stringify(ex)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Rules */}
                      {sec.keyRules && sec.keyRules.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wide mb-2">
                            <Tag className="w-3.5 h-3.5" /> Key Rules
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {sec.keyRules.map((rule, i) => (
                              <span key={i} className={cn(
                                'px-3 py-1 rounded-full border text-xs font-medium',
                                RULE_COLORS[i % RULE_COLORS.length]
                              )}>
                                {rule}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Understood toggle */}
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleUnderstood(sec.id)}
                        className={cn(
                          'w-full py-2.5 rounded-xl border font-semibold text-sm transition-all',
                          isUnderstood
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-white/5 border-white/20 text-gray-400 hover:text-white hover:border-white/40'
                        )}
                      >
                        {isUnderstood ? '✅ Got it!' : 'Mark as Understood'}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Completion banner */}
        <AnimatePresence>
          {progress === 100 && sections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-5 text-center"
            >
              <p className="text-2xl mb-1">🎉</p>
              <p className="text-emerald-400 font-bold">All theory sections understood!</p>
              <p className="text-gray-400 text-sm mt-1">You're crushing it today 🔥</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
