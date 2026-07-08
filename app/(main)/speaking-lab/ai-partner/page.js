'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState, useRef, useEffect } from 'react'; // Simple English: Import standard hooks.
import Link from 'next/link'; // Simple English: Import link navigation.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for message animations.
import { ArrowLeft, Send, Mic, Volume2, Bot, User, HelpCircle, Sparkles, Star } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound effects.

// Simple English: Definition of the simulated interactive scenarios.
const SCENARIOS = [
  {
    id: 'interview',
    title: 'Job Interview',
    emoji: '💼',
    desc: 'Practice an English interview at a top software company.',
    partner: 'Sarah (HR Manager)',
    intro: 'Hello, welcome to our company! Thank you for coming in today. Let us start by having you introduce yourself. Tell me about your background.',
    conversations: {
      intro: {
        ai: 'Great. Why do you want to join our company specifically?',
        suggestions: [
          'I want to join because I admire your innovative projects and work culture.',
          'Your team is building great tools, and I want to contribute my skills.',
          'I am looking for a challenging role where I can grow my career.'
        ]
      },
      skills: {
        ai: 'Excellent response. What is your greatest strength in a professional setting?',
        suggestions: [
          'My greatest strength is my ability to learn new technologies quickly.',
          'I am highly organized and communicate well with cross-functional teams.',
          'I excel at problem-solving and staying calm under tight deadlines.'
        ]
      },
      close: {
        ai: 'Thank you! That was a wonderful interview. We will get back to you soon. Have a great day!',
        suggestions: [
          'Thank you so much for your time. Have a great day!',
          'I look forward to hearing from you. Thank you!',
          'Appreciate the opportunity. Have a good one!'
        ]
      }
    }
  },
  {
    id: 'cafe',
    title: 'Ordering Coffee',
    emoji: '☕',
    desc: 'Order food and drinks at a local American café.',
    partner: 'David (Barista)',
    intro: 'Hi there! Welcome to StarCafé. What can I get started for you today?',
    conversations: {
      intro: {
        ai: 'Sure thing! What size would you like for that drink? We have small, medium, and large.',
        suggestions: [
          'I would like a medium cup, please.',
          'Make it a large, thank you.',
          'A small size is fine, thanks.'
        ]
      },
      skills: {
        ai: 'Got it. Would you like any pastries or snacks to go with that?',
        suggestions: [
          'Yes, I will have a chocolate muffin, please.',
          'No thank you, just the drink is fine.',
          'Do you have any fresh cookies today?'
        ]
      },
      close: {
        ai: 'Perfect! That will be five dollars. You can pay here. Your order will be ready in a minute.',
        suggestions: [
          'Here is the money. Thank you!',
          'Can I pay with credit card?',
          'Great, thanks a lot!'
        ]
      }
    }
  }
];

export default function AIPartnerPage() {
  // Simple English: Track selected scenario option.
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  // Simple English: Active conversation stage tracker.
  const [stage, setStage] = useState('intro'); // Simple English: Options are intro -> skills -> close -> end.
  // Simple English: Messages thread array.
  const [messages, setMessages] = useState([]);
  // Simple English: User raw text input state.
  const [inputText, setInputText] = useState('');
  // Simple English: Loading state animation.
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef(null); // Simple English: Reference to auto scroll chat down.
  const activeScenario = SCENARIOS[selectedScenarioIdx]; // Simple English: Active scenario object.
  const { addXP, addCoins } = useUserStore(); // Simple English: User store statistics functions.

  // Simple English: Initialize message thread when scenario changes.
  useEffect(() => {
    setMessages([
      { sender: 'ai', text: activeScenario.intro, time: new Date() }
    ]);
    setStage('intro');
  }, [selectedScenarioIdx]);

  // Simple English: Auto scroll message container down on new messages.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Simple English: Trigger Web Speech voice to speak message text.
  const speakMessage = (textToSpeak) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple English: Handle when user sends message (via suggestion click or typing).
  const handleSendMessage = async (textToSend) => {
    const userText = textToSend || inputText.trim();
    if (!userText) return;

    setInputText(''); // Simple English: Reset input field.
    playSound('click'); // Simple English: Play click sound.

    // Simple English: Append user message to thread.
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: new Date() }
    ]);

    setIsTyping(true); // Simple English: Show typing loader animation.

    // Simple English: Simulate delay for AI response.
    await new Promise((r) => setTimeout(r, 1200));

    setIsTyping(false); // Simple English: Stop typing loader.

    let nextResponseText = '';
    let nextStage = 'intro';

    // Simple English: State machine to progress conversation stages.
    if (stage === 'intro') {
      nextResponseText = activeScenario.conversations.intro.ai;
      nextStage = 'skills';
      addXP(10); // Simple English: Reward 10 XP for first reply.
    } else if (stage === 'skills') {
      nextResponseText = activeScenario.conversations.skills.ai;
      nextStage = 'close';
      addXP(10); // Simple English: Reward 10 XP.
    } else if (stage === 'close') {
      nextResponseText = activeScenario.conversations.close.ai;
      nextStage = 'end';
      addXP(20); // Simple English: Completion reward.
      addCoins(5); // Simple English: Earn coins.
      playCorrect(); // Simple English: Play completion fanfare.
    } else {
      nextResponseText = "The conversation has ended. You can restart or select another scenario!";
      nextStage = 'end';
    }

    setStage(nextStage); // Simple English: Save next stage.
    
    // Simple English: Append AI reply to thread.
    setMessages((prev) => [
      ...prev,
      { sender: 'ai', text: nextResponseText, time: new Date() }
    ]);

    // Simple English: Speak response.
    speakMessage(nextResponseText);
  };

  // Simple English: Reset conversation thread back to start.
  const handleReset = () => {
    setMessages([
      { sender: 'ai', text: activeScenario.intro, time: new Date() }
    ]);
    setStage('intro');
    playSound('click');
  };

  return (
    // Simple English: Main layout wrapper.
    <div className="space-y-6 max-w-6xl mx-auto p-4 flex flex-col h-[calc(100vh-100px)]">
      {/* Simple English: Navigation back link */}
      <Link href="/speaking-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit shrink-0">
        <ArrowLeft size={14} /> Back to Speaking Lab
      </Link>

      {/* Simple English: Responsive column arrangement */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Simple English: Left Panel - Scenario Selector list */}
        <div className="lg:col-span-1 card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-4 shrink-0">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Select Scenario</h2>
          <div className="space-y-2">
            {SCENARIOS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedScenarioIdx(idx);
                  playSound('click');
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  selectedScenarioIdx === idx
                    ? 'border-indigo-500/40 bg-indigo-500/10'
                    : 'border-white/5 bg-white/2 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="font-bold text-xs text-white">{item.title}</span>
                </div>
                <p className="text-[10px] text-slate-500">{item.desc}</p>
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Restart Chat
          </button>
        </div>

        {/* Simple English: Right Panel - Interactive Chat box */}
        <div className="lg:col-span-3 card border border-white/10 bg-white/2 rounded-2xl flex flex-col h-full overflow-hidden">
          {/* Simple English: Chat box partner details header */}
          <div className="p-4 border-b border-white/5 bg-white/1 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                <Bot size={16} />
              </div>
              <div>
                <p className="font-bold text-xs text-white">{activeScenario.partner}</p>
                <p className="text-[10px] text-slate-500">Speaking Partner</p>
              </div>
            </div>
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded">
              {activeScenario.title}
            </span>
          </div>

          {/* Simple English: Scrollable Messages list container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {/* Simple English: Message avatar indicator */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                    msg.sender === 'user' ? 'bg-purple-600' : 'bg-slate-700'
                  }`}>
                    {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>

                  {/* Simple English: Message bubble bubble style */}
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed relative group ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>
                    {/* Simple English: Speak audio click button for AI messages */}
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => speakMessage(msg.text)}
                        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 w-5 h-5 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                      >
                        <Volume2 size={10} />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Simple English: Typing dot animation */}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                    <Bot size={12} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Simple English: Bottom controls (Suggestions and input text box) */}
          <div className="p-4 border-t border-white/5 bg-white/1 space-y-3 shrink-0">
            {/* Simple English: Display quick suggestions clickable options */}
            {stage !== 'end' && activeScenario.conversations[stage] && (
              <div className="space-y-1.5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black flex items-center gap-1">
                  <Star size={10} className="text-yellow-400" /> Response Options
                </p>
                <div className="flex flex-col gap-1.5">
                  {activeScenario.conversations[stage].suggestions.map((sugText) => (
                    <button
                      key={sugText}
                      onClick={() => handleSendMessage(sugText)}
                      className="w-full text-left p-2.5 rounded-xl border border-white/5 bg-white/3 hover:bg-white/8 hover:border-white/10 text-xs text-indigo-300 font-medium transition-all"
                    >
                      {sugText}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Simple English: Input text form row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your own response..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
