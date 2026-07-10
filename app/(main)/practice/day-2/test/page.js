'use client';
// ============================================================
// Day 2 — Daily Test / MCQ Page
// 150 MCQ questions with timer, scoring, review, and analytics.
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Target, ArrowLeft, Clock, Trophy, CheckCircle2, XCircle,
  RotateCcw, ChevronRight, ChevronLeft, Eye, Zap, Star,
  BarChart3, Flame, Award, BookOpen, Play, Pause, 
  AlertCircle, CheckCheck, Sparkles, Timer
} from 'lucide-react';

// ── Difficulty colour map ──────────────────────────────────────────────────────
const DIFF_COLORS = {
  easy:   { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  hard:   { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
};

// ── Result screen ──────────────────────────────────────────────────────────────
function ResultScreen({ score, total, timeTaken, answers, questions, onRestart, onReview }) {
  const percent = Math.round((score / total) * 100);
  const grade =
    percent >= 90 ? { label: 'Excellent!', color: 'text-green-600', emoji: '🏆' } :
    percent >= 75 ? { label: 'Very Good!', color: 'text-blue-600', emoji: '🎉' } :
    percent >= 60 ? { label: 'Good!', color: 'text-indigo-600', emoji: '👍' } :
    percent >= 40 ? { label: 'Keep Practicing!', color: 'text-yellow-600', emoji: '💪' } :
                    { label: 'Need More Practice', color: 'text-red-600', emoji: '📚' };

  // Category analysis
  const categoryStats = {};
  questions.forEach((q, i) => {
    const cat = q.category || 'General';
    if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
    categoryStats[cat].total++;
    if (answers[i] === q.correct) categoryStats[cat].correct++;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
          <div className="text-6xl mb-3">{grade.emoji}</div>
          <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
          <p className={`text-xl font-semibold ${grade.color.replace('text-', 'text-white opacity-90')}`}>
            {grade.label}
          </p>
        </div>

        {/* Score circle */}
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <motion.circle
                  cx="18" cy="18" r="15.9155"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="3"
                  strokeDasharray={`${percent}, 100`}
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0, 100' }}
                  animate={{ strokeDasharray: `${percent}, 100` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{percent}%</span>
                <span className="text-sm text-gray-500">{score}/{total}</span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Correct', value: score, icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
              { label: 'Wrong', value: total - score, icon: XCircle, color: 'text-red-600 bg-red-50' },
              { label: 'Score', value: `${score * 10} XP`, icon: Zap, color: 'text-purple-600 bg-purple-50' },
              { label: 'Time', value: `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`, icon: Clock, color: 'text-blue-600 bg-blue-50' },
            ].map(stat => (
              <div key={stat.label} className={`p-3 rounded-xl ${stat.color.split(' ')[1]} text-center`}>
                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color.split(' ')[0]}`} />
                <div className={`text-lg font-bold ${stat.color.split(' ')[0]}`}>{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          {Object.keys(categoryStats).length > 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Category Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(categoryStats).map(([cat, stats]) => {
                  const pct = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-32 truncate">{cat}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-full rounded-full ${pct >= 70 ? 'bg-green-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-10 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onReview}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <Eye className="w-4 h-4" />
              Review Answers
            </button>
            <button
              onClick={onRestart}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              Take Again
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main test page ────────────────────────────────────────────────────────────
export default function Day2TestPage() {
  const [questions, setQuestions]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [testState, setTestState]   = useState('setup'); // setup | active | paused | result | review
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers]       = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft]     = useState(0);
  const [totalTime, setTotalTime]   = useState(0);
  const [timeTaken, setTimeTaken]   = useState(0);
  const [testConfig, setTestConfig] = useState({ count: 20, timed: true, difficulty: 'all' });
  const [isPaused, setIsPaused]     = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Load questions
  useEffect(() => {
    fetch('/api/challenge/2')
      .then(r => r.json())
      .then(data => {
        const rawTest = data?.mockTest || [];
        setQuestions(rawTest);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtered + shuffled questions for current test
  const [activeQuestions, setActiveQuestions] = useState([]);

  const startTest = useCallback(() => {
    let pool = [...questions];
    if (testConfig.difficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === testConfig.difficulty);
    }
    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const selected = pool.slice(0, Math.min(testConfig.count, pool.length));
    setActiveQuestions(selected);
    setCurrentIdx(0);
    setAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
    const secs = testConfig.timed ? testConfig.count * 30 : 0;
    setTimeLeft(secs);
    setTotalTime(secs);
    setTimeTaken(0);
    setTestState('active');
    startTimeRef.current = Date.now();
  }, [questions, testConfig]);

  // Timer
  useEffect(() => {
    if (testState !== 'active' || isPaused || !testConfig.timed) return;
    if (timeLeft <= 0) {
      finishTest();
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [testState, isPaused, timeLeft, testConfig.timed]);

  const finishTest = useCallback(() => {
    const elapsed = Math.round((Date.now() - (startTimeRef.current || Date.now())) / 1000);
    setTimeTaken(elapsed);
    setTestState('result');
    const score = Object.entries(answers).filter(([i, ans]) => ans === activeQuestions[i]?.correct).length;
    if (score / activeQuestions.length >= 0.7) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  }, [answers, activeQuestions]);

  // Answer selection
  const handleSelect = (option) => {
    if (answers[currentIdx] !== undefined) return; // already answered
    setSelectedOption(option);
    const isCorrect = option === activeQuestions[currentIdx]?.correct;
    setAnswers(prev => ({ ...prev, [currentIdx]: option }));

    // Sound effect
    const ev = new Event(isCorrect ? 'play-success-sound' : 'play-error-sound');
    document.dispatchEvent(ev);

    if (isCorrect && !showExplanation) {
      // Auto advance after 0.8s on correct
      setTimeout(() => {
        if (currentIdx < activeQuestions.length - 1) {
          setCurrentIdx(prev => prev + 1);
          setSelectedOption(null);
          setShowExplanation(false);
        } else {
          finishTest();
        }
      }, 800);
    }
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      finishTest();
    }
  };

  const currentQ = activeQuestions[currentIdx];
  const answered = answers[currentIdx] !== undefined;
  const isCorrectAnswer = answered && answers[currentIdx] === currentQ?.correct;
  const progressPct = activeQuestions.length ? Math.round(((currentIdx + 1) / activeQuestions.length) * 100) : 0;
  const score = Object.entries(answers).filter(([i, ans]) => ans === activeQuestions[i]?.correct).length;
  const timePercent = totalTime > 0 ? Math.round((timeLeft / totalTime) * 100) : 100;

  // Format time
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  if (testState === 'result') {
    return (
      <ResultScreen
        score={score}
        total={activeQuestions.length}
        timeTaken={timeTaken}
        answers={answers}
        questions={activeQuestions}
        onRestart={() => setTestState('setup')}
        onReview={() => setTestState('review')}
      />
    );
  }

  if (testState === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setTestState('result')} className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Answer Review</h2>
            <span className="ml-auto text-sm text-gray-500">{score}/{activeQuestions.length} correct</span>
          </div>
          <div className="space-y-4">
            {activeQuestions.map((q, i) => {
              const userAns = answers[i];
              const correct = userAns === q.correct;
              return (
                <div key={i} className={`bg-white rounded-2xl border p-5 ${correct ? 'border-green-200' : 'border-red-200'}`}>
                  <div className="flex items-start gap-3 mb-3">
                    {correct ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                    <p className="font-medium text-gray-800">{i + 1}. {q.question || q.hindi || q.sentence}</p>
                  </div>
                  <div className="ml-8 space-y-1 text-sm">
                    {q.options?.map(opt => (
                      <div key={opt} className={`px-3 py-1.5 rounded-lg ${
                        opt === q.correct ? 'bg-green-100 text-green-700 font-medium' :
                        opt === userAns && !correct ? 'bg-red-100 text-red-600' :
                        'text-gray-600'
                      }`}>
                        {opt === q.correct && '✓ '}{opt === userAns && opt !== q.correct && '✗ '}{opt}
                      </div>
                    ))}
                    {q.explanation && (
                      <p className="mt-2 text-gray-500 italic bg-blue-50 p-2 rounded-lg">{q.explanation}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setTestState('setup')} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold">
              Take New Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Setup screen ──
  if (testState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full p-8"
        >
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Day 2
          </Link>

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🎯</div>
            <h1 className="text-2xl font-bold text-gray-800">Day 2 — Daily Test</h1>
            <p className="text-gray-500 mt-1">Self Introduction MCQ Test</p>
          </div>

          {/* Available questions info */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-blue-700 font-medium">{questions.length} questions available</p>
            <p className="text-xs text-blue-500 mt-1">Topics: Phrases, Grammar, Vocabulary, Error Detection</p>
          </div>

          {/* Config */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Number of Questions</label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 50].map(n => (
                  <button
                    key={n}
                    onClick={() => setTestConfig(c => ({ ...c, count: n }))}
                    className={`py-2 rounded-xl text-sm font-medium transition-colors ${testConfig.count === n ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Difficulty</label>
              <div className="grid grid-cols-4 gap-2">
                {['all', 'easy', 'medium', 'hard'].map(d => (
                  <button
                    key={d}
                    onClick={() => setTestConfig(c => ({ ...c, difficulty: d }))}
                    className={`py-2 rounded-xl text-sm font-medium capitalize transition-colors ${testConfig.difficulty === d ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-purple-50'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-gray-700">Timed Mode</span>
                <p className="text-xs text-gray-500">30 seconds per question</p>
              </div>
              <button
                onClick={() => setTestConfig(c => ({ ...c, timed: !c.timed }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${testConfig.timed ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${testConfig.timed ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <button
            onClick={startTest}
            disabled={questions.length === 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Test
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Active Test ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Sticky header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setTestState('setup')} className="text-gray-500 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
              <div>
                <div className="text-sm font-bold text-gray-800">Q {currentIdx + 1} / {activeQuestions.length}</div>
                <div className="text-xs text-gray-500">{score} correct so far</div>
              </div>
            </div>

            {/* Timer */}
            {testConfig.timed && (
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-bold text-sm ${timeLeft <= 30 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                <Timer className="w-4 h-4" />
                {fmt(timeLeft)}
              </div>
            )}

            {/* Pause */}
            <button
              onClick={() => setIsPaused(p => !p)}
              className="p-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Paused overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-2xl p-8 text-center">
              <Pause className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-1">Test Paused</h3>
              <p className="text-gray-500 mb-4 text-sm">Take a breath. Come back when ready.</p>
              <button onClick={() => setIsPaused(false)} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold">
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {currentQ && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              {/* Question card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
                {/* Question header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {currentQ.difficulty && (
                        <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full capitalize">
                          {currentQ.difficulty}
                        </span>
                      )}
                      {currentQ.category && (
                        <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
                          {currentQ.category}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-blue-100">{currentIdx + 1} of {activeQuestions.length}</span>
                  </div>

                  <p className="text-xl font-bold leading-relaxed">
                    {currentQ.question || currentQ.hindi || currentQ.sentence}
                  </p>
                  {currentQ.hindi && currentQ.question && (
                    <p className="text-blue-200 text-sm mt-2">{currentQ.hindi}</p>
                  )}
                </div>

                {/* Options */}
                <div className="p-6 space-y-3">
                  {currentQ.options?.map((option, i) => {
                    let optClass = 'border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 text-gray-800';
                    if (answered) {
                      if (option === currentQ.correct) {
                        optClass = 'border-green-400 bg-green-50 text-green-800 font-semibold';
                      } else if (option === answers[currentIdx] && option !== currentQ.correct) {
                        optClass = 'border-red-400 bg-red-50 text-red-800';
                      } else {
                        optClass = 'border-gray-100 bg-gray-50 text-gray-500 opacity-60';
                      }
                    }

                    return (
                      <motion.button
                        key={i}
                        whileHover={!answered ? { scale: 1.01 } : {}}
                        whileTap={!answered ? { scale: 0.99 } : {}}
                        onClick={() => handleSelect(option)}
                        disabled={answered}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${optClass}`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                          answered && option === currentQ.correct ? 'bg-green-500 text-white' :
                          answered && option === answers[currentIdx] && option !== currentQ.correct ? 'bg-red-500 text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          {answered && option === currentQ.correct ? '✓' :
                           answered && option === answers[currentIdx] && option !== currentQ.correct ? '✗' :
                           String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm">{option}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 pb-4 pt-3 border-t ${isCorrectAnswer ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrectAnswer
                            ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                            : <XCircle className="w-5 h-5 text-red-600" />}
                          <span className={`font-bold text-sm ${isCorrectAnswer ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrectAnswer ? 'Correct! Well done!' : `Wrong! Correct: ${currentQ.correct}`}
                          </span>
                        </div>
                        {currentQ.explanation && (
                          <p className="text-sm text-gray-600 leading-relaxed">{currentQ.explanation}</p>
                        )}
                        {currentQ.hindi && currentQ.question && (
                          <p className="text-xs text-gray-500 mt-1 italic">{currentQ.hindi}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => { if (currentIdx > 0) { setCurrentIdx(p => p - 1); setSelectedOption(answers[currentIdx - 1] || null); setShowExplanation(false); } }}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {answered && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    {currentIdx < activeQuestions.length - 1 ? 'Next' : 'Finish Test'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {!answered && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-500 text-sm hover:bg-gray-50"
                  >
                    Skip
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
