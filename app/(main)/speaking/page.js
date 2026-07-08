'use client';
// ============================================================
// SPEAKING PRACTICE PAGE — Complete speaking practice hub
// Features: AI partner, conversation scenarios, pronunciation,
// recording UI, IELTS/interview prep, sentence starters
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Play, Volume2, ArrowRight, Star, Target,
  Brain, CheckCircle2, ChevronRight, MessageSquare, Users,
  Briefcase, Coffee, Phone, BarChart2, Globe, Award, Zap,
  BookOpen, Heart, Headphones, Clock, RefreshCw,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

// ── Speaking scenarios ────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'self-intro',
    emoji: '👋',
    title: 'Self Introduction',
    hindi: 'अपना परिचय',
    level: 'A1',
    duration: '2 min',
    desc: 'How to introduce yourself professionally in an interview, meeting, or new situation.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/25',
    prompts: [
      'Tell me about yourself in English.',
      'What do you do for work?',
      'Where are you from?',
      'What are your hobbies?',
    ],
    starter: 'Good morning! My name is [Name]. I am from [City]. I work as a [Job]. I have [X] years of experience in [field]. In my free time, I enjoy...',
    tips: ['Speak clearly and confidently', 'Keep it under 2 minutes', 'Mention name, job, experience, one hobby'],
  },
  {
    id: 'office-talk',
    emoji: '💼',
    title: 'Office Conversations',
    hindi: 'ऑफिस की बातचीत',
    level: 'B1',
    duration: '3 min',
    desc: 'Daily workplace conversations — greetings, updates, asking for help, meetings.',
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-500/8',
    border: 'border-indigo-500/25',
    prompts: [
      'How was your weekend?',
      'Can we schedule a meeting for tomorrow?',
      'I need your help with this project.',
      'Can you review my report by Friday?',
    ],
    starter: '"Good morning, [Name]! How are you doing today?" / "I\'m doing great, thanks! Could I ask for your help with...?"',
    tips: ['Use polite phrases: "Could you...", "Would you mind..."', 'Always greet before asking a favor', 'Say "please" and "thank you"'],
  },
  {
    id: 'job-interview',
    emoji: '🎤',
    title: 'Job Interview',
    hindi: 'नौकरी का इंटरव्यू',
    level: 'B1',
    duration: '10 min',
    desc: 'Ace your job interview — common questions, answers, body language, salary negotiation.',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/25',
    prompts: [
      'Tell me your strengths and weaknesses.',
      'Why do you want to work here?',
      'Where do you see yourself in 5 years?',
      'Why should we hire you?',
      'Describe a challenge you faced at work.',
    ],
    starter: '"Thank you for the opportunity to interview with [Company]. I am particularly excited about this role because..."',
    tips: ['Research the company beforehand', 'Use STAR method for answers', 'Prepare 2-3 questions to ask the interviewer'],
  },
  {
    id: 'phone-call',
    emoji: '📞',
    title: 'Phone Conversations',
    hindi: 'फोन पर बातचीत',
    level: 'A2',
    duration: '3 min',
    desc: 'Professional phone calls — speaking to customers, making appointments, handling queries.',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/8',
    border: 'border-pink-500/25',
    prompts: [
      'Can I speak to the manager, please?',
      'Could you spell that for me?',
      'I\'m calling to confirm my appointment.',
      'Can you call back in 10 minutes?',
    ],
    starter: '"Hello! This is [Name] calling from [Company/Name]. May I speak to [Person]?" / "I\'m calling regarding..."',
    tips: ['Speak slowly and clearly on phone', 'Confirm important details by repeating', 'Always ask before putting on hold'],
  },
  {
    id: 'presentation',
    emoji: '📊',
    title: 'Giving Presentations',
    hindi: 'प्रेजेंटेशन देना',
    level: 'B2',
    duration: '5 min',
    desc: 'Professional presentations — opening, transitions, data explanation, Q&A handling.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/25',
    prompts: [
      'Open your presentation effectively.',
      'Explain a chart or data point.',
      'Handle a tough question from the audience.',
      'Close your presentation memorably.',
    ],
    starter: '"Good morning, everyone. Thank you for joining us today. My name is [Name], and I will be presenting our [Topic]."',
    tips: ['Pause for effect after key points', 'Make eye contact with the audience', 'Use "signpost" phrases: "Moving on to...", "In conclusion..."'],
  },
  {
    id: 'daily-chat',
    emoji: '☕',
    title: 'Daily Conversations',
    hindi: 'रोज़मर्रा की बातचीत',
    level: 'A2',
    duration: '3 min',
    desc: 'Everyday English — weather, food, plans, feelings, small talk with anyone.',
    color: 'from-cyan-500 to-sky-500',
    bg: 'bg-cyan-500/8',
    border: 'border-cyan-500/25',
    prompts: [
      'What did you eat today?',
      'How are you feeling?',
      'What are your plans for the weekend?',
      'Have you seen any good movies lately?',
    ],
    starter: '"Hey! How\'s it going?" / "Not bad, thanks! Have you had lunch yet?" / "I was thinking of..."',
    tips: ['Ask follow-up questions to keep the conversation going', 'Use filler words naturally: "well...", "actually...", "you know..."', 'Show interest: "Oh really? That\'s interesting!"'],
  },
  {
    id: 'customer-service',
    emoji: '🛍️',
    title: 'Customer Service',
    hindi: 'ग्राहक सेवा',
    level: 'B1',
    duration: '4 min',
    desc: 'Handling customers professionally — complaints, queries, refunds, escalations.',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-500/8',
    border: 'border-teal-500/25',
    prompts: [
      'Handle an angry customer politely.',
      'Explain a product feature to a customer.',
      'Process a refund request professionally.',
      'Escalate an issue to your manager.',
    ],
    starter: '"Thank you for calling [Company] customer service. My name is [Name]. How can I assist you today?"',
    tips: ['Never argue with a customer', 'Empathize first: "I completely understand your frustration"', 'Offer solutions, not excuses'],
  },
  {
    id: 'negotiation',
    emoji: '🤝',
    title: 'Negotiations',
    hindi: 'बातचीत और सौदेबाज़ी',
    level: 'C1',
    duration: '8 min',
    desc: 'Advanced negotiation skills — salary, business deals, conflict resolution.',
    color: 'from-rose-500 to-red-500',
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/25',
    prompts: [
      'Negotiate a salary increase with your manager.',
      'Close a business deal with a client.',
      'Resolve a conflict between team members.',
    ],
    starter: '"I\'d like to discuss my compensation. Based on my contributions and market research, I believe..."',
    tips: ['Know your BATNA (Best Alternative)', 'Listen more than you speak', 'Use silence strategically after making your offer'],
  },
];

// ── Sentence Starters ──────────────────────────────────────────
const SENTENCE_STARTERS = {
  Agreeing: [
    'I completely agree with you.',
    'That\'s exactly what I was thinking.',
    'You make a very good point.',
    'Absolutely, and I would also add that…',
    'I couldn\'t agree more.',
  ],
  Disagreeing: [
    'I see your point, but I think…',
    'I\'m not sure I fully agree because…',
    'That\'s an interesting perspective, however…',
    'With all due respect, I believe…',
    'I understand where you\'re coming from, but…',
  ],
  Clarifying: [
    'Could you elaborate on that?',
    'What do you mean by…?',
    'Could you clarify that, please?',
    'I\'m not quite sure I understand. Could you repeat that?',
    'Are you saying that…?',
  ],
  Transition: [
    'Moving on to…',
    'In addition to that…',
    'Furthermore…',
    'On the other hand…',
    'To summarize…',
    'That being said…',
  ],
  Buying_Time: [
    'That\'s a great question. Let me think for a moment.',
    'Hmm, that\'s interesting. I would say…',
    'Well, to be honest…',
    'Good point. I\'d have to say…',
  ],
};

const LEVEL_COLORS = { A1: 'text-emerald-400 bg-emerald-500/10', A2: 'text-sky-400 bg-sky-500/10', B1: 'text-violet-400 bg-violet-500/10', B2: 'text-amber-400 bg-amber-500/10', C1: 'text-rose-400 bg-rose-500/10' };

// ── Scenario Card ─────────────────────────────────────────────
function ScenarioCard({ scenario, onSelect, isSelected }) {
  return (
    <motion.button
      variants={fadeUp}
      whileHover={{ y: -3 }}
      onClick={() => onSelect(scenario)}
      className={`
        w-full text-left rounded-2xl border p-5 transition-all relative overflow-hidden group
        ${isSelected ? `${scenario.bg} ${scenario.border}` : 'bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15'}
      `}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{scenario.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="font-bold text-white">{scenario.title}</p>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${LEVEL_COLORS[scenario.level] || ''}`}>{scenario.level}</span>
          </div>
          <p className="text-xs text-slate-500 mb-1">{scenario.hindi} · {scenario.duration}</p>
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{scenario.desc}</p>
        </div>
        <ChevronRight size={14} className={`shrink-0 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
      </div>
    </motion.button>
  );
}

// ── Recording UI ──────────────────────────────────────────────
function RecordingUI({ scenario }) {
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded]   = useState(false);
  const [activePrompt, setActivePrompt] = useState(0);

  const handleRecord = () => {
    if (!recording && !recorded) {
      setRecording(true);
      setTimeout(() => { setRecording(false); setRecorded(true); }, 3000);
    } else if (recorded) {
      setRecorded(false);
      setRecording(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Current Prompt */}
      <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-5">
        <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">Today's Prompt ({activePrompt + 1}/{scenario.prompts.length})</p>
        <p className="text-lg font-bold text-white mb-4">"{scenario.prompts[activePrompt]}"</p>
        <div className="flex gap-2">
          {scenario.prompts.map((_, i) => (
            <button key={i} onClick={() => { setActivePrompt(i); setRecorded(false); }} className={`w-2 h-2 rounded-full transition-all ${i === activePrompt ? 'bg-amber-400 w-6' : 'bg-white/20 hover:bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Starter phrase */}
      <div className="bg-white/4 border border-white/8 rounded-xl p-4">
        <p className="text-xs text-primary-400 font-semibold mb-2">💡 Starter Phrase</p>
        <p className="text-sm text-slate-300 italic leading-relaxed">{scenario.starter}</p>
      </div>

      {/* Record Button */}
      <div className="flex flex-col items-center gap-4 py-6">
        <motion.button
          onClick={handleRecord}
          animate={recording ? { scale: [1, 1.05, 1] } : {}}
          transition={recording ? { duration: 1, repeat: Infinity } : {}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all
            ${recording ? 'bg-gradient-to-br from-rose-500 to-red-600 shadow-red-500/40' : recorded ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/40' : 'bg-gradient-to-br from-primary-500 to-secondary-500 shadow-primary-500/40'}
          `}
        >
          {recording && (
            <motion.div className="absolute inset-0 rounded-full border-4 border-rose-400/50" animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          )}
          {recorded ? <CheckCircle2 size={32} className="text-white" /> : recording ? <MicOff size={32} className="text-white" /> : <Mic size={32} className="text-white" />}
        </motion.button>

        <div className="text-center">
          {recording && <p className="text-rose-400 font-semibold text-sm animate-pulse">Recording… (tap to stop)</p>}
          {recorded  && <p className="text-emerald-400 font-semibold text-sm">Recorded! ✅ <button onClick={() => setRecorded(false)} className="ml-2 text-slate-400 hover:text-white underline text-xs">Record again</button></p>}
          {!recording && !recorded && <p className="text-slate-500 text-sm">Tap to start recording your answer</p>}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-white/4 rounded-xl p-4 border border-white/8">
        <p className="text-xs text-emerald-400 font-bold mb-3">✅ Speaking Tips</p>
        <ul className="space-y-1.5">
          {scenario.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 mt-0.5">•</span> {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Next Prompt */}
      {activePrompt < scenario.prompts.length - 1 && (
        <button
          onClick={() => { setActivePrompt(activePrompt + 1); setRecorded(false); }}
          className="w-full btn-primary flex items-center justify-center gap-2 text-sm py-3"
        >
          Next Prompt <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function SpeakingPage() {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [activeTab, setActiveTab] = useState('scenarios'); // scenarios | starters
  const [starterCategory, setStarterCategory] = useState('Agreeing');

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Mic size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">Speaking Practice</h1>
              <p className="text-slate-400 text-sm">Real-life conversation practice — office, interview, daily life.</p>
            </div>
          </div>
          <Link href="/ai-tutor/speaking-partner" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
            <Brain size={14} /> AI Speaking Partner
          </Link>
        </div>
      </motion.div>

      {/* ── AI Partner Banner ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 mb-8 border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-purple-500/5"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30 shrink-0"
            >
              🤖
            </motion.div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Speaking Partner</h3>
              <p className="text-slate-400 text-sm">24/7 available — practice real conversations, get instant AI feedback</p>
              <div className="flex items-center gap-3 mt-2">
                {['Grammar Check', 'Pronunciation AI', 'Natural Responses'].map(f => (
                  <span key={f} className="flex items-center gap-1 text-xs text-pink-300">
                    <CheckCircle2 size={10} /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Link href="/ai-tutor/speaking-partner" className="btn-gradient flex items-center gap-2 shrink-0 text-sm px-6 py-3">
            Start Conversation <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>

      {/* ── Tabs ────────────────────────────────────────── */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'scenarios', label: 'Conversation Scenarios' },
          { id: 'starters',  label: 'Sentence Starters'     },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${activeTab === tab.id ? 'bg-pink-500/20 text-pink-300 border-pink-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Scenarios ──────────────────────────────── */}
      {activeTab === 'scenarios' && (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Scenario List */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="xl:col-span-3 space-y-3">
            {SCENARIOS.map(scenario => (
              <ScenarioCard key={scenario.id} scenario={scenario} onSelect={setSelectedScenario} isSelected={selectedScenario?.id === scenario.id} />
            ))}
          </motion.div>

          {/* Practice Area */}
          <div className="xl:col-span-2">
            <AnimatePresence mode="wait">
              {selectedScenario && (
                <motion.div
                  key={selectedScenario.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="sticky top-20"
                >
                  <div className={`rounded-2xl border p-6 ${selectedScenario.border} ${selectedScenario.bg}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl">{selectedScenario.emoji}</span>
                      <div>
                        <h3 className="font-bold text-white">{selectedScenario.title}</h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[selectedScenario.level] || ''}`}>{selectedScenario.level}</span>
                      </div>
                    </div>
                    <RecordingUI scenario={selectedScenario} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ── Tab: Sentence Starters ──────────────────────── */}
      {activeTab === 'starters' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card p-5 mb-6 border-pink-500/20 bg-pink-500/5">
            <p className="text-sm text-pink-300 font-semibold mb-1">💡 How to use sentence starters</p>
            <p className="text-sm text-slate-400">These phrases will make you sound more natural in any English conversation. Memorize 5-10 from each category and you'll instantly sound more fluent!</p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(SENTENCE_STARTERS).map(cat => (
              <button key={cat} onClick={() => setStarterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${starterCategory === cat ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-white'}`}>
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Starters */}
          <AnimatePresence mode="wait">
            <motion.div
              key={starterCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {SENTENCE_STARTERS[starterCategory].map((phrase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 p-4 card hover:border-white/20 transition-all group"
                >
                  <span className="text-lg font-black text-primary-400 w-8 text-center shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white font-medium flex-1">{phrase}</p>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-white/10">
                    <Volume2 size={14} className="text-slate-400" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Download hint */}
          <div className="mt-8 card p-5 border-primary-500/20 bg-primary-500/5 text-center">
            <p className="text-sm text-slate-300 mb-3">Want to practice all sentence starters with an AI?</p>
            <Link href="/ai-tutor/speaking-partner" className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3">
              <Brain size={14} /> Practice with AI Partner
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
