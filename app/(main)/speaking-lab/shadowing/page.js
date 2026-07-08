'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState, useEffect } from 'react'; // Simple English: Import hooks for component state and life cycle.
import Link from 'next/link'; // Simple English: Import Link for back button.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for responsive animations.
import { ArrowLeft, Play, Mic, Square, CheckCircle, Volume2, Award, Info, RefreshCw } from 'lucide-react'; // Simple English: Import UI icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user store to reward XP.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound system chimes.

// Simple English: List of model sentences to practice shadowing with transcription and difficulty classification.
const MODEL_SENTENCES = [
  { id: 1, text: 'Hello, it is nice to meet you today.', translation: 'नमस्ते, आज आपसे मिलकर अच्छा लगा।', type: 'Greeting', difficulty: 'Beginner' },
  { id: 2, text: 'Could you please help me find the conference room?', translation: 'क्या आप मुझे सम्मेलन कक्ष खोजने में मदद कर सकते हैं?', type: 'Office', difficulty: 'Intermediate' },
  { id: 3, text: 'I am looking forward to our collaboration on this project.', translation: 'मैं इस परियोजना पर हमारे सहयोग की आशा कर रहा हूँ।', type: 'Business', difficulty: 'Advanced' },
  { id: 4, text: 'I totally agree with your point, but let us think about the budget.', translation: 'मैं आपकी बात से पूरी तरह सहमत हूँ, लेकिन चलिए बजट के बारे में सोचते हैं।', type: 'Meeting', difficulty: 'Advanced' }
];

export default function ShadowingPage() {
  // Simple English: Track selected model sentence.
  const [activeIdx, setActiveIdx] = useState(0);
  // Simple English: Track if browser SpeechRecognition is active.
  const [isRecording, setIsRecording] = useState(false);
  // Simple English: Store speech transcription from mic.
  const [spokenText, setSpokenText] = useState('');
  // Simple English: Track computed similarity percentage.
  const [matchScore, setMatchScore] = useState(null);
  // Simple English: Track voice recognition support.
  const [isSupported, setIsSupported] = useState(true);
  // Simple English: Track error state messages.
  const [errorMsg, setErrorMsg] = useState('');

  // Zustand XP hook
  const { addXP } = useUserStore(); // Simple English: Pull addXP function to reward users.

  const activeSentence = MODEL_SENTENCES[activeIdx]; // Simple English: Current selected sentence object.

  useEffect(() => {
    // Simple English: Check if browser supports speech recognition APIs.
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false); // Simple English: Mark false if not supported.
    }
  }, []);

  // Simple English: Speak the model sentence using SpeechSynthesis.
  const playModelAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Simple English: Stop current speech.
      const utterance = new SpeechSynthesisUtterance(activeSentence.text); // Simple English: Create utterance object.
      utterance.lang = 'en-US'; // Simple English: Set native English accent.
      utterance.rate = 0.85; // Simple English: Play slightly slower so users can hear phonemes clearly.
      window.speechSynthesis.speak(utterance); // Simple English: Start speaking.
    }
  };

  // Simple English: Start listening to user voice via Web Speech API.
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return; // Simple English: Cancel if not supported.

    setErrorMsg(''); // Simple English: Clear past errors.
    setSpokenText(''); // Simple English: Clear past transcripts.
    setMatchScore(null); // Simple English: Clear past match results.

    try {
      const recognition = new SpeechRecognition(); // Simple English: Instantiate recognition engine.
      recognition.lang = 'en-US'; // Simple English: Set language to English.
      recognition.interimResults = false; // Simple English: Only trigger when user stops talking.
      recognition.maxAlternatives = 1; // Simple English: Use highest confidence transcript.

      // Simple English: Set active recording status.
      recognition.onstart = () => {
        setIsRecording(true);
        playSound('click'); // Simple English: Play UI click chime.
      };

      // Simple English: Process transcription results.
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Simple English: Extract spoken text.
        setSpokenText(transcript); // Simple English: Save transcript.
        calculateScore(transcript); // Simple English: Compare with target sentence.
      };

      // Simple English: Handle errors (like no mic permission).
      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setErrorMsg(`Error: ${event.error === 'not-allowed' ? 'Mic permission denied' : event.error}`);
        setIsRecording(false);
        playWrong(); // Simple English: Play error chime.
      };

      // Simple English: Stop recording status.
      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start(); // Simple English: Turn mic on.
    } catch (e) {
      setErrorMsg("Failed to start speech recognition.");
      setIsRecording(false);
    }
  };

  // Simple English: Compare transcript against target sentence.
  const calculateScore = (transcript) => {
    const target = activeSentence.text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim(); // Simple English: Clean target text.
    const spoken = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim(); // Simple English: Clean mic text.

    const targetWords = target.split(' '); // Simple English: Split target into words.
    const spokenWords = spoken.split(' '); // Simple English: Split spoken into words.

    let matched = 0; // Simple English: Track matching words.
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) {
        matched += 1; // Simple English: Increment if word exists in transcript.
      }
    });

    // Simple English: Compute similarity score percentage.
    const scorePct = Math.round((matched / targetWords.length) * 100);
    setMatchScore(scorePct); // Simple English: Save score.

    if (scorePct >= 70) {
      addXP(15); // Simple English: Give 15 XP to user store.
      playCorrect(); // Simple English: Play success chime.
    } else {
      playWrong(); // Simple English: Play wrong chime.
    }
  };

  return (
    // Simple English: Main layout page.
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* Simple English: Navigation back to main speaking lab */}
      <Link href="/speaking-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Speaking Lab
      </Link>

      {/* Simple English: Bento-style header */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-600/10 via-purple-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>🎤</span> Shadowing Practice
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Listen to the native voice, repeat immediately, and let the smart voice analyzer score your fluency!
        </p>
      </div>

      {/* Simple English: Responsive Columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left list section */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3 md:col-span-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Practice List</h2>
          {MODEL_SENTENCES.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveIdx(index);
                setSpokenText('');
                setMatchScore(null);
                setErrorMsg('');
              }}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                activeIdx === index
                  ? 'border-indigo-500/40 bg-indigo-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-400 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-indigo-400 font-bold uppercase">{item.type}</span>
                <span className="text-slate-500">{item.difficulty}</span>
              </div>
              <p className="text-xs truncate">{item.text}</p>
            </button>
          ))}
        </div>

        {/* Simple English: Middle and Right trainer section */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Simple English: Displays active English target sentence */}
            <div className="p-6 rounded-xl bg-white/3 border border-white/5 space-y-3 relative overflow-hidden">
              <span className="absolute top-3 right-3 text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-black uppercase">
                Model
              </span>
              <p className="text-xl font-bold text-white leading-relaxed pr-8">{activeSentence.text}</p>
              <p className="text-sm text-slate-400">{activeSentence.translation}</p>
            </div>

            {/* Simple English: Error banners */}
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/20 text-xs text-red-400">
                {errorMsg}
              </div>
            )}

            {/* Simple English: Speech recognition unsupported banner */}
            {!isSupported && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 flex items-center gap-1.5">
                <Info size={14} /> Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.
              </div>
            )}

            {/* Simple English: Spoken feedback box */}
            {spokenText && (
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 space-y-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Your Speech Transcript</p>
                <p className="text-sm text-white italic">"{spokenText}"</p>
              </div>
            )}
          </div>

          {/* Simple English: Action triggers and scoring display */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            {matchScore !== null && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-3">
                  <Award className="text-indigo-400 animate-bounce" size={24} />
                  <div>
                    <p className="text-xs text-slate-400">Fluency Score</p>
                    <p className="text-lg font-black text-white">{matchScore}% Match</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded ${
                  matchScore >= 70 ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {matchScore >= 70 ? 'Passed (+15 XP!)' : 'Try Again'}
                </span>
              </div>
            )}

            <div className="flex gap-4">
              {/* Simple English: Trigger play model button */}
              <button
                onClick={playModelAudio}
                className="flex-1 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Volume2 size={16} /> Listen Model
              </button>

              {/* Simple English: Trigger record microphone button */}
              <button
                disabled={!isSupported || isRecording}
                onClick={startRecording}
                className={`flex-1 py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30'
                }`}
              >
                {isRecording ? (
                  <>
                    <Square size={14} className="animate-pulse" /> Recording...
                  </>
                ) : (
                  <>
                    <Mic size={14} /> Speak Now
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
