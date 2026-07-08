'use client';
// ============================================================
// PRACTICE SESSION - Manages a complete practice session
// Features: Question queue, progress tracking, session summary
// Used for: 500-1000 question practice per topic
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Target, Flame, TrendingUp, Clock, CheckCircle2,
  XCircle, BarChart2, Zap, Award, ArrowLeft, RotateCcw,
  BookOpen, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import PracticeQuestionCard from './PracticeQuestionCard';
import { useGamificationStore } from '@/store/useGamificationStore';

// ============================================================
// SESSION STATES
// ============================================================
const SESSION_STATES = {
  READY: 'ready',       // Before starting
  ACTIVE: 'active',     // During practice
  SUMMARY: 'summary',   // After completion
};

// ============================================================
// COMPONENT: Practice Session
// ============================================================
export default function PracticeSession({
  questions,     // Array of practice questions
  topicTitle,    // Topic name
  topicId,       // Topic ID for tracking
  onComplete,    // Callback when session ends
  sessionSize = 20  // Number of questions per session (default 20)
}) {
  // ============================================================
  // STATE
  // ============================================================
  const [sessionState, setSessionState] = useState(SESSION_STATES.READY);
  const [sessionQuestions, setSessionQuestions] = useState([]);  // Current session's questions
  const [currentIndex, setCurrentIndex] = useState(0);          // Current question index
  const [sessionResults, setSessionResults] = useState([]);     // Array of question results
  const [startTime, setStartTime] = useState(null);             // Session start time
  const [sessionTime, setSessionTime] = useState(0);            // Elapsed time in seconds
  const [timerInterval, setTimerInterval] = useState(null);     // Timer ref

  // Gamification store
  const { xp, level, streak, getAccuracy, completeLesson } = useGamificationStore();

  // ============================================================
  // INITIALIZE SESSION
  // ============================================================
  const initializeSession = useCallback(() => {
    // Shuffle questions and pick sessionSize amount
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(sessionSize, shuffled.length));
    
    setSessionQuestions(selected);
    setCurrentIndex(0);
    setSessionResults([]);
    setStartTime(Date.now());
    setSessionTime(0);
  }, [questions, sessionSize]);

  // ============================================================
  // START SESSION
  // ============================================================
  const startSession = () => {
    initializeSession();
    setSessionState(SESSION_STATES.ACTIVE);

    // Start timer
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  // ============================================================
  // HANDLE QUESTION COMPLETE
  // ============================================================
  const handleQuestionComplete = (result) => {
    const newResults = [...sessionResults, result];
    setSessionResults(newResults);
  };

  // ============================================================
  // HANDLE NEXT QUESTION
  // ============================================================
  const handleNextQuestion = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Session complete!
      endSession();
    }
  };

  // ============================================================
  // END SESSION
  // ============================================================
  const endSession = () => {
    // Stop timer
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    // Calculate stats
    const correctCount = sessionResults.filter(r => r.correct).length;
    const totalCount = sessionResults.length;

    // If all answered correctly, show big celebration
    if (correctCount === totalCount) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#6366f1', '#d946ef', '#10b981', '#f59e0b']
      });
    }

    // Record lesson completion
    completeLesson();

    setSessionState(SESSION_STATES.SUMMARY);

    // Callback
    if (onComplete) {
      onComplete({
        totalQuestions: totalCount,
        correctAnswers: correctCount,
        accuracy: Math.round((correctCount / totalCount) * 100),
        timeTaken: sessionTime,
        results: sessionResults
      });
    }
  };

  // ============================================================
  // CLEANUP TIMER
  // ============================================================
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // ============================================================
  // COMPUTED VALUES
  // ============================================================
  const progress = sessionQuestions.length > 0 
    ? Math.round((currentIndex / sessionQuestions.length) * 100)
    : 0;

  const correctInSession = sessionResults.filter(r => r.correct).length;
  const wrongInSession = sessionResults.filter(r => !r.correct).length;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // ============================================================
  // RENDER: READY STATE
  // ============================================================
  if (sessionState === SESSION_STATES.READY) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl mx-auto mb-4">
            📝
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Practice Session
          </h1>
          <p className="text-slate-400 text-lg">
            {topicTitle}
          </p>
        </div>

        {/* Session Stats Preview */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-black text-white">{Math.min(sessionSize, questions.length)}</p>
              <p className="text-sm text-slate-500">Questions</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-400">~{Math.round(sessionSize * 0.5)}m</p>
              <p className="text-sm text-slate-500">Est. Time</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary-400">{xp} XP</p>
              <p className="text-sm text-slate-500">Current XP</p>
            </div>
            <div>
              <p className="text-2xl font-black text-orange-400">{streak}🔥</p>
              <p className="text-sm text-slate-500">Streak</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="card p-6 mb-8">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-primary-400" />
            How it works
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Hindi sentences will be shown — type the English translation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Capital/small letters don't matter — focus on correct words
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Earn XP for every correct answer
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Press Enter to submit, see hints if stuck
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Answer is revealed if you get it wrong — learn from it!
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={startSession}
          className="btn-gradient w-full py-5 text-xl font-bold rounded-2xl flex items-center justify-center gap-3"
        >
          <Sparkles size={24} />
          Start Practice
        </motion.button>
      </motion.div>
    );
  }

  // ============================================================
  // RENDER: ACTIVE STATE
  // ============================================================
  if (sessionState === SESSION_STATES.ACTIVE) {
    return (
      <div className="max-w-3xl mx-auto">
        {/* ===== Session Header ===== */}
        <div className="flex items-center justify-between mb-6">
          {/* Back button */}
          <motion.button
            whileHover={{ x: -3 }}
            onClick={() => {
              if (timerInterval) clearInterval(timerInterval);
              setSessionState(SESSION_STATES.READY);
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Exit
          </motion.button>

          {/* Live stats bar */}
          <div className="flex items-center gap-5">
            {/* Correct */}
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 size={16} />
              <span className="font-bold text-sm">{correctInSession}</span>
            </div>
            {/* Wrong */}
            <div className="flex items-center gap-1.5 text-rose-400">
              <XCircle size={16} />
              <span className="font-bold text-sm">{wrongInSession}</span>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock size={16} />
              <span className="font-bold text-sm">{formatTime(sessionTime)}</span>
            </div>
          </div>
        </div>

        {/* ===== Progress Bar ===== */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Question {currentIndex + 1} of {sessionQuestions.length}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* ===== Current Question ===== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            {sessionQuestions[currentIndex] && (
              <PracticeQuestionCard
                question={{
                  ...sessionQuestions[currentIndex],
                  number: `${currentIndex + 1}/${sessionQuestions.length}`
                }}
                onNext={handleNextQuestion}
                onComplete={handleQuestionComplete}
                difficulty={difficulty}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ============================================================
  // RENDER: SUMMARY STATE
  // ============================================================
  if (sessionState === SESSION_STATES.SUMMARY) {
    const totalQ = sessionResults.length;
    const correctQ = sessionResults.filter(r => r.correct).length;
    const wrongQ = totalQ - correctQ;
    const accuracyPct = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : 0;
    const avgTime = totalQ > 0 
      ? Math.round(sessionResults.reduce((sum, r) => sum + (r.timeTaken || 0), 0) / totalQ)
      : 0;

    // Determine performance emoji and message
    let performanceEmoji, performanceMessage;
    if (accuracyPct >= 90) {
      performanceEmoji = '🏆';
      performanceMessage = 'Outstanding! Perfect performance!';
    } else if (accuracyPct >= 75) {
      performanceEmoji = '⭐';
      performanceMessage = 'Great job! Keep it up!';
    } else if (accuracyPct >= 60) {
      performanceEmoji = '👍';
      performanceMessage = 'Good effort! Practice more!';
    } else {
      performanceEmoji = '💪';
      performanceMessage = 'Keep practicing, you\'ll get better!';
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        {/* ===== Performance Header ===== */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-7xl mb-4"
          >
            {performanceEmoji}
          </motion.div>
          <h1 className="text-4xl font-black text-white mb-2">Session Complete!</h1>
          <p className="text-xl text-slate-400">{performanceMessage}</p>
        </div>

        {/* ===== Stats Grid ===== */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <SummaryCard
            icon={CheckCircle2}
            label="Correct"
            value={correctQ}
            color="text-emerald-400"
            bg="bg-emerald-500/10"
          />
          <SummaryCard
            icon={XCircle}
            label="Wrong"
            value={wrongQ}
            color="text-rose-400"
            bg="bg-rose-500/10"
          />
          <SummaryCard
            icon={Target}
            label="Accuracy"
            value={`${accuracyPct}%`}
            color="text-primary-400"
            bg="bg-primary-500/10"
          />
          <SummaryCard
            icon={Clock}
            label="Avg. Time"
            value={`${avgTime}s`}
            color="text-amber-400"
            bg="bg-amber-500/10"
          />
        </div>

        {/* ===== Accuracy Arc ===== */}
        <div className="card p-6 mb-6 text-center">
          <h3 className="text-lg font-bold text-white mb-4">Session Score</h3>
          <div className="relative inline-flex items-center justify-center">
            <svg width="120" height="120" className="transform -rotate-90">
              <circle
                cx="60" cy="60" r="50"
                fill="transparent"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
              />
              <circle
                cx="60" cy="60" r="50"
                fill="transparent"
                stroke={accuracyPct >= 75 ? '#10b981' : accuracyPct >= 50 ? '#f59e0b' : '#f43f5e'}
                strokeWidth="10"
                strokeDasharray={`${accuracyPct * 3.14} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-2xl font-black text-white">{accuracyPct}%</p>
            </div>
          </div>
          <p className="text-slate-400 mt-2">{correctQ}/{totalQ} correct</p>
        </div>

        {/* ===== Wrong Answers Review ===== */}
        {wrongQ > 0 && (
          <div className="card p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <XCircle size={18} className="text-rose-400" />
              Review Wrong Answers ({wrongQ})
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {sessionResults
                .filter(r => !r.correct)
                .map((result, idx) => {
                  const q = sessionQuestions.find(q => q.id === result.questionId);
                  if (!q) return null;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                      <p className="text-sm hindi-text mb-1">{q.hindi}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">You wrote:</span>
                        <span className="text-rose-400">{result.userAnswer || '(empty)'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className="text-slate-500">Correct:</span>
                        <span className="text-emerald-400">{q.correctAnswer}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ===== Action Buttons ===== */}
        <div className="grid grid-cols-2 gap-4">
          {/* Practice Again */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSessionState(SESSION_STATES.READY);
              setCurrentIndex(0);
              setSessionResults([]);
            }}
            className="btn-secondary py-4 text-base font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Practice Again
          </motion.button>

          {/* Next Topic */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onComplete && onComplete({
              totalQuestions: totalQ,
              correctAnswers: correctQ,
              accuracy: accuracyPct,
              timeTaken: sessionTime,
            })}
            className="btn-gradient py-4 text-base font-semibold flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Continue
          </motion.button>
        </div>
      </motion.div>
    );
  }
}

// ============================================================
// SUB-COMPONENT: Summary Card
// ============================================================
function SummaryCard({ icon: Icon, label, value, color, bg }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card p-5 flex items-center gap-4 ${bg}`}
    >
      <Icon size={24} className={color} />
      <div>
        <p className={`text-2xl font-black ${color}`}>{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </motion.div>
  );
}
