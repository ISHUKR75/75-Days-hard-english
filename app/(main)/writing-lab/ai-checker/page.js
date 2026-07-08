'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import hook to manage text state and review logs.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for overlay transitions.
import { ArrowLeft, Edit3, Trash2, CheckCircle, BarChart2, ShieldAlert, Sparkles } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import store to reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound trigger chimes.

// Simple English: Definition of Indian English typical grammar mistake rules for client-side matching.
const GRAMMAR_RULES = [
  { match: /i am having/gi, issue: '"I am having" instead of "I have"', correction: 'I have', explanation: 'Do not use continuous tense for possession.' },
  { match: /discuss about/gi, issue: '"discuss about" instead of "discuss"', correction: 'discuss', explanation: 'Discuss does not require the preposition "about".' },
  { match: /he do not/gi, issue: '"he do not" instead of "he does not"', correction: 'he does not', explanation: 'Singular subjects (he/she/it) require "does not".' },
  { match: /she don't/gi, issue: '"she don\'t" instead of "she doesn\'t"', correction: 'she doesn\'t', explanation: 'Singular subjects (he/she/it) require "doesn\'t".' },
  { match: /does he has/gi, issue: '"does he has" instead of "does he have"', correction: 'does he have', explanation: 'Auxiliary verb "does" takes base verb "have".' },
  { match: /order for/gi, issue: '"order for" instead of "order"', correction: 'order', explanation: 'When acting as a verb, "order" does not take "for".' }
];

export default function AICheckerPage() {
  // Simple English: Store user text input.
  const [text, setText] = useState('');
  // Simple English: Track if analysis has run.
  const [analyzed, setAnalyzed] = useState(false);
  // Simple English: Store list of grammar issues found.
  const [issues, setIssues] = useState([]);
  // Simple English: Store mock professional rewrite.
  const [rewrite, setRewrite] = useState('');
  // Simple English: Track loading state.
  const [loading, setLoading] = useState(false);

  const { addXP } = useUserStore(); // Simple English: Extract XP update function.

  // Simple English: Calculate word count.
  const getWordCount = () => {
    const trimmed = text.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  };

  // Simple English: Parse text for issues and generate polished rewrite.
  const handleAnalyzeText = async () => {
    if (!text.trim()) return; // Simple English: Ignore if blank.

    setLoading(true); // Simple English: Start analysis loading spinner.
    playSound('click'); // Simple English: Play click sound.

    // Simple English: Simulate delay for AI check.
    await new Promise((r) => setTimeout(r, 1500));

    const issuesFound = []; // Simple English: Local list to hold issues.

    // Simple English: Check text against grammar rules regex.
    GRAMMAR_RULES.forEach((rule) => {
      if (rule.match.test(text)) {
        issuesFound.push({
          issue: rule.issue,
          correction: rule.correction,
          explanation: rule.explanation
        });
      }
    });

    setIssues(issuesFound); // Simple English: Save issues list.

    // Simple English: Generate mock polished rewrite (adding professional business jargon).
    let polishedRewrite = text
      .replace(/i am having/gi, 'I have')
      .replace(/discuss about/gi, 'discuss')
      .replace(/he do not/gi, 'he does not')
      .replace(/she don't/gi, "she doesn't")
      .replace(/does he has/gi, 'does he have')
      .replace(/order for/gi, 'order');

    // Simple English: Append business signature prefix.
    polishedRewrite = `Dear Team,\n\nI hope this email finds you well. ${polishedRewrite}\n\nShould you have any questions, please do not hesitate to contact me.\n\nBest regards,\n[Your Name]`;

    setRewrite(polishedRewrite); // Simple English: Save rewrite text.
    setAnalyzed(true); // Simple English: Set analyzed status to true.
    setLoading(false); // Simple English: Turn spinner off.

    if (issuesFound.length === 0) {
      addXP(25); // Simple English: Give 25 XP for perfect grammar!
      playCorrect(); // Simple English: Play success chime.
    } else {
      addXP(10); // Simple English: Give 10 XP for trying.
      playWrong(); // Simple English: Play warning chime.
    }
  };

  // Simple English: Clear editor screen.
  const handleClear = () => {
    setText('');
    setAnalyzed(false);
    setIssues([]);
    setRewrite('');
    playSound('click');
  };

  return (
    // Simple English: Outer layout wrapper.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Navigation back link */}
      <Link href="/writing-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Writing Lab
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-emerald-600/10 via-teal-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>✍️</span> Writing AI Checker
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Write an email, proposal, or essay. Let the editor highlight grammar mistakes and provide an Apple-style polished rewrite!
        </p>
      </div>

      {/* Simple English: Bento grid columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Simple English: Left Panel - Text Editor input area */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Edit3 size={14} /> Editor Box
              </span>
              {/* Simple English: Live word counter tracker */}
              <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-0.5 rounded font-mono">
                Words: {getWordCount()} | Chars: {text.length}
              </span>
            </div>

            <textarea
              disabled={loading}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your English text or write a formal message here..."
              className="w-full h-[280px] p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed"
            />
          </div>

          {/* Simple English: Trigger actions bar */}
          <div className="flex gap-4">
            <button
              onClick={handleClear}
              className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Trash2 size={16} />
            </button>

            <button
              disabled={!text.trim() || loading}
              onClick={handleAnalyzeText}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Analyzing Content...' : 'Analyze Writing'}
            </button>
          </div>
        </div>

        {/* Simple English: Right Panel - Analysis Feedback & Polished version display */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!analyzed ? (
              // Simple English: Default instructions state card.
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
                <h3 className="font-bold text-white text-sm">Waiting for Analysis</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Enter your text in the editor and click "Analyze Writing" to see errors list and your formal rewrite.
                </p>
              </motion.div>
            ) : (
              // Simple English: Active parsed results board.
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Simple English: Grammar Issues checklist widget */}
                <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-red-400" /> Grammar Analysis
                  </h3>
                  
                  {issues.length === 0 ? (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2">
                      <CheckCircle size={16} /> Perfect! No grammatical mistakes detected.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {issues.map((err, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/10 space-y-1">
                          <p className="text-xs text-red-400 font-bold">{err.issue}</p>
                          <p className="text-[11px] text-white">Suggested Correction: <span className="underline font-bold text-green-400">{err.correction}</span></p>
                          <p className="text-[10px] text-slate-400 italic mt-0.5">{err.explanation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Simple English: Polished email/proposal rewrite widget */}
                <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" /> Polished Business Version
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
