// ============================================================
// WritingSection.js — Complete Writing Drills Experience
// Sentence builder, error fixing, email templates, free writing,
// word count, model answers. Gen Z friendly! ✍️
// ============================================================

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  PenLine, Eye, EyeOff, CheckCircle2, Copy, Check,
  Lightbulb, Target, Zap, BookOpen
} from 'lucide-react';

// ── Animations ─────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// ── Background blobs ──────────────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[450px] h-[450px] rounded-full bg-indigo-600/12 blur-3xl -top-20 -right-32"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-3xl bottom-10 -left-20"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity, delay: 4 }} />
    </div>
  );
}

// ── Day 1 Sentence Building exercises ────────────────────────
const SENTENCE_EXERCISES = [
  { hindi: 'मेरा नाम राहुल है और मैं दिल्ली में रहता हूँ।', model: 'My name is Rahul and I live in Delhi.', hint: 'Use "and" to join two facts about yourself' },
  { hindi: 'वह रोज़ सुबह 6 बजे उठती है।', model: "She wakes up every morning at 6 o'clock.", hint: 'She/He/It → verb + s (wakes, not wake)' },
  { hindi: 'मुझे अंग्रेज़ी बोलना पसंद है।', model: 'I like to speak English. / I like speaking English.', hint: 'Both "like to + verb" and "like + verb+ing" are correct!' },
  { hindi: 'क्या आप मेरी मदद कर सकते हैं?', model: 'Can you help me? / Could you help me? (more polite)', hint: '"Could" is more polite than "Can" in requests' },
  { hindi: 'कल बहुत बारिश हुई।', model: 'It rained a lot yesterday. / There was heavy rain yesterday.', hint: 'Use "It rained" for simple past weather events' },
  { hindi: 'मैं अगले साल अमेरिका जाऊंगा।', model: 'I will go to America next year. / I am going to America next year.', hint: '"Will" for decisions; "going to" for plans' },
  { hindi: 'वे सब मिलकर खाना खाते हैं।', model: 'They all eat together.', hint: '"They all" — plural subject needs plural verb (eat, not eats)' },
  { hindi: 'मुझे नहीं पता यह सही है या नहीं।', model: "I don't know whether this is correct or not.", hint: '"Whether...or not" for expressing doubt/uncertainty' },
  { hindi: 'जब भी मैं थका होता हूँ, मैं संगीत सुनता हूँ।', model: 'Whenever I am tired, I listen to music.', hint: '"Whenever" = at any time that — great linking word' },
  { hindi: 'मेरी माँ बहुत अच्छा खाना बनाती हैं।', model: 'My mother cooks very well. / My mother makes very delicious food.', hint: '"Cook well" is more natural than "cook good"' },
];

// ── Day 1 Error Fix exercises ─────────────────────────────────
const ERROR_EXERCISES = [
  { wrong: "She don't like coffee.", correct: "She doesn't like coffee.", explanation: "'Don't' is for I/You/We/They. For She/He/It, use 'doesn't'" },
  { wrong: 'I am agree with you.', correct: 'I agree with you.', explanation: "'Agree' is a stative verb — never use 'am/is/are + agree'" },
  { wrong: 'He go to school every day.', correct: 'He goes to school every day.', explanation: 'He/She/It in Present Simple: add -s or -es to the verb' },
  { wrong: 'I have seen him yesterday.', correct: 'I saw him yesterday.', explanation: "'Yesterday' signals Simple Past — don't use Present Perfect with past time words" },
  { wrong: 'Can you please to help me?', correct: 'Can you please help me?', explanation: "After modal verbs (can, will, should), use BASE verb — no 'to'" },
  { wrong: 'She is more better than me.', correct: 'She is better than me.', explanation: "'Better' is already comparative — never say 'more better'" },
  { wrong: 'I am living here since 2020.', correct: 'I have been living here since 2020.', explanation: "'Since' requires Present Perfect (have been), not Present Continuous" },
  { wrong: 'He gave me a useful advise.', correct: 'He gave me useful advice.', explanation: "'Advice' is uncountable — no 'a', no plural 's'" },
  { wrong: 'I will call you when I will reach.', correct: 'I will call you when I reach.', explanation: "After 'when/if/until/before/after' for future — use Present Simple (not will)" },
  { wrong: 'They was at the party last night.', correct: 'They were at the party last night.', explanation: "Plural subjects (they/we) use 'were', not 'was'" },
];

// ── Email templates ───────────────────────────────────────────
const EMAIL_TEMPLATES = [
  {
    subject: 'Job Application Email',
    prompt: "Write an email applying for a Software Developer job at TechCorp.",
    model: `Subject: Application for Software Developer Position

Dear Hiring Manager,

I am writing to express my interest in the Software Developer position advertised on your website. I have three years of experience in web development using React and Node.js.

I am confident that my technical skills and enthusiasm for learning would make me a valuable asset to your team. I have attached my resume for your review.

I would welcome the opportunity to discuss my qualifications further. Please feel free to contact me at rahul@email.com or 9876543210.

Thank you for considering my application.

Yours sincerely,
Rahul Kumar`,
    tips: ['Use "Dear Hiring Manager" when you don\'t know the name', '"I am writing to express my interest..." is a perfect opener', 'Keep it under 200 words — recruiters are busy!', 'End with "Yours sincerely" (formal but named) or "Yours faithfully" (when unknown)'],
  },
  {
    subject: 'Leave Request',
    prompt: 'Write an email to your manager requesting 2 days of sick leave.',
    model: `Subject: Leave Request — 3rd and 4th July 2025

Dear Mr. Sharma,

I am writing to request sick leave for 3rd and 4th July 2025. I am unwell with a fever and have been advised rest by my doctor.

I have ensured that my pending tasks are up to date. In case of any urgent work, please feel free to contact me on my mobile.

I will resume work on 5th July. Please approve my leave request.

Thank you for your understanding.

Regards,
Priya Singh`,
    tips: ['Include exact dates in subject line', '"I have ensured..." shows responsibility', '"Please feel free to contact me" = I am reachable', '"Regards" is standard for professional emails'],
  },
  {
    subject: 'Post-Interview Thank You',
    prompt: 'Write a thank-you email to the interviewer after a job interview.',
    model: `Subject: Thank You — Interview for Marketing Manager Role

Dear Ms. Patel,

Thank you so much for taking the time to interview me today for the Marketing Manager position. It was a pleasure learning more about the role and the exciting projects your team is working on.

Our conversation reinforced my enthusiasm for this opportunity. I am confident that my experience in digital marketing aligns well with your team's goals.

I look forward to hearing from you regarding the next steps. Please let me know if you need any additional information.

Thank you once again for the opportunity.

Best regards,
Amit Verma`,
    tips: ['Send the thank-you within 24 hours of interview', 'Mention something specific from the interview', '"I look forward to hearing from you..." is a perfect close', 'This 1 email can often DECIDE who gets the job!'],
  },
];

// ── Free writing prompts ───────────────────────────────────────
const FREE_WRITE_PROMPTS = [
  {
    topic: 'About Yourself',
    prompt: 'Write 5-8 sentences introducing yourself. Include your name, where you\'re from, what you do, and your goal for learning English.',
    model: 'My name is Priya Sharma. I am from Jaipur, Rajasthan. I am 23 years old and I work as a customer service executive at a bank. I have been working there for two years. In my free time, I love reading books and watching English movies. I am learning English because I want to grow in my career and communicate confidently with international clients. My goal is to speak English fluently without hesitation within the next six months.',
    wordTarget: 80,
  },
  {
    topic: 'Your Daily Routine',
    prompt: "Describe your daily routine using time expressions like 'first', 'then', 'after that', 'finally'.",
    model: "I wake up every morning at 6:30 AM. First, I brush my teeth and have a shower. Then I eat breakfast with my family, usually roti and tea. After breakfast, I get ready for work and leave at 8:00 AM. I take the metro to the office, which takes about 30 minutes. At the office, I start by checking emails and planning my tasks. I have lunch at 1:00 PM. After work, I reach home by 6:30 PM. In the evening, I practice English for one hour. Finally, I have dinner and go to sleep by 10:30 PM.",
    wordTarget: 100,
  },
  {
    topic: 'Why You Want to Learn English',
    prompt: "Write about why English matters to you and how it will change your life. Be honest and personal!",
    model: "English is the language of opportunity, and I want to make the most of every opportunity in my life. Right now, I feel limited because I cannot express my thoughts clearly in English during meetings and interviews. I have brilliant ideas, but I struggle to communicate them professionally. This is why I decided to take this 75-day English challenge seriously. With fluent English, I will be able to apply for better job positions, talk to international clients with confidence, and even travel abroad without any language barrier. Learning English is not just about language for me — it is about changing my entire future.",
    wordTarget: 120,
  },
];

// ── SentenceBuilder component ──────────────────────────────────
function SentenceBuilder({ exercises }) {
  const [inputs, setInputs] = useState({});
  const [revealed, setRevealed] = useState({});
  const [copied, setCopied] = useState({});

  const handleCopy = async (text, i) => {
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(p => ({ ...p, [i]: true }));
    setTimeout(() => setCopied(p => ({ ...p, [i]: false })), 1800);
  };

  return (
    <div className="space-y-4">
      {exercises.map((ex, i) => (
        <motion.div key={i} variants={fadeUp}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
              Hindi
            </span>
            <p className="text-amber-200 font-semibold text-sm">{ex.hindi}</p>
          </div>
          {ex.hint && (
            <p className="text-xs text-gray-500 italic flex items-start gap-1.5">
              <Lightbulb size={11} className="text-amber-400 flex-shrink-0 mt-0.5" />
              {ex.hint}
            </p>
          )}
          <textarea
            value={inputs[i] || ''}
            onChange={e => setInputs(p => ({ ...p, [i]: e.target.value }))}
            placeholder="Write your English translation here..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm resize-none outline-none focus:border-indigo-500/50 placeholder:text-gray-600 min-h-[70px] transition-colors"
          />
          <div className="flex items-center justify-end gap-2">
            {revealed[i] && (
              <button onClick={() => handleCopy(ex.model, i)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl text-xs font-medium transition-all">
                {copied[i] ? <Check size={11} /> : <Copy size={11} />}
                {copied[i] ? 'Copied!' : 'Copy'}
              </button>
            )}
            <button onClick={() => setRevealed(p => ({ ...p, [i]: true }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                revealed[i] ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm'
              }`}>
              {revealed[i] ? <><CheckCircle2 size={11} /> Revealed</> : <><Eye size={11} /> Show Model</>}
            </button>
          </div>
          <AnimatePresence>
            {revealed[i] && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-xs text-emerald-400 font-semibold mb-1">Model Answer</p>
                  <p className="text-emerald-200 text-sm font-medium">{ex.model}</p>
                  <p className="text-gray-500 text-xs mt-2">Your version doesn't need to match exactly — English has many correct ways!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ── Error Fixer component ─────────────────────────────────────
function ErrorFixer({ exercises }) {
  const [inputs, setInputs] = useState({});
  const [revealed, setRevealed] = useState({});

  return (
    <div className="space-y-4">
      {exercises.map((ex, i) => (
        <motion.div key={i} variants={fadeUp}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
              ❌ Wrong
            </span>
            <p className="text-red-300 line-through text-sm">{ex.wrong}</p>
          </div>
          <input
            type="text"
            value={inputs[i] || ''}
            onChange={e => setInputs(p => ({ ...p, [i]: e.target.value }))}
            placeholder="Write the corrected sentence..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500/50 placeholder:text-gray-600 transition-colors"
          />
          <button onClick={() => setRevealed(p => ({ ...p, [i]: true }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              revealed[i] ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}>
            {revealed[i] ? '✓ Answer Shown' : 'Show Correct Answer'}
          </button>
          <AnimatePresence>
            {revealed[i] && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-emerald-400">✅ Correct:</span>
                    <p className="text-emerald-200 font-semibold text-sm">{ex.correct}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold text-blue-400 flex-shrink-0">💡 Why:</span>
                    <p className="text-gray-300 text-xs leading-relaxed">{ex.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ── Email Writer component ────────────────────────────────────
function EmailWriter({ templates }) {
  const [idx, setIdx] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [showModel, setShowModel] = useState(false);

  const t = templates[idx];
  const wordCount = userEmail.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {templates.map((tmpl, i) => (
          <button key={i} onClick={() => { setIdx(i); setShowModel(false); setUserEmail(''); }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              idx === i ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
            }`}>
            {tmpl.subject}
          </button>
        ))}
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">
        <p className="text-indigo-300 font-semibold text-sm mb-2">📬 Task: {t.prompt}</p>
        <div className="space-y-1 mt-3">
          {t.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
              <span className="text-indigo-400 font-bold flex-shrink-0">→</span>
              {tip}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Write your email:</span>
          <span className={`text-xs font-semibold ${wordCount > 50 ? 'text-emerald-400' : 'text-gray-500'}`}>{wordCount} words</span>
        </div>
        <textarea
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
          placeholder="Subject: ...\n\nDear [Name],"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm resize-none outline-none focus:border-indigo-500/50 placeholder:text-gray-600 min-h-[200px] font-mono transition-colors leading-relaxed"
        />
      </div>

      <button onClick={() => setShowModel(p => !p)}
        className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all">
        {showModel ? <><EyeOff size={14} /> Hide Model</> : <><Eye size={14} /> See Model Email</>}
      </button>

      <AnimatePresence>
        {showModel && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
              <p className="text-emerald-400 font-bold text-xs mb-3 uppercase tracking-wider">Model Email</p>
              <pre className="text-gray-200 text-sm font-mono leading-relaxed whitespace-pre-wrap">{t.model}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Free Writer component ─────────────────────────────────────
function FreeWriter({ prompts }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [showModel, setShowModel] = useState(false);

  const p = prompts[idx];
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const progress = Math.min(100, Math.round((wordCount / p.wordTarget) * 100));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {prompts.map((pr, i) => (
          <button key={i} onClick={() => { setIdx(i); setText(''); setShowModel(false); }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              idx === i ? 'bg-violet-600 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
            }`}>
            {pr.topic}
          </button>
        ))}
      </div>

      <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5">
        <p className="text-violet-300 font-semibold text-sm mb-1">✍️ {p.topic}</p>
        <p className="text-gray-300 text-sm leading-relaxed">{p.prompt}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
          <Target size={12} /> Target: {p.wordTarget} words
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>{wordCount}/{p.wordTarget} words</span>
          <span className={progress >= 100 ? 'text-emerald-400 font-bold' : 'text-gray-500'}>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
          <motion.div
            className={`h-full rounded-full ${progress >= 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-violet-500 to-indigo-400'}`}
            animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
          />
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Start writing in English here... Don't worry about perfection. Just write!"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm resize-none outline-none focus:border-violet-500/50 placeholder:text-gray-600 min-h-[160px] transition-colors leading-relaxed"
        />
      </div>

      <button onClick={() => setShowModel(p => !p)}
        className="w-full flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-bold transition-all">
        {showModel ? <><EyeOff size={14} /> Hide Model</> : <><Eye size={14} /> See Model Paragraph</>}
      </button>

      <AnimatePresence>
        {showModel && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-5">
              <p className="text-violet-400 font-bold text-xs mb-3 uppercase tracking-wider">Model Paragraph</p>
              <p className="text-gray-200 text-sm leading-relaxed">{p.model}</p>
              <p className="text-gray-500 text-xs mt-3">Your version doesn't need to match word-for-word — express yourself naturally!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function WritingSection({ data, dayNum }) {
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  const [activeTab, setActiveTab] = useState('sentences');
  const [completedSections, setCompletedSections] = useState(new Set());
  const [xpEarned, setXpEarned] = useState(0);

  const TABS = [
    { id: 'sentences', label: '🏗️ Build Sentences', shortLabel: 'Sentences' },
    { id: 'errors',    label: '🔍 Fix Errors',      shortLabel: 'Fix Errors' },
    { id: 'email',     label: '📧 Email Writing',   shortLabel: 'Email' },
    { id: 'free',      label: '✍️ Free Writing',    shortLabel: 'Free Write' },
    { id: 'tips',      label: '💡 Writing Tips',    shortLabel: 'Tips' },
  ];

  const markDone = (section) => {
    if (completedSections.has(section)) return;
    setCompletedSections(p => new Set([...p, section]));
    addXP(20, `Completed writing section: ${section}`);
    recordQuestionResult(`writing-day${dayNum}-${section}`, true);
    setXpEarned(p => p + 20);
  };

  const WRITING_TIPS = [
    { emoji: '📝', title: 'Start simple, then expand', desc: 'Begin with short, clear sentences. Add details once you\'re comfortable. "I eat food" → "I eat healthy food every morning because it keeps me energetic."' },
    { emoji: '🔄', title: 'Read what you write OUT LOUD', desc: "If it sounds weird when you say it, it probably reads weird too. Your ear is your best editor." },
    { emoji: '📖', title: 'Steal good phrases', desc: 'See a great phrase in a book or email? Use it in your own writing! This is how all great writers learn — note it down and use it within 24 hours.' },
    { emoji: '✏️', title: 'The 5-sentence daily rule', desc: "Write exactly 5 English sentences every single day, even if it's just about what you ate. Consistency over perfection, always." },
    { emoji: '🗑️', title: 'Editing is writing', desc: "Don't worry about mistakes in the first draft. Write freely, then go back and fix. First drafts are always messy — even for professional writers." },
    { emoji: '🌐', title: 'Write in English everywhere', desc: 'Change your diary, WhatsApp notes, and to-do lists to English. Small daily exposure builds huge vocabulary and grammar intuition over time.' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Blobs />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg">📄</div>
              <div>
                <h1 className="text-white font-black text-2xl">Writing Drills</h1>
                <p className="text-gray-400 text-sm mt-0.5">Sentences → Emails → Essays. Let's write! ✍️</p>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-indigo-400">{completedSections.size}/4</div>
                <div className="text-xs text-gray-400">done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-amber-400">{xpEarned}</div>
                <div className="text-xs text-gray-400">XP</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full"
                animate={{ width: `${(completedSections.size / 4) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>
        </motion.div>

        {/* ── TABS ────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 flex-1 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'sentences' && (
            <motion.div key="sentences" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4">
                <p className="text-indigo-300 text-sm">🏗️ Translate each Hindi sentence to English. Reveal model answer to compare!</p>
              </div>
              <SentenceBuilder exercises={SENTENCE_EXERCISES} />
              <button onClick={() => markDone('sentences')}
                className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                  completedSections.has('sentences') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                }`}>
                {completedSections.has('sentences') ? '✓ Section Complete!' : 'Mark as Done (+20 XP)'}
              </button>
            </motion.div>
          )}
          {activeTab === 'errors' && (
            <motion.div key="errors" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                <p className="text-red-300 text-sm">🔍 Each sentence below has ONE error. Find it, fix it, and learn WHY it was wrong!</p>
              </div>
              <ErrorFixer exercises={ERROR_EXERCISES} />
              <button onClick={() => markDone('errors')}
                className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                  completedSections.has('errors') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-600 text-white hover:bg-red-500'
                }`}>
                {completedSections.has('errors') ? '✓ Section Complete!' : 'Mark as Done (+20 XP)'}
              </button>
            </motion.div>
          )}
          {activeTab === 'email' && (
            <motion.div key="email" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                <p className="text-blue-300 text-sm">📧 Practice professional emails from scratch! Tips and model emails included.</p>
              </div>
              <EmailWriter templates={EMAIL_TEMPLATES} />
              <button onClick={() => markDone('email')}
                className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                  completedSections.has('email') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}>
                {completedSections.has('email') ? '✓ Section Complete!' : 'Mark as Done (+20 XP)'}
              </button>
            </motion.div>
          )}
          {activeTab === 'free' && (
            <motion.div key="free" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-4">
                <p className="text-violet-300 text-sm">✍️ Express yourself freely in English! Compare with model paragraph when ready.</p>
              </div>
              <FreeWriter prompts={FREE_WRITE_PROMPTS} />
              <button onClick={() => markDone('free')}
                className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                  completedSections.has('free') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-violet-600 text-white hover:bg-violet-500'
                }`}>
                {completedSections.has('free') ? '✓ Section Complete!' : 'Mark as Done (+20 XP)'}
              </button>
            </motion.div>
          )}
          {activeTab === 'tips' && (
            <motion.div key="tips" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
              {WRITING_TIPS.map((tip, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{tip.emoji}</span>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1.5">{tip.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
