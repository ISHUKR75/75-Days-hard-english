'use client';
// ============================================================
// Day 2 — Writing Practice Page
// Guided writing tasks, templates, live word count, AI-style
// checklist evaluation, and structured exercises.
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Pencil, ArrowLeft, CheckCircle2, XCircle, ChevronDown,
  ChevronUp, Star, Target, RotateCcw, Copy, Download,
  Sparkles, AlertTriangle, BookOpen, Eye, EyeOff, Lightbulb
} from 'lucide-react';

// ── Checklist evaluator ──────────────────────────────────────────────────────
function EvaluationChecklist({ text, checklist }) {
  if (!text.trim()) return null;
  const lower = text.toLowerCase();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <h4 className="font-semibold text-gray-700 mb-3 text-sm flex items-center gap-2">
        <Target className="w-4 h-4 text-blue-600" />
        Self-Check
      </h4>
      <div className="space-y-2">
        {checklist.map((item, i) => {
          const matches = item.keywords?.some(kw => lower.includes(kw.toLowerCase()));
          return (
            <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg text-sm ${matches ? 'bg-green-50' : 'bg-gray-50'}`}>
              {matches
                ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                : <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />}
              <span className={matches ? 'text-green-800' : 'text-gray-500'}>{item.label}</span>
            </div>
          );
        })}
      </div>
      {checklist.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
          <span>{checklist.filter(item => item.keywords?.some(kw => lower.includes(kw.toLowerCase()))).length}/{checklist.length} checked</span>
          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full"
              style={{ width: `${(checklist.filter(item => item.keywords?.some(kw => lower.includes(kw.toLowerCase()))).length / checklist.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Writing task card ────────────────────────────────────────────────────────
function WritingTaskCard({ task, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const [userText, setUserText] = useState('');
  const [showTemplate, setShowTemplate] = useState(false);
  const [copied, setCopied]     = useState(false);
  const MIN_WORDS = task.minWords || 50;
  const MAX_WORDS = task.maxWords || 200;

  const wordCount = userText.trim() ? userText.trim().split(/\s+/).length : 0;
  const wordPct   = Math.min((wordCount / MIN_WORDS) * 100, 100);

  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(userText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, [userText]);

  // Build a simple checklist from task keywords if not provided
  const checklist = task.checklist || task.evaluationCriteria || [
    { label: 'Mentioned your name', keywords: ['name is', 'i am', "i'm"] },
    { label: 'Mentioned education or qualification', keywords: ['b.tech', 'btech', 'degree', 'graduate', 'completed', 'graduated', 'pursuing', 'mba', 'bca', 'bsc', 'college', 'university'] },
    { label: 'Mentioned current role/company', keywords: ['work at', 'work as', 'working at', 'i am a', 'software', 'engineer', 'developer', 'manager', 'analyst'] },
    { label: 'Mentioned city or origin', keywords: ['from', 'belong', 'hail', 'based in', 'born in'] },
    { label: 'Mentioned a hobby or interest', keywords: ['love', 'enjoy', 'passionate', 'interested in', 'hobby', 'hobbies', 'fond of', 'like'] },
    { label: 'Wrote a goal or aspiration', keywords: ['goal', 'aspire', 'aim', 'want to', 'look forward', 'hope'] },
    { label: 'Used a proper closing', keywords: ['thank', 'pleasure', 'opportunity', 'look forward', 'excited'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Task header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white ${
            index % 5 === 0 ? 'bg-blue-600' : index % 5 === 1 ? 'bg-purple-600' : index % 5 === 2 ? 'bg-green-600' :
            index % 5 === 3 ? 'bg-orange-600' : 'bg-red-600'
          }`}>{index + 1}</div>
          <div>
            <p className="font-bold text-gray-800">{task.title}</p>
            <div className="flex gap-2 mt-0.5">
              {task.type && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{task.type}</span>}
              {task.difficulty && <span className={`text-xs px-2 py-0.5 rounded-full ${
                task.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>{task.difficulty}</span>}
              <span className="text-xs text-gray-400">{MIN_WORDS}–{MAX_WORDS} words</span>
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-5">
              {/* Instructions */}
              {task.instructions && (
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <p className="font-semibold text-blue-800 text-sm mb-1">Instructions:</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{task.instructions}</p>
                </div>
              )}

              {/* Hindi prompt */}
              {task.hindi && (
                <div className="bg-orange-50 rounded-xl p-3 border border-orange-100">
                  <p className="text-sm text-gray-700">{task.hindi}</p>
                </div>
              )}

              {/* Template toggle */}
              {task.template && (
                <div>
                  <button
                    onClick={() => setShowTemplate(v => !v)}
                    className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {showTemplate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showTemplate ? 'Hide Template' : 'Show Template'}
                  </button>
                  <AnimatePresence>
                    {showTemplate && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="mt-2 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                          <p className="text-xs font-semibold text-indigo-700 mb-2">Template (Fill in your details):</p>
                          <p className="text-sm text-gray-700 whitespace-pre-line font-mono leading-relaxed">{task.template}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Tips */}
              {task.tips?.length > 0 && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                  <p className="text-xs font-semibold text-yellow-700 mb-2 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5" /> Writing Tips:
                  </p>
                  <ul className="space-y-1.5">
                    {task.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                        <Star className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />{tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Writing area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Your Writing:</label>
                  <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    wordCount < MIN_WORDS ? 'bg-red-50 text-red-600' :
                    wordCount <= MAX_WORDS ? 'bg-green-50 text-green-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {wordCount} words
                  </div>
                </div>

                <textarea
                  rows={8}
                  value={userText}
                  onChange={e => setUserText(e.target.value)}
                  placeholder={task.placeholder || 'Start writing your introduction here in English...'}
                  className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none leading-relaxed"
                />

                {/* Word count bar */}
                <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${wordCount >= MIN_WORDS ? 'bg-green-500' : 'bg-blue-400'}`}
                    animate={{ width: `${wordPct}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Target: {MIN_WORDS}–{MAX_WORDS} words</p>
              </div>

              {/* Copy button */}
              {userText.trim().length > 0 && (
                <button
                  onClick={copyText}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
              )}

              {/* Evaluation checklist */}
              {userText.trim().length > 20 && (
                <EvaluationChecklist text={userText} checklist={checklist} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main writing page ─────────────────────────────────────────────────────────
export default function Day2WritingPage() {
  const [tasks, setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);

  // Built-in comprehensive writing tasks for Day 2
  const BUILT_IN_TASKS = [
    {
      id: 1,
      title: '30-Second Spoken Introduction (Written Form)',
      type: 'Spoken English',
      difficulty: 'easy',
      minWords: 60,
      maxWords: 100,
      instructions: 'Write exactly what you would say if you had 30 seconds to introduce yourself to a stranger at an event. Use simple, natural language.',
      hindi: 'Imagine aap kisi event pe kisi anjaan se milte hain. 30 seconds mein apna introduction likhein.',
      template: 'Hi! My name is [NAME]. I am from [CITY]. I work as [ROLE] at [COMPANY / I am studying COURSE at COLLEGE]. In my free time, I love [HOBBY]. Nice to meet you!',
      placeholder: 'Hi! My name is...',
      tips: [
        "Keep it under 100 words — 30 seconds is NOT much time",
        "Don't include unnecessary details like marks, father's name, etc.",
        "End with something friendly like 'Nice to meet you!'",
      ]
    },
    {
      id: 2,
      title: 'Formal Interview Self-Introduction',
      type: 'Interview',
      difficulty: 'medium',
      minWords: 120,
      maxWords: 200,
      instructions: 'Write a professional self-introduction you would give in a formal job interview. Include: name, education, experience, skills, and a closing statement.',
      hindi: 'Job interview ke liye formal introduction likhein. 2-3 minute bolne ka material.',
      template: 'Good [morning/afternoon]. My name is [FULL NAME]. I am from [CITY].\n\nI completed my [DEGREE] from [COLLEGE] in [YEAR] with [SCORE].\n\nI have been working as [ROLE] at [COMPANY] for [DURATION]. My key skills include [SKILL 1], [SKILL 2], and [SKILL 3].\n\nMy greatest strength is [STRENGTH]. I am applying for this role because [REASON].\n\nMy goal is to [GOAL]. I am excited about this opportunity and look forward to contributing to your team.\n\nThank you.',
      placeholder: 'Good morning. My name is...',
      tips: [
        "Always say 'Good morning/afternoon' — not 'Good day' or 'Namaste'",
        "Mention your CGPA only if it is above 7.5",
        "Keep experience section focused on achievements, not just duties",
        "End with 'Thank you' — it is professional",
        "Avoid 'myself Rahul' — NEVER use 'myself' for introduction",
      ]
    },
    {
      id: 3,
      title: 'Office New Joinee Introduction Email',
      type: 'Email Writing',
      difficulty: 'medium',
      minWords: 100,
      maxWords: 180,
      instructions: 'Write an introduction email to your new team on your first day at a company. Include your role, background, and a friendly closing.',
      hindi: 'Pehle din office join kiya. Team ko introduction email likhein.',
      template: 'Subject: Introduction — [YOUR NAME], New [YOUR ROLE]\n\nHi Team,\n\nI am [NAME], and I recently joined as [ROLE] in [DEPARTMENT].\n\nA little about me: I completed my [DEGREE] from [COLLEGE]. Before joining [COMPANY NAME], I worked at [PREVIOUS COMPANY] for [DURATION] as [PREVIOUS ROLE].\n\nIn my free time, I enjoy [HOBBY 1] and [HOBBY 2].\n\nI look forward to collaborating with all of you. Please feel free to reach out — I would love to connect!\n\nBest regards,\n[NAME]',
      placeholder: 'Subject: Introduction — Rahul Sharma, New Software Engineer\n\nHi Team,\n\nI am...',
      tips: [
        "Subject line format: 'Introduction — Your Name, Your Role'",
        "Keep it warm but professional",
        "Mentioning hobbies humanizes you — include them!",
        "End with 'Best regards' for professional emails",
        "'Please feel free to reach out' is a great, professional phrase",
      ]
    },
    {
      id: 4,
      title: 'College First Day Introduction (Casual)',
      type: 'Casual Introduction',
      difficulty: 'easy',
      minWords: 60,
      maxWords: 120,
      instructions: 'Write a casual, friendly introduction you would give on the first day of college in front of your batch. Keep it light and fun.',
      hindi: 'College ke pehle din batch ke saamne casual introduction likhein. Fun aur friendly rakhein.',
      template: "Hi everyone! My name is [NAME], but my friends call me [NICKNAME].\n\nI am from [CITY]. I completed my [DEGREE] from [SCHOOL/COLLEGE].\n\nI love [HOBBY 1] and [HOBBY 2]. [Fun fact about yourself].\n\nLooking forward to making some great memories with all of you! Feel free to say hi!",
      placeholder: "Hi everyone! My name is...",
      tips: [
        "Be genuine and fun — classmates like authentic people",
        "Add a fun fact about yourself — it makes you memorable",
        "Don't list your academic scores — nobody cares in college!",
        "End with something inviting like 'Feel free to say hi!'",
      ]
    },
    {
      id: 5,
      title: 'LinkedIn About Section (Professional Bio)',
      type: 'Professional Writing',
      difficulty: 'hard',
      minWords: 150,
      maxWords: 300,
      instructions: "Write your LinkedIn 'About' section. This is your professional bio that recruiters will read. Write in first person. Focus on value you bring.",
      hindi: 'LinkedIn ke liye professional bio likhein jise recruiters padhenge.',
      template: "I am [NAME], a [ROLE] with [X] years of experience in [INDUSTRY/DOMAIN].\n\nI specialize in [SKILL 1], [SKILL 2], and [SKILL 3]. I am passionate about [WHAT DRIVES YOU].\n\nIn my current role at [COMPANY], I [KEY ACHIEVEMENT]. Previously at [COMPANY 2], I [ACHIEVEMENT 2].\n\nI hold a [DEGREE] from [COLLEGE] (CGPA: X.X).\n\nOutside work, I enjoy [HOBBY] — it keeps me [BENEFIT].\n\nI am always open to connecting with professionals in [DOMAIN]. Feel free to reach out!",
      placeholder: "I am a software engineer with 2 years of experience in...",
      tips: [
        "Write in first person — 'I am' not 'He/She is'",
        "Lead with your role and years of experience",
        "Include concrete achievements — numbers impress!",
        "Show personality — LinkedIn likes human bios",
        "End with a CTA (call to action): 'Feel free to reach out'",
        "Avoid clichés like 'passionate' without backing them up",
      ]
    },
    {
      id: 6,
      title: 'Video Introduction Script (1 Minute)',
      type: 'Video Script',
      difficulty: 'medium',
      minWords: 120,
      maxWords: 180,
      instructions: 'Write a script for a 1-minute video introduction (like a Zoom intro or video resume). Include all 6 PEFHGL parts. Speak naturally.',
      hindi: '1 minute ke video introduction ka script likhein. Natural aur confident tone rakhein.',
      template: "[SMILE] Hi! My name is [NAME].\n\nI am from [CITY], and I completed my [DEGREE] from [COLLEGE] in [YEAR].\n\nI have been working as [ROLE] at [COMPANY] for [DURATION], where I [KEY WORK].\n\nMy hobbies include [HOBBY 1] and [HOBBY 2].\n\nMy goal is to [GOAL], and I believe this opportunity will help me [REASON].\n\nI look forward to [CLOSING STATEMENT]. Thank you for watching!",
      placeholder: "Hi! My name is...",
      tips: [
        "Start with a smile — people see it in your voice!",
        "1 minute = about 130-150 words when spoken at normal pace",
        "Practice out loud before recording — not just on paper",
        "Look at the camera, not the screen",
        "Natural pauses make you sound more confident",
      ]
    },
    {
      id: 7,
      title: 'WhatsApp Group Introduction',
      type: 'Informal Writing',
      difficulty: 'easy',
      minWords: 40,
      maxWords: 80,
      instructions: 'Write a short, friendly introduction for a new WhatsApp group (college batch, office team, club). Keep it casual and fun.',
      hindi: 'WhatsApp group ke liye short aur friendly introduction likhein.',
      template: "Hey everyone! 👋 I'm [NAME] from [CITY]. Just joined as [ROLE/BATCH]. Love [HOBBY]. Happy to be part of this group! 😊",
      placeholder: "Hey everyone! I'm...",
      tips: [
        "WhatsApp = casual — emojis are fine here",
        "Keep it short — nobody reads long WhatsApp messages",
        "1-2 fun facts about yourself = memorable",
        "End with enthusiasm — 'Happy to be here!' works well",
      ]
    },
    {
      id: 8,
      title: 'Interview Answer: Tell Me About Yourself',
      type: 'HR Question',
      difficulty: 'hard',
      minWords: 150,
      maxWords: 250,
      instructions: 'Write a structured answer to the most common interview question: "Tell me about yourself." Follow the Present-Past-Future structure.',
      hindi: '"Tell me about yourself" ka best answer likhein. Present-Past-Future structure follow karein.',
      template: "[PRESENT — who are you now]\nI am [NAME], currently working as [ROLE] at [COMPANY]. I specialize in [KEY SKILL].\n\n[PAST — how you got here]\nI completed my [DEGREE] from [COLLEGE] in [YEAR]. Before my current role, I worked at [PREV COMPANY] where I [ACHIEVEMENT].\n\n[FUTURE — why this opportunity]\nI am looking to [GROWTH GOAL]. Your company's work in [COMPANY STRENGTH] aligns perfectly with my goals. I believe I can contribute by [VALUE YOU BRING].\n\nThank you for this opportunity.",
      placeholder: "I am Rahul Sharma, currently working as a Software Engineer...",
      tips: [
        "Present → Past → Future is the golden structure",
        "Tailor it to the company — research them first!",
        "Quantify achievements: 'increased performance by 20%'",
        "Never say 'I am a hardworking person' — show it with examples",
        "Practice until it is smooth — NOT memorized, but natural",
      ]
    },
  ];

  useEffect(() => {
    fetch('/api/challenge/2')
      .then(r => r.json())
      .then(data => {
        const writingData = data?.writingExercise;
        const exercises = writingData?.exercises || writingData || [];
        const exerciseArr = Array.isArray(exercises) ? exercises : Object.values(exercises);
        setTasks(exerciseArr.length > 0 ? exerciseArr : BUILT_IN_TASKS);
        setLoading(false);
      })
      .catch(() => { setTasks(BUILT_IN_TASKS); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:block font-medium">Day 2</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Pencil className="w-5 h-5 text-blue-600" />
              Writing Practice
            </h1>
            <p className="text-xs text-gray-500">Day 2 — Self Introduction</p>
          </div>
          <span className="text-sm text-gray-500">{tasks.length} tasks</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-5 mb-6 shadow-xl">
          <h2 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Writing Skills — Level Up
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Har task ko seriously lein. Real information use karein — real practice = real improvement.
            Template ko starting point ki tarah use karein, copy mat karein.
          </p>
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <span className="bg-white/20 px-3 py-1 rounded-full">{tasks.length} writing tasks</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Live checklist evaluation</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Real-world scenarios</span>
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <WritingTaskCard key={task.id || i} task={task} index={i} />
          ))}
        </div>

        {/* Grammar reminders */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Common Writing Mistakes — Avoid These
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { wrong: 'Myself Rahul Sharma.', correct: 'My name is Rahul Sharma.' },
              { wrong: 'I am born in Delhi.', correct: 'I was born in Delhi.' },
              { wrong: 'I am doing job in TCS.', correct: 'I work at TCS.' },
              { wrong: 'Passed out from college.', correct: 'Graduated from college.' },
              { wrong: '3 years back.', correct: '3 years ago.' },
              { wrong: 'I am interested to music.', correct: 'I am interested in music.' },
            ].map((item, i) => (
              <div key={i} className="bg-red-50 rounded-xl p-3 border border-red-100">
                <p className="text-xs text-red-500 line-through mb-1">✗ {item.wrong}</p>
                <p className="text-xs text-green-700 font-semibold">✓ {item.correct}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
