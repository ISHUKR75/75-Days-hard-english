'use client';
// About Page — Mission, story, values, open source commitment

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Heart, BookOpen, Brain, Globe, Star,
  Users, Zap, Shield, Code2, Target, Trophy,
} from 'lucide-react';

// Animation helpers
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21,0.47,0.32,0.98] } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

const STATS = [
  { value: '10,000+', label: 'Active Students',     icon: Users,   color: 'text-indigo-400' },
  { value: '75',      label: 'Structured Days',      icon: Target,  color: 'text-purple-400' },
  { value: '500+',    label: 'Grammar Topics',       icon: BookOpen,color: 'text-cyan-400'   },
  { value: '10K+',    label: 'Vocabulary Words',     icon: Brain,   color: 'text-emerald-400'},
];

const VALUES = [
  { icon: BookOpen, title: 'Structure Over Chaos',   desc: 'Har topic ek pattern follow karta hai. No confusion, no jumping around.', color: 'from-indigo-500 to-blue-500' },
  { icon: Brain,    title: 'Understand, Don\'t Mug', desc: 'Rote learning nahi — real understanding. Grammar concepts logically explain karo.', color: 'from-purple-500 to-pink-500' },
  { icon: Target,   title: 'Practice Makes Perfect', desc: '500+ questions per topic — theory sikhne ke baad immediately practice karo.', color: 'from-emerald-500 to-teal-500' },
  { icon: Heart,    title: 'Free For Everyone',      desc: 'English ek skill hai jo sabko milni chahiye — cost koi barrier nahi hona chahiye.', color: 'from-rose-500 to-orange-500' },
  { icon: Zap,      title: 'Gamified Learning',      desc: 'XP, coins, streaks, badges — learning ko addictive aur fun banana padega.', color: 'from-amber-500 to-yellow-500' },
  { icon: Shield,   title: 'Open Source',            desc: 'Transparently built. Community can see, improve, and contribute the code.', color: 'from-sky-500 to-cyan-500' },
];

const TEAM = [
  { name: 'Rohit Sharma',  role: 'Founder & CEO',          emoji: '👨‍💻', desc: 'Hindi-medium background se fluent English tak ka personal journey.' },
  { name: 'Priya Verma',   role: 'Head of Curriculum',     emoji: '👩‍🏫', desc: 'English teacher with 10 years of experience teaching Hindi speakers.' },
  { name: 'Amit Kumar',    role: 'Lead Engineer',          emoji: '⚡',   desc: 'Full-stack developer building the AI and platform technology.' },
  { name: 'Community',     role: 'Open Source Contributors',emoji: '🌍',   desc: 'Hundreds of contributors improving lessons and adding content.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-surface-950 to-purple-950/30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6"
          >
            <Heart size={14} className="text-red-400" fill="currentColor" />
            Built with love for Hindi speakers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-6 leading-tight"
          >
            About{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              75 Days Hard English
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            We're building the world's most advanced Hindi-to-English learning platform —
            taking students from absolute beginner to confident professional English speaker in just 75 days.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section className="py-16 px-4 border-y border-white/5 bg-white/2">
        <div className="max-w-4xl mx-auto">
          <Section className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon, color }) => (
              <motion.div key={label} variants={fadeUp} className="text-center">
                <Icon size={24} className={`${color} mx-auto mb-2`} />
                <p className={`text-4xl font-black ${color} mb-1`}>{value}</p>
                <p className="text-slate-500 text-sm">{label}</p>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">OUR MISSION</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                English shouldn't be a barrier.<br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">We're removing it.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Millions of talented Hindi speakers lose out on opportunities every day — not because they lack skills,
                but because they can't express themselves confidently in English. That's the problem we're solving.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-3xl border border-white/5 bg-white/2 p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-black text-white mb-4">The Story Behind 75 Days</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    हमारे founder Rohit ने खुद यह struggle experience किया। Hindi medium background से आकर IT company join की,
                    लेकिन English meetings में silent रहना पड़ता था।
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    75 दिनों की structured practice से उन्होंने English में confidence gain किया। और तब उन्होंने सोचा —
                    "यह platform क्यों नहीं बनाते जो हर Hindi speaker के लिए यही काम करे?"
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Today, 75 Days Hard English is a community-driven, open-source platform helping thousands of
                    Hindi speakers achieve fluency, confidence, and career growth.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { year: '2023', event: 'Platform idea conceived after personal struggle' },
                    { year: '2024', event: 'First 100 students complete the 75-day challenge' },
                    { year: '2024', event: 'AI tutor launched with grammar checking' },
                    { year: '2025', event: 'Open-sourced the entire platform' },
                    { year: '2025', event: '10,000+ active students milestone' },
                    { year: '2026', event: 'Most advanced version with full AI integration' },
                  ].map(({ year, event }) => (
                    <div key={year} className="flex items-start gap-3">
                      <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg shrink-0 mt-0.5">{year}</span>
                      <p className="text-sm text-slate-300">{event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white/2 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-3">Our Core Values</h2>
              <p className="text-slate-400">What we believe in and how we build</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map(({ icon: Icon, title, desc, color }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/5 bg-surface-800/60 p-6 group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl font-black text-white mb-3">The Team</h2>
              <p className="text-slate-400">People behind the platform</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {TEAM.map(({ name, role, emoji, desc }) => (
                <motion.div key={name} variants={fadeUp} className="rounded-2xl border border-white/5 bg-white/2 p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 flex items-center justify-center text-2xl shrink-0">{emoji}</div>
                  <div>
                    <h3 className="font-bold text-white">{name}</h3>
                    <p className="text-xs text-indigo-400 font-semibold mb-2">{role}</p>
                    <p className="text-sm text-slate-400">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── Open Source ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-emerald-950/30 border-y border-emerald-500/10">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <motion.div variants={fadeUp}>
              <div className="text-5xl mb-6">💚</div>
              <h2 className="text-3xl font-black text-white mb-4">Proudly Open Source</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                We believe education should be transparent, community-driven, and freely accessible.
                75 Days Hard English is open source under the MIT License.
                Anyone can view, fork, contribute, or build on top of it.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['MIT License', 'Community Driven', 'Transparent', 'Free Forever', 'No Tracking'].map(b => (
                  <span key={b} className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    ✅ {b}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all">
                  <Code2 size={16} /> Star on GitHub
                </a>
                <Link href="/register"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                  Start Learning <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}
