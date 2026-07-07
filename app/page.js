'use client';
// Landing Page — Stunning hero, features, and CTA
// The first page users see — must convert and impress

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, BookOpen, Brain, Mic, Trophy, Zap,
  Star, CheckCircle2, Flame, Target, BarChart2,
  Globe, MessageSquare, Users, Play, ChevronDown,
  Volume2, PenTool, Headphones, GraduationCap,
} from 'lucide-react';

// ============================================================
// Animated Counter hook
// ============================================================
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ============================================================
// Stats section data
// ============================================================
const STATS = [
  { value: 75,   suffix: '',   label: 'Days Curriculum' },
  { value: 500,  suffix: '+',  label: 'Topics Covered' },
  { value: 5000, suffix: '+',  label: 'Practice Questions' },
  { value: 10000,suffix: '+',  label: 'Vocabulary Words' },
];

// Feature cards data
const FEATURES = [
  { icon: BookOpen,    color: 'from-indigo-500 to-blue-500',    title: 'Smart Grammar',       desc: 'All 12 tenses, modals, conditionals — explained simply in Hindi & English.' },
  { icon: Mic,         color: 'from-purple-500 to-pink-500',    title: 'Speaking Practice',   desc: 'Roleplay, interviews, office conversations — real-world speaking drills.' },
  { icon: Volume2,     color: 'from-cyan-500 to-teal-500',      title: 'Pronunciation Lab',   desc: 'IPA, stress patterns, connected speech — sound like a native speaker.' },
  { icon: Brain,       color: 'from-violet-500 to-purple-500',  title: 'AI Tutor',            desc: 'Personalized AI teacher that knows your weaknesses and fixes them.' },
  { icon: BarChart2,   color: 'from-emerald-500 to-green-500',  title: 'Progress Analytics',  desc: 'Deep graphs, heatmaps, weak-area detection — know exactly where to improve.' },
  { icon: Trophy,      color: 'from-amber-500 to-orange-500',   title: 'Gamification',        desc: 'XP, coins, streaks, badges — make learning addictive and fun.' },
  { icon: PenTool,     color: 'from-rose-500 to-red-500',       title: 'Professional Writing','desc': 'Emails, letters, resumes, reports — write with confidence for any situation.' },
  { icon: Headphones,  color: 'from-sky-500 to-blue-500',       title: 'Listening Lab',       desc: 'Train your ear with conversations, podcasts, and native-speed audio.' },
];

// 75-days journey preview
const JOURNEY_PREVIEW = [
  { days: '1–10',  label: 'Foundation',      emoji: '🏗️', color: 'text-emerald-400', desc: 'Be Verb, Has/Have, Basic Sentences' },
  { days: '11–20', label: 'Basic Modals',    emoji: '🔑', color: 'text-sky-400',     desc: 'Want, Let, Can, Should, May, Must' },
  { days: '21–31', label: 'Advanced Modals', emoji: '⚡', color: 'text-violet-400',  desc: 'Could Have, Should Have, Would Have' },
  { days: '32–50', label: 'Tenses & Voice',  emoji: '⏰', color: 'text-amber-400',   desc: 'All 12 Tenses, Passive Voice' },
  { days: '51–68', label: 'Vocabulary',      emoji: '📖', color: 'text-pink-400',    desc: 'Idioms, Phrasal Verbs, 10,000+ Words' },
  { days: '69–75', label: 'Professional',    emoji: '🏆', color: 'text-orange-400',  desc: 'Writing, Revision, Mock Tests' },
];

// Testimonials
const TESTIMONIALS = [
  { name: 'Rahul Kumar',   role: 'Software Engineer',  text: 'Mere interview mein bahut help hua. Ab confidently English bolta hun.', rating: 5, avatar: 'R' },
  { name: 'Priya Sharma',  role: 'MBA Student',         text: '75 days mein meri English completely transform ho gayi. Amazing platform!', rating: 5, avatar: 'P' },
  { name: 'Amit Singh',    role: 'Business Analyst',    text: 'Office mein ab koi nahi bolega ki meri English weak hai. Thank you!', rating: 5, avatar: 'A' },
];

// ============================================================
// Landing Page Component
// ============================================================
export default function LandingPage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  // Trigger counter animation when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface-950 text-white overflow-x-hidden">

      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-surface-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-black text-base shadow-glow-primary group-hover:scale-105 transition-transform">
              75
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-white text-sm leading-none">75 Days Hard</p>
              <p className="gradient-text text-xs font-bold tracking-widest">ENGLISH</p>
            </div>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            {['Features', 'Curriculum', 'How It Works', 'Reviews'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="hidden sm:block text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5">
              Sign In
            </Link>
            <Link href="/register"
              className="btn-primary text-sm px-5 py-2.5 flex items-center gap-1.5">
              Start Free
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-6 animate-fade-up">
            <Flame size={15} className="animate-streak-fire text-orange-400" />
            World's Most Advanced English Learning Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6 animate-fade-up fill-both" style={{ animationDelay: '100ms' }}>
            <span className="gradient-text-hero">Master English</span>
            <br />
            <span className="text-white">in Just</span>{' '}
            <span className="relative inline-block">
              <span className="gradient-text">75 Days</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-primary" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 animate-fade-up fill-both leading-relaxed" style={{ animationDelay: '200ms' }}>
            Hindi se English — zero se fluency tak. Grammar, speaking, vocabulary, pronunciation —
            ek hi platform par. <span className="text-white font-semibold">Bilkul beginner se start karo.</span>
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-up fill-both" style={{ animationDelay: '300ms' }}>
            {['✅ 75 Structured Days', '✅ 5000+ Questions', '✅ AI Tutor', '✅ Sound Effects', '✅ Gamified Learning', '✅ Free Forever'].map((f) => (
              <span key={f} className="text-sm text-slate-400 bg-white/5 border border-white/8 px-3 py-1 rounded-full">{f}</span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up fill-both" style={{ animationDelay: '400ms' }}>
            <Link href="/register"
              className="btn-gradient text-base px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-2 shadow-xl hover:shadow-glow-primary transition-all hover:-translate-y-1">
              Start Your 75-Day Journey
              <ArrowRight size={18} />
            </Link>
            <Link href="/75-days-challenge"
              className="flex items-center gap-2 text-base font-semibold text-slate-300 hover:text-white transition-colors px-6 py-4 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5">
              <Play size={16} className="text-primary-400" fill="currentColor" />
              View Curriculum
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 animate-fade-up fill-both" style={{ animationDelay: '500ms' }}>
            {[
              { icon: Users, text: '10,000+ Students' },
              { icon: Star, text: '4.9/5 Rating' },
              { icon: GraduationCap, text: 'Certificate on Completion' },
              { icon: Globe, text: 'Free Forever' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={15} className="text-primary-400" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── Stats Section ────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 relative" id="features">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, suffix, label }, i) => {
              const count = useCounter(value, 2000, statsVisible);
              return (
                <div key={label} className="text-center">
                  <p className="text-4xl md:text-5xl font-black gradient-text mb-1">
                    {count.toLocaleString()}{suffix}
                  </p>
                  <p className="text-slate-500 text-sm">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-primary mb-4 inline-block">Everything You Need</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              One Platform.<br />
              <span className="gradient-text">Complete English Mastery.</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Grammar se lekar professional writing tak — sab kuch ek jagah.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, color, title, desc }, i) => (
              <div key={title}
                className="card p-6 group hover:border-primary-500/30 transition-all cursor-default"
                style={{ animationDelay: `${i * 50}ms` }}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 75-Day Journey ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-surface-900/30" id="curriculum">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-warning mb-4 inline-block">The 75-Day Plan</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Structured Learning<br />
              <span className="gradient-text">Day by Day</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Har din ek naya topic — carefully designed to build on what you already know.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {JOURNEY_PREVIEW.map(({ days, label, emoji, color, desc }) => (
              <div key={days} className="card p-6 hover:border-white/15">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-bold ${color}`}>Day {days}</span>
                    </div>
                    <h3 className="font-bold text-white mb-1">{label}</h3>
                    <p className="text-sm text-slate-500">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/75-days-challenge"
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-base">
              View Full 75-Day Curriculum
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="py-20 px-4" id="how-it-works">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-slate-400">Simple. Structured. Effective.</p>
          </div>

          <div className="space-y-6">
            {[
              { step: '01', icon: BookOpen,   title: 'Learn the Concept',    desc: 'Har topic ka full explanation — Hindi + English mein. Rules, examples, common mistakes — sab kuch clearly explain hota hai.' },
              { step: '02', icon: Target,     title: 'Practice 500+ Questions', desc: 'Hindi mein questions — khud translate karo English mein. Answer check karo instantly. Score track hota hai.' },
              { step: '03', icon: Zap,        title: 'Earn XP & Level Up',   desc: 'Sahi answer par XP milta hai. Streak maintain karo. Badges unlock karo. Learning gamified hai — addictive bhi.' },
              { step: '04', icon: BarChart2,  title: 'Track Your Progress',  desc: 'Dashboard mein dekho — kaha strong ho, kahan weak ho. AI suggest karta hai next steps.' },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <div key={step} className="flex gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary-500/15 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/25 transition-all">
                  <Icon size={22} className="text-primary-400" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-md">
                      Step {step}
                    </span>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-surface-900/30" id="reviews">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              Students <span className="gradient-text">Love It</span>
            </h2>
            <div className="flex justify-center gap-1 mb-2">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={20} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-slate-400">10,000+ students already learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, text, rating, avatar }) => (
              <div key={name} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array(rating).fill(null).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/60 via-surface-950 to-secondary-950/60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6 animate-float">🚀</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Aaj Se Start Karo.<br />
            <span className="gradient-text">75 Days. One Goal. Fluent English.</span>
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Free hai. No credit card needed. Bas start karo.
          </p>
          <Link href="/register"
            className="btn-gradient inline-flex items-center gap-3 text-lg px-10 py-5 rounded-2xl font-bold text-white shadow-xl hover:-translate-y-1 transition-all">
            <Zap size={22} />
            Start My 75-Day Journey
            <ArrowRight size={22} />
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Join 10,000+ students already on their journey →
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-black text-sm">75</div>
            <span className="font-bold text-slate-300">75 Days Hard English</span>
          </div>
          <p className="text-sm text-slate-600">Built with ❤️ for every Indian who dreams of speaking English fluently.</p>
          <div className="flex gap-4 text-sm text-slate-600">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/help"    className="hover:text-slate-400 transition-colors">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
