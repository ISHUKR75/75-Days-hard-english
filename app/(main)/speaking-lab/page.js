'use client';
// Speaking Lab — Full speaking practice hub with drills, shadowing, roleplay

import Link from 'next/link';
import {
  Mic, Play, Volume2, MessageSquare, Star, ArrowRight,
  Users, Brain, ChevronRight, Zap, Globe,
} from 'lucide-react';

// ============================================================
// Speaking Lab Content
// ============================================================
const SPEAKING_MODULES = [
  {
    href:  '/speaking-lab/drills',
    emoji: '🎯',
    title: 'Speaking Drills',
    desc:  'Repeat after native speakers — pronunciation improve karo',
    color: 'from-indigo-500 to-blue-500',
    level: 'A1+',
    badge: 'Beginner Friendly',
  },
  {
    href:  '/speaking-lab/shadowing',
    emoji: '🔊',
    title: 'Shadowing Practice',
    desc:  'Native speaker ke saath saath bolo — fluency build karo',
    color: 'from-violet-500 to-purple-500',
    level: 'A2+',
    badge: 'Popular',
  },
  {
    href:  '/speaking-lab/roleplay',
    emoji: '🎭',
    title: 'Roleplay Scenarios',
    desc:  'Real-life situations — shopping, office, interviews',
    color: 'from-emerald-500 to-teal-500',
    level: 'B1+',
    badge: 'Real Life',
  },
  {
    href:  '/speaking-lab/record',
    emoji: '🎙️',
    title: 'Record & Compare',
    desc:  'Apni awaz record karo aur native se compare karo',
    color: 'from-pink-500 to-rose-500',
    level: 'A1+',
    badge: 'Self-Assessment',
  },
  {
    href:  '/speaking-lab/ai-partner',
    emoji: '🤖',
    title: 'AI Speaking Partner',
    desc:  'AI ke saath real conversation practice karo 24/7',
    color: 'from-amber-500 to-orange-500',
    level: 'A2+',
    badge: 'AI-Powered',
  },
];

const DAILY_SENTENCES = [
  { hindi: 'क्या आप मेरी बात सुन रहे हैं?', english: 'Are you listening to me?', type: 'Daily' },
  { hindi: 'कृपया दोबारा कहिए।', english: 'Please say that again.', type: 'Polite' },
  { hindi: 'मुझे माफ़ करें, मैं समझ नहीं पाया।', english: 'I am sorry, I did not understand.', type: 'Polite' },
  { hindi: 'क्या आप इसे और सरल शब्दों में कह सकते हैं?', english: 'Could you explain that more simply?', type: 'Office' },
  { hindi: 'बहुत अच्छी बात है!', english: 'That is a great point!', type: 'Office' },
  { hindi: 'मैं आपसे सहमत हूँ।', english: 'I agree with you.', type: 'Conversation' },
];

const SPEAKING_TIPS = [
  { tip: 'Mirror practice', desc: 'Roz 10 minute mirror ke saamne English bolne ki practice karo', emoji: '🪞' },
  { tip: 'Shadowing', desc: 'English shows/movies mein characters ke saath saath bolo', emoji: '🎬' },
  { tip: 'Think in English', desc: 'Apne thoughts ko pehle Hindi mein mat socho — directly English mein socho', emoji: '🧠' },
  { tip: 'Record yourself', desc: 'Apni recording suno — aksar hum sochte kuch aur bolte kuch aur', emoji: '🎙️' },
  { tip: 'Speak slowly', desc: 'Pehle accuracy phir speed — dhire bolna zyada professional lagta hai', emoji: '🐢' },
  { tip: 'Filler words', desc: '"Well", "You know", "Actually" — natural speaking mein yeh normal hain', emoji: '💬' },
];

// ============================================================
// Speaking Lab Page
// ============================================================
export default function SpeakingLabPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-3xl">🎙️</span> Speaking Lab
          </h1>
          <p className="text-slate-500">
            Confidence build karo — Daily speaking drills, roleplay, aur AI partner
          </p>
        </div>
        <Link href="/speaking-lab/drills" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <Mic size={15} /> Start Drilling
        </Link>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SPEAKING_MODULES.map(({ href, emoji, title, desc, color, level, badge }) => (
          <Link key={href} href={href} className="card p-5 group hover:border-white/15 transition-all cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform shrink-0`}>
                {emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className="text-[10px] text-primary-400 bg-primary-500/10 px-1.5 py-0.5 rounded font-bold">{level}</span>
                  <span className="text-[10px] text-slate-500">{badge}</span>
                </div>
                <h3 className="font-bold text-white group-hover:text-primary-300 transition-colors">{title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">{desc}</p>
            <div className="flex items-center text-xs text-primary-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Start Practice <ArrowRight size={12} className="ml-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Daily Speaking Sentences */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-white flex items-center gap-2">
            <Volume2 size={18} className="text-cyan-400" /> Today's Speaking Sentences
          </h2>
          <span className="text-xs text-slate-500">{DAILY_SENTENCES.length} sentences</span>
        </div>
        <div className="space-y-3">
          {DAILY_SENTENCES.map(({ hindi, english, type }, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 group transition-all">
              <button className="w-10 h-10 rounded-xl bg-primary-500/15 border border-primary-500/20 flex items-center justify-center shrink-0 hover:bg-primary-500/25 transition-all">
                <Play size={14} className="text-primary-400" fill="currentColor" />
              </button>
              <div className="flex-1 min-w-0">
                <p className="hindi-text text-sm text-slate-300 mb-0.5">🇮🇳 {hindi}</p>
                <p className="english-text text-sm">🇬🇧 {english}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-600 bg-white/4 px-2 py-0.5 rounded">{type}</span>
                <button className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/20 flex items-center justify-center hover:bg-pink-500/25 transition-all">
                  <Mic size={13} className="text-pink-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speaking Tips */}
      <div className="card p-5">
        <h2 className="font-black text-white mb-4 flex items-center gap-2">
          <Brain size={18} className="text-violet-400" /> Pro Speaking Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPEAKING_TIPS.map(({ tip, desc, emoji }) => (
            <div key={tip} className="p-4 rounded-xl bg-white/3 border border-white/5">
              <span className="text-2xl mb-2 block">{emoji}</span>
              <h4 className="font-bold text-white text-sm mb-1">{tip}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
