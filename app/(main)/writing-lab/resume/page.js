'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard state hook.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for overlays.
import { ArrowLeft, Edit3, Trash2, ShieldAlert, Sparkles, CheckCircle, BarChart2 } from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: Definition of weak verbs and strong professional equivalents.
const VERB_RULES = [
  { match: /\bdid\b/gi, issue: '"did" is a weak verb', correction: 'implemented / executed' },
  { match: /\bhelped\b/gi, issue: '"helped" is a weak verb', correction: 'collaborated / assisted' },
  { match: /\bworked on\b/gi, issue: '"worked on" is a weak verb', correction: 'engineered / developed' },
  { match: /\bmade\b/gi, issue: '"made" is a weak verb', correction: 'architected / created' }
];

export default function ResumePage() {
  // Simple English: Store user text input experience draft.
  const [text, setText] = useState('');
  // Simple English: Track if evaluation is done.
  const [checked, setChecked] = useState(false);
  // Simple English: Store list of weak verbs found.
  const [issues, setIssues] = useState([]);
  // Simple English: Store mock professional resume bullet point rewrite.
  const [rewrite, setRewrite] = useState('');
  // Simple English: Track analysis loading spinner.
  const [loading, setLoading] = useState(false);

  const { addXP } = useUserStore(); // Simple English: Pull XP rewards function.

  // Simple English: Calculate word count.
  const getWordCount = () => {
    const trimmed = text.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  };

  // Simple English: Apply rules to check and generate polished rewrite.
  const handleCheckResume = async () => {
    if (!text.trim()) return; // Simple English: Cancel if empty.

    setLoading(true); // Simple English: Start loading state.
    playSound('click'); // Simple English: Play chime.

    // Simple English: Simulate delay for AI check.
    await new Promise((r) => setTimeout(r, 1200));

    const issuesFound = []; // Simple English: Local list of issues.

    // Simple English: Match text against rules.
    VERB_RULES.forEach((rule) => {
      if (rule.match.test(text)) {
        issuesFound.push({
          issue: rule.issue,
          correction: rule.correction
        });
      }
    });

    setIssues(issuesFound); // Simple English: Save issues.

    // Simple English: Format bullet point with polished corrections.
    let polishedText = text
      .replace(/\bdid\b/gi, 'executed')
      .replace(/\bhelped\b/gi, 'collaborated on')
      .replace(/\bworked on\b/gi, 'developed')
      .replace(/\bmade\b/gi, 'architected');

    // Simple English: Prepend a bullet point character.
    polishedText = `• ${polishedText.charAt(0).toUpperCase() + polishedText.slice(1)}`;

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
          <span>📄</span> Professional Resume Builder
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Learn to write impactful resume bullet points. Draft your work experience, and check for strong action verbs!
        </p>
      </div>

      {/* Simple English: Responsive grid split columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simple English: Left Panel - Resume Editor input area */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Edit3 size={14} /> Job Experience Draft
              </span>
              <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded font-mono">
                Words: {getWordCount()}
              </span>
            </div>

            <textarea
              disabled={loading}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. I did coding on the website and helped my team make a database..."
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
              onClick={handleCheckResume}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Evaluating Draft...' : 'Evaluate Experience'}
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
                  <BarChart2 size={24} />
                </div>
                <h3 className="font-bold text-white text-sm">Evaluation Pending</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Compose your job experience draft in the editor box and click "Evaluate Experience" to check for strong verbs.
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
                {/* Simple English: Action verbs audit panel */}
                <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-red-400" /> Action Verbs Audit
                  </h3>

                  {issues.length === 0 ? (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2">
                      <CheckCircle size={16} /> Perfect! The bullet point uses strong professional verbs.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {issues.map((err, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/10 space-y-1">
                          <p className="text-xs text-red-400 font-bold">{err.issue}</p>
                          <p className="text-[11px] text-white">Recommended Action Verbs: <span className="underline font-bold text-green-400">{err.correction}</span></p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Simple English: Polished version preview card */}
                <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" /> Executive Resume Bullet
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
