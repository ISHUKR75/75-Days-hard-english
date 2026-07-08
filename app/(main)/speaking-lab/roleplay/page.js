'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState, useEffect } from 'react'; // Simple English: Import standard hooks.
import Link from 'next/link'; // Simple English: Import Link.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for animations.
import { ArrowLeft, Mic, Square, Volume2, User, Bot, Award, CheckCircle2, ShieldAlert } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import store to reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: Definition of the simulated roleplay conversations.
const ROLEPLAYS = [
  {
    id: 'airport',
    title: 'Airport Check-In',
    partner: 'Agent (AI)',
    emoji: '✈️',
    lines: [
      { sender: 'ai', text: 'Hello, welcome to Delta Airlines. May I please see your passport?' },
      { sender: 'user', text: 'Yes, here is my passport and ticket.', translation: 'हाँ, यह मेरा पासपोर्ट और टिकट है।' },
      { sender: 'ai', text: 'Thank you. Do you have any bags to check in today?' },
      { sender: 'user', text: 'I only have this one suitcase to check.', translation: 'मुझे केवल यह एक सूटकेस चेक करना है।' },
      { sender: 'ai', text: 'Perfect. Here is your boarding pass. Have a safe flight!' }
    ]
  },
  {
    id: 'hotel',
    title: 'Hotel Front Desk',
    partner: 'Clerk (AI)',
    emoji: '🏨',
    lines: [
      { sender: 'ai', text: 'Good afternoon. How can I help you today?' },
      { sender: 'user', text: 'Hi, I would like to check in. I have a reservation.', translation: 'नमस्ते, मुझे चेक इन करना है। मेरा आरक्षण है।' },
      { sender: 'ai', text: 'Excellent. Under what name was the booking made?' },
      { sender: 'user', text: 'The booking is under the name of John Smith.', translation: 'बुकिंग जॉन स्मिथ के नाम पर है।' },
      { sender: 'ai', text: 'Got it. Here is your room key. Enjoy your stay!' }
    ]
  }
];

export default function RoleplayPage() {
  // Simple English: Track active roleplay index.
  const [activeIdx, setActiveIdx] = useState(0);
  // Simple English: Track active line index.
  const [lineIdx, setLineIdx] = useState(0);
  // Simple English: Track if user is currently recording speech.
  const [isRecording, setIsRecording] = useState(false);
  // Simple English: Store user speech transcription.
  const [transcript, setTranscript] = useState('');
  // Simple English: Track computed similarity percentage.
  const [score, setScore] = useState(null);
  // Simple English: Track browser SpeechRecognition support.
  const [isSupported, setIsSupported] = useState(true);

  const { addXP } = useUserStore(); // Simple English: Reward points hook.
  const activeRoleplay = ROLEPLAYS[activeIdx]; // Simple English: Active roleplay object.
  const currentLine = activeRoleplay.lines[lineIdx]; // Simple English: Current line object.

  useEffect(() => {
    // Simple English: Check if browser supports Web Speech API.
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false); // Simple English: Flag unsupported.
    }
  }, []);

  // Simple English: Auto play AI dialogue lines when they appear.
  useEffect(() => {
    if (currentLine && currentLine.sender === 'ai') {
      speakText(currentLine.text);
    }
  }, [lineIdx, activeIdx]);

  // Simple English: Play text out loud using browser speech synthesis.
  const speakText = (phrase) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Simple English: Turn on microphone recording using Web Speech API.
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    setTranscript('');
    setScore(null);

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
        playSound('click'); // Simple English: Play UI chime.
      };

      recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        setTranscript(spoken);
        evaluateSpeech(spoken);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        playWrong(); // Simple English: Play buzzer.
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start(); // Simple English: Start listening.
    } catch (e) {
      setIsRecording(false);
    }
  };

  // Simple English: Compare transcription against User script line.
  const evaluateSpeech = (spokenText) => {
    const target = currentLine.text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const spoken = spokenText.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    const targetWords = target.split(' ');
    const spokenWords = spoken.split(' ');

    let matches = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) {
        matches += 1;
      }
    });

    const matchPct = Math.round((matches / targetWords.length) * 100);
    setScore(matchPct);

    if (matchPct >= 70) {
      addXP(15); // Simple English: Award 15 XP.
      playCorrect(); // Simple English: Play success chime.
    } else {
      playWrong(); // Simple English: Play error chime.
    }
  };

  // Simple English: Go to next conversation dialogue line.
  const handleNextLine = () => {
    setTranscript('');
    setScore(null);
    if (lineIdx < activeRoleplay.lines.length - 1) {
      setLineIdx(l => l + 1); // Simple English: Go to next line.
    } else {
      setLineIdx(0); // Simple English: Restart dialogue sequence.
    }
  };

  return (
    // Simple English: Main layout wrapper.
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Simple English: Navigation back link */}
      <Link href="/speaking-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Speaking Lab
      </Link>

      {/* Simple English: Bento header card */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-600/10 via-indigo-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>👥</span> Roleplay Conversations
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Step into real world scenarios! Speak dialogue lines, interact with the AI partner, and evaluate your conversational correctness.
        </p>
      </div>

      {/* Simple English: Responsive split arrangement */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left panel - Scenarios listing */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Scenarios</h2>
          {ROLEPLAYS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveIdx(idx);
                setLineIdx(0);
                setTranscript('');
                setScore(null);
              }}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                activeIdx === idx
                  ? 'border-purple-500/40 bg-purple-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.emoji}</span>
                <p className="text-xs">{item.title}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Simple English: Right panel - Interactive dialogue stage */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between min-h-[380px]">
          <div className="space-y-4">
            
            {/* Simple English: Active speaker label details */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Dialogue Line {lineIdx + 1} of {activeRoleplay.lines.length}</span>
              <span className="font-bold text-purple-300">Speaker: {currentLine.sender === 'ai' ? activeRoleplay.partner : 'You'}</span>
            </div>

            {/* Simple English: Main speech prompt box */}
            <div className="p-6 rounded-2xl bg-white/3 border border-white/5 space-y-4 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded font-black uppercase">
                {currentLine.sender === 'ai' ? 'Listen' : 'Read Out Loud'}
              </span>
              
              <div className="flex gap-3 items-start">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 text-xs font-black ${
                  currentLine.sender === 'ai' ? 'bg-slate-700' : 'bg-purple-600'
                }`}>
                  {currentLine.sender === 'ai' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-white leading-relaxed">{currentLine.text}</p>
                  {currentLine.translation && (
                    <p className="text-xs text-slate-400">{currentLine.translation}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Simple English: Speech recognition mic transcript output */}
            {transcript && (
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs">
                <p className="text-slate-500 uppercase tracking-widest font-black text-[9px] mb-1">Your Speech Recording</p>
                <p className="text-white italic">"{transcript}"</p>
              </div>
            )}
          </div>

          {/* Simple English: Action trigger buttons */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            {score !== null && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <Award className="text-purple-400 animate-bounce" size={24} />
                  <div>
                    <p className="text-xs text-slate-400">Match score</p>
                    <p className="text-lg font-black text-white">{score}% Match</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                  score >= 70 ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {score >= 70 ? 'Passed (+15 XP)' : 'Try Again'}
                </span>
              </div>
            )}

            <div className="flex gap-4">
              {currentLine.sender === 'ai' ? (
                // Simple English: AI speak audio trigger button.
                <button
                  onClick={() => speakText(currentLine.text)}
                  className="w-full py-3.5 rounded-xl bg-slate-700 hover:bg-slate-650 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Volume2 size={16} /> Listen AI Character
                </button>
              ) : (
                // Simple English: User record speaking trigger button.
                <button
                  disabled={!isSupported || isRecording}
                  onClick={startRecording}
                  className={`w-full py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isRecording ? 'bg-red-600 hover:bg-red-500' : 'bg-purple-600 hover:bg-purple-500 disabled:opacity-35'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square size={14} className="animate-pulse" /> Recording Speech...
                    </>
                  ) : (
                    <>
                      <Mic size={14} /> Speak Now
                    </>
                  )}
                </button>
              )}

              {/* Simple English: Go to next dialogue line card trigger */}
              {(currentLine.sender === 'ai' || score !== null) && (
                <button
                  onClick={handleNextLine}
                  className="px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Next Line
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
