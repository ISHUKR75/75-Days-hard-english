'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard state hook.
import Link from 'next/link'; // Simple English: Import link navigation.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for slide animations.
import { ArrowLeft, BookOpen, Volume2, HelpCircle, Check, X, ShieldAlert, AlertCircle } from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: Definition of the reading articles data models.
const ARTICLES = [
  {
    id: 1,
    title: 'The Shift to Remote Working',
    category: 'Technology',
    text: 'Over the last decade, technology has enabled millions of employees to work from home. This shift has changed corporate culture. Many firms report increased productivity, while workers enjoy more flexible schedules. However, maintaining collaboration remains a challenge.',
    vocab: [
      { word: 'decade', meaning: 'A period of 10 years (दशक)' },
      { word: 'enabled', meaning: 'Made possible (सक्षम बनाया)' },
      { word: 'corporate', meaning: 'Related to large companies (कॉर्पोरेट)' },
      { word: 'productivity', meaning: 'Rate of output/efficiency (उत्पादकता)' }
    ],
    quiz: {
      statement: 'Technology has decreased corporate productivity in the last ten years.',
      isTrue: false, // Simple English: Correct answer is False because productivity increased.
      explanation: 'The text states that "Many firms report increased productivity," so saying it decreased is False.'
    }
  },
  {
    id: 2,
    title: 'Benefits of Regular Exercise',
    category: 'Health',
    text: 'Doctors agree that physical activity is essential for a healthy life. Daily exercise strengthens the heart and reduces stress. It also improves sleep quality and mental clarity. Even a simple thirty-minute walk every morning can make a massive difference.',
    vocab: [
      { word: 'essential', meaning: 'Extremely important/necessary (आवश्यक)' },
      { word: 'strengthens', meaning: 'Makes stronger (मजबूत बनाता है)' },
      { word: 'quality', meaning: 'Degree of excellence (गुणवत्ता)' },
      { word: 'massive', meaning: 'Very large/huge (बड़ा)' }
    ],
    quiz: {
      statement: 'A thirty-minute walk can strengthen the heart and reduce stress.',
      isTrue: true, // Simple English: Correct answer is True.
      explanation: 'The text states that daily exercise strengthens the heart, reduces stress, and a 30-minute walk makes a difference.'
    }
  }
];

export default function ArticlesPage() {
  // Simple English: Track index of selected article.
  const [index, setIndex] = useState(0);
  // Simple English: Track if user answered the true/false quiz.
  const [quizAnswered, setQuizAnswered] = useState(false);
  // Simple English: Track if user choice was correct.
  const [isCorrect, setIsCorrect] = useState(false);
  // Simple English: Track user choice (true or false).
  const [userChoice, setUserChoice] = useState(null);
  // Simple English: Store cumulative correct scores.
  const [score, setScore] = useState(0);

  const { addXP } = useUserStore(); // Simple English: Reward points hook.
  const activeArticle = ARTICLES[index]; // Simple English: Reference active article.

  // Simple English: Speak article text out loud.
  const speakText = (textPhrase) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textPhrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple English: Validate true/false choice.
  const handleQuizAnswer = (choice) => {
    if (quizAnswered) return; // Simple English: Ignore if checked.
    setUserChoice(choice);
    const correct = choice === activeArticle.quiz.isTrue;
    setIsCorrect(correct);
    setQuizAnswered(true);

    if (correct) {
      setScore(s => s + 1);
      addXP(10); // Simple English: Give 10 XP points.
      playCorrect(); // Simple English: Play correct sound.
    } else {
      playWrong(); // Simple English: Play wrong sound.
    }
  };

  // Simple English: Handle article selection resets.
  const handleArticleSelect = (idx) => {
    setIndex(idx);
    setQuizAnswered(false);
    setUserChoice(null);
    playSound('click');
  };

  return (
    // Simple English: Main layout page.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Navigation back link */}
      <Link href="/reading-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Reading Lab
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-red-600/10 via-orange-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>📰</span> Article Comprehension
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Improve your business vocabulary and comprehension. Read professional articles, study core terms, and complete truth checks.
        </p>
      </div>

      {/* Simple English: Responsive grid columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - Articles list */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Articles</h2>
          {ARTICLES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleArticleSelect(idx)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                index === idx
                  ? 'border-red-500/40 bg-red-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500 hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] mb-1">
                <span className="text-red-400 font-bold uppercase">{item.category}</span>
              </div>
              <p className="text-xs truncate">{item.title}</p>
            </button>
          ))}
        </div>

        {/* Simple English: Right Panel - Reading block & Truth Quiz */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Simple English: Header statistics row */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-lg font-black text-white">{activeArticle.title}</h2>
              <button
                onClick={() => speakText(activeArticle.text)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-all"
              >
                <Volume2 size={14} /> Play Voice
              </button>
            </div>

            {/* Simple English: Display main article text */}
            <p className="text-sm text-slate-300 leading-relaxed bg-white/1 p-4 rounded-xl border border-white/2">
              {activeArticle.text}
            </p>

            {/* Simple English: Vocabulary Bank block */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vocabulary Terms</h3>
              <div className="grid grid-cols-2 gap-3">
                {activeArticle.vocab.map((term, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/3 border border-white/5 space-y-0.5">
                    <p className="text-xs font-bold text-white capitalize">{term.word}</p>
                    <p className="text-[10px] text-slate-400">{term.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple English: Truth test check */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle size={14} className="text-red-400" /> Truth Verification
              </h3>
              
              <div className="p-4 bg-white/3 border border-white/5 rounded-xl space-y-3">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-black">Is the statement True or False?</p>
                <p className="text-sm font-bold text-white">"{activeArticle.quiz.statement}"</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Simple English: Choose True button */}
                <button
                  disabled={quizAnswered}
                  onClick={() => handleQuizAnswer(true)}
                  className={`py-3 rounded-xl border text-center font-bold text-xs uppercase tracking-wider transition-all ${
                    quizAnswered && activeArticle.quiz.isTrue
                      ? 'border-green-500/40 bg-green-500/10 text-green-400'
                      : quizAnswered && userChoice === true
                      ? 'border-red-500/40 bg-red-500/10 text-red-400'
                      : 'border-white/5 bg-white/2 hover:bg-white/5 text-white'
                  }`}
                >
                  True
                </button>

                {/* Simple English: Choose False button */}
                <button
                  disabled={quizAnswered}
                  onClick={() => handleQuizAnswer(false)}
                  className={`py-3 rounded-xl border text-center font-bold text-xs uppercase tracking-wider transition-all ${
                    quizAnswered && !activeArticle.quiz.isTrue
                      ? 'border-green-500/40 bg-green-500/10 text-green-400'
                      : quizAnswered && userChoice === false
                      ? 'border-red-500/40 bg-red-500/10 text-red-400'
                      : 'border-white/5 bg-white/2 hover:bg-white/5 text-white'
                  }`}
                >
                  False
                </button>
              </div>

              {/* Simple English: Explanation feedback display */}
              <AnimatePresence>
                {quizAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-300 leading-relaxed space-y-1"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-white">
                      <AlertCircle size={14} /> Explanation
                    </div>
                    <p>{activeArticle.quiz.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
