'use client';
// AI Tutor Page — Chat interface with AI English teacher

import { useState, useRef, useEffect } from 'react';
import {
  Send, Zap, Brain, Mic, MessageSquare, User,
  Bot, RefreshCw, Sparkles, BookOpen, Target,
  Volume2, Loader2, ChevronDown, Plus,
} from 'lucide-react';

// Quick prompt suggestions
const QUICK_PROMPTS = [
  { icon: '📚', text: 'Explain Present Perfect Tense in Hindi' },
  { icon: '🔤', text: 'Correct this sentence: "I am going to market yesterday"' },
  { icon: '💼', text: 'How to introduce myself in a job interview?' },
  { icon: '✉️', text: 'Write a professional email requesting leave' },
  { icon: '🗣️', text: 'Daily conversation phrases for office' },
  { icon: '❓', text: 'Difference between "since" and "for"' },
];

// AI Features
const AI_FEATURES = [
  { icon: Brain,       label: 'Grammar Checker', href: '/ai-tutor/grammar-check',     color: 'from-indigo-500 to-blue-500' },
  { icon: Mic,         label: 'Speaking Partner', href: '/ai-tutor/speaking-partner',  color: 'from-purple-500 to-pink-500' },
  { icon: BookOpen,    label: 'Vocabulary Coach', href: '/ai-tutor/vocabulary-coach',  color: 'from-amber-500 to-orange-500' },
  { icon: Target,      label: 'Writing Checker',  href: '/ai-tutor/writing-checker',   color: 'from-emerald-500 to-teal-500' },
];

// ============================================================
// AI Tutor Page
// ============================================================
export default function AITutorPage() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: `Namaste! 🙏 Main aapka AI English Teacher hun.\n\nMain aapki help kar sakta hun:\n• Grammar explain karne mein\n• Sentences correct karne mein\n• Vocabulary sikhane mein\n• Professional English samjhane mein\n• Interview preparation mein\n\nKuch bhi puchho — Hindi ya English mein! 😊`,
      time: new Date(),
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message
  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg, time: new Date() }]);
    setLoading(true);

    // Simulate AI response (replace with real API call)
    await new Promise((r) => setTimeout(r, 1500));

    setMessages((prev) => [
      ...prev,
      {
        role: 'ai',
        text: `Great question! 🌟\n\nYour message was: "${userMsg}"\n\nMain is topic par detailed explanation dunga. Abhi AI integration set ho raha hai — jald hi poori functionality available hogi!\n\nAap tab tak practice section mein ja sakte hain. 📚`,
        time: new Date(),
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-120px)]">

      {/* ── Left: Chat ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col card overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">AI English Teacher</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                <p className="text-xs text-slate-500">Online</p>
              </div>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-white hover:bg-white/8 transition-all">
            <RefreshCw size={15} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === 'ai' ? 'bg-gradient-primary' : 'bg-primary-500/20 border border-primary-500/30'
              }`}>
                {msg.role === 'ai'
                  ? <Bot size={16} className="text-white" />
                  : <User size={16} className="text-primary-400" />
                }
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'ai'
                  ? 'bg-white/5 border border-white/8 text-slate-300 rounded-tl-sm'
                  : 'bg-primary-500/20 border border-primary-500/30 text-white rounded-tr-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/8">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i}
                      className="w-2 h-2 rounded-full bg-slate-500 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        <div className="px-4 py-2 border-t border-white/5">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {QUICK_PROMPTS.map(({ icon, text }, i) => (
              <button
                key={i}
                onClick={() => sendMessage(text)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs text-slate-400 hover:text-white hover:border-white/15 whitespace-nowrap transition-all shrink-0"
              >
                <span>{icon}</span> {text.slice(0, 30)}…
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-white/5">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Kuch bhi puchho English ke baare mein…"
              className="input flex-1 text-sm"
            />
            <button type="submit" disabled={!input.trim() || loading}
              className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-white disabled:opacity-50 hover:shadow-glow-primary transition-all shrink-0">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: Tools ─────────────────────────────────────── */}
      <div className="w-full lg:w-64 space-y-4 shrink-0">
        <div className="card p-4">
          <p className="font-bold text-white text-sm mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-violet-400" /> AI Tools
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            {AI_FEATURES.map(({ icon: Icon, label, href, color }) => (
              <a key={label} href={href}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 transition-all group">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon size={14} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="card p-4">
          <p className="font-bold text-white text-sm mb-3">💡 Tips</p>
          <div className="space-y-2 text-xs text-slate-500">
            <p>• Hindi mein question puchh sakte hain</p>
            <p>• Grammar mistakes correct karwao</p>
            <p>• Professional emails likhwao</p>
            <p>• Interview answers practice karo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
