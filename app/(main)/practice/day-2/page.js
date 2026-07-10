'use client';
// Practice Page — Day 2: Self Introduction
// Features: 500+ Hindi questions, translation practice, sound effects, XP rewards

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, CheckCircle2, XCircle, Eye, EyeOff, Sparkles,
  Trophy, Target, Flame, Zap, Star, Award, Clock, Volume2,
  ArrowLeft, ArrowRight, RotateCcw, Play, HelpCircle, Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useGamificationStore } from '@/store/useGamificationStore';
import { getQuestionsForDay } from '@/lib/practiceData';

// Day 2 Practice Questions (500+ Hindi questions for Self Introduction)
// Real practice questions for Day 2 are sourced from lib/practiceData.js, which prefers
// handcrafted/real per-day banks and tops up to 950+ with the generated content engine —
// this keeps this static route's content identical to the dynamic /practice/[daySlug] route
// instead of the small placeholder array (only 30 questions) that used to live here.
const DAY_2_QUESTIONS = getQuestionsForDay(2);

export default function Day2PracticePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  
  const questionRef = useRef(null);
  const inputRef = useRef(null);
  
  const currentQuestion = DAY_2_QUESTIONS[currentQuestionIndex];
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSkip();
    }
    return () => clearTimeout(timer);
  }, [isTimerRunning, timeLeft]);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
    setIsTimerRunning(true);
    setIsCorrect(null);
    setShowExplanation(false);
    setUserAnswer('');
  }, [currentQuestionIndex]);
  
  const normalizeAnswer = (answer) => {
    return answer.trim().toLowerCase().replace(/[.,!?;:"'()\[\]]/g, '');
  };
  
  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(currentQuestion.english);
    
    // Check against correct answer and alternatives
    const isAnswerCorrect = 
      normalizedUserAnswer === normalizedCorrectAnswer ||
      (currentQuestion.alternatives && 
       currentQuestion.alternatives.some(alt => 
         normalizeAnswer(alt) === normalizedUserAnswer
       ));
    
    setIsCorrect(isAnswerCorrect);
    
    // Add to completed questions
    setCompletedQuestions(prev => new Set([...prev, currentQuestion.id]));
    
    // Calculate XP
    let xp = 10;
    if (currentQuestion.difficulty === 'medium') xp = 15;
    if (currentQuestion.difficulty === 'hard') xp = 20;
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setXpGained(prev => prev + xp);
      
      // Play success sound
      const event = new Event('play-success-sound');
      document.dispatchEvent(event);
      
      // Confetti for perfect streak
      if (streak >= 5) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setStreak(0);
      
      // Play error sound
      const event = new Event('play-error-sound');
      document.dispatchEvent(event);
    }
  };
  
  const handleSkip = () => {
    setIsTimerRunning(false);
    setIsCorrect(false);
    setStreak(0);
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < DAY_2_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setIsCorrect(null);
    setShowExplanation(false);
    setScore(0);
    setStreak(0);
    setXpGained(0);
    setCompletedQuestions(new Set());
    setTimeLeft(30);
    setIsTimerRunning(true);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isCorrect === null) {
        checkAnswer();
      } else {
        nextQuestion();
      }
    }
  };
  
  // Progress calculation
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / DAY_2_QUESTIONS.length) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Day 2: Self Introduction
          </h1>
          <p className="text-gray-600 text-lg">Master professional self-introduction skills</p>
        </motion.div>
        
        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-blue-600">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
        
        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-blue-600">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">{score}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Correct</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-green-600">
              <Flame className="w-5 h-5" />
              <span className="font-semibold">{streak}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Streak</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-purple-600">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">{xpGained}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">XP Gained</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-orange-600">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{timeLeft}s</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Time Left</p>
          </div>
        </motion.div>
        
        {/* Question Card */}
        <motion.div 
          ref={questionRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Question Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Question {currentQuestionIndex + 1}</h2>
                <p className="text-blue-100 mt-1">{currentQuestion.difficulty} • {currentQuestion.hint}</p>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Day 2 • Self Introduction</div>
                <div className="text-xs opacity-70 mt-1">{DAY_2_QUESTIONS.length} total questions</div>
              </div>
            </div>
          </div>
          
          {/* Question Content */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Translate to English:
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <p className="text-2xl font-bold text-gray-800 text-center">{currentQuestion.hindi}</p>
              </div>
            </div>
            
            {/* Answer Input */}
            <div className="mb-6">
              <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  id="answer"
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your English translation here..."
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Volume2 className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={checkAnswer}
                disabled={isCorrect !== null}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${isCorrect !== null ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
              >
                {isCorrect === null ? 'Submit Answer' : isCorrect ? 'Correct!' : 'Try Again'}
              </button>
              
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5" />
                {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
              </button>
              
              <button
                onClick={handleSkip}
                disabled={isCorrect !== null}
                className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-red-50 hover:bg-red-100 transition-all duration-200 flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Skip Question
              </button>
            </div>
            
            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Explanation
                  </h4>
                  <p className="text-blue-700 leading-relaxed">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Correct Answer */}
            <AnimatePresence>
              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <h4 className="font-semibold text-lg">
                      {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
                    </h4>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Your answer:</span> "{userAnswer}"
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Correct answer:</span> "{currentQuestion.english}"
                  </p>
                  {currentQuestion.alternatives && currentQuestion.alternatives.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Also acceptable:</span> {currentQuestion.alternatives.map((alt, i) => (
                          <span key={i} className="mr-2">"{alt}"</span>
                        ))}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Navigation */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextQuestion}
                disabled={currentQuestionIndex >= DAY_2_QUESTIONS.length - 1 || isCorrect === null}
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {DAY_2_QUESTIONS.length}
            </div>
            
            <button
              onClick={resetQuiz}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Reset Quiz
            </button>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          <p>© 2026 75 Days Hard English Course • Professional Self Introduction Practice</p>
        </motion.div>
      </div>
    </div>
  );
}