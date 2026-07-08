'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard state hook.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for animations.
import { ArrowLeft, Mail, Edit3, Trash2, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: Definition of formal email prompts for practice.
const EMAIL_PROMPTS = [
  {
    id: 1,
    title: 'Requesting Sick Leave',
    desc: 'Write an email to your manager asking for two days of sick leave due to fever.',
    subject: 'Request for Sick Leave - [Your Name]',
    template: 'Dear [Manager Name],\n\nI am writing to formally request sick leave for today and tomorrow...\n\nThank you for understanding.\n\nBest regards,\n[Your Name]'
  },
  {
    id: 2,
    title: 'Job Application Follow-Up',
    desc: 'Follow up on your job application for the Software Engineer role after one week.',
    subject: 'Follow-up on Application: Software Engineer - [Your Name]',
    template: 'Dear Hiring Manager,\n\nI hope this email finds you well. I am writing to follow up on the status of my application...\n\nSincerely,\n[Your Name]'
  }
];

// Simple English: Informal email words to check and correct.
const INFORMAL_CHECKS = [
  { match: /wanna/gi, issue: '"wanna" is informal', correction: 'would like to' },
  { match: /gonna/gi, issue: '"gonna" is informal', correction: 'going to' },
  { match: /hey there/gi, issue: '"hey there" is informal for business', correction: 'Dear [Name],' },
  { match: /thanks a lot/gi, issue: '"thanks a lot" is too casual', correction: 'Thank you very much' }
];

export default function EmailComposerPage() {
  // Simple English: Track selected email prompt index.
  const [activeIdx, setActiveIdx] = useState(0);
  // Simple English: Store user email text entry.
  const [text, setText] = useState('');
  // Simple English: Track if analysis has run.
  const [checked, setChecked] = useState(false);
  // Simple English: Store list of formal corrections found.
  const [issues, setIssues] = useState([]);
  // Simple English: Store mock professional email rewrite.
  const [rewrite, setRewrite] = useState('');
  // Simple English: Track analysis loading spinner.
  const [loading, setLoading] = useState(false);

  const { addXP } = useUserStore(); // Simple English: Pull XP rewards function.
  const activePrompt = EMAIL_PROMPTS[activeIdx]; // Simple English: Current prompt reference.

  // Simple English: Calculate word count.
  const getWordCount = () => {
    const trimmed = text.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  };

  // Simple English: Apply rules to check and generate polished rewrite.
  const handleCheckEmail = async () => {
    if (!text.trim()) return; // Simple English: Cancel if empty.

    setLoading(true); // Simple English: Start loading state.
    playSound('click'); // Simple English: Play chime.

    // Simple English: Simulate delay for AI check.
    await new Promise((r) => setTimeout(r, 1200));

    const issuesFound = []; // Simple English: Local list of issues.

    // Simple English: Match text against rules.
    INFORMAL_CHECKS.forEach((rule) => {
      if (rule.match.test(text)) {
        issuesFound.push({
          issue: rule.issue,
          correction: rule.correction
        });
      }
    });

    setIssues(issuesFound); // Simple English: Save issues.

    // Simple English: Format email copy with polished corrections.
    let polishedText = text
      .replace(/wanna/gi, 'would like to')
      .replace(/gonna/gi, 'going to')
      .replace(/hey there/gi, 'Dear Manager,')
      .replace(/thanks a lot/gi, 'Thank you very much');

    setRewrite(polishedText); // Simple English: Save rewrite text.
    setChecked(true); // Simple English: Lock screen.
    setLoading(false); // Simple English: Stop loading state.

    if (issuesFound.length === 0) {
      addXP(20); // Simple English: Reward 20 XP.
      playCorrect(); // Simple English: Play success sound.
    } else {
      addXP(10); // Simple English: Reward 10 XP.
      playWrong(); // Simple English: Play warning sound.
    }
  };

  // Simple English: Clear editor screen.
  const handleClear = () => {
    setText('');
    setChecked(false);
    setIssues([]);
    setRewrite('');
    playSound('click');
  };

  return (
    // Simple English: Main layout wrapper.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Navigation link back to writing lab */}
      <Link href="/writing-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Writing Lab
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-emerald-600/10 via-teal-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>✉️</span> Professional Email Composer
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Learn to write executive-ready emails. Draft your response to business prompts, and check for formal tone guidelines!
        </p>
      </div>

      {/* Simple English: Responsive grid split columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simple English: Left Panel - Email Editor input area */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Email Prompt</h2>
            <div className="grid grid-cols-2 gap-2">
              {EMAIL_PROMPTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveIdx(idx);
                    setText(p.template);
                    setChecked(false);
                    setIssues([]);
                    setRewrite('');
                    playSound('click');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-bold ${
                    activeIdx === idx
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-white'
                      : 'border-white/5 bg-white/2 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            <div className="p-3 bg-white/2 rounded-xl border border-white/5 text-xs text-slate-400 leading-relaxed">
              <span className="font-bold text-white block mb-1">Scenario Target:</span>
              {activePrompt.desc}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Subject Line:</span>
              <p className="text-xs text-indigo-300 font-bold">{activePrompt.subject}</p>
            </div>

            <textarea
              disabled={loading}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Draft your formal email here..."
              className="w-full h-[220px] p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed font-mono"
            />
          </div>

          {/* Simple English: Editor actions footer */}
          <div className="flex gap-4">
            <button
              onClick={handleClear}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Trash2 size={16} />
            </button>

            <button
              disabled={!text.trim() || loading}
              onClick={handleCheckEmail}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Evaluating Draft...' : 'Evaluate Email'}
            </button>
          </div>
        </div>

        {/* Simple English: Right Panel - Analysis Feedback */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!checked ? (
              // Simple English: Waiting screen card.
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="card p-8 border border-white/5 bg-white/1 rounded-2xl text-center flex flex-col items-center justify-center min-h-[350px] space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-white text-sm">Draft Evaluation Pending</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Compose your email draft in the editor box and click "Evaluate Email" to check for formal business tone.
                </p>
              </motion.div>
            ) : (
              // Simple English: Analysis report cards.
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Simple English: Tone audit panel */}
                <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-red-400" /> Tone Audit
                  </h3>

                  {issues.length === 0 ? (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2">
                      <CheckCircle size={16} /> Perfect! The email tone matches business standards.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {issues.map((err, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/10 space-y-1">
                          <p className="text-xs text-red-400 font-bold">{err.issue}</p>
                          <p className="text-[11px] text-white">Recommended Phrasing: <span className="underline font-bold text-green-400">{err.correction}</span></p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Simple English: Polished version preview card */}
                <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" /> Executive Business version
                  </h3>
                  <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed">
                    {rewrite}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
