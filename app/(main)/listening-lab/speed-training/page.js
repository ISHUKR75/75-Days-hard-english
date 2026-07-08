'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard state hook.
import Link from 'next/link'; // Simple English: Import link navigation.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for overlays.
import { ArrowLeft, Volume2, HelpCircle, RefreshCw, CheckCircle2, AlertCircle, Play } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound trigger chimes.

// Simple English: Definition of the speed-adjusted listening practice items.
const SPEED_ITEMS = [
  { id: 1, text: 'The schedule has been changed to next Monday.', hint: 'Office calendar update.' },
  { id: 2, text: 'Could you tell me how to reach the railway station?', hint: 'Travel direction inquiry.' },
  { id: 3, text: 'I would like to order a double espresso with milk.', hint: 'Cafe drink order.' }
];

export default function SpeedTrainingPage() {
  // Simple English: Track index of active sentence.
  const [index, setIndex] = useState(0);
  // Simple English: Track speech playback rate (0.5 to 1.5).
  const [rate, setRate] = useState(1.0);
  // Simple English: Store user text input transcription.
  const [userInput, setUserInput] = useState('');
  // Simple English: Track if question check is completed.
  const [checked, setChecked] = useState(false);
  // Simple English: Track if user transcription matched target.
  const [isMatch, setIsMatch] = useState(false);
  // Simple English: Store count of correct attempts.
  const [score, setScore] = useState(0);

  const { addXP } = useUserStore(); // Simple English: Reward points hook.
  const activeItem = SPEED_ITEMS[index]; // Simple English: Active sentence reference.

  // Simple English: Play audio sentence at selected speech playback rate.
  const playAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Simple English: Cancel existing vocal tasks.
      const utterance = new SpeechSynthesisUtterance(activeItem.text);
      utterance.lang = 'en-US';
      utterance.rate = rate; // Simple English: Apply custom user speed rate.
      window.speechSynthesis.speak(utterance); // Simple English: Speak.
    }
  };

  // Simple English: Validate typed spelling against target.
  const handleCheckTranscription = () => {
    if (!userInput.trim()) return; // Simple English: Cancel if empty.

    // Simple English: Remove punctuation and spaces for comparison.
    const cleanTarget = activeItem.text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const cleanInput = userInput.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    const isCorrect = cleanInput === cleanTarget;
    setIsMatch(isCorrect);
    setChecked(true);

    if (isCorrect) {
      setScore(s => s + 1);
      addXP(10); // Simple English: Give 10 XP points.
      playCorrect(); // Simple English: Play success chime.
    } else {
      playWrong(); // Simple English: Play wrong sound.
    }
  };

  // Simple English: Go to next sentence.
  const handleNext = () => {
    setChecked(false);
    setUserInput('');
    setRate(1.0); // Simple English: Reset speed rate to 1x.
    if (index < SPEED_ITEMS.length - 1) {
      setIndex(i => i + 1); // Simple English: Go to next index.
    } else {
      setIndex(0); // Simple English: Restart.
      setScore(0); // Simple English: Reset correct attempts counter.
    }
  };

  return (
    // Simple English: Main layout wrapper.
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Simple English: Navigation back link */}
      <Link href="/listening-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Listening Lab
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-600/10 via-cyan-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>🏃‍♂️💨</span> Speed Listening Lab
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Train your ears to understand native speakers! Choose speed rates (from slow 0.5x to fast 1.5x), play the audio, and write what you hear.
        </p>
      </div>

      {/* Simple English: Responsive grid split columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - Speed rates picker */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Adjust Speed</h2>
          
          <div className="grid grid-cols-5 gap-1.5">
            {[0.5, 0.75, 1.0, 1.25, 1.5].map((speedValue) => (
              <button
                key={speedValue}
                onClick={() => {
                  setRate(speedValue);
                  playSound('click');
                }}
                className={`py-2 rounded-xl text-[10px] font-bold transition-all border ${
                  rate === speedValue
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    : 'text-slate-400 border-white/5 bg-white/2 hover:text-white'
                }`}
              >
                {speedValue}x
              </button>
            ))}
          </div>

          <div className="p-3 bg-white/2 rounded-xl border border-white/5 text-[10px] text-slate-400 leading-relaxed">
            <span className="font-bold text-white block mb-0.5">Tip:</span>
            Start at a slow rate (0.75x) to identify tough syllables, then try fast rate (1.5x) to build fluent understanding.
          </div>
        </div>

        {/* Simple English: Right Panel - Audio player and inputs */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Simple English: Statistics header */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Sentence {index + 1} of {SPEED_ITEMS.length}</span>
              <span>Score: {score}/{SPEED_ITEMS.length}</span>
            </div>

            {/* Simple English: Audio trigger block */}
            <div className="p-8 rounded-2xl bg-white/3 border border-white/5 text-center space-y-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest">Active speed: {rate}x</p>
              
              <button
                onClick={playAudio}
                className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center mx-auto transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                <Play size={24} />
              </button>
              
              <p className="text-xs text-slate-400">Tap to play audio at {rate}x speed</p>
            </div>

            {/* Simple English: Input text box */}
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase tracking-wider">Type the sentence:</label>
              <input
                type="text"
                disabled={checked}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Write target transcription here..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* Simple English: Action triggers and correction panels */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <AnimatePresence>
              {checked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className={`p-4 rounded-xl border ${
                    isMatch
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  } space-y-1`}>
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {isMatch ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                      {isMatch ? 'Excellent Listening!' : 'Transcription mismatch'}
                    </div>
                    <p className="text-xs text-white">Target Sentence: <span className="font-bold font-mono">{activeItem.text}</span></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {!checked ? (
                // Simple English: Submit transcription check button.
                <button
                  disabled={!userInput.trim()}
                  onClick={handleCheckTranscription}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Check Transcription
                </button>
              ) : (
                // Simple English: Next exercise trigger button.
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10"
                >
                  {index === SPEED_ITEMS.length - 1 ? 'Finish & Reset' : 'Next Sentence'}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
