'use client';
// Writing Lab — Complete writing skills: emails, essays, letters, resumes
// Real templates with Framer Motion animations

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  PenTool, FileText, Mail, BookOpen, Briefcase, Copy, Check,
  ChevronRight, Star, ArrowRight, Sparkles, Zap, Target,
  Award, CheckCircle2, AlertTriangle,
} from 'lucide-react';

// ── Writing Modules ──────────────────────────────────────────
const WRITING_MODULES = [
  {
    id:'email',  title:'Email Writing',      subtitle:'Professional emails',
    icon:Mail,   color:'from-blue-500 to-indigo-600',   level:'B1',  templates:15,
    desc:'Formal, informal, request, complaint, apology — every type of professional email.',
  },
  {
    id:'letter', title:'Letter Writing',     subtitle:'Application & formal letters',
    icon:FileText,color:'from-emerald-500 to-teal-600', level:'B1',  templates:12,
    desc:'Job applications, complaints, leave applications, recommendations — perfect format.',
  },
  {
    id:'essay',  title:'Essay Writing',      subtitle:'Structured arguments',
    icon:BookOpen,color:'from-purple-500 to-violet-600',level:'B2',  templates:10,
    desc:'Opinion essays, argumentative, descriptive, narrative — master all essay types.',
  },
  {
    id:'resume', title:'Resume & CV',        subtitle:'Land your dream job',
    icon:Briefcase,color:'from-amber-500 to-orange-600',level:'B2',  templates:8,
    desc:'ATS-friendly resumes, professional summaries, cover letters — get shortlisted.',
  },
  {
    id:'report', title:'Report Writing',     subtitle:'Professional reports',
    icon:FileText,color:'from-cyan-500 to-sky-600',    level:'C1',  templates:7,
    desc:'Business reports, incident reports, project reports — clear and structured.',
  },
  {
    id:'story',  title:'Story & Paragraph',  subtitle:'Creative writing',
    icon:PenTool,color:'from-rose-500 to-pink-600',    level:'A2',  templates:10,
    desc:'Short stories, paragraph writing, personal narratives — express yourself creatively.',
  },
];

// ── Email Templates ──────────────────────────────────────────
const EMAIL_TEMPLATES = [
  {
    id:'formal-request',
    title:'Formal Request Email',
    subject:'Request for [Information/Meeting/Document]',
    body:`Dear [Name/Sir/Ma'am],

I hope this email finds you well.

I am writing to formally request [describe what you need]. This is in connection with [context/reason].

Specifically, I would appreciate if you could [specific action needed]. This is required by [date/deadline] as [brief reason for urgency].

Please let me know if you need any additional information from my side. I would be happy to clarify.

Thank you for your time and consideration.

Warm regards,
[Your Name]
[Your Designation]
[Contact Details]`,
    tips:['Always mention the reason for your request','Give a specific deadline if needed','Keep it formal and polite','End with gratitude'],
  },
  {
    id:'job-application',
    title:'Job Application Email',
    subject:'Application for [Job Title] — [Your Name]',
    body:`Dear Hiring Manager,

I am writing to express my strong interest in the [Job Title] position at [Company Name], as advertised on [Platform].

With [X years] of experience in [field], I have developed strong skills in [key skill 1], [key skill 2], and [key skill 3]. In my current role at [Current Company], I [specific achievement that demonstrates value].

I am particularly excited about [Company Name] because [specific reason — culture, mission, product].

I have attached my resume and portfolio for your review. I would welcome the opportunity to discuss how my skills align with [Company Name]'s goals.

Thank you for considering my application.

Sincerely,
[Your Full Name]
[Phone Number]
[Email Address]
[LinkedIn Profile]`,
    tips:['Tailor each application to the specific job','Mention specific achievements with numbers','Research the company and mention something specific','Keep it under 250 words'],
  },
  {
    id:'complaint',
    title:'Complaint Email',
    subject:'Complaint Regarding [Issue] — [Order/Reference Number]',
    body:`Dear Customer Service Team,

I am writing to bring to your attention a serious issue I encountered with [product/service].

On [date], I [describe what happened in detail]. Despite [any previous attempts to resolve], the issue has not been resolved.

This has caused [describe the impact — inconvenience, financial loss, etc.].

I would like to request that you:
1. [Specific resolution — refund/replacement/explanation]
2. Confirm receipt of this complaint within [X business days]

Please find attached [any relevant documents — receipts, photos, previous correspondence].

I trust this matter will be resolved promptly. If I do not hear back within [timeframe], I will be compelled to escalate this matter.

Sincerely,
[Your Name]
[Contact Details]`,
    tips:['Stay professional — never be rude','State the facts clearly','Provide all relevant reference numbers','Be specific about what resolution you want'],
  },
  {
    id:'apology',
    title:'Apology Email',
    subject:'Sincere Apology for [Issue]',
    body:`Dear [Name],

I am writing to sincerely apologize for [describe the mistake or issue].

I fully understand that this has [caused inconvenience/affected your trust/impacted your work], and I take complete responsibility for it.

To make this right, I am taking the following steps:
1. [Immediate action you have taken]
2. [Steps to prevent recurrence]
3. [Any compensation or remedy offered]

I understand if this has affected your trust in us, and I am committed to ensuring this does not happen again.

Once again, I am truly sorry for any inconvenience caused. Please do not hesitate to reach out if you have any questions.

With sincere apologies,
[Your Name]`,
    tips:['Take full responsibility — do not make excuses','Be specific about what you are apologizing for','Describe concrete steps to fix the issue','Keep a genuine and humble tone'],
  },
];

// ── Essay Structure Guide ─────────────────────────────────────
const ESSAY_GUIDE = {
  opinion: {
    title: 'Opinion Essay Structure',
    structure: [
      { part: 'Introduction (60-80 words)', content: 'Hook → Background → Thesis Statement (your opinion clearly stated)', example: '"In my opinion, [topic] is... because [main reasons]."' },
      { part: 'Body Paragraph 1 (80-100 words)', content: 'Topic Sentence → Evidence/Example → Explanation → Link', example: '"The first reason is... For example,... This clearly shows that..."' },
      { part: 'Body Paragraph 2 (80-100 words)', content: 'Topic Sentence → Evidence/Example → Explanation → Link', example: '"Furthermore,... A study by... proves that..."' },
      { part: 'Counter-Argument (50-70 words)', content: 'Acknowledge opposite view → Refute it', example: '"Some may argue that... However, this overlooks..."' },
      { part: 'Conclusion (50-70 words)', content: 'Restate thesis → Summarize points → Final thought', example: '"To conclude, I firmly believe that... because..."' },
    ],
  },
};

// ── Resume Tips ───────────────────────────────────────────────
const RESUME_TIPS = [
  { good: "Results: 'Increased sales by 25% in Q3 2024'",    bad: "Results: 'Did sales work'" },
  { good: "Skills: 'Advanced Excel, SQL, Python'",           bad: "Skills: 'Good with computers'" },
  { good: "Summary: '5-year experienced analyst with...'",   bad: "Summary: 'Hardworking team player'" },
  { good: "Education: 'B.Tech CSE — 8.5 CGPA, 2019'",       bad: "Education: 'B.Tech from college'" },
];

// ── Component ────────────────────────────────────────────────
export default function WritingLabPage() {
  const [activeModule, setActiveModule] = useState('email');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copiedText, setCopiedText] = useState(false);

  const copyTemplate = (text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-gradient-to-br from-rose-600/20 via-pink-600/15 to-orange-600/10 border border-white/10"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg"
              >
                <PenTool size={22} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white">Writing Lab</h1>
                <p className="text-sm text-rose-300 font-medium">Professional writing — har situation ke liye</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              Emails, letters, essays, resumes — real templates, tips, and structures. 
              Confidence se likho koi bhi professional document.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-rose-300">62+</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Templates</p>
            </div>
            <div className="text-center px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xl font-black text-pink-300">6</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Modules</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Module Grid ─────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Writing Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {WRITING_MODULES.map((mod) => (
            <motion.button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-2xl border transition-all text-left group ${
                activeModule === mod.id
                  ? 'border-primary-500/40 bg-primary-500/10'
                  : 'border-white/8 bg-white/3 hover:bg-white/6'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <mod.icon size={18} className="text-white" />
              </div>
              <p className="font-bold text-white text-xs leading-tight">{mod.title}</p>
              <p className="text-[10px] text-slate-500 mt-1">{mod.templates} templates</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Active Module Content ────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeModule === 'email' && (
          <motion.div
            key="email"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="card p-4 border border-blue-500/20 bg-blue-500/5">
              <p className="text-sm text-slate-400">
                <span className="text-blue-300 font-semibold">Email Writing Tips:</span>{' '}
                Subject line should be clear and specific. Keep emails concise. Start with purpose, give context, end with clear call-to-action.
              </p>
            </div>

            {selectedTemplate ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-6 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg">{selectedTemplate.title}</h3>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-sm text-slate-500 hover:text-slate-300 px-3 py-1.5 rounded-lg bg-white/5 transition-colors"
                  >
                    ← Back
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Subject Line</label>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-slate-300">
                    {selectedTemplate.subject}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Body</label>
                    <button
                      onClick={() => copyTemplate(selectedTemplate.body)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {copiedText ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                      {copiedText ? 'Copied!' : 'Copy Template'}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
                    {selectedTemplate.body}
                  </pre>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">💡 Pro Tips</label>
                  <div className="space-y-2">
                    {selectedTemplate.tips.map((tip) => (
                      <div key={tip} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-400">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EMAIL_TEMPLATES.map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    whileHover={{ y: -2 }}
                    className="card p-5 text-left group hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-500/25">
                        <Mail size={18} className="text-blue-400" />
                      </div>
                      <h3 className="font-bold text-white">{template.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">Subject: {template.subject.substring(0, 50)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">{template.tips.length} tips included</span>
                      <span className="text-xs text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Template <ChevronRight size={12} />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeModule === 'essay' && (
          <motion.div key="essay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="card p-6">
              <h3 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
                <BookOpen size={18} className="text-purple-400" />
                {ESSAY_GUIDE.opinion.title}
              </h3>
              <div className="space-y-4">
                {ESSAY_GUIDE.opinion.structure.map(({ part, content, example }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-sm">
                        {i + 1}
                      </div>
                      {i < 4 && <div className="w-px h-8 bg-white/5 my-1" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-bold text-white mb-1">{part}</p>
                      <p className="text-sm text-slate-400 mb-2">{content}</p>
                      <div className="p-3 rounded-xl bg-purple-500/8 border border-purple-500/15">
                        <p className="text-sm text-purple-300 italic">{example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-bold text-white mb-4">Useful Essay Transition Words</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { category:'Adding', words:['Furthermore', 'Moreover', 'In addition', 'Additionally'] },
                  { category:'Contrasting', words:['However', 'Nevertheless', 'On the other hand', 'In contrast'] },
                  { category:'Concluding', words:['To conclude', 'In summary', 'Therefore', 'As a result'] },
                  { category:'Exemplifying', words:['For example', 'For instance', 'Such as', 'Specifically'] },
                ].map(({ category, words }) => (
                  <div key={category}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{category}</p>
                    {words.map(w => (
                      <div key={w} className="text-sm text-slate-400 py-1 border-b border-white/5 last:border-0">{w}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeModule === 'resume' && (
          <motion.div key="resume" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="card p-6">
              <h3 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
                <Briefcase size={18} className="text-amber-400" />
                Resume Writing — Do's & Don'ts
              </h3>
              <div className="space-y-3">
                {RESUME_TIPS.map(({ good, bad }, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                      <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-green-300">{good}</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/8 border border-red-500/20">
                      <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">{bad}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-bold text-white mb-4">Power Action Verbs for Resume</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { category:'Leadership', verbs:['Directed', 'Led', 'Managed', 'Spearheaded', 'Orchestrated'] },
                  { category:'Achievement', verbs:['Achieved', 'Exceeded', 'Delivered', 'Boosted', 'Generated'] },
                  { category:'Creation', verbs:['Developed', 'Designed', 'Built', 'Created', 'Launched'] },
                  { category:'Analysis', verbs:['Analyzed', 'Evaluated', 'Identified', 'Assessed', 'Researched'] },
                ].map(({ category, verbs }) => (
                  <div key={category}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{category}</p>
                    {verbs.map(v => (
                      <div key={v} className="text-sm text-slate-400 py-1 border-b border-white/5 last:border-0">{v}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {(activeModule === 'letter' || activeModule === 'report' || activeModule === 'story') && (
          <motion.div
            key={activeModule}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-8 text-center"
          >
            <PenTool size={48} className="text-rose-400 mx-auto mb-4 opacity-60" />
            <h3 className="text-xl font-bold text-white mb-2">
              {activeModule === 'letter' ? 'Letter Writing' : activeModule === 'report' ? 'Report Writing' : 'Story & Paragraph Writing'}
            </h3>
            <p className="text-slate-400 mb-6">Templates and guides coming very soon! Currently working on email and essay modules.</p>
            <button
              onClick={() => setActiveModule('email')}
              className="btn-primary inline-flex items-center gap-2 px-6 py-2.5"
            >
              Try Email Writing <ArrowRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
