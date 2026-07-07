'use client';
// PracticeQuiz — Universal Hindi→English Quiz Engine
// Features:
//   • Hindi questions displayed prominently
//   • Text input for English answer (case-insensitive)
//   • "Reveal Answer" button
//   • Sound effects (correct.mp3 / wrong.mp3 from /sounds/)
//   • XP and coins awarded per correct answer
//   • Real-time score, accuracy, and streak tracking
//   • Beautiful animated feedback (green ✅ / red ❌)
//   • Progress bar and session stats
//   • Skip button to go to next question
//   • End-of-session summary with graphs

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy,
  Target, Zap, Eye, SkipForward, Volume2, VolumeX,
  BarChart2, Home, BookOpen, Flame,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ============================================================
// Sound helper — plays a file from /sounds/
// ============================================================
function playSound(file, volume = 0.7) {
  try {
    const audio = new Audio(`/sounds/${file}`);
    audio.volume = volume;
    audio.play().catch(() => {}); // Ignore autoplay errors
  } catch (e) {
    // Silence errors on unsupported browsers
  }
}

// ============================================================
// Normalize answer — lowercase, trim, remove trailing punctuation
// ============================================================
function normalizeAnswer(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.!?]+$/, '') // remove trailing punctuation
    .replace(/\s+/g, ' ');   // collapse whitespace
}

// ============================================================
// Check if user's answer matches correct answer (or alternatives)
// ============================================================
function isCorrectAnswer(userAnswer, question) {
  const norm = normalizeAnswer(userAnswer);
  if (!norm) return false;
  const correct = normalizeAnswer(question.english);
  if (norm === correct) return true;
  // Check alternatives
  if (question.alternatives) {
    return question.alternatives.some(alt => normalizeAnswer(alt) === norm);
  }
  return false;
}

// ============================================================
// Session Summary Component
// ============================================================
function SessionSummary({ session, questions, onRestart, backHref }) {
  const { correct, wrong, skipped, xpEarned, coinsEarned, answers } = session;
  const total    = correct + wrong + skipped;
  const accuracy = total > 0 ? Math.round((correct / (correct + wrong || 1)) * 100) : 0;

  // Build bar chart data (first 10 questions for visualization)
  const chartData = answers.slice(0, 15).map((a, i) => ({
    q: `Q${i + 1}`,
    result: a.correct ? 1 : 0,
    label: a.correct ? 'Correct' : 'Wrong',
  }));

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-3">
          {accuracy >= 90 ? '🏆' : accuracy >= 70 ? '🌟' : accuracy >= 50 ? '💪' : '📚'}
        </div>
        <h2 className="text-3xl font-black text-white mb-1">Session Complete!</h2>
        <p className="text-slate-400">
          {accuracy >= 90 ? 'Excellent work! Outstanding performance!' :
           accuracy >= 70 ? 'Great job! Keep it up!' :
           accuracy >= 50 ? 'Good effort! Practice more.' :
           'Keep going — consistency is key!'}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Correct',  value: correct,    emoji: '✅', color: 'text-accent-400' },
          { label: 'Wrong',    value: wrong,       emoji: '❌', color: 'text-danger-400' },
          { label: 'Skipped',  value: skipped,     emoji: '⏭️', color: 'text-slate-400' },
          { label: 'Accuracy', value: `${accuracy}%`, emoji: '🎯', color: 'text-primary-400' },
        ].map(({ label, value, emoji, color }) => (
          <div key={label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{emoji}</div>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* XP & Coins earned */}
      <div className="card p-5 border-primary-500/20 bg-primary-500/5 flex items-center justify-around gap-4">
        <div className="text-center">
          <p className="text-3xl font-black text-violet-300">+{xpEarned}</p>
          <p className="text-sm text-slate-500">XP Earned</p>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div className="text-center">
          <p className="text-3xl font-black text-yellow-300">+{coinsEarned}</p>
          <p className="text-sm text-slate-500">Coins Earned</p>
        </div>
        <div className="w-px h-10 bg-white/10" />
        <div className="text-center">
          <p className="text-3xl font-black text-orange-300">{session.streak}</p>
          <p className="text-sm text-slate-500">Best Streak</p>
        </div>
      </div>

      {/* Performance bar chart */}
      {chartData.length > 0 && (
        <div className="card p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <BarChart2 size={16} className="text-primary-400" /> Performance Chart
          </h3>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="q" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [v === 1 ? 'Correct ✅' : 'Wrong ❌', '']}
                contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Bar dataKey="result" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.result === 1 ? '#10b981' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="btn-primary flex-1 flex items-center justify-center gap-2">
          <RotateCcw size={16} /> Practice Again
        </button>
        <Link href={backHref} className="btn-secondary flex-1 flex items-center justify-center gap-2">
          <Home size={16} /> Back to Lesson
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// Hint Display Component
// ============================================================
function HintBadge({ hint }) {
  const [show, setShow] = useState(false);
  if (!hint) return null;
  return (
    <button
      onClick={() => setShow(v => !v)}
      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
      💡 {show ? hint : 'Show hint'}
    </button>
  );
}

// ============================================================
// Main PracticeQuiz Component
// ============================================================
export default function PracticeQuiz({
  questions = [],          // Array of { id, hindi, english, alternatives, hint, type }
  title = 'Practice Quiz', // Page/quiz title
  backHref = '/dashboard', // Where "back" button goes
  onComplete,              // Callback when session ends
  questionsPerSession = 20,// How many questions per session
  shuffleMode = true,      // Randomize question order
}) {
  const { addXP, addCoins, recordAnswer } = useUserStore();
  const { recordQuestionResult } = useProgressStore();

  // Sound preference
  const [soundOn, setSoundOn] = useState(true);

  // Quiz state
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [currentIdx,        setCurrentIdx]       = useState(0);
  const [userAnswer,        setUserAnswer]        = useState('');
  const [feedback,          setFeedback]          = useState(null); // null | 'correct' | 'wrong' | 'revealed'
  const [revealed,          setRevealed]          = useState(false);
  const [sessionDone,       setSessionDone]       = useState(false);

  // Session stats
  const [correct,           setCorrect]           = useState(0);
  const [wrong,             setWrong]             = useState(0);
  const [skipped,           setSkipped]           = useState(0);
  const [xpEarned,          setXpEarned]          = useState(0);
  const [coinsEarned,       setCoinsEarned]       = useState(0);
  const [currentStreak,     setCurrentStreak]     = useState(0);
  const [bestStreak,        setBestStreak]        = useState(0);
  const [answers,           setAnswers]           = useState([]); // history

  const inputRef = useRef(null);

  // ── Initialize / Shuffle questions ──────────────────────
  const initSession = useCallback(() => {
    let pool = [...questions];
    if (shuffleMode) pool = pool.sort(() => Math.random() - 0.5);
    setSessionQuestions(pool.slice(0, questionsPerSession));
    setCurrentIdx(0);
    setUserAnswer('');
    setFeedback(null);
    setRevealed(false);
    setSessionDone(false);
    setCorrect(0);
    setWrong(0);
    setSkipped(0);
    setXpEarned(0);
    setCoinsEarned(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setAnswers([]);
  }, [questions, questionsPerSession, shuffleMode]);

  useEffect(() => { initSession(); }, [initSession]);

  // Auto-focus input on new question
  useEffect(() => {
    if (!sessionDone && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentIdx, sessionDone]);

  const currentQuestion = sessionQuestions[currentIdx];
  const progress = sessionQuestions.length > 0
    ? Math.round((currentIdx / sessionQuestions.length) * 100)
    : 0;

  // ── Submit answer ────────────────────────────────────────
  const submitAnswer = useCallback(() => {
    if (!currentQuestion || feedback !== null) return;
    const isCorrect = isCorrectAnswer(userAnswer, currentQuestion);

    if (isCorrect) {
      setFeedback('correct');
      setCorrect(c => c + 1);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      // XP: 10 base + 5 streak bonus (max 50 bonus)
      const xp = 10 + Math.min(newStreak * 2, 10);
      const coins = newStreak >= 3 ? 2 : 1;
      setXpEarned(x => x + xp);
      setCoinsEarned(c => c + coins);
      addXP(xp);
      addCoins(coins);
      if (soundOn) playSound('correct.mp3');
    } else {
      setFeedback('wrong');
      setWrong(w => w + 1);
      setCurrentStreak(0);
      if (soundOn) playSound('wrong.mp3');
    }

    setAnswers(a => [...a, {
      id: currentQuestion.id,
      hindi: currentQuestion.hindi,
      english: currentQuestion.english,
      userAnswer,
      correct: isCorrect,
    }]);

    // Track in both stores
    if (recordQuestionResult) {
      recordQuestionResult(currentQuestion.id, isCorrect);
    }
    // Update userStore counters (totalQuestionsAttempted, totalCorrectAnswers, etc.)
    if (recordAnswer) {
      recordAnswer(isCorrect);
    }
  }, [currentQuestion, feedback, userAnswer, currentStreak, bestStreak, addXP, addCoins, recordAnswer, soundOn, recordQuestionResult]);

  // ── Enter key submits or advances ───────────────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      if (feedback === null) submitAnswer();
      else advanceQuestion();
    }
  }, [feedback, submitAnswer]);

  // ── Advance to next question ─────────────────────────────
  const advanceQuestion = useCallback(() => {
    const next = currentIdx + 1;
    if (next >= sessionQuestions.length) {
      if (soundOn) playSound('complete.mp3', 0.5);
      setSessionDone(true);
      if (onComplete) onComplete({ correct, wrong, skipped, xpEarned, coinsEarned });
    } else {
      setCurrentIdx(next);
      setUserAnswer('');
      setFeedback(null);
      setRevealed(false);
    }
  }, [currentIdx, sessionQuestions.length, soundOn, correct, wrong, skipped, xpEarned, coinsEarned, onComplete]);

  // ── Reveal answer ────────────────────────────────────────
  const handleReveal = () => {
    if (feedback !== null) return;
    setRevealed(true);
    setFeedback('revealed');
    setSkipped(s => s + 1);
    setCurrentStreak(0);
    setAnswers(a => [...a, {
      id: currentQuestion.id,
      hindi: currentQuestion.hindi,
      english: currentQuestion.english,
      userAnswer: '',
      correct: false,
    }]);
  };

  // ── Skip question ────────────────────────────────────────
  const handleSkip = () => {
    if (feedback !== null) { advanceQuestion(); return; }
    setFeedback('revealed');
    setSkipped(s => s + 1);
    setCurrentStreak(0);
    setAnswers(a => [...a, {
      id: currentQuestion?.id,
      hindi: currentQuestion?.hindi,
      english: currentQuestion?.english,
      userAnswer: '',
      correct: false,
    }]);
  };

  // ── Session done screen ──────────────────────────────────
  if (sessionDone) {
    return (
      <SessionSummary
        session={{ correct, wrong, skipped, xpEarned, coinsEarned, streak: bestStreak, answers }}
        questions={sessionQuestions}
        onRestart={initSession}
        backHref={backHref}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">📚</div>
        <p className="text-slate-400">Loading questions...</p>
      </div>
    );
  }

  // Accuracy so far
  const attempted  = correct + wrong;
  const accuracy   = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  return (
    <div className="space-y-5 max-w-2xl mx-auto">

      {/* ── Quiz Header ──────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Target size={20} className="text-primary-400" /> {title}
          </h1>
          <p className="text-xs text-slate-500">
            Question {currentIdx + 1} of {sessionQuestions.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sound toggle */}
          <button
            onClick={() => setSoundOn(v => !v)}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-all"
            title={soundOn ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundOn
              ? <Volume2 size={15} className="text-slate-400" />
              : <VolumeX size={15} className="text-slate-600" />
            }
          </button>
          {/* Live stats */}
          <div className="hidden sm:flex items-center gap-1 text-xs bg-white/5 border border-white/8 rounded-xl px-3 py-2">
            <span className="text-accent-400 font-bold">{correct}</span>
            <span className="text-slate-600">✅</span>
            <span className="mx-1 text-slate-700">|</span>
            <span className="text-danger-400 font-bold">{wrong}</span>
            <span className="text-slate-600">❌</span>
            <span className="mx-1 text-slate-700">|</span>
            <span className="text-orange-400 font-bold">{currentStreak}🔥</span>
          </div>
        </div>
      </div>

      {/* ── Progress Bar ─────────────────────────────────── */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{accuracy}% accuracy</span>
        </div>
        <div className="h-2 rounded-full bg-white/8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── Question Card ─────────────────────────────────── */}
      <div className={`card p-6 border-2 transition-all duration-300 ${
        feedback === 'correct'  ? 'border-accent-500/60 bg-accent-500/8' :
        feedback === 'wrong'    ? 'border-danger-400/60 bg-danger-400/8' :
        feedback === 'revealed' ? 'border-amber-500/40 bg-amber-500/5'   :
        'border-white/8 hover:border-white/12'
      }`}>
        {/* Question type badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="badge-primary text-xs capitalize">{currentQuestion.type || 'translation'}</span>
          <span className="text-xs text-slate-500">#{currentIdx + 1}</span>
        </div>

        {/* Instructions */}
        <p className="text-xs text-slate-500 mb-2">
          🇮🇳 Hindi mein padho — English mein likhkar answer karo:
        </p>

        {/* Hindi Question — Large and prominent */}
        <div className="p-5 rounded-2xl bg-white/4 border border-white/8 mb-5">
          <p className="hindi-text text-xl sm:text-2xl text-white font-semibold leading-relaxed text-center">
            {currentQuestion.hindi}
          </p>
        </div>

        {/* Answer Input */}
        {feedback === null && (
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type the English translation here..."
              className="input w-full text-base py-3.5 px-4 placeholder:text-slate-600"
              autoComplete="off"
              spellCheck="false"
            />
            <div className="flex gap-2">
              <button
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
                className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle2 size={16} /> Check Answer
              </button>
              <button
                onClick={handleReveal}
                className="btn-secondary flex items-center gap-2 px-4"
                title="Show answer"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">Reveal</span>
              </button>
              <button
                onClick={handleSkip}
                className="btn-secondary flex items-center gap-2 px-4"
                title="Skip"
              >
                <SkipForward size={16} />
                <span className="hidden sm:inline">Skip</span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback — Correct */}
        {feedback === 'correct' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent-500/15 border border-accent-500/30">
              <CheckCircle2 size={24} className="text-accent-400 shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-accent-300">Sahi Jawab! ✅</p>
                <p className="text-sm text-slate-300 mt-0.5">
                  <span className="text-white font-semibold">{currentQuestion.english}</span>
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-violet-300 font-bold">+{10 + Math.min((currentStreak) * 2, 10)} XP</p>
                {currentStreak >= 3 && (
                  <p className="text-xs text-orange-400">🔥 Streak x{currentStreak}!</p>
                )}
              </div>
            </div>
            {/* Your answer */}
            <p className="text-xs text-slate-500">
              Your answer: <span className="text-accent-300">{userAnswer}</span>
            </p>
            <button onClick={advanceQuestion} className="btn-primary w-full flex items-center justify-center gap-2">
              Next Question <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Feedback — Wrong */}
        {feedback === 'wrong' && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-danger-400/10 border border-danger-400/30">
              <XCircle size={24} className="text-danger-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-danger-300">Galat Jawab ❌</p>
                <p className="text-xs text-slate-400 mt-1">Your answer:</p>
                <p className="text-sm text-danger-300 line-through">{userAnswer || '(empty)'}</p>
                <p className="text-xs text-slate-400 mt-2">Correct answer:</p>
                <p className="text-sm text-white font-semibold">{currentQuestion.english}</p>
                {currentQuestion.alternatives && currentQuestion.alternatives.length > 1 && (
                  <p className="text-xs text-slate-500 mt-1">
                    Also accepted: {currentQuestion.alternatives.join(' / ')}
                  </p>
                )}
              </div>
            </div>
            <HintBadge hint={currentQuestion.hint} />
            <button onClick={advanceQuestion} className="btn-primary w-full flex items-center justify-center gap-2">
              Next Question <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Feedback — Revealed */}
        {feedback === 'revealed' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <Eye size={24} className="text-amber-400 shrink-0" />
              <div>
                <p className="font-bold text-amber-300">Answer Revealed 👁️</p>
                <p className="text-sm text-white font-semibold mt-1">{currentQuestion.english}</p>
              </div>
            </div>
            <HintBadge hint={currentQuestion.hint} />
            <button onClick={advanceQuestion} className="btn-primary w-full flex items-center justify-center gap-2">
              Next Question <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ── Mini Stats Bar ─────────────────────────────────── */}
      <div className="card p-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-500" />
            <span className="text-slate-400">{correct} correct</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-danger-400" />
            <span className="text-slate-400">{wrong} wrong</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="text-slate-400">{skipped} skipped</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-violet-300 font-bold">
          <Zap size={14} /> +{xpEarned} XP
        </div>
      </div>

      {/* ── Hint ─────────────────────────────────────────── */}
      {feedback === null && currentQuestion.hint && (
        <HintBadge hint={currentQuestion.hint} />
      )}
    </div>
  );
}
