// ============================================================
// ListeningSection.js - TTS-based listening with MCQ and transcript
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { Play, Pause, FileText, CheckCircle, XCircle, Headphones } from 'lucide-react';

function speak(text, rate = 1, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US'; utt.rate = rate;
  if (onEnd) utt.onend = onEnd;
  window.speechSynthesis.speak(utt);
}

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
  );
}

export default function ListeningSection({ data, dayNum }) {
  const [exIdx, setExIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playRate, setPlayRate] = useState(1);
  const [hasListened, setHasListened] = useState({});
  const [selected, setSelected] = useState({});
  const [showTranscript, setShowTranscript] = useState({});
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const exercises = data?.listening?.exercises || [];
  const current = exercises[exIdx] || {};

  const handlePlay = () => {
    if (!current.audioScript) return;
    setIsPlaying(true);
    speak(current.audioScript, playRate, () => {
      setIsPlaying(false);
      setHasListened(prev => ({ ...prev, [exIdx]: true }));
    });
  };

  const handleStop = () => {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleSelect = (optionLetter) => {
    if (selected[exIdx]) return;
    setSelected(prev => ({ ...prev, [exIdx]: optionLetter }));
    const correct = selected[exIdx] === current.answer;
    setScore(prev => ({
      correct: prev.correct + (optionLetter === current.answer ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const answered = !!selected[exIdx];
  const isCorrect = selected[exIdx] === current.answer;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-96 h-96 bg-blue-500 top-0 -right-10" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 left-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Headphones className="w-6 h-6 text-blue-400" />
            <h1 className="text-white font-black text-2xl">Listening Practice 👂</h1>
          </div>
          <p className="text-gray-400 text-sm">Listen carefully, then answer the question!</p>
        </motion.div>

        {/* Score */}
        {score.total > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-sm">Score: {score.correct}/{score.total}</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(score.correct / score.total) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Exercise selector */}
        {exercises.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {exercises.map((_, i) => (
              <button key={i} onClick={() => { setExIdx(i); handleStop(); }}
                className={cn('w-9 h-9 rounded-xl text-sm font-bold border transition-all',
                  i === exIdx ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {exercises.length === 0 && (
          <div className="text-center text-gray-400 py-12">No listening exercises today 👂</div>
        )}

        {current.audioScript && (
          <>
            {/* Audio player card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 border-2 border-blue-500/40 mx-auto flex items-center justify-center mb-4">
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div key="wave" className="flex gap-1 items-end h-8">
                      {[0,1,2,3,4].map(i => (
                        <motion.div key={i} className="w-1.5 bg-blue-400 rounded-full"
                          animate={{ height: ['8px','24px','8px'] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }} />
                      ))}
                    </motion.div>
                  ) : (
                    <Play className="w-8 h-8 text-blue-400 ml-1" />
                  )}
                </AnimatePresence>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {isPlaying ? 'Playing audio...' : hasListened[exIdx] ? '✅ Listened! Answer below.' : 'Press play to start listening'}
              </p>
              {/* Speed controls */}
              <div className="flex justify-center gap-2 mb-4">
                {[0.75, 1, 1.25].map(r => (
                  <button key={r} onClick={() => setPlayRate(r)}
                    className={cn('px-3 py-1 rounded-xl text-xs font-bold border transition-all',
                      playRate === r ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
                    {r}x
                  </button>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={isPlaying ? handleStop : handlePlay}
                  className={cn('flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all',
                    isPlaying ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-blue-500/20 border border-blue-500/40 text-blue-400 hover:bg-blue-500/30')}>
                  {isPlaying ? <><Pause className="w-4 h-4" /> Stop</> : <><Play className="w-4 h-4" /> {hasListened[exIdx] ? 'Play Again' : 'Play Audio'}</>}
                </button>
              </div>
            </motion.div>

            {/* MCQ */}
            {current.question && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">
                <p className="text-white font-semibold text-sm">{current.question}</p>
                <div className="space-y-2">
                  {(current.options || []).map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);
                    const isSelected = selected[exIdx] === letter;
                    const isAnswer = letter === current.answer;
                    return (
                      <button key={i} disabled={answered && !isSelected}
                        onClick={() => handleSelect(letter)}
                        className={cn('w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all',
                          !answered ? 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 hover:text-white' :
                          isAnswer ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' :
                          isSelected ? 'bg-red-500/20 border-red-500/40 text-red-400' :
                          'bg-white/5 border-white/10 text-gray-500 opacity-50')}>
                        <span className="font-bold mr-2">{letter}.</span>{opt}
                        {answered && isAnswer && <CheckCircle className="w-4 h-4 text-emerald-400 float-right mt-0.5" />}
                        {answered && isSelected && !isAnswer && <XCircle className="w-4 h-4 text-red-400 float-right mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={cn('px-4 py-3 rounded-xl text-sm font-medium',
                      isCorrect ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/15 border border-red-500/30 text-red-400')}>
                    {isCorrect ? '🎉 Correct! Great listening!' : `❌ The correct answer was ${current.answer}.`}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Transcript reveal */}
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button onClick={() => setShowTranscript(prev => ({ ...prev, [exIdx]: !prev[exIdx] }))}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-gray-400 hover:text-white text-sm font-semibold transition-all">
                  <FileText className="w-4 h-4" />
                  {showTranscript[exIdx] ? 'Hide Transcript' : 'Show Transcript'}
                </button>
                <AnimatePresence>
                  {showTranscript[exIdx] && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      className="mt-3 bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Transcript</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{current.audioScript}</p>
                      {current.hindiScript && <p className="text-orange-200 text-xs leading-relaxed border-t border-white/10 pt-2">{current.hindiScript}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
