'use client';
// Writing Lab — All writing skills: emails, essays, letters, resumes

import Link from 'next/link';
import { PenTool, ChevronRight, ArrowRight, Zap, FileText } from 'lucide-react';

const WRITING_MODULES = [
  { href:'/writing-lab/emails', emoji:'📧', title:'Email Writing', desc:'Professional aur casual emails likhna seekho — templates + practice', level:'A2+', badge:'Most Useful' },
  { href:'/writing-lab/essays', emoji:'📄', title:'Essay Writing', desc:'Opinion, descriptive, narrative essays — structure + examples', level:'B1+', badge:'Academic' },
  { href:'/writing-lab/letters', emoji:'✉️', title:'Letter Writing', desc:'Formal and informal letters — cover letters, applications', level:'A2+', badge:'Professional' },
  { href:'/writing-lab/resume', emoji:'📋', title:'Resume / CV', desc:'Professional resume likhna — action verbs aur format', level:'B1+', badge:'Career' },
  { href:'/writing-lab/ai-checker', emoji:'🤖', title:'AI Grammar Checker', desc:'Apna likha AI se check karwao — grammar, style suggestions', level:'All', badge:'AI-Powered' },
];

const EMAIL_TEMPLATES = [
  {
    type: 'Leave Application',
    subject: 'Application for Leave — [Your Name]',
    body: `Dear [Manager's Name],

I am writing to request leave for [number] days, from [start date] to [end date].

The reason for my leave is [reason]. I have completed all my pending tasks and have informed my team about my absence.

I will be available on my phone if needed. I request you to kindly approve my leave.

Thank you for your consideration.

Regards,
[Your Name]`,
    tags: ['Office', 'Formal'],
  },
  {
    type: 'Job Application Email',
    subject: 'Application for [Job Title] — [Your Name]',
    body: `Dear Hiring Manager,

I am writing to apply for the position of [Job Title] at [Company Name]. I came across this opportunity on [where you found it].

I have [X years] of experience in [relevant field] and have strong skills in [skill 1], [skill 2], and [skill 3]. In my current role at [Current Company], I have [mention achievement].

I am excited about the opportunity to contribute to [Company Name] and am confident that my background makes me a strong candidate. Please find my resume attached.

I look forward to discussing this opportunity further.

Thank you for your time.

Best regards,
[Your Name]
[Phone Number]
[Email]`,
    tags: ['Job', 'Formal'],
  },
];

const WRITING_TIPS = [
  { tip: 'PEEL Structure', desc: 'Point → Evidence → Explanation → Link — perfect for essays', emoji: '🍊' },
  { tip: 'Active Voice', desc: '"I sent the email" NOT "The email was sent by me"', emoji: '⚡' },
  { tip: 'Short Sentences', desc: 'Professional writing mein 15-20 words per sentence ideal hai', emoji: '✂️' },
  { tip: 'Paragraph Structure', desc: 'Har paragraph mein 1 main idea — topic sentence se start karo', emoji: '📝' },
  { tip: 'Proofread', desc: 'Bhejne se pehle hamesha ek baar aur padho — spelling/grammar check', emoji: '🔍' },
  { tip: 'Vocabulary Range', desc: 'Same word repeat mat karo — synonyms use karo', emoji: '📚' },
];

export default function WritingLabPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
            <span className="text-3xl">✍️</span> Writing Lab
          </h1>
          <p className="text-slate-500">Emails, essays, letters, resumes — sab type ki writing practice yahan</p>
        </div>
        <Link href="/writing-lab/emails" className="btn-primary text-sm flex items-center gap-2 shrink-0">
          <PenTool size={15} /> Start Writing
        </Link>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WRITING_MODULES.map(({ href, emoji, title, desc, level, badge }) => (
          <Link key={href} href={href} className="card p-5 group hover:border-rose-500/30 transition-all cursor-pointer">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <h3 className="font-bold text-white group-hover:text-rose-300 transition-colors">{title}</h3>
                  <span className="text-[10px] text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded">{badge}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{desc}</p>
                <span className="text-[10px] text-slate-500">Level {level}</span>
              </div>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-rose-400 transition-colors mt-0.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Email Templates */}
      <div className="card p-5">
        <h2 className="font-black text-white mb-1 flex items-center gap-2">
          <FileText size={18} className="text-rose-400" /> Email Templates
        </h2>
        <p className="text-xs text-slate-500 mb-4">Ready-to-use email templates — sirf blanks fill karo</p>
        <div className="space-y-4">
          {EMAIL_TEMPLATES.map(({ type, subject, body, tags }) => (
            <div key={type} className="p-4 rounded-xl bg-white/3 border border-white/6">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <h4 className="font-bold text-white text-sm">{type}</h4>
                <div className="flex gap-1">
                  {tags.map(t => (
                    <span key={t} className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-3"><strong className="text-slate-300">Subject:</strong> {subject}</p>
              <details>
                <summary className="text-xs text-primary-400 cursor-pointer hover:text-primary-300 transition-colors mb-2">
                  View Full Template
                </summary>
                <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed bg-white/3 p-4 rounded-xl border border-white/5 mt-2 overflow-x-auto">
                  {body}
                </pre>
              </details>
            </div>
          ))}
          <Link href="/writing-lab/emails" className="btn-secondary text-xs flex items-center gap-1.5 w-fit">
            View All 20+ Templates <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="card p-5">
        <h2 className="font-black text-white mb-4 flex items-center gap-2">
          <Zap size={18} className="text-amber-400" /> Pro Writing Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WRITING_TIPS.map(({ tip, desc, emoji }) => (
            <div key={tip} className="p-4 rounded-xl bg-white/3 border border-white/5">
              <span className="text-2xl block mb-2">{emoji}</span>
              <h4 className="font-bold text-white text-sm mb-1">{tip}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
