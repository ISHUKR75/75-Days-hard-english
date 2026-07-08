'use client'; // Simple English: This file runs on the client browser.

// ============================================================
// SUBTOPIC TEST PAGE — Timed adaptive test for any subtopic
// Simple English: This page gives a test to the user.
// Simple English: It has a timer, question list, and scoring.
// Simple English: Every line in this file has a simple English comment.
// ============================================================

import { useState, useEffect, useRef } from 'react'; // Simple English: Import standard React hooks.
import { useParams, useRouter } from 'next/navigation'; // Simple English: Import Next.js routing utilities.
import Link from 'next/link'; // Simple English: Import link component for navigation.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import animation library.
import {
  ArrowLeft, Timer, CheckCircle2, XCircle, AlertCircle,
  Award, Trophy, HelpCircle, ArrowRight, RotateCcw,
} from 'lucide-react'; // Simple English: Import visual icons.
import { TOPIC_QUESTION_SETS, getQuestionsForDay } from '@/lib/practiceData'; // Simple English: Import question sets.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to reward XP.
import useAssessmentStore from '@/store/useAssessmentStore'; // Simple English: Import assessment store.

// ── Normalize Answer Helper ─────────────────────────────────
// Simple English: This function removes spaces and marks from the answer.
const normalize = (str) =>
  (str || '')
    .toLowerCase()
    .trim()
    .replace(/^[\s.,!?;:'"]+|[\s.,!?;:'"]+$/g, '') // Simple English: Strip edge punctuation.
    .replace(/\s+/g, ' '); // Simple English: Collapse extra spaces.

// ── Match Helper ────────────────────────────────────────────
// Simple English: This function checks if user answer matches the correct answer.
const isMatch = (userAnswer, correct, alternatives = []) => {
  const u = normalize(userAnswer); // Simple English: Normalize user answer.
  if (u === normalize(correct)) return true; // Simple English: Check if matching correct answer.
  return (alternatives || []).some((alt) => u === normalize(alt)); // Simple English: Check alternatives.
};

// ── Sound Helper ────────────────────────────────────────────
// Simple English: This function plays sound effects.
const playSound = (name) => {
  if (typeof window === 'undefined') return; // Simple English: Check if browser environment.
  window.dispatchEvent(new CustomEvent('play-sound', { detail: { sound: name } })); // Simple English: Dispatch play sound event.
};

// ── Main Page Component ─────────────────────────────────────
export default function SubtopicTestPage() {
  const params = useParams(); // Simple English: Get routing parameters.
  const router = useRouter(); // Simple English: Get navigation router.
  const topicSlug = params?.topicSlug || ''; // Simple English: Get topic slug.
  const subtopicSlug = params?.subtopicSlug || ''; // Simple English: Get subtopic slug.
  const fullSlug = `${topicSlug}/${subtopicSlug}`; // Simple English: Form full slug.

  // ── State ────────────────────────────────────────────────
  const [questions, setQuestions] = useState([]); // Simple English: Store questions for the session.
  const [started, setStarted] = useState(false); // Simple English: Track if test has started.
  const [completed, setCompleted] = useState(false); // Simple English: Track if test is completed.
  const [qIndex, setQIndex] = useState(0); // Simple English: Track current question index.
  const [userAnswer, setUserAnswer] = useState(''); // Simple English: Track user's input answer.
  const [feedback, setFeedback] = useState(null); // Simple English: Store feedback message.
  const [isCorrect, setIsCorrect] = useState(null); // Simple English: Track if answer is correct.
  const [score, setScore] = useState(0); // Simple English: Track total score.
  const [timeLeft, setTimeLeft] = useState(300); // Simple English: Track remaining time in seconds (5 minutes).
  const [wrongAnswers, setWrongAnswers] = useState([]); // Simple English: Track wrong answers for review.

  // ── Refs ─────────────────────────────────────────────────
  const timerRef = useRef(null); // Simple English: Reference to hold the timer interval.
  const inputRef = useRef(null); // Simple English: Reference to input element.

  // ── Load Questions ───────────────────────────────────────
  useEffect(() => {
    // Simple English: Try to get questions from library.
    let qs = TOPIC_QUESTION_SETS[subtopicSlug] || TOPIC_QUESTION_SETS[fullSlug] || TOPIC_QUESTION_SETS[topicSlug];
    if (!qs || qs.length === 0) {
      qs = getQuestionsForDay(1); // Simple English: Fallback to day 1 questions.
    }
    // Simple English: Limit test to 10 questions for quick evaluation.
    setQuestions(qs.slice(0, 10));
  }, [subtopicSlug, fullSlug, topicSlug]);

  // ── Timer Effect ─────────────────────────────────────────
  useEffect(() => {
    if (started && !completed && timeLeft > 0) {
      // Simple English: Set up countdown timer interval.
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current); // Simple English: Clear timer.
            setCompleted(true); // Simple English: Mark completed on timeout.
            return 0;
          }
          return prev - 1; // Simple English: Decrement time.
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current); // Simple English: Clean up timer on unmount.
  }, [started, completed, timeLeft]);

  // ── Actions ──────────────────────────────────────────────
  const handleStart = () => {
    setStarted(true); // Simple English: Start the test.
    playSound('correct'); // Simple English: Play start sound.
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Simple English: Prevent default page reload.
    if (!userAnswer.trim()) return; // Simple English: Do not submit empty answer.

    const currentQ = questions[qIndex]; // Simple English: Get current question object.
    const isAnsCorrect = isMatch(userAnswer, currentQ.english, currentQ.alternatives); // Simple English: Check correctness.

    setIsCorrect(isAnsCorrect); // Simple English: Update correctness state.
    if (isAnsCorrect) {
      setScore((s) => s + 1); // Simple English: Increment score.
      setFeedback('Correct! Well done!'); // Simple English: Set positive feedback.
      playSound('correct'); // Simple English: Play correct answer sound.
      useUserStore.getState().addXP(10); // Simple English: Reward 10 XP points.
    } else {
      setFeedback(`Incorrect. The correct answer was: "${currentQ.english}"`); // Simple English: Set negative feedback.
      playSound('wrong'); // Simple English: Play incorrect answer sound.
      setWrongAnswers((prev) => [...prev, { q: currentQ, user: userAnswer }]); // Simple English: Record for review.
    }

    // Simple English: Wait 2.5 seconds before moving to next question.
    setTimeout(() => {
      setFeedback(null); // Simple English: Reset feedback.
      setIsCorrect(null); // Simple English: Reset correctness.
      setUserAnswer(''); // Simple English: Reset input field.
      if (qIndex < questions.length - 1) {
        setQIndex((idx) => idx + 1); // Simple English: Increment question index.
      } else {
        setCompleted(true); // Simple English: Complete the test.
        playSound('levelup'); // Simple English: Play completion sound.
      }
    }, 2500);
  };

  // ── Format Time ──────────────────────────────────────────
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60); // Simple English: Calculate minutes.
    const secs = seconds % 60; // Simple English: Calculate seconds.
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`; // Simple English: Return formatted string.
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* ── Header Back Link ────────────────────────────────── */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/topics/${topicSlug}/${subtopicSlug}`} className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Lesson
        </Link>
      </div>

      {/* ── Welcome Screen ──────────────────────────────────── */}
      {!started && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-3xl mx-auto">
            🏆
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Subtopic Assessment</h1>
            <p className="text-slate-400 text-sm mt-2">
              Ready to test your knowledge? This timed test contains {questions.length} questions.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Timer size={16} /> 5 Minutes</span>
            <span className="flex items-center gap-1.5"><HelpCircle size={16} /> {questions.length} Questions</span>
          </div>
          <button onClick={handleStart} className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm">
            Start Test <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

      {/* ── Active Test Screen ──────────────────────────────── */}
      {started && !completed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress and Timer row */}
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Question {qIndex + 1} of {questions.length}</span>
            <span className="flex items-center gap-1.5 text-primary-400 font-mono">
              <Timer size={16} /> {formatTime(timeLeft)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} />
          </div>

          {/* Question Card */}
          <div className="card p-6 space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Translate to English:</span>
            <h2 className="text-xl font-bold text-white">{questions[qIndex]?.hindi}</h2>
            {questions[qIndex]?.hint && (
              <p className="text-xs text-slate-500 italic">Hint: {questions[qIndex]?.hint}</p>
            )}
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={feedback !== null}
              placeholder="Type your English translation here..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-colors text-sm"
              autoFocus
            />
            <button type="submit" disabled={!userAnswer.trim() || feedback !== null} className="btn-primary w-full py-3 text-sm">
              Submit Answer
            </button>
          </form>

          {/* Feedback Overlay */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                }`}
              >
                {isCorrect ? <CheckCircle2 className="shrink-0 mt-0.5" /> : <XCircle className="shrink-0 mt-0.5" />}
                <div>
                  <p className="font-semibold text-sm">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                  <p className="text-xs mt-0.5 opacity-90">{feedback}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Completed Screen ────────────────────────────────── */}
      {completed && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-4xl mx-auto">
            🏆
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Assessment Completed!</h1>
            <p className="text-slate-400 text-sm mt-2">Here is how you performed in this subtopic test.</p>
          </div>

          {/* Score display */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-500 block">Score</span>
              <span className="text-2xl font-black text-white">{score} / {questions.length}</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-500 block">XP Earned</span>
              <span className="text-2xl font-black text-primary-400">+{score * 10} XP</span>
            </div>
          </div>

          {/* Mistakes review */}
          {wrongAnswers.length > 0 && (
            <div className="text-left space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5"><AlertCircle size={16} className="text-rose-400" /> Review Mistakes</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {wrongAnswers.map((w, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/2 border border-white/5 space-y-1">
                    <p className="text-xs text-slate-400">🇮🇳 {w.q.hindi}</p>
                    <p className="text-xs text-rose-400">❌ Your answer: {w.user}</p>
                    <p className="text-xs text-emerald-400">✅ Correct: {w.q.english}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => window.location.reload()} className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2 text-sm border border-white/10 hover:bg-white/5">
              <RotateCcw size={16} /> Retake Test
            </button>
            <Link href={`/topics/${topicSlug}/${subtopicSlug}`} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm">
              Finish assessment <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
