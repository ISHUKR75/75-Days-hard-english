'use client'; // Simple English: Tell Next.js that this component runs on the client side.

import { useState } from 'react'; // Simple English: Import standard state hook for page operations.
import Link from 'next/link'; // Simple English: Import navigation links.
import { motion, AnimatePresence } from 'framer-motion'; // Simple English: Import Framer Motion for text overlays.
import { ArrowLeft, BookOpen, Volume2, HelpCircle, Check, X, Award } from 'lucide-react'; // Simple English: Import icons.
import useUserStore from '@/store/userStore'; // Simple English: Import user profile store to record points.
import { playCorrect, playWrong, playSound } from '@/lib/sounds'; // Simple English: Import sound indicators.

// Simple English: Definition of the practice story paragraphs, translations, and vocabulary tooltip database.
const STORIES = [
  {
    id: 1,
    title: 'The Honest Woodcutter',
    difficulty: 'Beginner',
    paragraphs: [
      'Once upon a time, an honest woodcutter was cutting a tree near a deep river.',
      'Suddenly, his iron axe slipped from his hands and fell into the cold water.',
      'He started crying because he had no money to buy a new axe for his work.'
    ],
    vocabulary: {
      once: 'एक बार (Ek baar)',
      honest: 'ईमानदार (Imaandar)',
      woodcutter: 'लकड़हारा (Lakadhara)',
      cutting: 'काट रहा (Kaat raha)',
      river: 'नदी (Nadi)',
      suddenly: 'अचानक (Achanak)',
      axe: 'कुल्हाड़ी (Kulhaadi)',
      slipped: 'फिसल गया (Fisal gaya)',
      fell: 'गिर गया (Gir gaya)',
      crying: 'रो रहा (Ro raha)',
      money: 'पैसे (Paise)',
      buy: 'खरीदना (Khareedna)'
    },
    quiz: {
      question: 'Why was the woodcutter crying?',
      options: [
        'He was afraid of the forest.',
        'His iron axe fell into the river.',
        'He was feeling very hungry.'
      ],
      correctIndex: 1,
      explanation: 'He was crying because his axe slipped and fell into the deep river, and he could not afford a new one.'
    }
  },
  {
    id: 2,
    title: 'The Golden Egg',
    difficulty: 'Intermediate',
    paragraphs: [
      'A farmer had a special goose that laid a golden egg every single day.',
      'He became greedy and wanted to get all the golden eggs at once.',
      'So, he killed the goose, but found absolutely nothing inside her body.'
    ],
    vocabulary: {
      farmer: 'किसान (Kisaan)',
      special: 'विशेष (Vishesh)',
      goose: 'हंस (Hans)',
      laid: 'दिया (Diya)',
      golden: 'सोने का (Sone ka)',
      greedy: 'लालची (Laalchi)',
      killed: 'मार दिया (Maar diya)',
      found: 'पाया (Paaya)',
      nothing: 'कुछ नहीं (Kuch nahi)',
      inside: 'के अंदर (Ke andar)'
    },
    quiz: {
      question: 'What is the moral of the story?',
      options: [
        'Hard work is key to success.',
        'Greed brings down happiness and ruins everything.',
        'We should save animals.'
      ],
      correctIndex: 1,
      explanation: 'The farmer lost his goose because he was greedy, showing that greed ruins wealth.'
    }
  }
];

export default function StoriesPage() {
  // Simple English: Track active story index.
  const [storyIdx, setStoryIdx] = useState(0);
  // Simple English: Track currently selected word to show in tooltip details.
  const [selectedWord, setSelectedWord] = useState('');
  // Simple English: Track if quiz has been answered.
  const [quizAnswered, setQuizAnswered] = useState(false);
  // Simple English: Track index of user selected answer.
  const [selectedOptIdx, setSelectedOptIdx] = useState(null);
  // Simple English: Track if answer selection is correct.
  const [isAnsCorrect, setIsAnsCorrect] = useState(false);
  // Simple English: Store cumulative correct scores.
  const [score, setScore] = useState(0);

  const { addXP } = useUserStore(); // Simple English: Reward points hook.
  const activeStory = STORIES[storyIdx]; // Simple English: Reference active story.

  // Simple English: Speak story text out loud.
  const speakText = (textPhrase) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Simple English: Stop current speech.
      const utterance = new SpeechSynthesisUtterance(textPhrase); // Simple English: Create utterance.
      utterance.lang = 'en-US'; // Simple English: Use US English voice accent.
      utterance.rate = 0.85; // Simple English: Play slightly slower.
      window.speechSynthesis.speak(utterance); // Simple English: Speak.
    }
  };

  // Simple English: Check if a word exists in the story vocabulary list.
  const cleanWord = (w) => w.toLowerCase().replace(/[^a-z]/g, '');

  // Simple English: Handle quiz submission.
  const handleQuizAnswer = (optIndex) => {
    if (quizAnswered) return; // Simple English: Skip if checked.
    setSelectedOptIdx(optIndex);
    const correct = optIndex === activeStory.quiz.correctIndex;
    setIsAnsCorrect(correct);
    setQuizAnswered(true);

    if (correct) {
      setScore(s => s + 1);
      addXP(15); // Simple English: Give 15 XP.
      playCorrect(); // Simple English: Play correct sound.
    } else {
      playWrong(); // Simple English: Play wrong sound.
    }
  };

  // Simple English: Reset quiz state when switching stories.
  const handleStorySelect = (idx) => {
    setStoryIdx(idx);
    setQuizAnswered(false);
    setSelectedOptIdx(null);
    setSelectedWord('');
    playSound('click');
  };

  return (
    // Simple English: Main layout page.
    <div className="space-y-6 max-w-5xl mx-auto p-4">
      {/* Simple English: Back link to reading lab */}
      <Link href="/reading-lab" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Reading Lab
      </Link>

      {/* Simple English: Bento header card */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-red-600/10 via-orange-600/5 to-transparent border border-white/10 relative overflow-hidden">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <span>📚</span> Story Reading Lab
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Tap on highlighted words to see Hindi meanings. Read along and play paragraph audio readouts to train comprehension.
        </p>
      </div>

      {/* Simple English: Responsive grid columns layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simple English: Left Panel - Stories listing */}
        <div className="card p-4 border border-white/10 bg-white/2 rounded-2xl space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Available Stories</h2>
          {STORIES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleStorySelect(idx)}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                storyIdx === idx
                  ? 'border-red-500/40 bg-red-500/10 text-white font-bold'
                  : 'border-white/5 bg-white/2 text-slate-500 hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] mb-1">
                <span className="text-red-400 font-bold uppercase">{item.difficulty}</span>
              </div>
              <p className="text-xs">{item.title}</p>
            </button>
          ))}
        </div>

        {/* Simple English: Right Panel - Story text reader & Quiz */}
        <div className="card p-6 border border-white/10 bg-white/2 rounded-2xl space-y-6 md:col-span-2 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Simple English: Story title and general voice triggers */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-xl font-bold text-white">{activeStory.title}</h2>
              <button
                onClick={() => speakText(activeStory.paragraphs.join(' '))}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-all"
              >
                <Volume2 size={14} /> Listen Full Story
              </button>
            </div>

            {/* Simple English: Story text paragraphs with interactive word tags */}
            <div className="space-y-4 leading-relaxed text-sm text-slate-300">
              {activeStory.paragraphs.map((paraText, pIdx) => (
                <div key={pIdx} className="p-3 rounded-xl bg-white/1 border border-white/2 flex flex-col gap-2 relative group hover:bg-white/3 transition-all">
                  <p>
                    {paraText.split(' ').map((word, wIdx) => {
                      const cleaned = cleanWord(word);
                      const hasDef = activeStory.vocabulary[cleaned];
                      return (
                        <span key={wIdx} className="inline-block mr-1">
                          {hasDef ? (
                            <button
                              onClick={() => {
                                setSelectedWord(cleaned);
                                playSound('click');
                              }}
                              className={`underline decoration-red-400/40 hover:text-red-300 font-medium ${
                                selectedWord === cleaned ? 'text-red-400 underline decoration-red-400' : ''
                              }`}
                            >
                              {word}
                            </button>
                          ) : (
                            <span>{word}</span>
                          )}
                        </span>
                      );
                    })}
                  </p>
                  
                  {/* Simple English: Paragraph audio trigger button */}
                  <button
                    onClick={() => speakText(paraText)}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                  >
                    <Volume2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Simple English: Dictionary lookup box overlay */}
            <AnimatePresence>
              {selectedWord && activeStory.vocabulary[selectedWord] && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-slate-300 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white capitalize mr-2">{selectedWord}:</span>
                    <span>{activeStory.vocabulary[selectedWord]}</span>
                  </div>
                  <button onClick={() => setSelectedWord('')} className="text-slate-500 hover:text-white">✕</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simple English: Quiz block */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle size={14} className="text-red-400" /> Story Comprehension
              </h3>
              <p className="text-sm font-bold text-white">{activeStory.quiz.question}</p>

              <div className="space-y-2">
                {activeStory.quiz.options.map((optText, oIdx) => {
                  let optStyle = 'border-white/5 bg-white/2 hover:bg-white/5 text-slate-300';
                  if (quizAnswered) {
                    if (oIdx === activeStory.quiz.correctIndex) {
                      optStyle = 'border-green-500/40 bg-green-500/10 text-green-400';
                    } else if (oIdx === selectedOptIdx) {
                      optStyle = 'border-red-500/40 bg-red-500/10 text-red-400';
                    } else {
                      optStyle = 'border-white/5 bg-white/2 opacity-30';
                    }
                  }
                  return (
                    <button
                      key={optText}
                      disabled={quizAnswered}
                      onClick={() => handleQuizAnswer(oIdx)}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{optText}</span>
                      {quizAnswered && oIdx === activeStory.quiz.correctIndex && <Check size={14} />}
                      {quizAnswered && oIdx === selectedOptIdx && oIdx !== activeStory.quiz.correctIndex && <X size={14} />}
                    </button>
                  );
                })}
              </div>

              {quizAnswered && (
                <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white block mb-1">Moral / Explanation:</span>
                  {activeStory.quiz.explanation}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
