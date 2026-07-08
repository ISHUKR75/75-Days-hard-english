'use client';
// Speaking Studio — Complete speaking practice hub
// Pronunciation, Roleplay, Public Speaking, Interview, Debate, Tongue Twisters

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Mic, Play, Star, Target, Zap, ArrowRight, ChevronRight,
  Award, Flame, Clock, BookOpen, TrendingUp, CheckCircle2,
  MessageSquare, Volume2, Users, Trophy, Calendar, BarChart2,
} from 'lucide-react';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ── Practice Modes ────────────────────────────────────────────
const PRACTICE_MODES = [
  {
    id: 'pronunciation',
    emoji: '🔤',
    title: 'Pronunciation Practice',
    description: 'Master English sounds, stress patterns, and intonation with IPA guides and audio examples.',
    difficulty: 'Beginner',
    difficultyColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    duration: '10–15 min',
    xp: 50,
    href: '/speaking-studio/pronunciation',
    gradient: 'from-emerald-600/20 to-teal-600/10',
    border: 'hover:border-emerald-500/30',
    iconBg: 'bg-emerald-500/15 border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'roleplay',
    emoji: '🎭',
    title: 'Roleplay Conversations',
    description: 'Practice real-life conversations: shopping, banking, doctor visits, and more.',
    difficulty: 'Intermediate',
    difficultyColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    duration: '15–20 min',
    xp: 75,
    href: '/speaking-studio/roleplay',
    gradient: 'from-blue-600/20 to-indigo-600/10',
    border: 'hover:border-blue-500/30',
    iconBg: 'bg-blue-500/15 border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'public-speaking',
    emoji: '🎤',
    title: 'Public Speaking',
    description: 'Build confidence for presentations, speeches, and group discussions.',
    difficulty: 'Intermediate',
    difficultyColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    duration: '20–30 min',
    xp: 100,
    href: '/speaking-studio/public-speaking',
    gradient: 'from-violet-600/20 to-purple-600/10',
    border: 'hover:border-violet-500/30',
    iconBg: 'bg-violet-500/15 border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    id: 'interview',
    emoji: '💼',
    title: 'Interview Practice',
    description: 'Prepare for job interviews with common HR and technical questions in English.',
    difficulty: 'Advanced',
    difficultyColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    duration: '20–25 min',
    xp: 120,
    href: '/speaking-studio/interview',
    gradient: 'from-amber-600/20 to-orange-600/10',
    border: 'hover:border-amber-500/30',
    iconBg: 'bg-amber-500/15 border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    id: 'debate',
    emoji: '⚖️',
    title: 'Debate Practice',
    description: 'Argue for and against topics — improve logical expression and vocabulary.',
    difficulty: 'Advanced',
    difficultyColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    duration: '25–35 min',
    xp: 150,
    href: '/speaking-studio/debate',
    gradient: 'from-red-600/20 to-rose-600/10',
    border: 'hover:border-red-500/30',
    iconBg: 'bg-red-500/15 border-red-500/20',
    iconColor: 'text-red-400',
  },
  {
    id: 'tongue-twisters',
    emoji: '👅',
    title: 'Tongue Twisters',
    description: 'Fun and challenging tongue twisters to improve articulation and speed.',
    difficulty: 'Beginner',
    difficultyColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    duration: '5–10 min',
    xp: 30,
    href: '/speaking-studio/tongue-twisters',
    gradient: 'from-pink-600/20 to-rose-600/10',
    border: 'hover:border-pink-500/30',
    iconBg: 'bg-pink-500/15 border-pink-500/20',
    iconColor: 'text-pink-400',
  },
];

// ── 75 Days Speaking Challenges ───────────────────────────────
const DAILY_SPEAKING_CHALLENGES = [
  { day: 1,  topic: 'Introduce yourself in 5 sentences.',                         hint: 'Name, place, work/study, hobby, goal' },
  { day: 2,  topic: 'Describe your morning routine in English.',                   hint: 'Use present simple tense' },
  { day: 3,  topic: 'Talk about your family — 3 members, 5 sentences each.',       hint: 'Relationship, appearance, personality' },
  { day: 4,  topic: 'Describe your favourite food and how to make it.',            hint: 'Use first, then, finally' },
  { day: 5,  topic: 'Talk about your city or town for 1 minute.',                  hint: 'Location, famous for, population' },
  { day: 6,  topic: 'Roleplay: Order food at a restaurant.',                       hint: 'Waiter/Customer conversation' },
  { day: 7,  topic: 'Describe your best friend — personality and memories.',       hint: 'Adjectives: kind, funny, supportive' },
  { day: 8,  topic: 'Talk about a recent movie or show you watched.',              hint: 'Plot, characters, your opinion' },
  { day: 9,  topic: 'Roleplay: Ask for directions to the train station.',          hint: 'Turn left, straight ahead, next to' },
  { day: 10, topic: 'Speak about your career goals for 1 minute.',                 hint: 'I want to become, I plan to, In 5 years' },
  { day: 11, topic: 'Describe a memorable trip or holiday.',                       hint: 'Where, when, with whom, highlight' },
  { day: 12, topic: 'Roleplay: Call a doctor to book an appointment.',             hint: 'Symptoms, availability, confirmation' },
  { day: 13, topic: 'Talk about your hobbies and why you enjoy them.',             hint: 'I enjoy… because it helps me…' },
  { day: 14, topic: 'Describe your dream house.',                                  hint: 'Location, rooms, features' },
  { day: 15, topic: 'Roleplay: Job interview — tell me about yourself.',           hint: 'Background, skills, achievements' },
  { day: 16, topic: 'Speak about a challenge you overcame.',                       hint: 'Problem, action taken, result' },
  { day: 17, topic: 'Describe your school or college days.',                       hint: 'Subjects, teachers, memories' },
  { day: 18, topic: 'Roleplay: Return a defective product at a shop.',             hint: 'Problem, receipt, replacement' },
  { day: 19, topic: 'Talk about the importance of learning English.',              hint: 'Career, communication, confidence' },
  { day: 20, topic: 'Describe a person you admire most.',                          hint: 'Who, why, what you learned from them' },
  { day: 21, topic: 'Roleplay: Negotiate a salary in a job offer.',                hint: 'Current offer, expectation, justify' },
  { day: 22, topic: 'Speak about technology\'s impact on daily life.',             hint: 'Positive and negative sides' },
  { day: 23, topic: 'Describe your favourite book and its lesson.',                hint: 'Summary, character, takeaway' },
  { day: 24, topic: 'Roleplay: Welcome a guest to your city.',                     hint: 'Attractions, food, transport' },
  { day: 25, topic: 'Talk about environmental problems and solutions.',            hint: 'Pollution, recycling, renewable energy' },
  { day: 26, topic: 'Speak about a skill you want to learn and why.',             hint: 'Skill, reason, plan' },
  { day: 27, topic: 'Roleplay: Complain politely about a hotel room.',             hint: 'Issue, what you expect, polite tone' },
  { day: 28, topic: 'Describe a festival you celebrate.',                          hint: 'Tradition, food, activities' },
  { day: 29, topic: 'Talk about social media — pros and cons.',                   hint: 'Connection, addiction, misinformation' },
  { day: 30, topic: 'Give a 2-minute speech: "My Life So Far".',                  hint: 'Childhood, education, present' },
  { day: 31, topic: 'Roleplay: Explain a product to a customer.',                  hint: 'Features, benefits, price' },
  { day: 32, topic: 'Debate: Is online education better than classroom?',         hint: 'Both sides, then your view' },
  { day: 33, topic: 'Describe your ideal weekend.',                                hint: 'Activities, with whom, why' },
  { day: 34, topic: 'Roleplay: A customer service call for internet issue.',       hint: 'Problem description, technical steps' },
  { day: 35, topic: 'Talk about the importance of health and fitness.',           hint: 'Diet, exercise, mental health' },
  { day: 36, topic: 'Speak about a news story from this week.',                   hint: 'What happened, where, your opinion' },
  { day: 37, topic: 'Roleplay: Present a project to your manager.',               hint: 'Objective, progress, next steps' },
  { day: 38, topic: 'Describe a tradition unique to your culture.',               hint: 'History, how it\'s done, meaning' },
  { day: 39, topic: 'Talk about your biggest strength and weakness.',             hint: 'Be honest, give examples' },
  { day: 40, topic: 'Roleplay: Discuss a raise with your boss.',                  hint: 'Achievements, market rate, ask confidently' },
  { day: 41, topic: 'Speak about climate change — causes and effects.',           hint: 'Science, human impact, solutions' },
  { day: 42, topic: 'Describe a problem in your neighbourhood.',                  hint: 'What, impact, possible solutions' },
  { day: 43, topic: 'Roleplay: Give a tour of your home.',                        hint: 'Each room, furniture, favourite spot' },
  { day: 44, topic: 'Talk about your reading habits.',                            hint: 'Genre, frequency, favourite author' },
  { day: 45, topic: 'Debate: Should mobile phones be banned in schools?',        hint: 'Both sides, conclusion' },
  { day: 46, topic: 'Speak about a time you helped someone.',                    hint: 'Situation, what you did, outcome' },
  { day: 47, topic: 'Roleplay: Medical emergency — call an ambulance.',           hint: 'Location, situation, follow instructions' },
  { day: 48, topic: 'Describe your study or work routine.',                       hint: 'Time management, tools, breaks' },
  { day: 49, topic: 'Talk about the future of AI and jobs.',                      hint: 'Automation, new skills, opportunity' },
  { day: 50, topic: 'Give a motivational speech: "Why I Will Succeed".',         hint: 'Goals, obstacles, determination' },
  { day: 51, topic: 'Roleplay: Book a flight over the phone.',                    hint: 'Destination, dates, seat preference' },
  { day: 52, topic: 'Speak about gender equality in the workplace.',             hint: 'Equal pay, opportunities, examples' },
  { day: 53, topic: 'Describe your city\'s public transport system.',            hint: 'Bus, metro, convenience, problems' },
  { day: 54, topic: 'Talk about a sport you play or follow.',                    hint: 'Rules, teams, why you like it' },
  { day: 55, topic: 'Roleplay: Resolve a conflict between two coworkers.',       hint: 'Listen, mediate, find solution' },
  { day: 56, topic: 'Speak about the role of teachers in society.',             hint: 'Influence, challenges, respect' },
  { day: 57, topic: 'Describe a technology gadget you use every day.',          hint: 'What it does, how it helps' },
  { day: 58, topic: 'Roleplay: Attend a parent-teacher meeting.',               hint: 'Child\'s progress, concerns, plan' },
  { day: 59, topic: 'Talk about water conservation.',                           hint: 'Problem, daily habits, solutions' },
  { day: 60, topic: 'Give a speech: "India in 2047 — My Vision".',              hint: 'Development, education, technology' },
  { day: 61, topic: 'Roleplay: Negotiate a house rent.',                        hint: 'Current price, offer, agreement' },
  { day: 62, topic: 'Speak about work-life balance.',                           hint: 'Stress, boundaries, self-care' },
  { day: 63, topic: 'Describe a turning point in your life.',                   hint: 'Before, what changed, after' },
  { day: 64, topic: 'Roleplay: Order groceries in an English-speaking country.',hint: 'Items, quantity, payment' },
  { day: 65, topic: 'Debate: Is social media harming youth?',                  hint: 'Mental health, positives, negatives' },
  { day: 66, topic: 'Talk about traditional vs. modern lifestyles.',           hint: 'Family, food, values, technology' },
  { day: 67, topic: 'Roleplay: Explain a technical concept to a non-expert.', hint: 'Simple language, analogy, examples' },
  { day: 68, topic: 'Speak about the power of positive thinking.',            hint: 'Mindset, examples, how to practise' },
  { day: 69, topic: 'Describe your 5-year plan professionally.',              hint: 'Skills, role, milestones' },
  { day: 70, topic: 'Roleplay: Conduct a team meeting as a team lead.',       hint: 'Agenda, updates, action items' },
  { day: 71, topic: 'Talk about the importance of financial literacy.',       hint: 'Savings, investment, budgeting' },
  { day: 72, topic: 'Describe a national hero and their contribution.',       hint: 'Who, what they did, legacy' },
  { day: 73, topic: 'Roleplay: Pitch a business idea to investors.',          hint: 'Problem, solution, market, ask' },
  { day: 74, topic: 'Speak about digital safety and cybersecurity.',         hint: 'Threats, precautions, best practices' },
  { day: 75, topic: '75-Day Reflection: What have you learned? Give a 3-minute speech.', hint: 'Journey, struggles, achievements, future' },
];

// ── Pronunciation Tips ─────────────────────────────────────────
const PRONUNCIATION_TIPS = [
  { icon: '👄', tip: 'Open your mouth wide for "A" sounds — Hindi mein hum mouth kam kholte hain, English mein zyada kholna padta hai.' },
  { icon: '🦷', tip: 'For "V" sound — upper teeth ko lower lip pe rako aur air push karo. "W" se bilkul alag hai.' },
  { icon: '👅', tip: '"TH" sound ke liye tongue ko teeth ke beech rako. "D" ya "T" mat bolo.' },
  { icon: '🎵', tip: 'Word stress practice: reMEMber (not REMember). Wrong stress = confusing meaning.' },
  { icon: '⏱️', tip: 'English connected speech mein words merge hote hain: "did you" → "didja". Slowly phir naturally suno.' },
];

// ── Recent Activity ───────────────────────────────────────────
const RECENT_ACTIVITY = [
  { type: 'Pronunciation', topic: 'Short vowel sounds /ɪ/ and /iː/', time: '2 hours ago', xp: 50, icon: '🔤' },
  { type: 'Tongue Twister', topic: 'She sells seashells by the seashore', time: 'Yesterday', xp: 30, icon: '👅' },
  { type: 'Roleplay', topic: 'At the Bank — Opening an Account', time: '2 days ago', xp: 75, icon: '🎭' },
];

// ── Container animation variants ─────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── Helper: Get today's challenge ────────────────────────────
function getTodayChallenge() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 86400000
  );
  const index = (dayOfYear - 1) % 75;
  return DAILY_SPEAKING_CHALLENGES[index] || DAILY_SPEAKING_CHALLENGES[0];
}

// ── Main Component ────────────────────────────────────────────
export default function SpeakingStudioPage() {
  const [completedChallenge, setCompletedChallenge] = useState(false);
  const [activeSection, setActiveSection] = useState('modes');

  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  const { xp, streak, level } = useUserStore();

  const todayChallenge = getTodayChallenge();

  return (
    <div className="space-y-8">

      {/* ── Hero Header ──────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-rose-600/20 via-pink-600/15 to-purple-600/10 border border-white/10"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/25 shrink-0"
            >
              <Mic size={26} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">Speaking Studio</h1>
              <p className="text-sm text-rose-300 font-medium mt-0.5">Your voice, your confidence</p>
              <p className="text-slate-400 text-sm mt-1.5 max-w-xl leading-relaxed">
                Practice real conversations, master pronunciation, and build confidence to speak English fluently in any situation.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-3 shrink-0">
            {[
              { label: 'Streak', value: streak || 0, icon: Flame, color: 'text-orange-400' },
              { label: 'Level', value: level || 1, icon: TrendingUp, color: 'text-violet-400' },
              { label: 'XP', value: xp || 0, icon: Zap, color: 'text-amber-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center bg-white/5 rounded-xl px-3 py-2.5 border border-white/8">
                <Icon size={14} className={`${color} mx-auto mb-1`} />
                <p className={`text-lg font-black ${color}`}>{value}</p>
                <p className="text-[10px] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Daily Speaking Challenge ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="card p-5 border border-amber-500/20 bg-gradient-to-br from-amber-500/8 to-orange-500/5"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Calendar size={18} className="text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Daily Speaking Challenge</span>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/20 font-bold">+80 XP</span>
            </div>
            <p className="font-bold text-white text-base leading-snug">{todayChallenge.topic}</p>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
              <span className="text-amber-500">💡</span> Hint: {todayChallenge.hint}
            </p>
          </div>
          <button
            onClick={() => setCompletedChallenge(v => !v)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              completedChallenge
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                : 'bg-amber-500/15 text-amber-300 border border-amber-500/25 hover:bg-amber-500/25'
            }`}
          >
            {completedChallenge ? (
              <><CheckCircle2 size={14} /> Done!</>
            ) : (
              <><Mic size={14} /> Start</>
            )}
          </button>
        </div>
      </motion.div>

      {/* ── Section Nav ──────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'modes',    label: 'Practice Modes',    icon: Mic       },
          { id: 'tips',     label: 'Pronunciation Tips', icon: Volume2   },
          { id: 'activity', label: 'Recent Activity',    icon: BarChart2 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeSection === id
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Practice Modes Grid ───────────────────────────── */}
        {activeSection === 'modes' && (
          <motion.div
            key="modes"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {PRACTICE_MODES.map((mode) => (
              <motion.div
                key={mode.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className={`card p-5 group hover:border-white/15 ${mode.border} transition-all relative overflow-hidden cursor-pointer`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${mode.iconBg} border flex items-center justify-center text-2xl`}>
                      {mode.emoji}
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-1 rounded-lg border ${mode.difficultyColor}`}>
                      {mode.difficulty}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-rose-200 transition-colors">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {mode.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {mode.duration}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Zap size={11} /> +{mode.xp} XP
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={mode.href}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold hover:bg-rose-500/15 hover:text-rose-300 hover:border-rose-500/25 transition-all"
                  >
                    Start Practice <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Pronunciation Tips ────────────────────────────── */}
        {activeSection === 'tips' && (
          <motion.div
            key="tips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* IPA chart teaser */}
            <div className="card p-5 border border-rose-500/20 bg-rose-500/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <span>🔤</span> IPA Pronunciation Guide
                </h3>
                <Link href="/speaking-studio/pronunciation" className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1">
                  Full Guide <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {['/iː/', '/ɪ/', '/e/', '/æ/', '/ɑː/', '/ɒ/', '/ʌ/', '/uː/'].map((sound) => (
                  <div key={sound} className="text-center bg-white/5 rounded-lg p-2 border border-white/8">
                    <p className="text-sm font-bold text-rose-300">{sound}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Click "Full Guide" to practise all 44 English phonemes with examples</p>
            </div>

            {/* Tips */}
            {PRONUNCIATION_TIPS.map(({ icon, tip }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="card p-5 flex items-start gap-4"
              >
                <span className="text-2xl shrink-0">{icon}</span>
                <p className="text-sm text-slate-400 leading-relaxed">{tip}</p>
              </motion.div>
            ))}

            {/* Common mistakes */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <span>⚠️</span> Common Mistakes by Hindi Speakers
              </h3>
              <div className="space-y-3">
                {[
                  { wrong: '"W" sound as "V"', right: 'water → "waa-ter" (not "vaa-ter")', fix: 'Round your lips like blowing a kiss' },
                  { wrong: 'Adding "a" at end', right: '"speak" not "speaka", "work" not "worka"', fix: 'Stop cleanly — no schwa sound at end' },
                  { wrong: '"TH" as "D" or "T"', right: '"the" not "de", "think" not "tink"', fix: 'Tongue between teeth' },
                  { wrong: 'No word stress', right: 'imPORtant (not IMportant)', fix: 'One syllable per word is stressed — practice it' },
                ].map(({ wrong, right, fix }) => (
                  <div key={wrong} className="p-3 rounded-xl bg-white/3 border border-white/8">
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 text-xs font-bold mt-0.5 shrink-0">✗</span>
                      <div>
                        <p className="text-xs font-semibold text-red-300 mb-0.5">{wrong}</p>
                        <p className="text-xs text-emerald-300 mb-0.5">✓ {right}</p>
                        <p className="text-xs text-slate-500">Fix: {fix}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Recent Activity ───────────────────────────────── */}
        {activeSection === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Progress Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Mic,          label: 'Sessions',      value: '12',  color: 'text-rose-400',   bg: 'bg-rose-500/10'   },
                { icon: MessageSquare,label: 'Words Spoken',  value: '840', color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
                { icon: Flame,        label: 'Day Streak',    value: streak || 0, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                { icon: Trophy,       label: 'Badges Earned', value: '3',   color: 'text-amber-400',  bg: 'bg-amber-500/10'  },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className="card p-4">
                  <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-2`}>
                    <Icon size={16} className={color} />
                  </div>
                  <p className={`text-xl font-black ${color}`}>{value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Activity List */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <BarChart2 size={16} className="text-rose-400" /> Recent Sessions
              </h3>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/8"
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.topic}</p>
                      <p className="text-xs text-slate-500">{item.type} • {item.time}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400 shrink-0">+{item.xp} XP</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-rose-400" /> This Week
              </h3>
              <div className="flex items-end gap-2 h-20">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const heights = [60, 80, 40, 100, 70, 0, 0];
                  const pct = heights[i];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-md bg-white/5 relative" style={{ height: '64px' }}>
                        {pct > 0 && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${pct}%` }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-rose-600 to-pink-400"
                          />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-600">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Bottom CTA: Sub-sections ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {
            icon: '🔤', title: 'Pronunciation Guide',
            desc: '44 English phonemes with IPA',
            href: '/speaking-studio/pronunciation',
            badge: 'New',
          },
          {
            icon: '📋', title: 'All 75 Challenges',
            desc: 'Speaking topics for every day',
            href: '/speaking-studio/challenges',
            badge: null,
          },
          {
            icon: '🏆', title: 'Speaking Leaderboard',
            desc: 'Compare with other learners',
            href: '/leaderboard',
            badge: null,
          },
        ].map(({ icon, title, desc, href, badge }) => (
          <Link
            key={title}
            href={href}
            className="card p-4 hover:border-white/15 group flex items-center gap-3 transition-all"
          >
            <span className="text-2xl shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-white text-sm">{title}</p>
                {badge && (
                  <span className="text-[10px] bg-rose-500/15 text-rose-300 px-1.5 py-0.5 rounded-md font-bold border border-rose-500/20">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <ArrowRight size={14} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
          </Link>
        ))}
      </motion.div>

    </div>
  );
}
