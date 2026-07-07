'use client';
import Link from 'next/link';
import { Heart, BookOpen, ArrowRight } from 'lucide-react';
export default function BookmarksPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Heart size={28} className="text-rose-400" /> Bookmarks</h1>
        <p className="text-slate-500">Save topics, vocabulary words, and lessons to revisit later.</p>
      </div>
      <div className="empty-state py-20">
        <Heart size={40} className="text-slate-600 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No bookmarks yet</h3>
        <p className="text-slate-500 text-sm mb-6">While studying, tap the ♥ icon to save anything important here.</p>
        <Link href="/75-days-challenge" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
          Start Learning <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
