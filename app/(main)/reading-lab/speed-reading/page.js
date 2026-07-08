'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState, useEffect, useRef } from 'react'; // Simple English: Import standard hooks.
import Link from 'next/link'; // Simple English: Import link navigation.
import { motion } from 'framer-motion'; // Simple English: Import Framer Motion for animations.
import { ArrowLeft, Play, Pause, RotateCcw, FastForward, CheckCircle, Zap, Star } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import store to reward XP.
import { playCorrect, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: Definition of reading passages.
const PASSAGES = [
  {
    id: 1,
    title: 'The Future of AI Technology',
    text: 'Artificial Intelligence is transforming the way we learn, communicate, and work. In the coming years, advanced systems will assist teachers, doctors, and engineers worldwide, helping humanity solve complex problems efficiently and securely.'
  },
  {
    id: 2,
    title: 'Daily Communication Success',
    text: 'Speaking English with confidence does not require complex vocabulary. Clear pronunciation, active listening, and simple grammar are the most important elements for successful daily conversation in any international setting.'
  }
];

export default function SpeedReadingPage() {
  // Simple English: Track active text passage.
  const [passageIdx, setPassageIdx] = useState(0);
  // Simple English: Track target speed rate (Words Per Minute).
  const [wpm, setWpm] = useState(300);
  // Simple English: Track if speed reading ticker is running.
  const [isPlaying, setIsPlaying] = useState(false);
  // Simple English: Active word index tracker.
  const [wordIndex, setWordIndex] = useState(0);
  // Simple English: Store list of words split from passage.
  const [words, setWords] = useState([]);

  const timerRef = useRef(null); // Simple English: Reference to hold the tick interval.
  const { addXP } = useUserStore(); // Simple English: User store functions.

  const activePassage = PASSAGES[passageIdx]; // Simple English: Active passage object.

  // Simple English: Split passage text into words when it changes.
  useEffect(() => {
    const splitWords = activePassage.text.split(/\s+/); // Simple English: Split by whitespace.
    setWords(splitWords);
    setWordIndex(0); // Simple English: Reset to start.
    setIsPlaying(false); // Simple English: Pause ticker.
  }, [passageIdx]);

  // Simple English: Core ticking clock mechanism to cycle words.
  useEffect(() => {
    if (isPlaying) {
      // Simple English: Compute interval duration in milliseconds based on WPM.
      const intervalMs = (60 / wpm) * 1000;
      
      timerRef.current = setInterval(() => {
        setWordIndex((prevIndex) => {
          if (prevIndex < words.length - 1) {
            return prevIndex + 1; // Simple English: Go to next word.
          } else {
            // Simple English: If reading finishes, stop clock and reward user.
            setIsPlaying(false);
            clearInterval(timerRef.current);
            addXP(15); // Simple English: Give 15 XP.
            playCorrect(); // Simple English: Play success chime.
            return prevIndex;
          }
        });
      }, intervalMs);
    } else {
      // Simple English: Clear interval if paused.
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      // Simple English: Clean up clock on component unmount.
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, wpm, words]);

  // Simple English: Trigger play/pause status.
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playSound('click');
  };

  // Simple English: Restart reading word list back to start.
  const restartReading = () => {
    setIsPlaying(false);
    setWordIndex(0);
    playSound('click');
  };

  // Simple English: Format word to highlight Optimal Recognition Point (ORP) in red.
  const getFormattedWord = (wordStr) => {
    if (!wordStr) return '';
    // Simple English: Find middle character offset.
    const centerIdx = Math.floor(wordStr.length / 3);
    const startStr = wordStr.slice(0, centerIdx); // Simple English: Left side of word.
    const highlightChar = wordStr[centerIdx]; // Simple English: Target center character.
    const endStr = wordStr.slice(centerIdx + 1); // Simple English: Right side of word.

    return (
      <span className="font-mono text-white text-5xl font-black select-none">
        {startStr}
        <span className="text-red-500">{highlightChar}</span>
        {endStr}
      </span>
    );
  };

  return (
    // Simple English: Main layout wrapper.
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Simple English: Navigation back link */}
      <Link href="/reading-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Reading Lab
      </Link>

      {/* Simple English: Bento-style header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-red-600/10 via-orange-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>⚡</span> Speed Reading Lab
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Train your brain to read up to 3x faster without vocalizing words in your head! Focus on the highlighted character in the center.
        </p>
      </div>

      {/* Simple English: Responsive layout columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - Passage selection list */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Reading Passages</h2>
          {PASSAGES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setPassageIdx(idx)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                passageIdx === idx
                  ? 'border-red-500/40 bg-red-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500 hover:bg-white/5'
              }`}
            >
              <p className="text-xs font-bold">{p.title}</p>
              <p className="text-[10px] text-slate-400 mt-1 truncate">{p.text}</p>
            </button>
          ))}

          {/* Simple English: Speed rate configurations selection */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <label className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Speed: {wpm} WPM</label>
            <div className="grid grid-cols-4 gap-1">
              {[200, 300, 450, 600].map((speed) => (
                <button
                  key={speed}
                  onClick={() => {
                    setWpm(speed);
                    playSound('click');
                  }}
                  className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    wpm === speed
                      ? 'bg-red-500/20 text-red-300 border border-red-500/25'
                      : 'text-slate-400 bg-white/5 hover:text-white'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Simple English: Right Panel - Giant RSVP reader view */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl md:col-span-2 flex flex-col justify-between min-h-[350px]">
          
          {/* Simple English: Header statistics row */}
          <div className="flex justify-between items-center text-xs text-slate-400 shrink-0">
            <span className="font-bold text-red-300">{activePassage.title}</span>
            <span>Word {wordIndex + 1} of {words.length}</span>
          </div>

          {/* Simple English: Speed reading active box displaying one word at a time */}
          <div className="flex-1 flex items-center justify-center relative py-12">
            {/* Simple English: Center focus markers guides */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-red-500/10 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-500/10 pointer-events-none" />
            
            <div className="z-10 bg-white/2 px-8 py-10 rounded-2xl border border-white/5 shadow-2xl min-w-[280px] text-center">
              {words.length > 0 && getFormattedWord(words[wordIndex])}
            </div>
          </div>

          {/* Simple English: Bottom action triggers */}
          <div className="space-y-4 shrink-0">
            {/* Simple English: Visual Progress bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-100"
                style={{ width: `${((wordIndex + 1) / words.length) * 100}%` }}
              />
            </div>

            {/* Simple English: Control triggers bar */}
            <div className="flex gap-4">
              <button
                onClick={restartReading}
                className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center"
              >
                <RotateCcw size={16} />
              </button>

              <button
                onClick={togglePlay}
                className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause size={16} /> Pause Reading
                  </>
                ) : (
                  <>
                    <Play size={16} /> Start Reading
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
