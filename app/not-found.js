'use client';
// 404 Not Found page — animated and on-brand

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Animated 404 number */}
        <div className="text-8xl font-black gradient-text mb-4 animate-bounce-in">
          404
        </div>

        {/* Emoji */}
        <div className="text-5xl mb-6 animate-float">🤔</div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-400 mb-8">
          Yeh page nahi mila. Shayad aap galat jagah aa gaye.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          ← Ghar Wapas Jao
        </Link>
      </div>
    </div>
  );
}
