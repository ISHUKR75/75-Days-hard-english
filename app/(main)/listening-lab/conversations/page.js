'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard hooks.
import Link from 'next/link'; // Simple English: Import Navigation Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for success overlays.
import { ArrowLeft, Volume2, HelpCircle, Play, Check, X, Bot, User, Award } from 'lucide-react'; // Simple English: Import visual icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to track and reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: Definition of the conversations listening practice sets.
const CONVERSATIONS = [
  {
    id: 1,
    title: 'Ordering Breakfast',
    dialogue: [
      { speaker: 'Server', text: 'Good morning! What can I get for you today?' },
      { speaker: 'Customer', text: 'Hi, I would like to order scrambled eggs and coffee, please.' },
      { speaker: 'Server', text: 'Sure! Would you like whole wheat bread or white bread with that?' },
      { speaker: 'Customer', text: 'Whole wheat bread, thank you.' }
    ],
    quiz: {
      question: 'What type of bread did the customer choose?',
      options: ['White bread', 'Whole wheat bread', 'No bread'],
      correctIndex: 1,
      explanation: 'The customer explicitly requests: "Whole wheat bread, thank you." at the end of the conversation.'
    }
  },
  {
    id: 2,
    title: 'Booking a Cab',
    dialogue: [
      { speaker: 'Operator', text: 'Hi, thank you for calling Yellow Cabs. Where do you need a pickup?' },
      { speaker: 'Rider', text: 'I am at the central library and need to go to the national museum.' },
      { speaker: 'Operator', text: 'Alright, a driver will arrive in seven minutes.' }
    ],
    quiz: {
      question: 'Where is the rider currently located?',
      options: ['Central library', 'National museum', 'Train station'],
      correctIndex: 0,
      explanation: 'The rider states: "I am at the central library..." when asked for pickup location.'
    }
  }
];

export default function ConversationsPage() {
  // Simple English: Track index of selected conversation item.
  const [index, setIndex] = useState(0);
  // Simple English: Track if quiz has been answered.
  const [quizAnswered, setQuizAnswered] = useState(false);
  // Simple English: Track user selected option.
  const [selectedOptIdx, setSelectedOptIdx] = useState(null);
  // Simple English: Track if answer is correct.
  const [isCorrect, setIsCorrect] = useState(false);
  // Simple English: Store cumulative correct scores.
  const [score, setScore] = useState(0);

  const { addXP } = useUserStore(); // Simple English: Reward points hook.
  const activeConv = CONVERSATIONS[index]; // Simple English: Active conversation object.

  // Simple English: Speak the entire dialogue turns sequentially.
  const playDialogueAudio = async () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Simple English: Cancel existing vocal tasks.
      
      // Simple English: Loop through each turn and speak it with brief pause.
      for (let turn of activeConv.dialogue) {
        const utterance = new SpeechSynthesisUtterance(`${turn.speaker} says: ${turn.text}`);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
        
        // Simple English: Pause briefly before playing next turn.
        await new Promise((r) => setTimeout(r, 2200));
      }
    }
  };

  // Simple English: Validate selected option index.
  const handleQuizAnswer = (optIdx) => {
    if (quizAnswered) return; // Simple English: Skip if checked.
    setSelectedOptIdx(optIdx);
    const correct = optIdx === activeConv.quiz.correctIndex;
    setIsCorrect(correct);
    setQuizAnswered(true);

    if (correct) {
      setScore(s => s + 1);
      addXP(15); // Simple English: Give 15 XP points.
      playCorrect(); // Simple English: Play correct sound.
    } else {
      playWrong(); // Simple English: Play wrong sound.
    }
  };

  // Simple English: Switch conversation index resets.
  const handleConvSelect = (idx) => {
    setIndex(idx);
    setQuizAnswered(false);
    setSelectedOptIdx(null);
    playSound('click');
  };

  return (
    // Simple English: Main layout page.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Navigation back link */}
      <Link href="/listening-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Listening Lab
      </Link>

      {/* Simple English: Bento page header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-blue-600/10 via-cyan-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>💬🎧</span> Listening Conversations
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Listen to natural everyday dialogues between native speakers and answer contextual multiple choice questions.
        </p>
      </div>

      {/* Simple English: Responsive grid split columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - Conversation list */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Dialogues</h2>
          {CONVERSATIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleConvSelect(idx)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                index === idx
                  ? 'border-blue-500/40 bg-blue-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500 hover:bg-white/5'
              }`}
            >
              <p className="text-xs">{item.title}</p>
            </button>
          ))}
        </div>

        {/* Simple English: Right Panel - Conversation dialogue and questions board */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Simple English: Play dialogue button header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-lg font-black text-white">{activeConv.title}</h2>
              <button
                onClick={playDialogueAudio}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Play size={14} /> Play Dialogue
              </button>
            </div>

            {/* Simple English: Display dialogue turns layout */}
            <div className="space-y-3">
              {activeConv.dialogue.map((turn, tIdx) => (
                <div key={tIdx} className={`flex gap-3 max-w-[85%] ${turn.speaker === 'Customer' || turn.speaker === 'Rider' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold ${
                    turn.speaker === 'Customer' || turn.speaker === 'Rider' ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}>
                    {turn.speaker === 'Customer' || turn.speaker === 'Rider' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    turn.speaker === 'Customer' || turn.speaker === 'Rider'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                  }`}>
                    <span className="font-bold text-[10px] text-white/60 block mb-0.5">{turn.speaker}</span>
                    {turn.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Simple English: Quiz question */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle size={14} className="text-blue-400" /> Context Question
              </h3>
              <p className="text-sm font-bold text-white">{activeConv.quiz.question}</p>

              <div className="space-y-2">
                {activeConv.quiz.options.map((opt, oIdx) => {
                  let optStyle = 'border-white/5 bg-white/2 hover:bg-white/5 text-slate-300';
                  if (quizAnswered) {
                    if (oIdx === activeConv.quiz.correctIndex) {
                      optStyle = 'border-green-500/40 bg-green-500/10 text-green-400';
                    } else if (oIdx === selectedOptIdx) {
                      optStyle = 'border-red-500/40 bg-red-500/10 text-red-400';
                    } else {
                      optStyle = 'border-white/5 bg-white/2 opacity-30';
                    }
                  }
                  return (
                    <button
                      key={opt}
                      disabled={quizAnswered}
                      onClick={() => handleQuizAnswer(oIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {quizAnswered && oIdx === activeConv.quiz.correctIndex && <Check size={14} />}
                      {quizAnswered && oIdx === selectedOptIdx && oIdx !== activeConv.quiz.correctIndex && <X size={14} />}
                    </button>
                  );
                })}
              </div>

              {quizAnswered && (
                <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white block mb-1">Explanation:</span>
                  {activeConv.quiz.explanation}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
