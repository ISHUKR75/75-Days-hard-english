'use client';
// Think in English — Daily English thinking exercises with 5 categories

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Timer, Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Lightbulb, CheckCircle2, SkipForward, Star, Flame, Target,
  MessageSquare, BookOpen, Mic, Zap, Globe, AlertTriangle,
} from 'lucide-react';

// ── 5 Categories × 10 Prompts ────────────────────────────────────
const CATEGORIES = [
  {
    id: 'describe',
    label: 'Describe',
    emoji: '🖼️',
    color: 'from-blue-500 to-cyan-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-300',
    instruction: 'वर्णन करो — किसी चीज़ को English में describe करो',
    prompts: [
      'Describe your bedroom in detail — furniture, colors, and layout.',
      'Describe the view from your window right now.',
      'Describe your favorite food — its look, smell, and taste.',
      'Describe your best friend — their personality and appearance.',
      'Describe the weather today and how it makes you feel.',
      'Describe your school or college building.',
      'Describe your morning commute to work or college.',
      'Describe the last movie you watched — story, characters, setting.',
      'Describe a festival celebration from your childhood.',
      'Describe your ideal home — rooms, garden, and location.',
    ],
  },
  {
    id: 'narrate',
    label: 'Narrate',
    emoji: '📖',
    color: 'from-violet-500 to-purple-400',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    badge: 'bg-violet-500/20 text-violet-300',
    instruction: 'कहानी सुनाओ — past में हुई घटना English में बताओ',
    prompts: [
      'Narrate what happened during your most memorable birthday.',
      'Tell the story of how you learned to ride a bicycle.',
      'Describe a funny incident that happened at your workplace.',
      'Tell about a time when you were completely lost somewhere.',
      'Narrate your first day at a new job or school.',
      'Tell about a trip that didn\'t go as planned.',
      'Narrate a time when you helped a stranger.',
      'Tell about an embarrassing moment you can now laugh about.',
      'Describe the last time you were very proud of yourself.',
      'Narrate a dream you remember vividly.',
    ],
  },
  {
    id: 'opine',
    label: 'Opine',
    emoji: '💬',
    color: 'from-amber-500 to-orange-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300',
    instruction: 'राय दो — अपनी opinion English में express करो',
    prompts: [
      'What do you think about social media — is it more helpful or harmful?',
      'Should students have smartphones in schools? Give your opinion.',
      'What is your view on working from home vs going to office?',
      'Do you think English is important for success in India? Why?',
      'What do you feel about electric vehicles — should everyone switch?',
      'Should the government make English compulsory from Class 1? Discuss.',
      'What is your opinion on online education compared to classroom learning?',
      'Do you believe in work-life balance? How do you maintain it?',
      'What do you think about fast food culture in India?',
      'Should retirement age be increased to 65 in India? Your thoughts.',
    ],
  },
  {
    id: 'debate',
    label: 'Debate',
    emoji: '⚔️',
    color: 'from-rose-500 to-pink-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    badge: 'bg-rose-500/20 text-rose-300',
    instruction: 'बहस करो — दोनों sides को English में argue करो',
    prompts: [
      'Debate: "Technology has made people lazier." Argue both sides.',
      'Debate: "Online shopping is better than visiting stores." For and against.',
      'Debate: "Cricket gets too much attention in India compared to other sports."',
      'Debate: "Arranged marriages are better than love marriages." Both perspectives.',
      'Debate: "Money is more important than job satisfaction." Argue both.',
      'Debate: "City life is better than village life." Present both sides.',
      'Debate: "Vegetarian diet is healthier than non-vegetarian." For and against.',
      'Debate: "Students should take a gap year before college." Both views.',
      'Debate: "Robots will replace human jobs in 20 years." Argue both sides.',
      'Debate: "Joint family system is better than nuclear family." Both sides.',
    ],
  },
  {
    id: 'imagine',
    label: 'Imagine',
    emoji: '🚀',
    color: 'from-emerald-500 to-teal-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
    instruction: 'कल्पना करो — imagine करके English में बताओ',
    prompts: [
      'If you could live anywhere in the world, where would it be and why?',
      'Imagine you won ₹1 crore in a lottery. What would you do with it?',
      'If you could have dinner with any person, living or dead, who and why?',
      'Imagine you could go back in time — which era would you visit?',
      'If you had a superpower for one day, what would it be and how would you use it?',
      'Imagine your life in 10 years — describe your ideal future.',
      'If you could invent something that would help India, what would it be?',
      'Imagine you are the Prime Minister for a day — what three things would you change?',
      'If you could speak any 3 additional languages, which would you choose?',
      'Imagine you discovered a small island — how would you build a society there?',
    ],
  },
];

const TIMER_DURATION = 60;

export default function ThinkInEnglishPage() {
  const [activeCat,    setActiveCat]    = useState(0);
  const [promptIdx,    setPromptIdx]    = useState(0);
  const [showHint,     setShowHint]     = useState(false);
  const [timeLeft,     setTimeLeft]     = useState(TIMER_DURATION);
  const [isRunning,    setIsRunning]    = useState(false);
  const [completed,    setCompleted]    = useState({});   // { catId-idx: true }
  const [totalDone,    setTotalDone]    = useState(0);
  const intervalRef = useRef(null);

  const cat    = CATEGORIES[activeCat];
  const prompt = cat.prompts[promptIdx];
  const key    = `${cat.id}-${promptIdx}`;
  const isDone = !!completed[key];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const reset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(TIMER_DURATION);
    setIsRunning(false);
    setShowHint(false);
  };

  const selectCategory = (i) => {
    setActiveCat(i);
    setPromptIdx(0);
    reset();
  };

  const goNext = () => {
    if (promptIdx < cat.prompts.length - 1) {
      setPromptIdx(i => i + 1);
      reset();
    }
  };

  const goPrev = () => {
    if (promptIdx > 0) {
      setPromptIdx(i => i - 1);
      reset();
    }
  };

  const markDone = () => {
    if (!isDone) {
      setCompleted(prev => ({ ...prev, [key]: true }));
      setTotalDone(n => n + 1);
    }
    setTimeout(goNext, 600);
  };

  const timerPct   = (timeLeft / TIMER_DURATION) * 100;
  const timerColor = timeLeft > 30 ? '#10b981' : timeLeft > 15 ? '#f59e0b' : '#f43f5e';

  const totalPrompts = CATEGORIES.reduce((s, c) => s + c.prompts.length, 0);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Think in English</h1>
            <p className="text-sm text-slate-500">Daily exercises to rewire your brain to think in English</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div className="grid grid-cols-3 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="card p-3 text-center">
          <Flame size={15} className="text-orange-400 mx-auto mb-1" />
          <p className="text-lg font-black text-white">{totalDone}</p>
          <p className="text-[10px] text-slate-500">Completed</p>
        </div>
        <div className="card p-3 text-center">
          <Target size={15} className="text-violet-400 mx-auto mb-1" />
          <p className="text-lg font-black text-white">{totalPrompts}</p>
          <p className="text-[10px] text-slate-500">Total Prompts</p>
        </div>
        <div className="card p-3 text-center">
          <Star size={15} className="text-amber-400 mx-auto mb-1" />
          <p className="text-lg font-black text-white">{Math.round((totalDone / totalPrompts) * 100)}%</p>
          <p className="text-[10px] text-slate-500">Progress</p>
        </div>
      </motion.div>

      {/* English-only banner */}
      <motion.div
        className="rounded-2xl p-3 border border-violet-500/30 bg-violet-500/10 flex items-center gap-3"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      >
        <AlertTriangle size={16} className="text-violet-400 shrink-0" />
        <p className="text-sm font-semibold text-violet-300">
          🧠 English-Only Zone — Hindi में बिल्कुल मत सोचो। Direct English में think करो!
        </p>
      </motion.div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {CATEGORIES.map((c, i) => {
          const catDone = c.prompts.filter((_, pi) => completed[`${c.id}-${pi}`]).length;
          return (
            <button
              key={c.id}
              onClick={() => selectCategory(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                activeCat === i
                  ? `bg-gradient-to-r ${c.color} text-white border-transparent shadow-lg`
                  : `bg-white/5 border-white/8 text-slate-400 hover:text-white hover:border-white/15`
              }`}
            >
              <span>{c.emoji}</span> {c.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ml-1 ${activeCat === i ? 'bg-white/20' : 'bg-white/10'}`}>
                {catDone}/{c.prompts.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Prompt Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${cat.id}-${promptIdx}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.28 }}
          className={`card p-6 border ${cat.border} relative overflow-hidden`}
        >
          {/* Bg gradient blob */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-5 rounded-full blur-2xl`} />

          {/* Category + count */}
          <div className="flex items-center justify-between mb-4">
            <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${cat.badge} ${cat.border}`}>
              <span>{cat.emoji}</span> {cat.label}
            </span>
            <span className="text-xs text-slate-500">
              {promptIdx + 1} / {cat.prompts.length}
            </span>
          </div>

          {/* Instruction */}
          <p className="text-xs text-slate-500 mb-2">{cat.instruction}</p>

          {/* Prompt text */}
          <div className={`p-4 rounded-xl ${cat.bg} border ${cat.border} mb-5`}>
            <p className="text-base font-semibold text-white leading-relaxed">{prompt}</p>
          </div>

          {/* Timer */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Timer size={12} /> Think time
              </span>
              <span className="text-sm font-bold" style={{ color: timerColor }}>{timeLeft}s</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${timerPct}%`, backgroundColor: timerColor }} />
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {!isRunning
              ? <button onClick={() => setIsRunning(true)} className="btn-primary flex items-center gap-2 text-sm px-4 py-2">
                  <Play size={13} /> Start Thinking
                </button>
              : <button onClick={() => setIsRunning(false)} className="btn-secondary flex items-center gap-2 text-sm px-4 py-2">
                  <Pause size={13} /> Pause
                </button>
            }
            <button onClick={reset} className="btn-secondary flex items-center gap-2 text-sm px-4 py-2">
              <RotateCcw size={13} /> Reset
            </button>
            <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Lightbulb size={13} /> Hint
            </button>
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-200">
                💡 Start with: <strong>"Well, I think..."</strong> or <strong>"In my opinion..."</strong> or <strong>"Let me describe..."</strong>
                <br />Use: present tense for facts, past tense for experiences, conditional for imagination.
              </motion.div>
            )}
          </AnimatePresence>

          {/* Done / Skip */}
          <div className="flex gap-3">
            <button onClick={markDone}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isDone
                  ? 'bg-emerald-500/30 border border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/30'
              }`}>
              <CheckCircle2 size={15} /> {isDone ? 'Done ✓' : 'I spoke it in English!'}
            </button>
            <button onClick={goNext} disabled={promptIdx === cat.prompts.length - 1}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              <SkipForward size={14} /> Skip
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot navigation */}
      <div className="flex items-center justify-between">
        <button onClick={goPrev} disabled={promptIdx === 0}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/8">
          <ChevronLeft size={15} /> Prev
        </button>
        <div className="flex gap-1.5">
          {cat.prompts.map((_, i) => (
            <button key={i} onClick={() => { setPromptIdx(i); reset(); }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === promptIdx ? `bg-gradient-to-r ${cat.color} scale-125` :
                completed[`${cat.id}-${i}`] ? 'bg-emerald-500' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
        <button onClick={goNext} disabled={promptIdx === cat.prompts.length - 1}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-xl bg-white/5 border border-white/8">
          Next <ChevronRight size={15} />
        </button>
      </div>

      {/* All categories overview */}
      <motion.div className="card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
          <Globe size={14} className="text-primary-400" /> All Categories Progress
        </h3>
        <div className="space-y-3">
          {CATEGORIES.map((c, i) => {
            const done = c.prompts.filter((_, pi) => completed[`${c.id}-${pi}`]).length;
            const pct  = Math.round((done / c.prompts.length) * 100);
            return (
              <button key={c.id} onClick={() => selectCategory(i)} className="w-full text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2 text-sm text-slate-300">
                    <span>{c.emoji}</span> {c.label}
                  </span>
                  <span className={`text-xs font-bold ${c.text}`}>{done}/{c.prompts.length}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${c.color} rounded-full`}
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
