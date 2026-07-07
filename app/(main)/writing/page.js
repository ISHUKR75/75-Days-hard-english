'use client';
import Link from 'next/link';
import { PenTool, ArrowRight } from 'lucide-react';

const WRITING_TYPES = [
  { emoji: '✉️', title: 'Formal Emails',   desc: 'Professional emails for office, applications, requests.' },
  { emoji: '📝', title: 'Informal Emails', desc: 'Friendly emails, thank-you notes, invitations.' },
  { emoji: '📄', title: 'Resume/CV',       desc: 'Write a professional resume that gets noticed.' },
  { emoji: '📊', title: 'Reports',         desc: 'Business reports, project updates, meeting minutes.' },
  { emoji: '📰', title: 'Essays',          desc: 'Academic essays, opinion articles, argumentative writing.' },
  { emoji: '📖', title: 'Stories',         desc: 'Creative writing — short stories and descriptive paragraphs.' },
];

export default function WritingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><PenTool size={28} className="text-rose-400" /> Writing Practice</h1>
        <p className="text-slate-500">From emails to essays — learn to write professionally in English.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WRITING_TYPES.map(({ emoji, title, desc }) => (
          <div key={title} className="card p-6 group hover:border-rose-500/30 transition-all cursor-pointer">
            <span className="text-3xl block mb-3">{emoji}</span>
            <h3 className="font-bold text-white text-lg mb-2 group-hover:text-rose-300 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500 mb-4">{desc}</p>
            <span className="text-sm font-semibold text-rose-400 flex items-center gap-1">Practice <ArrowRight size={14} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
