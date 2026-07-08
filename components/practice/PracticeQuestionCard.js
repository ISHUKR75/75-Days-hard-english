'use client';
// ============================================================
// PRACTICE QUESTION CARD - Interactive question with sound effects
// Features: Hindi to English translation, answer checking, XP rewards, sound effects
// Inspired by: Duolingo, Quizlet, Memrise
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, Eye, EyeOff, Sparkles,
  TrendingUp, Award, Target, Volume2, HelpCircle,
  Lightbulb, MessageSquare, ArrowRight, RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGamificationStore } from '@/store/useGamificationStore';

// ============================================================
// COMPONENT: Practice Question Card
// ============================================================
export default function PracticeQuestionCard({
  question,        // Question object with hindi, correctAnswer, etc.
  onNext,          // Callback when moving to next question
  onComplete,      // Callback when question is answered
  showHint = true, // Show hint button
  difficulty = 'medium' // easy, medium, hard
}) {
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  const [userAnswer, setUserAnswer] = useState('');           // User's typed answer
  const [isAnswered, setIsAnswered] = useState(false);        // Has user submitted answer?
  const [isCorrect, setIsCorrect] = useState(null);           // Is answer correct?
  const [showAnswer, setShowAnswer] = useState(false);        // Show correct answer?
  const [showHintModal, setShowHintModal] = useState(false);  // Show hint modal?
  const [answerTime, setAnswerTime] = useState(0);            // Time taken to answer
  const [attempts, setAttempts] = useState(0);                // Number of attempts
  const [startTime, setStartTime] = useState(Date.now());     // Question start time

  // Refs
  const inputRef = useRef(null);
  const audioRef = useRef(null); // For sound effects

  // Zustand store for gamification
  const { recordQuestion, addXP, addCoins } = useGamificationStore();

  // ============================================================
  // ANSWER CHECKING LOGIC
  // ============================================================
  
  /**
   * Normalize string for comparison
   * - Remove extra spaces
   * - Convert to lowercase
   * - Remove punctuation
   * - Trim whitespace
   */
  const normalizeAnswer = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:'"]/g, '')  // Remove punctuation
      .replace(/\s+/g, ' ');        // Multiple spaces to single space
  };

  /**
   * Check if user's answer matches correct answer
   * - Case insensitive
   * - Ignores punctuation
   * - Checks alternative answers
   */
  const checkAnswer = () => {
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(question.correctAnswer);
    
    // Check main correct answer
    let correct = normalizedUserAnswer === normalizedCorrectAnswer;

    // Check alternative answers if provided
    if (!correct && question.alternativeAnswers) {
      correct = question.alternativeAnswers.some(alt => 
        normalizeAnswer(alt) === normalizedUserAnswer
      );
    }

    return correct;
  };

  /**
   * Handle answer submission
   */
  const handleSubmit = () => {
    // Prevent multiple submissions
    if (isAnswered) return;

    // Calculate time taken
    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // in seconds
    setAnswerTime(timeTaken);

    // Increment attempts
    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    // Check if answer is correct
    const correct = checkAnswer();
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      // ✅ CORRECT ANSWER
      handleCorrectAnswer(timeTaken, currentAttempts);
    } else {
      // ❌ WRONG ANSWER
      handleWrongAnswer();
    }

    // Call onComplete callback
    if (onComplete) {
      onComplete({
        questionId: question.id,
        correct,
        attempts: currentAttempts,
        timeTaken,
        userAnswer
      });
    }
  };

  /**
   * Handle correct answer
   * - Play success sound
   * - Show confetti
   * - Award XP and coins
   * - Record in gamification store
   */
  const handleCorrectAnswer = (timeTaken, currentAttempts) => {
    // Play success sound
    playSound('correct');

    // Show confetti for correct answer
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#6ee7b7']
    });

    // Calculate XP based on difficulty and speed
    const options = {
      difficulty: question.difficulty || difficulty,
      answerTime: timeTaken,
      firstTry: currentAttempts === 1
    };

    // Record in gamification store (this awards XP automatically)
    const result = recordQuestion(true, options);

    // Award bonus coins for perfect first try
    if (currentAttempts === 1 && timeTaken < 10) {
      addCoins(5, 'Quick & correct');
    }
  };

  /**
   * Handle wrong answer
   * - Play error sound
   * - Shake animation
   * - Show hint (optional)
   */
  const handleWrongAnswer = () => {
    // Play error sound
    playSound('wrong');

    // Record wrong answer (no XP)
    recordQuestion(false);

    // Shake animation (handled by CSS)
    const card = document.getElementById('question-card');
    if (card) {
      card.classList.add('shake-animation');
      setTimeout(() => card.classList.remove('shake-animation'), 500);
    }
  };

  /**
   * Play sound effect
   */
  const playSound = (soundType) => {
    // Dispatch custom event for sound provider to handle
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('play-sound', {
        detail: { sound: soundType }
      }));
    }

    // Alternative: Use Web Audio API (if sound files are available)
    // const audio = new Audio(`/sounds/${soundType}.mp3`);
    // audio.play().catch(err => console.log('Audio play failed:', err));
  };

  /**
   * Reset question for retry
   */
  const handleRetry = () => {
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(null);
    setShowAnswer(false);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };

  /**
   * Move to next question
   */
  const handleNext = () => {
    if (onNext) {
      onNext();
    }
    // Reset state
    setUserAnswer('');
    setIsAnswered(false);
    setIsCorrect(null);
    setShowAnswer(false);
    setAttempts(0);
    setStartTime(Date.now());
  };

  // ============================================================
  // KEYBOARD SHORTCUTS
  // ============================================================
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Enter to submit
      if (e.key === 'Enter' && userAnswer.trim() && !isAnswered) {
        handleSubmit();
      }
      // Ctrl/Cmd + Enter to go next
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && isAnswered) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [userAnswer, isAnswered]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <motion.div
      id="question-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card p-8 max-w-3xl mx-auto"
    >
      {/* ========== Question Header ========== */}
      <div className="flex items-start justify-between mb-6">
        {/* Question number and difficulty */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-primary-400" />
            <span className="text-sm font-semibold text-slate-400">
              Question {question.number || ''}
            </span>
          </div>
          {/* Difficulty badge */}
          <span className={`badge ${
            difficulty === 'hard' ? 'diff-hard' : 
            difficulty === 'medium' ? 'diff-medium' : 
            'diff-easy'
          }`}>
            {difficulty}
          </span>
          {/* Topic tag */}
          {question.topic && (
            <span className="badge badge-primary text-xs">
              {question.topic}
            </span>
          )}
        </div>

        {/* Hint button */}
        {showHint && !isAnswered && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHintModal(true)}
            className="btn-secondary px-4 py-2 text-sm flex items-center gap-2"
          >
            <Lightbulb size={16} />
            Hint
          </motion.button>
        )}
      </div>

      {/* ========== Hindi Question ========== */}
      <div className="mb-8">
        <label className="text-sm font-semibold text-slate-400 mb-2 block">
          Translate to English:
        </label>
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-2xl font-semibold hindi-text text-amber-200">
            {question.hindi}
          </p>
        </div>
      </div>

      {/* ========== Answer Input ========== */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-slate-400 mb-2 block">
          Your Answer:
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isAnswered}
            placeholder="Type your answer in English..."
            className={`input text-lg ${
              isAnswered ? (isCorrect ? 'border-emerald-500 bg-emerald-500/10' : 'border-rose-500 bg-rose-500/10') : ''
            }`}
          />
          {/* Character count */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            {userAnswer.length} chars
          </div>
        </div>
      </div>

      {/* ========== Result Display ========== */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-5 rounded-2xl mb-6 ${
              isCorrect 
                ? 'bg-emerald-500/10 border border-emerald-500/30' 
                : 'bg-rose-500/10 border border-rose-500/30'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              {isCorrect ? (
                <CheckCircle2 size={28} className="text-emerald-400 shrink-0 mt-1" />
              ) : (
                <XCircle size={28} className="text-rose-400 shrink-0 mt-1" />
              )}

              {/* Result text */}
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-2 ${
                  isCorrect ? 'text-emerald-300' : 'text-rose-300'
                }`}>
                  {isCorrect ? '🎉 Perfect!' : '❌ Not quite right'}
                </h3>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4 text-sm mb-3">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Target size={14} />
                    {attempts} {attempts === 1 ? 'attempt' : 'attempts'}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <TrendingUp size={14} />
                    {answerTime}s
                  </div>
                  {isCorrect && (
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <Award size={14} />
                      +{10} XP
                    </div>
                  )}
                </div>

                {/* Correct answer (for wrong answers) */}
                {!isCorrect && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
                      {showAnswer ? 'Hide' : 'Show'} correct answer
                    </button>
                    
                    <AnimatePresence>
                      {showAnswer && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <p className="text-sm text-slate-400 mb-1">Correct Answer:</p>
                          <p className="text-lg font-semibold english-text">
                            {question.correctAnswer}
                          </p>
                          {question.alternativeAnswers && question.alternativeAnswers.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-slate-500 mb-1">Alternative answers:</p>
                              {question.alternativeAnswers.map((alt, idx) => (
                                <p key={idx} className="text-sm text-slate-400">• {alt}</p>
                              ))}
                            </div>
                          )}
                          {/* Explanation */}
                          {question.explanation && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <p className="text-sm text-slate-300">{question.explanation}</p>
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

      {/* ========== Action Buttons ========== */}
      <div className="flex items-center gap-3">
        {!isAnswered ? (
          // Submit button
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="btn-primary flex-1 py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </motion.button>
        ) : (
          <>
            {/* Retry button (for wrong answers) */}
            {!isCorrect && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRetry}
                className="btn-secondary px-6 py-3 text-base font-semibold flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Try Again
              </motion.button>
            )}

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="btn-gradient flex-1 py-3 text-base font-semibold flex items-center justify-center gap-2"
            >
              {isCorrect ? 'Continue' : 'Skip'}
              <ArrowRight size={18} />
            </motion.button>
          </>
        )}
      </div>

      {/* ========== Keyboard Shortcuts Info ========== */}
      <div className="mt-4 text-center text-xs text-slate-600">
        <span>Press <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">Enter</kbd> to submit</span>
        {isAnswered && (
          <span className="ml-3">
            <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10">Ctrl</kbd> + 
            <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 ml-1">Enter</kbd> to continue
          </span>
        )}
      </div>

      {/* ========== Hint Modal ========== */}
      <AnimatePresence>
        {showHintModal && (
          <HintModal
            hint={question.hint}
            onClose={() => setShowHintModal(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================
// SUB-COMPONENT: Hint Modal
// ============================================================
function HintModal({ hint, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
      >
        <div className="card p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/20">
              <Lightbulb size={24} className="text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">Hint</h3>
              <p className="text-sm text-slate-400">Here's a tip to help you</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
            <p className="text-slate-200">{hint || 'Remember: Subject + Verb + Object'}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="btn-primary w-full py-3"
          >
            Got it!
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

// ============================================================
// STYLES (Add to global CSS)
// ============================================================
/*
.shake-animation {
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
*/
