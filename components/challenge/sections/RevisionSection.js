// ============================================================
// RevisionSection.js - Key topics + rapid-fire quiz with countdown
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { RefreshCw, CheckCircle, XCircle, Clock, Star, BookOpen, Zap } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 8, repeat: Infinity }} />
  );
}

const QUESTION_TIME = 5; // seconds per question

export default function RevisionSection({ data, dayNum }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [quizDone, setQuizDone] = useState(false);
  const [answers, setAnswers] = useState([]);
  const timerRef = useRef(null);

  const topics = data?.revision?.topics || [];
  const quiz = data?.revision?.quickQuiz || [];

  const currentQ = quiz[qIdx];

  // Countdown timer
  useEffect(() => {
    if (!quizStarted || quizDone || selected !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [quizStarted, qIdx, selected, quizDone]);

  const handleTimeout = () => {
    if (selected !== null) return;
    setSelected('__timeout__');
    setScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
    setAnswers(prev => [...prev, { q: currentQ?.question, correct: false, timed: true }]);
    setTimeout(nextQuestion, 1500);
  };

  const handleSelect = (opt) => {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    const isCorrect = opt === currentQ?.correct;
    setSelected(opt);
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), wrong: prev.wrong + (isCorrect ? 0 : 1) }));
    setAnswers(prev => [...prev, { q: currentQ?.question, correct: isCorrect, chosen: opt, answer: currentQ?.correct }]);
    setTimeout(nextQuestion, 1200);
  };

  const nextQuestion = () => {
    if (qIdx + 1 >= quiz.length) {
      setQuizDone(true);
    } else {
      setQIdx(i => i + 1);
      setSelected(null);
      setTimeLeft(QUESTION_TIME);
    }
  };

  const restartQuiz = () => {
    setQIdx(0); setSelected(null); setTimeLeft(QUESTION_TIME);
    setScore({ correct: 0, wrong: 0 }); setQuizDone(false); setAnswers([]);
  };

  const startQuiz = () => {
    restartQuiz();
    setQuizStarted(true);
  };

  const timerPct = (timeLeft / QUESTION_TIME) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-pink-500 top-0 -right-10" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 left-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <RefreshCw className="w-6 h-6 text-pink-400" />
            <h1 className="text-white font-black text-2xl">Revision 🔄</h1>
          </div>
          <p className="text-gray-400 text-sm">Review key topics, then smash the rapid-fire quiz!</p>
        </motion.div>

        {/* Key Topics */}
        {topics.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-5 h-5 text-violet-400" />
              <h2 className="text-white font-bold text-base">Key Topics to Remember</h2>
            </div>
            {topics.map((topic, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{typeof topic === 'string' ? topic : topic.topic || topic.title || JSON.stringify(topic)}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Quiz Section */}
        {quiz.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h2 className="text-white font-bold text-base">Rapid-Fire Quiz ⚡</h2>
              </div>
              <span className="text-gray-400 text-xs">{quiz.length} questions • {QUESTION_TIME}s each</span>
            </div>

            {!quizStarted && !quizDone && (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 text-center space-y-3">
                <p className="text-4xl">⚡</p>
                <p className="text-white font-bold text-lg">Ready for a speed challenge?</p>
                <p className="text-gray-400 text-sm">{quiz.length} questions, {QUESTION_TIME} seconds each. No pressure! 😅</p>
                <button onClick={startQuiz}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-opacity">
                  Start Quiz! 🚀
                </button>
              </motion.div>
            )}

            {quizStarted && !quizDone && currentQ && (
              <motion.div key={qIdx} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
                {/* Timer */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Q{qIdx + 1}/{quiz.length}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-yellow-400" />
                    <span className={cn('font-bold text-sm', timeLeft <= 2 ? 'text-red-400' : 'text-yellow-400')}>{timeLeft}s</span>
                  </div>
                </div>
                {/* Timer bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className={cn('h-full rounded-full', timeLeft <= 2 ? 'bg-red-500' : 'bg-yellow-500')}
                    animate={{ width: `${timerPct}%` }} transition={{ duration: 0.4 }} />
                </div>
                <p className="text-white font-semibold text-base">{currentQ.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(currentQ.options || []).map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const isSelected = selected === letter;
                    const isCorrect = letter === currentQ.correct;
                    return (
                      <button key={i} disabled={selected !== null} onClick={() => handleSelect(letter)}
                        className={cn('px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-all',
                          selected === null ? 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10' :
                          isCorrect ? 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300' :
                          isSelected ? 'bg-red-500/25 border-red-500/50 text-red-300' :
                          'bg-white/5 border-white/10 text-gray-600')}>
                        <span className="font-bold mr-1">{letter}.</span>{opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {quizDone && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="text-center">
                  <p className="text-4xl mb-2">{score.correct === quiz.length ? '🏆' : score.correct > quiz.length / 2 ? '🎯' : '💪'}</p>
                  <p className="text-white font-black text-2xl">{score.correct}/{quiz.length}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {score.correct === quiz.length ? 'Perfect score! You nailed it! 🔥' :
                     score.correct > quiz.length / 2 ? 'Great work! Keep pushing 💪' : 'Keep practicing, you got this! 🌱'}
                  </p>
                </div>
                {/* Answer review */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {answers.map((a, i) => (
                    <div key={i} className={cn('flex items-start gap-2 px-3 py-2 rounded-xl text-xs',
                      a.correct ? 'bg-emerald-500/10' : 'bg-red-500/10')}>
                      {a.correct ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />}
                      <span className={a.correct ? 'text-emerald-300' : 'text-red-300'}>{a.q}</span>
                    </div>
                  ))}
                </div>
                <button onClick={restartQuiz}
                  className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Try Again
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Key Takeaways */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-violet-400" />
            <h2 className="text-white font-bold">Key Takeaways 🌟</h2>
          </div>
          <ul className="space-y-2">
            {(topics.slice(0, 3).length > 0 ? topics.slice(0, 3) : ['Review your notes', 'Practice daily', 'Stay consistent']).map((t, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                {typeof t === 'string' ? t : t.topic || t.title}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
