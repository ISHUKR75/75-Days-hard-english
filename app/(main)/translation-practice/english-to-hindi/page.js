'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import hook for page state management.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for responsive overlays.
import { ArrowLeft, CheckCircle2, AlertCircle, HelpCircle, Eye, Star } from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system triggers.

// Simple English: Definition of English-to-Hindi translation practice questions.
const TRANSLATION_SET = [
  { id: 1, english: 'I am waiting for your response.', hindi: 'मैं आपकी प्रतिक्रिया का इंतजार कर रहा हूँ।', alternatives: ['मैं आपके जवाब का इंतज़ार कर रहा हूँ।', 'मैं आपकी प्रतिक्रिया की प्रतीक्षा कर रहा हूँ।'], hint: 'Present Continuous (इंतजार कर रहा हूँ)' },
  { id: 2, english: 'We need to discuss this today.', hindi: 'हमें आज इस पर चर्चा करने की आवश्यकता है।', alternatives: ['हमें आज इस बारे में बात करनी होगी।', 'हमें आज इस पर चर्चा करनी चाहिए।'], hint: 'Necessity statement (आवश्यकता है / ज़रूरत है)' },
  { id: 3, english: 'Do not touch my files.', hindi: 'मेरी फाइलों को मत छुओ।', alternatives: ['मेरी फाइलों को मत छूना।', 'मेरी फाइलें मत छुओ।'], hint: 'Imperative warning (मत छुओ)' },
  { id: 4, english: 'He has been working here for two years.', hindi: 'वह यहाँ दो साल से काम कर रहा है।', alternatives: ['वह यहाँ दो वर्षों से काम कर रहा है।'], hint: 'Present Perfect Continuous (दो साल से काम कर रहा है)' }
];

export default function EnglishToHindiPage() {
  // Simple English: Track active sentence index.
  const [index, setIndex] = useState(0);
  // Simple English: Store user text translation entry.
  const [userInput, setUserInput] = useState('');
  // Simple English: Track if question check is completed.
  const [checked, setChecked] = useState(false);
  // Simple English: Track if user translation is correct.
  const [isCorrect, setIsCorrect] = useState(false);
  // Simple English: Track if user requested to show the hint.
  const [showHint, setShowHint] = useState(false);
  // Simple English: Store count of correct answers.
  const [score, setScore] = useState(0);

  const { addXP } = useUserStore(); // Simple English: Extract XP increment function.
  const activeItem = TRANSLATION_SET[index]; // Simple English: Current translation target object.

  // Simple English: Check user typed answer against correct and alternatives list.
  const handleCheckAnswer = () => {
    if (!userInput.trim()) return; // Simple English: Ignore if empty.

    // Simple English: Remove punctuation and trim whitespace for clean comparison.
    const cleanInput = userInput.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?।]/g,"");
    const cleanTarget = activeItem.hindi.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?।]/g,"");

    let matchFound = cleanInput === cleanTarget; // Simple English: Base string check.

    // Simple English: Look for matches inside alternative answers list.
    if (!matchFound && activeItem.alternatives) {
      matchFound = activeItem.alternatives
        .map(alt => alt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?।]/g,""))
        .includes(cleanInput);
    }

    setIsCorrect(matchFound); // Simple English: Set correctness status.
    setChecked(true); // Simple English: Lock inputs.

    if (matchFound) {
      setScore(s => s + 1); // Simple English: Add one to score.
      addXP(15); // Simple English: Reward 15 XP.
      playCorrect(); // Simple English: Play success chime.
    } else {
      playWrong(); // Simple English: Play error chime.
    }
  };

  // Simple English: Proceed to the next translation item.
  const handleNext = () => {
    setChecked(false); // Simple English: Unlock inputs.
    setUserInput(''); // Simple English: Reset input.
    setShowHint(false); // Simple English: Hide hint.
    if (index < TRANSLATION_SET.length - 1) {
      setIndex(i => i + 1); // Simple English: Move to next index.
    } else {
      setIndex(0); // Simple English: Reset to start.
      setScore(0); // Simple English: Reset score.
    }
  };

  return (
    // Simple English: Main layout page.
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Simple English: Back link to translation hub */}
      <Link href="/translation-practice" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Translation Practice
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-orange-600/10 via-amber-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>🇬🇧 ➡️ 🇮🇳</span> English to Hindi Translation
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Build direct Hindi interpretation skills! Read the English sentence, write the correct Hindi translation, and receive points.
        </p>
      </div>

      {/* Simple English: Responsive grid split columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - List of translation items */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Progress Index</h2>
          {TRANSLATION_SET.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                index === idx
                  ? 'border-orange-500/40 bg-orange-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500'
              }`}
            >
              <p className="text-xs">Sentence {item.id}</p>
              <p className="text-[10px] text-slate-400 mt-1 truncate">{item.english}</p>
            </div>
          ))}
        </div>

        {/* Simple English: Right Panel - Interactive card board */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Simple English: Statistics header */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Progress: {index + 1} of {TRANSLATION_SET.length}</span>
              <span>Correct: {score}/{TRANSLATION_SET.length}</span>
            </div>

            {/* Simple English: Display target English prompt */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-2 text-center">
              <span className="text-[10px] bg-orange-500/10 text-orange-300 px-2 py-0.5 rounded font-black uppercase">
                Translate this
              </span>
              <p className="text-2xl font-black text-white leading-relaxed mt-2">{activeItem.english}</p>
            </div>

            {/* Simple English: Translation input field */}
            <div className="space-y-2">
              <input
                type="text"
                disabled={checked}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Write your Hindi translation here..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          {/* Simple English: Active actions and explanation alerts */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            {/* Simple English: Display hint box */}
            {showHint && (
              <div className="p-3.5 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-300 flex items-start gap-1.5">
                <HelpCircle size={14} className="text-orange-400 shrink-0 mt-0.5" />
                <span>Hint: {activeItem.hint}</span>
              </div>
            )}

            {/* Simple English: Correct/Wrong feedback panel */}
            <AnimatePresence>
              {checked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className={`p-4 rounded-xl border ${
                    isCorrect
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  } space-y-1`}>
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {isCorrect ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {isCorrect ? 'Excellent Translation! (+15 XP)' : 'Needs Revision'}
                    </div>
                    <p className="text-xs text-white">Target Hindi: <span className="font-bold">{activeItem.hindi}</span></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {/* Simple English: Hint trigger button */}
              {!checked && (
                <button
                  onClick={() => {
                    setShowHint(true);
                    playSound('click');
                  }}
                  className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Eye size={16} />
                </button>
              )}

              {!checked ? (
                // Simple English: Submit translation check button.
                <button
                  disabled={!userInput.trim()}
                  onClick={handleCheckAnswer}
                  className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center"
                >
                  Submit Translation
                </button>
              ) : (
                // Simple English: Next exercise trigger button.
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10"
                >
                  {index === TRANSLATION_SET.length - 1 ? 'Finish & Reset' : 'Next Sentence'}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
