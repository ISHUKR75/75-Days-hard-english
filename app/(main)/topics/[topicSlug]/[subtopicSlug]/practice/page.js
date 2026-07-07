'use client';
// Topic Practice Page — Practice for any topic/subtopic
// Loads relevant questions based on topic slug

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { TOPIC_QUESTION_SETS, getQuestionsForDay } from '@/lib/practiceData';

const PracticeQuiz = dynamic(() => import('@/components/quiz/PracticeQuiz'), {
  loading: () => (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: false,
});

export default function TopicPracticePage() {
  const params = useParams();
  const topicSlug    = params?.topicSlug || '';
  const subtopicSlug = params?.subtopicSlug || '';
  const fullSlug     = `${topicSlug}/${subtopicSlug}`;

  // Try to find questions for this topic
  let questions = TOPIC_QUESTION_SETS[subtopicSlug]
    || TOPIC_QUESTION_SETS[fullSlug]
    || TOPIC_QUESTION_SETS[topicSlug]
    || getQuestionsForDay(1); // fallback to day 1

  const title = subtopicSlug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href={`/topics/${topicSlug}`} className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> {topicSlug.replace(/-/g, ' ')}
        </Link>
        <span>/</span>
        <span className="text-slate-300 capitalize">{subtopicSlug.replace(/-/g, ' ')}</span>
        <span>/</span>
        <span className="text-slate-300">Practice</span>
      </div>

      <div className="card p-4 border-primary-500/20 bg-primary-500/5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/20 flex items-center justify-center text-2xl shrink-0">📚</div>
        <div className="flex-1">
          <h2 className="font-bold text-white capitalize">{title}</h2>
          <p className="text-xs text-slate-500">{questions.length} questions available</p>
        </div>
        <Link href={`/topics/${topicSlug}/${subtopicSlug}`}
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5 shrink-0">
          <BookOpen size={13} /> Lesson
        </Link>
      </div>

      <div className="card p-4 bg-amber-500/5 border border-amber-500/15">
        <p className="text-sm text-amber-200 font-semibold mb-2">📖 Practice Instructions:</p>
        <ul className="space-y-1 text-xs text-slate-400">
          <li>• Hindi sentence dekho — English mein type karo</li>
          <li>• Case-insensitive — "I am" = "i am" = "I Am" ✅</li>
          <li>• Trailing punctuation optional (.!? not required)</li>
          <li>• Sahi answer = 🔊 sound + XP, galat = ❌ sound</li>
        </ul>
      </div>

      <PracticeQuiz
        questions={questions}
        title={`${title} Practice`}
        backHref={`/topics/${topicSlug}/${subtopicSlug}`}
        questionsPerSession={Math.min(20, questions.length)}
        shuffleMode={true}
      />
    </div>
  );
}
