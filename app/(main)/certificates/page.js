'use client';
// ============================================================
// CERTIFICATES PAGE — Course completion certificates
// Features: earned certificates, in-progress milestones,
// printable/shareable certificate previews, download, share
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Award, Download, Share2, Eye, Lock, CheckCircle2,
  Star, Trophy, Zap, Target, Calendar, ArrowRight,
  X, GraduationCap, Shield, Medal,
} from 'lucide-react';
import { useGamificationStore } from '@/store/useGamificationStore';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

const CERT_COLORS = {
  gold:     { from: '#f59e0b', to: '#d97706', badge: 'text-amber-400 bg-amber-500/15 border-amber-500/30', ring: 'ring-amber-400/40' },
  platinum: { from: '#94a3b8', to: '#64748b', badge: 'text-slate-300 bg-slate-500/15 border-slate-500/30', ring: 'ring-slate-400/40' },
  blue:     { from: '#6366f1', to: '#4f46e5', badge: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/30', ring: 'ring-indigo-400/40' },
  green:    { from: '#10b981', to: '#059669', badge: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30', ring: 'ring-emerald-400/40' },
  purple:   { from: '#8b5cf6', to: '#7c3aed', badge: 'text-violet-400 bg-violet-500/15 border-violet-500/30', ring: 'ring-violet-400/40' },
};

const ALL_CERTS = [
  {
    id: 'beginner-complete',
    title: '75 Days Hard English',
    subtitle: 'Complete Course Certificate',
    desc: 'Awarded upon completing all 75 days of the challenge.',
    tier: 'gold',
    icon: '🏆',
    requirement: 75,
    requirementLabel: 'Complete all 75 days',
    category: 'Challenge',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['Grammar Mastery', 'Vocabulary B2', 'Speaking Fluency', 'Writing Skills', 'Pronunciation'],
  },
  {
    id: 'days-7',
    title: 'Week 1 Warrior',
    subtitle: '7-Day Streak Certificate',
    desc: 'Awarded for completing the first 7 days of the challenge.',
    tier: 'green',
    icon: '🌱',
    requirement: 7,
    requirementLabel: 'Complete Days 1–7',
    category: 'Milestone',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['Basic Grammar', 'Foundational Vocabulary', 'Daily Consistency'],
  },
  {
    id: 'days-15',
    title: 'Two-Week Champion',
    subtitle: '15-Day Streak Certificate',
    desc: 'Awarded for completing 15 consecutive days of learning.',
    tier: 'blue',
    icon: '⚡',
    requirement: 15,
    requirementLabel: 'Complete Days 1–15',
    category: 'Milestone',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['Present & Past Tenses', 'Intermediate Vocabulary', 'Sentence Structure'],
  },
  {
    id: 'days-30',
    title: 'Monthly Master',
    subtitle: '30-Day Dedication Certificate',
    desc: 'Awarded for 30 days of consistent English practice.',
    tier: 'blue',
    icon: '🎯',
    requirement: 30,
    requirementLabel: 'Complete Days 1–30',
    category: 'Milestone',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['All Tenses', 'Modal Verbs', 'Spoken English A2–B1'],
  },
  {
    id: 'days-50',
    title: 'Halfway Hero',
    subtitle: '50-Day Excellence Certificate',
    desc: 'You made it past the halfway mark — a true dedication to English.',
    tier: 'purple',
    icon: '🚀',
    requirement: 50,
    requirementLabel: 'Complete Days 1–50',
    category: 'Milestone',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['Advanced Grammar', 'Professional Vocabulary', 'Writing B1–B2'],
  },
  {
    id: 'grammar-ace',
    title: 'Grammar Ace',
    subtitle: 'Grammar Proficiency Certificate',
    desc: 'Awarded for scoring 90%+ on the Grammar Assessment.',
    tier: 'purple',
    icon: '📖',
    requirement: 90,
    requirementLabel: 'Score 90%+ in Grammar Assessment',
    category: 'Assessment',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['All 12 Tenses', 'Modal Verbs', 'Active & Passive Voice', 'Conditionals'],
  },
  {
    id: 'vocab-master',
    title: 'Vocabulary Master',
    subtitle: 'Vocabulary Excellence Certificate',
    desc: 'Awarded for mastering 500+ words in the Vocabulary Bank.',
    tier: 'gold',
    icon: '🔤',
    requirement: 500,
    requirementLabel: 'Master 500+ vocabulary words',
    category: 'Vocabulary',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['B2 Vocabulary Range', 'Word Forms', 'Contextual Usage', 'Idiomatic English'],
  },
  {
    id: 'streak-21',
    title: '21-Day Habit',
    subtitle: 'Consistency Achievement Certificate',
    desc: 'Science says it takes 21 days to build a habit. You did it!',
    tier: 'green',
    icon: '🔥',
    requirement: 21,
    requirementLabel: '21-day learning streak',
    category: 'Achievement',
    issuer: '75 Days Hard English',
    earned: false,
    progress: 0,
    earnedDate: null,
    skills: ['Daily Discipline', 'Learning Consistency', 'Time Management'],
  },
];

// ── Certificate Preview Modal ──────────────────────────────────
function CertificateModal({ cert, onClose }) {
  const color = CERT_COLORS[cert.tier];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Certificate Design */}
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border-2 ring-4 ${color.ring} mb-4`}
          style={{ borderColor: color.from }}>
          {/* Decorative border pattern */}
          <div className="absolute inset-2 rounded-2xl border opacity-20" style={{ borderColor: color.from }} />
          <div className="absolute inset-4 rounded-xl border opacity-10" style={{ borderColor: color.from }} />

          {/* Header */}
          <div className="relative text-center pt-10 pb-6 px-10">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}>
                {cert.icon}
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.3em] mb-1" style={{ color: color.from }}>Certificate of Achievement</p>
            <h2 className="text-3xl font-black text-white mb-1">{cert.title}</h2>
            <p className="text-slate-400 text-sm">{cert.subtitle}</p>
          </div>

          {/* Body */}
          <div className="text-center px-10 pb-6">
            <p className="text-slate-400 text-sm mb-6">This certifies that</p>
            <div className="inline-block px-10 py-2 rounded-xl border mb-4" style={{ borderColor: color.from + '60', background: color.from + '10' }}>
              <p className="text-2xl font-black text-white">Your Name</p>
            </div>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">{cert.desc}</p>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {cert.skills.map(skill => (
                <span key={skill} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: color.from + '50', color: color.from, background: color.from + '15' }}>
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/8">
              <div className="text-center">
                <p className="text-xs text-slate-600 mb-1">Date Issued</p>
                <p className="text-sm font-bold text-white">{cert.earned ? cert.earnedDate : 'Not yet earned'}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-600 mb-1">Issued by</p>
                <p className="text-sm font-bold text-white">{cert.issuer}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button onClick={onClose} className="text-sm text-slate-400 hover:text-white border border-white/10 px-4 py-2 rounded-xl transition-all flex items-center gap-2">
            <X size={14} /> Close
          </button>
          {cert.earned ? (
            <div className="flex gap-2">
              <button className="btn-secondary text-sm flex items-center gap-2 px-5 py-2.5">
                <Download size={14} /> Download PDF
              </button>
              <button className="btn-primary text-sm flex items-center gap-2 px-5 py-2.5">
                <Share2 size={14} /> Share
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">Complete the requirement to unlock this certificate.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Certificate Card ──────────────────────────────────────────
function CertCard({ cert, onPreview }) {
  const color = CERT_COLORS[cert.tier];

  return (
    <motion.div
      variants={fadeUp}
      whileHover={cert.earned ? { y: -4 } : { scale: 1.01 }}
      className={`relative rounded-2xl border overflow-hidden transition-all ${cert.earned ? `bg-gradient-to-br from-white/6 to-white/2 ring-1 ${color.ring}` : 'bg-white/2 border-white/6 opacity-80'}`}
      style={{ borderColor: cert.earned ? color.from + '50' : undefined }}
    >
      {/* Tier ribbon */}
      <div className="absolute top-4 right-4">
        {cert.earned ? (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize ${color.badge}`}>
            {cert.tier}
          </span>
        ) : (
          <Lock size={14} className="text-slate-600" />
        )}
      </div>

      <div className="p-6">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg ${cert.earned ? '' : 'grayscale opacity-50'}`}
          style={cert.earned ? { background: `linear-gradient(135deg, ${color.from}, ${color.to})` } : { background: '#ffffff15' }}>
          {cert.icon}
        </div>

        <h3 className={`font-bold mb-1 ${cert.earned ? 'text-white' : 'text-slate-500'}`}>{cert.title}</h3>
        <p className="text-xs text-slate-500 mb-3">{cert.subtitle}</p>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">{cert.desc}</p>

        {/* Progress or earned */}
        {cert.earned ? (
          <div className="flex items-center gap-2 text-xs text-emerald-400 mb-4">
            <CheckCircle2 size={13} />
            <span>Earned · {cert.earnedDate}</span>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-600">{cert.requirementLabel}</span>
              <span className="text-slate-500">{cert.progress}%</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${cert.progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color.from}, ${color.to})` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onPreview(cert)}
          className={`w-full flex items-center justify-center gap-2 text-xs py-2.5 rounded-xl border transition-all ${cert.earned ? 'hover:bg-white/8 text-slate-300 border-white/10' : 'text-slate-600 border-white/6 hover:text-slate-400'}`}
        >
          <Eye size={12} />
          {cert.earned ? 'View & Download' : 'Preview Certificate'}
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function CertificatesPage() {
  const { xp = 0, topicsCompleted = 0 } = useGamificationStore();
  const [preview, setPreview]   = useState(null);
  const [catFilter, setCatFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(ALL_CERTS.map(c => c.category)))];
  const filtered   = catFilter === 'All' ? ALL_CERTS : ALL_CERTS.filter(c => c.category === catFilter);
  const earned     = ALL_CERTS.filter(c => c.earned);

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">Certificates</h1>
            <p className="text-slate-400 text-sm">{earned.length} earned · {ALL_CERTS.length - earned.length} remaining</p>
          </div>
        </div>
      </motion.div>

      {/* ── Progress Card ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8 border-amber-500/20 bg-amber-500/5"
      >
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 text-2xl">
                🏆
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-800 border-2 border-amber-500 flex items-center justify-center">
                <span className="text-[9px] font-black text-amber-400">{earned.length}</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-white">{earned.length === 0 ? 'Start Your Journey' : `${earned.length} Certificate${earned.length > 1 ? 's' : ''} Earned`}</p>
              <p className="text-sm text-slate-400">{topicsCompleted} days completed · {xp.toLocaleString()} XP</p>
            </div>
          </div>
          <div className="ml-auto">
            <Link href="/75-days-challenge" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
              Continue Learning <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Path to next certificate */}
        <div className="mt-5 pt-4 border-t border-amber-500/15">
          <p className="text-xs text-amber-400 font-bold mb-3">🎯 Next Certificate to Earn</p>
          <div className="flex items-center gap-3">
            <span className="text-xl">🌱</span>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <p className="text-white font-semibold">Week 1 Warrior</p>
                <span className="text-slate-500">{Math.min(topicsCompleted, 7)}/7 days</span>
              </div>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((topicsCompleted / 7) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── How to Earn ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
      >
        {[
          { icon: '📅', title: 'Complete Days', desc: 'Finish Days 1–75 to unlock milestone certificates' },
          { icon: '✅', title: 'Pass Assessments', desc: 'Score 90%+ in grammar and vocabulary tests' },
          { icon: '🔥', title: 'Maintain Streaks', desc: 'Keep a 21-day+ daily learning streak' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="card p-4 flex items-start gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <p className="text-sm font-bold text-white">{title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Filter ───────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${catFilter === cat ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* ── Certificate Grid ─────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {filtered.map(cert => (
          <CertCard key={cert.id} cert={cert} onPreview={setPreview} />
        ))}
      </motion.div>

      {/* ── Certificate Preview Modal ────────────────────── */}
      <AnimatePresence>
        {preview && <CertificateModal cert={preview} onClose={() => setPreview(null)} />}
      </AnimatePresence>
    </div>
  );
}
