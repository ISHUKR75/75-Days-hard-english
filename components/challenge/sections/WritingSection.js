// ============================================================
// WritingSection.js - Writing exercises with textarea, word count, model answer
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { PenLine, Eye, EyeOff, Save, CheckCircle, ChevronDown, FileText } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity }} />
  );
}

const STORAGE_KEY_PREFIX = 'writing_draft_';

export default function WritingSection({ data, dayNum }) {
  const [drafts, setDrafts] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  const [saved, setSaved] = useState({});
  const [openExercise, setOpenExercise] = useState(0);

  const exercises = data?.writing?.exercises || [];

  // Load drafts from localStorage on mount
  useEffect(() => {
    const loaded = {};
    exercises.forEach((ex, exIdx) => {
      (ex.tasks || []).forEach((_, tIdx) => {
        const key = `${STORAGE_KEY_PREFIX}${dayNum}_${exIdx}_${tIdx}`;
        const val = localStorage.getItem(key);
        if (val) loaded[`${exIdx}-${tIdx}`] = val;
      });
    });
    setDrafts(loaded);
  }, [dayNum]);

  const handleChange = (exIdx, tIdx, value) => {
    setDrafts(prev => ({ ...prev, [`${exIdx}-${tIdx}`]: value }));
    setSaved(prev => ({ ...prev, [`${exIdx}-${tIdx}`]: false }));
  };

  const saveDraft = (exIdx, tIdx) => {
    const key = `${STORAGE_KEY_PREFIX}${dayNum}_${exIdx}_${tIdx}`;
    localStorage.setItem(key, drafts[`${exIdx}-${tIdx}`] || '');
    setSaved(prev => ({ ...prev, [`${exIdx}-${tIdx}`]: true }));
    setTimeout(() => setSaved(prev => ({ ...prev, [`${exIdx}-${tIdx}`]: false })), 2000);
  };

  const wordCount = (text) => text?.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-orange-500 top-0 -left-20" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 right-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <PenLine className="w-6 h-6 text-orange-400" />
            <h1 className="text-white font-black text-2xl">Writing Practice ✍️</h1>
          </div>
          <p className="text-gray-400 text-sm">Express yourself clearly — writing is thinking made visible!</p>
        </motion.div>

        {exercises.length === 0 && (
          <div className="text-center text-gray-400 py-12">No writing exercises today ✍️</div>
        )}

        {exercises.map((ex, exIdx) => {
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
                    <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center">{exIdx + 1}</span>
                    <span className="text-white font-semibold">{ex.title || `Exercise ${exIdx + 1}`}</span>
                  </div>
                  {ex.type && <span className="text-xs text-gray-500 capitalize">{ex.type}</span>}
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-5">
                      {/* Instructions */}
                      {ex.instructions && (
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
                          <p className="text-orange-200 text-sm leading-relaxed">{ex.instructions}</p>
                        </div>
                      )}

                      {/* Tasks */}
                      {(ex.tasks || []).map((task, tIdx) => {
                        const draftKey = `${exIdx}-${tIdx}`;
                        const text = drafts[draftKey] || '';
                        const wc = wordCount(text);
                        const isShowingAnswer = showAnswer[draftKey];
                        const isSaved = saved[draftKey];
                        const taskPrompt = typeof task === 'string' ? task : task?.prompt || task?.question || task?.title || `Task ${tIdx + 1}`;
                        const modelAnswer = typeof task === 'object' ? (task?.answer || task?.modelAnswer || task?.sampleAnswer) : null;

                        return (
                          <div key={tIdx} className="space-y-3">
                            {/* Task prompt */}
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{tIdx + 1}</span>
                              <p className="text-gray-200 text-sm leading-relaxed">{taskPrompt}</p>
                            </div>

                            {/* Textarea */}
                            <div className="relative">
                              <textarea
                                value={text}
                                onChange={e => handleChange(exIdx, tIdx, e.target.value)}
                                placeholder="Start writing here... 📝"
                                rows={5}
                                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-gray-600 resize-none outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition-colors leading-relaxed"
                              />
                            </div>

                            {/* Word count + actions */}
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className={cn('text-xs font-medium',
                                wc >= 150 ? 'text-emerald-400' : wc >= 80 ? 'text-orange-400' : 'text-gray-500')}>
                                📊 {wc} words {wc >= 150 && '✅'}
                              </span>
                              <div className="flex gap-2">
                                <button onClick={() => saveDraft(exIdx, tIdx)}
                                  className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all',
                                    isSaved ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/20 text-gray-400 hover:text-white')}>
                                  {isSaved ? <><CheckCircle className="w-3 h-3" /> Saved!</> : <><Save className="w-3 h-3" /> Save Draft</>}
                                </button>
                                {modelAnswer && (
                                  <button onClick={() => setShowAnswer(prev => ({ ...prev, [draftKey]: !prev[draftKey] }))}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/20 bg-white/5 text-gray-400 hover:text-white text-xs font-semibold">
                                    {isShowingAnswer ? <><EyeOff className="w-3 h-3" /> Hide Answer</> : <><Eye className="w-3 h-3" /> Model Answer</>}
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Model answer */}
                            <AnimatePresence>
                              {isShowingAnswer && modelAnswer && (
                                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                                  <p className="text-xs text-emerald-400 font-semibold mb-2 flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> Model Answer
                                  </p>
                                  <p className="text-gray-300 text-sm leading-relaxed">{modelAnswer}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}

                      {(!ex.tasks || ex.tasks.length === 0) && (
                        <p className="text-gray-500 text-sm text-center py-4">No tasks specified for this exercise.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
