'use client';
// AI Speaking Partner — Conversation practice with scenario-based dialogues

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, Send, Bot, User, RefreshCw, ChevronRight,
  Briefcase, Coffee, Utensils, Plane, ShoppingBag,
  MessageSquare, Zap, Star, CheckCircle2, ArrowLeft,
} from 'lucide-react';

// ── Scenarios ────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'job-interview',
    title: 'Job Interview',
    icon: Briefcase,
    emoji: '💼',
    color: 'from-blue-500 to-indigo-500',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    level: 'B1',
    description: 'Practice answering interview questions confidently.',
    aiRole: 'HR Manager',
    userRole: 'Job Applicant',
    exchanges: [
      { ai: "Good morning! Please have a seat. I'm Ms. Sharma, HR Manager. Could you please introduce yourself?", user: "" },
      { ai: "That's great! You have an impressive background. What made you apply for this position specifically?", user: "" },
      { ai: "Interesting. Can you walk me through your most significant professional achievement?", user: "" },
      { ai: "Excellent. Where do you see yourself in the next five years?", user: "" },
      { ai: "That shows good planning. What would you say is your biggest strength?", user: "" },
      { ai: "And what about a weakness? Don't worry, we all have areas to improve.", user: "" },
      { ai: "That's a very honest answer. Tell me about a time you handled a difficult situation at work.", user: "" },
      { ai: "Very impressive problem-solving. Why do you want to leave your current company?", user: "" },
      { ai: "I understand. What salary are you expecting for this role?", user: "" },
      { ai: "That sounds reasonable. Do you have any questions for us about the company or the role?", user: "" },
    ],
    tips: ['Speak slowly and clearly', 'Use "I" statements', 'Give specific examples', 'Be positive about past employers'],
  },
  {
    id: 'office-meeting',
    title: 'Office Meeting',
    icon: MessageSquare,
    emoji: '🏢',
    color: 'from-violet-500 to-purple-500',
    border: 'border-violet-500/30',
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    level: 'B1',
    description: 'Lead and participate in professional meetings.',
    aiRole: 'Team Lead',
    userRole: 'Team Member',
    exchanges: [
      { ai: "Good morning everyone. Let's get started. First, can you give us an update on the project status?", user: "" },
      { ai: "Thanks for the update. Are you facing any blockers or challenges we should know about?", user: "" },
      { ai: "We can help with that. What do you need from the team to move forward?", user: "" },
      { ai: "Alright. The client has requested some changes to the design. What's your opinion on that?", user: "" },
      { ai: "That's a valid concern. Do you think we can meet the new deadline if we reprioritize tasks?", user: "" },
      { ai: "Good. Could you prepare a timeline and share it with the team by tomorrow?", user: "" },
      { ai: "Perfect. Also, HR wants us to nominate someone for the training program next month. Any volunteers?", user: "" },
      { ai: "Great initiative! The training is in Bangalore for three days. Will that be convenient for you?", user: "" },
      { ai: "Before we wrap up — any other agenda items anyone wants to raise?", user: "" },
      { ai: "Excellent discussion today. I'll send the meeting minutes by end of day. Thank you all!", user: "" },
    ],
    tips: ['Use "I suggest..." for ideas', 'Say "Could you clarify..." for doubts', 'Use "I agree / I disagree because..."'],
  },
  {
    id: 'daily-chat',
    title: 'Daily Chat',
    icon: Coffee,
    emoji: '☕',
    color: 'from-amber-500 to-orange-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    level: 'A2',
    description: 'Casual everyday conversations with colleagues and friends.',
    aiRole: 'Colleague',
    userRole: 'You',
    exchanges: [
      { ai: "Hey! Good morning. How was your weekend?", user: "" },
      { ai: "That sounds fun! I went to a new café in Koregaon Park — the coffee was amazing. Do you like coffee?", user: "" },
      { ai: "Same here! By the way, did you hear about the company picnic next month?", user: "" },
      { ai: "Yes, it's in Lonavala. Should be great weather. Are you planning to come?", user: "" },
      { ai: "Wonderful! We should carpool together. Oh, and have you tried the new restaurant downstairs?", user: "" },
      { ai: "The food is really good — especially the pasta. What's your favorite cuisine?", user: "" },
      { ai: "Nice choice! We should plan a team lunch sometime. Speaking of plans, any vacations coming up?", user: "" },
      { ai: "That sounds amazing! I'm hoping to visit Goa in December. Have you been there?", user: "" },
      { ai: "I've heard it's beautiful. Anyway, we should get back to work. See you at the team lunch?", user: "" },
      { ai: "Perfect! Let's go together. Have a productive day!", user: "" },
    ],
    tips: ['Use contractions: "I\'m, it\'s, we\'re"', 'Ask follow-up questions', 'Share your own experiences too'],
  },
  {
    id: 'restaurant',
    title: 'At a Restaurant',
    icon: Utensils,
    emoji: '🍽️',
    color: 'from-emerald-500 to-teal-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    level: 'A2',
    description: 'Order food, ask about the menu, and handle restaurant situations.',
    aiRole: 'Waiter',
    userRole: 'Customer',
    exchanges: [
      { ai: "Good evening! Welcome to The Grand Spice. Do you have a reservation?", user: "" },
      { ai: "Wonderful! Right this way, please. Here's your table. Can I get you something to drink to start?", user: "" },
      { ai: "Excellent choice. Here are your menus. Our chef's special tonight is pan-seared salmon. Can I tell you about our other specials?", user: "" },
      { ai: "We also have a fantastic lamb biryani and a vegetarian thali. Are you ready to order, or do you need more time?", user: "" },
      { ai: "Great choices! How would you like your steak — rare, medium, or well done?", user: "" },
      { ai: "Perfect. And would you like any side dishes with that? We have garlic bread, salad, and fries.", user: "" },
      { ai: "Wonderful. I'll place your order right away. Is there anything else I can get you?", user: "" },
      { ai: "Here are your dishes. Enjoy your meal! Is everything to your satisfaction?", user: "" },
      { ai: "I'm so sorry to hear that! Let me get the manager immediately. Can I replace the dish for you?", user: "" },
      { ai: "Of course. And your bill is ready whenever you are. Will you be paying by card or cash?", user: "" },
    ],
    tips: ['Use "Could I have..." politely', '"I\'d like to..." for orders', '"Excuse me" to call the waiter'],
  },
  {
    id: 'airport',
    title: 'At the Airport',
    icon: Plane,
    emoji: '✈️',
    color: 'from-rose-500 to-pink-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    level: 'A2',
    description: 'Navigate check-in, security, and boarding confidently.',
    aiRole: 'Airport Staff',
    userRole: 'Traveller',
    exchanges: [
      { ai: "Good morning! Welcome to check-in. May I see your passport and booking reference please?", user: "" },
      { ai: "Thank you. You're flying to Dubai today. How many bags are you checking in?", user: "" },
      { ai: "I see. One bag is fine. Please place it on the belt. Do you have a seat preference — window or aisle?", user: "" },
      { ai: "I've assigned you a window seat, 24A. Your boarding pass is ready. Any liquids in your carry-on bag?", user: "" },
      { ai: "Make sure all liquids are in a clear bag under 100ml. Your gate is B12. Boarding starts in 90 minutes.", user: "" },
      { ai: "One moment — your luggage seems slightly overweight at 23.5 kg. The limit is 23 kg. Can you remove something?", user: "" },
      { ai: "That's fine. Would you like to pay the excess baggage fee — it's ₹2,000?", user: "" },
      { ai: "[At Security] Please remove your laptop, belt, and shoes and place them in the tray.", user: "" },
      { ai: "[At Gate] This is the final boarding call for flight EK505 to Dubai. May I see your boarding pass?", user: "" },
      { ai: "Welcome aboard! Your seat is on the left side, row 24. Enjoy your flight!", user: "" },
    ],
    tips: ['Always be polite with "please"', 'Confirm by repeating: "So my gate is B12?"', 'Ask "Could you repeat that?" if unclear'],
  },
];

export default function SpeakingPartnerPage() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [exchangeIdx,      setExchangeIdx]      = useState(0);
  const [userInput,        setUserInput]         = useState('');
  const [conversation,     setConversation]      = useState([]);
  const [showTips,         setShowTips]          = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const startScenario = (scenario) => {
    setSelectedScenario(scenario);
    setExchangeIdx(0);
    setUserInput('');
    setConversation([{ role: 'ai', text: scenario.exchanges[0].ai }]);
    setShowTips(true);
  };

  const sendReply = () => {
    const text = userInput.trim();
    if (!text) return;

    const next = exchangeIdx + 1;
    setConversation(prev => {
      const updated = [...prev, { role: 'user', text }];
      if (next < selectedScenario.exchanges.length) {
        updated.push({ role: 'ai', text: selectedScenario.exchanges[next].ai });
      } else {
        updated.push({ role: 'ai', text: `Great conversation! 🎉 You completed the "${selectedScenario.title}" scenario. Your spoken English is improving. Practice this scenario again to get even more fluent!` });
      }
      return updated;
    });
    setExchangeIdx(next);
    setUserInput('');
  };

  const resetScenario = () => {
    if (!selectedScenario) return;
    setExchangeIdx(0);
    setConversation([{ role: 'ai', text: selectedScenario.exchanges[0].ai }]);
    setUserInput('');
  };

  if (!selectedScenario) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Mic size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">AI Speaking Partner</h1>
              <p className="text-sm text-slate-500">Real conversation practice — choose a scenario to begin</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-3 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {[
            { icon: MessageSquare, label: 'Scenarios',    value: SCENARIOS.length,                           color: 'text-violet-400' },
            { icon: Star,          label: 'Exchanges',    value: SCENARIOS.reduce((s,c) => s+c.exchanges.length, 0), color: 'text-amber-400' },
            { icon: Zap,           label: 'Your XP',      value: '+50/scenario',                            color: 'text-blue-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card p-3 text-center">
              <Icon size={15} className={`${color} mx-auto mb-1`} />
              <p className="text-base font-black text-white">{value}</p>
              <p className="text-[10px] text-slate-500">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scenario cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCENARIOS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.id}
                onClick={() => startScenario(s)}
                className={`card p-5 text-left group hover:border-white/15 border ${s.border} transition-all`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition-transform`}>
                    {s.emoji}
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text} border ${s.border}`}>
                    {s.level}
                  </span>
                </div>
                <h3 className={`font-bold text-white text-base mb-1 group-hover:${s.text} transition-colors`}>{s.title}</h3>
                <p className="text-xs text-slate-500 mb-3">{s.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{s.exchanges.length} exchanges</span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${s.text} group-hover:gap-2 transition-all`}>
                    Start <ChevronRight size={12} />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* How it works */}
        <motion.div className="card p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
            <Star size={14} className="text-amber-400" /> How to Use Speaking Partner
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: '1', text: 'Choose a real-life scenario that matches your goal.' },
              { step: '2', text: 'Read the AI\'s line and type your English response.' },
              { step: '3', text: 'Complete all exchanges — then practice again for fluency!' },
            ].map(({ step, text }) => (
              <div key={step} className="flex gap-3 items-start p-3 rounded-xl bg-white/3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0">{step}</span>
                <p className="text-xs text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Active scenario ──────────────────────────────────────────
  const s = selectedScenario;
  const isDone = exchangeIdx >= s.exchanges.length;

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <button onClick={() => setSelectedScenario(null)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={15} /> All Scenarios
        </button>
        <ChevronRight size={13} className="text-slate-600" />
        <span className="text-sm font-semibold text-white">{s.title}</span>
        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text} border ${s.border}`}>{s.level}</span>
      </div>

      {/* Scenario info bar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className={`card p-3 flex items-center justify-between border ${s.border} ${s.bg}`}>
        <div className="flex items-center gap-3">
          <span className="text-xl">{s.emoji}</span>
          <div>
            <p className="font-bold text-white text-sm">{s.title}</p>
            <p className="text-xs text-slate-500">You: <span className="text-slate-300">{s.userRole}</span> · AI: <span className="text-slate-300">{s.aiRole}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{Math.min(exchangeIdx + 1, s.exchanges.length)}/{s.exchanges.length}</span>
          <button onClick={resetScenario} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all">
            <RefreshCw size={13} />
          </button>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div className={`h-full bg-gradient-to-r ${s.color} rounded-full`}
          animate={{ width: `${Math.min((exchangeIdx / s.exchanges.length) * 100, 100)}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Conversation */}
      <div className="card overflow-hidden">
        <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto scrollbar-hide">
          <AnimatePresence>
            {conversation.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${
                  msg.role === 'ai' ? `bg-gradient-to-br ${s.color}` : 'bg-primary-500/20 border border-primary-500/30'
                }`}>
                  {msg.role === 'ai' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-primary-400" />}
                </div>
                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'ai'
                    ? 'bg-white/5 border border-white/8 text-slate-300 rounded-tl-sm'
                    : 'bg-primary-500/20 border border-primary-500/30 text-white rounded-tr-sm'
                }`}>
                  {msg.role === 'ai' && <span className="text-[10px] text-slate-500 block mb-0.5">{s.aiRole}</span>}
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {!isDone && (
          <div className="p-3 border-t border-white/5">
            <p className="text-[10px] text-slate-600 mb-2">Your turn as: <span className="text-slate-400">{s.userRole}</span></p>
            <form onSubmit={(e) => { e.preventDefault(); sendReply(); }} className="flex gap-2">
              <input value={userInput} onChange={e => setUserInput(e.target.value)}
                placeholder="Type your English response here…"
                className="input flex-1 text-sm py-2.5" />
              <button type="submit" disabled={!userInput.trim()}
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white disabled:opacity-40 transition-all shrink-0`}>
                <Send size={15} />
              </button>
            </form>
          </div>
        )}

        {isDone && (
          <div className="p-4 border-t border-white/5 text-center">
            <p className="text-emerald-400 font-bold text-sm mb-2">🎉 Scenario Complete!</p>
            <div className="flex gap-2 justify-center">
              <button onClick={resetScenario} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
                <RefreshCw size={13} /> Practice Again
              </button>
              <button onClick={() => setSelectedScenario(null)} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                Try Another <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      {showTips && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversation Tips</h4>
            <button onClick={() => setShowTips(false)} className="text-xs text-slate-600 hover:text-slate-400">hide</button>
          </div>
          <div className="space-y-1.5">
            {s.tips.map(tip => (
              <div key={tip} className="flex items-start gap-2">
                <CheckCircle2 size={11} className={`${s.text} mt-0.5 shrink-0`} />
                <p className="text-xs text-slate-400">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
