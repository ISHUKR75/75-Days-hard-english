'use client';

// ============================================================
// Day Page — Comprehensive Learning System
// Day: Self Introduction (Day 2) and all other days
// Features: Vocabulary Search, Practice Filters, MCQ Test,
//           Speaking Drills, Writing Tasks, Listening TTS,
//           Reading Comprehension, Revision Quiz
// Author: 75 Days Hard English Platform
// ============================================================

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useGamificationStore } from '@/store/useGamificationStore';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Target, Mic,
  CheckCircle2, ChevronDown, Star,
  PenTool, Brain, Zap,
  FileText, Trophy, XCircle,
  Headphones, BookOpenCheck, RotateCcw,
  Search, Filter, Volume2, Eye, EyeOff,
  ChevronLeft, ChevronRight, BarChart3,
  AlertCircle, Lightbulb, Clock, Award,
  MessageSquare, BookMarked, Layers, Hash,
  Flag, Sparkles, Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================
// Sound Effect Hook — Web Audio API (no external dependency)
// Plays correct/wrong/reveal sounds for interactive feedback
// ============================================================
function useSound() {
  // Returns a function that plays a tone based on type
  const playSound = useCallback((type) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        // Happy ascending tone — C5 → A5
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'wrong') {
        // Descending buzz — wrong answer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'reveal') {
        // Soft ping — reveal answer
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.07, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'levelup') {
        // Multi-note celebration — level up
        const freqs = [523, 659, 784, 1047];
        freqs.forEach((freq, i) => {
          const o2 = ctx.createOscillator();
          const g2 = ctx.createGain();
          o2.connect(g2);
          g2.connect(ctx.destination);
          o2.type = 'sine';
          o2.frequency.value = freq;
          g2.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.12);
          g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
          o2.start(ctx.currentTime + i * 0.12);
          o2.stop(ctx.currentTime + i * 0.12 + 0.25);
        });
      }
    } catch (e) {
      // Audio not available — silent fallback
    }
  }, []);
  return playSound;
}

// ============================================================
// Data Fetching Hook — fetches all day data from API route
// /api/challenge/[day] returns combined JSON from JSON files
// ============================================================
function useDayData(dayNum) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        // Fetch from API route which reads all day JSON files
        const res = await fetch(`/api/challenge/${dayNum}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setError(`Failed to load day ${dayNum} data`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [dayNum]);

  return { data, loading, error };
}

// ============================================================
// Text Normalization — makes answer checking flexible
// Ignores capitalization, extra spaces, punctuation
// ============================================================
function normalizeAnswerText(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Checks if user input matches any accepted answer
function isAnswerCorrect(userInput, question) {
  const candidate = normalizeAnswerText(userInput);
  if (!candidate) return false;

  // Check against main answer + alternatives array
  const accepted = [
    question?.english,
    question?.answer,
    ...(Array.isArray(question?.alternatives) ? question.alternatives : []),
  ].filter(Boolean);

  return accepted.some((answer) => normalizeAnswerText(answer) === candidate);
}

// ============================================================
// getCorrectOptionText — resolves MCQ answer to actual option text.
// daily-test.json stores "correct": "B" (letter A/B/C/D).
// This converts the letter to the matching option string so we
// can highlight the right option and score correctly.
// ============================================================
function getCorrectOptionText(question) {
  if (!question) return '';
  const opts = question.options || [];

  // Format 1: correct is a single letter A/B/C/D (normalize for safety: trim + uppercase)
  const normalizedCorrect = (question.correct || '').trim().toUpperCase();
  if (
    normalizedCorrect.length === 1 &&
    normalizedCorrect >= 'A' &&
    normalizedCorrect <= 'Z'
  ) {
    const idx = normalizedCorrect.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
    if (opts[idx] !== undefined) return opts[idx];
  }

  // Format 2: correct/answer is already the full option text
  if (question.correct && typeof question.correct === 'string' && question.correct.length > 1) {
    return question.correct;
  }

  // Format 3: answer field contains full text
  if (question.answer && typeof question.answer === 'string') {
    return question.answer;
  }

  return '';
}

// ============================================================
// Text-to-Speech utility — uses browser Speech Synthesis API
// Speaks English sentences aloud for listening practice
// ============================================================
function speakText(text, rate = 0.85) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

// ============================================================
// Lesson Sections Configuration — 9 learning sections per day
// Each section covers a different skill area
// ============================================================
const LESSON_SECTIONS = [
  { id: 'overview',   icon: Lightbulb,     label: 'Overview & Why It Matters', color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30'   },
  { id: 'concept',    icon: BookOpen,      label: 'Concept & Theory',         color: 'text-indigo-400',  bg: 'bg-indigo-500/10',  border: 'border-indigo-500/30'  },
  { id: 'vocabulary', icon: FileText,      label: 'Vocabulary',               color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30'    },
  { id: 'practice',   icon: Target,        label: 'Interactive Practice',     color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { id: 'speaking',   icon: Mic,           label: 'Speaking & Pronunciation', color: 'text-pink-400',    bg: 'bg-pink-500/10',    border: 'border-pink-500/30'    },
  { id: 'writing',    icon: PenTool,       label: 'Writing Drills',           color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/30'    },
  { id: 'listening',  icon: Headphones,    label: 'Listening Practice',       color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/30'     },
  { id: 'reading',    icon: BookOpenCheck, label: 'Reading Comprehension',    color: 'text-lime-400',    bg: 'bg-lime-500/10',    border: 'border-lime-500/30'    },
  { id: 'studyPlan',  icon: Clock,         label: 'Daily Study Plan',         color: 'text-teal-400',    bg: 'bg-teal-500/10',    border: 'border-teal-500/30'    },
  { id: 'revision',   icon: RotateCcw,     label: 'Revision & Quick Quiz',    color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/30'  },
  { id: 'test',       icon: Brain,         label: 'Final Mock Test',          color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/30'  },
  { id: 'milestones', icon: Award,         label: 'Milestones & Badges',      color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30' },
  { id: 'challenge',  icon: Flag,          label: "Today's Challenge Task",   color: 'text-red-400',     bg: 'bg-red-500/10',     border: 'border-red-500/30'     },
];

// ============================================================
// Main Day Page Component
// Renders the header, progress bar, and all 9 sections
// ============================================================
export default function DayPage() {
  const params = useParams();
  const dayNum = parseInt(params?.day || '1', 10);

  const { data, loading, error } = useDayData(dayNum);

  // Topic info from API (static map + meta override)
  const topic = data?.topic || {
    title: 'Loading...', emoji: '⏳', cefr: 'A1', difficulty: 'beginner', type: 'grammar'
  };

  // Grammar/theory content from lessons.json
  const content = data?.content || {
    explanation: '', rules: [], memoryTrick: '', sections: []
  };

  // ── Real gamification store — XP is persisted and shown in navbar ──────
  const addXP     = useGamificationStore(s => s.addXP);
  const xpTotal   = useGamificationStore(s => s.xp ?? 0);

  // ── Multi-section accordion — vocabulary & practice open by default ──────
  // Set instead of single string so multiple sections can be open at once
  const [openSections, setOpenSections] = useState(
    () => new Set(['concept', 'vocabulary', 'practice'])
  );
  const [sectionsDone, setSectionsDone] = useState({});
  const playSound = useSound();

  // Toggle a section open/closed — allows multiple open simultaneously
  const toggleSection = useCallback((id) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Mark a section as done and award real XP to the gamification store
  const markSectionDone = useCallback((id) => {
    if (!sectionsDone[id]) {
      setSectionsDone((prev) => ({ ...prev, [id]: true }));
      // Award 100 XP to the persistent gamification store (shown in navbar)
      if (typeof addXP === 'function') {
        addXP(100, { source: 'lesson_section', dayNum, sectionId: id });
      }
      playSound('levelup');
    }
  }, [sectionsDone, addXP, dayNum, playSound]);

  const prevDay = dayNum > 1 ? dayNum - 1 : null;
  const nextDay = dayNum < 75 ? dayNum + 1 : null;

  // Overall progress for today's lesson
  const progressPct = (Object.keys(sectionsDone).length / LESSON_SECTIONS.length) * 100;

  // Loading state
  if (loading && !data) {
    return (
      <div className="max-w-4xl mx-auto py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-12 text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/20 flex items-center justify-center animate-pulse">
              <BookOpen size={32} className="text-primary-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">Loading Day {dayNum}...</p>
          <p className="text-slate-400">Fetching lesson data — vocabulary, practice, tests & more.</p>
          <div className="w-48 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-primary-500 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !data) {
    return (
      <div className="max-w-4xl mx-auto py-16">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-12 text-center space-y-4">
          <AlertCircle size={48} className="text-red-400 mx-auto" />
          <p className="text-2xl font-bold text-white">Failed to Load Day {dayNum}</p>
          <p className="text-slate-400">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Stats for the header display
  const stats = data?.stats || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-5xl mx-auto space-y-8 pb-32"
    >
      {/* ── Breadcrumb Navigation ─────────────────────────────── */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={16} /> 75 Days Challenge
        </Link>
        <span>/</span>
        <span className="text-primary-400 font-semibold">Day {dayNum} — {topic.title}</span>
      </nav>

      {/* ── Topic Header ──────────────────────────────────────── */}
      <motion.div
        layoutId="topic-header"
        className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl"
      >
        {/* Background glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          {/* Emoji icon */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 flex items-center justify-center text-5xl shrink-0 shadow-inner">
            {topic.emoji}
          </div>

          {/* Topic info */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30">
                Day {dayNum}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {topic.cefr}
              </span>
              <span className={cn(
                "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border",
                topic.difficulty === 'beginner'     ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                topic.difficulty === 'elementary'   ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                topic.difficulty === 'intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                      'bg-red-500/10 text-red-400 border-red-500/20'
              )}>
                {topic.difficulty}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-800 text-slate-400 border border-slate-700 capitalize">
                {topic.type}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{topic.title}</h1>
            <p className="text-slate-400 text-lg">Complete Masterclass — Grammar · Vocabulary · Practice · Speaking · Writing</p>
          </div>

          {/* XP display */}
          <div className="shrink-0 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex flex-col items-center justify-center">
              <Trophy size={20} className="text-amber-400 mb-1" />
              <span className="text-xl font-black text-amber-400">{xpTotal}</span>
              <span className="text-xs text-amber-600 font-bold">XP</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        {stats.practiceCount > 0 && (
          <div className="relative z-10 mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            <div className="text-center">
              <p className="text-2xl font-black text-cyan-400">{stats.vocabularyCount || 0}</p>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Words</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-400">{stats.practiceCount || 0}</p>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Practice Q&apos;s</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-violet-400">{stats.mockTestCount || 0}</p>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Test Q&apos;s</p>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-800">
          <div className="flex justify-between text-sm font-semibold text-slate-400 mb-3">
            <span>Today&apos;s Progress</span>
            <span className="text-white">
              {Object.keys(sectionsDone).length} / {LESSON_SECTIONS.length} Sections Complete
            </span>
          </div>
          <div className="h-3 rounded-full bg-slate-800 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 relative"
            >
              <div className="absolute inset-0 bg-white/15 w-full h-full" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Lesson Sections ───────────────────────────────────── */}
      <div className="space-y-4">
        {LESSON_SECTIONS.map(({ id, icon: Icon, label, color, bg, border }, index) => {
          const isDone    = sectionsDone[id];
          const isActive  = openSections.has(id);

          // Rich subtitle shows content counts so users know what's inside ──────
          const subtitle = isDone
            ? '✨ Completed — +100 XP earned'
            : id === 'vocabulary'  ? (stats.vocabularyCount > 0  ? `${stats.vocabularyCount.toLocaleString()} words · CEFR A0–B2 · Search, filter & listen to every word`  : 'Vocabulary bank — loading…')
            : id === 'practice'    ? (stats.practiceCount > 0    ? `${stats.practiceCount.toLocaleString()} Hindi→English questions · 20 / 40 / 60 / 80 / 100 % session picker` : 'Practice questions — loading…')
            : id === 'test'        ? (stats.mockTestCount > 0    ? `${stats.mockTestCount.toLocaleString()} MCQ questions · Timed · Auto-graded · 20 / 40 / 60 / 80 / 100 %`  : 'Mock test — loading…')
            : id === 'speaking'    ? 'Speaking drills · Text-to-speech · Pronunciation guide'
            : id === 'listening'   ? 'Listening exercises · Comprehension · Dictation'
            : id === 'reading'     ? 'Reading passages · Comprehension questions · Speed tips'
            : id === 'writing'     ? 'Writing drills · Templates · Grammar correction'
            : id === 'revision'    ? 'Quick revision · Flash quiz · Key rules recap'
            : id === 'milestones'  ? 'Badges · XP milestones · Challenge achievements'
            : 'Click to expand and start learning';

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className={cn(
                "rounded-2xl overflow-hidden border transition-all duration-300",
                isActive
                  ? "bg-slate-900 border-primary-500/50 shadow-lg shadow-primary-500/10"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              )}
            >
              {/* Section Header Button */}
              <button
                onClick={() => toggleSection(id)}
                className="w-full flex items-center gap-5 p-6 text-left group"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110",
                  isDone ? 'bg-emerald-500/20 shadow-lg shadow-emerald-500/20' : bg
                )}>
                  {isDone
                    ? <CheckCircle2 size={26} className="text-emerald-400" />
                    : <Icon size={26} className={color} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-xl">{label}</h3>
                  <p className={cn("text-sm mt-0.5 truncate", isDone ? 'text-emerald-400 font-semibold' : 'text-slate-400')}>
                    {subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {!isDone && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary-500/10 text-primary-400 text-sm font-bold border border-primary-500/20">
                      <Zap size={12} /> +100 XP
                    </span>
                  )}
                  <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={22} className="text-slate-500" />
                  </motion.div>
                </div>
              </button>

              {/* Section Content — lazy rendered when expanded */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 border-t border-slate-800 pt-6">
                      {id === 'overview' && (
                        <OverviewSection
                          overview={data?.overview}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'concept' && (
                        <ConceptSection
                          topic={topic}
                          content={content}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'vocabulary' && (
                        <VocabularyMassive
                          vocabulary={data?.vocabulary || []}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'practice' && (
                        <InteractivePractice
                          practiceQs={data?.practice || []}
                          playSound={playSound}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'speaking' && (
                        <SpeakingAdvanced
                          topic={topic}
                          speaking={data?.speaking}
                          practiceQs={data?.practice || []}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'writing' && (
                        <WritingAdvanced
                          topic={topic}
                          content={content}
                          vocabulary={data?.vocabulary || []}
                          writing={data?.writing}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'listening' && (
                        <ListeningPractice
                          listening={data?.listening}
                          playSound={playSound}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'reading' && (
                        <ReadingComprehension
                          reading={data?.reading}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'studyPlan' && (
                        <StudyPlanSection
                          morningRoutine={data?.morningRoutine}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'revision' && (
                        <RevisionQuiz
                          revision={data?.revision}
                          playSound={playSound}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'test' && (
                        <MockTestMCQ
                          dayNum={dayNum}
                          mockTest={data?.mockTest || []}
                          playSound={playSound}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'milestones' && (
                        <MilestonesSection
                          milestones={data?.milestones}
                          dayNum={dayNum}
                          completedSections={completedSections}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                      {id === 'challenge' && (
                        <ChallengeTaskSection
                          challenge={data?.challenge}
                          dayNum={dayNum}
                          onComplete={() => markSectionDone(id)}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* ── Day Navigation ────────────────────────────────────── */}
      <div className="flex justify-between items-center pt-6">
        {prevDay ? (
          <Link
            href={`/75-days-challenge/${prevDay}`}
            className="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold flex items-center gap-2 hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <ArrowLeft size={18} /> Day {prevDay}
          </Link>
        ) : <div />}

        {nextDay ? (
          <Link
            href={`/75-days-challenge/${nextDay}`}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-primary-500/25"
          >
            Day {nextDay} <ArrowRight size={20} />
          </Link>
        ) : (
          <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-amber-500/25 flex items-center gap-2">
            <Trophy size={20} /> 🎉 Challenge Complete!
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// SECTION 1: Concept & Theory
// Shows full lesson explanation, key rules, memory tricks,
// common mistakes, and all lesson sections from lessons.json
// ============================================================
function ConceptSection({ topic, content, onComplete }) {
  const [expandedSection, setExpandedSection] = useState(0);
  // Show-more toggles — Concept tab used to hard-cap Key Rules/Mistakes at
  // 10/8 items, hiding real content once a day's data grew past that. Now
  // everything is visible by default with an optional collapse for long lists.
  const [showAllRules, setShowAllRules] = useState(false);
  const [showAllMistakes, setShowAllMistakes] = useState(false);

  // Helper: renders **bold** markdown in text
  const renderBold = (text) => {
    if (!text) return null;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} className="text-white font-bold">{part}</strong>
        : <span key={i}>{part}</span>
    );
  };

  // Sections from lessons.json — the most detailed content
  const lessonSections = content?.sections || [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
          <BookOpen className="text-indigo-400" size={24} />
          Deep Dive: {topic.title}
        </h2>
        <p className="text-slate-400">Complete theory, concepts, rules, examples, and memory tricks</p>
      </div>

      {/* Full Explanation Block */}
      {content?.explanation && (
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 space-y-4">
          {content.explanation.split('\n\n---\n\n').map((block, blockIdx) => (
            <div key={blockIdx} className={cn(blockIdx > 0 && 'border-t border-slate-800 pt-4')}>
              {block.split('\n').map((line, i) => {
                if (!line.trim()) return null;
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <h4 key={i} className="text-lg font-bold text-indigo-300 mb-2 mt-4 first:mt-0">
                      {line.replace(/\*\*/g, '')}
                    </h4>
                  );
                }
                if (line.startsWith('📐 Formula:')) {
                  return (
                    <div key={i} className="mt-2 px-4 py-2 bg-indigo-900/30 border border-indigo-500/30 rounded-xl">
                      <code className="text-indigo-300 text-sm font-mono">{line}</code>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-slate-300 leading-relaxed text-base">
                    {renderBold(line)}
                  </p>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* Lesson Sections from lessons.json — each subtopic */}
      {lessonSections.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers size={20} className="text-indigo-400" />
            Lesson Subtopics ({lessonSections.length} sections)
          </h3>
          {lessonSections.map((section, idx) => (
            <div
              key={idx}
              className={cn(
                "rounded-2xl border transition-all duration-200",
                expandedSection === idx
                  ? "border-indigo-500/40 bg-indigo-500/5"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
              )}
            >
              <button
                onClick={() => setExpandedSection(expandedSection === idx ? -1 : idx)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <span className="text-indigo-400 font-bold text-sm">{idx + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white">{section.title}</p>
                  {section.hindiTitle && (
                    <p className="text-sm text-slate-500 hindi-text">{section.hindiTitle}</p>
                  )}
                </div>
                <ChevronDown
                  size={18}
                  className={cn("text-slate-500 transition-transform shrink-0", expandedSection === idx && "rotate-180")}
                />
              </button>

              {expandedSection === idx && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-800 pt-4">
                  {/* Explanation */}
                  <p className="text-slate-300 leading-relaxed">{section.explanation}</p>

                  {/* Formula */}
                  {section.formula && (
                    <div className="px-4 py-3 bg-slate-800 rounded-xl border border-slate-700">
                      <p className="text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">📐 Formula</p>
                      <code className="text-emerald-300 font-mono text-sm">{section.formula}</code>
                    </div>
                  )}

                  {/* Examples */}
                  {section.examples?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Examples</p>
                      {section.examples.map((ex, i) => (
                        <div key={i} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <p className="text-white font-semibold">{ex.english}</p>
                              <p className="text-amber-300/80 text-sm hindi-text">{ex.hindi}</p>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); speakText(ex.english); }}
                              className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 hover:bg-sky-500/20 transition-colors"
                              title="Listen"
                            >
                              <Volume2 size={14} className="text-sky-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Key Rules & Memory Trick Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {content?.rules?.length > 0 && (
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Star size={18} className="text-amber-400" /> Key Rules ({content.rules.length})
            </h3>
            <ul className="space-y-3">
              {(showAllRules ? content.rules : content.rules.slice(0, 10)).map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            {content.rules.length > 10 && (
              <button
                onClick={() => setShowAllRules(v => !v)}
                className="mt-4 text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                {showAllRules ? 'Show less' : `Show all ${content.rules.length} rules`}
                <ChevronDown size={14} className={cn('transition-transform', showAllRules && 'rotate-180')} />
              </button>
            )}
          </div>
        )}

        {content?.memoryTrick && (
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 rounded-2xl border border-amber-500/20">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Zap size={18} /> Memory Trick
            </h3>
            <p className="text-amber-100/90 font-medium leading-relaxed">{content.memoryTrick}</p>
          </div>
        )}
      </div>

      {/* Common Mistakes */}
      {content?.mistakes?.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <AlertCircle size={18} /> Common Mistakes to Avoid ({content.mistakes.length})
          </h3>
          <ul className="space-y-3">
            {(showAllMistakes ? content.mistakes : content.mistakes.slice(0, 8)).map((mistake, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
          {content.mistakes.length > 8 && (
            <button
              onClick={() => setShowAllMistakes(v => !v)}
              className="mt-4 text-sm font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              {showAllMistakes ? 'Show less' : `Show all ${content.mistakes.length} mistakes`}
              <ChevronDown size={14} className={cn('transition-transform', showAllMistakes && 'rotate-180')} />
            </button>
          )}
        </div>
      )}

      {/* Complete button */}
      <button
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-lg transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> I Understand This Concept — +100 XP
      </button>
    </div>
  );
}

// ============================================================
// SECTION 2: Vocabulary — Massive Word Bank
// Shows all vocabulary words with search, filter, rich detail
// Each word card shows: word, IPA, hindi, synonyms, antonyms,
// verb forms, and 6 types of example sentences
// ============================================================
function VocabularyMassive({ vocabulary, onComplete }) {
  const allWords = vocabulary.length > 0 ? vocabulary : [];
  const [searchQuery, setSearchQuery] = useState('');
  const [cefrFilter, setCefrFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [expandedWord, setExpandedWord] = useState(null);
  const WORDS_PER_PAGE = 50; // Show 50 words per load — "Show All" button is prominent below

  // Get all unique CEFR levels
  const cefrLevels = ['all', ...new Set(allWords.map(w => w.cefrLevel).filter(Boolean))];

  // Filter words by search and CEFR level
  const filtered = allWords.filter((w) => {
    const matchesSearch = !searchQuery ||
      w.word?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.hindi?.includes(searchQuery) ||
      w.simpleMeaning?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCefr = cefrFilter === 'all' || w.cefrLevel === cefrFilter;
    return matchesSearch && matchesCefr;
  });

  const totalPages = Math.ceil(filtered.length / WORDS_PER_PAGE);
  const visibleWords = filtered.slice(0, page * WORDS_PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Vocabulary Bank</h3>
          <p className="text-slate-400 mt-1">
            {filtered.length} words {searchQuery || cefrFilter !== 'all' ? `(filtered from ${allWords.length})` : 'total'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
          <Hash size={14} /> {allWords.length} Words
        </div>
      </div>

      {/* Total Words Banner — always visible so users know the full bank is loaded */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
          <Hash size={18} className="text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm">
            <span className="text-cyan-400 text-lg font-black">{allWords.length.toLocaleString()}</span> words loaded in this vocabulary bank
          </p>
          <p className="text-xs text-slate-400">IPA pronunciation · Hindi meanings · 6 sentence types · Synonyms · Antonyms · Verb forms · Usage notes</p>
        </div>
        <button
          onClick={() => setPage(Math.ceil(filtered.length / WORDS_PER_PAGE))}
          className="shrink-0 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-lg shadow-cyan-600/25"
        >
          Show All {filtered.length}
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search words, meanings, Hindi..."
            className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-cyan-500/60 outline-none placeholder:text-slate-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500 shrink-0" />
          <select
            value={cefrFilter}
            onChange={(e) => { setCefrFilter(e.target.value); setPage(1); }}
            className="px-3 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-cyan-500/60 outline-none cursor-pointer"
          >
            {cefrLevels.map(l => <option key={l} value={l}>{l === 'all' ? 'All Levels' : l}</option>)}
          </select>
        </div>
      </div>

      {/* Word Cards Grid */}
      {visibleWords.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Search size={40} className="mx-auto mb-3 opacity-50" />
          <p className="font-semibold">No words found for &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleWords.map((item, i) => {
            const isExpanded = expandedWord === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i % WORDS_PER_PAGE) * 0.02 }}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isExpanded
                    ? "border-cyan-500/40 bg-slate-800"
                    : "border-slate-700 bg-slate-800/50 hover:border-cyan-500/30"
                )}
              >
                {/* Word Card Header — div instead of button to avoid nested-button warning */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedWord(isExpanded ? null : i)}
                  onKeyDown={(e) => e.key === 'Enter' && setExpandedWord(isExpanded ? null : i)}
                  className="w-full p-5 text-left group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {item.word}
                        </h4>
                        {item.cefrLevel && (
                          <span className="text-xs font-bold text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">
                            {item.cefrLevel}
                          </span>
                        )}
                      </div>
                      {item.ipa && (
                        <p className="text-xs text-slate-500 font-mono mb-2">{item.ipa}</p>
                      )}
                      <p className="text-sm text-slate-300">{item.simpleMeaning}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-sm font-semibold text-amber-400 hindi-text bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20 whitespace-nowrap">
                        {item.hindi}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); speakText(item.word, 0.7); }}
                        className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center hover:bg-sky-500/20 transition-colors"
                        title={`Listen: ${item.word}`}
                      >
                        <Volume2 size={12} className="text-sky-400" />
                      </button>
                    </div>
                  </div>

                  {/* Synonyms preview (always visible) */}
                  {item.synonyms?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="text-xs text-slate-600 font-semibold">≈</span>
                      {item.synonyms.slice(0, 3).map((s, si) => (
                        <span key={si} className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expanded Detail View */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-slate-700 pt-4 space-y-4">

                        {/* Verb Forms */}
                        {item.verbForms && (
                          <div className="grid grid-cols-3 gap-2">
                            {Object.entries(item.verbForms).map(([form, val]) => (
                              <div key={form} className="bg-slate-900 rounded-lg p-2 text-center">
                                <p className="text-xs text-slate-600 font-semibold uppercase">{form}</p>
                                <p className="text-sm text-white font-semibold mt-0.5">{val}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Synonyms & Antonyms */}
                        <div className="grid grid-cols-2 gap-3">
                          {item.synonyms?.length > 0 && (
                            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
                              <p className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">Synonyms</p>
                              <div className="flex flex-wrap gap-1">
                                {item.synonyms.map((s, si) => (
                                  <span key={si} className="text-xs bg-emerald-900/30 text-emerald-300 px-2 py-0.5 rounded">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {item.antonyms?.length > 0 && (
                            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                              <p className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">Antonyms</p>
                              <div className="flex flex-wrap gap-1">
                                {item.antonyms.map((a, ai) => (
                                  <span key={ai} className="text-xs bg-red-900/30 text-red-300 px-2 py-0.5 rounded">
                                    {a}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* All Sentence Types */}
                        {item.sentences && (
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usage Examples</p>
                            {Object.entries(item.sentences).map(([type, sentence]) => (
                              <div key={type} className="flex items-start gap-2 bg-slate-900 rounded-xl p-3">
                                <span className="text-xs font-bold text-slate-600 capitalize shrink-0 pt-0.5 w-14 truncate">
                                  {type}:
                                </span>
                                <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                                  <p className="text-sm text-slate-300 italic flex-1">"{sentence}"</p>
                                  <button
                                    onClick={() => speakText(sentence)}
                                    className="w-6 h-6 rounded bg-sky-500/10 flex items-center justify-center shrink-0 hover:bg-sky-500/20 transition-colors"
                                  >
                                    <Volume2 size={10} className="text-sky-400" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Usage Note */}
                        {item.usageNote && (
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                            <p className="text-xs font-bold text-amber-400 mb-1">💡 Usage Note</p>
                            <p className="text-sm text-slate-300">{item.usageNote}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Load More + Show All row */}
      {page < totalPages && (
        <div className="flex gap-3">
          <button
            onClick={() => setPage(p => p + 1)}
            className="flex-1 py-4 rounded-xl border-2 border-dashed border-slate-700 text-slate-300 font-bold hover:border-cyan-500 hover:text-cyan-400 transition-all"
          >
            Load More (+{Math.min(WORDS_PER_PAGE, filtered.length - visibleWords.length)} words) — {visibleWords.length}/{filtered.length}
          </button>
          {/* Show All button — loads every word at once */}
          <button
            onClick={() => setPage(totalPages)}
            className="px-5 py-4 rounded-xl border-2 border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-bold hover:bg-cyan-500/20 transition-all whitespace-nowrap text-sm"
          >
            Show All {filtered.length}
          </button>
        </div>
      )}

      {/* Complete button */}
      <button
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-lg transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> Vocabulary Reviewed — +100 XP
      </button>
    </div>
  );
}

// ============================================================
// SECTION 3: Interactive Practice — Hindi → English Translation
// All 950 practice questions with category/difficulty filters,
// stats tracking, hint system, and grammar rule display
// ============================================================
function InteractivePractice({ practiceQs, playSound, onComplete }) {
  // ── All available questions from this day's practice JSON ──────────────
  const allQs = practiceQs.length > 0 ? practiceQs : [];

  // ── Session management — controls the pre-start screen & % selector ─────
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionPercent, setSessionPercent] = useState(100);
  const [sessionQs, setSessionQs]           = useState([]);

  // ── Per-question UI state ──────────────────────────────────────────────
  const [categoryFilter, setCategoryFilter]     = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [userInput, setUserInput]               = useState('');
  const [status, setStatus]                     = useState('idle'); // idle | correct | wrong | revealed
  const [score, setScore]                       = useState(0);
  const [wrongCount, setWrongCount]             = useState(0);
  const [showHint, setShowHint]                 = useState(false);
  const [sessionComplete, setSessionComplete]   = useState(false);
  const inputRef = useRef(null);

  // Valid % options
  const PERCENT_OPTIONS = [20, 40, 60, 80, 100];

  // ── Start session: shuffle & slice by chosen % ─────────────────────────
  const startSession = useCallback(() => {
    const shuffled = [...allQs].sort(() => Math.random() - 0.5);
    const count = Math.max(1, Math.round((allQs.length * sessionPercent) / 100));
    const picked = shuffled.slice(0, count);
    setSessionQs(picked);
    setCurrentIndex(0);
    setScore(0);
    setWrongCount(0);
    setStatus('idle');
    setUserInput('');
    setShowHint(false);
    setSessionComplete(false);
    setSessionStarted(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [allQs, sessionPercent]);

  // ── Active question set: session subset when running, else full bank ───
  const activeQs = sessionStarted ? sessionQs : allQs;

  // Get unique categories and difficulties from active set
  const categories = ['all', ...new Set(activeQs.map(q => q.category).filter(Boolean))];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  // Category / difficulty filter applies within active session
  const filtered = activeQs.filter((q) => {
    const matchesCat = categoryFilter === 'all' || q.category === categoryFilter;
    const matchesDiff = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
    return matchesCat && matchesDiff;
  });

  const currentQ = filtered[currentIndex] || filtered[0];
  const accuracy = filtered.length > 0 ? Math.round((score / Math.max(currentIndex, 1)) * 100) : 0;

  const checkAnswer = () => {
    if (!userInput.trim() || status !== 'idle') return;
    if (isAnswerCorrect(userInput, currentQ)) {
      setStatus('correct');
      playSound('correct');
      setScore(s => s + 1);
    } else {
      setStatus('wrong');
      playSound('wrong');
      setWrongCount(w => w + 1);
    }
    setShowHint(false);
  };

  const revealAnswer = () => {
    setStatus('revealed');
    playSound('reveal');
    setShowHint(false);
  };

  const nextQuestion = () => {
    if (currentIndex < filtered.length - 1) {
      setCurrentIndex(i => i + 1);
      setUserInput('');
      setStatus('idle');
      setShowHint(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSessionComplete(true);
      onComplete();
    }
  };

  // Keyboard shortcut: Enter = check answer, Shift+Enter = next
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (status === 'idle' || status === 'wrong') checkAnswer();
      else nextQuestion();
    }
  };

  // ── PRE-START SCREEN ──────────────────────────────────────────────────────
  if (!sessionStarted) {
    const sessionCount = Math.max(1, Math.round((allQs.length * sessionPercent) / 100));
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-5"
      >
        {/* Hero card */}
        <div className="card p-8 text-center">
          <motion.div
            animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.06, 1] }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-4xl mx-auto mb-5 shadow-lg shadow-emerald-500/30"
          >
            🎯
          </motion.div>
          <h2 className="text-2xl font-black text-white mb-2">Interactive Practice</h2>
          <p className="text-slate-400 text-sm mb-1">Hindi sentences padhkar unka English translation type karo</p>
          <p className="text-slate-500 text-sm">
            {allQs.length.toLocaleString()} practice questions available • Instant feedback • +10 XP per correct
          </p>
        </div>

        {/* Session length picker */}
        <div className="card p-6 space-y-4">
          <div>
            <p className="font-bold text-white mb-1">Session Length</p>
            <p className="text-sm text-slate-400">
              Kitne questions ke saath practice karna chahte ho?
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {PERCENT_OPTIONS.map((pct) => {
              const count = Math.max(1, Math.round((allQs.length * pct) / 100));
              const active = sessionPercent === pct;
              return (
                <button
                  key={pct}
                  onClick={() => setSessionPercent(pct)}
                  className={`py-3 rounded-xl text-center transition-all border ${
                    active
                      ? 'border-emerald-400 bg-emerald-500/20 text-white shadow-md shadow-emerald-500/10'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/25'
                  }`}
                >
                  <div className="font-bold text-sm">{pct}%</div>
                  <div className="text-[10px] opacity-75">{count} Qs</div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400 bg-white/3 rounded-xl p-3">
            <Zap size={14} className="text-emerald-400 shrink-0" />
            <span>
              {sessionCount} questions practice karenge — har sahi jawab par <span className="text-emerald-400 font-semibold">+10 XP</span> milega
            </span>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-3">
          {[['💡','Hint System','Stuck? Get a hint'],['⚡','Earn XP','+10 per correct'],['🔊','Sound FX','Instant audio']].map(([emoji,label,sub]) => (
            <div key={label} className="card p-4 text-center">
              <div className="text-2xl mb-2">{emoji}</div>
              <p className="text-sm font-bold text-white">{label}</p>
              <p className="text-xs text-slate-500">{sub}</p>
            </div>
          ))}
        </div>

        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={startSession}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all"
        >
          <Play size={20} fill="currentColor" />
          Start Practice — {sessionCount} Questions
        </motion.button>
      </motion.div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto">
          <Trophy size={36} className="text-amber-400" />
        </div>
        <div>
          <h3 className="text-3xl font-black text-white">Practice Complete!</h3>
          <p className="text-slate-400 mt-2">You practiced {filtered.length} questions</p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-2xl font-black text-emerald-400">{score}</p>
            <p className="text-xs text-slate-500 font-semibold">Correct</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-2xl font-black text-red-400">{wrongCount}</p>
            <p className="text-xs text-slate-500 font-semibold">Wrong</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="text-2xl font-black text-amber-400">{accuracy}%</p>
            <p className="text-xs text-slate-500 font-semibold">Accuracy</p>
          </div>
        </div>
        <button
          onClick={() => { setCurrentIndex(0); setScore(0); setWrongCount(0); setSessionComplete(false); setStatus('idle'); setUserInput(''); }}
          className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
        >
          Practice Again
        </button>
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="text-center py-8 text-slate-400">
        <p className="font-semibold">No questions match your filter. Try &quot;All Categories&quot;.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header with filters and stats */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white">Hindi → English Translation</h3>
            <p className="text-sm text-slate-400">
              {filtered.length} questions · Press Enter to submit
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm">{score}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
              <XCircle size={14} className="text-red-400" />
              <span className="text-red-400 font-bold text-sm">{wrongCount}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
              <BarChart3 size={14} className="text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">{accuracy}%</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentIndex(0); setStatus('idle'); setUserInput(''); }}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500/60 outline-none cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? '📚 All Categories' : c}</option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => { setDifficultyFilter(e.target.value); setCurrentIndex(0); setStatus('idle'); setUserInput(''); }}
            className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-500/60 outline-none cursor-pointer"
          >
            {difficulties.map(d => (
              <option key={d} value={d}>{d === 'all' ? '⚡ All Levels' : d.charAt(0).toUpperCase() + d.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / filtered.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-4 right-4 text-sm font-bold text-slate-600 bg-slate-800 px-3 py-1 rounded-full">
          {currentIndex + 1} / {filtered.length}
        </div>

        {/* Category + Difficulty Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {currentQ.category && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
              {currentQ.category}
            </span>
          )}
          {currentQ.difficulty && (
            <span className={cn(
              "text-xs font-bold px-2 py-1 rounded-full",
              currentQ.difficulty === 'easy'   ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              currentQ.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                 'bg-red-500/10 text-red-400 border border-red-500/20'
            )}>
              {currentQ.difficulty}
            </span>
          )}
        </div>

        {/* Hindi Question */}
        <div className="mb-6 text-center">
          <span className="inline-block px-3 py-1 bg-slate-800 text-slate-400 text-xs font-bold rounded-full mb-4 uppercase tracking-widest border border-slate-700">
            Translate this Hindi sentence
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white hindi-text leading-relaxed">
            &ldquo;{currentQ.hindi}&rdquo;
          </h2>
        </div>

        {/* Hint (if shown) */}
        <AnimatePresence>
          {showHint && currentQ.hint && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2"
            >
              <Lightbulb size={16} className="text-amber-400 shrink-0" />
              <p className="text-sm text-amber-300 font-medium">{currentQ.hint}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={(e) => { setUserInput(e.target.value); if (status === 'wrong') setStatus('idle'); }}
          onKeyDown={handleKeyDown}
          placeholder="Type your English translation here..."
          className="w-full p-5 rounded-2xl bg-slate-800 border-2 border-slate-700 text-white text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none outline-none placeholder:text-slate-600"
          rows={3}
          disabled={status === 'correct' || status === 'revealed'}
        />

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {status === 'correct' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center gap-3 text-emerald-400"
            >
              <CheckCircle2 size={22} />
              <div>
                <p className="font-bold text-base">Perfect Translation! +10 XP</p>
                {currentQ.grammarRule && (
                  <p className="text-xs text-emerald-300/80 mt-1">📐 {currentQ.grammarRule}</p>
                )}
              </div>
            </motion.div>
          )}
          {status === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-4 rounded-xl bg-red-500/15 border border-red-500/40 flex items-center gap-3 text-red-400"
            >
              <XCircle size={22} />
              <p className="font-bold text-base">Not quite right — try again or reveal the answer</p>
            </motion.div>
          )}
          {status === 'revealed' && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                <p className="text-slate-400 text-xs mb-1 uppercase tracking-widest font-bold">Correct Answer</p>
                <p className="text-2xl font-black text-amber-400">{currentQ.english}</p>
                {currentQ.alternatives?.length > 0 && (
                  <p className="text-xs text-slate-500 mt-1">Also accepted: {currentQ.alternatives.join(' / ')}</p>
                )}
              </div>
              {currentQ.explanation && (
                <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                  <p className="text-xs text-slate-500 mb-1 font-bold">📚 Explanation (Hindi)</p>
                  <p className="text-sm text-slate-300 hindi-text">{currentQ.explanation}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-5">
          {(status === 'idle' || status === 'wrong') && (
            <>
              <button
                onClick={checkAnswer}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base transition-all active:scale-95 shadow-lg shadow-emerald-600/30"
              >
                Check Answer
              </button>
              {currentQ.hint && (
                <button
                  onClick={() => setShowHint(v => !v)}
                  className="px-5 py-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold transition-all border border-amber-500/20"
                  title="Show Hint"
                >
                  <Lightbulb size={18} />
                </button>
              )}
              <button
                onClick={revealAnswer}
                className="px-5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all border border-slate-700"
              >
                Reveal
              </button>
            </>
          )}
          {(status === 'correct' || status === 'revealed') && (
            <button
              onClick={nextQuestion}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold text-base transition-all active:scale-95 shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2"
            >
              Next Question <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 4: Speaking & Pronunciation
// Uses speaking-drill.json data: 15 drills with sentences,
// pronunciation guides, TTS playback, and mirror practice
// ============================================================
function SpeakingAdvanced({ topic, speaking, practiceQs, onComplete }) {
  // Use speaking-drill.json data (served as data.speaking)
  const drills = speaking?.drills || [];
  const instructions = speaking?.instructions || 'Speak each sentence aloud clearly.';

  // Fallback: use practice questions if no speaking drills
  const fallbackDrills = practiceQs.length > 0 ? [{
    id: 'fb',
    type: 'repeat',
    title: 'Translation Speaking Drill',
    sentences: practiceQs.slice(0, 20).map(q => ({
      english: q.english,
      hindi: q.hindi,
      pronunciation: 'Speak clearly at natural pace.'
    }))
  }] : [];

  const activeDrills = drills.length > 0 ? drills : fallbackDrills;

  const [drillIndex, setDrillIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [showReference, setShowReference] = useState(false);
  const [rate, setRate] = useState(0.85); // TTS rate

  const currentDrill = activeDrills[drillIndex];
  const sentences = currentDrill?.sentences || [];
  const currentSentence = sentences[sentenceIndex];

  if (!activeDrills.length) {
    return (
      <div className="text-center py-8 space-y-4">
        <Mic size={40} className="text-pink-400 mx-auto opacity-50" />
        <p className="text-slate-400">Speaking drills loading...</p>
        <button onClick={onComplete} className="px-6 py-3 rounded-xl bg-pink-600 text-white font-bold">
          Mark Complete
        </button>
      </div>
    );
  }

  const totalSentences = activeDrills.reduce((sum, d) => sum + (d.sentences?.length || 0), 0);
  const completedSentences = activeDrills.slice(0, drillIndex).reduce((sum, d) => sum + (d.sentences?.length || 0), 0) + sentenceIndex;

  return (
    <div className="space-y-5">
      {/* Instructions Banner */}
      <div className="rounded-2xl border border-pink-500/30 bg-pink-500/5 p-5">
        <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
          <Mic size={22} className="text-pink-400" /> Speaking Lab — {topic.title}
        </h3>
        <p className="text-slate-300 text-sm">{instructions}</p>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
            {activeDrills.length} Drills · {totalSentences} Sentences
          </span>
          <span className="text-xs font-bold text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
            {completedSentences} / {totalSentences} done
          </span>
        </div>
      </div>

      {/* Drill Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {activeDrills.map((drill, i) => (
          <button
            key={i}
            onClick={() => { setDrillIndex(i); setSentenceIndex(0); setShowReference(false); }}
            className={cn(
              "shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all border",
              drillIndex === i
                ? "bg-pink-500/20 border-pink-500/40 text-pink-300"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
            )}
          >
            {i + 1}. {drill.title?.substring(0, 20)}...
          </button>
        ))}
      </div>

      {/* Current Drill */}
      {currentDrill && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-5">
          {/* Drill Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">{currentDrill.type}</span>
              <h4 className="text-lg font-bold text-white mt-1">{currentDrill.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Sentence {sentenceIndex + 1} of {sentences.length}
              </p>
            </div>
            {/* TTS Rate */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Speed:</span>
              {[0.5, 0.75, 1.0, 1.25].map(r => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={cn(
                    "px-2 py-1 rounded-lg font-bold transition-colors",
                    rate === r ? "bg-pink-500/30 text-pink-300" : "bg-slate-800 text-slate-500 hover:text-slate-300"
                  )}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>

          {/* Sentence Progress Bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
              style={{ width: `${((sentenceIndex + 1) / sentences.length) * 100}%` }}
            />
          </div>

          {/* Current Sentence */}
          {currentSentence && (
            <div className="space-y-4">
              {/* Hindi prompt */}
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-wider">Hindi (Translate aloud)</p>
                <p className="text-xl text-white font-bold hindi-text leading-relaxed">
                  &ldquo;{currentSentence.hindi}&rdquo;
                </p>
              </div>

              {/* Listen + Reference */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => speakText(currentSentence.english, rate)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold hover:bg-sky-500/20 transition-colors"
                >
                  <Volume2 size={18} /> Listen ({rate}x)
                </button>
                <button
                  onClick={() => setShowReference(v => !v)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold hover:bg-pink-500/20 transition-colors"
                >
                  {showReference ? <EyeOff size={18} /> : <Eye size={18} />}
                  {showReference ? 'Hide' : 'Show'} Reference
                </button>
              </div>

              {/* Reference Answer */}
              <AnimatePresence>
                {showReference && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 space-y-2">
                      <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Reference Translation</p>
                      <p className="text-lg font-bold text-white">{currentSentence.english}</p>
                      {currentSentence.pronunciation && (
                        <div className="bg-slate-900 rounded-lg p-2">
                          <p className="text-xs text-slate-500 font-semibold mb-1">🎙️ Pronunciation Guide</p>
                          <p className="text-sm text-pink-300 font-mono">{currentSentence.pronunciation}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setSentenceIndex(i => Math.max(0, i - 1)); setShowReference(false); }}
                  disabled={sentenceIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold disabled:opacity-30 flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <div className="flex-1 text-center text-sm text-slate-500 font-semibold">
                  {sentenceIndex + 1} / {sentences.length}
                </div>
                <button
                  onClick={() => {
                    if (sentenceIndex < sentences.length - 1) {
                      setSentenceIndex(i => i + 1);
                      setShowReference(false);
                    } else if (drillIndex < activeDrills.length - 1) {
                      setDrillIndex(i => i + 1);
                      setSentenceIndex(0);
                      setShowReference(false);
                    }
                  }}
                  disabled={drillIndex === activeDrills.length - 1 && sentenceIndex === sentences.length - 1}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold disabled:opacity-30 flex items-center gap-1"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-5">
        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-400" /> Speaking Tips
        </h4>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2"><span className="text-pink-400 shrink-0">→</span> Speak each sentence ALOUD — reading silently doesn&apos;t build speaking habits</li>
          <li className="flex items-start gap-2"><span className="text-pink-400 shrink-0">→</span> Listen at 0.75x first, then 1x speed to match the native pace</li>
          <li className="flex items-start gap-2"><span className="text-pink-400 shrink-0">→</span> Record yourself on your phone and compare with the reference</li>
          <li className="flex items-start gap-2"><span className="text-pink-400 shrink-0">→</span> Practice in front of a mirror to build confidence and body language</li>
        </ul>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold text-lg transition-all shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> Speaking Session Complete — +100 XP
      </button>
    </div>
  );
}

// ============================================================
// SECTION 5: Writing Drills
// Uses writing-exercise.json data: 17 guided + free tasks
// Each task shows prompt, word limit, and optional sample answer
// ============================================================
function WritingAdvanced({ topic, content, vocabulary, writing, onComplete }) {
  // Use writing-exercise.json data (served as data.writing)
  const tasks = writing?.tasks || [];
  const instructions = writing?.instructions || 'Write your answers in English below each prompt.';

  const [taskIndex, setTaskIndex] = useState(0);
  const [drafts, setDrafts] = useState({}); // {taskIndex: text}
  const [showSample, setShowSample] = useState({}); // {taskIndex: bool}
  const [completedTasks, setCompletedTasks] = useState(new Set());

  // Fallback if no writing tasks from JSON
  const fallbackTasks = [{
    id: 1, type: 'free',
    prompt: `Write 6–10 sentences about "${topic.title}" using at least 3 vocabulary words from today's lesson.`,
    hindiPrompt: `आज के lesson के कम से कम 3 words use करते हुए "${topic.title}" के बारे में 6–10 sentences लिखें।`,
    sampleAnswer: null, wordLimit: 100
  }];

  const activeTasks = tasks.length > 0 ? tasks : fallbackTasks;
  const currentTask = activeTasks[taskIndex];

  const draft = drafts[taskIndex] || '';
  const wordCount = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  const isOverLimit = currentTask?.wordLimit && wordCount > currentTask.wordLimit;

  const markTaskDone = () => {
    setCompletedTasks(prev => new Set([...prev, taskIndex]));
  };

  const vocabSuggestions = (vocabulary || []).slice(0, 8).map(v => v.word);

  if (!currentTask) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">Writing tasks loading...</p>
        <button onClick={onComplete} className="mt-4 px-6 py-3 rounded-xl bg-rose-600 text-white font-bold">
          Mark Complete
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5">
        <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
          <PenTool size={22} className="text-rose-400" /> Writing Drills — {topic.title}
        </h3>
        <p className="text-slate-300 text-sm">{instructions}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
            {activeTasks.length} Tasks Total
          </span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            {completedTasks.size} / {activeTasks.length} Done
          </span>
        </div>
      </div>

      {/* Task Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {activeTasks.map((task, i) => (
          <button
            key={i}
            onClick={() => setTaskIndex(i)}
            className={cn(
              "shrink-0 w-9 h-9 rounded-xl text-sm font-bold transition-all border flex items-center justify-center",
              taskIndex === i
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                : completedTasks.has(i)
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
            )}
          >
            {completedTasks.has(i) ? '✓' : i + 1}
          </button>
        ))}
      </div>

      {/* Current Task */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Task {taskIndex + 1}</span>
              <span className={cn(
                "text-xs font-bold px-2 py-0.5 rounded-full",
                currentTask.type === 'guided'
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              )}>
                {currentTask.type === 'guided' ? 'Guided' : 'Free Write'}
              </span>
              {currentTask.wordLimit && (
                <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                  ~{currentTask.wordLimit} words
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-white leading-relaxed">{currentTask.prompt}</h4>
            <p className="text-sm text-amber-300/80 hindi-text mt-1">{currentTask.hindiPrompt}</p>
          </div>
        </div>

        {/* Vocabulary Suggestions */}
        {vocabSuggestions.length > 0 && (
          <div>
            <p className="text-xs font-bold text-rose-300 mb-2 uppercase tracking-wider">Try using these words:</p>
            <div className="flex flex-wrap gap-2">
              {vocabSuggestions.map((word) => (
                <span key={word} className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Writing Area */}
        <div className="relative">
          <textarea
            value={draft}
            onChange={(e) => setDrafts(prev => ({ ...prev, [taskIndex]: e.target.value }))}
            placeholder="Write your answer in English here..."
            rows={6}
            className={cn(
              "w-full rounded-2xl bg-slate-800 border-2 text-white p-5 focus:ring-2 resize-none outline-none placeholder:text-slate-600 transition-all text-base",
              isOverLimit
                ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-700 focus:border-rose-500 focus:ring-rose-500/20"
            )}
          />
          {/* Word count */}
          <div className="absolute bottom-3 right-4 text-xs font-bold">
            <span className={cn(
              isOverLimit ? "text-red-400" : "text-slate-600"
            )}>
              {wordCount}{currentTask.wordLimit ? ` / ${currentTask.wordLimit}` : ''} words
            </span>
          </div>
        </div>

        {/* Sample Answer */}
        {currentTask.sampleAnswer && (
          <div>
            <button
              onClick={() => setShowSample(prev => ({ ...prev, [taskIndex]: !prev[taskIndex] }))}
              className="flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              {showSample[taskIndex] ? <EyeOff size={14} /> : <Eye size={14} />}
              {showSample[taskIndex] ? 'Hide' : 'Show'} Sample Answer
            </button>
            <AnimatePresence>
              {showSample[taskIndex] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-3"
                >
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
                    <p className="text-xs text-amber-400 font-bold mb-2 uppercase tracking-wider">📝 Sample Answer</p>
                    <p className="text-slate-300 leading-relaxed text-sm italic">{currentTask.sampleAnswer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Task Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              markTaskDone();
              if (taskIndex < activeTasks.length - 1) setTaskIndex(i => i + 1);
            }}
            className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            {taskIndex < activeTasks.length - 1 ? 'Done — Next Task' : 'Complete Task'}
          </button>
          {taskIndex > 0 && (
            <button
              onClick={() => setTaskIndex(i => i - 1)}
              className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-bold hover:bg-slate-700 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Complete all writing */}
      <button
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-bold text-lg transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> Writing Drills Complete — +100 XP
      </button>
    </div>
  );
}

// ============================================================
// SECTION 6: Listening Practice
// Uses listening-exercise.json: fill-in-the-blank exercises
// with TTS audio playback and dictation passages
// ============================================================
function ListeningPractice({ listening, playSound, onComplete }) {
  const exercises = listening?.exercises || [];
  const dictationPassages = listening?.dictationPassages ||
    (listening?.dictationPassage ? [listening.dictationPassage] : []);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [showDictation, setShowDictation] = useState(false);
  const [ttsRate, setTtsRate] = useState(0.85);
  const [correctTotal, setCorrectTotal] = useState(0);

  if (!exercises.length) {
    return (
      <div className="space-y-4 text-center py-8">
        <Headphones size={40} className="text-sky-400 mx-auto opacity-50" />
        <p className="text-slate-400">No listening exercises available yet.</p>
        <button onClick={onComplete} className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold">
          Mark as Reviewed
        </button>
      </div>
    );
  }

  const current = exercises[index];
  const blankCount = (current?.fillInBlank?.match(/_____/g) || []).length;

  const setBlankValue = (blankIdx, value) => {
    setAnswers((prev) => ({ ...prev, [`${index}-${blankIdx}`]: value }));
  };

  const checkAnswers = () => {
    const isCorrect = current.answer.every((expected, i) =>
      normalizeAnswerText(answers[`${index}-${i}`] || '') === normalizeAnswerText(expected)
    );
    setChecked((prev) => ({ ...prev, [index]: isCorrect }));
    if (isCorrect) setCorrectTotal(t => t + 1);
    if (playSound) playSound(isCorrect ? 'correct' : 'wrong');
  };

  const next = () => {
    if (index < exercises.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setShowDictation(true);
      onComplete();
    }
  };

  const blankParts = (current?.fillInBlank || '').split('_____');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Headphones size={20} className="text-sky-400" /> Listening Practice
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Listen, then fill in the missing words</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-lg">
            {correctTotal} correct
          </span>
          <span className="text-sm text-slate-500 font-semibold">
            {index + 1} / {exercises.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all duration-500"
          style={{ width: `${((index + 1) / exercises.length) * 100}%` }}
        />
      </div>

      {/* Exercise Card */}
      <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-6 space-y-5">
        {/* TTS Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => speakText(current.audioText, ttsRate)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-lg shadow-sky-600/30"
          >
            <Volume2 size={18} /> Listen
          </button>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-semibold">Speed:</span>
            {[0.5, 0.75, 1.0, 1.25].map(r => (
              <button
                key={r}
                onClick={() => setTtsRate(r)}
                className={cn(
                  "px-2 py-1 rounded-lg font-bold transition-colors text-xs",
                  ttsRate === r ? "bg-sky-500/30 text-sky-300" : "bg-slate-800 text-slate-500 hover:text-slate-300"
                )}
              >
                {r}x
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 ml-auto">Click listen, then fill blanks</p>
        </div>

        {/* Hindi Context */}
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-500 font-semibold mb-1">🇮🇳 Hindi Context</p>
          <p className="text-sm text-amber-300/90 hindi-text">{current.hindi}</p>
        </div>

        {/* Fill-in-the-blank */}
        <div>
          <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-wider">Fill in the blanks:</p>
          <p className="text-lg text-white leading-relaxed flex flex-wrap items-center gap-2">
            {blankParts.map((part, i) => (
              <span key={i} className="flex items-center gap-1">
                <span>{part}</span>
                {i < blankCount && (
                  <input
                    value={answers[`${index}-${i}`] || ''}
                    onChange={(e) => setBlankValue(i, e.target.value)}
                    disabled={checked[index] !== undefined}
                    className="w-28 px-3 py-1.5 rounded-xl bg-slate-800 border-2 border-slate-600 text-white text-center outline-none focus:border-sky-500 transition-colors text-sm font-semibold"
                    placeholder="___"
                  />
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {checked[index] !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "rounded-xl p-4 border flex items-center gap-3",
                checked[index]
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/40 bg-red-500/10 text-red-300"
              )}
            >
              {checked[index]
                ? <><CheckCircle2 size={20} /> <span className="font-bold">Correct! Excellent listening.</span></>
                : <><XCircle size={20} /> <span className="font-bold">Correct answers: {current.answer.join(', ')}</span></>
              }
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex gap-3">
          {checked[index] === undefined && (
            <button
              onClick={checkAnswers}
              className="flex-1 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all"
            >
              Check Answers
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
          >
            {index === exercises.length - 1 ? 'Finish & See Dictation' : 'Next Exercise'}
          </button>
        </div>
      </div>

      {/* Dictation Section */}
      {showDictation && dictationPassages.length > 0 && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4">
          <h4 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare size={20} className="text-sky-400" /> Dictation Practice Passages
          </h4>
          {dictationPassages.map((passage, i) => (
            <div key={i} className={cn("space-y-3", i > 0 && "border-t border-slate-800 pt-4")}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => speakText(passage.text, ttsRate)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold hover:bg-sky-500/20 transition-colors text-sm"
                >
                  <Volume2 size={14} /> Listen to Passage {i + 1}
                </button>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{passage.text}</p>
              <p className="text-amber-200/70 text-sm hindi-text">{passage.hindi}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// SECTION 7: Reading Comprehension
// Uses reading-exercise.json: 5 passages with MCQ questions
// Shows Hindi translation option and tracks score per passage
// ============================================================
function ReadingComprehension({ reading, onComplete }) {
  const passages = reading?.passages ||
    (reading?.passage ? [{ ...reading.passage, comprehensionQuestions: reading.comprehensionQuestions }] : []);

  const [passageIndex, setPassageIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selected, setSelected] = useState({});
  const [scores, setScores] = useState({});

  if (!passages.length) {
    return (
      <div className="space-y-4 text-center py-8">
        <BookOpenCheck size={40} className="text-lime-400 mx-auto opacity-50" />
        <p className="text-slate-400">No reading passages available for this day.</p>
        <button onClick={onComplete} className="px-6 py-3 rounded-xl bg-lime-600 hover:bg-lime-500 text-white font-bold">
          Mark as Reviewed
        </button>
      </div>
    );
  }

  const passage = passages[passageIndex];
  const questions = passage?.comprehensionQuestions || [];
  const answeredAll = questions.length === 0 || questions.every((q) => selected[q.id] !== undefined);
  const correctCount = questions.filter((q) => selected[q.id] === q.answer).length;
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const totalQs = Object.values(scores).reduce((a, _, i) =>
    a + (passages[i]?.comprehensionQuestions?.length || 0), 0);

  const selectOption = (qId, option) => {
    setSelected((prev) => ({ ...prev, [qId]: option }));
  };

  const nextPassage = () => {
    // Save score for current passage
    setScores(prev => ({ ...prev, [passageIndex]: correctCount }));
    if (passageIndex < passages.length - 1) {
      setPassageIndex((i) => i + 1);
      setSelected({});
      setShowTranslation(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpenCheck size={20} className="text-lime-400" /> Reading Comprehension
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Passage {passageIndex + 1} of {passages.length}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTranslation((v) => !v)}
            className="flex items-center gap-2 text-sm font-bold text-lime-400 hover:text-lime-300 transition-colors"
          >
            {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
            {showTranslation ? 'Hide' : 'Show'} Hindi
          </button>
        </div>
      </div>

      {/* Passage Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {passages.map((p, i) => (
          <button
            key={i}
            onClick={() => { setPassageIndex(i); setSelected({}); setShowTranslation(false); }}
            className={cn(
              "shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all border",
              passageIndex === i
                ? "bg-lime-500/20 border-lime-500/40 text-lime-300"
                : scores[i] !== undefined
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
            )}
          >
            {scores[i] !== undefined ? `✓ ${scores[i]}/${p.comprehensionQuestions?.length || 0}` : `Passage ${i + 1}`}
          </button>
        ))}
      </div>

      {/* Reading Passage */}
      <div className="rounded-2xl border border-lime-500/30 bg-lime-500/5 p-6 space-y-4">
        <h4 className="text-xl font-bold text-white">{passage.title}</h4>
        <p className="text-slate-300 leading-relaxed text-base">{passage.text}</p>
        <AnimatePresence>
          {showTranslation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="text-amber-200/80 text-sm leading-relaxed hindi-text border-t border-slate-800 pt-3">
                {passage.hindiTranslation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Questions */}
      {questions.length > 0 && (
        <div className="space-y-4">
          <h5 className="font-bold text-white flex items-center gap-2">
            <Brain size={18} className="text-lime-400" />
            Comprehension Questions ({questions.length})
          </h5>
          {questions.map((q) => (
            <div key={q.id} className="rounded-2xl border border-slate-700 bg-slate-900 p-5 space-y-3">
              <p className="text-white font-semibold">{q.question}</p>
              {q.hindi && <p className="text-xs text-amber-200/60 hindi-text">{q.hindi}</p>}
              <div className="grid sm:grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isChosen = selected[q.id] === opt;
                  const isRevealed = selected[q.id] !== undefined;
                  const isRight = opt === q.answer;
                  return (
                    <button
                      key={opt}
                      onClick={() => selectOption(q.id, opt)}
                      disabled={isRevealed}
                      className={cn(
                        "px-4 py-3 rounded-xl border text-sm text-left transition-all font-medium",
                        isRevealed && isRight && "border-emerald-500 bg-emerald-500/15 text-emerald-300",
                        isRevealed && isChosen && !isRight && "border-red-500 bg-red-500/15 text-red-300",
                        !isRevealed && "border-slate-700 text-slate-300 hover:border-lime-500/60 hover:bg-slate-800"
                      )}
                    >
                      {isRevealed && isRight && <span className="mr-1">✓ </span>}
                      {isRevealed && isChosen && !isRight && <span className="mr-1">✗ </span>}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Score + Next */}
      {answeredAll && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 flex items-center justify-between flex-wrap gap-3"
        >
          <div>
            <p className="text-amber-300 font-bold text-lg">
              Score: {correctCount} / {questions.length}
              {questions.length > 0 && (
                <span className="text-sm font-semibold ml-2 text-slate-400">
                  ({Math.round((correctCount / questions.length) * 100)}%)
                </span>
              )}
            </p>
            <p className="text-slate-400 text-sm">
              {correctCount === questions.length ? '🎉 Perfect score!' :
               correctCount >= questions.length * 0.7 ? '👍 Great job!' : 'Review the passage and try again'}
            </p>
          </div>
          <button
            onClick={nextPassage}
            className="px-6 py-3 rounded-xl bg-lime-600 hover:bg-lime-500 text-white font-bold transition-all flex items-center gap-2"
          >
            {passageIndex === passages.length - 1 ? 'Finish Reading' : 'Next Passage'} <ArrowRight size={16} />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================
// SECTION 8: Revision & Quick Quiz
// Uses revision.json: key summary points, must-remember rules,
// and a mini quiz with 20+ questions
// ============================================================
function RevisionQuiz({ revision, playSound, onComplete }) {
  const keyPoints = revision?.keyPointsSummary || [];
  const rules = revision?.mustRememberRules || [];
  const quiz = revision?.quickQuiz || [];
  const [quizIndex, setQuizIndex] = useState(0);
  const [input, setInput] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // summary | rules | quiz

  if (!revision) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-400">Revision content loading...</p>
        <button onClick={onComplete} className="mt-4 px-6 py-3 rounded-xl bg-orange-600 text-white font-bold">
          Mark Complete
        </button>
      </div>
    );
  }

  const currentQ = quiz[quizIndex];

  const checkQuiz = () => {
    if (!input.trim() || revealed) return;
    const isRight = normalizeAnswerText(input) === normalizeAnswerText(currentQ.answer);
    setCorrect(isRight);
    setRevealed(true);
    if (isRight) setScore(s => s + 1);
    if (playSound) playSound(isRight ? 'correct' : 'wrong');
  };

  const nextQuiz = () => {
    if (quizIndex < quiz.length - 1) {
      setQuizIndex(i => i + 1);
      setInput('');
      setRevealed(false);
      setCorrect(null);
    } else {
      setDone(true);
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50">
        {[
          { id: 'summary', label: 'Key Summary', icon: BookMarked },
          { id: 'rules', label: 'Must-Remember', icon: AlertCircle },
          { id: 'quiz', label: `Quick Quiz (${quiz.length})`, icon: Brain },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all",
              activeTab === id
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Key Points Summary Tab */}
      {activeTab === 'summary' && keyPoints.length > 0 && (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star size={18} className="text-orange-400" /> Key Points Summary ({keyPoints.length} points)
          </h4>
          <ul className="space-y-3">
            {keyPoints.map((kp, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 text-slate-300 text-sm"
              >
                <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-orange-400">
                  {i + 1}
                </span>
                <span>{kp}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Must-Remember Rules Tab */}
      {activeTab === 'rules' && rules.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Zap size={18} className="text-amber-400" /> Must-Remember Rules ({rules.length} rules)
          </h4>
          <ul className="space-y-3">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                <Zap size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quick Quiz Tab */}
      {activeTab === 'quiz' && (
        <div>
          {quiz.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p>No quick quiz available. Review the summary and rules above.</p>
              <button onClick={onComplete} className="mt-4 px-6 py-3 rounded-xl bg-orange-600 text-white font-bold">
                Mark Revision Complete
              </button>
            </div>
          ) : done ? (
            <div className="text-center space-y-5 py-8">
              <Award size={48} className="text-amber-400 mx-auto" />
              <div>
                <h3 className="text-2xl font-black text-white">Revision Complete!</h3>
                <p className="text-slate-400 mt-1">Quick Quiz Score: {score} / {quiz.length}</p>
              </div>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <Trophy size={20} className="text-amber-400" />
                <span className="text-amber-300 font-bold text-xl">
                  {Math.round((score / quiz.length) * 100)}% Accuracy
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-semibold">Question {quizIndex + 1} / {quiz.length}</span>
                <span className="text-orange-400 font-bold">{score} correct</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-500"
                  style={{ width: `${(quizIndex / quiz.length) * 100}%` }}
                />
              </div>

              <p className="text-white font-bold text-lg">{currentQ.question}</p>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !revealed && checkQuiz()}
                disabled={revealed}
                placeholder="Type your answer..."
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-700 text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 transition-all"
              />

              <AnimatePresence mode="wait">
                {revealed && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "rounded-xl p-4 border flex items-center gap-3",
                      correct
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                        : "border-red-500/40 bg-red-500/10 text-red-300"
                    )}
                  >
                    {correct
                      ? <><CheckCircle2 size={20} /> <span className="font-bold">Correct! Well done.</span></>
                      : <><XCircle size={20} /> <span className="font-bold">Answer: {currentQ.answer}</span></>
                    }
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3">
                {!revealed ? (
                  <button
                    onClick={checkQuiz}
                    className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuiz}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center justify-center gap-2"
                  >
                    {quizIndex === quiz.length - 1 ? 'Finish Revision' : 'Next Question'} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Complete button (shown in summary/rules tabs) */}
      {(activeTab === 'summary' || activeTab === 'rules') && (
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-lg transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={20} /> Revision Complete — +100 XP
        </button>
      )}
    </div>
  );
}

// ============================================================
// SECTION 9: Final Mock Test — MCQ Format
// Uses daily-test.json: 350 MCQ questions with 4 options each,
// timed test, explanation display, and final score breakdown
// ============================================================
function MockTestMCQ({ dayNum, mockTest, playSound, onComplete }) {
  const allQuestions = mockTest || [];

  // Test configuration state
  const MOCK_PCT_OPTIONS = [20, 40, 60, 80, 100];
  const [started, setStarted] = useState(false);
  const [testPercent, setTestPercent] = useState(20);
  // questionCount is derived from testPercent — always up-to-date
  const questionCount = Math.max(5, Math.round((allQuestions.length * testPercent) / 100));
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);

  // ⚠️ Hook must stay above any conditional returns (Rules of Hooks)
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  if (!allQuestions.length) {
    return (
      <div className="text-center space-y-5 py-8">
        <Brain size={48} className="text-violet-400 mx-auto opacity-50" />
        <p className="text-xl font-bold text-white">Mock Test</p>
        <p className="text-slate-400">Test questions are loading...</p>
        <button onClick={onComplete} className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold">
          Skip Test
        </button>
      </div>
    );
  }

  // Start test — shuffle and slice questions
  const startTest = () => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, questionCount);
    setQuestions(shuffled);
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setWrongAnswers([]);
    setFinished(false);
    setShowExplanation(false);
    // Set timer: 90 seconds per 10 questions
    const seconds = Math.round((questionCount / 10) * 90);
    setTimeLeft(seconds);
    setStarted(true);
    // Start countdown
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  // (timer cleanup is declared above, before any conditional returns)

  const currentQ = questions[index];
  const finalPercentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const submitAnswer = () => {
    if (!selected || submitted) return;
    // Use getCorrectOptionText to resolve letter-code answers (A/B/C/D → actual text)
    const correctText = getCorrectOptionText(currentQ);
    const isRight = selected === correctText;
    if (isRight) {
      setScore(s => s + 1);
      if (playSound) playSound('correct');
    } else {
      setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: selected }]);
      if (playSound) playSound('wrong');
    }
    setSubmitted(true);
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
      setSubmitted(false);
      setShowExplanation(false);
    } else {
      clearInterval(timerRef.current);
      setFinished(true);
      onComplete();
    }
  };

  // Pre-start screen
  if (!started) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto">
            <Brain size={36} className="text-violet-400" />
          </div>
          <h3 className="text-3xl font-black text-white">Day {dayNum} Mock Test</h3>
          <p className="text-slate-400">
            {allQuestions.length} questions available — MCQ format with explanations
          </p>
        </div>

        {/* Test configuration */}
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6 space-y-5">
          <div>
            <h4 className="font-bold text-white mb-1">Select Session Size</h4>
            <p className="text-sm text-slate-400">
              {allQuestions.length} questions available — kitna % attempt karna chahte ho?
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {MOCK_PCT_OPTIONS.map(pct => {
              const count = Math.max(5, Math.round((allQuestions.length * pct) / 100));
              const active = testPercent === pct;
              return (
                <button
                  key={pct}
                  onClick={() => setTestPercent(pct)}
                  className={cn(
                    "py-3 rounded-xl border text-center transition-all",
                    active
                      ? "bg-violet-500/20 border-violet-500/40 text-white shadow-md shadow-violet-500/10"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:border-violet-500/30"
                  )}
                >
                  <div className="font-bold text-sm">{pct}%</div>
                  <div className="text-[10px] opacity-75">{count} Qs</div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-400 bg-white/3 rounded-xl p-3">
            <Clock size={15} className="text-violet-400 shrink-0" />
            <span>
              {questionCount} questions • ~{Math.round((questionCount / 10) * 1.5)} min •{' '}
              Pass: 70% = {Math.ceil(questionCount * 0.7)} correct
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={startTest}
          className="w-full py-5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-bold text-xl transition-all shadow-xl shadow-violet-500/25 flex items-center justify-center gap-2"
        >
          <Brain size={22} /> Start Mock Test — {questionCount} Questions ({testPercent}%)
        </motion.button>
      </div>
    );
  }

  // Finished screen
  if (finished) {
    return (
      <div className="space-y-8 text-center">
        <div className="space-y-3">
          <div className="w-24 h-24 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto">
            <Trophy size={44} className="text-amber-400" />
          </div>
          <h3 className="text-3xl font-black text-white">Test Complete!</h3>
          <p className="text-slate-400">Day {dayNum} Mock Test Results</p>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-3xl font-black text-emerald-400">{score}</p>
            <p className="text-xs text-slate-500 font-bold">Correct</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-3xl font-black text-red-400">{questions.length - score}</p>
            <p className="text-xs text-slate-500 font-bold">Wrong</p>
          </div>
          <div className={cn(
            "border rounded-xl p-4",
            finalPercentage >= 70
              ? "bg-amber-500/10 border-amber-500/20"
              : "bg-slate-800 border-slate-700"
          )}>
            <p className={cn(
              "text-3xl font-black",
              finalPercentage >= 70 ? "text-amber-400" : "text-slate-400"
            )}>{finalPercentage}%</p>
            <p className="text-xs text-slate-500 font-bold">Score</p>
          </div>
        </div>

        <div className={cn(
          "inline-block px-6 py-3 rounded-xl font-bold text-lg",
          finalPercentage >= 70
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            : "bg-red-500/20 text-red-300 border border-red-500/30"
        )}>
          {finalPercentage >= 90 ? '🏆 Excellent! You mastered this topic!' :
           finalPercentage >= 70 ? '✅ Passed! Good understanding.' :
           '❌ Keep practicing — aim for 70%+'}
        </div>

        {/* Wrong answers review */}
        {wrongAnswers.length > 0 && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-left space-y-4">
            <h4 className="font-bold text-white text-lg">Review Incorrect Answers</h4>
            {wrongAnswers.slice(0, 5).map((item, i) => (
              <div key={i} className="bg-slate-900 rounded-xl p-4 space-y-2">
                <p className="text-white text-sm hindi-text font-semibold">{item.question.hindi}</p>
                <div className="flex gap-3 text-xs">
                  <span className="text-red-400">✗ You: {item.userAnswer}</span>
                  <span className="text-emerald-400">✓ Correct: {getCorrectOptionText(item.question)}</span>
                </div>
                {item.question.explanation && (
                  <p className="text-xs text-slate-500 hindi-text">{item.question.explanation}</p>
                )}
              </div>
            ))}
            {wrongAnswers.length > 5 && (
              <p className="text-xs text-slate-500">...and {wrongAnswers.length - 5} more. Practice to improve!</p>
            )}
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => { setStarted(false); setFinished(false); }}
            className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all"
          >
            Try Again
          </button>
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all"
          >
            Finish Test
          </button>
        </div>
      </div>
    );
  }

  // Active test screen
  return (
    <div className="space-y-5">
      {/* Test Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-slate-400 text-sm font-semibold">
            Question {index + 1} of {questions.length}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-emerald-400 font-bold text-sm">{score} ✓</span>
            <span className="text-red-400 font-bold text-sm">{wrongAnswers.length} ✗</span>
          </div>
        </div>
        {/* Timer */}
        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm",
          timeLeft < 30
            ? "bg-red-500/15 border-red-500/40 text-red-300 animate-pulse"
            : "bg-violet-500/15 border-violet-500/30 text-violet-300"
        )}>
          <Clock size={16} />
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${((index + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-5">
        {/* Question type badge */}
        {currentQ.type && (
          <span className="text-xs font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-1 rounded-full">
            {currentQ.type}
          </span>
        )}

        {/* Question prompt — supports multiple formats from daily-test.json */}
        <div className="text-center py-2">
          <p className="text-xs text-slate-500 font-semibold mb-2 uppercase tracking-widest">Translate / Select Correct Answer</p>
          <h2 className="text-2xl md:text-3xl font-black text-white hindi-text leading-relaxed">
            &ldquo;{currentQ.hindi || currentQ.sentence || currentQ.question || '—'}&rdquo;
          </h2>
        </div>

        {/* MCQ Options */}
        <div className="grid sm:grid-cols-2 gap-3">
          {(currentQ.options || []).map((opt, i) => {
            const isChosen = selected === opt;
            const isRevealed = submitted;
            // Resolve letter-code answer (A/B/C/D) to actual option text for comparison
            const correctText = getCorrectOptionText(currentQ);
            const isRight = opt === correctText;
            return (
              <button
                key={i}
                onClick={() => !submitted && setSelected(opt)}
                disabled={submitted}
                className={cn(
                  "p-4 rounded-xl border text-left font-medium transition-all text-sm",
                  submitted && isRight && "border-emerald-500 bg-emerald-500/15 text-emerald-300",
                  submitted && isChosen && !isRight && "border-red-500 bg-red-500/15 text-red-300",
                  !submitted && isChosen && "border-violet-500 bg-violet-500/15 text-violet-300",
                  !submitted && !isChosen && "border-slate-700 text-slate-300 hover:border-violet-500/50 hover:bg-slate-800/50"
                )}
              >
                <span className="mr-2 font-bold text-slate-500">{String.fromCharCode(65 + i)}.</span>
                {submitted && isRight && '✓ '}
                {submitted && isChosen && !isRight && '✗ '}
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {currentQ.explanation && (
                  <button
                    onClick={() => setShowExplanation(v => !v)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Lightbulb size={12} />
                    {showExplanation ? 'Hide' : 'Show'} Explanation (Hindi)
                  </button>
                )}
                {showExplanation && currentQ.explanation && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
                    <p className="text-sm text-slate-300 hindi-text leading-relaxed">{currentQ.explanation}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!submitted ? (
            <button
              onClick={submitAnswer}
              disabled={!selected}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              {index === questions.length - 1 ? 'Finish Test' : 'Next Question'} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 10: Overview — Teacher-Style Day Introduction
// Uses overview.json: summary, whatYouWillLearn, whyImportant,
// realLifeUsage, motivationalQuote, keyGrammarRules, practiceTarget
// ============================================================
function OverviewSection({ overview, onComplete }) {
  const [activeTab, setActiveTab] = useState('intro');
  const [revealedRules, setRevealedRules] = useState({});

  const whyList = overview?.whyImportant
    ? overview.whyImportant.split('।').map(s => s.trim()).filter(Boolean)
    : [];
  const usageList = overview?.realLifeUsage
    ? (Array.isArray(overview.realLifeUsage)
        ? overview.realLifeUsage
        : overview.realLifeUsage.split('।').map(s => s.trim()).filter(Boolean))
    : [];
  const whatList = overview?.whatYouWillLearn || [];
  const grammarRules = overview?.keyGrammarRules || [];

  const ICON_COLORS = [
    'text-violet-400', 'text-cyan-400', 'text-emerald-400', 'text-amber-400',
    'text-rose-400', 'text-blue-400', 'text-pink-400', 'text-lime-400',
    'text-orange-400', 'text-teal-400', 'text-indigo-400', 'text-red-400',
  ];
  const BG_COLORS = [
    'bg-violet-500/10 border-violet-500/20', 'bg-cyan-500/10 border-cyan-500/20',
    'bg-emerald-500/10 border-emerald-500/20', 'bg-amber-500/10 border-amber-500/20',
    'bg-rose-500/10 border-rose-500/20', 'bg-blue-500/10 border-blue-500/20',
    'bg-pink-500/10 border-pink-500/20', 'bg-lime-500/10 border-lime-500/20',
    'bg-orange-500/10 border-orange-500/20', 'bg-teal-500/10 border-teal-500/20',
    'bg-indigo-500/10 border-indigo-500/20', 'bg-red-500/10 border-red-500/20',
  ];

  const OVERVIEW_TABS = [
    { id: 'intro',   label: 'Topic Intro',     icon: Sparkles },
    { id: 'learn',   label: `Learn (${whatList.length})`, icon: BookOpen },
    { id: 'why',     label: 'Why It Matters',  icon: Lightbulb },
    { id: 'usage',   label: 'Real-Life Use',   icon: MessageSquare },
    { id: 'grammar', label: `Grammar (${grammarRules.length})`, icon: Brain },
  ];

  if (!overview) {
    return (
      <div className="text-center py-12 space-y-4">
        <Sparkles size={44} className="text-violet-400 mx-auto opacity-50" />
        <p className="text-slate-400">Overview content loading...</p>
        <button onClick={onComplete} className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold">
          Mark as Reviewed
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/25 via-purple-600/15 to-cyan-600/20 border border-violet-500/30 p-8"
      >
        {/* Background glow blobs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Day badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-bold">
            <Sparkles size={14} /> Day {overview.day} — Topic Overview
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {overview.title}
            </h2>
            <p className="text-lg text-violet-300 font-semibold mt-1 hindi-text">
              {overview.tagline}
            </p>
          </div>

          {/* Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen size={12} /> English Summary
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">{overview.summary}</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MessageSquare size={12} /> हिंदी में समझें
              </p>
              <p className="text-amber-200/90 text-sm leading-relaxed hindi-text">{overview.hindiSummary}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Daily Goal', value: overview.dailyGoal || '100+ sentences', icon: Target, color: 'text-emerald-400' },
              { label: 'Topics to Master', value: `${whatList.length} concepts`, icon: Brain, color: 'text-cyan-400' },
              { label: 'Practice Target', value: overview.practiceTarget || '400 Qs', icon: Zap, color: 'text-amber-400' },
              { label: 'Grammar Rules', value: `${grammarRules.length} rules`, icon: BookMarked, color: 'text-rose-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="rounded-xl bg-white/5 border border-white/8 p-3 text-center">
                <Icon size={18} className={cn(color, 'mx-auto mb-1')} />
                <p className="font-black text-white text-base">{value}</p>
                <p className="text-xs text-slate-500 font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Motivational Quote */}
      {overview.motivationalQuote && (
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-start gap-4 p-5 rounded-2xl bg-amber-500/8 border border-amber-500/20"
        >
          <div className="text-amber-400 text-5xl font-black leading-none mt-[-6px] shrink-0">&ldquo;</div>
          <div>
            <p className="text-amber-200 text-base font-semibold italic leading-relaxed">{overview.motivationalQuote}</p>
            <p className="text-amber-500/70 text-xs font-bold mt-1.5 uppercase tracking-wider">— Teacher&apos;s Note</p>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-1.5 flex-wrap">
        {OVERVIEW_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border',
              activeTab === id
                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 shadow-md shadow-violet-500/10'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-300 hover:border-slate-600'
            )}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Tab: Topic Intro */}
      {activeTab === 'intro' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-6 space-y-4">
            <h4 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles size={18} className="text-violet-400" />
              Teacher&apos;s Introduction — Aaj Hum Kya Seekhenge?
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Namaskar! Aaj ka din aapki English journey ka ek khaas din hai. Ek acche teacher ki tarah main
              aapko step-by-step samjhaunga ki aaj ka topic kyun important hai, aap kya seekhenge, aur
              real life mein kaise use karenge.
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-violet-300">Topic: {overview.title}</strong> — yeh English ka woh building block hai
              jis par aage ke sabhi topics depend karte hain. Agar aaj ka foundation strong hua, toh
              baaki 74 days bahut aasaan ho jayenge.
            </p>
            <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 space-y-2">
              <p className="text-xs font-bold text-violet-400 uppercase tracking-wider">📋 Aaj Aap Karenge:</p>
              {[
                `📖 Grammar theory padho — ${overview.title} ke rules deeply samjho`,
                `📝 ${whatList.length} concepts master karo with examples`,
                `🗣 Speaking drills — har sentence 3 baar zor se bolo`,
                `✍️ Writing practice — kud se sentences banao`,
                `🎧 Listening exercises — sunkar fill-in-the-blank`,
                `📚 Reading comprehension — passages padho aur MCQ solve karo`,
                `🔁 Revision quiz — aaj ka sara content revision karo`,
                `🏆 Mock test — ${overview.practiceTarget || '400 questions'} available, apna level test karo`,
              ].map((item, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-slate-300 text-sm"
                >
                  {item}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab: What You Will Learn */}
      {activeTab === 'learn' && whatList.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <BookOpen size={18} className="text-cyan-400" />
            Aaj Aap Kya Seekhenge — {whatList.length} Concepts
          </h4>
          <div className="grid sm:grid-cols-2 gap-3">
            {whatList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={cn('flex items-start gap-3 p-4 rounded-xl border', BG_COLORS[i % BG_COLORS.length])}
              >
                <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5', ICON_COLORS[i % ICON_COLORS.length], 'bg-white/10')}>
                  {i + 1}
                </div>
                <p className="text-slate-200 text-sm font-semibold leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab: Why It Matters */}
      {activeTab === 'why' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-400" />
            Yeh Topic Kyun Important Hai?
          </h4>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-4">
            {whyList.length > 0 ? (
              <ul className="space-y-4">
                {whyList.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap size={12} className="text-amber-400" />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed hindi-text">{point}</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-300 leading-relaxed hindi-text">{overview.whyImportant}</p>
            )}
          </div>
          {/* Teacher tip */}
          <div className="rounded-xl bg-slate-800/80 border border-slate-700 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
              <Star size={16} className="text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">Teacher&apos;s Tip</p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Jo students is topic ko seriously lete hain, woh bakiyon se 3x faster progress karte hain.
                Aaj jo time invest karoge, woh poore 75 days payoff dega.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab: Real-Life Usage */}
      {activeTab === 'usage' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-400" />
            Real Life Mein Kaise Use Karein?
          </h4>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-3">
            {usageList.length > 0 ? (
              usageList.map((usage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-sm leading-relaxed hindi-text">{usage}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-slate-300 leading-relaxed hindi-text">{overview.realLifeUsage}</p>
            )}
          </div>
          {/* Scenarios */}
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: 'Office / Work', icon: '💼', desc: 'Meetings, emails, presentations mein' },
              { label: 'Daily Life', icon: '🏠', desc: 'Shopping, travel, conversations mein' },
              { label: 'Exams / Interviews', icon: '🎯', desc: 'Job interviews aur competitive exams mein' },
            ].map(({ label, icon, desc }) => (
              <div key={label} className="rounded-xl bg-slate-800 border border-slate-700 p-4 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="font-bold text-white text-sm">{label}</p>
                <p className="text-xs text-slate-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab: Grammar Rules Preview */}
      {activeTab === 'grammar' && grammarRules.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <Brain size={18} className="text-rose-400" />
            Key Grammar Rules — {grammarRules.length} Rules at a Glance
          </h4>
          <div className="space-y-3">
            {grammarRules.map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl bg-slate-800 border border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setRevealedRules(prev => ({ ...prev, [i]: !prev[i] }))}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-xs font-black text-rose-400 shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {typeof rule === 'object' ? (rule.rule || rule.title || JSON.stringify(rule)) : rule}
                    </span>
                  </div>
                  <ChevronDown size={16} className={cn('text-slate-500 transition-transform', revealedRules[i] && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {revealedRules[i] && typeof rule === 'object' && rule.example && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-2 border-t border-slate-700">
                        <p className="text-emerald-300 text-sm font-semibold mt-3">
                          ✅ Example: <span className="text-white">{rule.example}</span>
                        </p>
                        {rule.hindiExplanation && (
                          <p className="text-amber-200/80 text-sm hindi-text">{rule.hindiExplanation}</p>
                        )}
                        {rule.commonMistake && (
                          <p className="text-red-300 text-sm">
                            ❌ Common Mistake: <span>{rule.commonMistake}</span>
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center">
            Yeh sirf preview hai — poore explanations ke liye &ldquo;Grammar Concept&rdquo; section dekho
          </p>
        </motion.div>
      )}

      {/* Complete Button */}
      <motion.button
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white font-bold text-lg transition-all shadow-xl shadow-violet-500/25 flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> Overview Complete — Concept Section Par Jao → +50 XP
      </motion.button>
    </div>
  );
}

// ============================================================
// SECTION 11: Study Plan — Daily Morning Routine
// Uses morning-routine.json: step-by-step daily schedule
// with time estimates and completion tracking
// ============================================================
function StudyPlanSection({ studyPlan, morningRoutine, onComplete }) {
  const steps = morningRoutine?.steps || studyPlan?.steps || [];
  const [completedSteps, setCompletedSteps] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (i) => {
    setCompletedSteps(prev => ({ ...prev, [i]: !prev[i] }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalTime = steps.reduce((acc, s) => acc + (s.duration || 0), 0);
  const completedTime = steps.reduce((acc, s, i) => acc + (completedSteps[i] ? (s.duration || 0) : 0), 0);

  const STEP_ICONS = [BookOpen, Brain, Hash, Zap, Volume2, PenTool, Headphones, BookMarked, Star, Trophy];
  const STEP_COLORS = [
    'border-violet-500/40 bg-violet-500/10',
    'border-cyan-500/40 bg-cyan-500/10',
    'border-emerald-500/40 bg-emerald-500/10',
    'border-amber-500/40 bg-amber-500/10',
    'border-rose-500/40 bg-rose-500/10',
  ];
  const STEP_TEXT_COLORS = [
    'text-violet-400', 'text-cyan-400', 'text-emerald-400', 'text-amber-400', 'text-rose-400',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600/20 to-cyan-600/15 border border-emerald-500/30 p-6 space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Clock size={20} className="text-emerald-400" /> Aaj Ka Study Plan
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              {morningRoutine?.topic || studyPlan?.topic || 'Daily Learning Routine'} — {steps.length} steps
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-2xl font-black text-emerald-400">{completedCount}/{steps.length}</p>
              <p className="text-xs text-slate-500 font-bold">Steps Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-cyan-400">{totalTime}m</p>
              <p className="text-xs text-slate-500 font-bold">Total Time</p>
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>{completedTime} min done</span>
            <span>{totalTime - completedTime} min remaining</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${steps.length > 0 ? (completedCount / steps.length) * 100 : 0}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Tip Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
        <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-200/90 text-sm leading-relaxed">
          <strong className="font-bold">Teacher&apos;s Advice:</strong> Har step ko seriously lo. 10 minute ka focused study,
          1 hour ke distracted study se better hai। Mobile notifications band karo aur start karo।
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          const isDone = completedSteps[i];
          const isActive = activeStep === i && !isDone;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={cn(
                'rounded-2xl border p-5 transition-all cursor-pointer',
                isDone
                  ? 'border-emerald-500/40 bg-emerald-500/8 opacity-80'
                  : isActive
                  ? STEP_COLORS[i % STEP_COLORS.length]
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              )}
              onClick={() => setActiveStep(i)}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all',
                  isDone ? 'bg-emerald-500/20' : STEP_COLORS[i % STEP_COLORS.length]
                )}>
                  {isDone
                    ? <CheckCircle2 size={22} className="text-emerald-400" />
                    : <Icon size={22} className={STEP_TEXT_COLORS[i % STEP_TEXT_COLORS.length]} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-slate-500">STEP {i + 1}</span>
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', isDone ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700 text-slate-400')}>
                      {step.duration}m
                    </span>
                  </div>
                  <p className={cn('font-black text-base mt-0.5', isDone ? 'text-emerald-300 line-through decoration-emerald-500/50' : 'text-white')}>
                    {step.title}
                  </p>
                  <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{step.description}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleStep(i); }}
                  className={cn(
                    'w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all',
                    isDone
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-600 hover:border-emerald-500 text-transparent hover:text-emerald-500'
                  )}
                >
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Complete Button */}
      <button
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-bold text-lg transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} /> Study Plan Reviewed — +50 XP
      </button>
    </div>
  );
}

// ============================================================
// SECTION 12: Milestones — Badges & Achievement Tracker
// Uses milestones.json: list of milestone objects with XP rewards,
// badge icons, and completion criteria
// ============================================================
function MilestonesSection({ milestones: milestonesData, dayNum, completedSections, onComplete }) {
  const milestones = milestonesData?.milestones || [];
  const [claimedBadges, setClaimedBadges] = useState({});
  const totalXP = milestones.reduce((sum, m) => sum + (m.xp || 0), 0);
  const claimedXP = milestones.reduce((sum, m, i) => sum + (claimedBadges[i] ? (m.xp || 0) : 0), 0);

  const BADGE_EMOJIS = {
    'lesson-complete': '📖',
    'vocab-master': '📝',
    'practice-champion': '🏋️',
    'test-passed': '🎓',
    'speaking-star': '🎤',
    'writing-wizard': '✍️',
    'listening-legend': '🎧',
    'reading-rockstar': '📚',
  };

  const BADGE_COLORS = [
    'from-violet-600/20 to-purple-600/20 border-violet-500/30',
    'from-cyan-600/20 to-blue-600/20 border-cyan-500/30',
    'from-emerald-600/20 to-green-600/20 border-emerald-500/30',
    'from-amber-600/20 to-orange-600/20 border-amber-500/30',
    'from-rose-600/20 to-pink-600/20 border-rose-500/30',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-600/20 to-orange-600/15 border border-amber-500/30 p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Trophy size={20} className="text-amber-400" /> Day {dayNum} Milestones
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">Badges earn karo aur XP collect karo</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-2xl font-black text-amber-400">{claimedXP}</p>
              <p className="text-xs text-slate-500 font-bold">XP Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-400">{totalXP}</p>
              <p className="text-xs text-slate-500 font-bold">Total XP</p>
            </div>
          </div>
        </div>
        {/* XP Progress */}
        <div className="mt-4 h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-400"
            initial={{ width: 0 }}
            animate={{ width: `${totalXP > 0 ? (claimedXP / totalXP) * 100 : 0}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </div>

      {/* Milestone Cards */}
      <div className="grid gap-4">
        {milestones.map((milestone, i) => {
          const emoji = BADGE_EMOJIS[milestone.badge] || '🏆';
          const isClaimed = claimedBadges[i];
          return (
            <motion.div
              key={milestone.id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                'rounded-2xl border bg-gradient-to-br p-5 transition-all',
                BADGE_COLORS[i % BADGE_COLORS.length],
                isClaimed && 'opacity-75'
              )}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-all',
                    isClaimed ? 'bg-white/15 shadow-lg' : 'bg-white/8'
                  )}>
                    {emoji}
                  </div>
                  {isClaimed && (
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className={cn('font-black text-base', isClaimed ? 'text-slate-400 line-through' : 'text-white')}>
                      {milestone.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-black">
                      +{milestone.xp} XP
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{milestone.description}</p>
                </div>
                <button
                  onClick={() => setClaimedBadges(prev => ({ ...prev, [i]: !prev[i] }))}
                  className={cn(
                    'shrink-0 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border',
                    isClaimed
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/8 border-white/15 text-white hover:bg-white/15'
                  )}
                >
                  {isClaimed ? '✓ Claimed' : 'Claim'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* All milestones note */}
      <div className="rounded-xl bg-slate-800 border border-slate-700 p-4 flex items-start gap-3">
        <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-slate-400 text-sm leading-relaxed">
          <strong className="text-amber-300">Note:</strong> Milestones tab karo jab aap woh section complete karo.
          Total <strong className="text-white">{totalXP} XP</strong> earn kar sakte ho aaj ke din mein.
          Agar aaj ka content 100% complete kiya toh <strong className="text-amber-300">bonus XP</strong> milega!
        </p>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-bold text-lg transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
      >
        <Trophy size={20} /> Milestones Reviewed — +50 XP
      </button>
    </div>
  );
}

// ============================================================
// SECTION 13: Challenge Task — Real-World Practice Mission
// Uses challenge.json: challengeTask, successCriteria,
// bonusChallenge, xpReward — tracks user acceptance
// ============================================================
function ChallengeTaskSection({ challenge, dayNum, onComplete }) {
  const [accepted, setAccepted] = useState(false);
  const [checkedCriteria, setCheckedCriteria] = useState({});
  const [bonusAttempted, setBonusAttempted] = useState(false);

  const successCriteria = challenge?.successCriteria || [];
  const checkedCount = Object.values(checkedCriteria).filter(Boolean).length;
  const allChecked = successCriteria.length > 0 && checkedCount === successCriteria.length;

  const toggleCriteria = (i) => {
    setCheckedCriteria(prev => ({ ...prev, [i]: !prev[i] }));
  };

  if (!challenge) {
    return (
      <div className="text-center py-10 space-y-4">
        <Zap size={44} className="text-rose-400 mx-auto opacity-50" />
        <p className="text-slate-400">Challenge content loading...</p>
        <button onClick={onComplete} className="px-6 py-3 rounded-xl bg-rose-600 text-white font-bold">
          Mark Complete
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Challenge Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600/25 via-pink-600/15 to-orange-600/20 border border-rose-500/30 p-8"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <Zap size={28} className="text-rose-400" />
            </div>
            <div>
              <p className="text-xs font-black text-rose-400 uppercase tracking-widest">Day {dayNum} Challenge</p>
              <h3 className="text-2xl font-black text-white">{challenge.topic}</h3>
            </div>
          </div>

          {/* Challenge Task */}
          <div className="rounded-2xl bg-white/8 border border-white/12 p-5 space-y-3">
            <p className="text-xs font-bold text-rose-300 uppercase tracking-wider">🎯 Aaj Ka Challenge:</p>
            <p className="text-white font-bold text-lg leading-relaxed">{challenge.challengeTask}</p>
            <div className="border-t border-white/10 pt-3">
              <p className="text-xs text-amber-400 font-bold mb-1">🇮🇳 Hindi mein:</p>
              <p className="text-amber-200/90 text-sm leading-relaxed hindi-text">{challenge.hindiTask}</p>
            </div>
          </div>

          {/* XP Reward */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/25">
              <Trophy size={16} className="text-amber-400" />
              <span className="font-black text-amber-300 text-lg">+{challenge.xpReward || 200} XP</span>
            </div>
            <p className="text-slate-400 text-sm">Challenge complete karne par milega</p>
          </div>

          {/* Accept Button */}
          {!accepted ? (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAccepted(true)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-black text-lg transition-all shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2"
            >
              <Zap size={22} /> Challenge Accept Karo!
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span className="font-bold text-emerald-300">Challenge Accepted! Ab task complete karo.</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Success Criteria Checklist */}
      {successCriteria.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-black text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-400" />
              Success Criteria — {checkedCount}/{successCriteria.length} Done
            </h4>
            {allChecked && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-black"
              >
                🎉 ALL DONE!
              </motion.span>
            )}
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
              animate={{ width: `${successCriteria.length > 0 ? (checkedCount / successCriteria.length) * 100 : 0}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="space-y-2">
            {successCriteria.map((criteria, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => toggleCriteria(i)}
                className={cn(
                  'w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all',
                  checkedCriteria[i]
                    ? 'border-emerald-500/40 bg-emerald-500/8'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                  checkedCriteria[i]
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-slate-600'
                )}>
                  {checkedCriteria[i] && <CheckCircle2 size={14} />}
                </div>
                <p className={cn(
                  'text-sm font-semibold leading-relaxed',
                  checkedCriteria[i] ? 'text-slate-400 line-through decoration-emerald-500/40' : 'text-slate-200'
                )}>
                  {criteria}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Bonus Challenge */}
      {challenge.bonusChallenge && (
        <div className={cn(
          'rounded-2xl border p-5 space-y-3 transition-all',
          bonusAttempted
            ? 'border-amber-500/40 bg-amber-500/8'
            : 'border-slate-700 bg-slate-800/50'
        )}>
          <div className="flex items-center gap-2">
            <Star size={18} className="text-amber-400" />
            <h4 className="font-black text-white text-base">Bonus Challenge 🌟</h4>
            <span className="ml-auto text-xs font-bold text-amber-400">+50 XP Extra</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{challenge.bonusChallenge}</p>
          <button
            onClick={() => setBonusAttempted(v => !v)}
            className={cn(
              'px-5 py-2.5 rounded-xl font-bold text-sm transition-all border',
              bonusAttempted
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                : 'border-slate-600 bg-slate-700 text-white hover:border-amber-500/40 hover:bg-amber-500/10'
            )}
          >
            {bonusAttempted ? '⭐ Bonus Attempted!' : 'Attempt Bonus Challenge'}
          </button>
        </div>
      )}

      {/* Complete Button */}
      <motion.button
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-black text-lg transition-all shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2"
      >
        <Trophy size={20} /> Challenge Complete — +{challenge.xpReward || 200} XP
      </motion.button>
    </div>
  );
}
