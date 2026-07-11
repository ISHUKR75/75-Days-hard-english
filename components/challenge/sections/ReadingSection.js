// ============================================================
// ReadingSection.js - Passage display with questions and score tracking
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { BookOpen, Eye, EyeOff, CheckCircle, XCircle, Highlighter } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity }} />
  );
}

export default function ReadingSection({ data, dayNum }) {
  const [exIdx, setExIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const exercises = data?.reading?.exercises || [];
  const current = exercises[exIdx] || {};
  const questions = current.questions || [];

  const handleReveal = (qIdx) => {
    if (!revealed[`${exIdx}-${qIdx}`]) {
      setRevealed(prev => ({ ...prev, [`${exIdx}-${qIdx}`]: true }));
    }
  };

  const submitAnswer = (qIdx, answer) => {
    const key = `${exIdx}-${qIdx}`;
    if (answers[key]) return;
    const correct = answer.trim().toLowerCase() === (questions[qIdx]?.answer || '').trim().toLowerCase();
    setAnswers(prev => ({ ...prev, [key]: { value: answer, correct } }));
    setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-teal-500 top-0 -right-20" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 left-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-6 h-6 text-teal-400" />
            <h1 className="text-white font-black text-2xl">Reading Comprehension 📖</h1>
          </div>
          <p className="text-gray-400 text-sm">Read carefully, then answer the questions below.</p>
        </motion.div>

        {/* Score */}
        {score.total > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
            <span className="text-teal-400 font-bold text-sm">Score: {score.correct}/{score.total}</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-teal-500 rounded-full"
                animate={{ width: `${(score.correct / score.total) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Exercise tabs */}
        {exercises.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {exercises.map((_, i) => (
              <button key={i} onClick={() => setExIdx(i)}
                className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                  i === exIdx ? 'bg-teal-500/20 border-teal-500/40 text-teal-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
                Passage {i + 1}
              </button>
            ))}
          </div>
        )}

        {exercises.length === 0 && (
          <div className="text-center text-gray-400 py-12">No reading exercises today 📖</div>
        )}

        {current.passage && (
          <>
            {/* Passage */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Highlighter className="w-4 h-4 text-teal-400" />
                <span className="text-teal-400 text-xs font-semibold uppercase tracking-wide">Reading Passage</span>
              </div>
              <p className="text-gray-200 leading-8 text-sm sm:text-base whitespace-pre-wrap">{current.passage}</p>
            </motion.div>

            {/* Questions */}
            {questions.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center">Q</span>
                  Comprehension Questions
                </h2>
                {questions.map((q, qIdx) => {
                  const answerKey = `${exIdx}-${qIdx}`;
                  const submitted = answers[answerKey];
                  const isRevealed = revealed[answerKey];

                  return (
                    <motion.div key={qIdx}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: qIdx * 0.06 }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{qIdx + 1}</span>
                        <p className="text-gray-200 text-sm font-medium">{q.question}</p>
                      </div>

                      {/* Answer input */}
                      {!isRevealed && !submitted && (
                        <form onSubmit={e => { e.preventDefault(); const val = e.target.ans.value; if (val.trim()) submitAnswer(qIdx, val); }}>
                          <div className="flex gap-2">
                            <input name="ans" type="text" placeholder="Type your answer..."
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-gray-500 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30" />
                            <button type="submit"
                              className="px-4 py-2 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-semibold hover:bg-teal-500/30">
                              Check
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Result */}
                      {submitted && (
                        <div className={cn('px-3 py-2 rounded-xl text-sm flex items-start gap-2',
                          submitted.correct ? 'bg-emerald-500/15 border border-emerald-500/30' : 'bg-red-500/15 border border-red-500/30')}>
                          {submitted.correct ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
                          <div>
                            <p className={cn('font-medium', submitted.correct ? 'text-emerald-400' : 'text-red-400')}>
                              {submitted.correct ? 'Correct! 🎉' : 'Not quite.'}
                            </p>
                            {!submitted.correct && <p className="text-gray-300 text-xs mt-0.5">Answer: {q.answer}</p>}
                          </div>
                        </div>
                      )}

                      {/* Reveal button */}
                      {!submitted && !isRevealed && (
                        <button onClick={() => handleReveal(qIdx)}
                          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors">
                          <Eye className="w-3.5 h-3.5" /> Show answer
                        </button>
                      )}
                      {isRevealed && !submitted && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="bg-violet-500/15 border border-violet-500/20 rounded-xl px-3 py-2 text-sm text-violet-300">
                          <span className="font-semibold">Answer: </span>{q.answer}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
