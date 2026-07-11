// ============================================================
// StudyPlanSection.js — Daily Study Plan & Morning Routine
// Timetable, habit tracker, weekly planner, personalized tips.
// Modern, actionable, Gen Z friendly! 📅
// ============================================================

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import {
  Clock, Sun, CheckCircle2, Circle, Star, Zap,
  Target, BookOpen, Mic, PenLine, Headphones,
  TrendingUp, Coffee, Moon, Flame, Trophy
} from 'lucide-react';

// ── Blobs ─────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[400px] h-[400px] rounded-full bg-lime-600/12 blur-3xl -top-20 -right-32"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-[300px] h-[300px] rounded-full bg-green-500/10 blur-3xl bottom-10 -left-20"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity, delay: 4 }} />
    </div>
  );
}

// ── Morning routine timeline ───────────────────────────────────
const MORNING_ROUTINE = [
  { time: '6:00 AM', task: 'Wake up & drink water', emoji: '💧', duration: '2 min', category: 'Health', color: 'blue', desc: 'Start with 2 glasses of water before anything else. Hydration activates your brain.' },
  { time: '6:02 AM', task: 'No phone for first 30 minutes!', emoji: '📵', duration: '30 min', category: 'Mindset', color: 'red', desc: 'Protect your first 30 minutes. No social media, no news, no distractions. Your brain is most fresh right now.' },
  { time: '6:05 AM', task: 'Light exercise / yoga / walk', emoji: '🏃', duration: '20 min', category: 'Health', color: 'green', desc: 'Even 15 minutes of movement releases endorphins and improves focus for the next 2-3 hours.' },
  { time: '6:25 AM', task: 'Review yesterday\'s English lesson', emoji: '🔄', duration: '5 min', category: 'English', color: 'violet', desc: 'Spaced repetition! Quick 5-minute review while memory is fresh dramatically improves retention.' },
  { time: '6:30 AM', task: 'Read English for 15 minutes', emoji: '📖', duration: '15 min', category: 'English', color: 'violet', desc: 'Read anything in English — a news article, a blog, a few pages of a book. Start your day in English mode!' },
  { time: '6:45 AM', task: 'Write 5 English sentences', emoji: '✍️', duration: '10 min', category: 'English', color: 'violet', desc: 'Write 5 sentences about yesterday, today\'s plan, or anything! This activates your grammar and vocabulary.' },
  { time: '6:55 AM', task: 'Listen to 1 English podcast/video', emoji: '🎧', duration: '10 min', category: 'English', color: 'violet', desc: 'BBC 6-Minute English, or any YouTube channel in English. Train your ear while getting ready.' },
  { time: '7:05 AM', task: 'Morning affirmations in English', emoji: '🗣️', duration: '5 min', category: 'Mindset', color: 'amber', desc: 'Say 5 positive statements in English out loud. "I am becoming fluent. I learn English every day. I am confident." This builds mental strength!' },
  { time: '7:10 AM', task: 'Get ready + have breakfast', emoji: '☀️', duration: '30 min', category: 'Daily', color: 'orange', desc: 'During breakfast, try to think about your day ahead — in English! Even if it\'s mental, it counts.' },
  { time: '7:40 AM', task: 'Leave for work/college energized!', emoji: '🚀', duration: '', category: 'Daily', color: 'emerald', desc: 'You\'ve already done more English practice than 99% of people will do today. Go crush it!' },
];

// ── 75-day weekly plan ────────────────────────────────────────
const WEEKLY_PLAN = [
  { day: 'Monday', focus: 'Grammar + Theory', tasks: ['Study grammar rule of the week', 'Do 50 practice questions', 'Write 5 new sentences'], emoji: '📖', color: 'violet' },
  { day: 'Tuesday', focus: 'Vocabulary + Flashcards', tasks: ['Learn 20 new words', 'Review flashcards (10 min)', 'Use 5 new words in sentences'], emoji: '📚', color: 'blue' },
  { day: 'Wednesday', focus: 'Speaking + Listening', tasks: ['Do shadowing drills (15 min)', 'Listen to English podcast', 'Record yourself speaking for 1 min'], emoji: '🎙️', color: 'emerald' },
  { day: 'Thursday', focus: 'Reading + Writing', tasks: ['Read 1 English article', 'Write 1 short paragraph', 'Practice email writing'], emoji: '✍️', color: 'amber' },
  { day: 'Friday', focus: 'Practice Questions', tasks: ['Attempt 100 practice questions', 'Review wrong answers carefully', 'Note down difficult grammar patterns'], emoji: '🎯', color: 'orange' },
  { day: 'Saturday', focus: 'Mock Test + Review', tasks: ['Take a full mock test', 'Review test performance', 'Revise weak areas'], emoji: '📊', color: 'red' },
  { day: 'Sunday', focus: 'Rest + Light Revision', tasks: ['Light review of the week\'s content', 'Plan next week\'s focus areas', 'Watch 1 English movie/show (fun!)'], emoji: '🌟', color: 'pink' },
];

// ── Daily time blocks ─────────────────────────────────────────
const TIME_BLOCKS = [
  { slot: 'Morning (6-8 AM)', activity: 'Grammar + Reading', duration: '30-45 min', priority: 'HIGH', icon: Sun, tip: 'Your brain is freshest in the morning. Use this for the hardest material.' },
  { slot: 'Commute (8-9 AM)', activity: 'Listen to English podcasts', duration: '30-60 min', priority: 'HIGH', icon: Headphones, tip: "Don't waste commute time. Passive English exposure adds up massively." },
  { slot: 'Lunch Break (1-2 PM)', activity: 'Practice questions + Flashcards', duration: '20-30 min', priority: 'MED', icon: Target, tip: 'Quick practice sessions during lunch keep content fresh throughout the day.' },
  { slot: 'Evening (7-8 PM)', activity: 'Writing + Speaking practice', duration: '30-45 min', priority: 'HIGH', icon: PenLine, tip: 'Evening is great for active practice like writing emails or speaking drills.' },
  { slot: 'Night (10 PM)', activity: 'Review the day + tomorrow\'s plan', duration: '10 min', priority: 'MED', icon: Moon, tip: "Quick review before bed triggers your brain to consolidate today's learning while you sleep." },
];

// ── Habit tracker ─────────────────────────────────────────────
const WEEKLY_HABITS = [
  'Reviewed English for at least 30 minutes',
  'Wrote at least 5 sentences in English',
  'Listened to an English podcast/video',
  'Spoke English (with someone or to mirror)',
  'Learned at least 5 new vocabulary words',
  'Read an English article or book page',
  'Completed my 75 Days Hard lesson for today',
];

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function StudyPlanSection({ data, dayNum }) {
  const { addXP } = useGamificationStore();

  const rawMorning = data?.morningRoutine;
  const routine = (rawMorning && rawMorning.length > 0) ? rawMorning : MORNING_ROUTINE;

  const [checkedRoutine, setCheckedRoutine] = useState(new Set());
  const [checkedHabits, setCheckedHabits] = useState(new Set());
  const [activeTab, setActiveTab] = useState('morning');
  const [xpEarned, setXpEarned] = useState(0);

  const toggleRoutine = (i) => {
    setCheckedRoutine(prev => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else {
        next.add(i);
        if (!prev.has(i)) { addXP(2, 'Morning routine step done!'); setXpEarned(p => p + 2); }
      }
      return next;
    });
  };

  const toggleHabit = (i) => {
    setCheckedHabits(prev => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else {
        next.add(i);
        if (!prev.has(i)) { addXP(3, 'Daily habit tracked!'); setXpEarned(p => p + 3); }
      }
      return next;
    });
  };

  const routineProgress = Math.round((checkedRoutine.size / MORNING_ROUTINE.length) * 100);

  const colorMap = {
    blue: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
    red: 'bg-red-500/20 border-red-500/30 text-red-300',
    green: 'bg-green-500/20 border-green-500/30 text-green-300',
    violet: 'bg-violet-500/20 border-violet-500/30 text-violet-300',
    amber: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
    orange: 'bg-orange-500/20 border-orange-500/30 text-orange-300',
    emerald: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
    pink: 'bg-pink-500/20 border-pink-500/30 text-pink-300',
    lime: 'bg-lime-500/20 border-lime-500/30 text-lime-300',
  };

  const priorityMap = {
    HIGH: 'bg-red-500/20 text-red-300 border-red-500/30',
    MED: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    LOW: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };

  const TABS = [
    { id: 'morning', label: '☀️ Morning Routine', shortLabel: 'Morning' },
    { id: 'weekly', label: '📅 Weekly Plan', shortLabel: 'Weekly' },
    { id: 'blocks', label: '⏰ Time Blocks', shortLabel: 'Time' },
    { id: 'habits', label: '✅ Habit Tracker', shortLabel: 'Habits' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blobs />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center text-2xl shadow-lg">📅</div>
              <div>
                <h1 className="text-white font-black text-2xl">Daily Study Plan</h1>
                <p className="text-gray-400 text-sm mt-0.5">Structure your 75-day journey for maximum results! 🏆</p>
              </div>
            </div>
            {xpEarned > 0 && (
              <div className="text-center flex-shrink-0">
                <div className="text-2xl font-black text-amber-400">{xpEarned}</div>
                <div className="text-xs text-gray-400">XP earned</div>
              </div>
            )}
          </div>

          {/* Morning routine progress */}
          {checkedRoutine.size > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Today's routine: {checkedRoutine.size}/{MORNING_ROUTINE.length} steps</span>
                <span className={routineProgress >= 100 ? 'text-emerald-400 font-bold' : 'text-lime-400'}>{routineProgress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-lime-500 to-green-400 rounded-full"
                  animate={{ width: `${routineProgress}%` }} transition={{ duration: 0.4 }} />
              </div>
            </div>
          )}
        </motion.div>

        {/* ── TABS ─────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex-shrink-0 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* MORNING ROUTINE */}
          {activeTab === 'morning' && (
            <motion.div key="morning" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
                <p className="text-amber-300 font-semibold text-sm mb-2">☀️ The Perfect English Learning Morning</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your morning is the most powerful time of the day. A structured 90-minute morning routine, practiced daily for 75 days, will change your English completely. Tick each step as you complete it!
                </p>
              </div>

              <div className="space-y-2">
                {MORNING_ROUTINE.map((step, i) => {
                  const isDone = checkedRoutine.has(i);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                      className={`border rounded-2xl p-4 transition-all cursor-pointer ${isDone ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                      onClick={() => toggleRoutine(i)}>
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all border ${isDone ? 'bg-emerald-500 border-emerald-500' : 'border-white/20 hover:border-emerald-500/50'}`}>
                          {isDone && <CheckCircle2 size={14} className="text-white" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-xs text-gray-500 font-mono">{step.time}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colorMap[step.color] || 'bg-gray-500/20 text-gray-300'}`}>
                              {step.category}
                            </span>
                            {step.duration && (
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock size={10} />{step.duration}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{step.emoji}</span>
                            <p className={`font-semibold text-sm ${isDone ? 'text-emerald-200 line-through' : 'text-white'}`}>{step.task}</p>
                          </div>
                          <p className="text-gray-500 text-xs mt-1 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {checkedRoutine.size === MORNING_ROUTINE.length && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 rounded-2xl p-5 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-emerald-300 font-black text-lg">Perfect Morning! 🔥</p>
                  <p className="text-gray-400 text-sm mt-1">You completed your entire morning routine. +{MORNING_ROUTINE.length * 2} XP earned! Keep this streak going every day!</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* WEEKLY PLAN */}
          {activeTab === 'weekly' && (
            <motion.div key="weekly" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-lime-500/10 border border-lime-500/20 rounded-2xl p-5">
                <p className="text-lime-300 font-semibold text-sm mb-2">📅 75-Day Weekly Schedule</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This weekly plan ensures you cover all skills — grammar, vocabulary, speaking, listening, reading, and writing — in a balanced way throughout your 75-day journey.
                </p>
              </div>
              <div className="space-y-3">
                {WEEKLY_PLAN.map((day, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{day.emoji}</span>
                      <div>
                        <p className="text-white font-bold text-sm">{day.day}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colorMap[day.color] || 'bg-gray-500/20 text-gray-300'}`}>
                          Focus: {day.focus}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {day.tasks.map((task, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-gray-600">→</span>
                          {task}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TIME BLOCKS */}
          {activeTab === 'blocks' && (
            <motion.div key="blocks" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5">
                <p className="text-cyan-300 font-semibold text-sm mb-2">⏰ Smart Time Blocking for English</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  You don't need 3 hours free each day. Short, focused sessions spread throughout the day are MORE effective than one long study session. Here's how to use every gap!
                </p>
              </div>
              <div className="space-y-3">
                {TIME_BLOCKS.map((block, i) => {
                  const Icon = block.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                            <Icon size={18} className="text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-sm">{block.slot}</p>
                            <p className="text-gray-400 text-xs">{block.activity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${priorityMap[block.priority]}`}>
                            {block.priority}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                            <Clock size={10} />{block.duration}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        <span className="text-cyan-400 font-semibold">💡 Why: </span>{block.tip}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              <div className="bg-gradient-to-r from-lime-500/10 to-green-500/5 border border-lime-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy size={18} className="text-lime-400" />
                  <p className="text-lime-300 font-bold text-sm">Total daily English time = 2-3 hours!</p>
                </div>
                <p className="text-gray-400 text-sm">By using all the above slots, you'll practice English for 2-3 hours daily without changing your lifestyle significantly. This is the real secret behind rapid progress!</p>
              </div>
            </motion.div>
          )}

          {/* HABIT TRACKER */}
          {activeTab === 'habits' && (
            <motion.div key="habits" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                <p className="text-green-300 font-semibold text-sm mb-2">✅ Today's English Habit Check</p>
                <p className="text-gray-300 text-sm">Tick each habit you completed today. Consistency over 75 days = fluency. Simple as that.</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">{checkedHabits.size}/{WEEKLY_HABITS.length} habits done today</span>
                  <span className="text-xs text-emerald-400 font-bold">{checkedHabits.size * 3} XP earned</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                    animate={{ width: `${(checkedHabits.size / WEEKLY_HABITS.length) * 100}%` }} transition={{ duration: 0.4 }} />
                </div>
              </div>

              <div className="space-y-2">
                {WEEKLY_HABITS.map((habit, i) => {
                  const isDone = checkedHabits.has(i);
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => toggleHabit(i)}
                      className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${isDone ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8'}`}>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all ${isDone ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'}`}>
                        {isDone && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium flex-1 ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>{habit}</span>
                      {isDone && <span className="text-xs text-emerald-400 font-bold flex-shrink-0">+3 XP</span>}
                    </motion.div>
                  );
                })}
              </div>

              {checkedHabits.size === WEEKLY_HABITS.length && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 rounded-2xl p-5 text-center">
                  <div className="text-4xl mb-2">🌟</div>
                  <p className="text-emerald-300 font-black text-lg">Perfect Day! ALL habits done!</p>
                  <p className="text-gray-400 text-sm mt-1">+{WEEKLY_HABITS.length * 3} XP for completing all habits. You are unstoppable! 🔥</p>
                </motion.div>
              )}

              {/* Streak motivation */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Flame size={20} className="text-amber-400" />
                  <p className="text-amber-300 font-bold text-sm">Build Your Streak</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Even on tough days — do at least ONE habit. Don't break the chain. Research shows that after 21 days of consistent habits, the behavior becomes automatic. After 66 days, it becomes permanent. You have 75 days. That's enough to change your English forever!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
