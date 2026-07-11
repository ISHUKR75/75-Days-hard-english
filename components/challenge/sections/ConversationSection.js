// ============================================================
// ConversationSection.js - Office/daily life themed chat practice
// Practice Mode: hides one speaker's text, user must type it
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { MessageSquare, CheckCircle, XCircle, ChevronDown, ChevronRight, Eye, Languages, Volume2 } from 'lucide-react';

function speak(text, rate = 1) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US'; utt.rate = rate;
  window.speechSynthesis.speak(utt);
}

function Blob({ className }) {
  return (
    <motion.div className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
  );
}

export default function ConversationSection({ data, dayNum }) {
  const [convIdx, setConvIdx] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const [hiddenSpeaker, setHiddenSpeaker] = useState('');
  const [userInputs, setUserInputs] = useState({});
  const [checked, setChecked] = useState({});
  const [showHindi, setShowHindi] = useState({});

  const conversations = data?.conversationPractice?.conversations || [];
  const current = conversations[convIdx] || {};
  const exchanges = current.exchanges || [];
  const speakers = [...new Set(exchanges.map(e => e.speaker))];

  const checkAnswer = (idx, expected) => {
    const input = (userInputs[idx] || '').trim().toLowerCase();
    const exp = expected.trim().toLowerCase();
    setChecked(prev => ({ ...prev, [idx]: input === exp ? 'correct' : 'wrong' }));
  };

  const resetPractice = () => { setUserInputs({}); setChecked({}); };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-80 h-80 bg-blue-500 top-0 -left-20" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 right-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            <h1 className="text-white font-black text-2xl">Conversation Practice 🗣️</h1>
          </div>
          <p className="text-gray-400 text-sm">Office & daily life conversations — type to practice!</p>
        </motion.div>

        {/* Conversation selector */}
        {conversations.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {conversations.map((c, i) => (
              <button key={i} onClick={() => { setConvIdx(i); resetPractice(); }}
                className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                  i === convIdx ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
                {i + 1}. {c.scenario?.slice(0, 22) || `Conv ${i + 1}`}
              </button>
            ))}
          </div>
        )}

        {/* Scenario */}
        {current.scenario && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">📍 Scenario</p>
            <p className="text-gray-200 text-sm leading-relaxed">{current.scenario}</p>
          </motion.div>
        )}

        {/* Practice mode controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <button onClick={() => { setPracticeMode(!practiceMode); resetPractice(); setHiddenSpeaker(''); }}
            className={cn('px-4 py-2 rounded-xl border text-sm font-semibold transition-all',
              practiceMode ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
            ✏️ {practiceMode ? 'Exit Practice Mode' : 'Practice Mode'}
          </button>
          {practiceMode && speakers.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Hide:</span>
              {speakers.map(sp => (
                <button key={sp} onClick={() => { setHiddenSpeaker(sp); resetPractice(); }}
                  className={cn('px-3 py-1 rounded-xl text-xs font-bold border transition-all',
                    hiddenSpeaker === sp ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 'bg-white/5 border-white/10 text-gray-400')}>
                  {sp}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chat bubbles */}
        <div className="space-y-3">
          {exchanges.map((ex, idx) => {
            const isLeft = ex.speaker === speakers[0];
            const isHidden = practiceMode && ex.speaker === hiddenSpeaker;
            const checkState = checked[idx];

            return (
              <motion.div key={idx}
                initial={{ opacity: 0, x: isLeft ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn('flex items-end gap-2', isLeft ? '' : 'flex-row-reverse')}>

                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                  isLeft ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-violet-500/20 text-violet-400 border border-violet-500/30')}>
                  {ex.speaker?.charAt(0)}
                </div>

                <div className={cn('max-w-[78%]', isLeft ? '' : 'items-end flex flex-col')}>
                  <p className={cn('text-xs text-gray-500 mb-1', isLeft ? '' : 'text-right')}>{ex.speaker}</p>

                  {isHidden ? (
                    <div className={cn('space-y-2 w-full')}>
                      <input
                        type="text"
                        value={userInputs[idx] || ''}
                        onChange={e => setUserInputs(prev => ({ ...prev, [idx]: e.target.value }))}
                        placeholder="Type the missing line..."
                        className={cn('w-full px-3 py-2 rounded-xl bg-white/10 border text-white text-sm placeholder-gray-500 outline-none focus:ring-1',
                          checkState === 'correct' ? 'border-emerald-500/60 focus:ring-emerald-500' :
                          checkState === 'wrong' ? 'border-red-500/60 focus:ring-red-500' :
                          'border-white/20 focus:ring-violet-500')}
                        onKeyDown={e => e.key === 'Enter' && checkAnswer(idx, ex.english)}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => checkAnswer(idx, ex.english)}
                          className="px-3 py-1 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold hover:bg-blue-500/30">
                          Check ✓
                        </button>
                        {checkState && (
                          <span className={cn('flex items-center gap-1 text-xs font-semibold',
                            checkState === 'correct' ? 'text-emerald-400' : 'text-red-400')}>
                            {checkState === 'correct' ? <><CheckCircle className="w-3.5 h-3.5" /> Correct!</> : <><XCircle className="w-3.5 h-3.5" /> {ex.english}</>}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={cn('px-4 py-3 rounded-2xl',
                      isLeft ? 'rounded-tl-sm bg-blue-500/15 border border-blue-500/20' : 'rounded-tr-sm bg-violet-500/15 border border-violet-500/20')}>
                      <p className="text-white text-sm leading-relaxed">{ex.english}</p>
                      <AnimatePresence>
                        {showHindi[idx] && ex.hindi && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="text-orange-200 text-xs mt-1.5 border-t border-white/10 pt-1.5">
                            {ex.hindi}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <div className={cn('flex gap-2 mt-2', isLeft ? '' : 'justify-end')}>
                        <button onClick={() => speak(ex.english)} className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                          <Volume2 className="w-3 h-3 text-gray-300" />
                        </button>
                        {ex.hindi && (
                          <button onClick={() => setShowHindi(prev => ({ ...prev, [idx]: !prev[idx] }))}
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
                            <Languages className="w-3 h-3 text-gray-300" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {exchanges.length === 0 && (
          <div className="text-center text-gray-400 py-12">No conversations available yet 😔</div>
        )}
      </div>
    </div>
  );
}
