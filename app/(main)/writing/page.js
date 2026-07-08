'use client';
// ============================================================
// WRITING HUB PAGE — Complete writing practice center
// Features: Writing types, templates, editor preview,
// email templates, writing tips, skill categories
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PenTool, Mail, FileText, Briefcase, BookOpen, Star,
  ChevronRight, ArrowRight, Target, Brain, CheckCircle2,
  Zap, Clock, Users, MessageSquare, TrendingUp, Edit3,
  Download, Send, Award, Globe, BarChart2, Lock, Play,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

// ── Writing types/categories ─────────────────────────────────
const WRITING_TYPES = [
  {
    id: 'email-formal',
    icon: Mail,
    emoji: '📧',
    title: 'Formal Email',
    hindi: 'औपचारिक ईमेल',
    desc: 'Professional emails to managers, clients, and colleagues — format, tone, opening, closing.',
    level: 'A2',
    templates: 12,
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/25',
    tags: ['office', 'professional'],
    popular: true,
    href: '/writing-lab/emails',
  },
  {
    id: 'letter-formal',
    icon: FileText,
    emoji: '📝',
    title: 'Formal Letter',
    hindi: 'औपचारिक पत्र',
    desc: 'Job applications, complaint letters, request letters, leave applications — all formats.',
    level: 'B1',
    templates: 8,
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    tags: ['formal', 'job'],
    popular: true,
    href: '/writing-lab/letters',
  },
  {
    id: 'resume',
    icon: Briefcase,
    emoji: '📄',
    title: 'Resume / CV',
    hindi: 'बायोडेटा / सीवी',
    desc: 'Professional resume writing — ATS-friendly formats, action verbs, skill highlights.',
    level: 'B1',
    templates: 5,
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    tags: ['job', 'career'],
    popular: true,
    href: '/writing-lab/resume',
  },
  {
    id: 'essay',
    icon: BookOpen,
    emoji: '📃',
    title: 'Essay Writing',
    hindi: 'निबंध लेखन',
    desc: 'Argumentative, descriptive, narrative, analytical essays with proper structure.',
    level: 'B2',
    templates: 10,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    tags: ['academic'],
    popular: false,
    href: '/writing-lab/essays',
  },
  {
    id: 'email-informal',
    icon: MessageSquare,
    emoji: '💬',
    title: 'Informal Email',
    hindi: 'अनौपचारिक ईमेल',
    desc: 'Friendly emails to colleagues and friends — casual tone, expressions, greetings.',
    level: 'A1',
    templates: 8,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/25',
    tags: ['casual', 'social'],
    popular: false,
    href: '/writing-lab/emails',
  },
  {
    id: 'report',
    icon: BarChart2,
    emoji: '📊',
    title: 'Business Report',
    hindi: 'व्यावसायिक रिपोर्ट',
    desc: 'Monthly reports, project status updates, sales reports — professional format.',
    level: 'B2',
    templates: 6,
    color: 'from-cyan-500 to-sky-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/25',
    tags: ['office', 'business'],
    popular: false,
    href: '/writing-lab/emails',
  },
  {
    id: 'linkedin',
    icon: Globe,
    emoji: '💼',
    title: 'LinkedIn Post',
    hindi: 'लिंक्डइन पोस्ट',
    desc: 'Professional LinkedIn posts, profile summaries, and network messages.',
    level: 'B1',
    templates: 7,
    color: 'from-blue-600 to-indigo-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    tags: ['social', 'professional'],
    popular: false,
    href: '/writing-lab/emails',
  },
  {
    id: 'complaint',
    icon: Target,
    emoji: '📢',
    title: 'Complaint Letter',
    hindi: 'शिकायत पत्र',
    desc: 'How to write a polite but firm complaint — consumer, service, workplace.',
    level: 'B1',
    templates: 5,
    color: 'from-rose-500 to-red-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/25',
    tags: ['formal'],
    popular: false,
    href: '/writing-lab/letters',
  },
];

// ── Email templates ──────────────────────────────────────────
const EMAIL_TEMPLATES = [
  {
    id: 1,
    type: 'Request for Leave',
    subject: 'Request for 2-Day Casual Leave',
    body: `Dear [Manager's Name],

I hope this email finds you well.

I am writing to request 2 days of casual leave on [dates], as I have a family function to attend.

I have ensured that all pending tasks will be completed before my leave. In case of urgency, please feel free to contact me on my mobile.

I would be grateful if you could approve this request.

Thanking you,
[Your Name]
[Designation]`,
    level: 'A2',
    tags: ['office', 'request'],
  },
  {
    id: 2,
    type: 'Job Application',
    subject: 'Application for Software Engineer Position',
    body: `Dear Hiring Manager,

I am writing to express my interest in the Software Engineer position advertised on your website.

I hold a B.Tech in Computer Science with 3 years of experience in web development. I am proficient in React.js, Node.js, and database management.

I am confident that my technical skills and problem-solving abilities make me a strong candidate for this role. I have attached my resume for your review.

I would welcome the opportunity to discuss how I can contribute to your team.

Yours sincerely,
[Your Name]
[Phone Number]`,
    level: 'B1',
    tags: ['job', 'application'],
  },
  {
    id: 3,
    type: 'Meeting Request',
    subject: 'Request for a Brief Meeting',
    body: `Hi [Name],

I hope you're doing well.

I would like to schedule a 30-minute meeting at your convenience to discuss [topic/project update].

Please let me know your availability this week or early next week, and I will send a calendar invite accordingly.

Looking forward to speaking with you.

Best regards,
[Your Name]`,
    level: 'A2',
    tags: ['office', 'meeting'],
  },
  {
    id: 4,
    type: 'Thank You Email',
    subject: 'Thank You for the Interview Opportunity',
    body: `Dear [Interviewer's Name],

Thank you so much for taking the time to interview me for the [Position] role on [Date].

I thoroughly enjoyed our conversation and I am very excited about the opportunity to join [Company Name]. The discussion about [specific topic from interview] was particularly interesting.

I remain very enthusiastic about this position and am confident that my skills in [skill] would be a great fit for your team.

Thank you once again for your time and consideration.

Kind regards,
[Your Name]`,
    level: 'B1',
    tags: ['job', 'thank-you'],
  },
];

// ── Writing tips ─────────────────────────────────────────────
const WRITING_TIPS = [
  { icon: '✅', tip: 'Always use a clear Subject line — it is the first thing the reader sees.' },
  { icon: '✅', tip: 'Start with a polite greeting: "Dear Sir/Madam", "Hello [Name]", "Hi [Name]"' },
  { icon: '✅', tip: 'Keep paragraphs short — 3-4 sentences maximum for professional emails.' },
  { icon: '✅', tip: 'Use active voice: "I will complete it" instead of "It will be completed by me."' },
  { icon: '✅', tip: 'End with a clear call to action: "Please confirm", "I look forward to your reply."' },
  { icon: '✅', tip: 'Close formally: "Regards", "Best regards", "Yours sincerely", "Warm regards"' },
  { icon: '✅', tip: 'Proofread before sending — check spelling, grammar, and tone.' },
  { icon: '✅', tip: 'Avoid abbreviations (u, r, ur) in professional emails — always spell fully.' },
];

// ── Writing stat card ─────────────────────────────────────────
function StatBadge({ value, label, icon, color }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-white/4 border border-white/8`}>
      <span className="text-xl">{icon}</span>
      <div>
        <p className={`text-lg font-black ${color}`}>{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

// ── Writing Type Card ────────────────────────────────────────
function WritingTypeCard({ type }) {
  const Icon = type.icon;
  const levelColors = { A1:'text-emerald-400', A2:'text-sky-400', B1:'text-violet-400', B2:'text-amber-400', C1:'text-rose-400' };

  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4 }}>
      <Link href={type.href}
        className={`block card p-5 h-full border ${type.border} ${type.bg.replace('/10', '/5')} hover:${type.bg} group transition-all relative overflow-hidden`}
      >
        {type.popular && (
          <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Popular</span>
        )}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 text-xl shadow-lg group-hover:scale-110 transition-transform`}>
          {type.emoji}
        </div>
        <h3 className="font-bold text-white mb-0.5">{type.title}</h3>
        <p className="text-xs text-slate-500 mb-3">{type.hindi}</p>
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{type.desc}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${levelColors[type.level] || 'text-slate-400'}`}>{type.level}</span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-500">{type.templates} templates</span>
          </div>
          <ChevronRight size={14} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}

// ── Email Preview Card ────────────────────────────────────────
function EmailCard({ template, isSelected, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      onClick={() => onClick(template)}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        isSelected ? 'border-primary-500/40 bg-primary-500/8' : 'border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15'
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Mail size={13} className="text-indigo-400 shrink-0" />
        <p className="text-sm font-semibold text-white">{template.type}</p>
        <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
          template.level === 'A2' ? 'bg-sky-500/10 text-sky-400' : 'bg-violet-500/10 text-violet-400'
        }`}>{template.level}</span>
      </div>
      <p className="text-xs text-slate-500 line-clamp-1">Subject: {template.subject}</p>
    </motion.button>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function WritingPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(EMAIL_TEMPLATES[0]);
  const [editorText, setEditorText] = useState('');
  const [activeTab, setActiveTab] = useState('types'); // types | templates | tips | editor

  const wordCount = editorText.trim().split(/\s+/).filter(Boolean).length;
  const charCount = editorText.length;

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
              <PenTool size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">Writing Hub</h1>
              <p className="text-slate-400 text-sm">Master professional English writing — emails, letters, resumes, essays.</p>
            </div>
          </div>
          <Link href="/ai-tutor/writing-checker" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            <Brain size={14} /> AI Writing Check
          </Link>
        </div>
      </motion.div>

      {/* ── Stats ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        <StatBadge value="8+"   label="Writing Types"  icon="📝" color="text-rose-400"    />
        <StatBadge value="48+"  label="Templates"      icon="📄" color="text-violet-400"  />
        <StatBadge value="A1–C1" label="All Levels"   icon="📊" color="text-indigo-400"  />
        <StatBadge value="AI"   label="Writing Check"  icon="🤖" color="text-emerald-400" />
      </motion.div>

      {/* ── Tabs ────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'types',     label: 'Writing Types',    icon: FileText },
          { id: 'templates', label: 'Email Templates',  icon: Mail     },
          { id: 'tips',      label: 'Writing Tips',     icon: Star     },
          { id: 'editor',    label: 'Practice Editor',  icon: Edit3    },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              activeTab === id
                ? 'bg-primary-500/20 text-primary-300 border-primary-500/30'
                : 'bg-white/4 text-slate-500 border-white/6 hover:text-white hover:bg-white/8'
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* ── Tab: Writing Types ──────────────────────────── */}
      {activeTab === 'types' && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {WRITING_TYPES.map(type => <WritingTypeCard key={type.id} type={type} />)}
        </motion.div>
      )}

      {/* ── Tab: Email Templates ────────────────────────── */}
      {activeTab === 'templates' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template List */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Select Template</h3>
            {EMAIL_TEMPLATES.map(t => (
              <EmailCard key={t.id} template={t} isSelected={selectedTemplate?.id === t.id} onClick={setSelectedTemplate} />
            ))}
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedTemplate && (
                <motion.div
                  key={selectedTemplate.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card p-6 h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Template: {selectedTemplate.type}</p>
                      <p className="text-sm font-semibold text-slate-300">Subject: {selectedTemplate.subject}</p>
                    </div>
                    <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all">
                      <Download size={12} /> Copy
                    </button>
                  </div>
                  <div className="bg-white/4 rounded-xl p-5 border border-white/8">
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                      {selectedTemplate.body}
                    </pre>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedTemplate.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-500 border border-white/8">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── Tab: Writing Tips ───────────────────────────── */}
      {activeTab === 'tips' && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <div className="card p-6 mb-6 border-emerald-500/20 bg-emerald-500/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Star size={16} className="text-yellow-400" /> Professional Email Writing Rules
            </h3>
            <div className="space-y-3">
              {WRITING_TIPS.map((tip, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-start gap-3 p-3 bg-white/4 rounded-xl">
                  <span className="text-lg shrink-0">{tip.icon}</span>
                  <p className="text-sm text-slate-300">{tip.tip}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="card p-6 border-rose-500/20 bg-rose-500/5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Target size={16} className="text-rose-400" /> Common Writing Mistakes to Avoid
            </h3>
            <div className="space-y-3">
              {[
                { wrong: '"Please do the needful"',   right: '"Please take the necessary action"' },
                { wrong: '"Myself Rahul Kumar"',      right: '"I am Rahul Kumar" or "My name is Rahul"' },
                { wrong: '"Kindly revert"',           right: '"Please reply" or "Kindly respond"' },
                { wrong: '"Prepone the meeting"',     right: '"Reschedule the meeting to an earlier time"' },
                { wrong: '"I am having a doubt"',     right: '"I have a question" or "I am unclear about..."' },
                { wrong: '"Please do the needful and revert asap"', right: '"Please take action and respond at your earliest convenience."' },
              ].map(({ wrong, right }, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3">
                    <p className="text-xs text-rose-400 font-bold mb-1">❌ Incorrect</p>
                    <p className="text-sm text-white italic">{wrong}</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                    <p className="text-xs text-emerald-400 font-bold mb-1">✅ Correct</p>
                    <p className="text-sm text-white italic">{right}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Tab: Practice Editor ────────────────────────── */}
      {activeTab === 'editor' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Edit3 size={16} className="text-rose-400" /> Writing Practice Editor
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{wordCount} words</span>
                <span>{charCount} chars</span>
              </div>
            </div>

            {/* Prompt */}
            <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-amber-400 font-bold mb-1">✍️ Today's Prompt</p>
              <p className="text-sm text-slate-300">Write a formal email to your manager requesting 2 days of leave for a family event. Include: reason, dates, work coverage plan, and a polite closing.</p>
            </div>

            <textarea
              value={editorText}
              onChange={e => setEditorText(e.target.value)}
              placeholder="Start writing your email here… (Use templates above as reference)"
              className="w-full h-64 p-4 bg-white/4 border border-white/10 rounded-xl text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary-500/40 resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
              <div className="flex items-center gap-3 text-xs">
                {wordCount > 0 && wordCount < 50 && <span className="text-amber-400">💡 Try to write at least 50 words</span>}
                {wordCount >= 50 && wordCount < 100 && <span className="text-blue-400">👍 Good start! Aim for 100+ words</span>}
                {wordCount >= 100 && <span className="text-emerald-400">✅ Excellent length!</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setEditorText('')} className="text-sm text-slate-500 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-all">
                  Clear
                </button>
                <Link href="/ai-tutor/writing-checker" className="flex items-center gap-1.5 text-sm btn-primary px-4 py-2">
                  <Brain size={13} /> Check with AI
                </Link>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="card p-5 mt-4">
            <p className="text-sm font-bold text-white mb-3">Email Checklist</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              {['Subject line written', 'Proper greeting used', 'Purpose stated clearly', 'Dates/details included', 'Professional tone used', 'Formal closing added', 'Name and designation added', 'Proofread for errors'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded border border-white/20 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Quick Links ─────────────────────────────────── */}
      {activeTab === 'types' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 card p-6 border-primary-500/20 bg-primary-500/5"
        >
          <h3 className="font-bold text-white mb-4">More Writing Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: '/ai-tutor/writing-checker', icon: Brain,   title: 'AI Grammar Checker',   desc: 'Get instant feedback on your writing', color: 'from-violet-500 to-purple-500' },
              { href: '/writing-lab/page',         icon: PenTool, title: 'Writing Lab',           desc: 'Advanced writing exercises and prompts', color: 'from-rose-500 to-pink-500' },
              { href: '/professional-english',     icon: Briefcase, title: 'Professional English', desc: 'Business writing and communication', color: 'from-teal-500 to-cyan-500' },
            ].map(({ href, icon: Icon, title, desc, color }) => (
              <Link key={href} href={href} className="flex items-center gap-3 p-4 bg-white/4 rounded-xl border border-white/8 hover:bg-white/7 hover:border-white/15 transition-all group">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
