'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard state hook.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for overlays.
import { ArrowLeft, Volume2, HelpCircle, Check, X, Award, Star } from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: List of Word of the Day datasets.
const WORDS = [
  {
    word: 'eloquent',
    ipa: '/ˈel.ə.kwənt/',
    cefr: 'C1',
    hindi: 'सुवक्ता (Suvakta) / मधुरभाषी',
    definition: 'Fluent or persuasive in speaking or writing.',
    synonyms: ['articulate', 'persuasive', 'fluent'],
    antonyms: ['inarticulate', 'silent'],
    sentence: 'She gave an _______ speech that moved the entire audience.',
    hint: 'Starts with "el..." and means speaking beautifully.'
  },
  {
    word: 'resilient',
    ipa: '/rɪˈzɪl.jənt/',
    cefr: 'B2',
    hindi: 'लचीला (Lacheela) / स्थितिस्थापक',
    definition: 'Able to withstand or recover quickly from difficult conditions.',
    synonyms: ['strong', 'tough', 'flexible'],
    antonyms: ['weak', 'fragile'],
    sentence: 'He is _______ enough to handle any business challenge.',
    hint: 'Starts with "re..." and means recovering quickly.'
  }
];

export default function WordOfTheDayPage() {
  // Simple English: Track index of current Word of the Day.
  const [index, setIndex] = useState(0);
  // Simple English: Store user text sentence input.
  const [userInput, setUserInput] = useState('');
  // Simple English: Track if user clicked check.
  const [checked, setChecked] = useState(false);
  // Simple English: Track if user input is correct.
  const [isCorrect, setIsCorrect] = useState(false);
  // Simple English: Track if user requested to show hint.
  const [showHint, setShowHint] = useState(false);

  const { addXP } = useUserStore(); // Simple English: Pull XP reward function.
  const activeWord = WORDS[index]; // Simple English: Current word object.

  // Simple English: Speak the word of the day using SpeechSynthesis.
  const speakWord = (phrase) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple English: Validate word entry.
  const handleCheckAnswer = () => {
    if (!userInput.trim()) return; // Simple English: Ignore if empty.

    const correct = userInput.trim().toLowerCase() === activeWord.word.toLowerCase();
    setIsCorrect(correct);
    setChecked(true);

    if (correct) {
      addXP(10); // Simple English: Give 10 XP points.
      playCorrect(); // Simple English: Play success sound.
    } else {
      playWrong(); // Simple English: Play error sound.
    }
  };

  // Simple English: Toggle word index resets.
  const handleNextWord = () => {
    setChecked(false);
    setUserInput('');
    setShowHint(false);
    if (index < WORDS.length - 1) {
      setIndex(i => i + 1); // Simple English: Move to next word.
    } else {
      setIndex(0); // Simple English: Restart.
    }
    playSound('click');
  };

  return (
    // Simple English: Main layout page.
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Simple English: Navigation back link */}
      <Link href="/vocabulary" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Vocabulary Bank
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-cyan-600/10 via-sky-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>🧠🌟</span> Word of the Day
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Expand your vocabulary daily! Read the definition, listen to pronunciation, and practice using the word in a sentence challenge.
        </p>
      </div>

      {/* Simple English: Responsive grid split columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - Vocabulary definition details */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4 md:col-span-1">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded">
              CEFR {activeWord.cefr}
            </span>
            <button
              onClick={() => speakWord(activeWord.word)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
            >
              <Volume2 size={14} />
            </button>
          </div>

          <div className="text-center py-3">
            <h2 className="text-3xl font-black text-white capitalize">{activeWord.word}</h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">{activeWord.ipa}</p>
            <p className="text-xs text-cyan-400 mt-2">{activeWord.hindi}</p>
          </div>

          <div className="space-y-3 pt-3 border-t border-white/5 text-xs text-slate-300">
            <div>
              <span className="font-bold text-white block">Definition:</span>
              <p className="text-slate-400 mt-1">{activeWord.definition}</p>
            </div>
            <div>
              <span className="font-bold text-white block">Synonyms:</span>
              <p className="text-slate-400 mt-1">{activeWord.synonyms.join(', ')}</p>
            </div>
            <div>
              <span className="font-bold text-white block">Antonyms:</span>
              <p className="text-slate-400 mt-1">{activeWord.antonyms.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Simple English: Right Panel - Interactive sentence challenge */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between min-h-[350px]">
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sentence Challenge</h2>

            <div className="p-6 rounded-2xl bg-white/3 border border-white/5 text-center space-y-3">
              <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-black uppercase">
                Fill in the blank
              </span>
              <p className="text-lg font-bold text-white leading-relaxed mt-2">
                {activeWord.sentence}
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                disabled={checked}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the word of the day..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-cyan-500/50 text-center"
              />
            </div>
          </div>

          {/* Simple English: Actions and alerts */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            {showHint && (
              <div className="p-3.5 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-300">
                <span>Hint: {activeWord.hint}</span>
              </div>
            )}

            <AnimatePresence>
              {checked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className={`p-4 rounded-xl border text-xs text-center font-bold ${
                    isCorrect
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}>
                    {isCorrect ? 'Correct! Well done (+10 XP)' : `Incorrect. The word was "${activeWord.word}"`}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {!checked && (
                <button
                  onClick={() => {
                    setShowHint(true);
                    playSound('click');
                  }}
                  className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Need Hint
                </button>
              )}

              {!checked ? (
                // Simple English: Submit word check button.
                <button
                  disabled={!userInput.trim()}
                  onClick={handleCheckAnswer}
                  className="flex-1 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Submit Word
                </button>
              ) : (
                // Simple English: Next word trigger button.
                <button
                  onClick={handleNextWord}
                  className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10"
                >
                  Next Word
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
