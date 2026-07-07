'use client';
// Listening Lab — Dictation, audio comprehension, podcast practice

import Link from 'next/link';
import { Headphones, Play, Volume2, ChevronRight, ArrowRight, Mic, Star } from 'lucide-react';

const LISTENING_MODULES = [
  { href:'/listening-lab/dictation',      emoji:'✍️',  title:'Dictation Practice',      desc:'Audio sunke exactly wahi likhna seekho — perfect for beginners', level:'A1+', badge:'Starter' },
  { href:'/listening-lab/fill-blanks',    emoji:'📝',  title:'Fill in the Blanks',      desc:'Audio mein missing words pakdo — concentration + vocabulary', level:'A2+', badge:'Popular' },
  { href:'/listening-lab/comprehension',  emoji:'🎧',  title:'Audio Comprehension',     desc:'Conversation suno, questions answer karo', level:'B1+', badge:'IELTS Ready' },
  { href:'/listening-lab/accent-training', emoji:'🌍', title:'Accent Training',         desc:'British, American, Australian — different accents sunne ki practice', level:'B1+', badge:'Accents' },
  { href:'/listening-lab/songs',          emoji:'🎵',  title:'English Songs',           desc:'Songs ke lyrics se vocabulary aur pronunciation seekho', level:'A2+', badge:'Fun' },
  { href:'/listening-lab/podcasts',       emoji:'🎙️', title:'Mini Podcasts',           desc:'Short 3-5 min audio clips on interesting topics', level:'B2+', badge:'Advanced' },
];

const DICTATION_SENTENCES = [
  { text: 'I am learning English every day.', level: 'A1', hindi: 'मैं हर रोज़ English सीख रहा हूँ।' },
  { text: 'She has a beautiful voice.', level: 'A1', hindi: 'उसकी आवाज़ बहुत सुंदर है।' },
  { text: 'They were discussing the project.', level: 'A2', hindi: 'वे project के बारे में बात कर रहे थे।' },
  { text: 'The meeting has been rescheduled.', level: 'B1', hindi: 'मीटिंग को reschedule किया गया है।' },
  { text: 'He would have succeeded if he had tried harder.', level: 'B2', hindi: 'वह सफल होता अगर उसने अधिक कोशिश की होती।' },
];

const LISTENING_TIPS = [
  { tip: 'Start Slow', desc: 'Pehle 0.75x speed se suno — phir normal speed par practice karo', emoji: '🐢' },
  { tip: 'Active Listening', desc: 'Sirf background mein mat chalaao — focus karke, headphones lagao', emoji: '🎯' },
  { tip: 'Subtitle Strategy', desc: 'Pehle without subtitles, phir English subtitles, phir no subtitles', emoji: '📺' },
  { tip: 'Repeat & Mimic', desc: 'Jo suna woh exactly waise repeat karo — same tone, same speed', emoji: '🔄' },
];

export default function ListeningLabPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-3xl">🎧</span> Listening Lab
          </h1>
          <p className="text-slate-500">Dictation se podcasts tak — English sunne ki skill develop karo</p>
        </div>
        <Link href="/listening-lab/dictation" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <Headphones size={15} /> Start Dictation
        </Link>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LISTENING_MODULES.map(({ href, emoji, title, desc, level, badge }) => (
          <Link key={href} href={href} className="card p-5 group hover:border-teal-500/30 transition-all cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <h3 className="font-bold text-white group-hover:text-teal-300 transition-colors">{title}</h3>
                  <span className="text-[10px] text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">{badge}</span>
                </div>
                <p className="text-xs text-slate-400 mb-1">{desc}</p>
                <span className="text-[10px] text-slate-500">Level {level}</span>
              </div>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-teal-400 transition-colors mt-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Dictation Preview */}
      <div className="card p-5">
        <h2 className="font-black text-white mb-1 flex items-center gap-2">
          <Volume2 size={18} className="text-teal-400" /> Quick Dictation — Sample Set
        </h2>
        <p className="text-xs text-slate-500 mb-4">Play the audio, listen carefully, then type what you heard</p>
        <div className="space-y-3">
          {DICTATION_SENTENCES.map(({ text, level, hindi }, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
              <button className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/20 flex items-center justify-center shrink-0 hover:bg-teal-500/25 transition-all">
                <Play size={14} className="text-teal-400" fill="currentColor" />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-slate-500">#{i + 1}</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">{level}</span>
                </div>
                <p className="hindi-text text-xs text-slate-400">{hindi}</p>
              </div>
              <details className="shrink-0">
                <summary className="text-xs text-primary-400 cursor-pointer hover:text-primary-300 transition-colors">Answer</summary>
                <p className="english-text text-xs text-accent-300 mt-1 text-right">{text}</p>
              </details>
            </div>
          ))}
        </div>
        <Link href="/listening-lab/dictation" className="btn-secondary text-xs mt-4 flex items-center gap-1.5 w-fit">
          Full Dictation Practice <ArrowRight size={12} />
        </Link>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {LISTENING_TIPS.map(({ tip, desc, emoji }) => (
          <div key={tip} className="card p-4 text-center">
            <span className="text-2xl block mb-2">{emoji}</span>
            <h4 className="font-bold text-white text-sm mb-1">{tip}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
