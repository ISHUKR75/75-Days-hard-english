'use client';
// ============================================================
// DAILY PRACTICE PAGE — Today's exercises + streak + challenges
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Target, CheckCircle2, Play, Calendar, Zap, BookOpen,
  Mic, PenTool, Volume2, ArrowRight, Star, Clock,
} from 'lucide-react';
import Link from 'next/link';
import useUserStore from '@/store/userStore';
import { getTopicByDay } from '@/lib/topics';

const DAILY_CHALLENGES = [
  { id:'q10',   icon:'✍️', title:'Answer 10 Questions',   desc:'Practice Hindi → English',    xp:50, link:'/practice/day-1',         color:'from-indigo-500 to-blue-500' },
  { id:'speak5',icon:'🎤', title:'Speak 5 Sentences',     desc:'Pronunciation practice',       xp:30, link:'/speaking',               color:'from-pink-500 to-rose-500' },
  { id:'vocab5',icon:'📚', title:'Learn 5 New Words',     desc:'Build vocabulary',             xp:25, link:'/vocabulary',             color:'from-amber-500 to-orange-500' },
  { id:'read1', icon:'📖', title:'Read 1 Passage',        desc:'Reading comprehension',        xp:20, link:'/grammar-reference',      color:'from-emerald-500 to-teal-500' },
  { id:'write1',icon:'✉️', title:'Write 1 Email',         desc:'Professional writing',         xp:40, link:'/writing',                color:'from-violet-500 to-purple-500' },
];

export default function DailyPracticePage() {
  const [completed, setCompleted] = useState({});
  const { streak, totalQuestionsAttempted, totalCorrectAnswers, totalLessonsCompleted, addXP } = useUserStore();
  const currentDay = Math.min(totalLessonsCompleted + 1, 75);
  const todayTopic = getTopicByDay(currentDay);
  const accuracy = totalQuestionsAttempted > 0
    ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100) : 0;
  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-8 max-w-3xl">
      {/* Header */}
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📅</span>
          <div>
            <h1 className="text-3xl font-black text-white">Daily Practice</h1>
            <p className="text-slate-400 text-sm">{new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</p>
          </div>
        </div>
      </motion.div>

      {/* Streak + Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon:Flame,  val:`${streak}🔥`, label:'Day Streak', color:'text-orange-400', bg:'bg-orange-500/10' },
          { icon:Target, val:`${accuracy}%`, label:'Accuracy',  color:'text-emerald-400',bg:'bg-emerald-500/10'},
          { icon:Zap,    val:completedCount + '/5', label:'Done Today', color:'text-primary-400', bg:'bg-primary-500/10'},
        ].map(({ icon:Icon, val, label, color, bg }) => (
          <motion.div key={label} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
            className={`card p-4 flex items-center gap-3 ${bg}`}>
            <Icon size={20} className={color} />
            <div>
              <p className={`text-xl font-black ${color}`}>{val}</p>
              <p className="text-[10px] text-slate-500">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Today's Topic */}
      {todayTopic && (
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="card p-5 border-primary-500/20 bg-primary-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{todayTopic.emoji}</span>
              <div>
                <p className="text-xs text-primary-400 font-semibold">Today — Day {currentDay}</p>
                <h2 className="text-xl font-black text-white">{todayTopic.title}</h2>
                <p className="text-xs text-slate-400 capitalize">{todayTopic.type} · CEFR {todayTopic.cefr}</p>
              </div>
            </div>
            <Link href={`/75-days-challenge/${currentDay}`}
              className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 shrink-0">
              <Play size={14} fill="currentColor" /> Start Lesson
            </Link>
          </div>
        </motion.div>
      )}

      {/* Daily Challenges */}
      <div>
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          <Star size={18} className="text-amber-400" /> Today's Challenges
          <span className="text-sm font-normal text-slate-500">({completedCount}/5 done)</span>
        </h2>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-white/8 overflow-hidden mb-5">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            animate={{ width:`${(completedCount/5)*100}%` }} transition={{duration:0.6}} />
        </div>

        <div className="space-y-3">
          {DAILY_CHALLENGES.map((challenge, i) => (
            <motion.div key={challenge.id}
              initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*0.07}}
              className={`card p-4 flex items-center gap-4 transition-all ${
                completed[challenge.id] ? 'border-emerald-500/30 bg-emerald-500/5' : 'hover:border-white/15'
              }`}>
              <div className="text-2xl">{challenge.icon}</div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${completed[challenge.id] ? 'text-emerald-300 line-through opacity-70' : 'text-white'}`}>
                  {challenge.title}
                </p>
                <p className="text-xs text-slate-500">{challenge.desc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-violet-300 bg-violet-500/15 px-2 py-0.5 rounded-lg">+{challenge.xp} XP</span>
                {completed[challenge.id] ? (
                  <CheckCircle2 size={20} className="text-emerald-400" />
                ) : (
                  <Link href={challenge.link}
                    onClick={() => { setCompleted(p => ({...p,[challenge.id]:true})); addXP(challenge.xp); }}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${challenge.color} hover:opacity-90 transition-opacity flex items-center gap-1`}>
                    Go <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      {completedCount === 5 && (
        <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
          className="card p-6 text-center border-amber-500/30 bg-amber-500/5">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-2xl font-black text-white mb-2">Daily Goal Complete!</h3>
          <p className="text-slate-400 mb-4">Congratulations! You've completed all today's challenges.</p>
          <p className="text-amber-300 font-semibold">+{DAILY_CHALLENGES.reduce((s,c) => s+c.xp, 0)} XP earned today! 🏆</p>
        </motion.div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href:'/75-days-challenge', icon:Calendar,  label:'75 Days',      color:'text-indigo-400' },
          { href:'/vocabulary',        icon:BookOpen,  label:'Vocabulary',   color:'text-amber-400' },
          { href:'/pronunciation-lab', icon:Volume2,   label:'Pronunciation',color:'text-cyan-400' },
          { href:'/grammar-reference', icon:PenTool,   label:'Grammar',      color:'text-emerald-400' },
        ].map(({ href, icon:Icon, label, color }) => (
          <Link key={href} href={href}
            className="card p-4 flex flex-col items-center gap-2 text-center hover:border-white/20 transition-all group">
            <Icon size={22} className={color} />
            <p className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
