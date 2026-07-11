// ============================================================
// PracticeSection.js
// Full Hindi → English practice engine with start screen,
// live session, and summary. Gamification + Web Audio API.
// ============================================================

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  Search, Filter, Volume2, Star, CheckCircle2, XCircle,
  ChevronRight, ChevronLeft, RotateCcw, Trophy, Zap,
  Clock, Target, Eye, EyeOff, Lightbulb
} from 'lucide-react';

// ============================================================
// Web Audio API sound effects
// ============================================================
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.value = 150;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (_) {
    // AudioContext may be blocked; silently skip
  }
}

// ============================================================
// Normalize answer for comparison (lowercase, trim, punctuation)
// ============================================================
function normalizeAnswer(str = '') {
  return str.toLowerCase().trim().replace(/[^a-z0-9\s']/g, '').replace(/\s+/g, ' ');
}

// ============================================================
// Check if user answer matches correct answer or alternatives
// ============================================================
function checkAnswer(userInput, correct = '', alternatives = []) {
  const user = normalizeAnswer(userInput);
  if (!user) return false;
  if (normalizeAnswer(correct) === user) return true;
  return alternatives.some((alt) => normalizeAnswer(alt) === user);
}

// ============================================================
// Format seconds as MM:SS
// ============================================================
function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ============================================================
// Difficulty badge colors
// ============================================================
const DIFF_COLORS = {
  easy: 'bg-emerald-500/20 text-emerald-300',
  medium: 'bg-orange-500/20 text-orange-300',
  hard: 'bg-red-500/20 text-red-300',
};

// ============================================================
// SESSION SIZE options (%)
// ============================================================
const SESSION_SIZES = [20, 40, 60, 80, 100];

// ============================================================
// AnimatedRing for accuracy display in summary
// ============================================================
function AccuracyRing({ pct }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="130" height="130" className="-rotate-90">
        <circle cx="65" cy="65" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="65" cy="65" r={radius}
          stroke="url(#accGrad)" strokeWidth="10" fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="accGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black text-white">{pct}%</span>
        <span className="text-gray-400 text-xs">Accuracy</span>
      </div>
    </div>
  );
}

// ============================================================
// START SCREEN
// ============================================================
function StartScreen({ questions, onStart, lastScore }) {
  const [sessionPct, setSessionPct] = useState(40);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Derive categories from questions
  const categories = useMemo(() => {
    const cats = new Set(questions.map((q) => q.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [questions]);

  // Toggle a category in the multiselect
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Compute how many questions match current filters
  const filteredCount = useMemo(() => {
    let qs = questions;
    if (selectedCategories.length > 0) {
      qs = qs.filter((q) => selectedCategories.includes(q.category));
    }
    if (selectedDifficulty !== 'All') {
      qs = qs.filter((q) => q.difficulty === selectedDifficulty);
    }
    return Math.ceil((sessionPct / 100) * qs.length);
  }, [questions, selectedCategories, selectedDifficulty, sessionPct]);

  const handleStart = () => {
    onStart({ sessionPct, selectedCategories, selectedDifficulty });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Hero */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl font-black text-white">Hindi → English Practice 🔥</h1>
          <p className="text-gray-400 text-lg mt-2">
            {questions.length.toLocaleString()} questions ready for you
          </p>
          {lastScore !== null && (
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-2xl">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-violet-300 text-sm font-semibold">
                Last score: {lastScore.correct}/{lastScore.total} ({lastScore.pct}%)
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Session size */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
      >
        <p className="text-white font-bold mb-3">📏 Session Size</p>
        <div className="flex gap-2 flex-wrap">
          {SESSION_SIZES.map((pct) => (
            <button
              key={pct}
              onClick={() => setSessionPct(pct)}
              className={`flex-1 min-w-[60px] py-3 rounded-2xl font-bold text-sm transition-all ${
                sessionPct === pct
                  ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
              }`}
            >
              {pct}%
            </button>
          ))}
        </div>
        <p className="text-center text-violet-300 font-semibold mt-3">
          = <span className="text-2xl font-black">{filteredCount}</span> questions
        </p>
      </motion.div>

      {/* Category filter */}
      {categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
        >
          <p className="text-white font-bold mb-3">
            🗂️ Categories{' '}
            <span className="text-gray-500 font-normal text-sm">(all selected = no filter)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategories.includes(cat)
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="mt-2 text-gray-500 text-xs hover:text-white transition-colors"
            >
              Clear selection
            </button>
          )}
        </motion.div>
      )}

      {/* Difficulty filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl"
      >
        <p className="text-white font-bold mb-3">⚡ Difficulty</p>
        <div className="flex gap-2">
          {['All', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`flex-1 py-2 rounded-xl font-semibold text-sm capitalize transition-all ${
                selectedDifficulty === d
                  ? d === 'All'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white'
                    : d === 'easy'
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                    : d === 'medium'
                    ? 'bg-orange-500/30 text-orange-300 border border-orange-500/40'
                    : 'bg-red-500/30 text-red-300 border border-red-500/40'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleStart}
        disabled={filteredCount === 0}
        className={`w-full py-5 rounded-2xl text-xl font-black transition-all shadow-2xl ${
          filteredCount > 0
            ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-violet-500/40 hover:shadow-violet-500/60'
            : 'bg-white/10 text-gray-600 cursor-not-allowed'
        }`}
      >
        {filteredCount > 0 ? `Start Practice 🚀` : 'No questions match filters'}
      </motion.button>
    </motion.div>
  );
}

// ============================================================
// SUMMARY SCREEN
// ============================================================
function SummaryScreen({ results, sessionQuestions, timeElapsed, xpEarned, onRetryWrong, onMarkComplete, onBack }) {
  const correct = results.filter((r) => r.status === 'correct').length;
  const wrong = results.filter((r) => r.status === 'wrong');
  const total = results.length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto space-y-6 pb-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="text-6xl mb-3"
        >
          {accuracy >= 80 ? '🏆' : accuracy >= 50 ? '💪' : '📖'}
        </motion.div>
        <h2 className="text-3xl font-black text-white">
          {accuracy >= 80 ? 'Amazing!' : accuracy >= 50 ? 'Good effort!' : 'Keep practicing!'}
        </h2>
        <p className="text-gray-400 mt-1">Session complete</p>
      </div>

      {/* Score + Accuracy ring */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6">
        <AccuracyRing pct={accuracy} />
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-emerald-400">{correct}</p>
            <p className="text-gray-400 text-xs mt-1">Correct ✅</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-red-400">{wrong.length}</p>
            <p className="text-gray-400 text-xs mt-1">Wrong ❌</p>
          </div>
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-violet-400">{formatTime(timeElapsed)}</p>
            <p className="text-gray-400 text-xs mt-1">Time ⏱️</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-yellow-400">+{xpEarned}</p>
            <p className="text-gray-400 text-xs mt-1">XP Earned ⚡</p>
          </div>
        </div>
      </div>

      {/* Wrong answers list */}
      {wrong.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <XCircle size={16} className="text-red-400" />
            Wrong Answers ({wrong.length})
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 custom-scroll">
            {wrong.map((r, i) => (
              <motion.div
                key={r.id || i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white/5 rounded-xl p-3"
              >
                <p className="text-orange-300 text-sm font-semibold">{r.hindi}</p>
                <div className="flex items-center gap-2 mt-1">
                  {r.userAnswer && (
                    <span className="text-red-400 text-xs line-through">{r.userAnswer}</span>
                  )}
                  <ChevronRight size={12} className="text-gray-600" />
                  <span className="text-emerald-400 text-xs font-bold">{r.correct}</span>
                </div>
                {r.explanation && (
                  <p className="text-gray-500 text-xs mt-1">{r.explanation}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {wrong.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRetryWrong}
            className="py-4 rounded-2xl bg-orange-500/20 border border-orange-500/30 text-orange-300 font-bold hover:bg-orange-500/30 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> Retry Wrong
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onMarkComplete}
          className="py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={16} /> Mark Complete
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="py-4 rounded-2xl bg-white/10 border border-white/10 text-gray-300 font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
        >
          <ChevronLeft size={16} /> Back to Day
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN PracticeSection Component
// ============================================================
export default function PracticeSection({ data, dayNum }) {
  // ── Stores ─────────────────────────────────────────────────
  const addXP = useGamificationStore((s) => s.addXP);
  const recordQuestionResult = useProgressStore((s) => s.recordQuestionResult);

  // ── All practice questions (safe fallback) ─────────────────
  const allQuestions = useMemo(() => data?.practice || [], [data]);

  // ── App state machine: 'start' | 'session' | 'summary' ─────
  const [screen, setScreen] = useState('start');

  // ── Session questions (subset after filtering) ─────────────
  const [sessionQuestions, setSessionQuestions] = useState([]);

  // ── Current question index ─────────────────────────────────
  const [qIndex, setQIndex] = useState(0);

  // ── User's text input for current question ─────────────────
  const [userInput, setUserInput] = useState('');

  // ── Feedback state: null | 'correct' | 'wrong' | 'revealed' ─
  const [feedback, setFeedback] = useState(null);

  // ── Whether hint is shown ──────────────────────────────────
  const [showHint, setShowHint] = useState(false);

  // ── Whether answer is revealed ─────────────────────────────
  const [showAnswer, setShowAnswer] = useState(false);

  // ── Session timer ──────────────────────────────────────────
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef(null);

  // ── Session results array ──────────────────────────────────
  const [results, setResults] = useState([]);

  // ── XP earned in this session ─────────────────────────────
  const [sessionXP, setSessionXP] = useState(0);

  // ── Last score for start screen display ───────────────────
  const [lastScore, setLastScore] = useState(null);

  // ── Input ref for auto-focus ──────────────────────────────
  const inputRef = useRef(null);

  // ── Current question object ────────────────────────────────
  const currentQ = sessionQuestions[qIndex] || null;

  // ── Derived session stats ──────────────────────────────────
  const stats = useMemo(() => {
    const correct = results.filter((r) => r.status === 'correct').length;
    const wrong = results.filter((r) => r.status === 'wrong').length;
    const skipped = results.filter((r) => r.status === 'skipped').length;
    const answered = correct + wrong;
    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { correct, wrong, skipped, accuracy };
  }, [results]);

  // ── Timer: start/stop based on screen ─────────────────────
  useEffect(() => {
    if (screen === 'session') {
      timerRef.current = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [screen]);

  // ── Auto-focus input when question changes ─────────────────
  useEffect(() => {
    if (screen === 'session' && feedback === null) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [qIndex, screen, feedback]);

  // ── Build session questions from user choices ──────────────
  const handleStart = useCallback(({ sessionPct, selectedCategories, selectedDifficulty }) => {
    let qs = [...allQuestions];

    // Category filter
    if (selectedCategories.length > 0) {
      qs = qs.filter((q) => selectedCategories.includes(q.category));
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      qs = qs.filter((q) => q.difficulty === selectedDifficulty);
    }

    // Session slice
    const count = Math.max(1, Math.ceil((sessionPct / 100) * qs.length));
    const sliced = qs.slice(0, count);

    setSessionQuestions(sliced);
    setResults([]);
    setQIndex(0);
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
    setShowAnswer(false);
    setTimeElapsed(0);
    setSessionXP(0);
    setScreen('session');
  }, [allQuestions]);

  // ── Submit an answer ───────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!currentQ || feedback !== null) return;
    if (!userInput.trim() && !showAnswer) return;

    const isCorrect = checkAnswer(userInput, currentQ.english, currentQ.alternatives);

    // Record in progress store
    recordQuestionResult(currentQ.id, isCorrect);

    // XP for correct answers
    let xpGained = 0;
    if (isCorrect) {
      xpGained = currentQ.difficulty === 'hard' ? 20 : currentQ.difficulty === 'medium' ? 15 : 10;
      addXP(xpGained, { reason: 'practice_correct' });
      setSessionXP((x) => x + xpGained);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    const result = {
      id: currentQ.id,
      hindi: currentQ.hindi,
      correct: currentQ.english,
      userAnswer: userInput.trim(),
      status: isCorrect ? 'correct' : 'wrong',
      explanation: currentQ.explanation,
      xp: xpGained,
    };

    setResults((prev) => [...prev, result]);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  }, [currentQ, userInput, feedback, showAnswer, addXP, recordQuestionResult]);

  // ── Skip current question ──────────────────────────────────
  const handleSkip = useCallback(() => {
    if (!currentQ || feedback !== null) return;
    const result = {
      id: currentQ.id,
      hindi: currentQ.hindi,
      correct: currentQ.english,
      userAnswer: '',
      status: 'skipped',
      explanation: currentQ.explanation,
      xp: 0,
    };
    setResults((prev) => [...prev, result]);
    setFeedback('skipped');
  }, [currentQ, feedback]);

  // ── Reveal answer ──────────────────────────────────────────
  const handleReveal = useCallback(() => {
    if (feedback !== null) return;
    setShowAnswer(true);
    // Counts as wrong/skip if they had to reveal
    const result = {
      id: currentQ.id,
      hindi: currentQ.hindi,
      correct: currentQ.english,
      userAnswer: userInput.trim() || '(revealed)',
      status: 'wrong',
      explanation: currentQ.explanation,
      xp: 0,
    };
    setResults((prev) => [...prev, result]);
    setFeedback('revealed');
    playSound('wrong');
  }, [currentQ, feedback, userInput]);

  // ── Go to next question ────────────────────────────────────
  const handleNext = useCallback(() => {
    if (qIndex + 1 >= sessionQuestions.length) {
      // End of session
      setLastScore({
        correct: stats.correct + (feedback === 'correct' ? 0 : 0),
        total: sessionQuestions.length,
        pct: stats.accuracy,
      });
      setScreen('summary');
    } else {
      setQIndex((i) => i + 1);
      setUserInput('');
      setFeedback(null);
      setShowHint(false);
      setShowAnswer(false);
    }
  }, [qIndex, sessionQuestions.length, stats, feedback]);

  // ── Enter key to submit or advance ────────────────────────
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (feedback !== null) {
          handleNext();
        } else {
          handleSubmit();
        }
      }
    },
    [feedback, handleNext, handleSubmit]
  );

  // ── Retry wrong answers ────────────────────────────────────
  const handleRetryWrong = useCallback(() => {
    const wrongQs = results
      .filter((r) => r.status === 'wrong')
      .map((r) => sessionQuestions.find((q) => q.id === r.id))
      .filter(Boolean);

    setSessionQuestions(wrongQs);
    setResults([]);
    setQIndex(0);
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
    setShowAnswer(false);
    setTimeElapsed(0);
    setSessionXP(0);
    setScreen('session');
  }, [results, sessionQuestions]);

  // ── Mark session complete + go back ───────────────────────
  const handleMarkComplete = useCallback(() => {
    addXP(50, { reason: 'practice_session_complete' });
    setScreen('start');
  }, [addXP]);

  // ── Progress percentage ────────────────────────────────────
  const progressPct = sessionQuestions.length > 0
    ? Math.round(((qIndex + (feedback !== null ? 1 : 0)) / sessionQuestions.length) * 100)
    : 0;

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="pb-8">
      <AnimatePresence mode="wait">
        {/* ── START SCREEN ──────────────────────────────────── */}
        {screen === 'start' && (
          <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StartScreen
              questions={allQuestions}
              onStart={handleStart}
              lastScore={lastScore}
            />
          </motion.div>
        )}

        {/* ── SESSION SCREEN ────────────────────────────────── */}
        {screen === 'session' && currentQ && (
          <motion.div
            key="session"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            {/* ── Top progress bar ─────────────────────────── */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Question {qIndex + 1} of {sessionQuestions.length}</span>
                <span>{progressPct}% done</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* ── Stats bar ─────────────────────────────────── */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: '✅', label: 'Correct', value: stats.correct, color: 'text-emerald-400' },
                { icon: '❌', label: 'Wrong', value: stats.wrong, color: 'text-red-400' },
                { icon: '⏭️', label: 'Skipped', value: stats.skipped, color: 'text-orange-400' },
                { icon: '🎯', label: 'Accuracy', value: `${stats.accuracy}%`, color: 'text-violet-400' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
                  <p className="text-lg">{s.icon}</p>
                  <p className={`font-black text-lg ${s.color}`}>{s.value}</p>
                  <p className="text-gray-500 text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            {/* ── Timer + XP ───────────────────────────────── */}
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={14} />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <Zap size={14} />
                <span className="font-bold">+{sessionXP} XP</span>
              </div>
            </div>

            {/* ── Question card ─────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-6 backdrop-blur-xl border transition-all ${
                  feedback === 'correct'
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : feedback === 'wrong' || feedback === 'revealed'
                    ? 'bg-red-500/10 border-red-500/40 shadow-lg shadow-red-500/10'
                    : 'bg-white/5 border-white/10 shadow-lg shadow-violet-500/5'
                }`}
              >
                {/* Difficulty chip */}
                {currentQ.difficulty && (
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${DIFF_COLORS[currentQ.difficulty] || 'bg-white/10 text-gray-300'}`}>
                      {currentQ.difficulty}
                    </span>
                    {currentQ.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                        {currentQ.category}
                      </span>
                    )}
                  </div>
                )}

                {/* Hindi question */}
                <div className="text-center my-4">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                    Translate to English
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    {currentQ.hindi}
                  </p>
                </div>

                {/* Grammar rule hint */}
                {currentQ.grammarRule && (
                  <p className="text-center text-violet-400 text-xs mt-2 opacity-70">
                    Grammar: {currentQ.grammarRule}
                  </p>
                )}

                {/* Hint (collapsed by default) */}
                <AnimatePresence>
                  {showHint && currentQ.hint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3"
                    >
                      <p className="text-yellow-300 text-sm flex items-center gap-2">
                        <Lightbulb size={14} />
                        {currentQ.hint}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Feedback overlay */}
                <AnimatePresence>
                  {feedback === 'correct' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 text-center space-y-1"
                    >
                      <p className="text-3xl">✅</p>
                      <p className="text-emerald-400 font-black text-lg">Correct! +{results[results.length - 1]?.xp || 10} XP</p>
                      {currentQ.explanation && (
                        <p className="text-gray-400 text-sm mt-1">{currentQ.explanation}</p>
                      )}
                    </motion.div>
                  )}
                  {(feedback === 'wrong' || feedback === 'revealed') && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 text-center space-y-2"
                    >
                      <p className="text-3xl">❌</p>
                      <p className="text-red-400 font-bold">
                        {feedback === 'revealed' ? 'Answer revealed' : 'Better luck next time!'}
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mt-2">
                        <p className="text-gray-400 text-xs mb-1">Correct answer:</p>
                        <p className="text-emerald-400 font-black text-lg">{currentQ.english}</p>
                        {currentQ.alternatives?.length > 0 && (
                          <p className="text-gray-500 text-xs mt-1">
                            Also accepted: {currentQ.alternatives.join(', ')}
                          </p>
                        )}
                      </div>
                      {currentQ.explanation && (
                        <p className="text-gray-400 text-sm">{currentQ.explanation}</p>
                      )}
                    </motion.div>
                  )}
                  {feedback === 'skipped' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-center"
                    >
                      <p className="text-orange-400 font-bold">⏭️ Skipped</p>
                      <p className="text-emerald-400 font-bold mt-1">{currentQ.english}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* ── Answer input ──────────────────────────────── */}
            {feedback === null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type English translation..."
                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-5 py-4 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                <p className="text-gray-600 text-xs mt-1 pl-1">Press Enter to submit</p>
              </motion.div>
            )}

            {/* ── Action buttons ────────────────────────────── */}
            {feedback === null ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={!userInput.trim()}
                  className={`col-span-2 py-3.5 rounded-2xl font-black text-sm transition-all ${
                    userInput.trim()
                      ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-white/5 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Submit ⚡
                </motion.button>
                {/* Hint */}
                <button
                  onClick={() => setShowHint((h) => !h)}
                  className="py-3.5 rounded-2xl bg-yellow-500/20 text-yellow-300 font-semibold text-sm hover:bg-yellow-500/30 transition-all flex items-center justify-center gap-1.5 border border-yellow-500/20"
                >
                  <Lightbulb size={14} /> Hint
                </button>
                {/* Reveal */}
                <button
                  onClick={handleReveal}
                  className="py-3.5 rounded-2xl bg-white/10 text-gray-400 font-semibold text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 border border-white/10"
                >
                  <Eye size={14} /> Reveal
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {/* Skip stays */}
                {feedback === null && (
                  <button
                    onClick={handleSkip}
                    className="py-3.5 rounded-2xl bg-white/10 text-gray-400 font-semibold text-sm hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-1.5"
                  >
                    ⏭️ Skip
                  </button>
                )}
                {/* Next */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="col-span-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-black text-lg shadow-lg shadow-violet-500/30 flex items-center justify-center gap-2"
                >
                  {qIndex + 1 >= sessionQuestions.length ? '🏁 See Results' : 'Next →'}
                </motion.button>
              </div>
            )}

            {/* Skip button when feedback is null */}
            {feedback === null && (
              <button
                onClick={handleSkip}
                className="w-full py-2.5 rounded-2xl bg-white/5 text-gray-500 hover:text-gray-300 text-sm transition-all border border-white/5 hover:border-white/10"
              >
                ⏭️ Skip this question
              </button>
            )}
          </motion.div>
        )}

        {/* ── SUMMARY SCREEN ────────────────────────────────── */}
        {screen === 'summary' && (
          <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SummaryScreen
              results={results}
              sessionQuestions={sessionQuestions}
              timeElapsed={timeElapsed}
              xpEarned={sessionXP}
              onRetryWrong={handleRetryWrong}
              onMarkComplete={handleMarkComplete}
              onBack={() => setScreen('start')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
