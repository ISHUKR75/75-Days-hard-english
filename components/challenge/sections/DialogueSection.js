// ============================================================
// DialogueSection.js - Chat bubble UI with TTS and role-play mode
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import { cn } from '@/lib/utils';
import { Volume2, Languages, Users, ChevronLeft, ChevronRight, Mic, Eye, EyeOff } from 'lucide-react';

function Blob({ className }) {
  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl opacity-10 pointer-events-none', className)}
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 9, repeat: Infinity }}
    />
  );
}

function speak(text, rate = 1) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US';
  utt.rate = rate;
  window.speechSynthesis.speak(utt);
}

export default function DialogueSection({ data, dayNum }) {
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [showHindi, setShowHindi] = useState({});
  const [rolePlayMode, setRolePlayMode] = useState(false);
  const [rolePlaySpeaker, setRolePlaySpeaker] = useState('A');
  const [hiddenBubbles, setHiddenBubbles] = useState({});

  const dialogues = data?.dialogues?.dialogues || [];
  const current = dialogues[dialogueIdx] || {};
  const conversation = current.conversation || [];

  // Get unique speakers
  const speakers = [...new Set(conversation.map(c => c.speaker))];
  const speakerA = speakers[0] || 'A';
  const speakerB = speakers[1] || 'B';

  const isLeft = (speaker) => speaker === speakerA;

  const toggleHindi = (idx) => setShowHindi(prev => ({ ...prev, [idx]: !prev[idx] }));

  // In role-play mode, hide lines spoken by rolePlaySpeaker (user acts as them)
  const isHidden = (speaker, idx) => rolePlayMode && speaker === rolePlaySpeaker && !hiddenBubbles[idx];

  const revealBubble = (idx) => setHiddenBubbles(prev => ({ ...prev, [idx]: true }));

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blob className="w-96 h-96 bg-cyan-500 top-0 -right-20" />
      <Blob className="w-64 h-64 bg-violet-600 bottom-0 left-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <Users className="w-6 h-6 text-cyan-400" />
            <h1 className="text-white font-black text-2xl">Dialogues 💬</h1>
          </div>
          <p className="text-gray-400 text-sm">Real-life conversations to boost your fluency</p>
        </motion.div>

        {/* Dialogue selector */}
        {dialogues.length > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 flex-wrap">
            {dialogues.map((d, i) => (
              <button key={i} onClick={() => { setDialogueIdx(i); setShowHindi({}); setHiddenBubbles({}); }}
                className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                  i === dialogueIdx
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
                {i + 1}. {d.situation?.slice(0, 20) || `Dialogue ${i + 1}`}
              </button>
            ))}
          </motion.div>
        )}

        {/* Situation card */}
        {current.situation && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Situation</p>
            <p className="text-gray-200 text-sm leading-relaxed">{current.situation}</p>
            {current.level && (
              <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs">{current.level}</span>
            )}
          </motion.div>
        )}

        {/* Role-play controls */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 items-center">
          <button onClick={() => { setRolePlayMode(!rolePlayMode); setHiddenBubbles({}); }}
            className={cn('flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all',
              rolePlayMode
                ? 'bg-violet-500/20 border-violet-500/40 text-violet-400'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white')}>
            <Mic className="w-4 h-4" />
            {rolePlayMode ? 'Exit Role-Play' : 'Role-Play Mode'}
          </button>
          {rolePlayMode && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">You are:</span>
              {speakers.map(sp => (
                <button key={sp} onClick={() => { setRolePlaySpeaker(sp); setHiddenBubbles({}); }}
                  className={cn('px-3 py-1.5 rounded-xl text-xs font-bold border transition-all',
                    rolePlaySpeaker === sp
                      ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                      : 'bg-white/5 border-white/10 text-gray-400')}>
                  {sp}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Chat bubbles */}
        <div className="space-y-3">
          {conversation.map((line, idx) => {
            const left = isLeft(line.speaker);
            const hidden = isHidden(line.speaker, idx);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: left ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                className={cn('flex items-end gap-2', left ? 'flex-row' : 'flex-row-reverse')}
              >
                {/* Speaker avatar */}
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mb-1',
                  left ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-violet-500/20 text-violet-400 border border-violet-500/30')}>
                  {line.speaker?.charAt(0)}
                </div>

                <div className={cn('max-w-[75%] space-y-1', left ? 'items-start' : 'items-end')}>
                  <p className={cn('text-xs text-gray-500 mb-1', left ? '' : 'text-right')}>{line.speaker}</p>

                  {hidden ? (
                    <button onClick={() => revealBubble(idx)}
                      className={cn('px-4 py-3 rounded-2xl border flex items-center gap-2 text-sm',
                        left ? 'rounded-tl-sm' : 'rounded-tr-sm',
                        'bg-white/5 border-dashed border-white/20 text-gray-500 hover:text-white')}>
                      <Eye className="w-4 h-4" /> Tap to reveal your line
                    </button>
                  ) : (
                    <div className={cn('px-4 py-3 rounded-2xl',
                      left ? 'rounded-tl-sm bg-cyan-500/15 border border-cyan-500/20' : 'rounded-tr-sm bg-violet-500/15 border border-violet-500/20')}>
                      <p className="text-white text-sm leading-relaxed">{line.text}</p>

                      <AnimatePresence>
                        {showHindi[idx] && line.hindi && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="text-orange-200 text-xs mt-1.5 leading-relaxed border-t border-white/10 pt-1.5">
                            {line.hindi}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <div className={cn('flex gap-2 mt-2', left ? '' : 'justify-end')}>
                        <button onClick={() => speak(line.text)}
                          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                          <Volume2 className="w-3 h-3 text-gray-300" />
                        </button>
                        {line.hindi && (
                          <button onClick={() => toggleHindi(idx)}
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
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

        {conversation.length === 0 && (
          <div className="text-center text-gray-400 py-12">No dialogue available for today 😔</div>
        )}

        {/* Nav arrows for multiple dialogues */}
        {dialogues.length > 1 && (
          <div className="flex justify-between pt-2">
            <button disabled={dialogueIdx === 0} onClick={() => setDialogueIdx(i => i - 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 text-sm">
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button disabled={dialogueIdx === dialogues.length - 1} onClick={() => setDialogueIdx(i => i + 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 text-sm">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
