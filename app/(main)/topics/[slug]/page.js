'use client';
// ============================================================
// TOPIC DETAIL PAGE - Individual topic with full content
// Shows: Explanation, examples, practice button, vocabulary
// ============================================================

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, MessageSquare, Sparkles, PlayCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Sample topic data (will be replaced with real data)
const SAMPLE_TOPIC = {
  day: 1,
  title: 'Basics of English',
  slug: 'basics-of-english',
  explanation: {
    hindi: 'अंग्रेजी में हर वाक्य तीन भागों से बनता है: Subject (कर्ता) + Verb (क्रिया) + Object (कर्म)। जैसे: मैं खाना खाता हूँ = I eat food।',
    english: 'Every English sentence has three parts: Subject + Verb + Object. For example: I eat food.',
  },
  examples: [
    { hindi: 'मैं पानी पीता हूँ', english: 'I drink water' },
    { hindi: 'वह किताब पढ़ता है', english: 'He reads a book' },
    { hindi: 'बच्चे खेलते हैं', english: 'Children play' },
  ],
  stats: {
    practiceQuestions: 500,
    testQuestions: 100,
    vocabulary: 500,
  }
};

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  // In real implementation, fetch topic data based on slug
  const topic = SAMPLE_TOPIC;

  return (
    <div className="min-h-screen bg-surface-950 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Topics
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-sm font-semibold text-primary-400">Day {topic.day}</span>
          <h1 className="text-5xl font-black text-white mt-2 mb-4">{topic.title}</h1>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <MessageSquare size={16} />
              {topic.stats.practiceQuestions} Practice Questions
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 size={16} />
              {topic.stats.testQuestions} Test Questions
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <BookOpen size={16} />
              {topic.stats.vocabulary} Vocabulary Words
            </div>
          </div>
        </motion.div>

        {/* Explanation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles size={24} className="text-amber-400" />
            Explanation
          </h2>
          
          {/* Hindi Explanation */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-amber-400 mb-2">Hindi:</h3>
            <p className="text-lg hindi-text leading-relaxed">{topic.explanation.hindi}</p>
          </div>

          {/* English Explanation */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-400 mb-2">English:</h3>
            <p className="text-lg text-slate-300 leading-relaxed">{topic.explanation.english}</p>
          </div>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Examples</h2>
          <div className="space-y-4">
            {topic.examples.map((example, index) => (
              <div key={index} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="hindi-text mb-2">{example.hindi}</p>
                <p className="english-text text-lg">→ {example.english}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Practice Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href={`/practice/${topic.slug}`}
            className="btn-gradient w-full py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3"
          >
            <PlayCircle size={24} />
            Start Practice ({topic.stats.practiceQuestions} Questions)
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
