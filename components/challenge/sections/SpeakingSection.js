// ============================================================
// SpeakingSection.js - Speaking exercises with TTS + pronunciation guide
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { Volume2, CheckCircle, Mic, ChevronDown, Star } from 'lucide-react';

function speak(text, rate = 1) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US'; utt.rate = rate;
  window.speechSynthesis.speak(utt);
}

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 8, repeat: Infinity }} />
  );
}

export default function SpeakingSection({ data, dayNum }) {
  const [completedSentences, setCompletedSentences] = useState({});
  const [openExercise, setOpenExercise] = useState(0);
  const [speakRate, setSpeakRate] = useState(1);

  const exercises = data?.speaking?.exercises || [];

  const toggleSentence = (exIdx, sIdx) => {
    const key = `${exIdx}-${sIdx}`;
    setCompletedSentences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getExerciseProgress = (exIdx, total) => {
    const done = Array.from({ length: total }, (_, i) => completedSentences[`${exIdx}-${i}`]).filter(Boolean).length;
    return { done, total };
  };

  const totalDone = Object.values(completedSentences).filter(Boolean).length;
  const totalSentences = exercises.reduce((s, ex) => s + (ex.sentences?.length || 0), 0);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-emerald-500 top-0 -right-20" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-10 left-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Mic className="w-6 h-6 text-emerald-400" />
            <h1 className="text-white font-black text-2xl">Speaking Practice 🗣️</h1>
          </div>
          <p className="text-gray-400 text-sm">Listen → Repeat → Master. Use a mirror for best results! 🪞</p>
        </motion.div>

        {/* Overall progress */}
        {totalSentences > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall progress</span>
              <span className="text-emerald-400 font-bold">{totalDone}/{totalSentences}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                animate={{ width: totalSentences ? `${(totalDone / totalSentences) * 100}%` : '0%' }}
                transition={{ duration: 0.5 }} />
            </div>
          </motion.div>
        )}

        {/* Speed selector */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">TTS Speed:</span>
          {[0.75, 1, 1.25].map(r => (
            <button key={r} onClick={() => setSpeakRate(r)}
              className={cn('px-3 py-1 rounded-xl text-xs font-bold border transition-all',
                speakRate === r ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
              {r}x
            </button>
          ))}
        </div>

        {/* Mirror reminder card */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/20 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-3xl">🪞</span>
          <div>
            <p className="text-white font-semibold text-sm">Mirror Practice Tip!</p>
            <p className="text-gray-400 text-xs mt-0.5">Practice in front of a mirror to improve mouth movement, eye contact & confidence. It works! ✨</p>
          </div>
        </motion.div>

        {/* Exercise cards */}
        {exercises.length === 0 && (
          <div className="text-center text-gray-400 py-12">No speaking exercises today 🎤</div>
        )}

        {exercises.map((ex, exIdx) => {
          const { done, total } = getExerciseProgress(exIdx, ex.sentences?.length || 0);
          const isOpen = openExercise === exIdx;
          return (
            <motion.div key={ex.id || exIdx}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: exIdx * 0.08 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {/* Exercise header */}
              <button className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenExercise(isOpen ? -1 : exIdx)}>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">{exIdx + 1}</span>
                    <span className="text-white font-semibold">{ex.title}</span>
                    {done === total && total > 0 && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                  </div>
                  {ex.instructions && <p className="text-gray-400 text-xs">{ex.instructions}</p>}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <span className="text-xs text-emerald-400">{done}/{total}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </div>
              </button>

              {/* Sentences */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-white/10 space-y-3 pt-4">
                      {(ex.sentences || []).map((sent, sIdx) => {
                        const key = `${exIdx}-${sIdx}`;
                        const done = completedSentences[key];
                        return (
                          <motion.div key={sIdx}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: sIdx * 0.04 }}
                            className={cn('p-4 rounded-xl border transition-colors',
                              done ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10')}>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm leading-relaxed">{sent.english}</p>
                                {sent.pronunciation && (
                                  <p className="text-cyan-400 text-xs mt-1 font-mono">/{sent.pronunciation}/</p>
                                )}
                                {sent.hindi && (
                                  <p className="text-orange-200 text-xs mt-1">{sent.hindi}</p>
                                )}
                              </div>
                              <div className="flex flex-col gap-2 flex-shrink-0">
                                <button onClick={() => speak(sent.english, speakRate)}
                                  className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/40 flex items-center justify-center transition-colors">
                                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                                </button>
                                <button onClick={() => toggleSentence(exIdx, sIdx)}
                                  className={cn('w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
                                    done ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-white/10 border-white/20 hover:bg-white/20')}>
                                  <CheckCircle className={cn('w-3.5 h-3.5', done ? 'text-emerald-400' : 'text-gray-500')} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {/* Completion */}
        <AnimatePresence>
          {totalSentences > 0 && totalDone === totalSentences && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-5 text-center">
              <p className="text-3xl mb-2">🎉</p>
              <p className="text-emerald-400 font-bold text-lg">Speaking Practice Complete!</p>
              <p className="text-gray-400 text-sm mt-1">You're speaking like a pro! 🚀</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
