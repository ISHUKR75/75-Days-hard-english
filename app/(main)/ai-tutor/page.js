'use client';
// ============================================================
// AI TUTOR PAGE — Central AI hub for all learning assistance
// Features: AI chat, translation, grammar check, writing review,
// speaking practice, word lookup, sentence builder
// ============================================================

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Send, Sparkles, Mic, PenTool, Globe, BookOpen,
  Volume2, MessageSquare, Target, ChevronRight, Zap,
  RefreshCw, Copy, Star, CheckCircle2, ArrowRight,
  User, Bot, Lightbulb, Languages, BarChart2,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// ── AI Sub-tools ──────────────────────────────────────────────
const AI_TOOLS = [
  {
    id: 'chat',
    icon: MessageSquare,
    emoji: '💬',
    title: 'AI English Tutor',
    desc: 'Ask anything about English — grammar doubts, word meanings, usage examples.',
    color: 'from-indigo-500 to-blue-600',
    bg: 'bg-indigo-500/8',
    border: 'border-indigo-500/25',
    href: '/ai-tutor/chat',
    badge: 'Most Popular',
  },
  {
    id: 'translate',
    icon: Languages,
    emoji: '🌐',
    title: 'Smart Translator',
    desc: 'Translate Hindi sentences to natural English with context and examples.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/25',
    href: '/ai-tutor/translator',
    badge: null,
  },
  {
    id: 'grammar',
    icon: CheckCircle2,
    emoji: '✅',
    title: 'Grammar Checker',
    desc: 'Paste any English text and get instant grammar correction with explanations.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/25',
    href: '/ai-tutor/grammar-check',
    badge: null,
  },
  {
    id: 'writing',
    icon: PenTool,
    emoji: '✍️',
    title: 'Writing Review',
    desc: 'Get your emails, letters, and essays reviewed and improved by AI.',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/25',
    href: '/ai-tutor/writing-checker',
    badge: null,
  },
  {
    id: 'speaking',
    icon: Mic,
    emoji: '🎤',
    title: 'Speaking Partner',
    desc: 'Practice spoken English with an AI that responds and gives feedback.',
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/8',
    border: 'border-pink-500/25',
    href: '/ai-tutor/speaking-partner',
    badge: 'New',
  },
  {
    id: 'explain',
    icon: Lightbulb,
    emoji: '💡',
    title: 'Word Explainer',
    desc: 'Enter any English word or phrase and get full explanation in Hindi + English.',
    color: 'from-amber-500 to-yellow-600',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/25',
    href: '/ai-tutor/word-explainer',
    badge: null,
  },
  {
    id: 'sentence',
    icon: Sparkles,
    emoji: '✨',
    title: 'Sentence Builder',
    desc: 'Build English sentences from Hindi words — learns your weak points.',
    color: 'from-cyan-500 to-sky-600',
    bg: 'bg-cyan-500/8',
    border: 'border-cyan-500/25',
    href: '/ai-tutor/sentence-builder',
    badge: null,
  },
  {
    id: 'progress',
    icon: BarChart2,
    emoji: '📊',
    title: 'Progress Analyzer',
    desc: 'AI analyzes your performance and suggests what to practice next.',
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-500/8',
    border: 'border-teal-500/25',
    href: '/ai-tutor/progress-analyzer',
    badge: null,
  },
];

// ── Quick demo prompts ─────────────────────────────────────────
const QUICK_PROMPTS = [
  { icon: '🤔', text: '"when to use 'has' vs 'have\'?" (grammar help)' },
  { icon: '📝', text: '"मुझे कल ऑफिस नहीं जाना।" (translate this to English)' },
  { icon: '✅', text: '"correct this: I am agree with you."' },
  { icon: '💡', text: '"explain \'nevertheless\' with examples"' },
  { icon: '🗣️', text: '"how to introduce myself in a job interview?"' },
  { icon: '📧', text: '"write a formal email to request leave"' },
];

// ── Mock AI Chat ──────────────────────────────────────────────
const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: `Namaste! 👋 Main aapka **AI English Tutor** hoon — ek intelligent learning assistant jo aapko Hindi se English fluency tak pohonchane mein madad karta hai.

Aap mujhse **kuch bhi pooch sakte hain:**
• Grammar doubts (e.g., "When to use 'is' vs 'are'?")
• Hindi sentences ko English mein translate karna
• English sentences correct karna
• Word meanings aur examples
• Email/letter likhne mein madad
• Interview ke liye preparation

Aaj kya seekhna chahte hain? 😊`,
  },
];

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isUser ? 'bg-gradient-to-br from-primary-500 to-secondary-500' : 'bg-gradient-to-br from-indigo-500 to-blue-600'}`}>
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>
      <div className={`flex-1 max-w-lg rounded-2xl px-4 py-3 ${isUser ? 'bg-primary-500/15 border border-primary-500/25 text-primary-100 rounded-tr-sm' : 'bg-white/5 border border-white/8 text-slate-300 rounded-tl-sm'}`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br/>') }} />
      </div>
    </motion.div>
  );
}

function AIChatDemo() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const getAIResponse = (userInput) => {
    const q = userInput.toLowerCase();
    if (q.includes('has') && q.includes('have')) return `Great question! Here's the rule:\n\n**"Has"** → He, She, It (third person singular)\n• She **has** a car.\n• He **has** completed the work.\n\n**"Have"** → I, You, We, They (all others)\n• I **have** a question.\n• They **have** arrived.\n\n💡 **Simple trick:** If you can replace the subject with "he/she/it", use **"has"**. Otherwise use **"have"**.`;
    if (q.includes('agree') || q.includes('correct')) return `You wrote: **"I am agree with you."** ❌\n\nCorrect version: **"I agree with you."** ✅\n\n📌 **Reason:** "Agree" is a verb. We don't use "am/is/are" before it.\n\nMore examples:\n• ❌ I am understand. → ✅ I understand.\n• ❌ She is believe me. → ✅ She believes me.`;
    if (q.includes('translate') || q.includes('कल ऑफिस') || q.includes('नहीं जाना')) return `**Translation:**\n\n🇮🇳 Hindi: "मुझे कल ऑफिस नहीं जाना।"\n🇬🇧 English: "I don't have to go to the office tomorrow." ✅\n\n**Alternative:**\n• "I won't be going to the office tomorrow."\n• "I don't need to go to work tomorrow."\n\n💡 Note: "मुझे नहीं जाना" = "I don't have to" or "I'm not going to"`;
    if (q.includes('nevertheless')) return `**"Nevertheless"** means: **"फिर भी / इसके बावजूद"**\n\n📌 It shows **contrast** — despite what was said before, something different happened.\n\n**Examples:**\n• It was raining. **Nevertheless,** we continued the match.\n• He was tired. **Nevertheless,** he completed the assignment.\n• The salary was low. **Nevertheless,** she accepted the job.\n\n💡 **Similar words:** however, nonetheless, despite this, even so`;
    if (q.includes('introduce') || q.includes('interview')) return `**Self Introduction Template for Job Interview:**\n\n*"Good morning! My name is [Your Name]. I am from [City].*\n\n*I have completed my [Degree] in [Subject] from [College/University].*\n\n*I have [X] years of experience in [Field/Domain]. In my previous role at [Company], I was responsible for [Key Responsibilities].*\n\n*I am very excited about this opportunity at [Company Name] because [Reason].*\n\n*I am confident that my skills in [Key Skill 1] and [Key Skill 2] will help me contribute effectively to your team.*\n\nThank you for considering my application."*\n\n💡 **Tips:** Keep it under 2 minutes. Practice out loud 5+ times before the interview.`;
    return `That's a great question about **"${userInput.substring(0, 30)}..."**\n\nI'm analyzing your query. In a full version of this app, I would connect to an AI model (like Claude or GPT-4) to give you a precise, contextual answer with Hindi explanations.\n\n💡 **For now, try these resources:**\n• Grammar doubts → Grammar Reference page\n• Word meanings → Vocabulary Bank\n• Writing help → Writing Hub\n• Speaking practice → Speaking Lab`;
  };

  const sendMessage = () => {
    if (!input.trim() || thinking) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getAIResponse(userMsg.content) }]);
      setThinking(false);
    }, 1200);
  };

  return (
    <div className="card overflow-hidden flex flex-col h-96">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
        {thinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-white/5 border border-white/8 rounded-2xl px-5 py-3 flex items-center gap-2">
              {[0,1,2].map(i => (
                <motion.div key={i} className="w-2 h-2 rounded-full bg-primary-400" animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/8 p-4 flex items-center gap-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask anything about English…"
          className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-all"
        />
        <motion.button
          onClick={sendMessage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!input.trim() || thinking}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30"
        >
          <Send size={16} className="text-white" />
        </motion.button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function AITutorPage() {
  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
          >
            <Brain size={20} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white">AI English Tutor</h1>
            <p className="text-slate-400 text-sm">Intelligent learning tools — always available, always personalized.</p>
          </div>
        </div>
      </motion.div>

      {/* ── Quick Chat Demo ──────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-400" /> Try AI Tutor
          </h3>
          <Link href="/ai-tutor/chat" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
            Open full chat <ArrowRight size={12} />
          </Link>
        </div>
        <AIChatDemo />

        {/* Quick prompts */}
        <div className="mt-4">
          <p className="text-xs text-slate-500 mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((p, i) => (
              <motion.span key={i} whileHover={{ scale: 1.02 }}
                className="text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-slate-300 hover:bg-white/8 cursor-pointer transition-all">
                {p.icon} {p.text}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── AI Tools Grid ─────────────────────────────────── */}
      <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <Zap size={18} className="text-yellow-400" /> All AI Tools
      </h3>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {AI_TOOLS.map(tool => {
          const Icon = tool.icon;
          return (
            <motion.div key={tool.id} variants={fadeUp}>
              <Link href={tool.href} className={`block card p-5 h-full border ${tool.border} ${tool.bg.replace('/8', '/5')} hover:${tool.bg} group transition-all relative overflow-hidden`}>
                {tool.badge && (
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${tool.badge === 'New' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                    {tool.badge}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {tool.emoji}
                </div>
                <h4 className="font-bold text-white mb-1.5">{tool.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{tool.desc}</p>
                <div className="flex items-center gap-1 text-xs text-primary-400 group-hover:gap-2 transition-all">
                  Open tool <ArrowRight size={11} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Feature Highlight ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 card p-6 border-primary-500/20 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"
      >
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Star size={18} className="text-yellow-400" /> Why use AI Tutor?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-400">
          {[
            { icon: '⚡', title: 'Instant Answers',    desc: 'Get explanations in seconds — no waiting, no schedule.' },
            { icon: '🇮🇳', title: 'Hindi + English',  desc: 'All explanations in Hindi + English for complete clarity.' },
            { icon: '🎯', title: 'Personalized',        desc: 'AI remembers your weak points and focuses on them.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-semibold text-white text-xs mb-1">{title}</p>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
