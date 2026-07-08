'use client';
// Writing Hub — Complete writing practice hub
// Application, Letter, Email, Essay, Paragraph, Story, Notice, Report writing

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  PenTool, FileText, Mail, BookOpen, AlignLeft, Star,
  Zap, Clock, ChevronRight, ArrowRight, Calendar, Flame,
  TrendingUp, CheckCircle2, Award, BarChart2, Target,
  Trophy, MessageSquare, Layout,
} from 'lucide-react';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ── Writing Types ─────────────────────────────────────────────
const WRITING_TYPES = [
  {
    id: 'application',
    emoji: '📋',
    title: 'Application Writing',
    description: 'Write formal job applications, leave applications, and official requests with proper format.',
    difficulty: 'Intermediate',
    difficultyColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    wordGoal: 150,
    xp: 80,
    href: '/writing-hub/application',
    gradient: 'from-blue-600/20 to-indigo-600/10',
    border: 'hover:border-blue-500/30',
    iconBg: 'bg-blue-500/15 border-blue-500/20',
  },
  {
    id: 'letter',
    emoji: '✉️',
    title: 'Letter Writing',
    description: 'Formal and informal letters — complaints, invitations, requests, and personal correspondence.',
    difficulty: 'Beginner',
    difficultyColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    wordGoal: 120,
    xp: 60,
    href: '/writing-hub/letter',
    gradient: 'from-emerald-600/20 to-teal-600/10',
    border: 'hover:border-emerald-500/30',
    iconBg: 'bg-emerald-500/15 border-emerald-500/20',
  },
  {
    id: 'email',
    emoji: '📧',
    title: 'Email Writing',
    description: 'Professional emails for workplace — requests, follow-ups, apologies, and announcements.',
    difficulty: 'Intermediate',
    difficultyColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    wordGoal: 100,
    xp: 70,
    href: '/writing-hub/email',
    gradient: 'from-sky-600/20 to-blue-600/10',
    border: 'hover:border-sky-500/30',
    iconBg: 'bg-sky-500/15 border-sky-500/20',
  },
  {
    id: 'essay',
    emoji: '📝',
    title: 'Essay Writing',
    description: 'Structured essays — argumentative, descriptive, narrative, and expository with thesis and conclusion.',
    difficulty: 'Advanced',
    difficultyColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    wordGoal: 350,
    xp: 150,
    href: '/writing-hub/essay',
    gradient: 'from-violet-600/20 to-purple-600/10',
    border: 'hover:border-violet-500/30',
    iconBg: 'bg-violet-500/15 border-violet-500/20',
  },
  {
    id: 'paragraph',
    emoji: '📄',
    title: 'Paragraph Writing',
    description: 'Write focused paragraphs with a clear topic sentence, supporting details, and conclusion.',
    difficulty: 'Beginner',
    difficultyColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    wordGoal: 80,
    xp: 50,
    href: '/writing-hub/paragraph',
    gradient: 'from-teal-600/20 to-cyan-600/10',
    border: 'hover:border-teal-500/30',
    iconBg: 'bg-teal-500/15 border-teal-500/20',
  },
  {
    id: 'story',
    emoji: '📖',
    title: 'Story Writing',
    description: 'Creative short stories with characters, plot, conflict, and resolution — expand your vocabulary.',
    difficulty: 'Intermediate',
    difficultyColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    wordGoal: 250,
    xp: 100,
    href: '/writing-hub/story',
    gradient: 'from-amber-600/20 to-orange-600/10',
    border: 'hover:border-amber-500/30',
    iconBg: 'bg-amber-500/15 border-amber-500/20',
  },
  {
    id: 'notice',
    emoji: '📌',
    title: 'Notice Writing',
    description: 'Official school/office notices with proper format — heading, date, body, and signature.',
    difficulty: 'Beginner',
    difficultyColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    wordGoal: 80,
    xp: 45,
    href: '/writing-hub/notice',
    gradient: 'from-pink-600/20 to-rose-600/10',
    border: 'hover:border-pink-500/30',
    iconBg: 'bg-pink-500/15 border-pink-500/20',
  },
  {
    id: 'report',
    emoji: '📊',
    title: 'Report Writing',
    description: 'Business and academic reports — executive summary, findings, analysis, and recommendations.',
    difficulty: 'Advanced',
    difficultyColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    wordGoal: 400,
    xp: 160,
    href: '/writing-hub/report',
    gradient: 'from-red-600/20 to-rose-600/10',
    border: 'hover:border-red-500/30',
    iconBg: 'bg-red-500/15 border-red-500/20',
  },
];

// ── 75-Day Writing Challenges ─────────────────────────────────
const DAILY_WRITING_CHALLENGES = [
  { day: 1,  type: 'Paragraph',    topic: 'Write a paragraph about your daily routine.',                 words: 80  },
  { day: 2,  type: 'Email',        topic: 'Write an email to your manager requesting a day off.',        words: 100 },
  { day: 3,  type: 'Letter',       topic: 'Write an informal letter to a friend about your new job.',   words: 120 },
  { day: 4,  type: 'Paragraph',    topic: 'Describe your hometown in one paragraph.',                    words: 80  },
  { day: 5,  type: 'Application',  topic: 'Write a leave application to your school principal.',        words: 150 },
  { day: 6,  type: 'Essay',        topic: 'Write a short essay: "The Importance of Education".',        words: 200 },
  { day: 7,  type: 'Story',        topic: 'Write a short story starting with: "It was a dark night…"', words: 200 },
  { day: 8,  type: 'Notice',       topic: 'Write a notice for your school about an Annual Sports Day.', words: 80  },
  { day: 9,  type: 'Email',        topic: 'Write a follow-up email after a job interview.',             words: 100 },
  { day: 10, type: 'Report',       topic: 'Write a short report on the cleanliness of your colony.',   words: 250 },
  { day: 11, type: 'Letter',       topic: 'Write a complaint letter to a company about a product.',    words: 150 },
  { day: 12, type: 'Paragraph',    topic: 'Write a paragraph: "My Favourite Season".',                  words: 80  },
  { day: 13, type: 'Essay',        topic: 'Essay: "Advantages and Disadvantages of Social Media".',     words: 250 },
  { day: 14, type: 'Application',  topic: 'Write a job application for the post of content writer.',   words: 200 },
  { day: 15, type: 'Story',        topic: 'Write a story about a lost child who found courage.',        words: 220 },
  { day: 16, type: 'Email',        topic: 'Email to team members announcing a project deadline change.',words: 120 },
  { day: 17, type: 'Notice',       topic: 'Notice for a missing pet — describe the animal.',           words: 80  },
  { day: 18, type: 'Letter',       topic: 'Letter to editor: express your view on plastic bans.',      words: 180 },
  { day: 19, type: 'Report',       topic: 'Report on a cultural event held at your college.',          words: 280 },
  { day: 20, type: 'Essay',        topic: 'Essay: "The Role of Technology in Modern Education".',       words: 300 },
  { day: 21, type: 'Paragraph',    topic: 'Describe a person you admire in one paragraph.',             words: 100 },
  { day: 22, type: 'Application',  topic: 'Apply for a scholarship — state your achievements.',        words: 200 },
  { day: 23, type: 'Email',        topic: 'Email your professor requesting an extension on assignment.',words: 120 },
  { day: 24, type: 'Story',        topic: 'Write a story: "The Honest Shopkeeper".',                   words: 250 },
  { day: 25, type: 'Letter',       topic: 'Formal letter requesting improved road conditions.',         words: 160 },
  { day: 26, type: 'Notice',       topic: 'Office notice for a mandatory fire safety drill.',           words: 90  },
  { day: 27, type: 'Essay',        topic: 'Essay: "Climate Change — Our Responsibility".',             words: 300 },
  { day: 28, type: 'Report',       topic: 'Report on a road accident witnessed in your area.',         words: 250 },
  { day: 29, type: 'Paragraph',    topic: 'Write about the importance of reading books.',               words: 100 },
  { day: 30, type: 'Application',  topic: 'Application for a bank loan — state the purpose clearly.',  words: 180 },
  { day: 31, type: 'Email',        topic: 'Cold email to a company expressing interest in internship.', words: 150 },
  { day: 32, type: 'Story',        topic: 'Story with moral: "Slow and Steady Wins the Race".',        words: 250 },
  { day: 33, type: 'Letter',       topic: 'Letter to your younger sibling — advice on career choice.', words: 180 },
  { day: 34, type: 'Essay',        topic: 'Essay: "Should Voting be Made Compulsory?".',               words: 300 },
  { day: 35, type: 'Notice',       topic: 'Notice about a colony meeting to discuss water shortage.',  words: 90  },
  { day: 36, type: 'Report',       topic: 'Report on air quality in your city for a newspaper.',       words: 300 },
  { day: 37, type: 'Paragraph',    topic: 'Write about your most memorable school trip.',               words: 100 },
  { day: 38, type: 'Application',  topic: 'Apply for transfer to another branch — justify the reason.',words: 180 },
  { day: 39, type: 'Email',        topic: 'Email to HR about incorrect salary credit this month.',     words: 130 },
  { day: 40, type: 'Story',        topic: 'Write a story set in 2050 — a world without electricity.',  words: 300 },
  { day: 41, type: 'Essay',        topic: 'Essay: "The Importance of Mental Health Awareness".',       words: 320 },
  { day: 42, type: 'Letter',       topic: 'Appreciation letter to a teacher who changed your life.',   words: 160 },
  { day: 43, type: 'Report',       topic: 'Business report: recommend whether to expand operations.',  words: 350 },
  { day: 44, type: 'Notice',       topic: 'Notice for Society Annual General Meeting.',                 words: 90  },
  { day: 45, type: 'Paragraph',    topic: 'Paragraph: "Technology — A Boon or Bane?".',                words: 100 },
  { day: 46, type: 'Application',  topic: 'Application requesting medical leave for surgery.',         words: 150 },
  { day: 47, type: 'Email',        topic: 'Email apologising for missing an important client meeting.',words: 130 },
  { day: 48, type: 'Story',        topic: 'Story: A boy who discovered a secret door in the library.', words: 280 },
  { day: 49, type: 'Essay',        topic: 'Essay: "Online Work from Home — Future of Jobs?".',         words: 300 },
  { day: 50, type: 'Letter',       topic: 'Write a letter to your future self — 10 years from now.',   words: 200 },
  { day: 51, type: 'Report',       topic: 'Report on performance of your team in Q1.',                 words: 300 },
  { day: 52, type: 'Notice',       topic: 'Hostel notice about new visiting hours policy.',             words: 80  },
  { day: 53, type: 'Paragraph',    topic: 'Paragraph on an Indian festival you celebrate.',             words: 100 },
  { day: 54, type: 'Application',  topic: 'Apply for a work-from-home arrangement — state reasons.',  words: 180 },
  { day: 55, type: 'Email',        topic: 'Email requesting a vendor to replace defective goods.',     words: 140 },
  { day: 56, type: 'Essay',        topic: 'Essay: "Gender Equality in India — Progress and Gaps".',    words: 350 },
  { day: 57, type: 'Story',        topic: 'Write a mystery story in exactly 300 words.',               words: 300 },
  { day: 58, type: 'Letter',       topic: 'Complaint letter to municipality about open drainage.',     words: 160 },
  { day: 59, type: 'Report',       topic: 'Report on the usage of smartphones among teenagers.',       words: 300 },
  { day: 60, type: 'Notice',       topic: 'Notice for a blood donation camp in your office.',          words: 90  },
  { day: 61, type: 'Paragraph',    topic: 'Paragraph: Describe your ideal workplace environment.',     words: 100 },
  { day: 62, type: 'Application',  topic: 'Application for a NOC from your previous employer.',        words: 150 },
  { day: 63, type: 'Email',        topic: 'Email to client sharing project progress update.',           words: 150 },
  { day: 64, type: 'Essay',        topic: 'Essay: "The Role of Youth in Nation Building".',            words: 320 },
  { day: 65, type: 'Story',        topic: 'Story: An unexpected friendship between rivals.',            words: 280 },
  { day: 66, type: 'Letter',       topic: 'Letter to your parents explaining your career decision.',   words: 200 },
  { day: 67, type: 'Report',       topic: 'Report on a workshop on digital literacy in your school.',  words: 280 },
  { day: 68, type: 'Notice',       topic: 'Notice cancelling an event due to bad weather.',            words: 80  },
  { day: 69, type: 'Paragraph',    topic: 'Write about a time you failed and what you learned.',       words: 120 },
  { day: 70, type: 'Application',  topic: 'Application for a salary increment — justify with facts.',  words: 200 },
  { day: 71, type: 'Email',        topic: 'Introduction email to a new team as a new joiner.',         words: 150 },
  { day: 72, type: 'Essay',        topic: 'Essay: "Artificial Intelligence — Threat or Opportunity?".',words: 350 },
  { day: 73, type: 'Story',        topic: 'Write a story that ends with: "…and that changed everything."',words: 300 },
  { day: 74, type: 'Letter',       topic: 'Write a thank-you letter to your mentor.',                  words: 160 },
  { day: 75, type: 'Essay',        topic: '75-Day Reflection Essay: "My English Journey — What I Learned, What Changed".',words: 400 },
];

// ── Writing Tips ──────────────────────────────────────────────
const WRITING_TIPS = [
  { icon: '✅', title: 'Plan Before You Write', tip: 'Always spend 2 minutes planning. Write key points first — introduction, body, conclusion. यह आपको off-track जाने से बचाता है।' },
  { icon: '📏', title: 'One Idea Per Paragraph', tip: 'Har paragraph mein ek hi main idea हो — topic sentence + 2-3 supporting sentences + concluding line.' },
  { icon: '🔗', title: 'Use Connectors', tip: 'Therefore, However, Furthermore, In addition, On the other hand — ये words आपकी writing को flow देते हैं।' },
  { icon: '🔄', title: 'Always Revise', tip: 'Write करने के बाद 5 minutes revise ज़रूर करो — spelling, grammar, tense consistency check करो।' },
];

// ── Common Grammar Mistakes ───────────────────────────────────
const GRAMMAR_MISTAKES = [
  { mistake: 'I am having a doubt', correct: 'I have a doubt', rule: '"Have" not "am having" for permanent states' },
  { mistake: 'She is knowing English', correct: 'She knows English', rule: 'Stative verbs (know, understand, believe) don\'t use -ing form' },
  { mistake: 'We discussed about it', correct: 'We discussed it', rule: '"Discuss" is transitive — no "about" needed' },
  { mistake: 'Please revert back', correct: 'Please revert / Please reply', rule: '"Revert" already means to go back — don\'t say "revert back"' },
  { mistake: 'I am not understanding', correct: 'I don\'t understand', rule: 'Use simple present for mental states' },
];

// ── Writing Templates ─────────────────────────────────────────
const TEMPLATES = [
  {
    type: 'Formal Email',
    emoji: '📧',
    preview: `Subject: [Purpose of Email]

Dear [Name/Sir/Ma'am],

I am writing to [state purpose]. [Background/context in 1-2 lines.]

[Main body — details, request, or information.]

I would appreciate your [response/approval/assistance] at the earliest.

Thanking you,
Yours sincerely,
[Your Name]`,
    color: 'border-sky-500/20 bg-sky-500/5',
  },
  {
    type: 'Leave Application',
    emoji: '📋',
    preview: `To,
The [Principal/Manager],
[School/Company Name]

Subject: Application for Leave

Respected Sir/Ma'am,

I am [Name], [Class/Designation]. I request you to kindly grant me leave for [number] days from [date] to [date] as I am [reason].

I assure you that I will complete all pending work upon my return.

Thanking you,
Yours obediently/faithfully,
[Your Name]`,
    color: 'border-blue-500/20 bg-blue-500/5',
  },
  {
    type: 'Essay Structure',
    emoji: '📝',
    preview: `Introduction (10%):
Hook → Background → Thesis statement

Body Paragraph 1 (30%):
Topic sentence → Point 1 → Example → Explanation

Body Paragraph 2 (30%):
Topic sentence → Point 2 → Example → Explanation

Body Paragraph 3 (20%):
Counter-argument → Rebuttal → Your stand

Conclusion (10%):
Restate thesis → Summary → Call to action / Final thought`,
    color: 'border-violet-500/20 bg-violet-500/5',
  },
  {
    type: 'Notice Format',
    emoji: '📌',
    preview: `[SCHOOL/ORGANISATION NAME]
NOTICE

Date: [DD/MM/YYYY]

[HEADING IN CAPITAL LETTERS]

This is to inform all [students/staff/residents] that [main content of notice — event, change, information].

[Additional details — venue, time, requirements.]

[Name]
[Designation]`,
    color: 'border-pink-500/20 bg-pink-500/5',
  },
];

// ── Animation Variants ────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── Get Today's Writing Challenge ─────────────────────────────
function getTodayWritingChallenge() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 86400000
  );
  const index = (dayOfYear - 1) % 75;
  return DAILY_WRITING_CHALLENGES[index] || DAILY_WRITING_CHALLENGES[0];
}

// ── Difficulty badge colors ───────────────────────────────────
const TYPE_COLORS = {
  Paragraph:   'text-teal-300 bg-teal-500/10',
  Email:       'text-sky-300 bg-sky-500/10',
  Letter:      'text-emerald-300 bg-emerald-500/10',
  Application: 'text-blue-300 bg-blue-500/10',
  Essay:       'text-violet-300 bg-violet-500/10',
  Story:       'text-amber-300 bg-amber-500/10',
  Notice:      'text-pink-300 bg-pink-500/10',
  Report:      'text-red-300 bg-red-500/10',
};

// ── Main Component ────────────────────────────────────────────
export default function WritingHubPage() {
  const [activeSection, setActiveSection] = useState('types');
  const [completedChallenge, setCompletedChallenge] = useState(false);
  const [expandedTemplate, setExpandedTemplate] = useState(null);

  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  const { xp, streak, level } = useUserStore();

  const todayChallenge = getTodayWritingChallenge();
  const typeBadge = TYPE_COLORS[todayChallenge.type] || 'text-slate-300 bg-white/10';

  return (
    <div className="space-y-8">

      {/* ── Hero Header ──────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-violet-600/20 via-indigo-600/15 to-blue-600/10 border border-white/10"
      >
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-52 h-52 bg-indigo-500/5 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ scale: [1, 1.07, 1], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25 shrink-0"
            >
              <PenTool size={26} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">Writing Hub</h1>
              <p className="text-sm text-violet-300 font-medium mt-0.5">Express yourself in perfect English</p>
              <p className="text-slate-400 text-sm mt-1.5 max-w-xl leading-relaxed">
                Master every writing format — from formal letters to creative stories. Build grammar confidence and write with clarity and precision.
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-3 shrink-0">
            {[
              { label: 'Streak', value: streak || 0, icon: Flame, color: 'text-orange-400' },
              { label: 'Level',  value: level || 1,  icon: TrendingUp, color: 'text-violet-400' },
              { label: 'XP',     value: xp || 0,     icon: Zap, color: 'text-amber-400' },
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

      {/* ── Daily Writing Challenge ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="card p-5 border border-violet-500/20 bg-gradient-to-br from-violet-500/8 to-indigo-500/5"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
            <Calendar size={18} className="text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">Daily Writing Challenge</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${typeBadge}`}>
                {todayChallenge.type}
              </span>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/20 font-bold">
                +{Math.round(todayChallenge.words / 2)} XP
              </span>
            </div>
            <p className="font-bold text-white text-base leading-snug">{todayChallenge.topic}</p>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
              <AlignLeft size={12} className="text-violet-500 shrink-0" />
              Target: ~{todayChallenge.words} words
            </p>
          </div>
          <button
            onClick={() => setCompletedChallenge(v => !v)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              completedChallenge
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
                : 'bg-violet-500/15 text-violet-300 border border-violet-500/25 hover:bg-violet-500/25'
            }`}
          >
            {completedChallenge ? (
              <><CheckCircle2 size={14} /> Done!</>
            ) : (
              <><PenTool size={14} /> Write</>
            )}
          </button>
        </div>
      </motion.div>

      {/* ── Section Nav ──────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'types',     label: 'Writing Types',   icon: FileText  },
          { id: 'tips',      label: 'Grammar Tips',    icon: BookOpen  },
          { id: 'templates', label: 'Templates',       icon: Layout    },
          { id: 'stats',     label: 'My Progress',     icon: BarChart2 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeSection === id
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Writing Types Grid ────────────────────────────── */}
        {activeSection === 'types' && (
          <motion.div
            key="types"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {WRITING_TYPES.map((type) => (
              <motion.div
                key={type.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className={`card p-5 group ${type.border} hover:border-white/15 transition-all relative overflow-hidden cursor-pointer`}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                <div className="relative">
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl ${type.iconBg} border flex items-center justify-center text-2xl`}>
                      {type.emoji}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${type.difficultyColor}`}>
                      {type.difficulty}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-white text-sm mb-1.5 group-hover:text-violet-200 transition-colors leading-snug">
                    {type.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-3">
                    {type.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-2 mb-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <AlignLeft size={10} /> ~{type.wordGoal} words
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Zap size={10} /> +{type.xp} XP
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={type.href}
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-white/5 border border-white/8 text-slate-300 text-xs font-semibold hover:bg-violet-500/15 hover:text-violet-300 hover:border-violet-500/25 transition-all"
                  >
                    Start Writing <ChevronRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Grammar Tips ──────────────────────────────────── */}
        {activeSection === 'tips' && (
          <motion.div
            key="tips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Writing tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WRITING_TIPS.map(({ icon, title, tip }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="card p-5 flex items-start gap-4"
                >
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <h3 className="font-bold text-white mb-1">{title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Common Grammar Mistakes */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <span>⚠️</span> Common Grammar Mistakes to Avoid
              </h3>
              <div className="space-y-3">
                {GRAMMAR_MISTAKES.map(({ mistake, correct, rule }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-3 rounded-xl bg-white/3 border border-white/8"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="text-xs text-red-300 flex items-center gap-1.5 mb-1">
                          <span className="font-bold">✗</span> "{mistake}"
                        </p>
                        <p className="text-xs text-emerald-300 flex items-center gap-1.5 mb-1">
                          <span className="font-bold">✓</span> "{correct}"
                        </p>
                        <p className="text-[11px] text-slate-500">📌 {rule}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Useful Connectors */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <span>🔗</span> Useful Connectors & Transitions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Adding Information', words: ['Furthermore', 'In addition', 'Moreover', 'Besides', 'Also'] },
                  { label: 'Contrasting', words: ['However', 'On the other hand', 'Nevertheless', 'Although', 'Despite'] },
                  { label: 'Cause & Effect', words: ['Therefore', 'As a result', 'Consequently', 'Hence', 'Thus'] },
                  { label: 'Concluding', words: ['In conclusion', 'To sum up', 'Finally', 'In summary', 'Overall'] },
                ].map(({ label, words }) => (
                  <div key={label} className="p-3 rounded-xl bg-white/3 border border-white/8">
                    <p className="text-xs font-bold text-violet-300 mb-2">{label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {words.map((w) => (
                        <span key={w} className="text-[11px] bg-violet-500/10 text-violet-300 border border-violet-500/15 px-2 py-0.5 rounded-md">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Templates ─────────────────────────────────────── */}
        {activeSection === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-slate-500">
              Click on a template to expand it. Copy the format and use it for your writing practice.
            </p>
            {TEMPLATES.map((tmpl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`card p-5 border ${tmpl.color} cursor-pointer`}
                onClick={() => setExpandedTemplate(expandedTemplate === i ? null : i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{tmpl.emoji}</span>
                    <h3 className="font-bold text-white">{tmpl.type}</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: expandedTemplate === i ? 90 : 0 }}
                    className="text-slate-500"
                  >
                    <ChevronRight size={16} />
                  </motion.span>
                </div>
                <AnimatePresence>
                  {expandedTemplate === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <pre className="mt-3 p-4 rounded-xl bg-white/5 border border-white/8 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                        {tmpl.preview}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* More templates link */}
            <div className="card p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white text-sm">Need more templates?</p>
                <p className="text-xs text-slate-500">View all 20+ writing formats with examples</p>
              </div>
              <Link
                href="/writing-hub/templates"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/15 text-violet-300 border border-violet-500/25 text-sm font-semibold hover:bg-violet-500/25 transition-all"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── Progress Stats ────────────────────────────────── */}
        {activeSection === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: FileText,     label: 'Essays Written',   value: '8',    color: 'text-violet-400', bg: 'bg-violet-500/10' },
                { icon: AlignLeft,    label: 'Words Typed',      value: '2.4K', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                { icon: Target,       label: 'Accuracy',         value: '87%',  color: 'text-emerald-400',bg: 'bg-emerald-500/10' },
                { icon: Flame,        label: 'Day Streak',       value: streak || 0, color: 'text-orange-400', bg: 'bg-orange-500/10' },
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

            {/* Writing type distribution */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <BarChart2 size={16} className="text-violet-400" /> Writing Type Progress
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Email Writing',       pct: 80, color: 'bg-sky-500'    },
                  { label: 'Paragraph Writing',   pct: 65, color: 'bg-teal-500'   },
                  { label: 'Letter Writing',      pct: 55, color: 'bg-emerald-500'},
                  { label: 'Essay Writing',       pct: 40, color: 'bg-violet-500' },
                  { label: 'Story Writing',       pct: 30, color: 'bg-amber-500'  },
                  { label: 'Application Writing', pct: 20, color: 'bg-blue-500'   },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>{label}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full ${color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent submissions */}
            <div className="card p-5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Award size={16} className="text-violet-400" /> Recent Submissions
              </h3>
              <div className="space-y-3">
                {[
                  { type: 'Email',   topic: 'Leave request to manager',       words: 112, time: 'Today',      xp: 70 },
                  { type: 'Essay',   topic: 'Impact of Social Media on Youth',words: 320, time: 'Yesterday',  xp: 130 },
                  { type: 'Letter',  topic: 'Complaint about road condition',  words: 160, time: '2 days ago', xp: 60 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/8">
                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center shrink-0">
                      <PenTool size={14} className="text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.topic}</p>
                      <p className="text-xs text-slate-500">{item.type} • {item.words} words • {item.time}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400 shrink-0">+{item.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Bottom quick links ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {
            icon: '📚', title: 'All 75 Writing Prompts',
            desc: 'One topic for each day of the challenge',
            href: '/writing-hub/prompts', badge: null,
          },
          {
            icon: '🔤', title: 'Grammar Reference',
            desc: 'Tenses, articles, prepositions & more',
            href: '/grammar-reference', badge: 'Essential',
          },
          {
            icon: '📖', title: 'Sample Essays',
            desc: 'Read high-quality model answers',
            href: '/writing-hub/samples', badge: null,
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
                  <span className="text-[10px] bg-violet-500/15 text-violet-300 px-1.5 py-0.5 rounded-md font-bold border border-violet-500/20">
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
