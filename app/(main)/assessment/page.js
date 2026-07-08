'use client';
// ============================================================
// ASSESSMENT PAGE — Tests, quizzes, CEFR placement
// Features: Placement test, topic tests, timed quizzes,
// score tracking, detailed results, CEFR certification
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Target, Clock, CheckCircle2, X, Star, Award,
  BarChart2, Zap, ArrowRight, Play, RefreshCw, Trophy,
  BookOpen, Globe, Mic, PenTool, Lock, ChevronRight,
  GraduationCap, TrendingUp,
} from 'lucide-react';
import { useGamificationStore } from '@/store/useGamificationStore';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

const ASSESSMENT_TYPES = [
  {
    id: 'placement',
    icon: GraduationCap,
    emoji: '🎯',
    title: 'CEFR Placement Test',
    desc: 'Find your exact English level — A0 to C2. 30 adaptive questions covering all skills.',
    duration: '20 min',
    questions: 30,
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500/8',
    border: 'border-indigo-500/25',
    badge: 'Recommended',
    href: '/assessment/placement',
    levels: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  },
  {
    id: 'grammar',
    icon: BookOpen,
    emoji: '📖',
    title: 'Grammar Proficiency',
    desc: 'Test your grammar knowledge — tenses, modals, sentence structure, voice.',
    duration: '15 min',
    questions: 25,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/25',
    badge: null,
    href: '/assessment/grammar',
    locked: false,
  },
  {
    id: 'vocabulary',
    icon: Globe,
    emoji: '🔤',
    title: 'Vocabulary Assessment',
    desc: 'Measure your vocabulary range — 1000 to 10,000 words across CEFR levels.',
    duration: '10 min',
    questions: 20,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/25',
    badge: null,
    href: '/assessment/vocabulary',
    locked: false,
  },
  {
    id: 'reading',
    icon: BookOpen,
    emoji: '📰',
    title: 'Reading Comprehension',
    desc: 'Read passages and answer comprehension questions — from simple to complex.',
    duration: '25 min',
    questions: 20,
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-500/8',
    border: 'border-teal-500/25',
    badge: null,
    href: '/assessment/reading',
    locked: false,
  },
  {
    id: 'writing',
    icon: PenTool,
    emoji: '✍️',
    title: 'Writing Skills Test',
    desc: 'Write an email or essay and get detailed feedback on grammar, style, vocabulary.',
    duration: '30 min',
    questions: 5,
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/25',
    badge: null,
    href: '/assessment/writing',
    locked: false,
  },
  {
    id: 'topic',
    icon: Target,
    emoji: '📚',
    title: 'Topic-Wise Tests',
    desc: 'Test yourself on specific days — Day 1-5 test, Day 6-10, etc.',
    duration: '10 min',
    questions: 15,
    color: 'from-cyan-500 to-sky-600',
    bg: 'bg-cyan-500/8',
    border: 'border-cyan-500/25',
    badge: null,
    href: '/assessment/topic',
    locked: false,
  },
];

// ── Sample Placement Test Questions ────────────────────────────
const PLACEMENT_QUESTIONS = [
  {
    id: 1,
    q: 'Choose the correct sentence:',
    options: ['She don\'t like coffee.', 'She doesn\'t like coffee.', 'She isn\'t like coffee.', 'She not like coffee.'],
    correct: 1,
    explanation: '"She" is third person singular — use "doesn\'t" with it.',
    level: 'A1',
  },
  {
    id: 2,
    q: 'Which sentence is in Present Perfect tense?',
    options: ['I go to school.', 'I went to school.', 'I have gone to school.', 'I was going to school.'],
    correct: 2,
    explanation: 'Present Perfect = have/has + past participle (gone).',
    level: 'B1',
  },
  {
    id: 3,
    q: '"वह कल आई थी।" — Translate to English:',
    options: ['She comes yesterday.', 'She came yesterday.', 'She will come yesterday.', 'She was come yesterday.'],
    correct: 1,
    explanation: 'Simple Past tense = came (past form of "come").',
    level: 'A2',
  },
  {
    id: 4,
    q: 'Choose the correct modal verb: "You ___ wear a seatbelt. It\'s the law."',
    options: ['can', 'may', 'must', 'would'],
    correct: 2,
    explanation: '"Must" shows strong obligation — like a law or rule.',
    level: 'A2',
  },
  {
    id: 5,
    q: 'Which sentence uses passive voice correctly?',
    options: [
      'The manager approved the project.',
      'The project was approved by the manager.',
      'The project approved by the manager.',
      'The manager was approved the project.',
    ],
    correct: 1,
    explanation: 'Passive voice: Object + was/is + past participle + by + subject.',
    level: 'B1',
  },
];

// ── Mini Quiz Component ────────────────────────────────────────
function MiniPlacementTest() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { addXP } = useGamificationStore();

  const question = PLACEMENT_QUESTIONS[current];
  const selectedAnswer = answers[current];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect  = selectedAnswer === question.correct;

  const handleAnswer = (idx) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [current]: idx }));
    setShowExplanation(true);
    if (idx === question.correct) addXP?.(20);
  };

  const handleNext = () => {
    if (current < PLACEMENT_QUESTIONS.length - 1) {
      setCurrent(c => c + 1);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
    setShowExplanation(false);
  };

  const score = Object.entries(answers).filter(([q, a]) => PLACEMENT_QUESTIONS[parseInt(q)].correct === a).length;
  const pct   = Math.round((score / PLACEMENT_QUESTIONS.length) * 100);
  const cefr  = pct >= 80 ? 'B2' : pct >= 60 ? 'B1' : pct >= 40 ? 'A2' : 'A1';

  if (showResult) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-6">
        <div className="text-4xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '👍' : '📚'}</div>
        <h3 className="text-2xl font-black text-white mb-2">{score}/{PLACEMENT_QUESTIONS.length} Correct</h3>
        <p className={`text-lg font-bold mb-1 ${pct >= 80 ? 'text-emerald-400' : pct >= 60 ? 'text-violet-400' : 'text-amber-400'}`}>
          Estimated Level: {cefr}
        </p>
        <p className="text-slate-400 text-sm mb-6">
          {pct >= 80 ? 'Excellent! You have strong English fundamentals.' : pct >= 60 ? 'Good work! Keep practicing to reach the next level.' : 'Keep going! Consistent practice will improve your score.'}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={handleReset} className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5">
            <RefreshCw size={14} /> Try Again
          </button>
          <Link href="/assessment/placement" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            Full Placement Test <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
        <span>Question {current + 1} of {PLACEMENT_QUESTIONS.length}</span>
        <span className="text-primary-400 font-semibold">{question.level} Level</span>
      </div>
      <div className="h-1.5 bg-white/8 rounded-full mb-6 overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" animate={{ width: `${((current) / PLACEMENT_QUESTIONS.length) * 100}%` }} />
      </div>

      <h3 className="text-base font-bold text-white mb-5">{question.q}</h3>

      <div className="space-y-2 mb-4">
        {question.options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={!isAnswered ? { x: 4 } : {}}
            onClick={() => handleAnswer(i)}
            className={`
              w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center gap-3
              ${!isAnswered ? 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/20 text-slate-300 cursor-pointer' : ''}
              ${isAnswered && i === question.correct ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-200' : ''}
              ${isAnswered && i === selectedAnswer && i !== question.correct ? 'bg-rose-500/15 border-rose-500/35 text-rose-200' : ''}
              ${isAnswered && i !== question.correct && i !== selectedAnswer ? 'bg-white/2 border-white/5 text-slate-600 opacity-50' : ''}
            `}
          >
            <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
              !isAnswered ? 'border-white/15 text-slate-500' :
              i === question.correct ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' :
              i === selectedAnswer ? 'border-rose-500 bg-rose-500/20 text-rose-300' :
              'border-white/8 text-slate-600'
            }`}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
            {isAnswered && i === question.correct && <CheckCircle2 size={16} className="text-emerald-400 ml-auto" />}
            {isAnswered && i === selectedAnswer && i !== question.correct && <X size={16} className="text-rose-400 ml-auto" />}
          </motion.button>
        ))}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border mb-4 text-sm ${isCorrect ? 'bg-emerald-500/8 border-emerald-500/20 text-emerald-200' : 'bg-rose-500/8 border-rose-500/20 text-rose-200'}`}
          >
            <p className="font-bold mb-1">{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
            <p className="text-slate-300">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnswered && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
          className="w-full btn-primary py-3 text-sm">
          {current < PLACEMENT_QUESTIONS.length - 1 ? 'Next Question →' : 'See Results 🎯'}
        </motion.button>
      )}
    </div>
  );
}

// ── Assessment Card ───────────────────────────────────────────
function AssessmentCard({ type }) {
  const Icon = type.icon;
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -3 }}>
      <Link href={type.href} className={`block card p-5 h-full border ${type.border} ${type.bg.replace('/8', '/5')} hover:${type.bg} group transition-all relative overflow-hidden`}>
        {type.badge && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            {type.badge}
          </span>
        )}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
          {type.emoji}
        </div>
        <h3 className="font-bold text-white mb-1">{type.title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{type.desc}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Clock size={10} /> {type.duration}</span>
            <span className="flex items-center gap-1"><Target size={10} /> {type.questions} Q</span>
          </div>
          <ChevronRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AssessmentPage() {
  const { xp = 0, level = 1, topicsCompleted = 0 } = useGamificationStore();

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">Assessment Center</h1>
        </div>
        <p className="text-slate-400 pl-1">Test your skills — placement, grammar, vocabulary, reading, writing.</p>
      </motion.div>

      {/* ── Your Level Card ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8 border-primary-500/20 bg-primary-500/5"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-primary-400 font-bold uppercase tracking-wider mb-1">Your Current Progress</p>
            <h3 className="text-xl font-black text-white mb-1">Level {level} · {xp.toLocaleString()} XP</h3>
            <p className="text-sm text-slate-400">{topicsCompleted} days completed · Take a placement test to know your CEFR level</p>
          </div>
          <Link href="/assessment/placement" className="btn-primary flex items-center gap-2 text-sm shrink-0 px-6 py-3">
            <GraduationCap size={16} /> Take Placement Test
          </Link>
        </div>
      </motion.div>

      {/* ── Mini Quiz Demo ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-yellow-400" /> Quick Quiz Sample
          </h3>
          <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg">5 questions · Demo</span>
        </div>
        <MiniPlacementTest />
      </motion.div>

      {/* ── Assessment Types ─────────────────────────────── */}
      <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <BarChart2 size={18} className="text-primary-400" /> All Assessments
      </h3>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
      >
        {ASSESSMENT_TYPES.map(type => <AssessmentCard key={type.id} type={type} />)}
      </motion.div>

      {/* ── Score History ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card p-6"
      >
        <h3 className="font-bold text-white mb-5 flex items-center gap-2">
          <Trophy size={18} className="text-yellow-400" /> Assessment History
        </h3>
        <div className="space-y-3">
          {[
            { test: 'Grammar Quick Test',       score: 88, questions: 25, date: '2 days ago',  cefr: 'B1', icon: '📖' },
            { test: 'Vocabulary Assessment',     score: 76, questions: 20, date: '1 week ago',  cefr: 'A2', icon: '🔤' },
            { test: 'Quick Grammar Check',       score: 92, questions: 10, date: '2 weeks ago', cefr: 'B1', icon: '✅' },
          ].map((h, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/3 rounded-xl border border-white/6 hover:bg-white/5 transition-colors">
              <span className="text-2xl">{h.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{h.test}</p>
                <p className="text-xs text-slate-500">{h.questions} questions · {h.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${h.score >= 80 ? 'text-emerald-400' : h.score >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>{h.score}%</p>
                <p className="text-xs text-slate-500">{h.cefr}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-xs text-slate-600 border-t border-white/6 pt-4">
          Complete more assessments to build your score history
        </div>
      </motion.div>
    </div>
  );
}
