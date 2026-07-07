'use client';
import Link from 'next/link';
import { Trophy, Download, Share2 } from 'lucide-react';
import useUserStore from '@/store/userStore';
export default function CertificatePage() {
  const { user, totalLessonsCompleted } = useUserStore();
  const completed = totalLessonsCompleted >= 75;
  if (!completed) return (
    <div className="max-w-lg mx-auto text-center py-20">
      <div className="text-5xl mb-4">🔒</div>
      <h2 className="text-2xl font-black text-white mb-2">Certificate Locked</h2>
      <p className="text-slate-400 mb-4">Complete all 75 days to earn your certificate!</p>
      <p className="text-slate-500 text-sm mb-6">{totalLessonsCompleted}/75 days completed</p>
      <Link href="/75-days-challenge" className="btn-primary px-6 py-3">Continue Challenge →</Link>
    </div>
  );
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card p-8 text-center border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-amber-500/5">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-3xl font-black text-white mb-2">Certificate of Completion</h1>
        <p className="text-slate-400 mb-6">This certifies that</p>
        <p className="text-2xl font-black gradient-text mb-2">{user?.name || 'English Student'}</p>
        <p className="text-slate-400 mb-6">has successfully completed the <strong className="text-white">75 Days Hard English Challenge</strong></p>
        <p className="text-sm text-slate-500 mb-8">CEFR Level: B2+ | Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <div className="flex gap-3 justify-center">
          <button className="btn-primary flex items-center gap-2"><Download size={16} /> Download PDF</button>
          <button className="btn-secondary flex items-center gap-2"><Share2 size={16} /> Share</button>
        </div>
      </div>
    </div>
  );
}
