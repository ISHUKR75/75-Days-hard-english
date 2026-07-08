'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard state hook.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for success overlays.
import { ArrowLeft, Volume2, HelpCircle, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track and reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound trigger chimes.

// Simple English: Definition of the dictation practice audio sets.
const DICTATION_ITEMS = [
  { id: 1, text: 'Please send me the report by Friday afternoon.', hint: 'Office deadline request.', translation: 'कृपया मुझे शुक्रवार दोपहर तक रिपोर्ट भेजें।' },
  { id: 2, text: 'We need to focus on customer satisfaction to grow our brand.', hint: 'Business growth advice.', translation: 'हमें अपने ब्रांड को बढ़ाने के लिए ग्राहक संतुष्टि पर ध्यान केंद्रित करने की आवश्यकता है।' },
  { id: 3, text: 'Could you repeat that sentence again, please?', hint: 'Polite telephone ask.', translation: 'क्या आप कृपया उस वाक्य को फिर से दोहरा सकते हैं?' },
  { id: 4, text: 'I am planning to attend the conference next week.', hint: 'Speaking about future schedule.', translation: 'मैं अगले सप्ताह सम्मेलन में भाग लेने की योजना बना रहा हूँ।' }
];

export default function DictationPage() {
  // Simple English: Track index of active target sentence.
  const [index, setIndex] = useState(0);
  // Simple English: Store user text input.
  const [userInput, setUserInput] = useState('');
  // Simple English: Track if question is validated.
  const [checked, setChecked] = useState(false);
  // Simple English: Track if user input matched target sentence.
  const [isMatch, setIsMatch] = useState(false);
  // Simple English: Store count of correct attempts.
  const [score, setScore] = useState(0);

  const { addXP } = useUserStore(); // Simple English: Extract XP rewards function.
  const activeItem = DICTATION_ITEMS[index]; // Simple English: Active dictation text object.

  // Simple English: Pronounce dictation target text using browser SpeechSynthesis.
  const playAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Simple English: Stop previous vocals.
      const utterance = new SpeechSynthesisUtterance(activeItem.text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Simple English: Slightly slower so users can catch individual word spelling details.
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple English: Validate typed spelling against target.
  const handleCheckSpelling = () => {
    if (!userInput.trim()) return; // Simple English: Ignore if blank.

    // Simple English: Remove punctuation and trailing spaces for clean comparison.
    const cleanTarget = activeItem.text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const cleanInput = userInput.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    const isMatchCorrect = cleanInput === cleanTarget; // Simple English: Compare strings.
    setIsMatch(isMatchCorrect); // Simple English: Update status.
    setChecked(true); // Simple English: Lock input.

    if (isMatchCorrect) {
      setScore(s => s + 1); // Simple English: Increment correct score.
      addXP(10); // Simple English: Give 10 XP.
      playCorrect(); // Simple English: Play correct sound.
    } else {
      playWrong(); // Simple English: Play wrong sound.
    }
  };

  // Simple English: Move to next dictation set.
  const handleNext = () => {
    setChecked(false); // Simple English: Reset checked status.
    setUserInput(''); // Simple English: Clear typed text input.
    if (index < DICTATION_ITEMS.length - 1) {
      setIndex(i => i + 1); // Simple English: Move to next sentence.
    } else {
      setIndex(0); // Simple English: Reset to start.
      setScore(0); // Simple English: Reset correct attempts counter.
    }
  };

  return (
    // Simple English: Main layout wrapper.
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Simple English: Navigation link back to listening lab */}
      <Link href="/listening-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Listening Lab
      </Link>

      {/* Simple English: Bento-style page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-600/10 via-cyan-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>🎧</span> Dictation Lab
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Train your active listening skills! Click the audio trigger, listen carefully, and write down the exact sentence with spelling accuracy.
        </p>
      </div>

      {/* Simple English: Dynamic card content container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - List of assignments */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Dictation Exercises</h2>
          {DICTATION_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                index === idx
                  ? 'border-blue-500/40 bg-blue-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500'
              }`}
            >
              <p className="text-xs">Exercise {item.id}</p>
              <p className="text-[10px] text-slate-400 mt-1 truncate">{item.hint}</p>
            </div>
          ))}
        </div>

        {/* Simple English: Right Panel - Interactive dictation board */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Simple English: Header statistics row */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Question {index + 1} of {DICTATION_ITEMS.length}</span>
              <span>Score: {score}/{DICTATION_ITEMS.length}</span>
            </div>

            {/* Simple English: Giant Audio trigger card */}
            <div className="p-8 rounded-2xl bg-white/3 border border-white/5 text-center space-y-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest">Listen to the speaker</p>
              
              <button
                onClick={playAudio}
                className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center mx-auto transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                <Volume2 size={24} />
              </button>
              
              <p className="text-xs text-slate-400">Click the button above to play/replay</p>
            </div>

            {/* Simple English: Input text box */}
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Type what you hear:</label>
              <input
                type="text"
                disabled={checked}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Write the sentence here..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* Simple English: Action triggers and correction feedback overlays */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <AnimatePresence>
              {checked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className={`p-4 rounded-xl border ${
                    isMatch
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  } space-y-2`}>
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {isMatch ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {isMatch ? 'Excellent! Perfect Spelling' : 'Spelling mismatch'}
                    </div>
                    <p className="text-xs text-white">Correct Text: <span className="font-bold font-mono">{activeItem.text}</span></p>
                    <p className="text-[10px] text-slate-400 italic">Hindi Meaning: {activeItem.translation}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {!checked ? (
                // Simple English: Submit checking trigger button.
                <button
                  disabled={!userInput.trim()}
                  onClick={handleCheckSpelling}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Check Spelling
                </button>
              ) : (
                // Simple English: Next exercise trigger button.
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10"
                >
                  {index === DICTATION_ITEMS.length - 1 ? 'Finish & Reset' : 'Next Exercise'}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
