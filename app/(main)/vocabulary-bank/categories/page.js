'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard hooks.
import Link from 'next/link'; // Simple English: Import Navigation link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for grid lists.
import { ArrowLeft, BookOpen, Volume2, HelpCircle, Check, X, Award, Globe } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: Definition of vocabulary categories datasets.
const CATEGORIES = [
  {
    id: 'airport',
    name: 'Airport Vocabulary',
    emoji: '✈️',
    words: [
      { term: 'boarding pass', definition: 'A pass that allows you to board a plane.', hindi: 'बोडिंग पास / विमान प्रवेश पत्र', sentence: 'Keep your boarding pass and passport ready.' },
      { term: 'layover', meaning: 'A short stay between two flights.', hindi: 'विराम काल / ठहराव', sentence: 'We have a three-hour layover in Dubai.' },
      { term: 'luggage', definition: 'Bags and suitcases for travel.', hindi: 'सामान (Samaan)', sentence: 'Check your luggage weight before arriving.' }
    ]
  },
  {
    id: 'office',
    name: 'Office & Business',
    emoji: '💼',
    words: [
      { term: 'collaboration', definition: 'Working together to achieve a goal.', hindi: 'सहयोग (Sahyog)', sentence: 'We value collaboration across our project teams.' },
      { term: 'deadline', definition: 'The latest time to complete something.', hindi: 'समय सीमा (Samay seema)', sentence: 'The deadline for the report is Friday.' },
      { term: 'feedback', definition: 'Advice or critique on your work.', hindi: 'प्रतिक्रिया (Pratikriya)', sentence: 'Thank you for your constructive feedback.' }
    ]
  }
];

export default function CategoriesPage() {
  // Simple English: Track selected category index.
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  // Simple English: Track active word matching quiz index.
  const [quizWordIdx, setQuizWordIdx] = useState(0);
  // Simple English: Track if user answered the quiz question.
  const [quizAnswered, setQuizAnswered] = useState(false);
  // Simple English: Track user selected option name.
  const [selectedWord, setSelectedWord] = useState('');
  // Simple English: Track if user selection was correct.
  const [isCorrect, setIsCorrect] = useState(false);
  // Simple English: Store cumulative correct scores.
  const [score, setScore] = useState(0);

  const { addXP } = useUserStore(); // Simple English: Pull XP rewards function.
  const activeCategory = CATEGORIES[activeCatIdx]; // Simple English: Current category object.
  const currentQuizWord = activeCategory.words[quizWordIdx]; // Simple English: Current word for quiz.

  // Simple English: Speak target word out loud.
  const speakWord = (phrase) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple English: Validate selected option matching.
  const handleQuizAnswer = (termChosen) => {
    if (quizAnswered) return; // Simple English: Skip if checked.
    setSelectedWord(termChosen);
    const correct = termChosen === currentQuizWord.term;
    setIsCorrect(correct);
    setQuizAnswered(true);

    if (correct) {
      setScore(s => s + 1);
      addXP(10); // Simple English: Give 10 XP points.
      playCorrect(); // Simple English: Play success sound.
    } else {
      playWrong(); // Simple English: Play warning sound.
    }
  };

  // Simple English: Advance to the next quiz word.
  const handleNextQuiz = () => {
    setQuizAnswered(false);
    setSelectedWord('');
    if (quizWordIdx < activeCategory.words.length - 1) {
      setQuizWordIdx(q => q + 1); // Simple English: Go to next word.
    } else {
      setQuizWordIdx(0); // Simple English: Restart.
      setScore(0); // Simple English: Reset score.
    }
  };

  // Simple English: Handle category tab selection changes.
  const handleCatSelect = (idx) => {
    setActiveCatIdx(idx);
    setQuizWordIdx(0);
    setQuizAnswered(false);
    setSelectedWord('');
    setScore(0);
    playSound('click');
  };

  return (
    // Simple English: Main layout page.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Navigation link back to vocabulary */}
      <Link href="/vocabulary" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Vocabulary Bank
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-cyan-600/10 via-sky-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>📚🗺️</span> Vocabulary Categories
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Learn high-frequency English words categorized by real-life situations. Click on cards to hear audio and complete translation quizzes.
        </p>
      </div>

      {/* Simple English: Responsive grid split columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - Categories selectors list */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Categories</h2>
          {CATEGORIES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleCatSelect(idx)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                activeCatIdx === idx
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500 hover:bg-white/5'
              }`}
            >
              <span>{item.emoji}</span>
              <p className="text-xs">{item.name}</p>
            </button>
          ))}
        </div>

        {/* Simple English: Middle Panel - Terms viewer cards */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4 lg:col-span-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Word List</h2>
          <div className="space-y-3 overflow-y-auto max-h-[350px] pr-1">
            {activeCategory.words.map((wordObj) => (
              <div key={wordObj.term} className="p-3.5 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-all flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-white capitalize">{wordObj.term}</span>
                  <button
                    onClick={() => speakWord(wordObj.term)}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
                  >
                    <Volume2 size={12} />
                  </button>
                </div>
                <p className="text-[10px] text-cyan-300">{wordObj.hindi}</p>
                <p className="text-[10px] text-slate-400 italic">"{wordObj.sentence}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Simple English: Right Panel - Vocabulary matching quiz card */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4 lg:col-span-1 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="font-bold text-cyan-300">Matching Test</span>
              <span>Score: {score}/{activeCategory.words.length}</span>
            </div>

            {/* Simple English: Displays target Hindi definition */}
            <div className="p-5 rounded-2xl bg-white/3 border border-white/5 text-center space-y-2">
              <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-black uppercase">
                Find English word for:
              </span>
              <p className="text-lg font-black text-white leading-relaxed mt-2">
                {currentQuizWord.hindi}
              </p>
            </div>

            {/* Simple English: Options buttons matching */}
            <div className="space-y-2">
              {activeCategory.words.map((wObj) => {
                let optStyle = 'border-white/5 bg-white/2 hover:bg-white/5 text-slate-300';
                if (quizAnswered) {
                  if (wObj.term === currentQuizWord.term) {
                    optStyle = 'border-green-500/40 bg-green-500/10 text-green-400';
                  } else if (wObj.term === selectedWord) {
                    optStyle = 'border-red-500/40 bg-red-500/10 text-red-400';
                  } else {
                    optStyle = 'border-white/5 bg-white/2 opacity-30';
                  }
                }
                return (
                  <button
                    key={wObj.term}
                    disabled={quizAnswered}
                    onClick={() => handleQuizAnswer(wObj.term)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between capitalize ${optStyle}`}
                  >
                    <span>{wObj.term}</span>
                    {quizAnswered && wObj.term === currentQuizWord.term && <Check size={14} />}
                    {quizAnswered && wObj.term === selectedWord && wObj.term !== currentQuizWord.term && <X size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simple English: Next quiz navigation actions */}
          <AnimatePresence>
            {quizAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-2"
              >
                <div className={`p-3 rounded-xl border text-[10px] text-center font-bold ${
                  isCorrect ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {isCorrect ? 'Correct! (+10 XP)' : `Incorrect. The word was "${currentQuizWord.term}"`}
                </div>
                <button
                  onClick={handleNextQuiz}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  {quizWordIdx === activeCategory.words.length - 1 ? 'Finish & Reset' : 'Next Word'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
