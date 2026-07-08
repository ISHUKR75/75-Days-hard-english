'use client';
// ============================================================
// PracticeQuiz — The universal practice quiz component
// Used by: /practice/day-[day], /test/day-[day], /assessment, /daily-practice
// Features:
//   • Hindi → English translation
//   • Case-insensitive + punctuation-tolerant checking
//   • Sound effects (correct / wrong / perfect)
//   • XP + coin rewards via userStore
//   • Session summary with wrong-answer review
//   • Keyboard shortcuts (Enter = submit, Arrow keys = navigate)
//   • Timed test support (isTest prop) with countdown, hidden hints, and post-grading
//   • Fully animated with Framer Motion
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, Eye, EyeOff, Lightbulb, ArrowRight,
  RotateCcw, Trophy, Target, Clock, Zap, Star, BarChart2,
  BookOpen, Play, Sparkles, Volume2, ChevronDown, Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import useUserStore from '@/store/userStore';

// ── Helpers ──────────────────────────────────────────────────
// Normalize an answer string for comparison:
// lowercase, trim, strip leading/trailing punctuation
const normalize = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/^[\s.,!?;:'"]+|[\s.,!?;:'"]+$/g, '') // strip edge punctuation
    .replace(/\s+/g, ' '); // collapse whitespace

// Compare user answer to correct (and alternatives)
const isMatch = (userAnswer, correct, alternatives = []) => {
  const u = normalize(userAnswer);
  if (u === normalize(correct)) return true;
  return (alternatives || []).some((alt) => u === normalize(alt));
};

// ── Session states ────────────────────────────────────────────
const STATES = { READY: 'ready', ACTIVE: 'active', SUMMARY: 'summary' };

// ── Sound dispatcher ──────────────────────────────────────────
const playSound = (name) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('play-sound', { detail: { sound: name } }));
};

// ── Animation variants ────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const slideIn = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } };

// ============================================================
// MAIN EXPORT
// ============================================================
export default function PracticeQuiz({
  questions = [],          // Array of question objects from practiceData
  title = 'Practice',      // Display title
  backHref = '/',          // Back button href
  questionsPerSession = 20,// How many questions per session
  shuffleMode = true,      // Randomise question order
  isTest = false,          // Timed test mode
}) {
  // ── State ────────────────────────────────────────────────
  const [sessionState, setSessionState] = useState(STATES.READY);
  const [sessionQs, setSessionQs]       = useState([]);
  const [qIndex, setQIndex]             = useState(0);
  const [userAnswer, setUserAnswer]     = useState('');
  const [submitted, setSubmitted]       = useState(false);
  const [correct, setCorrect]           = useState(null);
  const [showAnswer, setShowAnswer]     = useState(false);
  const [showHint, setShowHint]         = useState(false);
  const [results, setResults]           = useState([]);   // {q, isCorrect, userAnswer}
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [shakeTrigger, setShakeTrigger] = useState(0);

  // ── Refs ─────────────────────────────────────────────────
  const inputRef    = useRef(null);
  const timerRef    = useRef(null);
  const startTimeRef = useRef(null);

  // ── Store ────────────────────────────────────────────────
  const { addXP, addCoins, recordAnswer, settings } = useUserStore();
  const soundEnabled = settings?.soundEnabled !== false;

  // ── Derived ──────────────────────────────────────────────
  const currentQ   = sessionQs[qIndex];
  const totalQ     = sessionQs.length;
  const progress   = totalQ > 0 ? Math.round((qIndex / totalQ) * 100) : 0;
  const correctCount  = results.filter((r) => r.isCorrect).length;
  const accuracy   = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  // ── Timer ────────────────────────────────────────────────
  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      if (isTest) {
        setElapsedSeconds((prev) => {
          if (prev <= 1) {
            stopTimer();
            // Automatically submit and go to summary when timer runs out
            setSessionState(STATES.SUMMARY);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }
    }, 1000);
  };

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
    // 30 seconds per question for test, or clean incremental timer for practice
    setElapsedSeconds(isTest ? qs.length * 30 : 0);
    setSessionState(STATES.ACTIVE);
    startTimer();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [questions, questionsPerSession, shuffleMode, isTest]);

  // ── Submit answer ─────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!userAnswer.trim()) return;

    const isCorrect = isMatch(userAnswer, currentQ.english, currentQ.alternatives);

    if (isTest) {
      // Save results silently without intermediate green/red screen
      const nextResults = [...results, { q: currentQ, isCorrect, userAnswer }];
      setResults(nextResults);
      setUserAnswer('');

      if (qIndex < totalQ - 1) {
        setQIndex((i) => i + 1);
        setTimeout(() => inputRef.current?.focus(), 80);
      } else {
        // Last question answered, finish test
        stopTimer();
        const finalCorrect = nextResults.filter((r) => r.isCorrect).length;
        const pct = Math.round((finalCorrect / totalQ) * 100);

        // Timed Test Rewards:
        // 10 XP per correct + 50 XP passing bonus (>=70% accuracy) + 100 XP perfect score bonus
        const earnedXP = (finalCorrect * 10) + (pct >= 70 ? 50 : 0) + (pct === 100 ? 100 : 0);
        const earnedCoins = (finalCorrect * 1) + (pct >= 70 ? 10 : 0);

        addXP(earnedXP);
        addCoins(earnedCoins);
        recordAnswer(finalCorrect >= (totalQ * 0.7)); // Record as passed if >= 70%

        if (pct === 100) { if (soundEnabled) playSound('perfectScore'); }
        else if (pct >= 70) { if (soundEnabled) playSound('levelUp'); }
        else { if (soundEnabled) playSound('wrong'); }

        if (pct >= 70) {
          confetti({ particleCount: pct === 100 ? 200 : 80, spread: 70, origin: { y: 0.5 } });
        }

        setSessionState(STATES.SUMMARY);
      }
    } else {
      // Practice mode flow
      if (submitted) return;
      setCorrect(isCorrect);
      setSubmitted(true);
      recordAnswer(isCorrect);
      if (isCorrect) {
        addXP(10);
        addCoins(1);
        if (soundEnabled) playSound('correct');
      } else {
        if (soundEnabled) playSound('wrong');
        setShakeTrigger((n) => n + 1);
      }
      setResults((prev) => [...prev, { q: currentQ, isCorrect, userAnswer }]);
    }
  }, [submitted, userAnswer, currentQ, qIndex, totalQ, results, isTest, addXP, addCoins, recordAnswer, soundEnabled]);

  // ── Next question (Practice mode only) ──────────────────────
  const handleNext = useCallback(() => {
    if (qIndex < totalQ - 1) {
      setQIndex((i) => i + 1);
      setUserAnswer('');
      setSubmitted(false);
      setCorrect(null);
      setShowAnswer(false);
      setShowHint(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      // Practice session complete
      stopTimer();
      const finalCorrect = results.filter((r) => r.isCorrect).length;
      const pct = Math.round((finalCorrect / totalQ) * 100);
      if (pct === 100) { if (soundEnabled) playSound('perfectScore'); }
      else if (pct >= 80) { if (soundEnabled) playSound('levelUp'); }

      if (pct >= 70) {
        confetti({ particleCount: pct === 100 ? 200 : 80, spread: 70, origin: { y: 0.5 } });
      }
      setSessionState(STATES.SUMMARY);
    }
  }, [qIndex, totalQ, results, soundEnabled]);

  // ── Keyboard shortcuts ────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (sessionState !== STATES.ACTIVE) return;
      if (e.key === 'Enter') {
        if (isTest) {
          handleSubmit();
        } else {
          if (!submitted) handleSubmit();
          else handleNext();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sessionState, submitted, handleSubmit, handleNext, isTest]);

  // ─────────────────────────────────────────────────────────
  // RENDER: READY
  // ─────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────
  // RENDER: SUMMARY
  // ─────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────
  // RENDER: ACTIVE QUIZ
  // ─────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* ── Header bar ────────────────────────────────────── */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          {/* Practice-only feedback count */}
          {!isTest && (
            <>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 size={15} />
                {correctCount}
              </div>
              <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <XCircle size={15} />
                {results.filter((r) => !r.isCorrect).length}
              </div>
            </>
          )}
          {isTest && (
            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-lg">
              TEST MODE
            </span>
          )}
        </div>
        {/* Timer */}
        <div className="flex items-center gap-1.5 text-slate-500 font-mono text-xs">
          <Clock size={13} />
          {formatTime(elapsedSeconds)}
        </div>
      </div>

      {/* ── Progress bar ──────────────────────────────────── */}
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Question {qIndex + 1} of {totalQ}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* ── Question card ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          variants={slideIn}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
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
            setShowHint={setShowHint}
            inputRef={inputRef}
            onSubmit={handleSubmit}
            onNext={handleNext}
            shakeTrigger={shakeTrigger}
            isTest={isTest}
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
    <motion.div
      variants={{ hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } }}
      initial="hidden"
      animate="visible"
      className="card p-8 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl mx-auto mb-5">
        {isTest ? '📝' : '🎯'}
      </div>
      <h2 className="text-2xl font-black text-white mb-2">{title}</h2>
      <p className="text-slate-400 mb-1">
        {isTest 
          ? 'Timed Test: Complete all questions under the timer. No hints/reveals allowed!'
          : 'Hindi sentences padhkar unka English translation type karo'
        }
      </p>
      <p className="text-slate-500 text-sm mb-6">
        {totalQ} questions • {isTest ? '30 seconds per question limit' : 'Case-insensitive • Instant feedback'}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-8 text-sm">
        {isTest ? (
          <>
            <div className="p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-2xl mb-1">⏱️</div>
              <p className="text-slate-400 text-xs">Timed Test</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-2xl mb-1">🔒</div>
              <p className="text-slate-400 text-xs">No Hints</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-2xl mb-1">🏆</div>
              <p className="text-slate-400 text-xs">Earn Bonus XP</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-2xl mb-1">✍️</div>
              <p className="text-slate-400 text-xs">Type answer</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-2xl mb-1">🔊</div>
              <p className="text-slate-400 text-xs">Hear feedback</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-2xl mb-1">⚡</div>
              <p className="text-slate-400 text-xs">Earn XP</p>
            </div>
          </>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="btn-gradient w-full py-4 text-lg font-bold rounded-2xl flex items-center justify-center gap-2"
      >
        <Play size={20} fill="currentColor" />
        {isTest ? 'Start Test' : 'Start Practice'}
      </motion.button>

      <p className="text-xs text-slate-600 mt-4">
        Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">Enter</kbd> to submit answer
      </p>
    </motion.div>
  );
}

// ============================================================
// QUESTION CARD
// ============================================================
function QuestionCard({
  q, userAnswer, setUserAnswer, submitted, correct,
  showAnswer, setShowAnswer, showHint, setShowHint,
  inputRef, onSubmit, onNext, shakeTrigger, isTest
}) {
  const [shakeClass, setShakeClass] = useState('');
  useEffect(() => {
    if (shakeTrigger > 0) {
      setShakeClass('shake');
      const t = setTimeout(() => setShakeClass(''), 500);
      return () => clearTimeout(t);
    }
  }, [shakeTrigger]);

  return (
    <div className={`card p-6 space-y-5 ${shakeClass}`}>
      {/* Question type badge */}
      <div className="flex items-center justify-between">
        <span className="badge-primary text-xs capitalize">{q?.type || 'translation'}</span>
        {!isTest && q?.hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Lightbulb size={13} />
            {showHint ? 'Hide hint' : 'Hint'}
          </button>
        )}
      </div>

      {/* Hint (Practice only) */}
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
      <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20">
        <p className="text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wide">🇮🇳 Translate to English:</p>
        <p className="text-2xl font-bold text-amber-100 leading-snug">{q?.hindi}</p>
      </div>

      {/* Input */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-2 block">
          Your Answer:
        </label>
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => !(submitted && !isTest) && setUserAnswer(e.target.value)}
          disabled={submitted && !isTest}
          placeholder="Type the English sentence here…"
          className={`input w-full text-base ${
            !isTest && submitted
              ? correct
                ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100'
                : 'border-rose-500/60 bg-rose-500/10 text-rose-200'
              : ''
          }`}
        />
      </div>

      {/* Result section (Practice mode after submit) */}
      <AnimatePresence>
        {!isTest && submitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-2xl p-4 border ${
              correct
                ? 'bg-emerald-500/10 border-emerald-500/25'
                : 'bg-rose-500/10 border-rose-500/25'
            }`}
          >
            <div className="flex items-start gap-3">
              {correct
                ? <CheckCircle2 size={22} className="text-emerald-400 shrink-0 mt-0.5" />
                : <XCircle     size={22} className="text-rose-400 shrink-0 mt-0.5" />
              }
              <div className="flex-1">
                <p className={`font-bold ${correct ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {correct ? '🎉 Perfect! +10 XP' : '❌ Not quite right'}
                </p>
                {!correct && (
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => setShowAnswer((v) => !v)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300"
                    >
                      {showAnswer ? <EyeOff size={13} /> : <Eye size={13} />}
                      {showAnswer ? 'Hide answer' : 'Show correct answer'}
                    </button>
                    <AnimatePresence>
                      {showAnswer && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
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
            disabled={!userAnswer.trim()}
            className="btn-gradient flex-1 py-3 text-base font-semibold"
          >
            Submit & Next
          </motion.button>
        ) : !submitted ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSubmit}
            disabled={!userAnswer.trim()}
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
        Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">Enter</kbd> to {isTest ? 'submit' : (submitted ? 'continue' : 'submit')}
      </p>
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
  const accuracy  = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgTime   = total > 0
    ? Math.round((isTest ? (totalQ * 30 - elapsedSeconds) : elapsedSeconds) / total)
    : 0;
  const wrongItems = results.filter((r) => !r.isCorrect);
  const [showWrong, setShowWrong] = useState(false);

  const pass       = accuracy >= 70;
  const perfEmoji  = isTest 
    ? (pass ? '🏆' : '😢')
    : (accuracy === 100 ? '🏆' : accuracy >= 80 ? '⭐' : accuracy >= 60 ? '👍' : '💪');

  const perfMsg    = isTest
    ? (pass ? 'Congratulations! You passed the test!' : 'You did not pass the test. Try reviewing your mistakes and try again.')
    : (accuracy === 100 ? 'Perfect Score! Outstanding!' :
       accuracy >= 80   ? 'Great job! Keep it up!'      :
       accuracy >= 60   ? 'Good effort! Practice more!' :
                          'Keep going — you\'ll improve!');

  const getGrade = (pct) => {
    if (pct === 100) return { label: 'A+', color: 'text-amber-400 border-amber-400/30 bg-amber-500/5' };
    if (pct >= 90) return { label: 'A', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-500/5' };
    if (pct >= 80) return { label: 'B', color: 'text-sky-400 border-sky-400/30 bg-sky-500/5' };
    if (pct >= 70) return { label: 'C', color: 'text-violet-400 border-violet-400/30 bg-violet-500/5' };
    if (pct >= 60) return { label: 'D', color: 'text-orange-400 border-orange-400/30 bg-orange-500/5' };
    return { label: 'F', color: 'text-rose-400 border-rose-400/30 bg-rose-500/5' };
  };

  const grade = getGrade(accuracy);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-5"
    >
      {/* Hero */}
      <div className="card p-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
          className="text-6xl mb-3"
        >
          {perfEmoji}
        </motion.div>
        <h2 className="text-3xl font-black text-white mb-1">
          {isTest ? 'Test Complete!' : 'Session Complete!'}
        </h2>
        <p className="text-slate-400 max-w-md">{perfMsg}</p>

        {isTest && (
          <div className="flex justify-center mt-5">
            <div className={`px-6 py-3 rounded-2xl border ${grade.color} flex items-center gap-3 shadow-lg`}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Grade:</span>
              <span className="text-3xl font-black">{grade.label}</span>
            </div>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: CheckCircle2, label: 'Correct',  value: correct, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { icon: XCircle,      label: 'Wrong',    value: wrong,   color: 'text-rose-400',    bg: 'bg-rose-500/10'    },
          { icon: Target,       label: 'Accuracy', value: `${accuracy}%`, color: 'text-primary-400', bg: 'bg-primary-500/10' },
          { icon: Clock,        label: 'Avg Time', value: `${avgTime}s`, color: 'text-amber-400', bg: 'bg-amber-500/10'   },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`card p-4 flex items-center gap-3 ${bg}`}
          >
            <Icon size={22} className={color} />
            <div>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Wrong answers review */}
      {wrongItems.length > 0 && (
        <div className="card overflow-hidden">
          <button
            onClick={() => setShowWrong((v) => !v)}
            className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-white text-sm">
              <XCircle size={15} className="text-rose-400" />
              Review {wrongItems.length} wrong answer{wrongItems.length !== 1 ? 's' : ''}
            </div>
            <ChevronDown size={15} className={`text-slate-500 transition-transform ${showWrong ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showWrong && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-3 max-h-72 overflow-y-auto">
                  {wrongItems.map(({ q, userAnswer }, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/3 border border-white/6 space-y-1.5">
                      <p className="text-sm text-amber-200 font-medium">{q.hindi}</p>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-rose-400 font-semibold shrink-0 w-14">You wrote:</span>
                        <span className="text-rose-300">{userAnswer || '(blank)'}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-emerald-400 font-semibold shrink-0 w-14">Correct:</span>
                        <span className="text-emerald-300">{q.english}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* CTA buttons */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="btn-secondary py-3.5 font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} /> Try Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => window.history.back()}
          className="btn-gradient py-3.5 font-semibold flex items-center justify-center gap-2"
        >
          <Sparkles size={16} /> Continue
        </motion.button>
      </div>
    </motion.div>
  );
}
