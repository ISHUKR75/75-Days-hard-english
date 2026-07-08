'use client';
// ============================================================
// AI TUTOR PAGE — Smart AI-powered English tutor
// Features: Chat, grammar check, vocabulary suggestions
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Sparkles, RotateCcw, Lightbulb, BookOpen } from 'lucide-react';
import useUserStore from '@/store/userStore';

// ── Pre-defined AI responses for offline mode ──────────────
const AI_RESPONSES = {
  greetings: [
    "Namaste! 🙏 Main aapka AI English tutor hun. Aaj hum kya seekhenge?",
    "Hello! I'm your AI English tutor. How can I help you today?",
    "Hi there! Ready to improve your English? Let's start!",
  ],
  grammar: {
    'be verb':   "**Be Verb** (am/is/are) ka rule:\n\n• I → am\n• He/She/It → is\n• You/We/They → are\n\nExample:\n🇮🇳 मैं खुश हूँ → 🇬🇧 **I am happy**\n🇮🇳 वह डॉक्टर है → 🇬🇧 **He is a doctor**",
    'tense':     "English mein **12 tenses** hote hain:\n\n**Present:** Simple, Continuous, Perfect, Perfect Continuous\n**Past:** Simple, Continuous, Perfect, Perfect Continuous\n**Future:** Simple, Continuous, Perfect, Perfect Continuous\n\nSabse important: **Simple Present** — daily routines ke liye\nExample: I eat breakfast every day.",
    'modal':     "**Modal Verbs** — ability, permission, advice:\n\n• **Can** — I can speak English\n• **Should** — You should study\n• **Must** — You must come on time\n• **May** — It may rain today\n• **Would** — I would like tea, please",
    'article':   "**Articles — A, An, The:**\n\n**A** — consonant sounds: a book, a car\n**An** — vowel sounds: an apple, an hour, an MBA\n**The** — specific: the sun, the president\n\n⚠️ Tricky: **a university** (because 'u' sounds like 'yoo')",
  },
  vocabulary: [
    "Great question! Here's a useful word:\n\n**Proficient** — कुशल\nMeaning: Skilled at something\nExample: She is proficient in English.\nOffice: I am proficient in Excel and PowerPoint.",
    "Here's a professional word:\n\n**Diligent** — मेहनती\nMeaning: Careful and hard-working\nExample: He is a very diligent student.\nOffice: We need diligent employees for this project.",
    "Today's power word:\n\n**Articulate** — स्पष्ट रूप से बोलना\nMeaning: Express ideas clearly\nExample: She speaks in an articulate manner.\nOffice: An articulate speaker impresses the interviewer.",
  ],
  motivation: [
    "You're doing great! Remember: **consistent practice > perfect knowledge**. Just 30 minutes a day can transform your English in 75 days! 💪",
    "Aap ek dum sahi raaste par hain! English fluency ek journey hai — enjoy the process. Every mistake is a lesson learned! 🚀",
    "**Pro tip:** Don't wait to be fluent before speaking. Start speaking now, even if imperfect. Confidence comes from practice, not perfection! ⭐",
  ],
  default: [
    "That's a great question! Let me help you with that. Could you be more specific about which English topic you'd like to learn?",
    "I understand! Try practicing this concept daily and it will become natural. Would you like some example sentences?",
    "Good effort! Here's a tip: Read English content daily — newspapers, articles, books. This builds vocabulary naturally.",
  ]
};

const QUICK_PROMPTS = [
  { label:'Be Verb Rule',       prompt:'Explain be verb am/is/are rules' },
  { label:'Self Introduction',  prompt:'How to introduce myself in English?' },
  { label:'Office Email Tips',  prompt:'How to write a professional email?' },
  { label:'Vocabulary Word',    prompt:'Give me a new vocabulary word' },
  { label:'Grammar Check',      prompt:'Check my English grammar' },
  { label:'Speaking Tips',      prompt:'How to improve my spoken English?' },
  { label:'Motivate Me',        prompt:'Motivate me to keep learning English' },
  { label:'Tense Help',         prompt:'Explain tenses simply' },
];

const getAIResponse = (userMsg) => {
  const msg = userMsg.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) {
    return AI_RESPONSES.greetings[Math.floor(Math.random() * AI_RESPONSES.greetings.length)];
  }
  if (msg.includes('be verb') || msg.includes('am') || msg.includes('is are')) {
    return AI_RESPONSES.grammar['be verb'];
  }
  if (msg.includes('tense')) {
    return AI_RESPONSES.grammar['tense'];
  }
  if (msg.includes('modal')) {
    return AI_RESPONSES.grammar['modal'];
  }
  if (msg.includes('article') || msg.includes('a an the')) {
    return AI_RESPONSES.grammar['article'];
  }
  if (msg.includes('vocabulary') || msg.includes('word') || msg.includes('new word')) {
    return AI_RESPONSES.vocabulary[Math.floor(Math.random() * AI_RESPONSES.vocabulary.length)];
  }
  if (msg.includes('motivat') || msg.includes('encourage') || msg.includes('help me')) {
    return AI_RESPONSES.motivation[Math.floor(Math.random() * AI_RESPONSES.motivation.length)];
  }
  if (msg.includes('introduce') || msg.includes('self introduction')) {
    return "**Self Introduction Formula (NPPH):**\n\n1. **Name:** My name is [Name]\n2. **Place:** I am from [City]\n3. **Profession:** I work as a [Job] / I am a [student/professional]\n4. **Hobby:** I enjoy [hobby]\n\nSample:\n\"*My name is Rahul Kumar. I am from Delhi. I work as a software engineer at XYZ Technologies. I enjoy reading and learning new languages.*\"";
  }
  if (msg.includes('email')) {
    return "**Professional Email Structure:**\n\n1. **Subject:** Clear and specific\n2. **Greeting:** Dear Mr./Ms. [Name] (formal)\n3. **Opening:** I hope this email finds you well.\n4. **Purpose:** I am writing to...\n5. **Body:** Main content with clear points\n6. **Closing:** Please let me know if...\n7. **Sign off:** Warm regards / Sincerely\n\n**Key:** Always be polite, clear, and concise!";
  }
  if (msg.includes('speaking') || msg.includes('speak') || msg.includes('fluent')) {
    return "**5 Tips to Improve Speaking:**\n\n1. 🪞 **Mirror Practice** — Talk to yourself daily\n2. 🎧 **Shadowing** — Repeat after native speakers\n3. 📱 **Record Yourself** — Listen and correct\n4. 💬 **Think in English** — Stop mental translation\n5. 🎯 **Speak Imperfectly** — Fluency > Perfection\n\n**Daily Target:** Speak 10 new English sentences every day!";
  }
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
};

const renderMessage = (text) => {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className={`text-sm ${line === '' ? 'h-2' : ''}`}>
        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part)}
      </p>
    );
  });
};

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    { id:1, role:'assistant', text:"Namaste! 🙏 Main aapka AI English Tutor hun.\n\nMain aapki madad kar sakta hun:\n• Grammar rules explain karna\n• Vocabulary sikhana\n• Speaking tips dena\n• Sentences check karna\n• Any English doubt clear karna\n\n**Kya poochna chahenge?**", time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { addXP } = useUserStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role:'user', text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    addXP(2);

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
    const response = getAIResponse(text);
    setMessages(prev => [...prev, { id: Date.now()+1, role:'assistant', text: response, time: new Date() }]);
    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([{ id:1, role:'assistant', text:"Chat cleared! Fresh start 🌟 What would you like to learn today?", time:new Date() }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-primary-500 flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white">AI English Tutor</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-emerald-400">Online — Ready to help</p>
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 text-xs">
          <RotateCcw size={14} /> Clear
        </button>
      </div>

      {/* Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto py-3 px-4 border-b border-white/5 scrollbar-hide shrink-0">
        {QUICK_PROMPTS.map((qp) => (
          <button key={qp.label} onClick={() => sendMessage(qp.prompt)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs text-slate-400 hover:bg-white/10 hover:text-white transition-all whitespace-nowrap">
            {qp.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-gradient-to-br from-violet-500 to-primary-500' : 'bg-gradient-to-br from-primary-500 to-secondary-500'
            }`}>
              {msg.role === 'assistant' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
            </div>
            {/* Bubble */}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 space-y-1 ${
              msg.role === 'user'
                ? 'bg-primary-500/20 border border-primary-500/30 rounded-tr-sm'
                : 'bg-white/5 border border-white/8 rounded-tl-sm'
            }`}>
              <div className="space-y-1 text-slate-200">{renderMessage(msg.text)}</div>
              <p className="text-[10px] text-slate-600">{msg.time.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-primary-500 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white/5 border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                {[0,1,2].map(i => (
                  <motion.div key={i} className="w-2 h-2 rounded-full bg-slate-400"
                    animate={{y:[0,-4,0]}} transition={{duration:0.6,delay:i*0.15,repeat:Infinity}} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 shrink-0">
        <div className="flex gap-3">
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Kuch bhi poochein — grammar, vocabulary, speaking…"
            className="input flex-1 text-sm" />
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
            <Send size={16} className="text-white" />
          </motion.button>
        </div>
        <p className="text-[10px] text-slate-600 mt-2 text-center">AI Tutor — Grammar, Vocabulary, Speaking, Writing help</p>
      </div>
    </div>
  );
}
