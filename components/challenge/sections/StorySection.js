// ============================================================
// StorySection.js - Story with paragraph-by-paragraph display, TTS, comprehension quiz
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { BookOpen, Volume2, Languages, Tag, CheckCircle, XCircle, Play, Pause } from 'lucide-react';

function speak(text, rate = 1, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US'; utt.rate = rate;
  if (onEnd) utt.onend = onEnd;
  window.speechSynthesis.speak(utt);
}

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 9, repeat: Infinity }} />
  );
}

export default function StorySection({ data, dayNum }) {
  const [showHindi, setShowHindi] = useState({});
  const [readAlongPara, setReadAlongPara] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizRevealed, setQuizRevealed] = useState({});
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const story = data?.stories?.story || {};
  const paragraphs = story.paragraphs || [];
  const questions = data?.stories?.comprehensionQuestions || [];

  const handleReadAlong = (idx, text) => {
    if (readAlongPara === idx) {
      window.speechSynthesis?.cancel();
      setReadAlongPara(null);
    } else {
      setReadAlongPara(idx);
      speak(text, 0.9, () => setReadAlongPara(null));
    }
  };

  const handleQuizAnswer = (qIdx, option) => {
    if (quizAnswers[qIdx]) return;
    const q = questions[qIdx];
    const correct = option === q.correct;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: { value: option, correct } }));
    setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-pink-500 top-0 -right-10" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 left-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-6 h-6 text-pink-400" />
            <h1 className="text-white font-black text-2xl">Story Time 📚</h1>
          </div>
          <p className="text-gray-400 text-sm">Read through the story and toggle Hindi for help!</p>
        </motion.div>

        {paragraphs.length === 0 && (
          <div className="text-center text-gray-400 py-12">No story available today 📚</div>
        )}

        {/* Story paragraphs */}
        {paragraphs.map((para, idx) => (
          <motion.div key={para.id || idx}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }}
            className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3',
              readAlongPara === idx && 'border-pink-500/40 bg-pink-500/10')}>

            {/* Paragraph number */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">¶ {idx + 1}</span>
              <div className="flex gap-2">
                <button onClick={() => handleReadAlong(idx, para.english)}
                  className={cn('w-7 h-7 rounded-full border flex items-center justify-center transition-colors',
                    readAlongPara === idx ? 'bg-pink-500/20 border-pink-500/40' : 'bg-white/10 border-white/20 hover:bg-white/20')}>
                  {readAlongPara === idx
                    ? <Pause className="w-3 h-3 text-pink-400" />
                    : <Play className="w-3 h-3 text-gray-300" />}
                </button>
                {para.hindi && (
                  <button onClick={() => setShowHindi(prev => ({ ...prev, [idx]: !prev[idx] }))}
                    className="w-7 h-7 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center">
                    <Languages className="w-3 h-3 text-gray-300" />
                  </button>
                )}
              </div>
            </div>

            {/* English text */}
            <p className="text-gray-200 text-sm sm:text-base leading-8">{para.english}</p>

            {/* Hindi toggle */}
            <AnimatePresence>
              {showHindi[idx] && para.hindi && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-orange-200 text-sm leading-7 border-t border-white/10 pt-3">
                  {para.hindi}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Grammar points */}
            {para.grammarPoints && para.grammarPoints.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
                <Tag className="w-3.5 h-3.5 text-violet-400 mt-0.5" />
                {para.grammarPoints.map((gp, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs">
                    {gp}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Comprehension Quiz */}
        {questions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Comprehension Quiz 🎯</h2>
              {score.total > 0 && (
                <span className="text-emerald-400 font-bold text-sm">{score.correct}/{score.total}</span>
              )}
            </div>

            {questions.map((q, qIdx) => {
              const answer = quizAnswers[qIdx];
              const isRevealed = quizRevealed[qIdx];
              return (
                <motion.div key={qIdx}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: qIdx * 0.05 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 space-y-3">
                  <p className="text-gray-200 text-sm font-medium">{q.question}</p>
                  <div className="space-y-2">
                    {(q.options || []).map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      const isSelected = answer?.value === letter;
                      const isCorrect = letter === q.correct;
                      return (
                        <button key={i} disabled={!!answer}
                          onClick={() => handleQuizAnswer(qIdx, letter)}
                          className={cn('w-full text-left px-3 py-2 rounded-xl border text-sm transition-all',
                            !answer ? 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10' :
                            isCorrect ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                            isSelected ? 'bg-red-500/20 border-red-500/40 text-red-400' :
                            'bg-white/5 border-white/10 text-gray-500 opacity-50')}>
                          <span className="font-bold mr-2">{letter}.</span>{opt}
                        </button>
                      );
                    })}
                  </div>
                  {answer && (
                    <p className={cn('text-xs font-semibold', answer.correct ? 'text-emerald-400' : 'text-red-400')}>
                      {answer.correct ? '🎉 Correct!' : `❌ Correct answer: ${q.correct}`}
                    </p>
                  )}
                </motion.div>
              );
            })}

            {score.total === questions.length && questions.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-5 text-center">
                <p className="text-3xl mb-1">🏆</p>
                <p className="text-emerald-400 font-bold">Quiz Complete! {score.correct}/{score.total} correct</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
