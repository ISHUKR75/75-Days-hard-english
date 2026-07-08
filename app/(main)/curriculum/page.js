'use client';
// Curriculum Page — Comprehensive 75-Day Learning Journey
// Features: Day-by-day navigation, topic cards, progress tracking, animated transitions

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Calendar, Target, Trophy, Zap, Flame,
  CheckCircle2, Clock, Users, Globe, Play, ChevronRight,
  ArrowLeft, ArrowRight, Star, Award, Sparkles
} from 'lucide-react';

// Curriculum data based on English.txt requirements
const CURRICULUM_DAYS = [
  // Day 1-10: Foundation
  { day: 1, topic: 'Basic of English', category: 'Foundation', emoji: '🔤', duration: '1 day' },
  { day: 2, topic: 'Self Introduction', category: 'Foundation', emoji: '👋', duration: '1 day' },
  { day: 3, topic: 'Imperative Sentence', category: 'Foundation', emoji: '❗', duration: '1 day' },
  { day: 4, topic: 'Be Verb', category: 'Foundation', emoji: '✅', duration: '1 day' },
  { day: 5, topic: 'Demonstrative Pronoun', category: 'Foundation', emoji: '👉', duration: '1 day' },
  { day: 6, topic: 'Has / Have', category: 'Foundation', emoji: '🔑', duration: '1 day' },
  { day: 7, topic: 'Had', category: 'Foundation', emoji: '⏳', duration: '1 day' },
  { day: 8, topic: 'Will Have', category: 'Foundation', emoji: '🔮', duration: '1 day' },
  { day: 9, topic: 'Use of There', category: 'Foundation', emoji: '📍', duration: '1 day' },
  { day: 10, topic: 'Revision + Practice', category: 'Foundation', emoji: '🔄', duration: '1 day' },
  
  // Day 11-20: Basic Modals
  { day: 11, topic: 'Use of Want', category: 'Modals', emoji: '💭', duration: '1 day' },
  { day: 12, topic: 'Use of Wanted', category: 'Modals', emoji: '💭', duration: '1 day' },
  { day: 13, topic: 'Use of Let', category: 'Modals', emoji: '🤝', duration: '1 day' },
  { day: 14, topic: 'Use of Let\'s', category: 'Modals', emoji: '🤝', duration: '1 day' },
  { day: 15, topic: 'Would Like To', category: 'Modals', emoji: '🙏', duration: '1 day' },
  { day: 16, topic: 'Can', category: 'Modals', emoji: '💪', duration: '1 day' },
  { day: 17, topic: 'Should', category: 'Modals', emoji: '🎯', duration: '1 day' },
  { day: 18, topic: 'May', category: 'Modals', emoji: '🍀', duration: '1 day' },
  { day: 19, topic: 'Must', category: 'Modals', emoji: '🔒', duration: '1 day' },
  { day: 20, topic: 'Revision + Speaking Practice', category: 'Modals', emoji: '🗣️', duration: '1 day' },
  
  // Day 21-30: Advanced Modals
  { day: 21, topic: 'Used To', category: 'Advanced Modals', emoji: '🕰️', duration: '1 day' },
  { day: 22, topic: 'Could', category: 'Advanced Modals', emoji: '💡', duration: '1 day' },
  { day: 23, topic: 'Should Have', category: 'Advanced Modals', emoji: '🎯', duration: '1 day' },
  { day: 24, topic: 'Must Have', category: 'Advanced Modals', emoji: '🔒', duration: '1 day' },
  { day: 25, topic: 'Could Have', category: 'Advanced Modals', emoji: '💡', duration: '1 day' },
  { day: 26, topic: 'Would Have', category: 'Advanced Modals', emoji: '🔮', duration: '1 day' },
  { day: 27, topic: 'May Have', category: 'Advanced Modals', emoji: '🍀', duration: '1 day' },
  { day: 28, topic: 'Might Have', category: 'Advanced Modals', emoji: '🤔', duration: '1 day' },
  { day: 29, topic: 'Will / Shall', category: 'Advanced Modals', emoji: '🔮', duration: '1 day' },
  { day: 30, topic: 'Would + Ought To + Dare', category: 'Advanced Modals', emoji: '💪', duration: '1 day' },
  
  // Day 31-50: Tenses & Voice
  { day: 31, topic: 'Revision', category: 'Tenses', emoji: '🔄', duration: '1 day' },
  { day: 32, topic: 'Tenses Part 1', category: 'Tenses', emoji: '⏰', duration: '1 day' },
  { day: 33, topic: 'Tenses Part 2', category: 'Tenses', emoji: '⏰', duration: '1 day' },
  { day: 34, topic: 'Tenses Part 3', category: 'Tenses', emoji: '⏰', duration: '1 day' },
  { day: 35, topic: 'Tenses Part 4', category: 'Tenses', emoji: '⏰', duration: '1 day' },
  { day: 36, topic: 'Prepositions Part 1', category: 'Tenses', emoji: '⬆️', duration: '1 day' },
  { day: 37, topic: 'Prepositions Part 2', category: 'Tenses', emoji: '⬇️', duration: '1 day' },
  { day: 38, topic: 'Has To / Have To', category: 'Tenses', emoji: '🔑', duration: '1 day' },
  { day: 39, topic: 'Had To / Will Have To', category: 'Tenses', emoji: '⏳', duration: '1 day' },
  { day: 40, topic: 'Make / Get', category: 'Tenses', emoji: '🛠️', duration: '1 day' },
  { day: 41, topic: 'Going To', category: 'Tenses', emoji: '🚀', duration: '1 day' },
  { day: 42, topic: 'About To', category: 'Tenses', emoji: '⏱️', duration: '1 day' },
  { day: 43, topic: 'Want To / Wanted To', category: 'Tenses', emoji: '💭', duration: '1 day' },
  { day: 44, topic: 'Need To / Needed To', category: 'Tenses', emoji: '💡', duration: '1 day' },
  { day: 45, topic: 'Fond Of', category: 'Tenses', emoji: '❤️', duration: '1 day' },
  { day: 46, topic: 'Able To', category: 'Tenses', emoji: '💪', duration: '1 day' },
  { day: 47, topic: 'Conjunctions', category: 'Tenses', emoji: '🔗', duration: '1 day' },
  { day: 48, topic: 'WH Words', category: 'Tenses', emoji: '❓', duration: '1 day' },
  { day: 49, topic: 'Passive Voice Part 1', category: 'Tenses', emoji: '🔄', duration: '1 day' },
  { day: 50, topic: 'Passive Voice Part 2', category: 'Tenses', emoji: '🔄', duration: '1 day' },
  
  // Day 51-75: Advanced Topics
  { day: 51, topic: 'Advance Level Sentences Part 1', category: 'Advanced', emoji: '📚', duration: '1 day' },
  { day: 52, topic: 'Advance Level Sentences Part 2', category: 'Advanced', emoji: '📚', duration: '1 day' },
  { day: 53, topic: 'Verb List', category: 'Advanced', emoji: '📋', duration: '1 day' },
  { day: 54, topic: 'Idioms, Phrases & Proverbs', category: 'Advanced', emoji: '💬', duration: '1 day' },
  { day: 55, topic: 'Important Vocabulary', category: 'Advanced', emoji: '🔤', duration: '1 day' },
  { day: 56, topic: 'Miscellaneous Vocabulary (Noun + Adjective)', category: 'Advanced', emoji: '🔤', duration: '1 day' },
  { day: 57, topic: 'Stationery Vocabulary', category: 'Advanced', emoji: '✏️', duration: '1 day' },
  { day: 58, topic: 'Foods Vocabulary & Tastes', category: 'Advanced', emoji: '🍎', duration: '1 day' },
  { day: 59, topic: 'Relation & Weather Vocabulary', category: 'Advanced', emoji: '👨‍👩‍👧‍👦', duration: '1 day' },
  { day: 60, topic: 'Professions & Occupations Vocabulary', category: 'Advanced', emoji: '💼', duration: '1 day' },
  { day: 61, topic: 'Buildings, Worms & Insects Vocabulary', category: 'Advanced', emoji: '🏢', duration: '1 day' },
  { day: 62, topic: 'Flowers & Fruits Vocabulary', category: 'Advanced', emoji: '🌸', duration: '1 day' },
  { day: 63, topic: 'Maths Vocabulary', category: 'Advanced', emoji: '🔢', duration: '1 day' },
  { day: 64, topic: 'Body & Diseases Vocabulary', category: 'Advanced', emoji: '🩺', duration: '1 day' },
  { day: 65, topic: 'Industry Vocabulary', category: 'Advanced', emoji: '🏭', duration: '1 day' },
  { day: 66, topic: 'Colours & Judiciary Vocabulary', category: 'Advanced', emoji: '🎨', duration: '1 day' },
  { day: 67, topic: 'Birds & Astrology Vocabulary', category: 'Advanced', emoji: '🐦', duration: '1 day' },
  { day: 68, topic: 'Factory & Sports + Sound & Maths Vocabulary', category: 'Advanced', emoji: '⚽', duration: '1 day' },
  { day: 69, topic: 'Application Writing', category: 'Advanced', emoji: '📝', duration: '1 day' },
  { day: 70, topic: 'Letter Writing', category: 'Advanced', emoji: '✉️', duration: '1 day' },
  { day: 71, topic: 'E-mail Writing', category: 'Advanced', emoji: '📧', duration: '1 day' },
  { day: 72, topic: 'Paragraph Writing', category: 'Advanced', emoji: '📝', duration: '1 day' },
  { day: 73, topic: 'Notice Writing + Writing Skills Practice', category: 'Advanced', emoji: '📢', duration: '1 day' },
  { day: 74, topic: 'Grammar + Vocabulary + Speaking Full Revision', category: 'Advanced', emoji: '🔄', duration: '1 day' },
  { day: 75, topic: 'Complete Mock Test + Final Revision', category: 'Advanced', emoji: '🏆', duration: '1 day' }
];

// Category colors for visual distinction
const CATEGORY_COLORS = {
  'Foundation': 'from-indigo-500 to-blue-600',
  'Modals': 'from-purple-500 to-pink-600',
  'Advanced Modals': 'from-violet-500 to-purple-600',
  'Tenses': 'from-cyan-500 to-teal-600',
  'Advanced': 'from-emerald-500 to-green-600'
};

// Curriculum Page Component
export default function CurriculumPage() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  
  // Filter days based on search term
  const filteredDays = CURRICULUM_DAYS.filter(day => 
    day.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    day.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pagination
  const totalPages = Math.ceil(filteredDays.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDays = filteredDays.slice(startIndex, startIndex + itemsPerPage);
  
  // Navigation handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const nextDay = () => {
    if (selectedDay && selectedDay < 75) {
      setSelectedDay(selectedDay + 1);
    }
  };
  
  const prevDay = () => {
    if (selectedDay && selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-surface-950 text-white">
      {/* Header */}
      <header className="border-b border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black mb-2">75 Days Hard English Curriculum</h1>
              <p className="text-slate-400 max-w-2xl">
                A complete, structured journey from absolute beginner to fluent professional English speaker.
                Every day builds on the previous one with carefully designed lessons.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="btn-secondary px-4 py-2 text-sm">
                <ArrowLeft size={16} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="card p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search topics or categories..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>{filteredDays.length} topics found</span>
                <span>•</span>
                <span>{CURRICULUM_DAYS.length} total days</span>
              </div>
            </div>
          </div>
          
          {/* Curriculum Overview */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Curriculum Overview</h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Day</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span key={num} className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                      {num}
                    </span>
                  ))}
                  <span className="text-slate-400">...</span>
                  <span className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white">
                    75
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {['Foundation', 'Modals', 'Advanced Modals', 'Tenses', 'Advanced'].map((category, idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card p-5 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 border border-primary-500/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${CATEGORY_COLORS[category]}`} />
                    <h3 className="font-bold text-white">{category}</h3>
                  </div>
                  <p className="text-sm text-slate-400">
                    {CURRICULUM_DAYS.filter(d => d.category === category).length} days
                  </p>
                  <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      style={{ width: `${(CURRICULUM_DAYS.filter(d => d.category === category).length / 75) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Day-by-Day Curriculum */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">75-Day Learning Journey</h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={16} />
                </button>
                <span className="text-sm text-slate-400">Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentDays.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="card p-5 group cursor-pointer"
                  onClick={() => setSelectedDay(day.day)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{day.topic}</h3>
                        <p className="text-xs text-slate-400">{day.duration}</p>
                      </div>
                    </div>
                    <span className="text-2xl">{day.emoji}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${CATEGORY_COLORS[day.category]} text-white`}>Day {day.day}</span>
                    <span className="text-xs text-slate-400">{day.category}</span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs">
                      <BookOpen size={14} className="text-primary-400" />
                      <span className="text-slate-400">Concepts & Rules</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <Play size={14} className="text-emerald-400" />
                      <span className="text-slate-400">500+ Practice Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <Zap size={14} className="text-amber-400" />
                      <span className="text-slate-400">Vocabulary & Verbs</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button 
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    «
                  </button>
                  <button 
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-1 rounded-lg ${currentPage === pageNum ? 'bg-primary-500 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button 
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                  <button 
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    »
                  </button>
                </nav>
              </div>
            )}
          </div>
          
          {/* Selected Day Detail Modal */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedDay(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-surface-900 rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-black text-white">
                          Day {selectedDay} • {CURRICULUM_DAYS.find(d => d.day === selectedDay)?.topic}
                        </h2>
                        <p className="text-slate-400 mt-1">
                          {CURRICULUM_DAYS.find(d => d.day === selectedDay)?.emoji} {CURRICULUM_DAYS.find(d => d.day === selectedDay)?.category}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedDay(null)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Learning Structure */}
                      <div className="card p-5">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                          <BookOpen size={20} />
                          Learning Structure
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-bold text-white mt-0.5">1</div>
                            <div>
                              <h4 className="font-bold text-white">Explanation</h4>
                              <p className="text-slate-400 text-sm">Clear explanation of the concept in both Hindi and English</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-bold text-white mt-0.5">2</div>
                            <div>
                              <h4 className="font-bold text-white">Concept</h4>
                              <p className="text-slate-400 text-sm">Core grammar rules and concepts explained simply</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-bold text-white mt-0.5">3</div>
                            <div>
                              <h4 className="font-bold text-white">Real Life Examples</h4>
                              <p className="text-slate-400 text-sm">Everyday situations where this grammar is used</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-bold text-white mt-0.5">4</div>
                            <div>
                              <h4 className="font-bold text-white">Professional Examples</h4>
                              <p className="text-slate-400 text-sm">Office, business, and formal usage examples</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-bold text-white mt-0.5">5</div>
                            <div>
                              <h4 className="font-bold text-white">Common Mistakes</h4>
                              <p className="text-slate-400 text-sm">What students typically get wrong and how to avoid it</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Practice Options */}
                      <div className="card p-5">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                          <Play size={20} />
                          Practice Options
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <Link 
                            href={`/practice/day-${selectedDay}`}
                            className="btn-primary py-3 text-base flex items-center justify-center gap-2"
                          >
                            <BookOpen size={16} />
                            500+ Practice Questions
                          </Link>
                          <Link 
                            href={`/test/day-${selectedDay}`}
                            className="btn-gradient py-3 text-base flex items-center justify-center gap-2"
                          >
                            <Trophy size={16} />
                            100-200 Test Questions
                          </Link>
                          <Link 
                            href={`/vocabulary/day-${selectedDay}`}
                            className="btn-secondary py-3 text-base flex items-center justify-center gap-2"
                          >
                            <Sparkles size={16} />
                            500-1000 Vocabulary Words
                          </Link>
                          <Link 
                            href={`/speaking/day-${selectedDay}`}
                            className="btn-secondary py-3 text-base flex items-center justify-center gap-2"
                          >
                            <Mic size={16} />
                            Speaking Practice
                          </Link>
                        </div>
                      </div>
                      
                      {/* Progress Tracking */}
                      <div className="card p-5">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                          <Target size={20} />
                          Your Progress
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-400">Questions Attempted</span>
                              <span className="text-white">0 / 500</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 w-0%" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-400">Accuracy</span>
                              <span className="text-white">0%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-0%" />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-400">Vocabulary Mastered</span>
                              <span className="text-white">0 / 500</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 w-0%" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500">
            <Sparkles size={16} className="inline mr-2" /> Ready to start your 75-day journey?
            <Link href="/register" className="ml-2 text-primary-400 hover:text-primary-300 font-semibold">
              Sign up now →
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}