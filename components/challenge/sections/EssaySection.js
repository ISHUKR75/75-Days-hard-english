// ============================================================
// EssaySection.js — Rich Essay Writing Experience
// Model essay, structure guide, write-your-own with live feedback,
// paragraph tips, and word count tracker. ✒️
// ============================================================

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/store/useGamificationStore';
import { useProgressStore } from '@/store/progressStore';
import {
  PenLine, Eye, EyeOff, CheckCircle2, BookOpen,
  Target, Zap, Lightbulb, FileText, TrendingUp, Star
} from 'lucide-react';

// ── Blobs ─────────────────────────────────────────────────────
function Blobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute w-[450px] h-[450px] rounded-full bg-orange-600/12 blur-3xl -top-20 -right-32"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-3xl bottom-10 -left-20"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 13, repeat: Infinity, delay: 4 }} />
    </div>
  );
}

// ── Essay topics ──────────────────────────────────────────────
const ESSAY_TOPICS = [
  {
    id: 'english_importance',
    topic: 'The Importance of English in Modern Life',
    prompt: 'Write an essay (minimum 150 words) about why English is important in today\'s world. Use examples from daily life, career, and education.',
    outline: [
      { part: 'Introduction (Hook + Thesis)', tip: 'Start with a surprising fact or bold statement. Your thesis = main argument in one sentence.', example: '"Today, knowing English is not optional — it is essential. In a world connected by technology and trade, English is the key to almost every opportunity."' },
      { part: 'Body Paragraph 1 (Career)', tip: 'Discuss job opportunities, salary differences, and multinational companies.', example: '"Research shows that employees with English skills earn 25-30% more than those without. Most top companies conduct interviews in English and require daily email communication in the language."' },
      { part: 'Body Paragraph 2 (Education)', tip: 'Talk about access to global universities, research, and online learning.', example: '"The world\'s best universities — Harvard, Oxford, MIT — teach entirely in English. Without it, access to this education is almost impossible. Even online platforms like Coursera, YouTube, and Khan Academy are primarily in English."' },
      { part: 'Body Paragraph 3 (Daily Life)', tip: 'Give examples from travel, internet, and social media.', example: '"More than 55% of all websites are in English. When we travel, English is the universal language at airports, hotels, and tourist spots. Social media, customer service, and technology — all rely on English."' },
      { part: 'Conclusion (Summary + Call to Action)', tip: 'Summarize your main points. End with an inspiring or action-oriented statement.', example: '"English is no longer just a subject in school — it is a life skill. Investing time in learning it today will pay dividends for the rest of your life. The journey of a thousand miles begins with a single step. Start yours today."' },
    ],
    modelEssay: `The Importance of English in Modern Life

English is no longer just a subject we study in school. In today's interconnected world, it has become an essential life skill that can determine the direction of your career, education, and even your daily life. Whether you are applying for a job, browsing the internet, or traveling abroad, English is everywhere.

In terms of career, English proficiency gives people a significant advantage. Research shows that employees with strong English skills earn up to 30% more than those without. Most multinational companies conduct their interviews, meetings, and correspondence in English. Without it, talented people are often passed over for promotions simply because they cannot communicate effectively with international teams.

Education is another domain where English is critical. The world's most prestigious universities — Harvard, Oxford, MIT, Cambridge — teach entirely in English. Online learning platforms such as Coursera, edX, and Khan Academy, which offer millions of free courses, are predominantly in English. A person who cannot read English is essentially locked out of the world's best knowledge.

In daily life too, English is unavoidable. More than 55% of all internet content is in English. When we travel, English serves as the common language at airports, hotels, and tourist destinations across the globe. Social media, technology support, government services, and healthcare communications increasingly rely on English.

In conclusion, learning English is one of the most important investments a person can make in themselves. It is not merely a language — it is a gateway to a better career, better education, and a broader world. Every effort you make to learn English today is a brick in the foundation of your future success. Start now, stay consistent, and the rewards will be extraordinary.`,
    wordTarget: 200,
  },
  {
    id: 'success_habits',
    topic: 'Habits That Lead to Success',
    prompt: 'Write an essay about 3-5 daily habits that you believe lead to success. Give specific examples and personal insights.',
    outline: [
      { part: 'Introduction', tip: 'Hook with a powerful quote or startling fact about success.', example: '"Success is not an accident. It is the sum of small habits practiced every single day." — This simple truth separates extraordinary people from the rest.' },
      { part: 'Habit 1: Consistency', tip: 'Explain why doing small things daily beats doing big things occasionally.', example: '"Someone who reads 20 minutes every day will have read 20+ books per year. That compounds into knowledge that changes careers."' },
      { part: 'Habit 2: Early Rising', tip: 'Discuss the quiet advantage of morning hours.', example: '"The morning hours, before the world wakes, offer undisturbed time for planning, exercise, and learning."' },
      { part: 'Habit 3: Continuous Learning', tip: 'Discuss self-improvement through courses, books, and mentors.', example: '"Top performers never stop learning. Warren Buffett reads 5-6 hours a day. Bill Gates reads 50 books a year."' },
      { part: 'Conclusion', tip: 'Remind the reader that habits are built one day at a time.', example: '"Success is not a destination — it is a direction. Pick your habits carefully, because they will pick your future."' },
    ],
    modelEssay: `Habits That Lead to Success

Success is often misunderstood as something that happens to lucky people or naturally talented individuals. In reality, success is the result of deliberate habits practiced consistently over time. The difference between those who achieve their goals and those who do not often comes down to daily routines.

The first and most important habit is consistency. Many people start a new goal with tremendous enthusiasm but quit within weeks. The key is to start small and show up every single day, even on days when you do not feel motivated. Someone who reads just 20 minutes per day will read 20+ books per year — that compounds into extraordinary knowledge over a lifetime.

The second habit is waking up early. Successful people across industries — from Tim Cook to Michelle Obama — begin their days before sunrise. These quiet morning hours, undisturbed by notifications and demands, provide time for exercise, planning, and reflection. A productive morning often sets the tone for a productive day.

The third habit is continuous learning. Top performers are lifelong learners. Warren Buffett reads 5-6 hours daily. Bill Gates reads 50 books per year. They understand that the world changes rapidly, and those who stop learning become irrelevant. Listening to podcasts, taking online courses, or reading 20 pages each day can dramatically accelerate personal growth.

In conclusion, there is no shortcut to success. But there is a reliable path — and it is paved with small, powerful habits. Start today: wake up 30 minutes earlier, read one chapter, practice one new skill. Success is not a destination; it is the direction you choose every single morning.`,
    wordTarget: 180,
  },
];

// ── Essay structure guide ─────────────────────────────────────
function OutlineCard({ outline, topic }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="space-y-2">
      {outline.map((item, i) => (
        <div key={i} className={`border rounded-2xl overflow-hidden transition-all ${openIdx === i ? 'border-amber-500/40 bg-amber-500/5' : 'border-white/10 bg-white/5'}`}>
          <button onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            className="w-full flex items-center gap-3 p-4 text-left">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 ${openIdx === i ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/10 text-gray-400'}`}>
              {i + 1}
            </div>
            <span className={`font-bold text-sm flex-1 ${openIdx === i ? 'text-amber-200' : 'text-white'}`}>{item.part}</span>
            <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} className="text-gray-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4 space-y-3 border-t border-amber-500/20 pt-3">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-amber-400 font-semibold">💡 Tip: </span>{item.tip}
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1 font-semibold">Sample sentence:</p>
                    <p className="text-gray-200 text-sm italic">"{item.example}"</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ChevronDown({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function EssaySection({ data, dayNum }) {
  const { addXP } = useGamificationStore();
  const { recordQuestionResult } = useProgressStore();

  const rawEssays = data?.essays;
  const [topicIdx, setTopicIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('guide');
  const [userEssay, setUserEssay] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const topic = ESSAY_TOPICS[topicIdx];
  const wordCount = userEssay.trim().split(/\s+/).filter(Boolean).length;
  const progress = Math.min(100, Math.round((wordCount / topic.wordTarget) * 100));
  const hasMinWords = wordCount >= topic.wordTarget;

  const handleSubmit = () => {
    if (!hasMinWords) return;
    setSubmitted(true);
    addXP(50, 'Submitted essay!');
    recordQuestionResult(`essay-day${dayNum}-${topic.id}`, true);
    setXpEarned(p => p + 50);
  };

  const ESSAY_TIPS = [
    { emoji: '🎣', title: 'Hook your reader in the first sentence', desc: 'Start with a surprising fact, a bold statement, a question, or a powerful quote. The first sentence decides if anyone reads further.' },
    { emoji: '🎯', title: 'One paragraph = one main idea', desc: "Each paragraph must have a clear topic sentence (what it's about), 2-3 supporting sentences (evidence/examples), and a brief wrap-up." },
    { emoji: '🔗', title: 'Use transition words generously', desc: '"Furthermore, However, In addition, As a result, On the other hand, In conclusion" — these connectors make your essay flow smoothly and sound professional.' },
    { emoji: '🔢', title: 'Use specific numbers and facts', desc: '"Many people" is weak. "Over 1.5 billion people" is powerful. Specific numbers add credibility and make your points memorable.' },
    { emoji: '✂️', title: 'Cut unnecessary words', desc: 'Every word must earn its place. "Due to the fact that" → "Because". "At this point in time" → "Now". Clarity beats complexity every time.' },
    { emoji: '🔁', title: 'Read your essay backward', desc: "Read from the last sentence to the first. This trick disconnects you from the flow and makes grammatical errors much easier to spot." },
  ];

  const TABS = [
    { id: 'guide', label: '🗺️ Essay Guide', shortLabel: 'Guide' },
    { id: 'model', label: '📄 Model Essay', shortLabel: 'Model' },
    { id: 'write', label: '✍️ Write Yours', shortLabel: 'Write' },
    { id: 'tips', label: '💡 Essay Tips', shortLabel: 'Tips' },
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg">✒️</div>
              <div>
                <h1 className="text-white font-black text-2xl">Essay Writing</h1>
                <p className="text-gray-400 text-sm mt-0.5">Structure → Model → Write your own! 🖊️</p>
              </div>
            </div>
            {xpEarned > 0 && (
              <div className="text-center flex-shrink-0">
                <div className="text-2xl font-black text-amber-400">{xpEarned}</div>
                <div className="text-xs text-gray-400">XP earned</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── TOPIC SELECTOR ──────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {ESSAY_TOPICS.map((t, i) => (
            <button key={i} onClick={() => { setTopicIdx(i); setUserEssay(''); setSubmitted(false); setShowModel(false); setActiveTab('guide'); }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                topicIdx === i ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
              }`}>
              {t.topic}
            </button>
          ))}
        </div>

        {/* ── TABS ─────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-2xl p-1.5 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex-shrink-0 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-white/15 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'guide' && (
            <motion.div key="guide" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5">
                <p className="text-amber-300 font-bold text-base mb-1">🗺️ {topic.topic}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{topic.prompt}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <Target size={11} /> Minimum {topic.wordTarget} words
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileText size={12} /> Essay Structure (click each part to expand)
                </p>
                <OutlineCard outline={topic.outline} topic={topic.topic} />
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                <p className="text-blue-300 text-sm">
                  <span className="font-bold">Next step:</span> Study the Model Essay tab to see how a professional essay looks for this topic, then write your own in the Write tab!
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'model' && (
            <motion.div key="model" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                <p className="text-amber-300 text-sm">📄 Study this model essay carefully. Notice: the structure, the vocabulary, the transitions, and how each paragraph supports the thesis.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                {topic.modelEssay.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-gray-200 text-sm leading-8 mb-4 last:mb-0 ${i === 0 ? 'text-white font-black text-lg' : ''}`}>{para}</p>
                ))}
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                <p className="text-blue-300 text-xs">
                  <span className="font-bold">How to use this model:</span> Don't copy it! Instead, note the structure, linking words (Furthermore, In addition, In conclusion), and how specific examples are used. Then write your own version with your own ideas and experience.
                </p>
              </div>
              <button onClick={() => setActiveTab('write')}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl text-sm font-bold shadow-lg shadow-amber-500/20 transition-all">
                ✍️ Now Write Your Own Essay →
              </button>
            </motion.div>
          )}

          {activeTab === 'write' && (
            <motion.div key="write" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-4">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5">
                <p className="text-orange-300 font-semibold text-sm mb-1">✍️ Your Essay: {topic.topic}</p>
                <p className="text-gray-400 text-sm">{topic.prompt}</p>
              </div>

              {/* Word counter */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>{wordCount} words written</span>
                  <span className={progress >= 100 ? 'text-emerald-400 font-bold' : 'text-gray-500'}>
                    {progress}% of target ({topic.wordTarget} words)
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className={`h-full rounded-full ${progress >= 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-orange-400'}`}
                    animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}
                  />
                </div>
                <textarea
                  value={userEssay}
                  onChange={e => setUserEssay(e.target.value)}
                  disabled={submitted}
                  placeholder={`Start your essay here...\n\nTitle: ${topic.topic}\n\nIntroduction: Start with a strong hook...`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm resize-none outline-none focus:border-amber-500/50 placeholder:text-gray-600 min-h-[280px] transition-colors leading-relaxed disabled:opacity-75"
                />
              </div>

              {/* Writing tips */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold mb-2">Quick reminders while writing:</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Start with a hook sentence', 'One idea per paragraph', 'Use transition words', 'End with a strong conclusion', `Target: ${topic.wordTarget}+ words`, 'Proofread before submitting'].map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                      <span className="text-amber-400">→</span>{r}
                    </div>
                  ))}
                </div>
              </div>

              {!submitted ? (
                <motion.button whileHover={{ scale: hasMinWords ? 1.02 : 1 }} whileTap={{ scale: hasMinWords ? 0.98 : 1 }}
                  onClick={handleSubmit}
                  disabled={!hasMinWords}
                  className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                    hasMinWords ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40' : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }`}>
                  {hasMinWords ? '🎉 Submit Essay (+50 XP)' : `Write ${topic.wordTarget - wordCount} more words to submit`}
                </motion.button>
              ) : (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-emerald-300 font-black text-lg">Essay Submitted!</p>
                  <p className="text-gray-400 text-sm mt-1">Amazing work! You wrote {wordCount} words. +50 XP earned!</p>
                </div>
              )}

              <button onClick={() => setShowModel(p => !p)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 text-gray-400 hover:text-white hover:bg-white/15 rounded-xl text-xs font-medium transition-all">
                {showModel ? <><EyeOff size={12} /> Hide Model</> : <><Eye size={12} /> Peek at Model Essay</>}
              </button>

              <AnimatePresence>
                {showModel && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <p className="text-gray-400 font-bold text-xs mb-3">Model Essay (for reference only):</p>
                      {topic.modelEssay.split('\n\n').map((para, i) => (
                        <p key={i} className={`text-gray-300 text-xs leading-7 mb-3 last:mb-0 ${i === 0 ? 'text-white font-bold text-sm' : ''}`}>{para}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'tips' && (
            <motion.div key="tips" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="space-y-3">
              {ESSAY_TIPS.map((tip, i) => (
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
