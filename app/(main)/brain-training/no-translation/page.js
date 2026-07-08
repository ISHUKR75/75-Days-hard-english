'use client';
// No Translation Mode — Think in English without translating from Hindi

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Timer, ChevronRight, ChevronLeft, Lightbulb, Trophy,
  CheckCircle2, XCircle, RotateCcw, Flame, Target, Zap, Star,
  AlertTriangle, ArrowRight, Play, Pause, SkipForward,
} from 'lucide-react';

// ── 20 Challenge Prompts ─────────────────────────────────────────
const CHALLENGES = [
  {
    id: 1, category: 'Office',
    prompt: 'Your manager asks you to give a status update on your current project.',
    hint: 'Use: "Currently, I am working on... The progress is... The deadline is..."',
    example: 'Currently, I am working on the quarterly report. The progress is 70% complete. We are on track to meet the Friday deadline.',
  },
  {
    id: 2, category: 'Office',
    prompt: 'A colleague asks you why you were late to the morning meeting.',
    hint: 'Use: "I apologize for... I was delayed because... It won\'t happen again..."',
    example: 'I apologize for the delay. I was stuck in traffic due to the road construction near the office. It won\'t happen again.',
  },
  {
    id: 3, category: 'Office',
    prompt: 'Your client calls and asks about the delivery timeline for their order.',
    hint: 'Use: "Your order will be... We expect to deliver... If there are any changes..."',
    example: 'Your order is currently being processed. We expect to deliver it by Thursday. I will send you a confirmation email with tracking details.',
  },
  {
    id: 4, category: 'Daily Life',
    prompt: 'Describe what you had for breakfast this morning.',
    hint: 'Use: "This morning I had... It was... I usually eat..."',
    example: 'This morning I had two slices of toast with butter and a cup of tea. It was simple but filling. I usually prefer a light breakfast before work.',
  },
  {
    id: 5, category: 'Daily Life',
    prompt: 'Explain to a shopkeeper that the item they sold you is defective.',
    hint: 'Use: "I purchased this from... The problem is... I would like..."',
    example: 'I purchased this phone charger from your shop yesterday. The problem is that it stopped working after just one use. I would like a replacement or a refund.',
  },
  {
    id: 6, category: 'Interview',
    prompt: 'Introduce yourself at the beginning of a job interview.',
    hint: 'Use: "My name is... I have experience in... I am passionate about..."',
    example: 'My name is Rahul Sharma. I have three years of experience in software development, specializing in web applications. I am passionate about creating user-friendly solutions.',
  },
  {
    id: 7, category: 'Interview',
    prompt: 'Answer the question: "What is your biggest weakness?"',
    hint: 'Use: "One area I am working on... However, I have been... This has helped me..."',
    example: 'One area I am working on is public speaking. However, I have been taking online courses and volunteering to present in team meetings. This has helped me improve significantly.',
  },
  {
    id: 8, category: 'Social',
    prompt: 'You bump into an old school friend after 5 years. Start the conversation.',
    hint: 'Use: "Oh wow, it\'s been so long!... What have you been up to?... I can\'t believe..."',
    example: 'Oh wow, it\'s been so long! I can\'t believe we ran into each other here. What have you been up to? Are you still living in the same area?',
  },
  {
    id: 9, category: 'Social',
    prompt: 'Politely decline an invitation to a party because you are busy.',
    hint: 'Use: "Thank you so much for inviting me... Unfortunately... I hope you all..."',
    example: 'Thank you so much for inviting me to your party. Unfortunately, I have a prior commitment that evening and won\'t be able to make it. I hope you all have a wonderful time!',
  },
  {
    id: 10, category: 'Travel',
    prompt: 'Ask for directions to the nearest hospital at a bus station.',
    hint: 'Use: "Excuse me, could you tell me... How far is it... Should I take..."',
    example: 'Excuse me, could you tell me how to get to the nearest hospital? How far is it from here? Should I take a bus or an auto-rickshaw?',
  },
  {
    id: 11, category: 'Travel',
    prompt: 'At the airport check-in counter, ask about your luggage allowance.',
    hint: 'Use: "I\'d like to know... What is the limit... Is there an extra charge..."',
    example: 'I\'d like to know the baggage allowance for my flight to Mumbai. What is the weight limit for checked luggage? Is there an extra charge if my bag is overweight?',
  },
  {
    id: 12, category: 'Office',
    prompt: 'Request a one-week leave from your manager for personal reasons.',
    hint: 'Use: "I would like to request... Due to... I will ensure... Please let me know..."',
    example: 'I would like to request leave from Monday to Friday next week. Due to a family function in my hometown, I need to travel. I will ensure all my pending work is completed before I leave.',
  },
  {
    id: 13, category: 'Daily Life',
    prompt: 'Describe your daily morning routine to someone.',
    hint: 'Use: "I usually wake up at... First, I... After that... Before leaving..."',
    example: 'I usually wake up at 6:30 AM. First, I freshen up and exercise for 20 minutes. After that, I have breakfast and read the news. Before leaving for work, I pack my bag and check my schedule.',
  },
  {
    id: 14, category: 'Social',
    prompt: 'Compliment your colleague on their excellent presentation.',
    hint: 'Use: "Your presentation was... I especially liked... You explained... Well done!"',
    example: 'Your presentation was absolutely fantastic! I especially liked how you used data to support your points. You explained complex concepts in a very clear and engaging way. Well done!',
  },
  {
    id: 15, category: 'Office',
    prompt: 'Explain a technical problem you\'re facing to your IT support team.',
    hint: 'Use: "I am having trouble with... The issue started... When I try to... I have already tried..."',
    example: 'I am having trouble with my laptop. The issue started this morning when I tried to open the company software. When I try to log in, it shows an error message. I have already tried restarting.',
  },
  {
    id: 16, category: 'Interview',
    prompt: 'Describe your greatest professional achievement so far.',
    hint: 'Use: "My greatest achievement was... I successfully... This resulted in... The impact was..."',
    example: 'My greatest achievement was leading a team of five to redesign our company\'s website. I successfully coordinated the project within the deadline and budget. This resulted in a 40% increase in user engagement.',
  },
  {
    id: 17, category: 'Daily Life',
    prompt: 'Call a restaurant and make a reservation for 4 people.',
    hint: 'Use: "I\'d like to make a reservation... for... at... We have a preference for..."',
    example: 'Hello, I\'d like to make a reservation for four people this Saturday evening at 7:30 PM. We prefer a non-smoking section if possible. The reservation would be under the name Sharma.',
  },
  {
    id: 18, category: 'Social',
    prompt: 'Apologize to a neighbor whose sleep was disturbed by your loud music.',
    hint: 'Use: "I am so sorry for... I didn\'t realize... I will make sure... Please accept my..."',
    example: 'I am so sorry for the disturbance last night. I didn\'t realize the music was that loud. I will make sure it doesn\'t happen again. Please accept my sincere apologies.',
  },
  {
    id: 19, category: 'Travel',
    prompt: 'Describe your favorite travel destination to a tourist.',
    hint: 'Use: "One of my favorite places is... It is known for... The best time to visit... You must try..."',
    example: 'One of my favorite places is Manali in Himachal Pradesh. It is known for its stunning mountain views and adventure sports. The best time to visit is October. You must try skiing and river rafting there.',
  },
  {
    id: 20, category: 'Office',
    prompt: 'Suggest an improvement to your team\'s current work process.',
    hint: 'Use: "I think we could improve... by... This would help us... The benefit would be..."',
    example: 'I think we could improve our project tracking by using a shared digital board. This would help us see everyone\'s tasks in real time. The benefit would be better coordination and fewer missed deadlines.',
  },
];

const CATEGORY_COLORS = {
  Office:     'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Daily Life': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Interview:  'bg-violet-500/20 text-violet-300 border-violet-500/30',
  Social:     'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Travel:     'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

const TIPS = [
  { emoji: '🧠', tip: 'जब prompt देखें, सीधे English में सोचें — Hindi में translate मत करें।' },
  { emoji: '🗣️', tip: 'Simple words use करें। Perfect होने की चिंता छोड़ें — fluency ज़रूरी है।' },
  { emoji: '⏱️', tip: 'Timer pressure में practice करने से real conversations में confidence आता है।' },
  { emoji: '🔄', tip: 'रोज़ 5-10 challenges करें। Repetition से English thinking automatic हो जाती है।' },
  { emoji: '👁️', tip: 'Example देखने से पहले खुद try करें — यही असली learning है।' },
];

const TIMER_DURATION = 30;

export default function NoTranslationPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showHint,   setShowHint]   = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [timeLeft,   setTimeLeft]   = useState(TIMER_DURATION);
  const [isRunning,  setIsRunning]  = useState(false);
  const [completed,  setCompleted]  = useState(new Set());
  const [skipped,    setSkipped]    = useState(new Set());
  const [showResult, setShowResult] = useState(false); // 'done' | 'skip' | null
  const intervalRef = useRef(null);

  const challenge = CHALLENGES[currentIdx];

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(TIMER_DURATION);
    setIsRunning(true);
    setShowHint(false);
    setShowExample(false);
  };

  const pauseTimer = () => setIsRunning(false);

  const resetChallenge = () => {
    setTimeLeft(TIMER_DURATION);
    setIsRunning(false);
    setShowHint(false);
    setShowExample(false);
  };

  const markDone = () => {
    setCompleted(prev => new Set([...prev, challenge.id]));
    setIsRunning(false);
    setShowResult('done');
    setTimeout(() => {
      setShowResult(null);
      goNext();
    }, 1200);
  };

  const skipChallenge = () => {
    setSkipped(prev => new Set([...prev, challenge.id]));
    setIsRunning(false);
    setShowResult('skip');
    setTimeout(() => {
      setShowResult(null);
      goNext();
    }, 1000);
  };

  const goNext = useCallback(() => {
    if (currentIdx < CHALLENGES.length - 1) {
      setCurrentIdx(i => i + 1);
      resetChallenge();
    }
  }, [currentIdx]);

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(i => i - 1);
      resetChallenge();
    }
  };

  const timerPercent = (timeLeft / TIMER_DURATION) * 100;
  const timerColor   = timeLeft > 15 ? '#10b981' : timeLeft > 7 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">No Translation Mode</h1>
            <p className="text-sm text-slate-500">Hindi में सोचना बंद करो — सीधे English में think करो</p>
          </div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div className="grid grid-cols-4 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        {[
          { icon: Flame,         label: 'Challenge',  value: `${currentIdx + 1}/${CHALLENGES.length}`, color: 'text-orange-400' },
          { icon: CheckCircle2,  label: 'Completed',  value: completed.size,  color: 'text-emerald-400' },
          { icon: SkipForward,   label: 'Skipped',    value: skipped.size,    color: 'text-amber-400' },
          { icon: Target,        label: 'Score',      value: `${Math.round((completed.size / CHALLENGES.length) * 100)}%`, color: 'text-violet-400' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card p-3 text-center">
            <Icon size={15} className={`${color} mx-auto mb-1`} />
            <p className="text-base font-black text-white">{value}</p>
            <p className="text-[10px] text-slate-500">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* English-Only Banner */}
      <motion.div
        className="rounded-2xl p-3 border border-rose-500/30 bg-rose-500/10 flex items-center gap-3"
        animate={{ borderColor: ['rgba(244,63,94,0.3)', 'rgba(244,63,94,0.6)', 'rgba(244,63,94,0.3)'] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <AlertTriangle size={18} className="text-rose-400 shrink-0" />
        <p className="text-sm font-semibold text-rose-300">
          🚫 No Hindi allowed! English-only zone. Hindi में मत सोचो।
        </p>
      </motion.div>

      {/* Main Challenge Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="card p-6 border border-white/10"
        >
          {/* Category + number */}
          <div className="flex items-center justify-between mb-5">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${CATEGORY_COLORS[challenge.category]}`}>
              {challenge.category}
            </span>
            <span className="text-xs text-slate-500">Challenge {challenge.id} of {CHALLENGES.length}</span>
          </div>

          {/* Prompt */}
          <div className="mb-6">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Scenario / स्थिति:</p>
            <p className="text-lg font-semibold text-white leading-relaxed">{challenge.prompt}</p>
          </div>

          {/* Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Timer size={14} style={{ color: timerColor }} />
                <span className="text-sm font-bold" style={{ color: timerColor }}>
                  {timeLeft}s remaining
                </span>
              </div>
              {timeLeft === 0 && (
                <span className="text-xs text-rose-400 font-bold animate-pulse">Time's up!</span>
              )}
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full transition-colors duration-500"
                style={{ width: `${timerPercent}%`, backgroundColor: timerColor }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Timer controls */}
          <div className="flex gap-2 mb-5">
            {!isRunning ? (
              <button onClick={startTimer} className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                <Play size={14} /> {timeLeft < TIMER_DURATION && timeLeft > 0 ? 'Resume' : 'Start Timer'}
              </button>
            ) : (
              <button onClick={pauseTimer} className="btn-secondary flex items-center gap-2 text-sm px-4 py-2">
                <Pause size={14} /> Pause
              </button>
            )}
            <button onClick={resetChallenge} className="btn-secondary flex items-center gap-2 text-sm px-4 py-2">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/* Hint */}
          <div className="mb-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Lightbulb size={14} /> {showHint ? 'Hide hint' : 'Show hint (यह देखो अगर अटक जाओ)'}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-200"
                >
                  💡 {challenge.hint}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Example */}
          <div className="mb-5">
            <button
              onClick={() => setShowExample(!showExample)}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Star size={14} /> {showExample ? 'Hide example' : 'Show example answer'}
            </button>
            <AnimatePresence>
              {showExample && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200 italic"
                >
                  ✨ {challenge.example}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={markDone}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30 font-semibold text-sm transition-all"
            >
              <CheckCircle2 size={16} /> I said it in English!
            </button>
            <button
              onClick={skipChallenge}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 font-semibold text-sm transition-all"
            >
              <SkipForward size={16} /> Skip
            </button>
          </div>

          {/* Result overlay */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-surface-800/80 backdrop-blur-sm rounded-2xl"
              >
                {showResult === 'done'
                  ? <div className="text-center"><div className="text-5xl mb-2">🎉</div><p className="text-emerald-400 font-bold">Great job!</p></div>
                  : <div className="text-center"><div className="text-5xl mb-2">⏭️</div><p className="text-amber-400 font-bold">Skipped</p></div>
                }
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={goPrev} disabled={currentIdx === 0}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/8">
          <ChevronLeft size={16} /> Previous
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1.5 overflow-x-auto">
          {CHALLENGES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setCurrentIdx(i); resetChallenge(); }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIdx ? 'bg-primary-400 scale-125' :
                completed.has(c.id) ? 'bg-emerald-500' :
                skipped.has(c.id)   ? 'bg-amber-500' : 'bg-white/15'
              }`}
            />
          ))}
        </div>

        <button onClick={goNext} disabled={currentIdx === CHALLENGES.length - 1}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/8">
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* Tips Section */}
      <motion.div className="card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
          <Lightbulb size={15} className="text-amber-400" /> English में सोचने के Tips
        </h3>
        <div className="space-y-2">
          {TIPS.map(({ emoji, tip }) => (
            <div key={tip} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/3">
              <span className="text-base shrink-0">{emoji}</span>
              <p className="text-sm text-slate-400">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
