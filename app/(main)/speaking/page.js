'use client';
// Speaking Practice Page

import { useState } from 'react';
import Link from 'next/link';
import { Mic, Play, Volume2, ArrowRight, Star, Target, Brain, MicOff, CheckCircle2 } from 'lucide-react';

const SPEAKING_TOPICS = [
  { id: 'self-intro',    emoji: '👋', title: 'Self Introduction',     level: 'A1', prompts: ['Tell me about yourself.', 'What do you do for work?', 'Where are you from?'] },
  { id: 'office-talk',   emoji: '💼', title: 'Office Conversation',    level: 'B1', prompts: ['How was your weekend?', 'Can we schedule a meeting?', 'I need your help with this.'] },
  { id: 'interview',     emoji: '🎤', title: 'Job Interview',          level: 'B1', prompts: ['Tell me your strengths.', 'Why should we hire you?', 'Where do you see yourself in 5 years?'] },
  { id: 'phone-call',    emoji: '📞', title: 'Phone Conversations',    level: 'A2', prompts: ['Can I speak to the manager?', 'Can you repeat that please?', 'I will call back later.'] },
  { id: 'daily-chat',    emoji: '☕', title: 'Daily Conversations',    level: 'A2', prompts: ['What did you eat today?', 'How are you feeling?', 'What are your plans for today?'] },
  { id: 'presentation', emoji: '📊', title: 'Giving Presentations',   level: 'B2', prompts: ['Good morning everyone.', 'Today I will be talking about…', 'In conclusion…'] },
];

export default function SpeakingPage() {
  const [recording, setRecording] = useState(false);
  const [selected,  setSelected]  = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Mic size={28} className="text-pink-400" /> Speaking Practice
        </h1>
        <p className="text-slate-500">Real-life conversation practice — office, interview, daily life.</p>
      </div>

      {/* AI Speaking Partner Banner */}
      <div className="card p-6 border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-purple-500/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-2xl shadow-lg">
              🤖
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Speaking Partner</h3>
              <p className="text-slate-400 text-sm">24/7 available — practice anytime, get instant feedback</p>
            </div>
          </div>
          <Link href="/ai-tutor/speaking-partner"
            className="btn-primary flex items-center gap-2 text-sm shrink-0">
            Start Conversation <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Speaking topics */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Practice Scenarios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPEAKING_TOPICS.map((topic) => (
            <div key={topic.id}
              onClick={() => setSelected(selected?.id === topic.id ? null : topic)}
              className={`card p-5 cursor-pointer transition-all ${
                selected?.id === topic.id ? 'border-pink-500/40 bg-pink-500/8' : 'hover:border-white/15'
              }`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{topic.emoji}</span>
                <span className={`badge text-xs ${
                  topic.level === 'A1' || topic.level === 'A2' ? 'diff-easy' :
                  topic.level === 'B1' ? 'diff-medium' : 'diff-hard'
                }`}>{topic.level}</span>
              </div>
              <h3 className="font-bold text-white mb-3">{topic.title}</h3>
              <div className="space-y-1.5">
                {topic.prompts.slice(0, 2).map((p, i) => (
                  <p key={i} className="text-xs text-slate-500">• {p}</p>
                ))}
              </div>

              {selected?.id === topic.id && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                  <p className="text-xs font-semibold text-slate-300 mb-2">Practice Prompts:</p>
                  {topic.prompts.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/8">
                      <button className="w-7 h-7 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0 hover:bg-primary-500/30 transition-all">
                        <Play size={12} className="text-primary-400" fill="currentColor" />
                      </button>
                      <p className="text-xs text-slate-300 flex-1">{p}</p>
                      <button className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                        recording ? 'bg-danger-500/20 hover:bg-danger-500/30' : 'bg-pink-500/20 hover:bg-pink-500/30'
                      }`} onClick={(e) => { e.stopPropagation(); setRecording(!recording); }}>
                        {recording ? <MicOff size={12} className="text-danger-400" /> : <Mic size={12} className="text-pink-400" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4">💡 Speaking Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { tip: 'Speak slowly and clearly — speed comes with practice.' },
            { tip: 'Record yourself and listen — you will improve faster.' },
            { tip: 'Don\'t worry about mistakes — just keep talking!' },
            { tip: 'Think in English, not in Hindi — then translate.' },
          ].map(({ tip }, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-slate-400">
              <CheckCircle2 size={15} className="text-accent-400 shrink-0 mt-0.5" />
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
