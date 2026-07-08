'use client';
// ============================================================
// PracticeQuiz — Beautiful animated quiz component
// Supports: translation, mcq, fill-blank question types
// Features: card-flip reveal, XP/hint system, results screen,
//           streak counter, sound effects, confetti
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, Eye, EyeOff, Lightbulb, ArrowRight,
  RotateCcw, Trophy, Target, Clock, Zap, Star, BarChart2,
  BookOpen, Play, Sparkles, Volume2, ChevronDown, Award,
  Share2, ChevronRight, Flame, AlertCircle, SkipForward,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import useUserStore from '@/store/userStore';
import useSound from '@/hooks/useSound';
import { XP_RULES } from '@/constants/xp-rules';

// ── Helpers ──────────────────────────────────────────────────
const normalize = (str) =>
  str.toLowerCase().trim()
    .replace(/^[\s.,!?;:'"]+|[\s.,!?;:'"]+$/g, '')
    .replace(/\s+/g, ' ');

const isMatch = (userAnswer, correct, alternatives = []) => {
  const u = normalize(userAnswer);
  if (u === normalize(correct)) return true;
  return (alternatives || []).some((alt) => u === normalize(alt));
};

const STATES = { READY: 'ready', ACTIVE: 'active', SUMMARY: 'summary' };

// ── Animation variants ────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
const slideIn = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

// ============================================================
// MAIN EXPORT
// ============================================================
export default function PracticeQuiz({
  questions = [],
  title = 'Practice',
  backHref = '/',
  questionsPerSession = 20,
  shuffleMode = true,
  isTest = false,
}) {
  const [sessionState, setSessionState] = useState(STATES.READY);
  const [sessionQs,    setSessionQs]    = useState([]);
  const [qIndex,       setQIndex]       = useState(0);
  const [userAnswer,   setUserAnswer]   = useState('');
  const [submitted,    setSubmitted]    = useState(false);
  const [correct,      setCorrect]      = useState(null);
  const [showAnswer,   setShowAnswer]   = useState(false);
  const [showHint,     setShowHint]     = useState(false);
  const [results,      setResults]      = useState([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [flashGreen,   setFlashGreen]   = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [selectedMCQ,  setSelectedMCQ]  = useState(null);
  const [xpEarned,     setXpEarned]     = useState(0);

  const inputRef     = useRef(null);
  const timerRef     = useRef(null);
  const startTimeRef = useRef(null);

  const { addXP, addCoins, recordAnswer, settings, spendCoins, coins } = useUserStore();
  const { playCorrect, playWrong, playPerfect, playLevelUp, playComplete, playClick } = useSound();
  const soundEnabled = settings?.soundEnabled !== false;

  const currentQ     = sessionQs[qIndex];
  const totalQ       = sessionQs.length;
  const progress     = totalQ > 0 ? Math.round(((qIndex + (submitted ? 1 : 0)) / totalQ) * 100) : 0;
  const correctCount = results.filter((r) => r.isCorrect).length;

  // ── Timer ─────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      if (isTest) {
        setElapsedSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setSessionState(STATES.SUMMARY);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
  }, [isTest]);

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };
  useEffect(() => () => stopTimer(), []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ── Start session ─────────────────────────────────────────
  const startSession = useCallback(() => {
    let qs = [...questions];
    if (shuffleMode) qs = qs.sort(() => Math.random() - 0.5);
    qs = qs.slice(0, Math.min(questionsPerSession, qs.length));
    setSessionQs(qs);
    setQIndex(0);
    setResults([]);
    setUserAnswer('');
    setSubmitted(false);
    setCorrect(null);
    setShowAnswer(false);
    setShowHint(false);
    setCurrentStreak(0);
    setSelectedMCQ(null);
    setFlashGreen(false);
    setXpEarned(0);
    setElapsedSeconds(isTest ? qs.length * 30 : 0);
    setSessionState(STATES.ACTIVE);
    startTimer();
    setTimeout(() => inputRef.current?.focus(), 150);
  }, [questions, questionsPerSession, shuffleMode, isTest, startTimer]);

  // ── Use hint ──────────────────────────────────────────────
  const handleHint = useCallback(() => {
    if (!currentQ?.hint) return;
    if (!showHint && coins >= 5) spendCoins(5);
    setShowHint((v) => !v);
    if (soundEnabled) playClick();
  }, [currentQ, showHint, coins, spendCoins, playClick, soundEnabled]);

  // ── Skip question ─────────────────────────────────────────
  const handleSkip = useCallback(() => {
    if (submitted) return;
    if (soundEnabled) playClick();
    const skipped = { q: currentQ, isCorrect: false, userAnswer: '[skipped]', skipped: true };
    const nextResults = [...results, skipped];
    setResults(nextResults);
    if (qIndex < totalQ - 1) {
      setQIndex((i) => i + 1);
      setUserAnswer(''); setSubmitted(false); setCorrect(null);
      setShowAnswer(false); setShowHint(false); setSelectedMCQ(null);
      setCurrentStreak(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      finishSession(nextResults);
    }
  }, [submitted, currentQ, qIndex, totalQ, results, playClick, soundEnabled]);

  // ── Finish session ────────────────────────────────────────
  const finishSession = useCallback((finalResults) => {
    stopTimer();
    const fc  = finalResults.filter((r) => r.isCorrect).length;
    const pct = Math.round((fc / finalResults.length) * 100);
    const xp  = (fc * XP_RULES.CORRECT_ANSWER) +
                (pct >= 70 ? XP_RULES.QUIZ_COMPLETE : 0) +
                (pct === 100 ? XP_RULES.PERFECT_SCORE : 0);
    const c   = fc + (pct >= 70 ? 10 : 0);
    addXP(xp);
    addCoins(c);
    if (pct === 100) { if (soundEnabled) playPerfect(); }
    else if (pct >= 70) { if (soundEnabled) playLevelUp(); }
    else { if (soundEnabled) playComplete(); }
    if (pct >= 70) {
      confetti({ particleCount: pct === 100 ? 200 : 80, spread: 70, origin: { y: 0.5 } });
    }
    setSessionState(STATES.SUMMARY);
  }, [addXP, addCoins, soundEnabled, playPerfect, playLevelUp, playComplete]);

  // ── Submit answer ─────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    const answer = currentQ?.type === 'mcq' ? selectedMCQ : userAnswer;
    if (!answer?.trim()) return;
    if (!isTest && submitted) return;

    const isCorrectAnswer = isMatch(answer, currentQ.english, currentQ.alternatives);

    if (isTest) {
      const nextResults = [...results, { q: currentQ, isCorrect: isCorrectAnswer, userAnswer: answer }];
      setResults(nextResults);
      setUserAnswer(''); setSelectedMCQ(null);
      if (qIndex < totalQ - 1) {
        setQIndex((i) => i + 1);
        setTimeout(() => inputRef.current?.focus(), 80);
      } else {
        finishSession(nextResults);
      }
    } else {
      setCorrect(isCorrectAnswer);
      setSubmitted(true);
      recordAnswer(isCorrectAnswer);
      if (isCorrectAnswer) {
        const xpGain = XP_RULES.CORRECT_ANSWER;
        addXP(xpGain);
        addCoins(1);
        setXpEarned((prev) => prev + xpGain);
        if (soundEnabled) playCorrect();
        setFlashGreen(true);
        setCurrentStreak((s) => s + 1);
        setTimeout(() => setFlashGreen(false), 700);
      } else {
        if (soundEnabled) playWrong();
        setShakeTrigger((n) => n + 1);
        setCurrentStreak(0);
      }
      setResults((prev) => [...prev, { q: currentQ, isCorrect: isCorrectAnswer, userAnswer: answer }]);
    }
  }, [submitted, userAnswer, selectedMCQ, currentQ, qIndex, totalQ, results, isTest,
      addXP, addCoins, recordAnswer, soundEnabled, playCorrect, playWrong, finishSession]);

  // ── Next question ─────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (qIndex < totalQ - 1) {
      setQIndex((i) => i + 1);
      setUserAnswer(''); setSubmitted(false); setCorrect(null);
      setShowAnswer(false); setShowHint(false); setSelectedMCQ(null);
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      finishSession(results);
    }
  }, [qIndex, totalQ, results, finishSession]);

  // ── Keyboard shortcuts ────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (sessionState !== STATES.ACTIVE) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        if (isTest || !submitted) handleSubmit();
        else handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sessionState, submitted, handleSubmit, handleNext, isTest]);

  // ── Render ────────────────────────────────────────────────
  if (sessionState === STATES.READY) {
    return (
      <ReadyScreen
        title={title}
        totalQ={Math.min(questionsPerSession, questions.length)}
        onStart={startSession}
        isTest={isTest}
      />
    );
  }
  if (sessionState === STATES.SUMMARY) {
    return (
      <SummaryScreen
        results={results}
        elapsedSeconds={elapsedSeconds}
        onRetry={startSession}
        backHref={backHref}
        isTest={isTest}
        totalQ={totalQ}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Top bar: progress + streak + XP ─────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm">
          {!isTest && (
            <>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 size={15} /> {correctCount}
              </div>
              <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <XCircle size={15} /> {results.filter((r) => !r.isCorrect).length}
              </div>
              <AnimatePresence>
                {currentStreak >= 2 && (
                  <motion.div
                    key="streak"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full"
                  >
                    <Flame size={12} /> {currentStreak} streak
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          {isTest && (
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-lg">
              TEST MODE
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isTest && xpEarned > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full"
            >
              <Zap size={11} /> +{xpEarned} XP
            </motion.div>
          )}
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
            <Clock size={13} /> {formatTime(elapsedSeconds)}
          </div>
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────────── */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
          <span>Question {qIndex + 1} of {totalQ}</span>
          <span className="font-semibold text-primary-400">{progress}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ── Question card ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          variants={slideIn}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
        >
          <QuestionCard
            q={currentQ}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            submitted={submitted}
            correct={correct}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            showHint={showHint}
            onHint={handleHint}
            onSkip={handleSkip}
            inputRef={inputRef}
            onSubmit={handleSubmit}
            onNext={handleNext}
            shakeTrigger={shakeTrigger}
            flashGreen={flashGreen}
            isTest={isTest}
            selectedMCQ={selectedMCQ}
            setSelectedMCQ={setSelectedMCQ}
            coins={coins}
            currentStreak={currentStreak}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// READY SCREEN
// ============================================================
function ReadyScreen({ title, totalQ, onStart, isTest }) {
  return (
    <motion.div variants={scaleIn} initial="hidden" animate="visible" className="card p-8 text-center">
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg shadow-primary-500/30"
      >
        {isTest ? '📝' : '🎯'}
      </motion.div>

      <h2 className="text-2xl font-black text-white mb-2">{title}</h2>
      <p className="text-slate-400 mb-1 text-sm">
        {isTest
          ? 'Timed Test: Complete all questions as fast as possible. No hints allowed!'
          : 'Hindi sentences padhkar unka English translation type karo'}
      </p>
      <p className="text-slate-500 text-sm mb-8">
        {totalQ} questions • {isTest ? '30s per question' : 'Instant feedback + hints'} • +{XP_RULES.CORRECT_ANSWER} XP per correct
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {(isTest
          ? [['⏱️', 'Timed Test'], ['🔒', 'No Hints'], ['🏆', 'Earn Bonus XP']]
          : [['💡', 'Hint System'], ['⚡', 'Earn XP'], ['🔥', 'Build Streak']]
        ).map(([emoji, label]) => (
          <div key={label} className="p-3 rounded-xl bg-white/5 border border-white/8 flex flex-col items-center">
            <div className="text-2xl mb-1">{emoji}</div>
            <p className="text-slate-400 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* XP breakdown preview */}
      <div className="mb-6 p-4 rounded-2xl bg-white/4 border border-white/8 text-left space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">XP Rewards</p>
        {[
          [`✅ Correct answer`, `+${XP_RULES.CORRECT_ANSWER} XP`],
          [`🏁 Complete session (70%+)`, `+${XP_RULES.QUIZ_COMPLETE} XP`],
          [`🏆 Perfect score (100%)`, `+${XP_RULES.PERFECT_SCORE} XP`],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-xs">
            <span className="text-slate-400">{label}</span>
            <span className="text-yellow-400 font-bold">{val}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="btn-gradient w-full py-4 text-lg font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg"
      >
        <Play size={20} fill="currentColor" />
        {isTest ? 'Start Test' : 'Start Practice'}
      </motion.button>

      <p className="text-xs text-slate-600 mt-4">
        Press{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">Enter</kbd>
        {' '}to submit answers
      </p>
    </motion.div>
  );
}

// ============================================================
// QUESTION CARD
// ============================================================
function QuestionCard({
  q, userAnswer, setUserAnswer, submitted, correct,
  showAnswer, setShowAnswer, showHint, onHint, onSkip,
  inputRef, onSubmit, onNext, shakeTrigger, flashGreen,
  isTest, selectedMCQ, setSelectedMCQ, coins, currentStreak,
}) {
  const [shakeClass, setShakeClass] = useState('');

  useEffect(() => {
    if (shakeTrigger > 0) {
      setShakeClass('shake');
      const t = setTimeout(() => setShakeClass(''), 600);
      return () => clearTimeout(t);
    }
  }, [shakeTrigger]);

  // Generate stable MCQ options (correct + 3 distractors)
  const mcqOptions = useRef(null);
  useEffect(() => {
    if (q?.type !== 'mcq') { mcqOptions.current = null; return; }
    const opts = [q.english, ...(q.alternatives || []).slice(0, 3)];
    while (opts.length < 4) opts.push(`Option ${opts.length + 1}`);
    mcqOptions.current = opts.slice(0, 4).sort(() => Math.random() - 0.5);
  }, [q]);

  const options = mcqOptions.current || [];

  const isMCQ       = q?.type === 'mcq';
  const isFillBlank = q?.type === 'fill-blank';
  const canSubmit   = isMCQ ? !!selectedMCQ : userAnswer.trim().length > 0;

  // Fill blank render
  const renderFillBlank = () => {
    if (!q?.hindi) return null;
    const parts = q.hindi.split('___');
    if (parts.length < 2) return <p className="text-2xl font-bold text-amber-100 leading-snug">{q.hindi}</p>;
    return (
      <p className="text-2xl font-bold text-amber-100 leading-snug">
        {parts[0]}
        <span className="inline-block min-w-[120px] border-b-2 border-amber-400/60 mx-1 text-primary-300">
          {userAnswer || '___'}
        </span>
        {parts[1]}
      </p>
    );
  };

  return (
    <div className={`space-y-4 ${shakeClass}`}>
      <motion.div
        animate={
          flashGreen
            ? { boxShadow: ['0 0 0 0 rgba(16,185,129,0)', '0 0 0 16px rgba(16,185,129,0.25)', '0 0 0 0 rgba(16,185,129,0)'] }
            : {}
        }
        transition={{ duration: 0.7 }}
        className="card p-6 space-y-5"
      >
        {/* Top: type badge + hint/skip controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="badge-primary text-xs capitalize">{q?.type || 'translation'}</span>
            {currentStreak >= 3 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1"
              >
                <Flame size={10} /> {currentStreak}x
              </motion.span>
            )}
          </div>
          {!isTest && (
            <div className="flex items-center gap-2">
              {q?.hint && (
                <button
                  onClick={onHint}
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg"
                >
                  <Lightbulb size={12} />
                  {showHint ? 'Hide hint' : `Hint${coins >= 5 && !showHint ? ' (5🪙)' : ''}`}
                </button>
              )}
              {!submitted && (
                <button
                  onClick={onSkip}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-400 transition-colors"
                >
                  <SkipForward size={12} /> Skip
                </button>
              )}
            </div>
          )}
        </div>

        {/* Hint panel */}
        <AnimatePresence>
          {!isTest && showHint && q?.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300"
            >
              💡 {q.hint}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hindi sentence */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20"
        >
          <p className="text-xs text-amber-400 font-semibold mb-3 uppercase tracking-wide">
            {isFillBlank ? '✏️ Fill in the blank:' : '🇮🇳 Translate to English:'}
          </p>
          {isFillBlank ? renderFillBlank() : (
            <p className="text-2xl font-bold text-amber-100 leading-snug">{q?.hindi}</p>
          )}
          {q?.context && (
            <p className="mt-2 text-xs text-amber-600/70 italic">{q.context}</p>
          )}
        </motion.div>

        {/* MCQ options */}
        {isMCQ && (
          <div className="grid grid-cols-1 gap-2.5">
            {options.map((opt, i) => {
              let cls = 'p-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer text-left ';
              if (!submitted) {
                cls += selectedMCQ === opt
                  ? 'border-primary-400 bg-primary-500/20 text-white shadow-md shadow-primary-500/10'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:bg-white/8';
              } else {
                if (opt === q.english)
                  cls += 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200';
                else if (opt === selectedMCQ && opt !== q.english)
                  cls += 'border-rose-500/60 bg-rose-500/15 text-rose-300';
                else
                  cls += 'border-white/8 bg-white/3 text-slate-500';
              }
              return (
                <motion.button
                  key={i}
                  whileHover={!submitted ? { scale: 1.01 } : {}}
                  whileTap={!submitted ? { scale: 0.99 } : {}}
                  onClick={() => !submitted && setSelectedMCQ(opt)}
                  className={cls}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs shrink-0 font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {submitted && opt === q.english && (
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    )}
                    {submitted && opt === selectedMCQ && opt !== q.english && (
                      <XCircle size={16} className="text-rose-400 shrink-0" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Text input (translation / fill-blank) */}
        {!isMCQ && (
          <div>
            <label className="text-xs font-semibold text-slate-400 mb-2 block">Your Answer:</label>
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => !(submitted && !isTest) && setUserAnswer(e.target.value)}
              disabled={submitted && !isTest}
              placeholder={isFillBlank ? 'Fill in the blank…' : 'Type the English translation here…'}
              className={`input w-full text-base transition-all ${
                !isTest && submitted
                  ? correct
                    ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100'
                    : 'border-rose-500/60 bg-rose-500/10 text-rose-200'
                  : ''
              }`}
            />
          </div>
        )}

        {/* Feedback panel (practice mode) */}
        <AnimatePresence>
          {!isTest && submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0 }}
              className={`rounded-2xl p-4 border ${
                correct
                  ? 'bg-emerald-500/10 border-emerald-500/25'
                  : 'bg-rose-500/10 border-rose-500/25'
              }`}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                >
                  {correct
                    ? <CheckCircle2 size={22} className="text-emerald-400 shrink-0 mt-0.5" />
                    : <XCircle      size={22} className="text-rose-400 shrink-0 mt-0.5" />
                  }
                </motion.div>
                <div className="flex-1">
                  {correct ? (
                    <div>
                      <p className="font-bold text-emerald-300">
                        🎉 Correct! +{XP_RULES.CORRECT_ANSWER} XP +1🪙
                      </p>
                      {q?.hint && (
                        <p className="text-xs text-slate-400 mt-2 italic">💡 {q.hint}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-rose-300">❌ Not quite right</p>
                      <button
                        onClick={() => setShowAnswer((v) => !v)}
                        className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        {showAnswer ? <EyeOff size={13} /> : <Eye size={13} />}
                        {showAnswer ? 'Hide answer' : 'Show correct answer'}
                      </button>
                      <AnimatePresence>
                        {showAnswer && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10"
                          >
                            <p className="text-xs text-slate-400 mb-1">Correct answer:</p>
                            <p className="text-base font-semibold text-emerald-300">{q?.english}</p>
                            {q?.alternatives?.length > 0 && (
                              <div className="mt-2">
                                <p className="text-[10px] text-slate-500 mb-1">Also accepted:</p>
                                {q.alternatives.map((a, i) => (
                                  <p key={i} className="text-xs text-slate-400">• {a}</p>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {q?.hint && (
                        <p className="text-xs text-slate-400 mt-2 italic">💡 {q.hint}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex gap-3">
          {isTest ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSubmit}
              disabled={!canSubmit}
              className="btn-gradient flex-1 py-3 text-base font-semibold disabled:opacity-40"
            >
              Submit &amp; Next
            </motion.button>
          ) : !submitted ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onSubmit}
              disabled={!canSubmit}
              className="btn-primary flex-1 py-3 text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check Answer
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="btn-gradient flex-1 py-3 text-base font-semibold flex items-center justify-center gap-2"
            >
              {correct ? 'Continue' : 'Next Question'}
              <ArrowRight size={17} />
            </motion.button>
          )}
        </div>

        <p className="text-center text-xs text-slate-600">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">Enter</kbd>
          {' '}to {isTest ? 'submit' : submitted ? 'continue' : 'check answer'}
        </p>
      </motion.div>
    </div>
  );
}

// ============================================================
// SUMMARY SCREEN
// ============================================================
function SummaryScreen({ results, elapsedSeconds, onRetry, backHref, isTest, totalQ }) {
  const total     = results.length;
  const correct   = results.filter((r) => r.isCorrect).length;
  const wrong     = total - correct;
  const skipped   = results.filter((r) => r.skipped).length;
  const accuracy  = total > 0 ? Math.round((correct / total) * 100) : 0;
  const timeTaken = isTest ? (totalQ * 30 - elapsedSeconds) : elapsedSeconds;
  const avgTime   = total > 0 ? Math.round(timeTaken / total) : 0;

  const earnedXP =
    correct * XP_RULES.CORRECT_ANSWER +
    (accuracy >= 70 ? XP_RULES.QUIZ_COMPLETE : 0) +
    (accuracy === 100 ? XP_RULES.PERFECT_SCORE : 0);

  const wrongItems   = results.filter((r) => !r.isCorrect && !r.skipped);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const getGrade = (pct) => {
    if (pct === 100) return { label: 'A+', color: 'text-amber-400 border-amber-400/30 bg-amber-500/5' };
    if (pct >= 90)  return { label: 'A',  color: 'text-emerald-400 border-emerald-400/30 bg-emerald-500/5' };
    if (pct >= 80)  return { label: 'B',  color: 'text-sky-400 border-sky-400/30 bg-sky-500/5' };
    if (pct >= 70)  return { label: 'C',  color: 'text-violet-400 border-violet-400/30 bg-violet-500/5' };
    if (pct >= 60)  return { label: 'D',  color: 'text-orange-400 border-orange-400/30 bg-orange-500/5' };
    return { label: 'F', color: 'text-rose-400 border-rose-400/30 bg-rose-500/5' };
  };

  const grade = getGrade(accuracy);

  const perfEmoji = accuracy === 100 ? '🏆' : accuracy >= 80 ? '⭐' : accuracy >= 60 ? '👍' : '💪';
  const perfMsg   = accuracy === 100 ? 'Perfect Score! Outstanding!'      :
                    accuracy >= 80   ? 'Great job! Keep it up!'           :
                    accuracy >= 60   ? 'Good effort! Practice more!'      :
                                       "Keep going — you'll improve!";

  const handleShare = () => {
    const text = `I scored ${accuracy}% (${correct}/${total}) on my English practice! 🇬🇧 #75DaysHardEnglish`;
    if (navigator.share) {
      navigator.share({ text, title: '75 Days Hard English' }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text).then(() => alert('Result copied to clipboard!'));
    }
  };

  // Accuracy circle SVG
  const radius   = 40;
  const circ     = 2 * Math.PI * radius;
  const dashoffset = circ - (accuracy / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Hero card */}
      <div className="card p-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
          className="text-6xl mb-3"
        >
          {perfEmoji}
        </motion.div>

        <h2 className="text-3xl font-black text-white mb-1">
          {isTest ? 'Test Complete!' : 'Session Complete!'}
        </h2>
        <p className="text-slate-400 max-w-sm text-sm mb-5">{perfMsg}</p>

        {/* Accuracy circle */}
        <div className="relative w-28 h-28 mb-4">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} strokeWidth="10" className="fill-none stroke-white/8" />
            <motion.circle
              cx="50" cy="50" r={radius}
              strokeWidth="10"
              className="fill-none stroke-primary-500"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: dashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white">{accuracy}%</span>
            <span className="text-xs text-slate-400">accuracy</span>
          </div>
        </div>

        <div className={`px-6 py-2 rounded-2xl border ${grade.color} flex items-center gap-3 mb-4`}>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Grade:</span>
          <span className="text-2xl font-black">{grade.label}</span>
        </div>

        {/* XP earned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-yellow-400 font-bold text-xl"
        >
          <Zap size={22} />
          +{earnedXP} XP earned
        </motion.div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: CheckCircle2, label: 'Correct',  value: correct,         color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { icon: XCircle,      label: 'Wrong',    value: wrong,           color: 'text-rose-400',    bg: 'bg-rose-500/10'    },
          { icon: Target,       label: 'Accuracy', value: `${accuracy}%`,  color: 'text-primary-400', bg: 'bg-primary-500/10' },
          { icon: Clock,        label: 'Avg/Q',    value: `${avgTime}s`,   color: 'text-amber-400',   bg: 'bg-amber-500/10'   },
        ].map(({ icon: Icon, label, value, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className={`card p-4 text-center border-none ${bg}`}
          >
            <Icon size={20} className={`${color} mx-auto mb-2`} />
            <p className={`text-xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Time + skipped row */}
      <div className="card p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Clock size={16} />
          Total time:{' '}
          <span className="text-white font-semibold">
            {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
          </span>
        </div>
        {skipped > 0 && (
          <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-lg">
            {skipped} skipped
          </span>
        )}
      </div>

      {/* Per-question review: wrong items */}
      {wrongItems.length > 0 && (
        <div className="card p-5">
          <button
            onClick={() => setShowBreakdown((v) => !v)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-bold text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-400" />
              Review Mistakes ({wrongItems.length})
            </h3>
            <motion.div animate={{ rotate: showBreakdown ? 180 : 0 }}>
              <ChevronDown size={16} className="text-slate-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {showBreakdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3 overflow-hidden"
              >
                {wrongItems.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15"
                  >
                    <p className="text-sm text-amber-300 mb-1 font-medium">{r.q?.hindi}</p>
                    <p className="text-xs text-slate-400">
                      Your answer:{' '}
                      <span className="text-rose-300 font-medium">{r.userAnswer}</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      Correct:{' '}
                      <span className="text-emerald-300 font-medium">{r.q?.english}</span>
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* All correct items summary (collapsed) */}
      {results.filter((r) => r.isCorrect).length > 0 && (
        <CorrectItemsSummary items={results.filter((r) => r.isCorrect)} />
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="btn-primary flex-1 py-3 font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} /> Try Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          className="flex-1 py-3 font-semibold flex items-center justify-center gap-2 rounded-xl border border-white/15 text-slate-300 hover:bg-white/5 transition-colors"
        >
          <Share2 size={16} /> Share Results
        </motion.button>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1">
          <Link
            href={backHref}
            className="w-full py-3 font-semibold flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/8 transition-colors"
          >
            <BookOpen size={16} /> Next Topic
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// CORRECT ITEMS SUMMARY (collapsible)
// ============================================================
function CorrectItemsSummary({ items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card p-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-bold text-white flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          Correct Answers ({items.length})
        </h3>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={16} className="text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2 overflow-hidden"
          >
            {items.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-start gap-3"
              >
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-amber-300/80 mb-0.5">{r.q?.hindi}</p>
                  <p className="text-sm text-emerald-300 font-medium">{r.q?.english}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
