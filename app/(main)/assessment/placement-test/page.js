'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function Page() {
  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors w-fit">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
      <div className="empty-state py-20">
        <div className="text-4xl mb-4">🚧</div>
        <h2 className="text-xl font-bold text-white mb-2">Coming Soon</h2>
        <p className="text-slate-500 text-sm">This section is under construction. Check back soon!</p>
      </div>
    </div>
  );
}
