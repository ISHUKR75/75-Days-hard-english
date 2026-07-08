'use client';
// ============================================================
// LISTENING LAB PAGE — Complete listening practice hub
// Features: Audio exercises, dictation, comprehension,
// different difficulty levels, topics, progress tracking
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones, Play, Pause, Volume2, SkipForward, SkipBack,
  Target, Brain, BookOpen, Star, CheckCircle2, Zap,
  Clock, Globe, ChevronRight, BarChart2, Mic, Rewind,
  PenTool, RefreshCw, Lock, ArrowRight, MessageSquare,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

// ── Exercise types ────────────────────────────────────────────
const EXERCISE_TYPES = [
  { id: 'dialogue',     icon: MessageSquare, emoji: '💬', title: 'Dialogues',           desc: 'Real conversations between people',                  color: 'from-indigo-500 to-blue-500',   count: 25 },
  { id: 'dictation',    icon: PenTool,       emoji: '✍️', title: 'Dictation',           desc: 'Listen and write what you hear exactly',            color: 'from-violet-500 to-purple-500', count: 40 },
  { id: 'podcast',      icon: Headphones,    emoji: '🎙️', title: 'Podcast Style',       desc: 'Longer audio with interview or storytelling format', color: 'from-pink-500 to-rose-500',     count: 12 },
  { id: 'news',         icon: Globe,         emoji: '📰', title: 'News English',        desc: 'Formal news broadcast style — standard accent',      color: 'from-cyan-500 to-sky-500',      count: 15 },
  { id: 'fill-blank',   icon: BookOpen,      emoji: '📝', title: 'Fill in the Blanks',  desc: 'Listen and complete the missing words',             color: 'from-amber-500 to-orange-500',  count: 35 },
  { id: 'speed',        icon: Zap,           emoji: '⚡', title: 'Speed Training',      desc: 'Gradually increasing speed for advanced learners',  color: 'from-emerald-500 to-teal-500',  count: 20 },
];

// ── Listening exercises ───────────────────────────────────────
const EXERCISES = [
  {
    id: 1, type: 'dialogue', title: 'Office Introduction',
    level: 'A1', duration: '2:15', topic: 'Workplace',
    description: 'A new employee is being introduced to the team. Listen and answer questions about names, roles, and greetings.',
    transcript: '"Good morning! I\'m Sarah, the HR Manager. This is Rahul — he\'s joining our team as a Software Engineer." "Hello everyone, I\'m Rahul. I\'m very excited to be here." "Welcome to the team, Rahul! Let me show you around the office."',
    questions: ['What is Sarah\'s role?', 'What position is Rahul joining as?', 'How does Rahul feel about joining?'],
    locked: false,
  },
  {
    id: 2, type: 'dialogue', title: 'Making a Phone Call',
    level: 'A2', duration: '3:20', topic: 'Daily Life',
    description: 'Listen to a formal phone call to a bank. Practice understanding phone conversation etiquette.',
    transcript: '"Hello, this is ABC Bank customer service. How can I help you today?" "Hi, I\'d like to check my account balance, please." "Sure. Could you please provide your account number and date of birth?"',
    questions: ['Who is calling?', 'What does the customer want?', 'What does the bank ask for?'],
    locked: false,
  },
  {
    id: 3, type: 'news', title: 'Tech Industry News Brief',
    level: 'B1', duration: '4:45', topic: 'Technology',
    description: 'A short news segment about the latest technology trends. Practice understanding formal spoken English.',
    transcript: '"Good evening. In technology news, a major software company announced the launch of their new AI assistant. The CEO said this would revolutionize how people work from home. More details are expected tomorrow."',
    questions: ['What did the company announce?', 'What will the AI assistant revolutionize?', 'When will more details be available?'],
    locked: false,
  },
  {
    id: 4, type: 'podcast', title: 'Job Interview Tips',
    level: 'B1', duration: '6:30', topic: 'Career',
    description: 'An HR expert shares the top 5 mistakes people make in job interviews.',
    transcript: '"Welcome to Career Talk. Today I\'m speaking with Priya Sharma, an HR expert with 10 years of experience. Priya, what\'s the most common mistake candidates make?" "The biggest mistake is not researching the company before the interview..."',
    questions: ['Who is the guest?', 'How many years of experience does she have?', 'What\'s the biggest mistake mentioned?'],
    locked: false,
  },
  {
    id: 5, type: 'dictation', title: 'Daily Routine Description',
    level: 'A2', duration: '2:00', topic: 'Daily Life',
    description: 'Listen and write down the complete paragraph about someone\'s daily routine.',
    transcript: 'Every morning, I wake up at 6 AM. I exercise for thirty minutes and then have breakfast. I leave for office at 8:30 AM and reach by 9 o\'clock.',
    questions: ['Write exactly what you hear'],
    locked: false,
  },
  {
    id: 6, type: 'fill-blank', title: 'Business Meeting',
    level: 'B1', duration: '3:10', topic: 'Office',
    description: 'Listen to a meeting conversation and fill in the missing words to complete the transcript.',
    transcript: '"Let\'s start the ___. First, we\'ll review last month\'s ___ report." "The revenue was ___ percent higher than our ___." "That\'s excellent news. Now let\'s discuss our ___ for next quarter."',
    questions: ['Fill in 5 blanks from the audio'],
    locked: false,
  },
  {
    id: 7, type: 'dialogue', title: 'At the Doctor\'s',
    level: 'A2', duration: '3:50', topic: 'Health',
    description: 'A patient visits a doctor and explains their symptoms. Learn medical conversation vocabulary.',
    transcript: '"Good afternoon, Doctor." "Good afternoon! What seems to be the trouble today?" "I\'ve been having a headache for two days and I feel very tired." "Have you been drinking enough water? I\'ll prescribe some medicine."',
    questions: ['What is the patient\'s problem?', 'How long has the headache lasted?', 'What does the doctor ask about?'],
    locked: false,
  },
  {
    id: 8, type: 'speed', title: 'Speed Training — Level 1',
    level: 'B2', duration: '4:00', topic: 'Mixed',
    description: 'Practice listening at 1.25× speed. Great for training your ear to process English faster.',
    transcript: 'This exercise plays at slightly increased speed to challenge your processing ability.',
    questions: ['Answer comprehension questions after listening'],
    locked: false,
  },
  {
    id: 9, type: 'podcast', title: 'Indian Startup Success Story',
    level: 'B2', duration: '8:15', topic: 'Business',
    description: 'An entrepreneur shares how they built a successful startup from a small town in India.',
    transcript: '"I started my business with just five thousand rupees and a smartphone. People told me it was impossible, but I believed in my idea..."',
    questions: ['How did the startup begin?', 'What challenges did they face?', 'What advice did they give?'],
    locked: true,
  },
  {
    id: 10, type: 'news', title: 'Economic Update',
    level: 'C1', duration: '5:30', topic: 'Economics',
    description: 'Complex economic news requiring advanced vocabulary comprehension. For C1 learners.',
    transcript: '"The Reserve Bank has maintained its benchmark interest rate at 6.5%, citing sustained inflationary pressures in the economy..."',
    questions: ['What is the interest rate?', 'What is the reason for the decision?'],
    locked: true,
  },
];

// ── Listening Tips ────────────────────────────────────────────
const TIPS = [
  { icon: '🎧', tip: 'Use headphones — they isolate audio and help you catch subtle sounds more clearly.' },
  { icon: '🔁', tip: 'Replay difficult sections multiple times — that\'s normal and how you improve fast.' },
  { icon: '📝', tip: 'Take notes while listening — write key words and phrases, not full sentences.' },
  { icon: '🐢', tip: 'Start at 0.75× speed if needed — gradually increase to 1× then 1.25×' },
  { icon: '🔤', tip: 'Read the transcript AFTER listening — not before. First attempt builds real skill.' },
  { icon: '🌐', tip: 'Watch English YouTube/Netflix with English subtitles — not Hindi subtitles.' },
  { icon: '🗣️', tip: 'Shadow the speaker — repeat out loud what you hear while it plays.' },
  { icon: '📅', tip: 'Practice daily for 15 minutes — consistent short sessions beat weekly marathons.' },
];

const LEVEL_COLORS = { A1:'text-emerald-400 bg-emerald-500/10', A2:'text-sky-400 bg-sky-500/10', B1:'text-violet-400 bg-violet-500/10', B2:'text-amber-400 bg-amber-500/10', C1:'text-rose-400 bg-rose-500/10' };

// ── Mock Audio Player ─────────────────────────────────────────
function AudioPlayer({ exercise }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(32);

  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{exercise.title}</p>
          <p className="text-xs text-slate-500">{exercise.topic} · {exercise.duration}</p>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[exercise.level] || ''}`}>
          {exercise.level}
        </span>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden cursor-pointer" onClick={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
      }}>
        <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <span>0:43</span>
        <span>{exercise.duration}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button className="p-2 text-slate-400 hover:text-white transition-colors"><Rewind size={18} /></button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPlaying(!playing)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30"
        >
          {playing ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" fill="white" />}
        </motion.button>
        <button className="p-2 text-slate-400 hover:text-white transition-colors"><SkipForward size={18} /></button>
      </div>

      {/* Speed control */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {['0.75×', '1×', '1.25×', '1.5×'].map(speed => (
          <button key={speed} className={`text-xs px-2 py-1 rounded-lg transition-all ${speed === '1×' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
            {speed}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Exercise Card ─────────────────────────────────────────────
function ExerciseCard({ exercise, onSelect, isSelected }) {
  const levelClass = LEVEL_COLORS[exercise.level] || '';
  const typeIcons  = { dialogue: '💬', dictation: '✍️', podcast: '🎙️', news: '📰', 'fill-blank': '📝', speed: '⚡' };

  return (
    <motion.button
      variants={fadeUp}
      whileHover={!exercise.locked ? { y: -3 } : {}}
      onClick={() => !exercise.locked && onSelect(exercise)}
      className={`
        w-full text-left rounded-2xl border p-5 transition-all relative overflow-hidden
        ${isSelected  ? 'border-primary-500/40 bg-primary-500/8'               : ''}
        ${exercise.locked ? 'opacity-40 cursor-not-allowed bg-white/2 border-white/5' : 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15'}
        ${!isSelected && !exercise.locked ? '' : ''}
      `}
    >
      {exercise.locked && (
        <div className="absolute top-3 right-3">
          <Lock size={14} className="text-slate-600" />
        </div>
      )}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">{typeIcons[exercise.type] || '🎧'}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-bold text-white text-sm">{exercise.title}</p>
          </div>
          <div className="flex items-center gap-2 text-xs flex-wrap">
            <span className={`font-bold px-1.5 py-0.5 rounded-md ${levelClass}`}>{exercise.level}</span>
            <span className="text-slate-500">{exercise.topic}</span>
            <span className="text-slate-600 flex items-center gap-1"><Clock size={9} /> {exercise.duration}</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{exercise.description}</p>
    </motion.button>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ListeningLabPage() {
  const [selectedExercise, setSelectedExercise] = useState(EXERCISES[0]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('exercises'); // exercises | types | tips

  const filtered = typeFilter === 'all' ? EXERCISES : EXERCISES.filter(e => e.type === typeFilter);

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center">
              <Headphones size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">Listening Lab</h1>
              <p className="text-slate-400 text-sm">Train your ears — dialogues, news, dictation, podcasts.</p>
            </div>
          </div>
          <Link href="/pronunciation-lab" className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5">
            <Volume2 size={14} /> Pronunciation Lab
          </Link>
        </div>
      </motion.div>

      {/* ── Stats Row ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Exercises',      value: '150+', icon: '🎧', color: 'text-sky-400'     },
          { label: 'Audio Hours',    value: '8h+',  icon: '⏱️', color: 'text-violet-400'  },
          { label: 'Levels',         value: 'A1-C1',icon: '📊', color: 'text-amber-400'   },
          { label: 'Exercise Types', value: '6',    icon: '🎯', color: 'text-emerald-400'  },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="card p-4 flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <p className={`text-xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Tabs ────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'exercises', label: 'All Exercises'   },
          { id: 'types',     label: 'Exercise Types'  },
          { id: 'tips',      label: 'How to Improve'  },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${activeTab === tab.id ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Exercises ──────────────────────────────── */}
      {activeTab === 'exercises' && (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Exercise List */}
          <div className="xl:col-span-3">
            {/* Type filter */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <button onClick={() => setTypeFilter('all')} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${typeFilter === 'all' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
                All ({EXERCISES.length})
              </button>
              {EXERCISE_TYPES.map(t => (
                <button key={t.id} onClick={() => setTypeFilter(t.id)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${typeFilter === t.id ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
                  {t.emoji} {t.title}
                </button>
              ))}
            </div>

            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
              {filtered.map(ex => (
                <ExerciseCard key={ex.id} exercise={ex} onSelect={setSelectedExercise} isSelected={selectedExercise?.id === ex.id} />
              ))}
            </motion.div>
          </div>

          {/* Exercise Detail / Player */}
          <div className="xl:col-span-2">
            <AnimatePresence mode="wait">
              {selectedExercise && (
                <motion.div
                  key={selectedExercise.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="sticky top-20 space-y-4"
                >
                  {/* Player */}
                  <AudioPlayer exercise={selectedExercise} />

                  {/* Transcript */}
                  <div className="card p-5">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">📄 Transcript</p>
                    <p className="text-sm text-slate-300 leading-relaxed italic">{selectedExercise.transcript}</p>
                  </div>

                  {/* Comprehension Questions */}
                  <div className="card p-5">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">❓ Comprehension Questions</p>
                    <div className="space-y-2">
                      {selectedExercise.questions.map((q, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 bg-white/4 rounded-lg">
                          <span className="text-xs font-bold text-primary-400 shrink-0">Q{i+1}.</span>
                          <p className="text-xs text-slate-300">{q}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── Tab: Exercise Types ──────────────────────────── */}
      {activeTab === 'types' && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXERCISE_TYPES.map(type => {
            const Icon = type.icon;
            return (
              <motion.div key={type.id} variants={fadeUp} whileHover={{ y: -4 }} className="card p-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {type.emoji}
                </div>
                <h3 className="font-bold text-white mb-1">{type.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{type.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{type.count} exercises</span>
                  <button onClick={() => { setTypeFilter(type.id); setActiveTab('exercises'); }} className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                    Practice <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* ── Tab: Tips ───────────────────────────────────── */}
      {activeTab === 'tips' && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl space-y-3">
          {TIPS.map((tip, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 p-4 card">
              <span className="text-2xl shrink-0">{tip.icon}</span>
              <p className="text-sm text-slate-300 leading-relaxed">{tip.tip}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
