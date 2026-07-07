'use client';
// Reading Lab — Comprehensive reading practice hub

import Link from 'next/link';
import { BookOpen, ArrowRight, ChevronRight, Clock, Star } from 'lucide-react';

const READING_MODULES = [
  { href:'/reading-lab/comprehension', emoji:'📄', title:'Reading Comprehension', desc:'Passages padhkar questions answer karo — IELTS/TOEFL style', level:'A2+', badge:'Popular' },
  { href:'/reading-lab/stories', emoji:'📖', title:'English Stories', desc:'Short stories with Hindi meaning — graded by difficulty', level:'A1+', badge:'Fun' },
  { href:'/reading-lab/articles', emoji:'📰', title:'News Articles', desc:'Current affairs aur topics — advanced vocabulary practice', level:'B1+', badge:'Advanced' },
  { href:'/reading-lab/speed-reading', emoji:'⚡', title:'Speed Reading', desc:'Words per minute (WPM) badhao — timed reading exercises', level:'B1+', badge:'Speed' },
];

const SAMPLE_PASSAGE = {
  title: 'The Importance of Learning English',
  level: 'A2',
  wpm: 120,
  text: `English is one of the most widely spoken languages in the world. More than 1.5 billion people speak English as either their first or second language. In India, English is used in business, education, and government.

Learning English can open many doors in your career. Many top companies require English communication skills. People who speak English well often get better job opportunities and higher salaries.

The best way to learn English is to practice every day. Read English books, watch English movies, and speak with friends in English. With 75 days of dedicated practice, you can become fluent in English.`,
  questions: [
    { q: 'How many people speak English globally?', a: '1.5 billion' },
    { q: 'In which areas is English used in India?', a: 'Business, education, and government' },
    { q: 'What is the best way to learn English?', a: 'Practice every day' },
  ],
};

const READING_TIPS = [
  { tip: 'Read daily', desc: '15-20 min roz padhne se fluency tezi se aati hai', emoji: '📅' },
  { tip: 'Unknown words', desc: 'Har anjaan word underline karo, dictionary dekho baad mein', emoji: '📝' },
  { tip: 'Guess meaning', desc: 'Context se meaning guess karna ek important skill hai', emoji: '🤔' },
  { tip: 'Summarize', desc: 'Har passage ke baad apne words mein summary likhko', emoji: '✍️' },
];

export default function ReadingLabPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-3xl">📚</span> Reading Lab
          </h1>
          <p className="text-slate-500">Comprehension, stories, articles — har level ke liye reading practice</p>
        </div>
        <Link href="/reading-lab/comprehension" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <BookOpen size={15} /> Start Reading
        </Link>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {READING_MODULES.map(({ href, emoji, title, desc, level, badge }) => (
          <Link key={href} href={href} className="card p-5 group hover:border-blue-500/30 transition-all cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{emoji}</span>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">{title}</h3>
                  <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">{badge}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{desc}</p>
                <span className="text-[10px] text-slate-500">Level {level}</span>
              </div>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400 transition-colors mt-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Sample Passage */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="font-black text-white flex items-center gap-2">
            <BookOpen size={18} className="text-blue-400" /> Sample Passage
          </h2>
          <div className="flex items-center gap-2">
            <span className="badge text-xs text-sky-400 bg-sky-500/15 border border-sky-500/20">{SAMPLE_PASSAGE.level}</span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={11} /> ~{Math.ceil(SAMPLE_PASSAGE.text.split(' ').length / SAMPLE_PASSAGE.wpm)} min read
            </span>
          </div>
        </div>
        <h3 className="font-bold text-white mb-3">{SAMPLE_PASSAGE.title}</h3>
        <div className="prose-dark space-y-3 mb-5">
          {SAMPLE_PASSAGE.text.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-300 text-sm leading-relaxed">{para}</p>
          ))}
        </div>
        <div className="border-t border-white/8 pt-4">
          <h4 className="font-semibold text-white text-sm mb-3">📝 Comprehension Questions:</h4>
          <div className="space-y-3">
            {SAMPLE_PASSAGE.questions.map(({ q, a }, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/3 border border-white/5">
                <p className="text-sm text-slate-300 mb-1"><span className="text-primary-400 font-bold">Q{i+1}.</span> {q}</p>
                <details className="group">
                  <summary className="text-xs text-primary-400 cursor-pointer hover:text-primary-300 transition-colors">Show Answer</summary>
                  <p className="text-xs text-accent-300 mt-1 pl-2">{a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Tips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {READING_TIPS.map(({ tip, desc, emoji }) => (
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
