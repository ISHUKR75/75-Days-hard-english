"use client";

import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, Lightbulb, Zap, Volume2 } from 'lucide-react';

export default function TopicRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="space-y-12 w-full max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          {content.topic}
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          {content.explanation}
        </p>
      </div>

      {/* Rules Section (Bento Grid Style) */}
      {content.rules && content.rules.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-400 w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Grammar Rules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.rules.map((rule, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="glass-panel p-6 rounded-2xl"
              >
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Rule {idx + 1}</div>
                <p className="text-white font-medium">{rule.rule}</p>
                <p className="text-white/60 text-sm mt-2">{rule.explanation}</p>
                
                {rule.structure && (
                  <div className="mt-4 p-3 bg-black/40 rounded-xl border border-white/10 font-mono text-sm text-cyan-300 text-center overflow-x-auto">
                    {rule.structure}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Examples Section */}
      {content.examples && content.examples.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-400 w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Examples in Context</h2>
          </div>
          <div className="glass-panel rounded-3xl overflow-hidden divide-y divide-white/5">
            {content.examples.map((ex, idx) => (
              <div key={idx} className="p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                <button 
                  className="mt-1 p-2 bg-white/5 hover:bg-white/10 rounded-full shrink-0 transition-colors"
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(ex.english);
                    utterance.lang = 'en-US';
                    window.speechSynthesis.speak(utterance);
                  }}
                >
                  <Volume2 className="w-4 h-4 text-white/50" />
                </button>
                <div>
                  <p className="text-lg font-medium text-white">{ex.english}</p>
                  <p className="text-white/50">{ex.hindi}</p>
                  {ex.context && <p className="text-sm text-blue-300 mt-2">💡 {ex.context}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {content.common_mistakes && content.common_mistakes.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-400 w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Common Mistakes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.common_mistakes.map((mistake, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border-l-4 border-l-red-500">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Don't say</span>
                    <p className="text-white line-through opacity-70">{mistake.wrong}</p>
                  </div>
                  <div>
                    <span className="text-xs text-green-400 font-bold uppercase tracking-wider">Say</span>
                    <p className="text-white font-bold">{mistake.correct}</p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-sm text-white/60">{mistake.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Memory Tricks */}
      {content.memory_tricks && content.memory_tricks.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="text-yellow-300 w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Memory Tricks</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8">
            <ul className="space-y-4">
              {content.memory_tricks.map((trick, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="text-2xl">✨</span>
                  <p className="text-white/80 leading-relaxed">{trick}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
