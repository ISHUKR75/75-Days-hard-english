// ============================================================
// OverviewSection.js — World-Class Teacher-Like Topic Introduction
// The FIRST section every learner sees — must be deeply engaging,
// educational, and motivating. Inspired by Apple's product pages,
// Linear's clean design, and Duolingo's friendly teaching style.
// ============================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import Link from 'next/link';
import {
  BookOpen, Star, Clock, Zap, Globe, Target, ChevronDown, ChevronRight,
  Sparkles, Trophy, ArrowRight, Languages, Brain, CheckCircle2, AlertTriangle,
  Lightbulb, Play, Users, TrendingUp, Award, MapPin, BookMarked, Volume2,
  BarChart3, MessageCircle, PenLine, Headphones, Eye, Flame, Heart, Rocket,
  GraduationCap, Coffee, Building2, Briefcase, Phone, Mail
} from 'lucide-react';

// ── Animation variants ────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// ── Section tabs ──────────────────────────────────────────────
const TABS = [
  { id: 'why',      label: 'Why It Matters',   icon: '🎯', shortLabel: 'Why' },
  { id: 'learn',    label: "What You'll Learn", icon: '📖', shortLabel: 'Learn' },
  { id: 'teacher',  label: "Teacher's Notes",   icon: '👩‍🏫', shortLabel: 'Notes' },
  { id: 'roadmap',  label: 'Learning Roadmap',  icon: '🗺️', shortLabel: 'Roadmap' },
  { id: 'mistakes', label: 'Common Errors',     icon: '⚠️', shortLabel: 'Errors' },
];

// ── CEFR level styling ────────────────────────────────────────
const CEFR_STYLE = {
  A0: { bg: 'bg-slate-500/20',   text: 'text-slate-300',   border: 'border-slate-500/30',   label: 'Absolute Beginner' },
  A1: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Beginner' },
  A2: { bg: 'bg-green-500/20',   text: 'text-green-400',   border: 'border-green-500/30',   label: 'Elementary' },
  B1: { bg: 'bg-blue-500/20',    text: 'text-blue-400',    border: 'border-blue-500/30',    label: 'Intermediate' },
  B2: { bg: 'bg-violet-500/20',  text: 'text-violet-400',  border: 'border-violet-500/30',  label: 'Upper-Intermediate' },
  C1: { bg: 'bg-orange-500/20',  text: 'text-orange-400',  border: 'border-orange-500/30',  label: 'Advanced' },
  C2: { bg: 'bg-red-500/20',     text: 'text-red-400',     border: 'border-red-500/30',     label: 'Mastery' },
};

// ── Real-life use-case icons ──────────────────────────────────
const USE_CASE_ICONS = {
  'Daily Life':    { icon: Coffee,    color: 'text-amber-400',   bg: 'bg-amber-400/10'   },
  'Office':        { icon: Building2, color: 'text-blue-400',    bg: 'bg-blue-400/10'    },
  'Interview':     { icon: Briefcase, color: 'text-violet-400',  bg: 'bg-violet-400/10'  },
  'Business':      { icon: BarChart3, color: 'text-cyan-400',    bg: 'bg-cyan-400/10'    },
  'Social':        { icon: Users,     color: 'text-pink-400',    bg: 'bg-pink-400/10'    },
  'Phone':         { icon: Phone,     color: 'text-green-400',   bg: 'bg-green-400/10'   },
  'Email':         { icon: Mail,      color: 'text-orange-400',  bg: 'bg-orange-400/10'  },
  'Speaking':      { icon: Volume2,   color: 'text-rose-400',    bg: 'bg-rose-400/10'    },
};

// ── Motivational quotes pool ──────────────────────────────────
const QUOTES = [
  { text: "Every expert was once a beginner. The only difference? They never stopped.", author: "Unknown" },
  { text: "Language is not just words. It is the power to change your entire life.", author: "Unknown" },
  { text: "One language sets you in a corridor. Two open every door along the way.", author: "Frank Smith" },
  { text: "The limits of your language are the limits of your world.", author: "Wittgenstein" },
  { text: "To learn a new language is to have one more window from which to see the world.", author: "Chinese Proverb" },
  { text: "Fluency isn't about grammar. It's about the courage to make mistakes and keep going.", author: "Unknown" },
];

// ── Animated count-up number ──────────────────────────────────
function CountUp({ end, duration = 1.5, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── Animated section wrapper ──────────────────────────────────
function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Gradient blob ─────────────────────────────────────────────
function Blob({ className }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ── "Why It Matters" tab content ─────────────────────────────
function WhyItMattersTab({ overview, showHindi }) {
  const whyPoints = overview?.whyImportant?.points || [
    'Essential for daily conversation and communication',
    'Required for office and professional settings',
    'Foundation for all advanced English concepts',
    'Builds confidence when speaking with native speakers',
  ];
  const realLifeExamples = overview?.realLifeExamples || [
    { context: 'Daily Life',  example: 'I go to the market every morning.',     hindi: 'मैं हर सुबह बाजार जाता हूँ।' },
    { context: 'Office',      example: 'She works in a software company.',       hindi: 'वह एक software company में काम करती है।' },
    { context: 'Interview',   example: 'I have five years of experience.',       hindi: 'मेरे पास पाँच साल का experience है।' },
    { context: 'Social',      example: 'They play cricket every Sunday.',         hindi: 'वे हर रविवार cricket खेलते हैं।' },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">

      {/* Why it matters — points */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
            <Target className="w-4 h-4 text-violet-400" />
          </div>
          <h3 className="text-white font-bold text-lg">Why Learn This? 🤔</h3>
        </div>
        <div className="grid gap-3">
          {whyPoints.map((point, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 group hover:border-violet-500/30 hover:bg-violet-500/5 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Real-life examples */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <Globe className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="text-white font-bold text-lg">Real Life Examples 🌍</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {realLifeExamples.map((ex, i) => {
            const iconConfig = USE_CASE_ICONS[ex.context] || USE_CASE_ICONS['Daily Life'];
            const IconComp = iconConfig.icon;
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all group"
              >
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${iconConfig.bg} ${iconConfig.color}`}>
                  <IconComp className="w-3 h-3" />
                  {ex.context}
                </div>
                <p className="text-white font-medium text-sm mb-1.5">"{ex.example}"</p>
                {showHindi && (
                  <p className="text-orange-300 text-xs font-medium italic">{ex.hindi}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Impact statement */}
      <motion.div
        variants={fadeInUp}
        className="relative overflow-hidden rounded-3xl p-6 border border-white/10"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.2) 100%)' }}
      >
        <div className="absolute inset-0 backdrop-blur-md" />
        <div className="relative z-10 text-center">
          <div className="text-5xl mb-3">🚀</div>
          <p className="text-white font-bold text-lg mb-2">
            This changes everything about your English.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Master this topic and you'll immediately sound more confident, natural, and professional — in job interviews, office meetings, daily conversations, and beyond.
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
}

// ── "What You'll Learn" tab content ──────────────────────────
function WhatYouLearnTab({ overview }) {
  const items = overview?.whatYouWillLearn || [];
  const [expanded, setExpanded] = useState(null);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">

      <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Today's Learning Targets ✨</h3>
          <p className="text-gray-400 text-xs">{items.length} concepts — click each to expand</p>
        </div>
      </motion.div>

      {items.map((item, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className={`border rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
            expanded === i
              ? 'border-violet-500/40 bg-violet-500/10'
              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
          }`}
          onClick={() => setExpanded(expanded === i ? null : i)}
        >
          <div className="flex items-center gap-3 p-4">
            <div className="text-2xl flex-shrink-0">{item.icon || '📌'}</div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm truncate ${expanded === i ? 'text-violet-300' : 'text-white'}`}>
                {item.topic}
              </p>
              {!expanded === i && (
                <p className="text-gray-500 text-xs truncate">{item.detail}</p>
              )}
            </div>
            <motion.div animate={{ rotate: expanded === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </motion.div>
          </div>
          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="px-4 pb-4 pt-0">
                  <div className="w-full h-px bg-white/10 mb-3" />
                  <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                  {item.examples && (
                    <div className="mt-3 space-y-2">
                      {item.examples.map((ex, j) => (
                        <div key={j} className="bg-white/5 rounded-xl px-3 py-2 text-xs text-cyan-300">
                          {ex}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>Learning objectives for this section are being prepared.</p>
        </div>
      )}
    </motion.div>
  );
}

// ── "Teacher's Notes" tab content ────────────────────────────
function TeacherNotesTab({ overview, showHindi }) {
  const teacher = overview?.teacherIntro || {};

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">

      {/* Teacher card — friendly, warm, encouraging */}
      <motion.div
        variants={fadeInUp}
        className="relative overflow-hidden rounded-3xl border border-white/10 p-6"
        style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.1) 100%)' }}
      >
        <div className="absolute inset-0 backdrop-blur-md" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
              👩‍🏫
            </div>
            <div>
              <p className="text-white font-bold text-base">Your English Teacher</p>
              <p className="text-emerald-400 text-xs font-medium">75 Days Hard English</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-semibold">Live</span>
            </div>
          </div>

          {/* Message */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.p
                key={showHindi ? 'hi' : 'en'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`text-sm leading-relaxed ${showHindi ? 'text-orange-200' : 'text-gray-200'}`}
              >
                {showHindi
                  ? (teacher.message || 'नमस्ते! आज हम English की एक बहुत important concept सीखेंगे। ध्यान से पढ़िए और practice करते रहिए। आप ज़रूर succeed करेंगे!')
                  : (teacher.message || "Hey! Welcome to today's lesson. This is one of the most important concepts you'll learn. Take your time, don't rush — understanding beats memorizing every single time. You've got this! 💪")
                }
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Importance quote */}
          {teacher.importanceQuote && (
            <div className="mt-4 border-l-4 border-emerald-500/50 pl-4">
              <p className="text-gray-300 text-sm italic">
                {showHindi ? teacher.hindiImportanceQuote : teacher.importanceQuote}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Pro tips section */}
      <motion.div variants={fadeInUp}>
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Pro Tips Before You Begin
        </h3>
        <div className="space-y-3">
          {[
            { tip: 'Read every concept out loud — your mouth needs to learn, not just your brain.', icon: '🗣️' },
            { tip: 'Don\'t just read examples — create your own sentences immediately after.', icon: '✍️' },
            { tip: 'If something confuses you, note it down. Come back to it after practice.', icon: '📝' },
            { tip: 'Hindi toggle is there for you — use it when stuck, but aim to think in English.', icon: '🧠' },
            { tip: 'Complete the Practice section right after — don\'t delay. That\'s where real learning happens.', icon: '⚡' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5"
            >
              <span className="text-lg">{item.icon}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{item.tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary card */}
      <motion.div variants={fadeInUp}>
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-400" />
          Quick Summary
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-gray-300 text-sm leading-relaxed">
            {showHindi
              ? (overview?.hindiSummary || 'आज का पाठ आपकी English learning की नींव है।')
              : (overview?.summary || "Today's lesson covers the foundation concepts you need for fluent English communication.")
            }
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
}

// ── "Learning Roadmap" tab content ───────────────────────────
function RoadmapTab({ dayNum }) {
  const SECTIONS_MAP = [
    { num: 1,  id: 'overview',       icon: '🎯', title: 'Why It Matters',    color: 'from-violet-500 to-purple-600', time: '5m',  xp: 10  },
    { num: 2,  id: 'theory',         icon: '📖', title: 'Theory & Concepts', color: 'from-blue-500 to-cyan-600',     time: '15m', xp: 25  },
    { num: 3,  id: 'mistakes',       icon: '⚠️', title: 'Common Mistakes',   color: 'from-orange-500 to-red-600',    time: '10m', xp: 20  },
    { num: 4,  id: 'memory-tricks',  icon: '🧠', title: 'Memory Tricks',     color: 'from-pink-500 to-rose-600',     time: '8m',  xp: 15  },
    { num: 5,  id: 'vocabulary',     icon: '📝', title: 'Vocabulary',        color: 'from-emerald-500 to-teal-600',  time: '30m', xp: 100 },
    { num: 6,  id: 'flashcards',     icon: '🃏', title: 'Flashcards',        color: 'from-yellow-500 to-amber-600',  time: '20m', xp: 50  },
    { num: 7,  id: 'practice',       icon: '✍️', title: 'Practice',          color: 'from-violet-600 to-indigo-700', time: '45m', xp: 200 },
    { num: 8,  id: 'dialogue',       icon: '💬', title: 'Dialogue',          color: 'from-sky-500 to-blue-600',      time: '15m', xp: 30  },
    { num: 9,  id: 'conversation',   icon: '🗣️', title: 'Conversation',      color: 'from-teal-500 to-green-600',    time: '12m', xp: 25  },
    { num: 10, id: 'speaking',       icon: '🎙️', title: 'Speaking',          color: 'from-purple-500 to-violet-600', time: '20m', xp: 40  },
    { num: 11, id: 'writing',        icon: '📄', title: 'Writing Drills',    color: 'from-indigo-500 to-blue-600',   time: '25m', xp: 50  },
    { num: 12, id: 'listening',      icon: '🎧', title: 'Listening',         color: 'from-cyan-500 to-sky-600',      time: '20m', xp: 40  },
    { num: 13, id: 'reading',        icon: '📰', title: 'Reading',           color: 'from-rose-500 to-pink-600',     time: '20m', xp: 40  },
    { num: 14, id: 'story',          icon: '📚', title: 'Story',             color: 'from-fuchsia-500 to-purple-600',time: '15m', xp: 30  },
    { num: 15, id: 'essay',          icon: '✒️', title: 'Essay Writing',     color: 'from-orange-400 to-amber-500',  time: '20m', xp: 45  },
    { num: 16, id: 'study-plan',     icon: '📅', title: 'Study Plan',        color: 'from-lime-500 to-green-600',    time: '5m',  xp: 10  },
    { num: 17, id: 'revision',       icon: '🔄', title: 'Revision',          color: 'from-amber-500 to-yellow-600',  time: '15m', xp: 35  },
    { num: 18, id: 'test',           icon: '📊', title: 'Mock Test',         color: 'from-red-500 to-rose-600',      time: '30m', xp: 150 },
    { num: 19, id: 'milestones',     icon: '🏆', title: 'Milestones',        color: 'from-yellow-400 to-orange-500', time: '5m',  xp: 20  },
    { num: 20, id: 'challenge-task', icon: '🎯', title: "Today's Challenge", color: 'from-violet-500 to-indigo-600', time: '10m', xp: 50  },
  ];

  const totalXP = SECTIONS_MAP.reduce((s, sec) => s + sec.xp, 0);
  const totalTime = SECTIONS_MAP.reduce((s, sec) => s + parseInt(sec.time), 0);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">

      {/* Summary stats */}
      <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Sections', value: '20', icon: '📋', color: 'text-violet-400', bg: 'bg-violet-400/10' },
          { label: 'Est. Time',       value: `${totalTime}m`, icon: '⏱️', color: 'text-cyan-400',   bg: 'bg-cyan-400/10' },
          { label: 'XP Available',    value: `+${totalXP}`, icon: '⚡', color: 'text-amber-400',  bg: 'bg-amber-400/10' },
        ].map(({ label, value, icon, color, bg }) => (
          <div key={label} className={`${bg} border border-white/10 rounded-2xl p-3 text-center`}>
            <p className="text-2xl mb-1">{icon}</p>
            <p className={`text-xl font-black ${color}`}>{value}</p>
            <p className="text-gray-500 text-xs">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Roadmap list */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-3">Your Learning Path Today</p>
        {SECTIONS_MAP.map((sec, i) => (
          <Link
            key={sec.id}
            href={`/75-days-challenge/${dayNum}/${sec.id}`}
            className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3.5 hover:border-white/20 hover:bg-white/8 transition-all"
          >
            {/* Number */}
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${sec.color} flex items-center justify-center text-xs font-black text-white flex-shrink-0`}>
              {sec.num}
            </div>
            {/* Icon */}
            <span className="text-lg flex-shrink-0">{sec.icon}</span>
            {/* Title */}
            <span className="text-white text-sm font-medium flex-1 truncate group-hover:text-violet-300 transition-colors">
              {sec.title}
            </span>
            {/* Time + XP */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-gray-500 text-xs">{sec.time}</span>
              <span className="text-amber-400 text-xs font-semibold bg-amber-400/10 px-2 py-0.5 rounded-full">+{sec.xp}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors flex-shrink-0" />
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── "Common Errors" preview tab ───────────────────────────────
function CommonErrorsPreviewTab({ overview }) {
  const mistakes = overview?.previewMistakes || overview?.topMistakes || [];
  const defaultMistakes = [
    { wrong: "I am go to school.",         right: "I go to school.",                  explanation: "Simple Present doesn't use 'am/is/are' with V1. Use just the verb." },
    { wrong: "She don't like coffee.",     right: "She doesn't like coffee.",          explanation: "With He/She/It, always use 'doesn't' not 'don't'." },
    { wrong: "I am having a car.",         right: "I have a car.",                     explanation: "Possession (have/own) doesn't use present continuous." },
    { wrong: "He go to office daily.",     right: "He goes to office daily.",          explanation: "With He/She/It in Simple Present, add -s/-es to the verb." },
    { wrong: "I am agree with you.",       right: "I agree with you.",                 explanation: "'Agree' is a stative verb — use Simple Present, not continuous." },
  ];

  const displayMistakes = mistakes.length > 0 ? mistakes.slice(0, 5) : defaultMistakes;

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-4">

      <motion.div variants={fadeInUp}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Watch Out For These 👀</h3>
            <p className="text-gray-400 text-xs">Most common mistakes — know them before you make them</p>
          </div>
        </div>
      </motion.div>

      {displayMistakes.map((m, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3"
        >
          {/* Wrong */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-400 text-xs font-black">✗</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-red-400 font-semibold uppercase tracking-wide mb-1">WRONG</p>
              <p className="text-red-300 font-medium text-sm line-through decoration-red-400/60">{m.wrong}</p>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-400 text-xs font-black">✓</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wide mb-1">CORRECT</p>
              <p className="text-emerald-300 font-bold text-sm">{m.right}</p>
            </div>
          </div>
          {/* Explanation */}
          {m.explanation && (
            <div className="bg-white/5 rounded-xl px-3 py-2.5 border-l-2 border-amber-500/50">
              <p className="text-amber-200 text-xs leading-relaxed">💡 {m.explanation}</p>
            </div>
          )}
        </motion.div>
      ))}

      <motion.div variants={fadeInUp} className="text-center pt-2">
        <p className="text-gray-500 text-xs">
          Visit the <span className="text-orange-400 font-semibold">Common Mistakes</span> section for all 50 errors with detailed fixes.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function OverviewSection({ data, dayNum }) {
  const [activeTab, setActiveTab]   = useState('why');
  const [showHindi, setShowHindi]   = useState(false);
  const [quoteIdx]                  = useState(() => Math.floor(Math.random() * QUOTES.length));

  // ── Extract data safely ───────────────────────────────────
  const overview = data?.overview || {};
  const rawTopic  = data?.topic;
  const topicObj  = rawTopic && typeof rawTopic === 'object' ? rawTopic : {};

  const title      = overview?.title || topicObj?.title || (typeof rawTopic === 'string' ? rawTopic : 'English Lesson');
  const emoji      = overview?.emoji || topicObj?.emoji || '📚';
  const cefr       = overview?.cefr  || topicObj?.cefr  || 'A1';
  const difficulty = overview?.difficulty || topicObj?.difficulty || 'Beginner';
  const tagline    = overview?.tagline || 'Complete Masterclass';
  const stats      = data?.stats || {};

  const cefrStyle  = CEFR_STYLE[cefr] || CEFR_STYLE['A1'];
  const quote      = QUOTES[quoteIdx];

  // ── Stats for hero ───────────────────────────────────────
  const vocabCount     = stats?.vocabularyCount || 0;
  const practiceCount  = stats?.practiceCount   || 0;
  const testCount      = stats?.mockTestCount   || 0;
  const flashCount     = stats?.flashcardsCount || 0;

  return (
    <div className="relative">
      {/* Ambient background blobs */}
      <Blob className="w-[500px] h-[500px] bg-violet-600/20 -top-20 -left-32" />
      <Blob className="w-[400px] h-[400px] bg-cyan-500/15 top-48 -right-24" />
      <Blob className="w-[300px] h-[300px] bg-purple-500/15 bottom-32 left-1/3" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-6 space-y-8">

        {/* ════════════════════════════════════════════════════
            HERO — Topic banner with stats and Hindi toggle
        ════════════════════════════════════════════════════ */}
        <Section>
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-violet-500/10"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(139,92,246,0.25) 50%, rgba(6,182,212,0.2) 100%)' }}
          >
            <div className="absolute inset-0 backdrop-blur-xl" />

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
            />

            <div className="relative z-10 p-6 sm:p-10">
              {/* Top row: emoji + badges + Hindi toggle */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <motion.div
                  className="text-5xl sm:text-7xl select-none"
                  animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {emoji}
                </motion.div>

                <div className="flex flex-wrap gap-2 justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${cefrStyle.bg} ${cefrStyle.text} ${cefrStyle.border}`}>
                    {cefr} · {cefrStyle.label}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-xs text-orange-400 font-medium capitalize">
                    {difficulty}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHindi(!showHindi)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      showHindi
                        ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:border-white/30'
                    }`}
                  >
                    <Languages className="w-3 h-3" />
                    {showHindi ? 'EN' : 'हिंदी'}
                  </motion.button>
                </div>
              </div>

              {/* Day badge + Title */}
              <div className="mb-2">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Day {dayNum} — Basics of English</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-2">
                <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base mb-6">{tagline}</p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Vocab Words',  value: vocabCount,    icon: '📝', color: 'text-emerald-400' },
                  { label: 'Practice Qs',  value: practiceCount, icon: '✍️', color: 'text-violet-400'  },
                  { label: 'Test Qs',      value: testCount,     icon: '📊', color: 'text-red-400'     },
                  { label: 'Flashcards',   value: flashCount,    icon: '🃏', color: 'text-amber-400'   },
                ].map(({ label, value, icon, color }) => (
                  <div key={label} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-3 text-center">
                    <p className="text-xl mb-1">{icon}</p>
                    <p className={`text-xl font-black ${color}`}>
                      <CountUp end={value} duration={1.2} />
                    </p>
                    <p className="text-gray-500 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════
            MOTIVATIONAL QUOTE
        ════════════════════════════════════════════════════ */}
        <Section>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-violet-600/15 via-purple-500/10 to-cyan-500/10 border border-violet-500/20 rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0 mt-0.5">✨</div>
              <div>
                <p className="text-white font-medium text-sm sm:text-base italic leading-relaxed">
                  "{quote.text}"
                </p>
                <p className="text-gray-500 text-xs mt-1.5">— {quote.author}</p>
              </div>
            </div>
          </motion.div>
        </Section>

        {/* ════════════════════════════════════════════════════
            TABS — Navigation between different content views
        ════════════════════════════════════════════════════ */}
        <Section>
          <div className="overflow-x-auto scrollbar-hide -mx-1 px-1">
            <div className="flex gap-2 pb-1 min-w-max sm:min-w-0 sm:flex-wrap">
              {TABS.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                    activeTab === tab.id
                      ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/30'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/8'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </Section>

        {/* ════════════════════════════════════════════════════
            TAB CONTENT — Animated between tabs
        ════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {activeTab === 'why'      && <WhyItMattersTab       overview={overview} showHindi={showHindi} />}
            {activeTab === 'learn'    && <WhatYouLearnTab        overview={overview} />}
            {activeTab === 'teacher'  && <TeacherNotesTab        overview={overview} showHindi={showHindi} />}
            {activeTab === 'roadmap'  && <RoadmapTab             dayNum={dayNum} />}
            {activeTab === 'mistakes' && <CommonErrorsPreviewTab overview={overview} />}
          </motion.div>
        </AnimatePresence>

        {/* ════════════════════════════════════════════════════
            CTA — Begin learning
        ════════════════════════════════════════════════════ */}
        <Section>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/75-days-challenge/${dayNum}/theory`}
              className="flex-1"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-base shadow-xl shadow-violet-500/30 group"
              >
                <Play className="w-5 h-5" fill="white" />
                <span>Start Learning →</span>
              </motion.div>
            </Link>
            <Link href={`/75-days-challenge/${dayNum}/practice`} className="sm:flex-none">
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/8 border border-white/20 text-white font-semibold text-sm hover:bg-white/12 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                Jump to Practice
              </motion.div>
            </Link>
          </div>
          <p className="text-center text-gray-600 text-xs mt-3">
            Complete all 20 sections to earn <span className="text-amber-400 font-semibold">+925 XP</span> today
          </p>
        </Section>

      </div>
    </div>
  );
}
