'use client';
// Speaking Lab — Complete speaking practice hub
// Features: conversation scenarios, phrases, shadowing, confidence building
// Fully animated with Framer Motion

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Mic, Volume2, Play, ChevronRight, Star, CheckCircle2,
  MessageSquare, Users, Briefcase, Phone, Globe,
  ArrowRight, Sparkles, Target, BookOpen, Zap,
  TrendingUp, Award, Clock, Copy, Check,
} from 'lucide-react';
import useUserStore from '@/store/userStore';
import useProgressStore from '@/store/progressStore';

// ── Animation variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

// ── Speaking Modules Data ────────────────────────────────────
const SPEAKING_MODULES = [
  {
    id: 'daily',
    title: 'Daily Conversations',
    subtitle: 'रोज़मर्रा की बातचीत',
    icon: MessageSquare,
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    level: 'A1-A2',
    lessons: 30,
    desc: 'Greetings, introductions, asking & answering everyday questions — build confidence from day 1.',
    topics: ['Greetings & Farewells', 'Asking for Help', 'At a Shop', 'Phone Conversations', 'Making Plans'],
  },
  {
    id: 'office',
    title: 'Office English',
    subtitle: 'ऑफिस की बातचीत',
    icon: Briefcase,
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    level: 'B1-B2',
    lessons: 25,
    desc: 'Meetings, presentations, emails, client calls — speak professionally in every work situation.',
    topics: ['Meeting English', 'Email Language', 'Presentations', 'Negotiations', 'Team Communication'],
  },
  {
    id: 'interview',
    title: 'Job Interviews',
    subtitle: 'इंटरव्यू की तैयारी',
    icon: Users,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    level: 'B2',
    lessons: 20,
    desc: 'Answer any interview question with confidence. HR round, technical round, and managerial round prep.',
    topics: ['Tell Me About Yourself', 'Strengths & Weaknesses', 'Situational Questions', 'Salary Negotiation', 'HR Round'],
  },
  {
    id: 'phone',
    title: 'Phone & Video Calls',
    subtitle: 'Phone और video calls',
    icon: Phone,
    color: 'from-cyan-500 to-sky-600',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    level: 'A2-B1',
    lessons: 15,
    desc: 'Start, manage, and close phone calls professionally. Handle tech issues, ask for repetition.',
    topics: ['Answering Calls', 'Taking Messages', 'Conference Calls', 'Ending Calls Politely', 'Video Meeting Etiquette'],
  },
  {
    id: 'social',
    title: 'Social English',
    subtitle: 'सामाजिक बातचीत',
    icon: Globe,
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    level: 'A2-B1',
    lessons: 22,
    desc: 'Small talk, networking events, parties, making friends — be comfortable in any social setting.',
    topics: ['Small Talk', 'Networking', 'Expressing Opinions', 'Compliments', 'Apologizing Gracefully'],
  },
  {
    id: 'public',
    title: 'Public Speaking',
    subtitle: 'सबके सामने बोलना',
    icon: Star,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    level: 'B2-C1',
    lessons: 18,
    desc: 'Overcome stage fear, structure speeches, deliver powerful presentations that engage audiences.',
    topics: ['Overcoming Fear', 'Speech Structure', 'Storytelling', 'Engagement Techniques', 'Q&A Handling'],
  },
];

// ── Conversation Starters ─────────────────────────────────────
const CONVERSATION_STARTERS = {
  office: [
    { hindi: 'Meeting किस बारे में है?',          english: 'What is the meeting about?' },
    { hindi: 'Project का update क्या है?',         english: 'What is the update on the project?' },
    { hindi: 'क्या आप इसमें help कर सकते हैं?',   english: 'Could you help me with this?' },
    { hindi: 'Deadline क्या है?',                  english: 'What is the deadline for this?' },
    { hindi: 'क्या मैं एक suggestion दे सकता हूँ?',english: 'May I make a suggestion?' },
    { hindi: 'Report कब तक तैयार होगी?',          english: 'When will the report be ready?' },
  ],
  daily: [
    { hindi: 'आज मौसम कैसा है?',                  english: 'How is the weather today?' },
    { hindi: 'आपका दिन कैसा रहा?',                english: 'How was your day?' },
    { hindi: 'क्या आप यहाँ नए हैं?',              english: 'Are you new here?' },
    { hindi: 'आप क्या करते हैं?',                 english: 'What do you do for a living?' },
    { hindi: 'आपको यहाँ कैसा लग रहा है?',         english: 'How are you finding it here?' },
    { hindi: 'Weekend पर क्या plan है?',           english: 'What are your plans for the weekend?' },
  ],
  interview: [
    { hindi: 'मुझे अपने बारे में बताएं।',          english: 'Tell me about yourself.' },
    { hindi: 'आप यह job क्यों चाहते हैं?',        english: 'Why do you want this job?' },
    { hindi: 'आपकी strongest quality क्या है?',    english: 'What is your strongest quality?' },
    { hindi: '5 साल बाद खुद को कहाँ देखते हैं?',  english: 'Where do you see yourself in 5 years?' },
    { hindi: 'आपने सबसे बड़ी challenge कब face की?',english: 'What was the biggest challenge you faced?' },
    { hindi: 'Team में कैसे काम करते हैं?',        english: 'How do you work in a team?' },
  ],
};

// ── Power Phrases ─────────────────────────────────────────────
const POWER_PHRASES = [
  { category: 'Agreeing',     phrases: ["I totally agree.", "Absolutely!", "You're right about that.", "That makes sense.", "I couldn't agree more."] },
  { category: 'Disagreeing',  phrases: ["I see your point, but...", "I'm not sure about that.", "Actually, I think...", "With all due respect...", "I'd like to respectfully disagree."] },
  { category: 'Clarifying',   phrases: ["Could you clarify that?", "What exactly do you mean?", "Could you elaborate?", "In other words...", "Just to confirm..."] },
  { category: 'Interrupting', phrases: ["Sorry to interrupt, but...", "If I may...", "Can I add something here?", "Before we move on...", "I'd like to jump in here."] },
  { category: 'Buying Time',  phrases: ["That's a great question.", "Let me think about that.", "Give me a moment.", "I'll get back to you on that.", "That's something to consider."] },
  { category: 'Transitioning',phrases: ["Moving on to...", "On a different note...", "That brings me to...", "Coming back to the point...", "Another thing to consider is..."] },
];

// ── Speaking Challenges (Daily) ───────────────────────────────
const DAILY_CHALLENGES = [
  { id:1, title:'Introduce Yourself',     time:'2 min', level:'A1', prompt:'Record a 2-minute self-introduction. Include: name, profession, hobby, and one goal.' },
  { id:2, title:'Describe Your Day',      time:'1 min', level:'A2', prompt:'Talk about your typical workday from morning to evening in English.' },
  { id:3, title:'Give Your Opinion',      time:'2 min', level:'B1', prompt:"Give your opinion on remote work: 'Do you prefer working from home or office? Why?'" },
  { id:4, title:'Tell a Story',           time:'3 min', level:'B1', prompt:'Tell a funny or interesting story from your life in English.' },
  { id:5, title:'Mock Interview Answer',  time:'2 min', level:'B2', prompt:"Answer: 'What is your biggest professional achievement and what did you learn from it?'" },
  { id:6, title:'Persuade Someone',       time:'2 min', level:'B2', prompt:"Convince someone to exercise regularly. Give 3 strong reasons with examples." },
];

// ── Tongue Twisters ───────────────────────────────────────────
const TONGUE_TWISTERS = [
  { text: "She sells seashells by the seashore.", focus: "S & Sh sounds", level: 'A2' },
  { text: "Peter Piper picked a peck of pickled peppers.", focus: "P sound", level: 'A2' },
  { text: "How much wood would a woodchuck chuck?", focus: "W & Ch sounds", level: 'B1' },
  { text: "Red lorry, yellow lorry, red lorry, yellow lorry.", focus: "R & L sounds", level: 'B1' },
  { text: "Which witch watched which wristwatches?", focus: "W & Wh sounds", level: 'B1' },
  { text: "Betty Botter bought some butter, but the butter was bitter.", focus: "B & T sounds", level: 'B2' },
];

// ── Component ────────────────────────────────────────────────
export default function SpeakingLabPage() {
  const [activeTab, setActiveTab]       = useState('modules');
  const [activeStarter, setActiveStarter] = useState('office');
  const [copiedPhrase, setCopiedPhrase] = useState(null);
  const { level } = useUserStore();

  const headerRef = useRef(null);
  const isInView  = useInView(headerRef, { once: true });

  const copyPhrase = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedPhrase(text);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-indigo-600/20 via-purple-600/15 to-pink-600/10 border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg"
              >
                <Mic size={22} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">Speaking Lab</h1>
                <p className="text-sm text-indigo-300 font-medium">Confidence se bolo — Every situation ke liye</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              Roleplay, shadowing, conversation starters, power phrases — sab kuch jo tumhe fluent speaker banayega.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-indigo-300">130+</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Lessons</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-purple-300">6</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Modules</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Tabs ────────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id:'modules',    label:'Modules',           icon: BookOpen  },
          { id:'phrases',    label:'Power Phrases',     icon: Sparkles  },
          { id:'starters',   label:'Conversation Starts',icon: MessageSquare },
          { id:'challenge',  label:'Daily Challenge',   icon: Target    },
          { id:'twisters',   label:'Pronunciation Drills',icon: Volume2 },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === id
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Modules Tab ──────────────────────────────── */}
        {activeTab === 'modules' && (
          <motion.div
            key="modules"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SPEAKING_MODULES.map((mod) => (
              <motion.div
                key={mod.id}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`card p-6 group cursor-pointer border ${mod.border} hover:shadow-lg transition-all relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <mod.icon size={22} className="text-white" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-1 rounded-lg ${mod.bg} border ${mod.border} text-slate-300`}>
                    {mod.level}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg mb-0.5">{mod.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{mod.subtitle} • {mod.lessons} lessons</p>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{mod.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.topics.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500">{t}</span>
                  ))}
                  {mod.topics.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-600">+{mod.topics.length - 3} more</span>
                  )}
                </div>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r ${mod.color} text-white opacity-90 group-hover:opacity-100 transition-all flex items-center justify-center gap-2`}>
                  Start Module <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Power Phrases Tab ────────────────────── */}
        {activeTab === 'phrases' && (
          <motion.div
            key="phrases"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="card p-4 flex items-start gap-3">
              <Sparkles size={18} className="text-yellow-400 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400">
                <span className="text-white font-semibold">Power Phrases</span> — ये professional English में सबसे ज़्यादा use होने वाले expressions हैं। 
                इन्हें याद करो और naturally use karo conversations में।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {POWER_PHRASES.map(({ category, phrases }) => (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="card p-5"
                >
                  <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-400" />
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {phrases.map((phrase) => (
                      <div
                        key={phrase}
                        className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/3 border border-white/5 group hover:bg-white/6 transition-all"
                      >
                        <p className="text-sm text-slate-300 flex-1">"{phrase}"</p>
                        <button
                          onClick={() => copyPhrase(phrase)}
                          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-300 hover:bg-white/10 transition-all"
                        >
                          {copiedPhrase === phrase ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Conversation Starters Tab ────────────── */}
        {activeTab === 'starters' && (
          <motion.div
            key="starters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="flex gap-2 flex-wrap">
              {Object.keys(CONVERSATION_STARTERS).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveStarter(key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                    activeStarter === key
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'bg-white/5 text-slate-500 border border-white/8 hover:text-slate-300'
                  }`}
                >
                  {key === 'daily' ? 'Daily Life' : key === 'office' ? 'Office' : 'Interview'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONVERSATION_STARTERS[activeStarter].map(({ hindi, english }, i) => (
                <motion.div
                  key={english}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="card p-5 group hover:border-primary-500/20 transition-all"
                >
                  <p className="text-sm text-slate-500 mb-2">🇮🇳 {hindi}</p>
                  <p className="text-base text-white font-semibold">🇬🇧 {english}</p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => copyPhrase(english)}
                      className="text-xs text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
                    >
                      {copiedPhrase === english ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                      {copiedPhrase === english ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Daily Challenge Tab ──────────────────── */}
        {activeTab === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="card p-4 border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold mb-1">
                <Target size={16} />
                How to Use Daily Challenges
              </div>
              <p className="text-sm text-slate-400">
                Har challenge को loud voice में practice karo. First Hindi में soch lo, then English में bolo. 
                Initially awkward feel hoga — that's completely normal! Consistency is everything.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DAILY_CHALLENGES.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="card p-5 group hover:border-amber-500/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/25">
                      Level: {challenge.level}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={11} />
                      {challenge.time}
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">{challenge.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 italic">
                    "{challenge.prompt}"
                  </p>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/20 text-amber-300 text-sm font-semibold hover:bg-amber-500/25 transition-all">
                    <Mic size={14} />
                    Start Challenge
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Tongue Twisters Tab ──────────────────── */}
        {activeTab === 'twisters' && (
          <motion.div
            key="twisters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="card p-4 border border-cyan-500/20 bg-cyan-500/5">
              <div className="flex items-center gap-2 text-cyan-300 text-sm font-semibold mb-1">
                <Volume2 size={16} />
                How to Practice Tongue Twisters
              </div>
              <p className="text-sm text-slate-400">
                पहले slowly पढ़ो clearly. फिर speed बढ़ाते जाओ। 
                Specific sound पर ध्यान दो जो brackets में mention है।
                Roz subah 2-3 minute इन पर practice karo।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TONGUE_TWISTERS.map((tw, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="card p-5 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                      Focus: {tw.focus}
                    </span>
                    <span className="text-xs text-slate-600">Level {tw.level}</span>
                  </div>
                  <p className="text-base text-white font-semibold leading-relaxed mb-3 italic">
                    "{tw.text}"
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyPhrase(tw.text)}
                      className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors"
                    >
                      {copiedPhrase === tw.text ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                      Copy
                    </button>
                    <span className="text-slate-700">•</span>
                    <span className="text-xs text-slate-600">Say 3× fast</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Quick Tips ──────────────────────────────────────── */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap size={18} className="text-yellow-400" />
          Speaking Tips for Confident English
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { tip: 'Think in English', desc: 'पहले Hindi में मत सोचो — directly English में सोचने की practice karo.' },
            { tip: 'Speak Slowly',     desc: 'Fast bolne ki zarurat nahi — clearly aur slowly bolo. Native speakers भी slowly bolte hain.' },
            { tip: 'Record Yourself', desc: 'Daily खुद को record karo — sunne से पता चलेगा कहाँ improve करना है.' },
            { tip: 'Mirror Practice', desc: 'Mirror के सामने खड़े होकर practice karo — body language bhi improve hoti hai.' },
            { tip: 'Copy Native Speakers', desc: 'Shows, podcasts, movies में exactly वैसे ही pronunciation practice karo — shadowing technique.' },
            { tip: 'Make Mistakes',   desc: 'Galti karne se मत डरो — हर गलती एक learning opportunity है. Boldly bolo!' },
          ].map(({ tip, desc }) => (
            <div key={tip} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-sm">{tip}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
