'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  if (sent) return (
    <div className="text-center animate-fade-up">
      <div className="text-5xl mb-4">📧</div>
      <h2 className="text-2xl font-black text-white mb-2">Email Sent!</h2>
      <p className="text-slate-400 mb-6">Check your inbox for the password reset link.</p>
      <Link href="/login" className="btn-primary inline-flex items-center gap-2 px-6 py-3">
        Back to Login
      </Link>
    </div>
  );

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary shadow-glow-primary mb-4">
          <span className="text-white font-black text-xl">75</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Forgot Password?</h1>
        <p className="text-slate-500 text-sm">Enter your email to reset your password</p>
      </div>
      <div className="glass rounded-3xl p-8 border border-white/8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" className="input pl-11" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5">
            {loading ? <><Loader2 size={18} className="animate-spin" />Sending…</> : <>Send Reset Link <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
      <p className="text-center text-sm text-slate-500 mt-6">
        <Link href="/login" className="text-primary-400 hover:text-primary-300 flex items-center justify-center gap-1">
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </p>
    </div>
  );
}
