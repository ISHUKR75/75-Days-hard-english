'use client';
// ============================================================
// Day 2 — Stories Page
// 8 complete stories with comprehension questions, vocabulary,
// and writing practice tasks.
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, ArrowLeft, ChevronRight, ChevronLeft, Volume2,
  CheckCircle2, XCircle, Star, Eye, EyeOff, Sparkles,
  FileText, MessageSquare, Pencil, Target, Trophy, RotateCcw
} from 'lucide-react';

// ── Story reader component ──────────────────────────────────────────────────────
function StoryReader({ story, onBack }) {
  const [showHindi, setShowHindi]     = useState(false);
  const [activeTab, setActiveTab]     = useState('story'); // story | vocab | questions | practice
  const [answers, setAnswers]         = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isSpeaking, setIsSpeaking]   = useState(false);

  const handleSpeak = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      const u = new SpeechSynthesisUtterance(story.story);
      u.lang = 'en-US'; u.rate = 0.9;
      u.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(u);
    }
  }, [story.story]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleAnswer = (qId, option) => {
    if (answers[qId] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qId]: option }));
    const ev = new Event(option === story.comprehensionQuestions?.find(q => q.id === qId)?.correct ? 'play-success-sound' : 'play-error-sound');
    document.dispatchEvent(ev);
  };

  const score = story.comprehensionQuestions?.filter(q => answers[q.id] === q.correct).length || 0;
  const total = story.comprehensionQuestions?.length || 0;

  const TABS = [
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'vocab', label: 'Vocabulary', icon: Star },
    { id: 'questions', label: 'Questions', icon: Target },
    { id: 'practice', label: 'Practice', icon: Pencil },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Story header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6"
      >
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
          <button onClick={onBack} className="flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
            <ArrowLeft className="w-4 h-4" /> All Stories
          </button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{story.level}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{story.cefr}</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{story.wordCount} words</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{story.theme}</span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{story.title}</h2>
              <p className="text-white/70 text-sm">{story.hindiTitle}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={isSpeaking ? stopSpeaking : handleSpeak}
                className={`p-3 rounded-xl transition-colors ${isSpeaking ? 'bg-red-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                title={isSpeaking ? 'Stop' : 'Listen to story'}
              >
                <Volume2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowHindi(v => !v)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-white"
                title="Toggle Hindi translation"
              >
                {showHindi ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-100">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'story' && (
          <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
              {/* Story text */}
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line mb-6">
                {story.story}
              </div>

              {/* Hindi translation toggle */}
              <AnimatePresence>
                {showHindi && story.hindiTranslation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                      <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Hindi Translation (Summary)
                      </h4>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                        {story.hindiTranslation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Grammar points */}
              {story.grammarPoints?.length > 0 && (
                <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-100">
                  <h4 className="font-semibold text-blue-700 mb-3">Grammar Patterns Used</h4>
                  <ul className="space-y-1.5">
                    {story.grammarPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'vocab' && (
          <motion.div key="vocab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-3">
              {story.vocabulary?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-bold text-lg text-blue-700">{item.word}</span>
                      <span className="text-gray-500 text-sm ml-2">— {item.meaning}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 italic">"{item.usage}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'questions' && (
          <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Score bar */}
            {Object.keys(answers).length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Your Score</span>
                  <span className="font-bold text-blue-600">{score}/{total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-2">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(score/total)*100}%` }} />
                </div>
              </div>
            )}

            <div className="space-y-4">
              {story.comprehensionQuestions?.map((q, i) => {
                const userAns = answers[q.id];
                const answered = userAns !== undefined;
                const correct  = userAns === q.correct;
                return (
                  <div key={q.id} className={`bg-white rounded-xl border shadow-sm p-5 ${answered ? (correct ? 'border-green-200' : 'border-red-200') : 'border-gray-100'}`}>
                    <p className="font-semibold text-gray-800 mb-1">{i + 1}. {q.question}</p>
                    <p className="text-sm text-gray-500 mb-4 italic">{q.hindi}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options?.map(opt => {
                        let cls = 'border border-gray-200 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:border-blue-300';
                        if (answered) {
                          cls = opt === q.correct ? 'border-green-400 bg-green-50 text-green-800 font-semibold' :
                                opt === userAns ? 'border-red-400 bg-red-50 text-red-700' :
                                'border-gray-100 bg-gray-50 text-gray-400 opacity-60';
                        }
                        return (
                          <button key={opt} onClick={() => handleAnswer(q.id, opt)} disabled={answered}
                            className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all ${cls}`}>
                            {answered && opt === q.correct && '✓ '}{opt}
                          </button>
                        );
                      })}
                    </div>
                    {answered && (
                      <p className="mt-3 text-xs text-gray-500 bg-blue-50 p-2 rounded-lg">{q.explanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'practice' && (
          <motion.div key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-6">
              {story.practiceTask && (
                <>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-blue-600" />
                      Writing Practice
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">{story.practiceTask.hindi || story.practiceTask.instructions}</p>

                    {story.practiceTask.template && (
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4">
                        <p className="text-xs font-semibold text-blue-700 mb-2">Template:</p>
                        <p className="text-sm text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                          {story.practiceTask.template}
                        </p>
                      </div>
                    )}

                    {(story.practiceTask.tips || story.practiceTask.checklist) && (
                      <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                        <p className="text-xs font-semibold text-green-700 mb-2">Tips:</p>
                        <ul className="space-y-1">
                          {(story.practiceTask.tips || story.practiceTask.checklist)?.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Writing area */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Response:</label>
                    <textarea
                      rows={8}
                      placeholder="Write your introduction in English here..."
                      className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">Tip: Use real information about yourself for best practice</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Story list component ──────────────────────────────────────────────────────
function StoryCard({ story, onClick, index }) {
  const LEVEL_COLORS = {
    Beginner:     'bg-green-100 text-green-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced:     'bg-purple-100 text-purple-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer overflow-hidden group transition-all duration-300"
    >
      {/* Coloured top strip */}
      <div className={`h-2 bg-gradient-to-r ${
        index % 4 === 0 ? 'from-blue-500 to-indigo-600' :
        index % 4 === 1 ? 'from-purple-500 to-pink-600' :
        index % 4 === 2 ? 'from-green-500 to-teal-600' :
                          'from-orange-500 to-red-600'
      }`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${LEVEL_COLORS[story.level] || 'bg-gray-100 text-gray-600'}`}>
              {story.level}
            </span>
            <span className="text-xs text-gray-400 ml-2">{story.cefr} • {story.wordCount} words</span>
          </div>
          <span className="text-2xl">{index % 8 === 0 ? '🏢' : index % 8 === 1 ? '💼' : index % 8 === 2 ? '🎓' : index % 8 === 3 ? '💻' : index % 8 === 4 ? '📱' : index % 8 === 5 ? '🎤' : index % 8 === 6 ? '📊' : '✉️'}</span>
        </div>

        <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">
          {story.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3">{story.hindiTitle}</p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{story.theme}</span>
          <div className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
            Read Story
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {story.comprehensionQuestions?.length > 0 && (
          <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
            <Target className="w-3 h-3" />
            {story.comprehensionQuestions.length} comprehension questions included
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ── Main stories page ─────────────────────────────────────────────────────────
export default function Day2StoriesPage() {
  const [stories, setStories]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetch('/data/challenge/day-02/story.json')
      .then(r => r.json())
      .then(data => {
        setStories(data?.stories || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/practice/day-2" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:block">Day 2</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Stories
            </h1>
            <p className="text-xs text-gray-500">Day 2 — Self Introduction</p>
          </div>
          <div className="text-sm text-gray-500">{stories.length} stories</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedStory ? (
            <motion.div key="reader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Intro banner */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8 shadow-xl">
                <h2 className="text-xl font-bold mb-2">📚 Story-Based Learning</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Har story mein English sirf Day 2 ke grammar aur vocabulary use ki gayi hai.
                  Padhein, samjhein, aur phir comprehension questions answer karein.
                </p>
                <div className="flex flex-wrap gap-3 mt-4 text-xs">
                  <span className="bg-white/20 px-3 py-1 rounded-full">{stories.length} Real-Life Stories</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Comprehension Questions</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Vocabulary Lists</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Writing Practice</span>
                </div>
              </div>

              {stories.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Stories loading...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                  {stories.map((story, i) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      index={i}
                      onClick={() => setSelectedStory(story)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
