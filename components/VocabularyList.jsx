"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, BookOpen, ChevronDown } from 'lucide-react';

export default function VocabularyList({ vocabulary }) {
  const [expandedWord, setExpandedWord] = useState(null);

  if (!vocabulary || vocabulary.length === 0) return null;

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto mt-16">
      <div className="flex items-center gap-3">
        <BookOpen className="text-emerald-400 w-6 h-6" />
        <h2 className="text-2xl font-bold text-white">Vocabulary & Phrasal Verbs</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vocabulary.map((vocab, idx) => {
          const isExpanded = expandedWord === idx;
          
          return (
            <motion.div 
              key={idx}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setExpandedWord(isExpanded ? null : idx)}
              className="glass-panel p-5 rounded-2xl cursor-pointer hover:bg-white/[0.04] transition-colors overflow-hidden relative"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold text-emerald-300">{vocab.word}</h3>
                  <p className="text-white/70">{vocab.meaning}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      const utterance = new SpeechSynthesisUtterance(vocab.word);
                      utterance.lang = 'en-US';
                      window.speechSynthesis.speak(utterance);
                    }}
                  >
                    <Volume2 className="w-4 h-4 text-white/50" />
                  </button>
                  <button className="p-2 text-white/30">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 mt-4 border-t border-white/10 space-y-3"
                  >
                    <div>
                      <span className="text-xs text-white/40 uppercase font-bold tracking-wider">Example</span>
                      <p className="text-white italic mt-1">"{vocab.example}"</p>
                    </div>
                    {vocab.synonyms && (
                      <div>
                        <span className="text-xs text-white/40 uppercase font-bold tracking-wider">Synonyms</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {vocab.synonyms.map((syn, sIdx) => (
                            <span key={sIdx} className="px-2 py-1 bg-white/5 rounded-md text-xs text-white/60">
                              {syn}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
