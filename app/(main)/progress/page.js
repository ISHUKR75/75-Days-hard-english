'use client';
// ============================================================
// PROGRESS PAGE — Detailed progress tracking with charts
// Features: Topic progress, accuracy graphs, weak areas, time spent
// ============================================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Target, CheckCircle2, XCircle, Clock, Zap,
  Flame, Award, BarChart2, Calendar, BookOpen, Brain, Star,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import useUserStore from '@/store/userStore';
import DAYS_75_TOPICS from '@/lib/topics';

const CHART_COLORS = ['#6366f1','#d946ef','#10b981','#f59e0b','#f43f5e','#0ea5e9'];

export default function ProgressPage() {
  const {
    xp, level, levelXP, levelXPRequired, coins, streak, longestStreak,
    totalQuestionsAttempted, totalCorrectAnswers, totalWrongAnswers,
    totalTopicsCompleted, totalLessonsCompleted, totalWordsLearned,
    totalTimeSpent, getLevelProgress, getAccuracy,
  } = useUserStore();

  const accuracy = getAccuracy();
  const levelPct = getLevelProgress();
  const currentDay = Math.min(totalLessonsCompleted + 1, 75);
  const progressPct = Math.round((totalTopicsCompleted / 75) * 100);

  // Weekly mock data
  const weeklyData = [
    { day:'Mon', xp:45, q:12, accuracy:88 },
    { day:'Tue', xp:80, q:20, accuracy:92 },
    { day:'Wed', xp:60, q:15, accuracy:85 },
    { day:'Thu', xp:100, q:25, accuracy:94 },
    { day:'Fri', xp:70, q:18, accuracy:89 },
    { day:'Sat', xp:120, q:30, accuracy:90 },
    { day:'Sun', xp:90, q:22, accuracy:93 },
  ];

  // Topic progress by category
  const categoryData = [
    { name:'Grammar',     completed: Math.min(totalTopicsCompleted, 50), total:50 },
    { name:'Vocabulary',  completed: Math.max(0, totalTopicsCompleted - 50), total:16 },
    { name:'Writing',     completed: 0, total:5 },
    { name:'Revision',    completed: 0, total:4 },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <h1 className="text-4xl font-black text-white mb-1">📊 My Progress</h1>
        <p className="text-slate-400">Track your English learning journey — Day {currentDay} of 75</p>
      </motion.div>

      {/* Top Stats */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={{ visible:{ transition:{ staggerChildren:0.08 } } }} initial="hidden" animate="visible">
        {[
          { icon:Zap,          label:'Total XP',        value:xp.toLocaleString(),  color:'text-violet-400', bg:'bg-violet-500/10' },
          { icon:Flame,        label:'Day Streak',      value:`${streak}🔥`,          color:'text-orange-400',bg:'bg-orange-500/10' },
          { icon:Target,       label:'Accuracy',        value:`${accuracy}%`,         color:'text-emerald-400',bg:'bg-emerald-500/10' },
          { icon:Clock,        label:'Time Spent',      value:`${totalTimeSpent}m`,   color:'text-sky-400',   bg:'bg-sky-500/10' },
        ].map(({ icon:Icon, label, value, color, bg }) => (
          <motion.div key={label} variants={{ hidden:{opacity:0,y:16}, visible:{opacity:1,y:0} }}
            className={`card p-5 flex items-center gap-3 ${bg}`}>
            <Icon size={24} className={color} />
            <div>
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 75-Day Progress */}
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
        className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">75-Day Progress</h2>
            <p className="text-sm text-slate-400">{totalTopicsCompleted} of 75 days completed</p>
          </div>
          <span className="text-3xl font-black gradient-text">{progressPct}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/8 overflow-hidden mb-3">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            initial={{width:0}} animate={{width:`${progressPct}%`}} transition={{duration:1.5}} />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center mt-4">
          <div>
            <p className="text-xl font-black text-white">{totalQuestionsAttempted}</p>
            <p className="text-xs text-slate-500">Questions Attempted</p>
          </div>
          <div>
            <p className="text-xl font-black text-emerald-400">{totalCorrectAnswers}</p>
            <p className="text-xs text-slate-500">Correct Answers</p>
          </div>
          <div>
            <p className="text-xl font-black text-rose-400">{totalWrongAnswers}</p>
            <p className="text-xs text-slate-500">Wrong Answers</p>
          </div>
        </div>
      </motion.div>

      {/* Weekly Activity + Accuracy Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="card p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-primary-400" /> Weekly XP
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#64748b" style={{fontSize:'11px'}} />
              <YAxis stroke="#64748b" style={{fontSize:'11px'}} />
              <Tooltip contentStyle={{ backgroundColor:'#1e293b', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px' }} />
              <Bar dataKey="xp" radius={[6,6,0,0]}>
                {weeklyData.map((_,i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.25}} className="card p-5">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" /> Weekly Accuracy
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#64748b" style={{fontSize:'11px'}} />
              <YAxis domain={[70,100]} stroke="#64748b" style={{fontSize:'11px'}} />
              <Tooltip contentStyle={{ backgroundColor:'#1e293b', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px' }} />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2.5}
                dot={{ fill:'#10b981', r:4 }} activeDot={{ r:6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Category Progress */}
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="card p-6">
        <h3 className="font-bold text-white mb-5 flex items-center gap-2">
          <BookOpen size={18} className="text-amber-400" /> Progress by Category
        </h3>
        <div className="space-y-4">
          {categoryData.map(({ name, completed, total }, i) => {
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
            return (
              <div key={name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white font-semibold">{name}</span>
                  <span className="text-slate-400">{completed}/{total} ({pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: CHART_COLORS[i] }}
                    initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:1, delay:0.3+i*0.1}} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.35}}>
        {[
          { icon:Award, label:'Longest Streak',  value:longestStreak, unit:'days',  color:'text-amber-400',  bg:'bg-amber-500/10' },
          { icon:Brain, label:'Words Learned',   value:totalWordsLearned, unit:'words',color:'text-indigo-400',bg:'bg-indigo-500/10' },
          { icon:Star,  label:'Level',            value:`Lv.${level}`,unit:'',      color:'text-violet-400', bg:'bg-violet-500/10' },
        ].map(({ icon:Icon, label, value, unit, color, bg }) => (
          <div key={label} className={`card p-5 flex items-center gap-3 ${bg}`}>
            <Icon size={24} className={color} />
            <div>
              <p className={`text-2xl font-black ${color}`}>{value}{unit && <span className="text-sm ml-1">{unit}</span>}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
