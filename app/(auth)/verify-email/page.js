'use client';
import Link from 'next/link';
import { CheckCircle2, Mail } from 'lucide-react';
export default function VerifyEmailPage() {
  return (
    <div className="text-center animate-fade-up">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-500/15 border border-accent-500/30 mb-5">
        <Mail size={28} className="text-accent-400" />
      </div>
      <h1 className="text-2xl font-black text-white mb-2">Verify Your Email</h1>
      <p className="text-slate-400 mb-6">We sent a verification link to your email. Click it to activate your account.</p>
      <Link href="/login" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
        Continue to Login
      </Link>
    </div>
  );
}
