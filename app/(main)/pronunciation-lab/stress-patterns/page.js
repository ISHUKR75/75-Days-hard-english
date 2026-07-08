'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import hook to manage active rules tabs and quiz states.
import Link from 'next/link'; // Simple English: Import Link for back navigation.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for screen transitions.
import { ArrowLeft, Volume2, HelpCircle, Check, X, BookOpen, AlertCircle } from 'lucide-react'; // Simple English: Import icons.
import { playCorrect, playWrong } from '@/lib/sounds'; // Simple English: Import correct/wrong game sound indicators.

// Simple English: Definition of word stress rules with examples and stress breakdown.
const STRESS_RULES = [
  {
    title: 'Noun vs Verb Shift',
    desc: 'Many 2-syllable words place stress on the 1st syllable when acting as a Noun, but shift to the 2nd syllable when acting as a Verb!',
    examples: [
      { word: 'present', nounStress: 'PRE-sent', verbStress: 'pre-SENT', nounMeaning: 'A gift (उपहार)', verbMeaning: 'To show (प्रस्तुत करना)' },
      { word: 'record', nounStress: 'RE-cord', verbStress: 're-CORD', nounMeaning: 'A file/data (दस्तावेज़)', verbMeaning: 'To save audio/video (रिकॉर्ड करना)' },
      { word: 'object', nounStress: 'OB-ject', verbStress: 'ob-JECT', nounMeaning: 'A physical thing (वस्तु)', verbMeaning: 'To disagree (आपत्ति करना)' }
    ]
  },
  {
    title: 'Ending Suffix Rules',
    desc: 'Words ending in suffixes like "-ion", "-ic", or "-ical" almost always place the main stress on the syllable right before the suffix!',
    examples: [
      { word: 'decision', stress: 'de-CI-sion', meaning: 'Choice made (निर्णय)' },
      { word: 'artistic', stress: 'ar-TIS-tic', meaning: 'Creative skill (कलात्मक)' },
      { word: 'education', stress: 'edu-CA-tion', meaning: 'Teaching/knowledge (शिक्षा)' }
    ]
  }
];

// Simple English: Definition of word stress quiz questions.
const QUIZ_QUESTIONS = [
  {
    word: 'photographer',
    options: ['PHO-tographer', 'pho-TOG-rapher', 'photo-GRA-pher'],
    correctIndex: 1,
    explanation: 'For words ending in "-er", the stress usually lands on the second syllable: pho-TOG-ra-pher.'
  },
  {
    word: 'banana',
    options: ['BA-nana', 'ba-NA-na', 'bana-NA'],
    correctIndex: 1,
    explanation: 'Banana is pronounced as ba-NA-na, putting the emphasis on the middle syllable.'
  },
  {
    word: 'democracy',
    options: ['DE-mocracy', 'de-MOC-racy', 'democ-RA-cy'],
    correctIndex: 1,
    explanation: 'Words ending in "-acy", "-ogy", or "-ity" stress the third syllable from the end: de-MOC-ra-cy.'
  }
];

export default function StressPatternsPage() {
  // Simple English: Track currently selected rule tab.
  const [activeRuleIndex, setActiveRuleIndex] = useState(0);
  // Simple English: Track active quiz question index.
  const [quizIndex, setQuizIndex] = useState(0);
  // Simple English: Track if user answered the active question.
  const [hasAnswered, setHasAnswered] = useState(false);
  // Simple English: Track index of user selected answer option.
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  // Simple English: Track if user choice was correct.
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  // Simple English: Track cumulative correct quiz answers.
  const [score, setScore] = useState(0);

  // Simple English: Trigger voice synthesis to speak words with natural emphasis.
  const speakWord = (textToSpeak) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Simple English: Cancel previous voices.
      const utterance = new SpeechSynthesisUtterance(textToSpeak); // Simple English: Create utterance.
      utterance.lang = 'en-US'; // Simple English: Set American english voice accent.
      utterance.rate = 0.85; // Simple English: Set slightly slower speed rate to clearly highlight stress.
      window.speechSynthesis.speak(utterance); // Simple English: Trigger play.
    }
  };

  // Simple English: Handle selection of a quiz option.
  const handleQuizAnswer = (optionIdx) => {
    if (hasAnswered) return; // Simple English: Ignore if already answered.
    setSelectedOptionIndex(optionIdx); // Simple English: Record chosen index.
    const isCorrect = optionIdx === QUIZ_QUESTIONS[quizIndex].correctIndex; // Simple English: Compare with correct index.
    setIsAnswerCorrect(isCorrect); // Simple English: Update status.
    setHasAnswered(true); // Simple English: Set answered flag.

    if (isCorrect) {
      setScore(s => s + 1); // Simple English: Increment user score.
      playCorrect(); // Simple English: Play success chime.
    } else {
      playWrong(); // Simple English: Play error buzzer.
    }
  };

  // Simple English: Advance to the next quiz question.
  const handleNextQuestion = () => {
    setHasAnswered(false); // Simple English: Reset answer flag.
    setSelectedOptionIndex(null); // Simple English: Clear selected choice.
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(q => q + 1); // Simple English: Go to next question.
    } else {
      setQuizIndex(0); // Simple English: Restart quiz if complete.
      setScore(0); // Simple English: Reset score.
    }
  };

  return (
    // Simple English: Outer responsive page container.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Navigation link back to Pronunciation Lab dashboard */}
      <Link href="/pronunciation-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Pronunciation Lab
      </Link>

      {/* Simple English: Bento-style page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-600/10 via-pink-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>⚡</span> Syllable Word Stress
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Word stress is the magic key to natural English pronunciation! 
          Learn which parts of words to speak louder and test your skills.
        </p>
      </div>

      {/* Simple English: Bento double column arrangement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Simple English: Left Column - Stress Rules list */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <BookOpen className="text-purple-400" size={20} />
            <h2>Learn the Rules</h2>
          </div>

          {/* Simple English: Tabs selector */}
          <div className="flex gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
            {STRESS_RULES.map((rule, idx) => (
              <button
                key={rule.title}
                onClick={() => setActiveRuleIndex(idx)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeRuleIndex === idx
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {rule.title}
              </button>
            ))}
          </div>

          {/* Simple English: Rule Description */}
          <p className="text-sm text-slate-400 bg-white/2 p-3 rounded-xl border border-white/5 leading-relaxed">
            {STRESS_RULES[activeRuleIndex].desc}
          </p>

          {/* Simple English: Rule Examples display */}
          <div className="space-y-3">
            {STRESS_RULES[activeRuleIndex].examples.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/5 flex flex-col gap-2 hover:bg-white/5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-white capitalize">{item.word}</span>
                  <button
                    onClick={() => speakWord(item.word)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
                
                {/* Simple English: Shifting Stress display */}
                {item.nounStress ? (
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-500">Noun stress:</p>
                      <button onClick={() => speakWord(item.word)} className="font-bold text-purple-300 hover:underline">{item.nounStress}</button>
                      <p className="text-[10px] text-slate-400 italic mt-0.5">{item.nounMeaning}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Verb stress:</p>
                      <button onClick={() => speakWord(item.word)} className="font-bold text-pink-300 hover:underline">{item.verbStress}</button>
                      <p className="text-[10px] text-slate-400 italic mt-0.5">{item.verbMeaning}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs">
                    <p className="text-slate-500">Stress pattern:</p>
                    <button onClick={() => speakWord(item.word)} className="font-bold text-purple-300 hover:underline">{item.stress}</button>
                    <p className="text-[10px] text-slate-400 italic mt-0.5">{item.meaning}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simple English: Right Column - Stress Quiz */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-white font-bold text-lg">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-pink-400" size={20} />
              <h2>Stress Challenge</h2>
            </div>
            <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-md">
              Score: {score}/{QUIZ_QUESTIONS.length}
            </span>
          </div>

          {/* Simple English: Question display area */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-white/3 to-transparent border border-white/5 text-center space-y-4">
            <p className="text-xs text-slate-500 uppercase tracking-widest">Identify the stressed syllable</p>
            <h3 className="text-3xl font-black text-white capitalize tracking-wide">{QUIZ_QUESTIONS[quizIndex].word}</h3>
            
            <button
              onClick={() => speakWord(QUIZ_QUESTIONS[quizIndex].word)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-2 mx-auto transition-all"
            >
              <Volume2 size={12} /> Play Word Audio
            </button>
          </div>

          {/* Simple English: Options buttons */}
          <div className="space-y-2">
            {QUIZ_QUESTIONS[quizIndex].options.map((opt, oIdx) => {
              let optStyle = 'border-white/5 bg-white/2 hover:bg-white/5 text-slate-300';
              if (hasAnswered) {
                if (oIdx === QUIZ_QUESTIONS[quizIndex].correctIndex) {
                  optStyle = 'border-green-500/40 bg-green-500/10 text-green-400';
                } else if (oIdx === selectedOptionIndex) {
                  optStyle = 'border-red-500/40 bg-red-500/10 text-red-400';
                } else {
                  optStyle = 'border-white/5 bg-white/2 opacity-30';
                }
              }
              return (
                <button
                  key={opt}
                  disabled={hasAnswered}
                  onClick={() => handleQuizAnswer(oIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-bold transition-all flex items-center justify-between ${optStyle}`}
                >
                  <span>{opt}</span>
                  {hasAnswered && oIdx === QUIZ_QUESTIONS[quizIndex].correctIndex && <Check size={16} />}
                  {hasAnswered && oIdx === selectedOptionIndex && oIdx !== QUIZ_QUESTIONS[quizIndex].correctIndex && <X size={16} />}
                </button>
              );
            })}
          </div>

          {/* Simple English: Explanation feedback display */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-2"
              >
                <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                    <AlertCircle size={14} /> Explanation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {QUIZ_QUESTIONS[quizIndex].explanation}
                  </p>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  {quizIndex === QUIZ_QUESTIONS.length - 1 ? 'Finish & Reset' : 'Next Question'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
