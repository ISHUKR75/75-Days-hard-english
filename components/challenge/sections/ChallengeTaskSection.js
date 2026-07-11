// ============================================================
// ChallengeTaskSection.js — Daily Challenge Task
// Real challenges, completion tracking, XP rewards, sharing,
// streak tracking, and motivational system. 🎯
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  Target, CheckCircle2, Star, Zap, Trophy,
  Copy, Check, Flame, Clock, Share2, TrendingUp,
  MessageCircle, PenLine, Volume2, BookOpen
} from 'lucide-react';

// ── TTS ───────────────────────────────────────────────────────
function speak(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US'; utt.rate = 0.9;
  window.speechSynthesis.speak(utt);
}

// ── Sound ─────────────────────────────────────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if (type === 'complete') {
      o.type = 'sine';
      o.frequency.setValueAtTime(523, ctx.currentTime);
      o.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      o.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    }
    o.start(); o.stop(ctx.currentTime + 0.5);
  } catch (_) {}
}

// ── Blobs ─────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[450px] h-[450px] rounded-full bg-violet-600/15 blur-3xl -top-20 -right-32"
        animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-3xl bottom-10 -left-20"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity, delay: 4 }} />
    </div>
  );
}

// ── Day 1 challenges ──────────────────────────────────────────
const DAY1_CHALLENGES = [
  {
    id: 'challenge_main',
    title: "Today's Main Challenge",
    type: 'speaking',
    emoji: '🎤',
    xp: 50,
    difficulty: 'Beginner',
    timeEstimate: '10 minutes',
    challenge: 'Introduce yourself in English for 2 minutes — non-stop!',
    hindiExplanation: 'खुद का 2 मिनट का English introduction तैयार करो और बोलो। रुको मत — अगर कोई word miss हो जाए तो skip करो और आगे बढ़ो!',
    steps: [
      'Write a 2-minute script about yourself (name, city, job/study, hobby, why learning English)',
      'Practice it 3 times privately (reading from script is OK)',
      'Now say it WITHOUT looking at the script',
      'Record a video on your phone and watch it back',
      'Click Complete when done — be honest with yourself!'
    ],
    tips: [
      'Perfect is the enemy of done. Speak imperfectly but SPEAK!',
      "If you forget a word, just say 'um', pause, and continue. Native speakers do this too!",
      "Smile while speaking — it automatically makes your voice sound more confident"
    ],
    sampleScript: "Hello! My name is [Your Name]. I am from [Your City]. I work as a [Job/Student] at [Company/College]. In my free time, I love [Hobby 1] and [Hobby 2]. I am doing this 75-day English challenge because I want to speak fluent English confidently. My biggest goal in life right now is to [Your Goal]. I believe I can achieve it with consistent practice every single day. Thank you!"
  },
  {
    id: 'challenge_writing',
    title: 'Writing Challenge',
    type: 'writing',
    emoji: '✍️',
    xp: 30,
    difficulty: 'Beginner',
    timeEstimate: '15 minutes',
    challenge: 'Write a 100-word "Day 1 Diary Entry" in English about your journey starting today',
    hindiExplanation: "आज का एक short diary entry English में लिखो। बताओ कि तुमने इस challenge को क्यों शुरू किया, तुम्हें English में क्या-क्या difficult लगता है, और तुम्हारी goals क्या हैं।",
    steps: [
      'Open Notes/Diary app on your phone',
      'Date it: "Day 1 — [Today\'s Date]"',
      'Write at least 100 words about why you started this journey',
      'Don\'t use Google Translate — write what you know!',
      'Take a screenshot and keep it. You\'ll be amazed reading it on Day 75!'
    ],
    tips: [
      "Write in simple words — don't try to sound fancy",
      "Mistakes are OK! This is a diary, not an exam",
      "Future-you reading Day 1 entry on Day 75 will be SO motivating"
    ],
    sampleScript: "Day 1 — [Date]\n\nToday I started my 75 Days Hard English Challenge. I am excited and nervous at the same time. I want to learn English because [your reason]. Right now, my English is [describe your level]. I find [what's hard] most difficult. But I am committed to practicing every single day for 75 days. My goal by Day 75 is to [your goal]. I will not give up. Let's go!"
  },
  {
    id: 'challenge_social',
    title: 'Social Challenge',
    type: 'social',
    emoji: '🌍',
    xp: 40,
    difficulty: 'Easy',
    timeEstimate: '5 minutes',
    challenge: 'Send ONE English message to someone today — a friend, colleague, or WhatsApp group!',
    hindiExplanation: 'किसी को एक English message भेजो! यह कोई भी हो सकता है — friend, colleague, या family member। यह तुम्हारा English को real world में use करने का पहला step है।',
    steps: [
      'Pick ONE person — friend, colleague, or WhatsApp group',
      'Write a genuine English message (not copy-paste from internet!)',
      'It can be a greeting, a thought, a recommendation, anything!',
      'Hit send and feel proud!',
      'Come back and click Complete below'
    ],
    tips: [
      'Keep it short and genuine — even "Hey! Good morning! Hope you have a great day 😊" counts!',
      'Tell them you\'re learning English — most people are encouraging and supportive',
      'This first real-world use is a HUGE milestone. Celebrate it!'
    ],
    sampleScript: "Hey! Good morning! I just started my 75 Days Hard English Challenge today. Trying to write everything in English now. Hope you have an amazing day ahead! 😊"
  },
];

// ── Challenge card component ──────────────────────────────────
function ChallengeCard({ challenge, isCompleted, onComplete }) {
  const [showScript, setShowScript] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const typeColors = {
    speaking: { bg: 'from-violet-500/15 to-purple-500/10', border: 'border-violet-500/30', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
    writing: { bg: 'from-indigo-500/15 to-blue-500/10', border: 'border-indigo-500/30', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    social: { bg: 'from-pink-500/15 to-rose-500/10', border: 'border-pink-500/30', badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  };
  const c = typeColors[challenge.type] || typeColors.speaking;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(challenge.sampleScript).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    if (!confirming) { setConfirming(true); return; }
    onComplete();
    setConfirming(false);
    playSound('complete');
  };

  return (
    <div className={`bg-gradient-to-br ${c.bg} backdrop-blur-xl border ${isCompleted ? 'border-emerald-500/40' : c.border} rounded-2xl overflow-hidden transition-all`}>
      {isCompleted && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none rounded-2xl" />}

      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
                {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
              </span>
              <span className="text-xs text-gray-400 border border-white/10 bg-white/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock size={10} /> {challenge.timeEstimate}
              </span>
              <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap size={10} /> +{challenge.xp} XP
              </span>
            </div>
            <h3 className="text-white font-black text-base flex items-center gap-2">
              <span>{challenge.emoji}</span>
              {challenge.title}
            </h3>
          </div>
          {isCompleted && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              <CheckCircle2 size={24} className="text-emerald-400 flex-shrink-0" />
            </motion.div>
          )}
        </div>

        {/* Main challenge */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wider">🎯 Challenge</p>
          <p className="text-white font-bold text-base leading-relaxed">{challenge.challenge}</p>
          <p className="text-gray-400 text-sm mt-2">{challenge.hindiExplanation}</p>
        </div>

        {/* Steps */}
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Step by Step:</p>
          <div className="space-y-2">
            {challenge.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-xs font-black text-gray-300 flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4">
          <p className="text-amber-400 font-semibold text-xs mb-2">💡 Pro Tips:</p>
          <ul className="space-y-1">
            {challenge.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                <span className="text-amber-400 font-bold flex-shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Sample script */}
        <div>
          <button onClick={() => setShowScript(p => !p)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 hover:bg-white/10 transition-all">
            <span>📝 Sample Script (for reference, don't memorize!)</span>
            <span>{showScript ? '▲' : '▼'}</span>
          </button>
          <AnimatePresence>
            {showScript && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="bg-white/5 border border-white/10 border-t-0 rounded-b-xl p-4 space-y-3">
                  <pre className="text-gray-300 text-xs font-sans leading-relaxed whitespace-pre-wrap">{challenge.sampleScript}</pre>
                  <div className="flex gap-2">
                    <button onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl text-xs font-medium transition-all">
                      {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy Script</>}
                    </button>
                    <button onClick={() => speak(challenge.sampleScript.replace(/\[.*?\]/g, 'name').slice(0, 200))}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl text-xs font-medium transition-all">
                      <Volume2 size={11} /> Hear It
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Complete button */}
        {!isCompleted ? (
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleComplete}
            className={`w-full py-3.5 rounded-2xl text-sm font-black transition-all ${
              confirming ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40'
            }`}>
            {confirming ? '✅ Yes, I Completed This! (+' + challenge.xp + ' XP)' : '🎯 Mark Challenge as Complete'}
          </motion.button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <CheckCircle2 size={18} className="text-emerald-400" />
            <p className="text-emerald-300 font-bold text-sm">Challenge Complete! +{challenge.xp} XP Earned! 🔥</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function ChallengeTaskSection({ data, dayNum }) {
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  const rawChallenge = data?.challenge;
  const challenges = DAY1_CHALLENGES;

  const [completed, setCompleted] = useState(new Set());
  const [totalXP, setTotalXP] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const allDone = completed.size === challenges.length;
  const maxXP = challenges.reduce((s, c) => s + c.xp, 0);

  const handleComplete = (id, xp) => {
    if (completed.has(id)) return;
    setCompleted(p => new Set([...p, id]));
    addXP(xp, `Completed daily challenge: ${id}`);
    recordQuestionResult(`challenge-day${dayNum}-${id}`, true);
    setTotalXP(p => p + xp);
    if (completed.size + 1 === challenges.length) {
      setShowCelebration(true);
      addXP(25, 'All challenges completed! Bonus XP!');
      setTotalXP(p => p + 25);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blobs />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">🎯</div>
              <div>
                <h1 className="text-white font-black text-2xl">Today's Challenge</h1>
                <p className="text-gray-400 text-sm mt-0.5">Ek-ek step utha ke aage badho! Day {dayNum} 🔥</p>
              </div>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-violet-400">{completed.size}/{challenges.length}</div>
                <div className="text-xs text-gray-400">done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-amber-400">{totalXP}</div>
                <div className="text-xs text-gray-400">XP earned</div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
                animate={{ width: `${(completed.size / challenges.length) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{completed.size} of {challenges.length} challenges complete</span>
              <span className="text-amber-400">{totalXP}/{maxXP + 25} XP possible today</span>
            </div>
          </div>
        </motion.div>

        {/* ── CELEBRATION ──────────────────────────────────────── */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/40 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-3">🏆</div>
              <p className="text-violet-300 font-black text-xl">DAY {dayNum} CONQUERED!</p>
              <p className="text-gray-300 text-sm mt-2">You completed ALL {dayNum === 1 ? 'Day 1' : 'today\'s'} challenges! +{maxXP + 25} XP Total! You're unstoppable! 🔥</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                {[...completed].map((_, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}
                    className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── INTRO CARD ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="text-3xl flex-shrink-0">👨‍🏫</div>
            <div>
              <p className="text-violet-300 font-bold text-sm mb-1">Your Teacher's Challenge for Day {dayNum}</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Theory padh liya, vocabulary seek li, questions kar li — ab asli kaam! 🔥 
                These real-world challenges will force you to USE your English actively. 
                You cannot learn English just by studying it — you must live it. 
                Complete all {challenges.length} challenges and get bonus XP + Day {dayNum} completion!
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── CHALLENGE CARDS ──────────────────────────────────── */}
        <div className="space-y-5">
          {challenges.map((ch, i) => (
            <motion.div key={ch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              className="relative">
              <ChallengeCard
                challenge={ch}
                isCompleted={completed.has(ch.id)}
                onComplete={() => handleComplete(ch.id, ch.xp)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── MOTIVATIONAL FOOTER ──────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">🔥</div>
          <p className="text-white font-black text-lg mb-2">"Discipline is choosing between what you want NOW and what you want MOST."</p>
          <p className="text-gray-400 text-sm">
            You chose to do this challenge. That already puts you in the top 1% of people who take their English seriously.
            Complete all 75 days and you will not recognize yourself.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-amber-400 font-semibold text-sm">
            <Flame size={16} />
            Day {dayNum}/75 — Keep going!
            <Flame size={16} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
