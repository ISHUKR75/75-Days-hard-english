'use client';
// ============================================================
// SPEAKING LAB PAGE — Speaking practice, drills, roleplay
// Features: Speaking drills, conversation simulator, roleplay
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Play, ChevronRight, RotateCcw, Volume2, MessageSquare, Users, Phone, Briefcase } from 'lucide-react';
import Link from 'next/link';
import useUserStore from '@/store/userStore';

const SPEAKING_CATEGORIES = [
  { id:'daily',       icon:'🏠', label:'Daily Conversation',  color:'from-emerald-500 to-teal-500',  desc:'Everyday English for home, friends, and shopping' },
  { id:'office',      icon:'💼', label:'Office English',      color:'from-indigo-500 to-blue-500',   desc:'Meetings, emails, professional conversations' },
  { id:'interview',   icon:'🎯', label:'Interview English',   color:'from-amber-500 to-orange-500',  desc:'HR rounds, technical interviews, job applications' },
  { id:'phone',       icon:'📞', label:'Phone Conversation',  color:'from-sky-500 to-cyan-500',      desc:'Business calls, customer support, helplines' },
  { id:'presentation',icon:'📊', label:'Presentation Skills', color:'from-purple-500 to-violet-500', desc:'Public speaking, slides, Q&A sessions' },
  { id:'smalltalk',   icon:'☕', label:'Small Talk',          color:'from-rose-500 to-pink-500',     desc:'Networking, parties, casual introductions' },
];

const DAILY_DRILLS = [
  { id:1, title:'Morning Greetings',     sentences:['Good morning! How are you?','I am doing well, thank you.','Have a great day!','See you later!'],         category:'daily',   level:'A1' },
  { id:2, title:'At the Restaurant',     sentences:['I would like to order a coffee.','Can I have the menu, please?','The bill, please.','This food is delicious!'], category:'daily',level:'A1' },
  { id:3, title:'Asking for Directions', sentences:['Excuse me, where is the nearest ATM?','Can you show me on the map?','Go straight and turn left.','Thank you so much!'], category:'daily', level:'A2' },
  { id:4, title:'Introducing Yourself',  sentences:['My name is Rahul. I am from Delhi.','I work as a software engineer.','I have been learning English for 6 months.','Nice to meet you!'], category:'daily', level:'A1' },
  { id:5, title:'Office Morning Standup',sentences:['Good morning team!','Yesterday I completed the login module.','Today I will work on the dashboard.','I have no blockers currently.'],  category:'office',level:'B1' },
  { id:6, title:'Job Interview — Tell Me About Yourself', sentences:['I am Priya Sharma with 3 years of experience in marketing.','I have worked at XYZ company handling social media campaigns.','My key strength is data-driven decision making.','I am passionate about digital marketing and am looking to grow.'], category:'interview', level:'B2' },
  { id:7, title:'Client Call Opening',   sentences:['Good afternoon, this is Rahul calling from ABC Solutions.','I am calling regarding your recent inquiry about our services.','Shall I schedule a demo for you?','What time works best for you?'], category:'phone', level:'B1' },
  { id:8, title:'Starting a Presentation',sentences:['Good morning everyone, thank you for joining us today.','My name is Amit and I will be presenting our Q3 results.','The presentation will take approximately 20 minutes.','Please feel free to ask questions at the end.'], category:'presentation', level:'B2' },
  { id:9, title:'Small Talk at Office',  sentences:['Hey! Did you watch the match last night?','It was amazing! What a game!','By the way, are you coming to the team lunch?','Yes, definitely! See you there.'], category:'smalltalk', level:'A2' },
  { id:10, title:'Giving Feedback',      sentences:['I wanted to share some thoughts about the project.','The overall quality is excellent.','However, I feel the timeline could be improved.','Let me know if you need any support.'], category:'office', level:'B1' },
];

const CONVERSATIONS = [
  {
    id:'c1', title:'Job Interview (HR Round)', level:'B2', category:'interview',
    dialogue: [
      { speaker:'HR',     text:'Tell me about yourself.' },
      { speaker:'You',    text:'Good morning! My name is Rahul Kumar. I am a software engineer with 3 years of experience in React and Node.js.' },
      { speaker:'HR',     text:'Why do you want to join our company?' },
      { speaker:'You',    text:'I have been following your company\'s growth and I am very impressed by your product. I believe my skills in frontend development would add great value here.' },
      { speaker:'HR',     text:'What are your strengths?' },
      { speaker:'You',    text:'I am a quick learner, a good team player, and I deliver work on time. I also have strong problem-solving skills.' },
      { speaker:'HR',     text:'Do you have any questions for us?' },
      { speaker:'You',    text:'Yes, could you tell me more about the team structure and what a typical day looks like in this role?' },
    ]
  },
  {
    id:'c2', title:'Daily Conversation — At a Café', level:'A2', category:'daily',
    dialogue: [
      { speaker:'Waiter', text:'Welcome! What can I get for you?' },
      { speaker:'You',    text:'Hello! I would like a cappuccino and a sandwich, please.' },
      { speaker:'Waiter', text:'Sure! Would you like anything else?' },
      { speaker:'You',    text:'No, that will be all. Thank you.' },
      { speaker:'Waiter', text:'Your order will be ready in 5 minutes. Is here fine for you?' },
      { speaker:'You',    text:'Yes, this table is perfect. Thank you!' },
    ]
  },
  {
    id:'c3', title:'Office Meeting — Project Update', level:'B1', category:'office',
    dialogue: [
      { speaker:'Manager',text:'Let\'s start the meeting. Can everyone give a quick update?' },
      { speaker:'You',    text:'Sure! I have completed the API integration and it is working well in the testing environment.' },
      { speaker:'Manager',text:'Great! Any issues or blockers?' },
      { speaker:'You',    text:'There is one small issue with the authentication flow. I have raised it with the backend team and we should resolve it by end of day.' },
      { speaker:'Manager',text:'Excellent! Keep up the good work.' },
      { speaker:'You',    text:'Thank you! I will send a detailed update by 5 PM.' },
    ]
  },
];

export default function SpeakingPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDrill, setActiveDrill]       = useState(null);
  const [activeConvo, setActiveConvo]       = useState(null);
  const [currentLine, setCurrentLine]       = useState(0);

  const { addXP } = useUserStore();

  const filteredDrills = activeCategory === 'all'
    ? DAILY_DRILLS
    : DAILY_DRILLS.filter(d => d.category === activeCategory);

  const speakLine = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
        <h1 className="text-4xl font-black text-white mb-1">🎤 Speaking Lab</h1>
        <p className="text-slate-400">Drills, roleplay, shadowing — speak English with confidence</p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${activeCategory === 'all' ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300'}`}>
          All
        </button>
        {SPEAKING_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-1.5 ${activeCategory === cat.id ? 'bg-primary-500/20 text-primary-300 border-primary-500/30' : 'bg-white/4 text-slate-500 border-white/6 hover:text-slate-300'}`}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Drill Cards */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Volume2 size={20} className="text-primary-400" /> Speaking Drills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDrills.map((drill) => (
            <DrillCard key={drill.id} drill={drill}
              isActive={activeDrill?.id === drill.id}
              onToggle={() => {
                setActiveDrill(d => d?.id === drill.id ? null : drill);
                addXP(5);
              }}
              onSpeak={speakLine} />
          ))}
        </div>
      </div>

      {/* Conversations */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <MessageSquare size={20} className="text-secondary-400" /> Roleplay Conversations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {CONVERSATIONS.filter(c => activeCategory === 'all' || c.category === activeCategory).map((convo) => (
            <ConversationCard key={convo.id} convo={convo}
              isActive={activeConvo?.id === convo.id}
              onToggle={() => { setActiveConvo(c => c?.id === convo.id ? null : convo); setCurrentLine(0); }}
              onSpeak={speakLine} />
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card p-6 bg-emerald-500/5 border-emerald-500/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Mic size={18} className="text-emerald-400" /> Speaking Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-400">
          {[
            '🪞 Practice in front of a mirror every day',
            '🎧 Shadow native speakers — repeat exactly what they say',
            '📝 Prepare 30-sec, 1-min, 2-min self-introduction',
            '💬 Think in English — avoid mental translation',
            '🔊 Record yourself and listen back',
            '🎯 Focus on fluency first, accuracy second',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2"><span className="shrink-0">{tip}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DrillCard({ drill, isActive, onToggle, onSpeak }) {
  return (
    <div className={`card overflow-hidden transition-all ${isActive ? 'border-primary-500/30' : ''}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors text-left">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${drill.category === 'office' ? 'bg-indigo-500/20 text-indigo-300' : drill.category === 'interview' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>{drill.category}</span>
            <span className="text-[10px] text-slate-500">{drill.level}</span>
          </div>
          <p className="font-semibold text-white text-sm">{drill.title}</p>
          <p className="text-xs text-slate-500">{drill.sentences.length} sentences</p>
        </div>
        <ChevronRight size={16} className={`text-slate-500 transition-transform ${isActive ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden border-t border-white/5">
            <div className="p-4 space-y-2">
              {drill.sentences.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
                  <button onClick={() => onSpeak(s)} className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0 hover:bg-primary-500/30 transition-all">
                    <Play size={12} className="text-primary-400" fill="currentColor" />
                  </button>
                  <p className="text-sm text-slate-200 flex-1">{s}</p>
                  <button onClick={() => onSpeak(s)} className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center shrink-0 hover:bg-pink-500/30 transition-all">
                    <Mic size={12} className="text-pink-400" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConversationCard({ convo, isActive, onToggle, onSpeak }) {
  return (
    <div className={`card overflow-hidden ${isActive ? 'border-secondary-500/30' : ''}`}>
      <button onClick={onToggle} className="w-full flex items-start justify-between p-4 hover:bg-white/3 transition-colors text-left">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-primary text-[10px]">{convo.category}</span>
            <span className="text-[10px] text-slate-500">CEFR {convo.level}</span>
          </div>
          <p className="font-semibold text-white text-sm">{convo.title}</p>
          <p className="text-xs text-slate-500">{convo.dialogue.length} exchanges</p>
        </div>
        <ChevronRight size={16} className={`text-slate-500 mt-0.5 transition-transform ${isActive ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden border-t border-white/5">
            <div className="p-4 space-y-2">
              {convo.dialogue.map((line, i) => (
                <div key={i} className={`flex gap-3 ${line.speaker === 'You' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${line.speaker === 'You' ? 'bg-primary-500/30 text-primary-300' : 'bg-white/10 text-slate-300'}`}>
                    {line.speaker.slice(0,1)}
                  </div>
                  <div className={`flex-1 max-w-[80%] p-3 rounded-2xl text-sm ${line.speaker === 'You' ? 'bg-primary-500/15 border border-primary-500/20 text-white rounded-tr-sm' : 'bg-white/5 border border-white/8 text-slate-200 rounded-tl-sm'}`}>
                    <p className="text-[10px] font-semibold mb-1 opacity-60">{line.speaker}</p>
                    <p>{line.text}</p>
                  </div>
                  {line.speaker !== 'You' && (
                    <button onClick={() => onSpeak(line.text)} className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all self-end">
                      <Play size={11} className="text-slate-400" fill="currentColor" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
