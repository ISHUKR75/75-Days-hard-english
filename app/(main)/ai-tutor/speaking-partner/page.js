'use client';
import Link from 'next/link';
import { Mic, Bot, ArrowRight, Volume2, Play } from 'lucide-react';

const SCENARIOS = [
  { emoji: '👋', title: 'First Meeting',     prompt: 'Introduce yourself to a new colleague.' },
  { emoji: '📞', title: 'Phone Call',        prompt: 'Call a company to enquire about a job opening.' },
  { emoji: '🤝', title: 'Job Interview',     prompt: 'Answer interview questions confidently.' },
  { emoji: '☕', title: 'Small Talk',        prompt: 'Have a casual conversation at the office.' },
  { emoji: '📊', title: 'Meeting',           prompt: 'Present your report in a team meeting.' },
  { emoji: '🛒', title: 'Shopping',          prompt: 'Ask for help finding a product in a store.' },
];

export default function SpeakingPartnerPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Mic size={28} className="text-pink-400" /> AI Speaking Partner</h1>
        <p className="text-slate-500">Practice speaking English in real-life scenarios with your AI partner.</p>
      </div>
      <div className="card p-5 border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-purple-500/5 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-3xl mx-auto mb-4">🤖</div>
        <h3 className="font-bold text-white text-lg mb-2">AI Conversation Partner</h3>
        <p className="text-slate-400 text-sm mb-4">Select a scenario below to start a conversation practice session.</p>
        <p className="text-xs text-slate-500">AI speaking integration coming soon — for now practice with the prompts below.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SCENARIOS.map((s) => (
          <div key={s.title} className="card p-5 hover:border-pink-500/30 transition-all cursor-pointer group">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{s.emoji}</span>
              <div>
                <h3 className="font-bold text-white group-hover:text-pink-300 transition-colors">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{s.prompt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
