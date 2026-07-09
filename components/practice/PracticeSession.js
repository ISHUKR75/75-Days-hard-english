'use client';
// ============================================================
// PracticeSession Component — Interactive Hindi→English practice
// Props: questions (array), onComplete, dayNumber, topicTitle
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, SkipForward, Eye, CheckCircle, XCircle,
  Zap, Flame, Trophy, Clock, Target, RotateCcw, Home,
  Star, Volume2, ArrowRight,
} from 'lucide-react';
import useUserStore from '@/store/userStore';

// ── Constants ─────────────────────────────────────────────────
const XP_PER_CORRECT   = 10;
const XP_PER_STREAK    = 5;   // bonus at every 5-streak
const STREAK_BONUS_AT  = 5;

// ── Framer variants ───────────────────────────────────────────
const cardSlide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.97, transition: { duration: 0.25 } }),
};

const xpPop = {
  hidden:  { opacity: 0, y: 0, scale: 0.6 },
  visible: { opacity: 1, y: -40, scale: 1,   transition: { duration: 0.4, ease: 'easeOut' } },
  gone:    { opacity: 0, y: -70, scale: 0.8,  transition: { duration: 0.35, delay: 0.6 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

// ── Sound helpers (Web Audio API) ─────────────────────────────
function playTone(freq, type = 'sine', duration = 0.18, vol = 0.25) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (_) {}
}

function playCorrect() { playTone(880, 'sine', 0.2, 0.3); setTimeout(() => playTone(1100, 'sine', 0.15, 0.2), 120); }
function playWrong()   { playTone(220, 'sawtooth', 0.25, 0.25); }
function playSkip()    { playTone(440, 'triangle', 0.12, 0.15); }

// ── Utility: format seconds ───────────────────────────────────
function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ============================================================
// MAIN COMPONENT
// ============================================================
/**
 * PracticeSession
 * @param {Array}    questions   - [{id, hindi, english, hint?, difficulty?}]
 * @param {Function} onComplete  - Called with session results object
 * @param {number}   dayNumber   - Current day
 * @param {string}   topicTitle  - Topic name shown in header
 */
export default function PracticeSession({
  questions   = [],
  onComplete,
  dayNumber   = 1,
  topicTitle  = 'Practice',
}) {
  // ── Zustand ───────────────────────────────────────────────
  const { addXP, addCoins } = useUserStore();

  // ── Session state ─────────────────────────────────────────
  const [qIndex,      setQIndex]      = useState(0);
  const [userAnswer,  setUserAnswer]  = useState('');
  const [revealed,    setRevealed]    = useState(false);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [results,     setResults]     = useState([]);  // {id, correct, skipped, userAnswer, time}
  const [xpThisSession, setXpThisSession] = useState(0);
  const [direction,   setDirection]   = useState(1);
  const [showXpPop,   setShowXpPop]   = useState(false);
  const [xpPopAmt,    setXpPopAmt]    = useState(0);
  const [finished,    setFinished]    = useState(false);
  const [qStartTime,  setQStartTime]  = useState(Date.now());
  const [elapsed,     setElapsed]     = useState(0);

  const inputRef = useRef(null);

  // ── Global timer ─────────────────────────────────────────
  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [finished]);

  // ── Focus input on new question ───────────────────────────
  useEffect(() => {
    if (!finished && !revealed) inputRef.current?.focus();
  }, [qIndex, revealed, finished]);

  const currentQ = questions[qIndex];
  const totalQ   = questions.length;
  const progress = totalQ > 0 ? ((qIndex) / totalQ) * 100 : 0;

  // ── Trigger XP popup ─────────────────────────────────────
  const triggerXpPop = useCallback((amt) => {
    setXpPopAmt(amt);
    setShowXpPop(true);
    setTimeout(() => setShowXpPop(false), 1100);
  }, []);

  // ── Advance to next question or finish ───────────────────
  const advance = useCallback((result) => {
    const newResults = [...results, result];

    if (qIndex + 1 >= totalQ) {
      // Session finished
      const correct  = newResults.filter(r => r.correct).length;
      const skipped  = newResults.filter(r => r.skipped).length;
      const accuracy = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
      setResults(newResults);
      setFinished(true);
      if (onComplete) {
        onComplete({ correct, skipped, total: totalQ, accuracy, xpEarned: xpThisSession, timeSeconds: elapsed });
      }
      return;
    }

    setDirection(1);
    setQIndex(i => i + 1);
    setUserAnswer('');
    setRevealed(false);
    setQStartTime(Date.now());
    setResults(newResults);
  }, [qIndex, totalQ, results, xpThisSession, elapsed, onComplete]);

  // ── Handle correct answer ─────────────────────────────────
  const handleCorrect = useCallback(() => {
    const newStreak = sessionStreak + 1;
    setSessionStreak(newStreak);
    playCorrect();

    let xpGain = XP_PER_CORRECT;
    if (newStreak > 0 && newStreak % STREAK_BONUS_AT === 0) xpGain += XP_PER_STREAK;

    addXP(xpGain);
    setXpThisSession(x => x + xpGain);
    triggerXpPop(xpGain);

    advance({ id: currentQ?.id, correct: true, skipped: false, userAnswer, timeTaken: (Date.now() - qStartTime) / 1000 });
  }, [sessionStreak, currentQ, userAnswer, qStartTime, addXP, triggerXpPop, advance]);

  // ── Handle wrong answer ───────────────────────────────────
  const handleWrong = useCallback(() => {
    setSessionStreak(0);
    playWrong();
    advance({ id: currentQ?.id, correct: false, skipped: false, userAnswer, timeTaken: (Date.now() - qStartTime) / 1000 });
  }, [currentQ, userAnswer, qStartTime, advance]);

  // ── Skip question ─────────────────────────────────────────
  const handleSkip = useCallback(() => {
    setSessionStreak(0);
    playSkip();
    setDirection(1);
    advance({ id: currentQ?.id, correct: false, skipped: true, userAnswer: '', timeTaken: (Date.now() - qStartTime) / 1000 });
  }, [currentQ, qStartTime, advance]);

  // ── Reveal answer ─────────────────────────────────────────
  const handleReveal = useCallback(() => setRevealed(true), []);

  // ── End session early ─────────────────────────────────────
  const handleEndEarly = useCallback(() => {
    const correct  = results.filter(r => r.correct).length;
    const skipped  = results.filter(r => r.skipped).length;
    const accuracy = results.length > 0 ? Math.round((correct / results.length) * 100) : 0;
    setFinished(true);
    if (onComplete) {
      onComplete({ correct, skipped, total: results.length, accuracy, xpEarned: xpThisSession, timeSeconds: elapsed });
    }
  }, [results, xpThisSession, elapsed, onComplete]);

  // ── Keyboard shortcuts ────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (finished) return;
      if (e.key === 'Enter' && revealed) { handleCorrect(); }
      if (e.key === 'Escape') { handleSkip(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [finished, revealed, handleCorrect, handleSkip]);

  // ── Empty state ───────────────────────────────────────────
  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-white/10 bg-white/2">
        <Target size={40} className="text-slate-600 mb-3" />
        <p className="text-slate-400 font-medium">No questions available for this session.</p>
      </div>
    );
  }

  // ── Results Screen ────────────────────────────────────────
  if (finished) {
    const correct  = results.filter(r => r.correct).length;
    const skipped  = results.filter(r => r.skipped).length;
    const wrong    = results.filter(r => !r.correct && !r.skipped).length;
    const accuracy = results.length > 0 ? Math.round((correct / results.length) * 100) : 0;
    const grade    = accuracy >= 90 ? 'Excellent! 🎉' : accuracy >= 70 ? 'Good Job! 👍' : accuracy >= 50 ? 'Keep Practicing! 💪' : 'Need More Practice 📚';

    return (
      <motion.div
        initial="hidden" animate="visible" variants={fadeUp}
        className="max-w-lg mx-auto"
      >
        <div className="card p-8 text-center">
          {/* Trophy */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="text-6xl mb-4 select-none"
          >
            {accuracy >= 70 ? '🏆' : accuracy >= 50 ? '🌟' : '📖'}
          </motion.div>

          <h2 className="text-2xl font-black text-white mb-1">{grade}</h2>
          <p className="text-slate-400 text-sm mb-6">Day {dayNumber} — {topicTitle}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Correct',   value: correct,  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: '✅' },
              { label: 'Wrong',     value: wrong,    color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',    icon: '❌' },
              { label: 'Skipped',   value: skipped,  color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  border: 'border-yellow-500/20',  icon: '⏭️' },
              { label: 'Accuracy',  value: `${accuracy}%`, color: 'text-primary-400', bg: 'bg-primary-500/10', border: 'border-primary-500/20', icon: '🎯' },
            ].map((s) => (
              <div key={s.label} className={`p-4 rounded-xl border ${s.bg} ${s.border}`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* XP earned */}
          <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-6">
            <Zap size={16} className="text-violet-400" />
            <span className="text-violet-300 font-bold">+{xpThisSession} XP earned this session</span>
          </div>

          {/* Time */}
          <p className="text-xs text-slate-500 mb-6">
            <Clock size={12} className="inline mr-1" />
            Time: {formatTime(elapsed)}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setQIndex(0); setUserAnswer(''); setRevealed(false); setResults([]); setXpThisSession(0); setSessionStreak(0); setElapsed(0); setFinished(false); setQStartTime(Date.now()); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-all"
            >
              <RotateCcw size={14} />
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => window.location.href = '/dashboard'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gradient text-white text-sm font-semibold"
            >
              <Home size={14} />
              Dashboard
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Active Session ────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto">
      {/* ── Top bar: progress + stats ──────────────────────── */}
      <div className="mb-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2.5 text-sm">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">Day {dayNumber}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 truncate max-w-[160px]">{topicTitle}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {sessionStreak >= 2 && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="flex items-center gap-1 text-orange-400 font-bold"
              >
                <Flame size={13} />
                {sessionStreak}x
              </motion.div>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatTime(elapsed)}
            </span>
            <span className="text-primary-400 font-bold">
              {qIndex + 1}/{totalQ}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* XP this session */}
        <div className="flex justify-between mt-1.5 text-[10px] text-slate-600">
          <span>Question {qIndex + 1} of {totalQ}</span>
          <span className="text-violet-400/70 flex items-center gap-0.5"><Zap size={10} />{xpThisSession} XP</span>
        </div>
      </div>

      {/* ── Question Card ──────────────────────────────────── */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={qIndex}
            custom={direction}
            variants={cardSlide}
            initial="enter"
            animate="center"
            exit="exit"
            className="card p-6 md:p-8"
          >
            {/* Difficulty badge */}
            {currentQ?.difficulty && (
              <div className="flex items-center justify-between mb-5">
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  currentQ.difficulty === 'easy'   ? 'diff-easy'   :
                  currentQ.difficulty === 'medium' ? 'diff-medium' :
                  'diff-hard'
                }`}>
                  {currentQ.difficulty}
                </span>
                <span className="text-xs text-slate-500">+{XP_PER_CORRECT} XP</span>
              </div>
            )}

            {/* Hindi prompt */}
            <div className="text-center mb-6">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-medium">Translate to English</p>
              <p className="text-3xl md:text-4xl font-bold text-amber-300 leading-tight hindi-text">
                {currentQ?.hindi}
              </p>
              {currentQ?.hint && !revealed && (
                <p className="text-xs text-slate-500 mt-2 italic">💡 {currentQ.hint}</p>
              )}
            </div>

            {/* Answer input */}
            {!revealed && (
              <div className="mb-5">
                <textarea
                  ref={inputRef}
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  placeholder="Type your English translation here…"
                  rows={2}
                  className="input resize-none w-full text-base"
                />
              </div>
            )}

            {/* Revealed answer */}
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25"
              >
                <p className="text-xs text-indigo-300/70 uppercase tracking-wider mb-1.5 font-medium">Correct Answer</p>
                <p className="text-lg font-bold text-indigo-300">{currentQ?.english}</p>
                {userAnswer.trim() && (
                  <div className="mt-3 pt-3 border-t border-white/8">
                    <p className="text-xs text-slate-500 mb-1">Your answer</p>
                    <p className="text-sm text-slate-300 italic">"{userAnswer}"</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {!revealed ? (
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleReveal}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl btn-gradient text-white font-semibold text-sm"
                >
                  <Eye size={16} />
                  Reveal Answer
                </motion.button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handleWrong}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 font-semibold text-sm transition-all"
                  >
                    <XCircle size={16} />
                    Wrong
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handleCorrect}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 font-semibold text-sm transition-all"
                  >
                    <CheckCircle size={16} />
                    Correct ↵
                  </motion.button>
                </div>
              )}

              {/* Secondary actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleSkip}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/8 text-slate-500 hover:text-slate-300 text-xs font-medium transition-all"
                >
                  <SkipForward size={13} />
                  Skip (Esc)
                </button>
                <button
                  onClick={handleEndEarly}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/8 text-slate-500 hover:text-rose-400 text-xs font-medium transition-all"
                >
                  End Session
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── XP Pop animation ─────────────────────────────── */}
        <AnimatePresence>
          {showXpPop && (
            <motion.div
              variants={xpPop}
              initial="hidden" animate="visible" exit="gone"
              className="absolute top-4 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 font-bold text-sm pointer-events-none z-20"
            >
              <Zap size={14} />
              +{xpPopAmt} XP
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Streak fire indicator ──────────────────────────── */}
      <AnimatePresence>
        {sessionStreak >= STREAK_BONUS_AT && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-2 text-sm text-orange-300"
          >
            <Flame size={16} className="text-orange-400 animate-bounce" />
            <span className="font-semibold">{sessionStreak}-answer streak!</span>
            <span className="text-orange-400/70 text-xs ml-auto">+{XP_PER_STREAK} bonus XP per streak</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
