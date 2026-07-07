'use client';
// Global Error Boundary — catches runtime errors in the app

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-danger-500/15 border border-danger-500/30 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-danger-400" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Something went wrong</h1>
        <p className="text-slate-400 text-sm mb-6">
          {error?.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            <RefreshCw size={15} /> Try Again
          </button>
          <Link href="/" className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm">
            <Home size={15} /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
