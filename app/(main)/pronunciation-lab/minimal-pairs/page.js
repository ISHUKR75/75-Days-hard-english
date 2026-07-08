'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import hook to manage state for active pair and quiz.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for bento animations.
import { ArrowLeft, Volume2, HelpCircle, Check, X, Award, Info, RefreshCw } from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user profile store to record points.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound trigger chimes.

// Simple English: Definition of core English minimal pairs datasets.
const MINIMAL_PAIRS = [
  { id: 1, soundA: 'ship', soundB: 'sheep', symbolA: '/ɪ/', symbolB: '/iː/', desc: 'Short /ɪ/ in "ship" vs Long /iː/ in "sheep".' },
  { id: 2, soundA: 'wet', soundB: 'vet', symbolA: '/w/', symbolB: '/v/', desc: 'Rounded lips /w/ in "wet" vs Teeth on lip /v/ in "vet".' },
  { id: 3, soundA: 'sit', soundB: 'seat', symbolA: '/ɪ/', symbolB: '/iː/', desc: 'Relaxed short /ɪ/ in "sit" vs Tense long /iː/ in "seat".' },
  { id: 4, soundA: 'think', soundB: 'sink', symbolA: '/θ/', symbolB: '/s/', desc: 'Tongue-between-teeth /θ/ in "think" vs Hissing /s/ in "sink".' },
  { id: 5, soundA: 'bad', soundB: 'bed', symbolA: '/æ/', symbolB: '/e/', desc: 'Low wide jaw /æ/ in "bad" vs Mid open jaw /e/ in "bed".' },
  { id: 6, soundA: 'fan', soundB: 'pan', symbolA: '/f/', symbolB: '/p/', desc: 'Blowing air /f/ in "fan" vs Pop of lips /p/ in "pan".' }
];

export default function MinimalPairsPage() {
  // Simple English: Track index of selected minimal pair.
  const [activeIdx, setActiveIdx] = useState(0);
  // Simple English: Track active quiz question index.
  const [quizIdx, setQuizIdx] = useState(0);
  // Simple English: Track if user answered the active quiz question.
  const [hasAnswered, setHasAnswered] = useState(false);
  // Simple English: Track user selected word choice.
  const [chosenWord, setChosenWord] = useState('');
  // Simple English: Track if correct choice was made.
  const [isCorrectChoice, setIsCorrectChoice] = useState(false);
  // Simple English: Store cumulative correct quiz answers.
  const [score, setScore] = useState(0);
  // Simple English: Track which word will be played by speaker.
  const [targetQuizWord, setTargetQuizWord] = useState(MINIMAL_PAIRS[0].soundA);

  const { addXP } = useUserStore(); // Simple English: Pull profile XP functions.
  const activePair = MINIMAL_PAIRS[activeIdx]; // Simple English: Active pair dataset reference.

  // Simple English: Pronounce a word using browser voice synthesis.
  const speakWord = (wordText) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Simple English: Cancel other active speech tasks.
      const utterance = new SpeechSynthesisUtterance(wordText); // Simple English: Create utterance.
      utterance.lang = 'en-US'; // Simple English: Set American voice accent.
      utterance.rate = 0.8; // Simple English: Slower speed to clarify pronunciation differences.
      window.speechSynthesis.speak(utterance); // Simple English: Trigger speaker.
    }
  };

  // Simple English: Select a random word from the current pair and play it for quiz.
  const playQuizAudio = () => {
    const pair = MINIMAL_PAIRS[quizIdx]; // Simple English: Active pair for quiz.
    const chosenTarget = Math.random() > 0.5 ? pair.soundA : pair.soundB; // Simple English: Pick A or B randomly.
    setTargetQuizWord(chosenTarget); // Simple English: Save target word in state.
    speakWord(chosenTarget); // Simple English: Pronounce chosen target word.
    setHasAnswered(false); // Simple English: Reset answered flag.
    setChosenWord(''); // Simple English: Reset selected choice.
  };

  // Simple English: Validate user selection against target.
  const handleAnswerSelect = (wordSelected) => {
    if (hasAnswered) return; // Simple English: Skip if already checked.
    setChosenWord(wordSelected); // Simple English: Record chosen option.
    const correct = wordSelected === targetQuizWord; // Simple English: Match check.
    setIsCorrectChoice(correct); // Simple English: Update correctness.
    setHasAnswered(true); // Simple English: Set checked status.

    if (correct) {
      setScore(s => s + 1); // Simple English: Increment user score.
      addXP(10); // Simple English: Reward 10 XP points.
      playCorrect(); // Simple English: Play success chime.
    } else {
      playWrong(); // Simple English: Play wrong sound.
    }
  };

  // Simple English: Proceed to the next quiz pair.
  const handleNextQuiz = () => {
    setHasAnswered(false); // Simple English: Reset checked status.
    setChosenWord(''); // Simple English: Reset chosen word.
    if (quizIdx < MINIMAL_PAIRS.length - 1) {
      setQuizIdx(q => q + 1); // Simple English: Go to next question.
    } else {
      setQuizIdx(0); // Simple English: Restart from start.
      setScore(0); // Simple English: Reset points.
    }
  };

  return (
    // Simple English: Outer layout wrapper.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Back link to pronunciation lab */}
      <Link href="/pronunciation-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Pronunciation Lab
      </Link>

      {/* Simple English: Bento-style page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-teal-600/10 via-cyan-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>👂</span> Minimal Pairs Training
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Learn to distinguish similar sounding English words. Tap words to hear differences and test your listening accuracy!
        </p>
      </div>

      {/* Simple English: Responsive layout columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Simple English: Left Panel - Minimal Pairs visual inspector */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Info className="text-teal-400" size={20} />
            <h2>Interactive Comparison</h2>
          </div>

          {/* Simple English: Horizontal mini tabs selector */}
          <div className="flex flex-wrap gap-2">
            {MINIMAL_PAIRS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIdx(idx);
                  playSound('click');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  activeIdx === idx
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                    : 'text-slate-400 border-white/5 bg-white/2 hover:text-white'
                }`}
              >
                {item.soundA} / {item.soundB}
              </button>
            ))}
          </div>

          {/* Simple English: Description tip display */}
          <p className="text-xs text-slate-400 bg-white/2 p-3 rounded-xl border border-white/5 leading-relaxed">
            {activePair.desc}
          </p>

          {/* Simple English: Visual comparison row */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            
            {/* Simple English: Word A block card */}
            <div className="p-5 rounded-2xl bg-white/3 border border-white/5 text-center space-y-3">
              <span className="text-[10px] bg-teal-500/15 text-teal-300 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                {activePair.symbolA}
              </span>
              <h3 className="text-2xl font-black text-white capitalize pt-1">{activePair.soundA}</h3>
              <button
                onClick={() => speakWord(activePair.soundA)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center mx-auto transition-all"
              >
                <Volume2 size={16} />
              </button>
            </div>

            {/* Simple English: Word B block card */}
            <div className="p-5 rounded-2xl bg-white/3 border border-white/5 text-center space-y-3">
              <span className="text-[10px] bg-cyan-500/15 text-cyan-300 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                {activePair.symbolB}
              </span>
              <h3 className="text-2xl font-black text-white capitalize pt-1">{activePair.soundB}</h3>
              <button
                onClick={() => speakWord(activePair.soundB)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center mx-auto transition-all"
              >
                <Volume2 size={16} />
              </button>
            </div>

          </div>
        </div>

        {/* Simple English: Right Panel - Listening Choice Quiz */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-white font-bold text-lg">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-cyan-400" size={20} />
              <h2>Listening Challenge</h2>
            </div>
            <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-md">
              Score: {score}/{MINIMAL_PAIRS.length}
            </span>
          </div>

          {/* Simple English: Play audio widget */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-white/3 to-transparent border border-white/5 text-center space-y-4">
            <p className="text-xs text-slate-500 uppercase tracking-widest">Listen to the spoken word</p>
            <button
              onClick={playQuizAudio}
              className="w-14 h-14 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center mx-auto transition-all shadow-lg shadow-cyan-600/10 active:scale-95"
            >
              <Volume2 size={20} />
            </button>
            <p className="text-xs text-slate-400">Click the button above to play audio</p>
          </div>

          {/* Simple English: Selection options grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[MINIMAL_PAIRS[quizIdx].soundA, MINIMAL_PAIRS[quizIdx].soundB].map((word) => {
              let optStyle = 'border-white/5 bg-white/2 hover:bg-white/5 text-slate-300';
              if (hasAnswered) {
                if (word === targetQuizWord) {
                  optStyle = 'border-green-500/40 bg-green-500/10 text-green-400';
                } else if (word === chosenWord) {
                  optStyle = 'border-red-500/40 bg-red-500/10 text-red-400';
                } else {
                  optStyle = 'border-white/5 bg-white/2 opacity-30';
                }
              }
              return (
                <button
                  key={word}
                  disabled={hasAnswered}
                  onClick={() => handleAnswerSelect(word)}
                  className={`p-4 rounded-xl border text-center font-bold transition-all text-sm capitalize ${optStyle}`}
                >
                  {word}
                </button>
              );
            })}
          </div>

          {/* Simple English: Next step feedback bar */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-2"
              >
                <div className={`p-4 rounded-xl border text-xs text-center font-bold ${
                  isCorrectChoice ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {isCorrectChoice ? 'Correct! Well done (+10 XP)' : `Incorrect. The word was "${targetQuizWord}"`}
                </div>

                <button
                  onClick={handleNextQuiz}
                  className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  {quizIdx === MINIMAL_PAIRS.length - 1 ? 'Finish & Reset' : 'Next Pair'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
