'use client';
// ============================================================
// PROFESSIONAL ENGLISH — Office, Interview, Business English
// Features: Real scenarios by profession, situational English
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronRight, Play, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

const PROFESSIONS = [
  { id:'software',   emoji:'💻', title:'Software Engineer',  desc:'Standups, code reviews, technical interviews', color:'from-indigo-500 to-blue-500' },
  { id:'hr',         emoji:'👥', title:'HR Professional',    desc:'Interviews, onboarding, performance reviews',  color:'from-violet-500 to-purple-500' },
  { id:'sales',      emoji:'📈', title:'Sales & Marketing',  desc:'Client pitches, cold calls, negotiations',     color:'from-amber-500 to-orange-500' },
  { id:'customer',   emoji:'🎧', title:'Customer Support',   desc:'Phone calls, email support, escalations',      color:'from-rose-500 to-pink-500' },
  { id:'manager',    emoji:'🏢', title:'Manager / Team Lead', desc:'Team meetings, performance talks, strategy',  color:'from-emerald-500 to-teal-500' },
  { id:'finance',    emoji:'💰', title:'Finance & Banking',  desc:'Reports, audits, financial presentations',     color:'from-sky-500 to-cyan-500' },
  { id:'medical',    emoji:'🏥', title:'Healthcare / Doctor', desc:'Patient communication, medical reports',      color:'from-green-500 to-emerald-500' },
  { id:'teacher',    emoji:'📚', title:'Teacher / Trainer',  desc:'Classroom English, lesson planning talks',     color:'from-orange-500 to-amber-500' },
  { id:'startup',    emoji:'🚀', title:'Startup Founder',    desc:'Pitching, fundraising, team communication',    color:'from-primary-500 to-secondary-500' },
  { id:'freelancer', emoji:'🌐', title:'Freelancer / Remote', desc:'Client proposals, contracts, remote calls',   color:'from-cyan-500 to-blue-500' },
];

const SCENARIOS = {
  software: [
    {
      title: 'Daily Standup (Scrum)',
      description: 'How to give a clear standup update in 60 seconds',
      dialogue: [
        { who: 'You', text: 'Good morning team! Yesterday I completed the user authentication module and pushed the code for review. Today I\'ll work on the dashboard integration. No blockers on my end. That\'s it from my side.' },
        { who: 'Manager', text: 'Great update, Rahul. Make sure to ping Amit once the dashboard is ready for testing.' },
        { who: 'You', text: 'Sure, I\'ll loop him in once I\'m done with the initial integration.' },
      ],
      phrases: ['completed the task', 'pushed the code', 'no blockers', 'loop someone in', 'ping someone'],
    },
    {
      title: 'Code Review Discussion',
      description: 'How to give and receive code review feedback professionally',
      dialogue: [
        { who: 'You', text: 'Hey Priya, I\'ve reviewed your PR. Overall it looks solid! I have a couple of minor suggestions.' },
        { who: 'Priya', text: 'Sure, go ahead!' },
        { who: 'You', text: 'On line 42, I think we could use a ternary operator to make it cleaner. Also, we might want to add error handling for the API call. Just suggestions — your approach works too.' },
        { who: 'Priya', text: 'Good points! I\'ll refactor line 42 and add a try-catch block for the API. Thanks for the thorough review!' },
      ],
      phrases: ['looks solid', 'minor suggestions', 'refactor', 'thorough review', 'good points'],
    },
    {
      title: 'Technical Interview',
      description: 'Common technical interview phrases and answers',
      dialogue: [
        { who: 'Interviewer', text: 'Can you walk me through your experience with React?' },
        { who: 'You', text: 'Absolutely! I\'ve been working with React for 3 years now. I\'ve built scalable SPAs using React with TypeScript, Redux for state management, and React Query for server-state synchronization. In my last role, I refactored a legacy jQuery codebase to React, which improved performance by 40%.' },
        { who: 'Interviewer', text: 'That\'s impressive. How do you handle performance optimization in React?' },
        { who: 'You', text: 'I use several strategies — React.memo to prevent unnecessary re-renders, useMemo and useCallback for expensive computations, code splitting with lazy loading, and virtualization for long lists using react-window.' },
      ],
      phrases: ['walk me through', 'scalable', 'refactored', 'state management', 'performance optimization'],
    },
  ],
  hr: [
    {
      title: 'Conducting a Job Interview',
      description: 'How to interview candidates professionally',
      dialogue: [
        { who: 'You (HR)', text: 'Good morning, Mr. Sharma! Welcome. Please have a seat. I\'m Priya from the HR team. Before we begin, could you briefly introduce yourself?' },
        { who: 'Candidate', text: 'Good morning! I\'m Amit Sharma, a software engineer with 4 years of experience...' },
        { who: 'You (HR)', text: 'That\'s great. Tell me — what motivated you to apply for this role, and why do you want to join our company specifically?' },
      ],
      phrases: ['please have a seat', 'briefly introduce', 'what motivated you', 'specifically', 'before we begin'],
    },
  ],
  sales: [
    {
      title: 'Client Product Pitch',
      description: 'How to pitch your product convincingly in English',
      dialogue: [
        { who: 'You', text: 'Thank you for taking the time to meet with me today, Mr. Verma. I\'d like to show you how our solution can specifically address the challenges you mentioned — reducing operational costs and improving team efficiency.' },
        { who: 'Client', text: 'We\'ve tried several tools before. What makes yours different?' },
        { who: 'You', text: 'Great question. Our platform is unique in three ways: first, it integrates with your existing tools seamlessly. Second, our AI-powered analytics give you real-time insights. And third, our dedicated support team ensures onboarding is smooth. Companies like ABC Corp reduced costs by 35% within the first quarter.' },
      ],
      phrases: ['address challenges', 'operational costs', 'integrates seamlessly', 'real-time insights', 'reduced costs by'],
    },
  ],
  customer: [
    {
      title: 'Handling a Difficult Customer Call',
      description: 'Stay professional and resolve issues calmly',
      dialogue: [
        { who: 'Customer', text: 'This is unacceptable! My order hasn\'t arrived in two weeks and no one is giving me a proper response!' },
        { who: 'You', text: 'I completely understand your frustration, Mr. Patel, and I sincerely apologize for the inconvenience. Let me pull up your order details right away.' },
        { who: 'You', text: 'I can see there was a logistics delay on our end. I\'m going to escalate this immediately and ensure your order arrives within the next 48 hours. I\'ll also process a 20% refund as compensation for your wait.' },
        { who: 'Customer', text: 'Okay, that\'s better. Thank you for handling this.' },
        { who: 'You', text: 'You\'re most welcome. We value your business, and I\'m sorry this happened. Is there anything else I can help you with today?' },
      ],
      phrases: ['understand your frustration', 'sincerely apologize', 'pull up', 'escalate this', 'as compensation'],
    },
  ],
};

export default function ProfessionalEnglishPage() {
  const [activeProfession, setActiveProfession] = useState(null);
  const [activeScenario, setActiveScenario] = useState(null);

  const currentScenarios = activeProfession ? (SCENARIOS[activeProfession.id] || []) : [];

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-black text-white mb-1">💼 Professional English</h1>
        <p className="text-slate-400">Real English for real workplaces — by profession and situation</p>
      </motion.div>

      {!activeProfession ? (
        // Profession Grid
        <div>
          <p className="text-sm text-slate-400 mb-4">Select your profession to get targeted practice:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PROFESSIONS.map((prof, i) => (
              <motion.button key={prof.id}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveProfession(prof)}
                className="card p-5 text-left group hover:border-white/20 transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prof.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                  {prof.emoji}
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">{prof.title}</h3>
                <p className="text-xs text-slate-500">{prof.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary-400">
                  <span>{SCENARIOS[prof.id]?.length || 0} scenarios</span>
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : !activeScenario ? (
        // Scenarios for selected profession
        <div className="space-y-4">
          <button onClick={() => setActiveProfession(null)}
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
            ← All Professions
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeProfession.color} flex items-center justify-center text-2xl`}>
              {activeProfession.emoji}
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{activeProfession.title}</h2>
              <p className="text-slate-400 text-sm">{activeProfession.desc}</p>
            </div>
          </div>
          {currentScenarios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentScenarios.map((sc, i) => (
                <motion.button key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }} onClick={() => setActiveScenario(sc)}
                  className="card p-5 text-left group hover:border-white/20 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <MessageSquare size={18} className="text-primary-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-white">{sc.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{sc.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sc.phrases.slice(0, 3).map((phrase, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-slate-500">
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-3xl mb-3">🚧</p>
              <p className="text-slate-400">More scenarios coming soon for {activeProfession.title}!</p>
              <Link href="/speaking" className="btn-primary mt-4 inline-flex items-center gap-2 text-sm px-5 py-2.5">
                <Play size={14} /> Try Speaking Lab
              </Link>
            </div>
          )}
        </div>
      ) : (
        // Active scenario
        <div className="space-y-4 max-w-3xl">
          <button onClick={() => setActiveScenario(null)}
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
            ← Back to Scenarios
          </button>
          <div>
            <h2 className="text-2xl font-black text-white mb-1">{activeScenario.title}</h2>
            <p className="text-slate-400 text-sm">{activeScenario.description}</p>
          </div>
          {/* Dialogue */}
          <div className="space-y-3">
            {activeScenario.dialogue.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: line.who === 'You' || line.who === 'You (HR)' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className={`flex gap-3 ${(line.who === 'You' || line.who.includes('You')) ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  line.who === 'You' || line.who.includes('You') ? 'bg-primary-500/30 text-primary-300' : 'bg-white/10 text-slate-300'
                }`}>
                  {line.who[0]}
                </div>
                <div className={`flex-1 max-w-[85%] p-4 rounded-2xl text-sm ${
                  line.who === 'You' || line.who.includes('You')
                    ? 'bg-primary-500/15 border border-primary-500/20 text-white rounded-tr-sm'
                    : 'bg-white/5 border border-white/8 text-slate-200 rounded-tl-sm'
                }`}>
                  <p className="text-[10px] font-semibold mb-1.5 opacity-60">{line.who}</p>
                  <p className="leading-relaxed">{line.text}</p>
                </div>
                <button onClick={() => speak(line.text)}
                  className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all self-end shrink-0">
                  <Play size={10} className="text-slate-400" fill="currentColor" />
                </button>
              </motion.div>
            ))}
          </div>
          {/* Key phrases */}
          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Star size={14} className="text-amber-400" /> Key Phrases to Learn
            </h3>
            <div className="flex flex-wrap gap-2">
              {activeScenario.phrases.map((phrase, i) => (
                <button key={i} onClick={() => speak(phrase)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm hover:bg-amber-500/20 transition-all">
                  "{phrase}" 🔊
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
