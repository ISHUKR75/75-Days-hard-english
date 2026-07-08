'use client';
// ============================================================
// PROFILE PAGE — User profile with stats, badges, progress
// Features: Edit profile, CEFR level, badges, skills, settings
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User, Edit2, Zap, Flame, Trophy, Target, BookOpen,
  Calendar, Clock, Star, Award, CheckCircle2, Globe,
  BarChart2, TrendingUp, Settings, Camera, Save, X,
  GraduationCap, Brain, Mic, PenTool, Volume2, Headphones,
  ChevronRight, ArrowRight,
} from 'lucide-react';
import { useGamificationStore } from '@/store/useGamificationStore';
import useUserStore from '@/store/userStore';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const CEFR_META = {
  A0: { label: 'Absolute Beginner', color: 'text-slate-400',  bg: 'bg-slate-500/10',  desc: 'Just starting your English journey',            pct: 5  },
  A1: { label: 'Beginner',          color: 'text-emerald-400', bg: 'bg-emerald-500/10', desc: 'Basic greetings and simple sentences',          pct: 15 },
  A2: { label: 'Elementary',        color: 'text-sky-400',     bg: 'bg-sky-500/10',    desc: 'Simple conversations and common topics',        pct: 30 },
  B1: { label: 'Intermediate',      color: 'text-violet-400',  bg: 'bg-violet-500/10', desc: 'Handle most everyday situations in English',    pct: 50 },
  B2: { label: 'Upper-Intermediate',color: 'text-amber-400',   bg: 'bg-amber-500/10',  desc: 'Fluent conversations and professional writing', pct: 70 },
  C1: { label: 'Advanced',          color: 'text-rose-400',    bg: 'bg-rose-500/10',   desc: 'Complex topics and nuanced expression',         pct: 85 },
  C2: { label: 'Proficient',        color: 'text-red-400',     bg: 'bg-red-500/10',    desc: 'Near-native level fluency and precision',       pct: 98 },
};

const SKILL_BARS = [
  { skill: 'Grammar',       icon: BookOpen,    score: 88, color: 'from-indigo-500 to-blue-500'   },
  { skill: 'Vocabulary',    icon: Globe,       score: 82, color: 'from-amber-500 to-yellow-500'  },
  { skill: 'Speaking',      icon: Mic,         score: 74, color: 'from-pink-500 to-rose-500'     },
  { skill: 'Writing',       icon: PenTool,     score: 79, color: 'from-rose-500 to-red-500'      },
  { skill: 'Listening',     icon: Headphones,  score: 85, color: 'from-sky-500 to-blue-500'      },
  { skill: 'Pronunciation', icon: Volume2,     score: 70, color: 'from-cyan-500 to-teal-500'     },
];

export default function ProfilePage() {
  const {
    xp = 0, level = 1, streak = 0, topicsCompleted = 0,
    totalQuestionsAttempted = 0, totalQuestionsCorrect = 0,
    badges = [], getXPProgress, stats,
  } = useGamificationStore();
  const { user, updateProfile } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name,  setName]  = useState(user?.name  || 'Student');
  const [email, setEmail] = useState(user?.email || '');
  const [city,  setCity]  = useState('India');
  const [goal,  setGoal]  = useState('Fluent English for job');

  const accuracy   = totalQuestionsAttempted > 0 ? Math.round((totalQuestionsCorrect / totalQuestionsAttempted) * 100) : 0;
  const xpProgress = getXPProgress ? getXPProgress() : { percentage: 0, current: xp, required: 100 };
  const cefrLevel  = user?.cefrLevel || 'A1';
  const cefrMeta   = CEFR_META[cefrLevel] || CEFR_META.A1;

  const handleSave = () => { updateProfile?.({ name, email }); setIsEditing(false); };

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl md:text-4xl font-black text-white">My Profile</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="flex items-center gap-2 text-sm btn-primary px-5 py-2.5"
            >
              {isEditing ? <><Save size={14} /> Save</> : <><Edit2 size={14} /> Edit Profile</>}
            </button>
            {isEditing && (
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-white/10 px-4 py-2.5 rounded-xl transition-all">
                <X size={14} /> Cancel
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column: Profile Card ───────────────────── */}
        <div className="space-y-5">
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />

            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-primary-500/30 mx-auto">
                {(name || 'S')[0].toUpperCase()}
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Camera size={14} className="text-slate-300" />
                </button>
              )}
            </div>

            {/* Name */}
            {isEditing ? (
              <input value={name} onChange={e => setName(e.target.value)} className="w-full text-center text-xl font-black bg-white/8 border border-white/15 rounded-xl px-3 py-2 text-white mb-2 focus:outline-none focus:border-primary-500/50" />
            ) : (
              <h2 className="text-2xl font-black text-white mb-1">{name}</h2>
            )}

            {/* Email */}
            {isEditing ? (
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full text-center text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-slate-300 placeholder:text-slate-600 mb-2 focus:outline-none" />
            ) : (
              <p className="text-sm text-slate-500 mb-3">{email || 'No email set'}</p>
            )}

            {/* CEFR Level Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${cefrMeta.bg} mb-4`}>
              <GraduationCap size={14} className={cefrMeta.color} />
              <span className={`text-sm font-bold ${cefrMeta.color}`}>{cefrLevel} — {cefrMeta.label}</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">{cefrMeta.desc}</p>

            {/* XP Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-violet-400 font-semibold">Level {level}</span>
                <span className="text-slate-500">{xpProgress?.percentage || 0}% to Level {level + 1}</span>
              </div>
              <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-primary-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress?.percentage || 0}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

            {/* Goal */}
            {isEditing ? (
              <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="Learning goal…" className="w-full text-center text-sm bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-slate-300 focus:outline-none" />
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <Target size={13} className="text-primary-400" />
                <span>{goal}</span>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
            <h3 className="font-bold text-white mb-4 text-sm">Quick Stats</h3>
            <div className="space-y-3">
              {[
                { icon: Zap,      label: 'Total XP',       value: xp.toLocaleString(),                     color: 'text-violet-400'  },
                { icon: Flame,    label: 'Current Streak',  value: `${streak} days`,                        color: 'text-orange-400'  },
                { icon: Calendar, label: 'Days Completed',  value: `${topicsCompleted}/75`,                 color: 'text-indigo-400'  },
                { icon: Target,   label: 'Accuracy',        value: `${accuracy}%`,                         color: 'text-emerald-400' },
                { icon: Trophy,   label: 'Badges Earned',   value: `${badges.length}`,                     color: 'text-yellow-400'  },
                { icon: BarChart2,label: 'Questions Done',  value: totalQuestionsAttempted.toLocaleString(), color: 'text-cyan-400'  },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Icon size={13} className={color} /> {label}
                  </div>
                  <span className={`text-sm font-bold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Nav Links */}
          <div className="space-y-2">
            {[
              { href: '/settings',     icon: Settings,      label: 'Account Settings' },
              { href: '/achievements', icon: Award,         label: 'My Badges'        },
              { href: '/progress',     icon: BarChart2,     label: 'Full Analytics'   },
              { href: '/certificates', icon: GraduationCap, label: 'Certificates'     },
            ].map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/8 hover:bg-white/6 hover:border-white/15 transition-all group text-sm">
                <div className="flex items-center gap-2 text-slate-400 group-hover:text-white transition-colors">
                  <Icon size={14} /> {label}
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right Column: Skills + CEFR ─────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Bars */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6">
            <h3 className="font-bold text-white mb-5 flex items-center gap-2">
              <Brain size={16} className="text-emerald-400" /> Skill Levels
            </h3>
            <div className="space-y-4">
              {SKILL_BARS.map(({ skill, icon: Icon, score, color }, i) => (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Icon size={14} className="text-slate-400" /> {skill}
                    </div>
                    <span className="text-sm font-bold text-white">{score}%</span>
                  </div>
                  <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CEFR Scale */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
            <h3 className="font-bold text-white mb-5 flex items-center gap-2">
              <GraduationCap size={16} className="text-indigo-400" /> CEFR Level Scale
            </h3>
            <div className="space-y-2">
              {Object.entries(CEFR_META).map(([key, meta]) => {
                const isActive = key === cefrLevel;
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isActive ? `${meta.bg} ring-1 ring-white/10` : 'bg-white/2'}`}
                  >
                    <span className={`text-xs font-black w-8 shrink-0 ${meta.color}`}>{key}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>{meta.label}</p>
                        {isActive && <span className="text-[10px] bg-primary-500/20 text-primary-300 px-1.5 py-0.5 rounded-full border border-primary-500/30">Your Level</span>}
                      </div>
                      <p className="text-[10px] text-slate-600">{meta.desc}</p>
                    </div>
                    <div className="w-20 h-1.5 bg-white/8 rounded-full overflow-hidden shrink-0">
                      <div
                        className={`h-full rounded-full ${isActive ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-white/10'}`}
                        style={{ width: `${meta.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Badges */}
          {badges.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Award size={16} className="text-yellow-400" /> Recent Badges
                </h3>
                <Link href="/achievements" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  View all <ArrowRight size={12} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {badges.slice(0, 8).map((badgeId, i) => (
                  <div key={badgeId} title={badgeId} className="w-12 h-12 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-2xl">
                    🏅
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Personal Records */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Trophy size={16} className="text-yellow-400" /> Personal Records
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: '🔥', label: 'Best Streak',       value: `${stats?.longestStreak || streak || 0} days` },
                { icon: '⚡', label: 'Most XP in a Day',  value: '340 XP'   },
                { icon: '🎯', label: 'Best Accuracy',     value: '100%'     },
                { icon: '📝', label: 'Most Questions',    value: '52 Q/day' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="text-center p-4 bg-white/4 rounded-xl border border-white/8">
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="text-base font-black text-white">{value}</p>
                  <p className="text-xs text-slate-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
