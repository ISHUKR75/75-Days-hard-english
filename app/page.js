'use client';
// Landing Page — World-class animated hero with Framer Motion
// Inspired by: Vercel, Linear, Stripe, Framer, Apple design language
// Features: scroll-triggered animations, bento grid, particle orbs, glassmorphism

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, BookOpen, Brain, Mic, Trophy, Zap,
  Star, CheckCircle2, Flame, Target, BarChart2,
  Globe, MessageSquare, Users, Play, ChevronDown,
  Volume2, PenTool, Headphones, GraduationCap, Sparkles,
  TrendingUp, Award, Clock, Shield,
} from 'lucide-react';

// ── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.2, ease: 'easeOut' } },
};

// ── Static Data ────────────────────────────────────────────
const STATS = [
  { value: '75',    label: 'Days Curriculum',    icon: '📅', color: 'text-indigo-400' },
  { value: '500+',  label: 'Topics Covered',      icon: '📚', color: 'text-purple-400' },
  { value: '5000+', label: 'Practice Questions',  icon: '✍️', color: 'text-cyan-400'   },
  { value: '10K+',  label: 'Vocabulary Words',    icon: '🔤', color: 'text-emerald-400'},
];

const FEATURES = [
  {
    icon: BookOpen,
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    title: 'Smart Grammar',
    desc: 'All 12 tenses, modals, conditionals — explained simply in Hindi & English with real examples.',
    tag: 'Most Used',
  },
  {
    icon: Mic,
    color: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    title: 'Speaking Practice',
    desc: 'Roleplay, interviews, office conversations — real-world speaking drills that build confidence.',
    tag: 'Fan Favorite',
  },
  {
    icon: Volume2,
    color: 'from-cyan-500 to-teal-600',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    title: 'Pronunciation Lab',
    desc: 'IPA, stress patterns, connected speech — sound like a native English speaker.',
    tag: null,
  },
  {
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    title: 'AI Tutor',
    desc: 'Personalized AI teacher that knows your weaknesses and fixes them instantly.',
    tag: 'AI-Powered',
  },
  {
    icon: BarChart2,
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    title: 'Progress Analytics',
    desc: 'Deep graphs, heatmaps, weak-area detection — know exactly where to improve.',
    tag: null,
  },
  {
    icon: Trophy,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    title: 'Gamification',
    desc: 'XP, coins, streaks, badges — make learning addictive and fun every single day.',
    tag: 'Addictive',
  },
  {
    icon: PenTool,
    color: 'from-rose-500 to-red-600',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    title: 'Professional Writing',
    desc: 'Emails, letters, resumes, reports — write with confidence for any situation.',
    tag: null,
  },
  {
    icon: Headphones,
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    title: 'Listening Lab',
    desc: 'Train your ear with real conversations, podcasts, and native-speed audio exercises.',
    tag: null,
  },
];

const JOURNEY = [
  { days: '1–10',  label: 'Foundation',      emoji: '🏗️', color: 'from-emerald-500 to-teal-500',    desc: 'Be Verb, Has/Have, There is/are, Basic Sentences' },
  { days: '11–20', label: 'Basic Modals',    emoji: '🔑', color: 'from-sky-500 to-blue-500',       desc: 'Want, Let, Can, Should, May, Must' },
  { days: '21–30', label: 'Adv. Modals',     emoji: '⚡', color: 'from-violet-500 to-purple-500',  desc: 'Could Have, Should Have, Would Have, Will/Shall' },
  { days: '32–50', label: 'Tenses & Voice',  emoji: '⏰', color: 'from-amber-500 to-orange-500',   desc: 'All 12 Tenses, Passive Voice, Prepositions' },
  { days: '51–68', label: 'Vocabulary',      emoji: '📖', color: 'from-pink-500 to-rose-500',      desc: 'Idioms, Phrasal Verbs, 10,000+ Real Words' },
  { days: '69–75', label: 'Professional',    emoji: '🏆', color: 'from-orange-500 to-yellow-500',  desc: 'Writing, Speaking, Mock Tests, Certification' },
];

const TESTIMONIALS = [
  { name: 'Rahul Kumar',   role: 'Software Engineer, Bangalore',     text: 'Mere interview mein bahut help hua. Ab confidently English bolta hun bina kisi dar ke.', rating: 5, avatar: 'R', color: 'from-indigo-500 to-blue-500' },
  { name: 'Priya Sharma',  role: 'MBA Student, Delhi',                text: '75 days mein meri English completely transform ho gayi. Amazing structured platform!',    rating: 5, avatar: 'P', color: 'from-purple-500 to-pink-500' },
  { name: 'Amit Singh',    role: 'Business Analyst, Mumbai',          text: 'Office mein ab koi nahi bolega ki meri English weak hai. Daily practice ne kamal kiya!',  rating: 5, avatar: 'A', color: 'from-emerald-500 to-teal-500' },
  { name: 'Sneha Patel',   role: 'Customer Success, Hyderabad',       text: 'Client calls mein ab nervousness nahi hoti. Grammar aur vocabulary dono improve hua.',    rating: 5, avatar: 'S', color: 'from-amber-500 to-orange-500' },
  { name: 'Vikram Rao',    role: 'HR Manager, Chennai',               text: 'Presentations mein ab full confidence hai. Pronunciation lab ne sach mein help ki!',      rating: 5, avatar: 'V', color: 'from-cyan-500 to-sky-500' },
  { name: 'Anjali Verma',  role: 'Teacher, Jaipur',                   text: 'Maine bhi English sikhne ki koshish ki thi pehle — ye platform seriously best hai!',     rating: 5, avatar: 'A', color: 'from-rose-500 to-red-500' },
];

const HOW_IT_WORKS = [
  { step: '01', icon: BookOpen,   color: 'text-indigo-400', bg: 'bg-indigo-500/10', title: 'Learn the Concept',    desc: 'Har topic ka full explanation — Hindi + English mein. Rules, examples, common mistakes — sab kuch clearly explain.' },
  { step: '02', icon: Target,     color: 'text-purple-400', bg: 'bg-purple-500/10', title: 'Practice 500+ Questions', desc: 'Hindi mein questions — khud translate karo English mein. Answer check karo instantly with smart scoring.' },
  { step: '03', icon: Zap,        color: 'text-amber-400',  bg: 'bg-amber-500/10',  title: 'Earn XP & Level Up',   desc: 'Sahi answer par XP milta hai. Streak maintain karo. Badges unlock karo. Learning addictive bann jaata hai.' },
  { step: '04', icon: TrendingUp, color: 'text-emerald-400',bg: 'bg-emerald-500/10',title: 'Track Your Progress',  desc: 'Dashboard mein dekho — kahan strong ho, kahan weak ho. AI aapko guide karta hai next best step ke liye.' },
];

// ── Animated Stat Card (safe hook usage) ──────────────────
function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
        className="text-3xl mb-2"
      >
        {stat.icon}
      </motion.div>
      <p className={`text-4xl md:text-5xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
      <p className="text-slate-500 text-sm">{stat.label}</p>
    </motion.div>
  );
}

// ── Floating Orb ─────────────────────────────────────────
function FloatingOrb({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

// ── Section heading component ────────────────────────────
function SectionHeader({ badge, title, subtitle, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`text-center mb-16 ${className}`}
    >
      {badge && (
        <motion.span variants={fadeUp} className="badge-primary mb-4 inline-block">
          {badge}
        </motion.span>
      )}
      <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-4" dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <motion.p variants={fadeUp} className="text-slate-400 max-w-xl mx-auto text-lg">{subtitle}</motion.p>}
    </motion.div>
  );
}

// ── Main Landing Page ─────────────────────────────────────
export default function LandingPage() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ['rgba(2,6,23,0)', 'rgba(2,6,23,0.95)']);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-cycle testimonials
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────────────── */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-black text-base shadow-glow-primary"
            >
              75
            </motion.div>
            <div className="hidden sm:block">
              <p className="font-black text-white text-sm leading-none">75 Days Hard</p>
              <p className="gradient-text text-xs font-bold tracking-widest">ENGLISH</p>
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            {[['Features', '#features'], ['Curriculum', '#curriculum'], ['How It Works', '#how-it-works'], ['Reviews', '#reviews']].map(([item, href]) => (
              <motion.a key={item} href={href} whileHover={{ color: '#fff' }}
                className="hover:text-white transition-colors">{item}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5">
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/register" className="btn-primary text-sm px-5 py-2.5 flex items-center gap-1.5">
                Start Free <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-hero opacity-40" />
        <FloatingOrb className="top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-600/20" delay={0} />
        <FloatingOrb className="bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-600/15" delay={1.5} />
        <FloatingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5" delay={3} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-8"
          >
            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🔥
            </motion.span>
            World's Most Advanced Hindi-to-English Platform
            <Sparkles size={14} className="text-yellow-400" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] mb-6"
          >
            <span className="gradient-text-hero">Master English</span>
            <br />
            <span className="text-white">in Just </span>
            <span className="relative inline-block">
              <span className="gradient-text">75 Days</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-primary origin-left"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Hindi se English — zero se fluency tak. Grammar, speaking, vocabulary, pronunciation —{' '}
            <span className="text-white font-semibold">ek hi platform par.</span>{' '}
            Bilkul beginner se start karo, job aur daily life ke liye ready bano.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {['✅ 75 Structured Days', '✅ 5000+ Questions', '✅ AI Tutor', '✅ Sound Effects', '✅ Gamified', '✅ Free Forever'].map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="text-sm text-slate-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-slate-300 transition-all cursor-default"
              >
                {f}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/register"
                className="btn-gradient text-base px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-2 shadow-xl shadow-primary-500/20">
                Start Your 75-Day Journey
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href="/75-days-challenge"
                className="flex items-center gap-2 text-base font-semibold text-slate-300 hover:text-white transition-colors px-6 py-4 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/5">
                <Play size={16} className="text-primary-400" fill="currentColor" />
                View Curriculum
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-slate-500"
          >
            {[
              { icon: Users,         text: '10,000+ Students'         },
              { icon: Star,          text: '4.9/5 Rating'             },
              { icon: GraduationCap, text: 'Certificate on Completion'},
              { icon: Shield,        text: 'Free Forever'             },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={14} className="text-primary-400" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} />
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-20 relative" id="features">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Features Bento Grid ──────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Everything You Need"
            title="One Platform.<br/><span class='gradient-text'>Complete English Mastery.</span>"
            subtitle="Grammar se lekar professional writing tak — sab kuch ek jagah. Duolingo jaise fun, Coursera jaise structured."
          />

          {/* Bento Grid Layout */}
          <FeatureGrid />
        </div>
      </section>

      {/* ── 75-Day Journey ──────────────────────────────────── */}
      <section className="py-24 px-4 bg-surface-900/40 relative overflow-hidden" id="curriculum">
        <FloatingOrb className="top-0 right-0 w-96 h-96 bg-primary-600/10" delay={2} />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader
            badge="The 75-Day Plan"
            title="Structured Learning<br/><span class='gradient-text'>Day by Day</span>"
            subtitle="Har din ek naya topic — carefully designed to build on what you already know."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
          >
            {JOURNEY.map(({ days, label, emoji, color, desc }, i) => (
              <motion.div key={days} variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card p-6 group cursor-default relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="flex items-start gap-4">
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    className="text-3xl cursor-default"
                  >{emoji}</motion.span>
                  <div>
                    <span className={`text-sm font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>Day {days}</span>
                    <h3 className="font-bold text-white mb-1">{label}</h3>
                    <p className="text-sm text-slate-500">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/75-days-challenge" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
                View Full 75-Day Curriculum <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────── */}
      <section className="py-24 px-4" id="how-it-works">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="How It <span class='gradient-text'>Works</span>"
            subtitle="Simple. Structured. Effective. Sirf 4 steps mein fluent English."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-5"
          >
            {HOW_IT_WORKS.map(({ step, icon: Icon, color, bg, title, desc }, i) => (
              <motion.div key={step} variants={fadeUp}
                whileHover={{ x: 4 }}
                className="flex gap-5 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`shrink-0 w-14 h-14 rounded-2xl ${bg} border border-white/10 flex items-center justify-center`}
                >
                  <Icon size={22} className={color} />
                </motion.div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold ${color} bg-white/5 px-2 py-0.5 rounded-md`}>Step {step}</span>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section className="py-24 px-4 bg-surface-900/40 overflow-hidden" id="reviews">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Students <span class='gradient-text'>Love It</span>"
            subtitle="10,000+ students already on their journey"
          />

          {/* Star rating */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-1 mb-12"
          >
            {[1,2,3,4,5].map((s) => (
              <motion.span key={s} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: s * 0.1 }}>
                <Star size={24} className="text-yellow-400 fill-yellow-400" />
              </motion.span>
            ))}
          </motion.div>

          {/* Testimonial Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map(({ name, role, text, rating, avatar, color }, i) => (
              <motion.div
                key={name}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card p-6 group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color} opacity-60`} />
                <div className="flex gap-1 mb-4">
                  {Array(rating).fill(null).map((_, j) => (
                    <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/60 via-surface-950 to-secondary-950/40" />
        <FloatingOrb className="top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary-500/10" delay={0} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-6"
          >
            🚀
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Aaj Se Start Karo.<br />
            <span className="gradient-text">75 Days. One Goal. Fluent English.</span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Free hai. No credit card needed. Bas start karo — 10,000+ students already fluent ho gaye.
          </p>
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link href="/register"
              className="btn-gradient inline-flex items-center gap-3 text-lg px-10 py-5 rounded-2xl font-bold text-white shadow-2xl shadow-primary-500/30">
              <Zap size={22} />
              Start My 75-Day Journey
              <ArrowRight size={22} />
            </Link>
          </motion.div>
          <p className="text-sm text-slate-600 mt-5">
            Already a member?{' '}
            <Link href="/login" className="text-primary-400 hover:text-primary-300 transition-colors">Sign in here →</Link>
          </p>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-black text-sm">75</div>
                <span className="font-bold text-white">75 Days Hard English</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Built with ❤️ for every Indian who dreams of speaking English fluently.
              </p>
            </div>

            {/* Learn */}
            <div>
              <h4 className="text-sm font-bold text-slate-300 mb-3">Learn</h4>
              <div className="space-y-2">
                {[['Grammar', '/grammar-reference'], ['Vocabulary', '/vocabulary-bank'], ['Speaking', '/speaking-lab'], ['Writing', '/writing-lab']].map(([label, href]) => (
                  <Link key={href} href={href} className="block text-sm text-slate-600 hover:text-slate-400 transition-colors">{label}</Link>
                ))}
              </div>
            </div>

            {/* Practice */}
            <div>
              <h4 className="text-sm font-bold text-slate-300 mb-3">Practice</h4>
              <div className="space-y-2">
                {[['75 Days Challenge', '/75-days-challenge'], ['AI Tutor', '/ai-tutor'], ['Quick Test', '/quick-test'], ['Leaderboard', '/leaderboard']].map(([label, href]) => (
                  <Link key={href} href={href} className="block text-sm text-slate-600 hover:text-slate-400 transition-colors">{label}</Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-bold text-slate-300 mb-3">More</h4>
              <div className="space-y-2">
                {[['About', '/about'], ['Blog', '/blog'], ['Help', '/help'], ['Privacy', '/privacy']].map(([label, href]) => (
                  <Link key={href} href={href} className="block text-sm text-slate-600 hover:text-slate-400 transition-colors">{label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-700">© 2025 75 Days Hard English. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-slate-700">
              <Link href="/privacy" className="hover:text-slate-500 transition-colors">Privacy Policy</Link>
              <Link href="/terms"   className="hover:text-slate-500 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Feature Grid (Bento Layout) ────────────────────────────
function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {FEATURES.map(({ icon: Icon, color, bg, border, title, desc, tag }, i) => (
        <motion.div
          key={title}
          variants={fadeUp}
          whileHover="hover"
          initial="rest"
          animate="rest"
          // Large featured cards
          className={`${i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''} ${i === 3 ? 'lg:col-span-2' : ''}`}
        >
          <motion.div
            variants={cardHover}
            className={`h-full card p-6 group border ${border} hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
              >
                <Icon size={22} className="text-white" />
              </motion.div>
              {tag && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${bg} border ${border}`}>
                  {tag}
                </span>
              )}
            </div>
            <h3 className="font-bold text-white mb-2 text-lg">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
