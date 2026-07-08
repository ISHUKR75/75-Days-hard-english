"use client";

import { useState, useEffect } from 'react'; // Simple English: Import core React hooks for managing state and side effects.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for smooth animations and transitions.
import { CheckCircle, XCircle, Volume2, Trophy, Coins, Star } from 'lucide-react'; // Simple English: Import icons for visual indicators.
import { playCorrect, playWrong } from '../lib/sounds'; // Simple English: Import sound functions from local sound utility.
import useUserStore from '../store/userStore'; // Simple English: Import store for tracking general user XP, levels, and coins.
import useProgressStore from '../store/progressStore'; // Simple English: Import store for tracking 75-day course progress.
import toast, { Toaster } from 'react-hot-toast'; // Simple English: Import toaster library for overlay messages.

export default function QuizEngine({ questions, dayId }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Simple English: Track the current question index.
  const [userInput, setUserInput] = useState(''); // Simple English: Store user text input.
  const [isAnswered, setIsAnswered] = useState(false); // Simple English: Check if current question is answered.
  const [isCorrect, setIsCorrect] = useState(false); // Simple English: Track if user input is correct.
  const [showExplanation, setShowExplanation] = useState(false); // Simple English: Control the visibility of question explanation.
  const [quizComplete, setQuizComplete] = useState(false); // Simple English: Check if entire day quiz is finished.
  const [score, setScore] = useState(0); // Simple English: Store count of correct answers.
  
  // Zustand stores
  const { addXP, addCoins, recordAnswer: recordUserAnswer, completeLesson: completeUserLesson } = useUserStore(); // Simple English: Extract profile progress functions.
  const { recordQuestionResult, completeLesson: completeProgressLesson } = useProgressStore(); // Simple English: Extract daily activity and tenses logs functions.

  const currentQuestion = questions[currentIndex]; // Simple English: Get details of the active question.

  const handleCheck = () => {
    if (!userInput.trim()) return; // Simple English: Ignore click if input is empty.

    // Check if correct against alternatives (case insensitive)
    const normalizedInput = userInput.trim().toLowerCase(); // Simple English: Convert user input to lowercase.
    
    // In practiceData.js, the correct answer is usually stored in 'english', 'correct_answer' or 'answer'
    let isAnsCorrect = false; // Simple English: Local variable for tracking answer correctness.
    
    if (currentQuestion.correct_answer && typeof currentQuestion.correct_answer === 'string') {
        if (normalizedInput === currentQuestion.correct_answer.toLowerCase()) {
            isAnsCorrect = true; // Simple English: Set true if correct_answer matches.
        }
    } else if (currentQuestion.answer && typeof currentQuestion.answer === 'string') {
        if (normalizedInput === currentQuestion.answer.toLowerCase()) {
            isAnsCorrect = true; // Simple English: Set true if answer matches.
        }
    } else if (currentQuestion.english && typeof currentQuestion.english === 'string') {
        if (normalizedInput === currentQuestion.english.toLowerCase().replace(/[^a-z0-9 ]/g, '')) {
            isAnsCorrect = true; // Simple English: Set true if base translation match is clean.
        }
    }
    
    if (currentQuestion.alternatives && Array.isArray(currentQuestion.alternatives)) {
        if (currentQuestion.alternatives.map(a => a.toLowerCase().replace(/[^a-z0-9 ]/g, '')).includes(normalizedInput.replace(/[^a-z0-9 ]/g, ''))) {
            isAnsCorrect = true; // Simple English: Set true if matched with alternative answers list.
        }
    }

    setIsCorrect(isAnsCorrect); // Simple English: Update local correct/incorrect state.
    setIsAnswered(true); // Simple English: Lock the input and show indicators.
    setShowExplanation(true); // Simple English: Reveal explanation and check marks.
    
    // Update stores
    recordUserAnswer(isAnsCorrect); // Simple English: Send correctness to user profile store.
    recordQuestionResult(currentQuestion.id || `q-${currentIndex}`, isAnsCorrect); // Simple English: Send outcome to activity heatmap tracker.

    if (isAnsCorrect) {
      setScore(s => s + 1); // Simple English: Add one to correct answers count.
      playCorrect(); // Simple English: Play success chime immediately.
      toast.success(`Correct! Great job!`, { icon: '⭐️' }); // Simple English: Show success toast notification.
    } else {
      playWrong(); // Simple English: Play error chime immediately.
      toast.error('Incorrect. Review the explanation.', { icon: '❌' }); // Simple English: Show incorrect notification.
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setUserInput('');
      setIsAnswered(false);
      setIsCorrect(false);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      completeUserLesson();
      completeProgressLesson(dayId, score);
      toast.success('Day Completed! Awesome work!', { duration: 4000 });
    }
  };

  if (!questions || questions.length === 0) {
    return <div className="text-center p-8 text-white/50">No questions available for this day yet.</div>;
  }

  if (quizComplete) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 rounded-3xl text-center flex flex-col items-center gap-6"
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-white/70">You scored {score} out of {questions.length}</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
            <Star className="text-yellow-400" />
            <div className="text-left">
              <p className="text-xs text-white/50 uppercase font-bold tracking-wider">XP Earned</p>
              <p className="text-xl font-bold text-white">+{score * 10}</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
            <Coins className="text-amber-400" />
            <div className="text-left">
              <p className="text-xs text-white/50 uppercase font-bold tracking-wider">Coins</p>
              <p className="text-xl font-bold text-white">+{score * 5}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Toaster position="top-center" />
      
      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-white/50">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-panel p-6 sm:p-10 rounded-3xl space-y-8"
        >
          {/* Question Header */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="px-3 py-1 bg-white/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                {currentQuestion.type || "Translation"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {currentQuestion.hindi}
              </h3>
            </div>
            <button 
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => {
                const utterance = new SpeechSynthesisUtterance(currentQuestion.hindi);
                utterance.lang = 'hi-IN';
                window.speechSynthesis.speak(utterance);
              }}
            >
              <Volume2 className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {/* Input Area */}
          <div className="relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isAnswered}
              placeholder="Type your translation in English..."
              className={`w-full bg-black/40 border-2 rounded-2xl px-6 py-4 text-xl text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-70 ${
                isAnswered 
                  ? isCorrect 
                    ? 'border-green-500/50 focus:border-green-500/50' 
                    : 'border-red-500/50 focus:border-red-500/50'
                  : 'border-white/10'
              }`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isAnswered) {
                  handleCheck();
                } else if (e.key === 'Enter' && isAnswered) {
                  handleNext();
                }
              }}
            />
            {isAnswered && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                {isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-green-400" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400" />
                )}
              </div>
            )}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <p className="font-semibold text-lg text-white mb-2">
                    Correct Answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>{currentQuestion.english || currentQuestion.correct_answer || currentQuestion.answer}</span>
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {currentQuestion.explanation || currentQuestion.hint}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            {!isAnswered ? (
              <button
                onClick={handleCheck}
                disabled={!userInput.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-white text-black hover:bg-white/90 font-bold py-3 px-8 rounded-xl transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
