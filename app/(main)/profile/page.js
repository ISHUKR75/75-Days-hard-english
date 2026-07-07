'use client';
// Profile Page — User profile with stats, badges, and edit form

import { useState } from 'react';
import {
  User, Edit2, Save, Flame, Zap, Trophy,
  Target, BookOpen, Clock, Star, Globe,
  Camera, CheckCircle2, Award,
} from 'lucide-react';
import useUserStore from '@/store/userStore';
import ProgressBar  from '@/components/ui/ProgressBar';

export default function ProfilePage() {
  const {
    user, xp, coins, streak, level, levelXP, levelXPRequired,
    totalQuestionsAttempted, totalCorrectAnswers, totalLessonsCompleted,
    totalWordsLearned, totalTimeSpent, badges, getLevelProgress, getAccuracy,
    updateProfile,
  } = useUserStore();

  const [editing, setEditing] = useState(false);
  const [form,    setForm]    = useState({ name: user?.name || '', email: user?.email || '' });

  const accuracy = getAccuracy();
  const lvlProg  = getLevelProgress();

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl text-white font-black shadow-glow-primary">
              {user?.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-surface-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
              <Camera size={13} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input text-sm w-full max-w-sm" placeholder="Your name" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input text-sm w-full max-w-sm" placeholder="Email address" type="email" />
                <div className="flex gap-2">
                  <button onClick={handleSave} className="btn-primary text-sm px-4 py-2 flex items-center gap-1.5">
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => setEditing(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-black text-white">{user?.name || 'Student'}</h2>
                  <button onClick={() => setEditing(true)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/8 transition-all">
                    <Edit2 size={14} />
                  </button>
                </div>
                <p className="text-slate-500 text-sm mb-2">{user?.email || 'No email set'}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-primary">Level {level}</span>
                  <span className="badge bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    🔥 {streak} day streak
                  </span>
                  <span className="badge bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    ⚡ {xp.toLocaleString()} XP
                  </span>
                  <span className="badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    CEFR: {user?.cefrLevel || 'A1'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Level progress */}
        <div className="mt-5 pt-5 border-t border-white/5">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400 font-medium">Level {level}</span>
            <span className="text-slate-500 text-xs">{levelXP} / {levelXPRequired} XP to Level {level + 1}</span>
          </div>
          <ProgressBar value={lvlProg} variant="xp" size="md" animated />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '🔥', value: streak,                       label: 'Day Streak' },
          { icon: '⚡', value: xp.toLocaleString(),          label: 'Total XP' },
          { icon: '🪙', value: coins.toLocaleString(),       label: 'Coins' },
          { icon: '🎯', value: `${accuracy}%`,               label: 'Accuracy' },
          { icon: '❓', value: totalQuestionsAttempted,       label: 'Questions Done' },
          { icon: '✅', value: totalCorrectAnswers,           label: 'Correct Answers' },
          { icon: '📚', value: totalLessonsCompleted,         label: 'Lessons Done' },
          { icon: '📖', value: totalWordsLearned,             label: 'Words Learned' },
        ].map(({ icon, value, label }) => (
          <div key={label} className="card p-4 text-center">
            <span className="text-2xl block mb-2">{icon}</span>
            <p className="text-xl font-black text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Award size={18} className="text-amber-400" /> Badges ({badges.length})
        </h3>
        {badges.length === 0 ? (
          <div className="empty-state py-8">
            <Star size={32} className="text-slate-600 mb-3" />
            <p className="text-slate-500 text-sm">Complete lessons to earn your first badge!</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {badges.map((badge) => (
              <div key={badge.id} title={badge.name} className="achievement-card unlocked">
                <span className="text-2xl">{badge.emoji || '🏅'}</span>
                <span className="text-[10px] text-slate-400">{badge.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About the challenge */}
      <div className="card p-5 border-primary-500/20 bg-primary-500/5">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <Globe size={18} className="text-primary-400" /> About 75 Days Hard English
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          75 Days Hard English is a structured English learning challenge that takes you from
          absolute beginner (A0) to professional fluency (B2+) in 75 days. Each day covers
          a specific grammar topic, vocabulary set, or skill area — ensuring complete, systematic
          coverage of everything you need for daily life, office work, and professional communication.
        </p>
      </div>
    </div>
  );
}
