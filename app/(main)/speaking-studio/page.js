'use client';
// ============================================================
// SPEAKING STUDIO — Advanced speaking practice hub
// Features: Mirror mode, recording, roleplay, confidence builder
// Inspired by: Duolingo, ELSA Speak, Speechify
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Play, Pause, RotateCcw, Volume2,
  ChevronRight, Star, Target, Award, Brain,
  MessageSquare, Users, Phone, Briefcase, GraduationCap,
  Zap, CheckCircle2, ArrowRight, Eye, BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import useUserStore from '@/store/userStore';

// ── Animation Variants ────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

// ── Speaking Scenarios ────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'self-intro',
    title: 'Self Introduction',
    emoji: '👋',
    level: 'A1',
    category: 'daily',
    color: 'from-emerald-500 to-teal-500',
    situation: 'You are meeting someone for the first time at an office networking event.',
    yourRole: 'You',
    otherRole: 'Colleague',
    prompts: [
      'Apna naam, shehar, aur profession batao.',
      'Ek hobby ya interest share karo.',
      'Puchho ki dusra insaan kya karta hai.',
      '"Nice to meet you" ke saath khatam karo.',
    ],
    sampleAnswer: 'Good evening! My name is Rahul Kumar. I am from Delhi and I work as a software engineer at ABC Technologies. In my free time, I enjoy reading and learning new things. What about you — what do you do?',
    keyPhrases: ['Good evening', 'My name is', 'I work as', 'In my free time', 'What about you'],
    tips: ['Smile while speaking', 'Keep it under 1 minute', 'Maintain eye contact', 'Speak clearly and slowly'],
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    emoji: '🎯',
    level: 'B2',
    category: 'professional',
    color: 'from-amber-500 to-orange-500',
    situation: 'You are in an HR round interview for a Software Engineer position.',
    yourRole: 'Candidate',
    otherRole: 'HR Manager',
    prompts: [
      '"Tell me about yourself" ka jawab do.',
      'Ek challenge batao jo tumne solve kiya.',
      'Strengths aur weakness batao honestly.',
      'Sawal puchho interviewer se company ke baare mein.',
    ],
    sampleAnswer: 'Good morning! My name is Priya Sharma. I am a software engineer with 3 years of experience in React and Node.js. My key strength is problem-solving — I enjoy breaking complex tasks into smaller pieces. At my previous company, I reduced API response time by 40% through code optimization. I am passionate about clean code and continuous learning.',
    keyPhrases: ['My key strength is', 'In my previous company', 'I am passionate about', 'I believe', 'Thank you for this opportunity'],
    tips: ['Research the company beforehand', 'Use STAR method for examples', 'Ask thoughtful questions', 'Practice out loud 5 times'],
  },
  {
    id: 'office-meeting',
    title: 'Team Meeting Update',
    emoji: '💼',
    level: 'B1',
    category: 'professional',
    color: 'from-indigo-500 to-blue-500',
    situation: 'Morning standup with your team. You need to give a clear update.',
    yourRole: 'Team Member',
    otherRole: 'Manager',
    prompts: [
      'Kal kya kiya batao.',
      'Aaj kya karne ka plan hai.',
      'Agar koi blocker hai to batao.',
      'Koi sawal hai team ko? Poochho.',
    ],
    sampleAnswer: 'Good morning team! Yesterday, I completed the user authentication module and pushed the code for review. Today, I plan to work on the dashboard API integration. I have one small question for the backend team — could someone clarify the data format for the analytics endpoint? No other blockers on my side. That\'s it from me.',
    keyPhrases: ['Yesterday I completed', 'Today I plan to', 'I have a question about', 'No blockers', 'That\'s it from me'],
    tips: ['Be concise — under 1 minute', 'Use past tense for yesterday', 'Use present continuous for today', 'Always mention blockers'],
  },
  {
    id: 'phone-call',
    title: 'Professional Phone Call',
    emoji: '📞',
    level: 'B1',
    category: 'professional',
    color: 'from-sky-500 to-cyan-500',
    situation: 'You are calling a client to follow up on a proposal you sent.',
    yourRole: 'Sales Executive',
    otherRole: 'Client',
    prompts: [
      'Khud ko introduce karo politely.',
      'Call ka reason batao.',
      'Client ke questions ke liye taiyar raho.',
      'Next step decide karo — meeting schedule karo.',
    ],
    sampleAnswer: 'Good afternoon! This is Rahul from XYZ Solutions. I hope you are doing well. I am calling to follow up on the proposal I sent you on Monday. Have you had a chance to review it? I would love to address any questions you might have. Would it be possible to schedule a brief call this week to discuss further?',
    keyPhrases: ['This is [Name] from', 'I hope you are doing well', 'I am calling to follow up', 'Have you had a chance to', 'Would it be possible to'],
    tips: ['Smile — it shows in your voice', 'Speak slowly and clearly', 'Always state your name and company', 'Confirm next steps before hanging up'],
  },
  {
    id: 'complaint',
    title: 'Making a Complaint',
    emoji: '😤',
    level: 'B1',
    category: 'daily',
    color: 'from-rose-500 to-pink-500',
    situation: 'Your hotel room has a problem — no hot water. You are at the reception.',
    yourRole: 'Guest',
    otherRole: 'Receptionist',
    prompts: [
      'Problem clearly explain karo.',
      'Frustration politely express karo.',
      'Solution maango specific.',
      'Confirmation lo ki problem fix hogi kab tak.',
    ],
    sampleAnswer: 'Excuse me, I am staying in Room 204 and I have been facing an issue since this morning — there is no hot water in my bathroom. I have been waiting for two hours. Could you please send someone to fix this immediately? Also, could you let me know when exactly it will be resolved? I have an important meeting in 2 hours and I need to freshen up.',
    keyPhrases: ['I have been facing an issue', 'Could you please', 'I have been waiting', 'Let me know when', 'I would appreciate'],
    tips: ['Stay calm and polite', 'Be specific about the problem', 'Request a specific solution', 'Set a clear timeline expectation'],
  },
  {
    id: 'presentation',
    title: 'Giving a Presentation',
    emoji: '📊',
    level: 'C1',
    category: 'professional',
    color: 'from-violet-500 to-purple-500',
    situation: 'You are presenting Q3 results to your department.',
    yourRole: 'Presenter',
    otherRole: 'Audience',
    prompts: [
      'Strong opening ke saath shuru karo.',
      'Key data points present karo confidently.',
      'Challenges aur solutions explain karo.',
      'Q&A ke liye invite karo professionally.',
    ],
    sampleAnswer: 'Good morning everyone. Thank you for joining today\'s Q3 review. I will be presenting our department\'s performance over the past three months. We achieved a 23% increase in efficiency and reduced costs by 15%. However, we did face some challenges with the new deployment process, which we addressed by implementing automated testing. Overall, I am pleased to report that we exceeded our targets by 8%. I will now open the floor for questions.',
    keyPhrases: ['Thank you for joining', 'I will be presenting', 'We achieved', 'However, we did face', 'I am pleased to report', 'I will now open the floor'],
    tips: ['Start with a hook or key stat', 'Use clear transitions', 'Pause for emphasis', 'Make eye contact with different people', 'End with a clear call-to-action'],
  },
];

// ── Confidence Building Exercises ────────────────────────────
const CONFIDENCE_EXERCISES = [
  { id: 1, title: 'Power Affirmations', icon: '💪', desc: 'Say these 5 times with confidence', sentences: ['I speak English fluently and confidently.', 'Every day my English is getting better.', 'I am not afraid to make mistakes.', 'My English is good enough to communicate.', 'I enjoy speaking in English.'] },
  { id: 2, title: 'Tongue Twisters', icon: '👅', desc: 'For pronunciation improvement', sentences: ['She sells sea shells by the sea shore.', 'Peter Piper picked a peck of pickled peppers.', 'How much wood would a woodchuck chuck.', 'Red lorry, yellow lorry, red lorry, yellow lorry.', 'Unique New York, Unique New York, you know you need unique New York.'] },
  { id: 3, title: 'Mirror Sentences', icon: '🪞', desc: 'Say in front of mirror with expression', sentences: ['Good morning! How are you doing today?', 'I completely understand your concern.', 'That\'s a really interesting point.', 'I would love to learn more about that.', 'Let me get back to you on that.'] },
];

// ── Main Page Component ───────────────────────────────────────
export default function SpeakingStudioPage() {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [activeExercise, setActiveExercise] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeSentence, setActiveSentence] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Speaking Studio</h1>
              <p className="text-xs text-gray-400">Practice real conversations</p>
            </div>
          </div>
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'scenarios', label: 'Role-play Scenarios', icon: <Users className="w-4 h-4" /> },
            { id: 'confidence', label: 'Confidence Builder', icon: <Zap className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedScenario(null); setActiveExercise(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Scenarios Tab */}
        {activeTab === 'scenarios' && !selectedScenario && (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCENARIOS.map((s) => (
              <motion.button
                key={s.id}
                variants={fadeUp}
                onClick={() => setSelectedScenario(s)}
                className="text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl mb-3`}>
                  {s.emoji}
                </div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-xs text-gray-400 mb-3 line-clamp-2">{s.situation}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{s.level}</span>
                  <span className="text-xs text-gray-500 capitalize">{s.category}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Scenario Detail */}
        {activeTab === 'scenarios' && selectedScenario && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-2xl mx-auto">
            <button onClick={() => setSelectedScenario(null)} className="flex items-center gap-1 text-gray-400 hover:text-white mb-6 text-sm transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> All scenarios
            </button>
            <div className={`p-6 rounded-2xl bg-gradient-to-br ${selectedScenario.color} mb-6`}>
              <div className="text-4xl mb-2">{selectedScenario.emoji}</div>
              <h2 className="text-2xl font-bold mb-1">{selectedScenario.title}</h2>
              <p className="text-white/80 text-sm">{selectedScenario.situation}</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-indigo-400" /> Your Prompts</h3>
                <ol className="space-y-2">
                  {selectedScenario.prompts.map((p, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {p}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-green-400" /> Sample Answer</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{selectedScenario.sampleAnswer}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> Key Phrases</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedScenario.keyPhrases.map((p, i) => (
                    <span key={i} className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <h3 className="font-semibold mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Tips</h3>
                <ul className="space-y-1">
                  {selectedScenario.tips.map((t, i) => (
                    <li key={i} className="text-sm text-gray-300 flex gap-2 items-start">
                      <span className="text-blue-400 mt-0.5">•</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Confidence Builder Tab */}
        {activeTab === 'confidence' && (
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {!activeExercise ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CONFIDENCE_EXERCISES.map((ex) => (
                  <motion.button
                    key={ex.id}
                    variants={fadeUp}
                    onClick={() => { setActiveExercise(ex); setActiveSentence(0); }}
                    className="text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 hover:bg-white/10 transition-all"
                  >
                    <div className="text-4xl mb-3">{ex.icon}</div>
                    <h3 className="font-semibold mb-1">{ex.title}</h3>
                    <p className="text-sm text-gray-400">{ex.desc}</p>
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div variants={fadeUp} className="max-w-lg mx-auto">
                <button onClick={() => setActiveExercise(null)} className="flex items-center gap-1 text-gray-400 hover:text-white mb-6 text-sm transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" /> All exercises
                </button>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-2">{activeExercise.icon}</div>
                  <h2 className="text-2xl font-bold">{activeExercise.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{activeExercise.desc}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-4 min-h-[100px] flex items-center justify-center">
                  <p className="text-xl text-center font-medium leading-relaxed">{activeExercise.sentences[activeSentence]}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">{activeSentence + 1} / {activeExercise.sentences.length}</span>
                  <div className="flex gap-2">
                    {activeExercise.sentences.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === activeSentence ? 'bg-indigo-400 w-4' : i < activeSentence ? 'bg-green-400' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveSentence(Math.max(0, activeSentence - 1))}
                    disabled={activeSentence === 0}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm font-medium"
                  >
                    Previous
                  </button>
                  {activeSentence < activeExercise.sentences.length - 1 ? (
                    <button
                      onClick={() => setActiveSentence(activeSentence + 1)}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all text-sm font-medium"
                    >
                      Next <ChevronRight className="inline w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => { setActiveSentence(0); setActiveExercise(null); }}
                      className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition-all text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Done!
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
