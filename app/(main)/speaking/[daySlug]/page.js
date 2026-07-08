'use client';
// Speaking Day Page — Daily speech shadowing room with audio player, mic recorder, and comparison.
// Features: HTML5 Mic Recorder, Text-to-Speech (TTS), Local voice playback, comparison.

import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Volume2, Mic, Play, Square, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import useUserStore from '@/store/userStore';
import { getTopicByDay } from '@/lib/topics';

// Day-specific speaking drills generator
function getSpeakingPromptsForDay(dayNum, topic) {
  const customDrills = {
    1: {
      title: 'Basic Sentence Structure',
      prompts: [
        { eng: 'I am a student.', hin: 'मैं एक छात्र हूँ।', tip: 'Stress the "I am" chunk.' },
        { eng: 'He works hard.', hin: 'वह कठिन परिश्रम करता है।', tip: 'Ensure the third-person singular "s" is clearly pronounced.' },
        { eng: 'She speaks English fluently.', hin: 'वह धाराप्रवाह अंग्रेजी बोलती है।', tip: 'Pronounce "fluently" as /ˈfluːəntli/.' },
        { eng: 'They are learning grammar.', hin: 'वे व्याकरण सीख रहे हैं।', tip: 'Keep "learning grammar" as one smooth phrase.' },
      ]
    },
    2: {
      title: 'Introducing Yourself',
      prompts: [
        { eng: 'Hello, my name is Rahul.', hin: 'नमस्ते, मेरा नाम राहुल है।', tip: 'Start with a confident and warm greeting.' },
        { eng: 'I live in Delhi.', hin: 'मैं दिल्ली में रहता हूँ।', tip: 'Connect "live in" as "live-in".' },
        { eng: 'I am currently working as a software developer.', hin: 'मैं वर्तमान में एक सॉफ्टवेयर डेवलपर के रूप में काम कर रहा हूँ।', tip: 'Slow down on "currently working".' },
        { eng: 'It is a pleasure to meet you.', hin: 'आपसे मिलकर खुशी हुई।', tip: 'Keep the tone friendly and professional.' },
      ]
    },
    3: {
      title: 'Polite Instructions & Commands',
      prompts: [
        { eng: 'Please open the door.', hin: 'कृपया दरवाजा खोलें।', tip: 'Pronounce "please" with a soft "z" sound.' },
        { eng: 'Do not make a noise.', hin: 'शोर मत करो।', tip: 'Stress the word "not".' },
        { eng: 'Kindly submit the files by Monday.', hin: 'कृपया सोमवार तक फाइलें जमा करें।', tip: 'Connect "submit the" smoothly.' },
        { eng: 'Let us start the discussion.', hin: 'आइए चर्चा शुरू करें।', tip: 'Say "let us" or contract to "let\'s".' },
      ]
    },
    4: {
      title: 'Using "Be" Verbs to Describe States',
      prompts: [
        { eng: 'I am extremely excited about the project.', hin: 'मैं इस परियोजना को लेकर बेहद उत्साहित हूँ।', tip: 'Pronounce "extremely" as /ɪkˈstriːmli/.' },
        { eng: 'She is a highly determined professional.', hin: 'वह एक अत्यधिक दृढ़ निश्चयी पेशेवर है।', tip: 'Pronounce "determined" as /dɪˈtɜːmɪnd/.' },
        { eng: 'They were present at the meeting yesterday.', hin: 'वे कल बैठक में उपस्थित थे।', tip: 'Keep "present at the" linked.' },
        { eng: 'We will be ready in ten minutes.', hin: 'हम दस मिनट में तैयार हो जाएंगे।', tip: 'Deliver "will be ready" as a single breath.' },
      ]
    },
    5: {
      title: 'Demonstrative Pronoun Shadowing',
      prompts: [
        { eng: 'This is my project report.', hin: 'यह मेरी प्रोजेक्ट रिपोर्ट है।', tip: 'Place emphasis on the demonstrative "This".' },
        { eng: 'Those files belong to the HR manager.', hin: 'वे फाइलें मानव संसाधन प्रबंधक की हैं।', tip: 'Ensure "belong to" is spoken quickly.' },
        { eng: 'These are the guidelines we must follow.', hin: 'ये वे दिशानिर्देश हैं जिनका हमें पालन करना चाहिए।', tip: 'Pronounce "these" with a voiced "z".' },
        { eng: 'That was an incredible presentation.', hin: 'वह एक अविश्वसनीय प्रस्तुति थी।', tip: 'Emphasize "incredible" on the second syllable.' },
      ]
    }
  };

  if (customDrills[dayNum]) {
    return customDrills[dayNum];
  }

  return {
    title: `${topic?.title || 'Daily'} Speaking Practice`,
    prompts: [
      { eng: `Today we are practicing ${topic?.title || 'English'}.`, hin: `आज हम ${topic?.title || 'अंग्रेजी'} का अभ्यास कर रहे हैं।`, tip: 'Speak clearly and focus on the main noun.' },
      { eng: 'We want to speak English confidently.', hin: 'हम आत्मविश्वास से अंग्रेजी बोलना चाहते हैं।', tip: 'Pronounce "confidently" with clear syllables.' },
      { eng: 'This practice will help me improve my fluency.', hin: 'यह अभ्यास मेरी प्रवाह क्षमता को सुधारने में मदद करेगा।', tip: 'Link "help me" as a single unit.' },
      { eng: 'I am getting better day by day.', hin: 'मैं दिन-ब-दिन बेहतर होता जा रहा हूँ।', tip: 'End with a confident, upward intonation.' }
    ]
  };
}

export default function SpeakingDayPage() {
  const params  = useParams();
  const dayNum  = parseInt(String(params?.daySlug || 'day-1').replace(/^day-/, '') || '1', 10);
  const topic   = getTopicByDay(dayNum);

  const drill = useMemo(() => getSpeakingPromptsForDay(dayNum, topic), [dayNum, topic]);
  const [index, setIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [completed, setCompleted] = useState({});
  const [sessionFinished, setSessionFinished] = useState(false);

  const { addXP } = useUserStore();
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const currentPrompt = drill.prompts[index];
  const totalPrompts = drill.prompts.length;
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalPrompts) * 100);

  // Text-To-Speech Pronunciation Player
  const playNativeSpeaker = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentPrompt.eng);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  // Mic Recording Actions
  const startRecording = async () => {
    if (typeof window === 'undefined' || !navigator.mediaDevices) return;
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Mic access denied:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop all mic tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const playRecordedAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const markCompleted = () => {
    setCompleted((prev) => {
      const next = { ...prev, [index]: true };
      addXP(10);
      return next;
    });

    if (index < totalPrompts - 1) {
      setTimeout(() => {
        setIndex((i) => i + 1);
        setAudioUrl(null);
      }, 500);
    } else {
      setTimeout(() => {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        addXP(40); // Speaking session completion bonus
        setSessionFinished(true);
      }, 500);
    }
  };

  if (!topic) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-3">❓</div>
        <h2 className="text-xl font-bold text-white mb-2">Day not found</h2>
        <Link href="/75-days-challenge" className="btn-primary">← Back to Challenge</Link>
      </div>
    );
  }

  if (sessionFinished) {
    return (
      <div className="max-w-md mx-auto card p-8 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-4xl mx-auto mb-4">
          🎤
        </div>
        <h2 className="text-3xl font-black text-white">Shadowing Complete!</h2>
        <p className="text-slate-400">
          Fantastic! You shadowed and practiced speaking all {totalPrompts} daily sentences. Keep up the rhythm!
        </p>
        <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 font-bold text-sm">
          +40 XP Speaking Reward claimed! ⚡
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => { setIndex(0); setSessionFinished(false); setCompleted({}); setAudioUrl(null); }}
            className="btn-secondary py-3 text-sm font-bold">
            Practice Again
          </button>
          <Link href={`/75-days-challenge/${dayNum}`} className="btn-gradient py-3 text-sm font-bold flex items-center justify-center">
            Continue Lesson
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/75-days-challenge" className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> 75 Days
        </Link>
        <span>/</span>
        <Link href={`/75-days-challenge/${dayNum}`} className="hover:text-white transition-colors">
          Day {dayNum}
        </Link>
        <span>/</span>
        <span className="text-slate-300">Speaking</span>
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="badge-primary bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs">Day {dayNum} Speaking Lab</span>
          <h2 className="text-2xl font-black text-white mt-1">{topic.title}</h2>
        </div>
        <Link href={`/75-days-challenge/${dayNum}`} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      {/* Progress meter */}
      <div className="card p-4 flex items-center justify-between bg-white/3 border-white/6">
        <div className="space-y-1">
          <p className="text-xs text-slate-500">Drill Shadowing Progress</p>
          <p className="text-sm font-bold text-white">{completedCount} of {totalPrompts} sentences practiced</p>
        </div>
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Shadowing Display Card */}
      <div className="card p-6 space-y-6">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span>Drill {index + 1} of {totalPrompts}</span>
          <span className="text-pink-400 font-bold uppercase tracking-wider">{drill.title}</span>
        </div>

        {/* English & Hindi text display */}
        <div className="space-y-4 text-center">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/5 border border-pink-500/20 space-y-2">
            <p className="text-3xl font-black text-white leading-tight tracking-tight select-all">{currentPrompt.eng}</p>
            <p className="text-base text-slate-400 font-medium">{currentPrompt.hin}</p>
          </div>
          
          {currentPrompt.tip && (
            <p className="text-xs text-amber-300 bg-amber-500/5 border border-amber-500/10 py-1.5 px-3 rounded-lg inline-block">
              💡 Tip: {currentPrompt.tip}
            </p>
          )}
        </div>

        {/* Interactive Speech Tools */}
        <div className="flex flex-col items-center gap-4 bg-white/3 border border-white/6 rounded-2xl p-5">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Practice Actions</p>
          
          <div className="flex items-center gap-4">
            {/* Native Speaker Player */}
            <button
              onClick={playNativeSpeaker}
              className="w-12 h-12 rounded-full bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/30 text-primary-400 flex items-center justify-center transition-all group"
              title="Hear Native Pronunciation"
            >
              <Volume2 size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Microphone Recorder */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all shadow-lg ${
                isRecording 
                  ? 'bg-rose-500 border-rose-600 text-white animate-pulse' 
                  : 'bg-pink-500/20 hover:bg-pink-500/30 border-pink-500/30 text-pink-400'
              }`}
              title={isRecording ? 'Stop Recording' : 'Record Your Voice'}
            >
              {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
            </button>

            {/* Play Recording */}
            <button
              onClick={playRecordedAudio}
              disabled={!audioUrl}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                audioUrl 
                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/30 text-emerald-400' 
                  : 'bg-white/5 border-white/10 text-slate-600 cursor-not-allowed'
              }`}
              title="Play Recorded Voice"
            >
              <Play size={20} fill={audioUrl ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="text-[10px] text-slate-500">
            {isRecording 
              ? 'Recording... speak now!' 
              : audioUrl 
                ? 'Compare your recording with the native speaker pronunciation' 
                : 'Click mic to record, and use the speaker to listen'
            }
          </p>
        </div>

        {/* Mastered & Navigation Controls */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => { if (index > 0) { setIndex(i => i - 1); setAudioUrl(null); } }}
            disabled={index === 0}
            className="btn-secondary py-3.5 flex-1 font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <button
            onClick={markCompleted}
            className="btn-gradient py-3.5 flex-1 font-bold text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            {index === totalPrompts - 1 ? 'Finish Drill' : 'Mastered & Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
