'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';
export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setDone(true);
    setLoading(false);
  };
  if (done) return (
    <div className="text-center">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-2xl font-black text-white mb-2">Password Reset!</h2>
      <p className="text-slate-400 mb-6">Your password has been updated successfully.</p>
      <Link href="/login" className="btn-primary inline-flex items-center gap-2 px-6 py-3">Back to Login</Link>
    </div>
  );
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary shadow-glow-primary mb-4">
          <Lock size={22} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Set New Password</h1>
        <p className="text-slate-500 text-sm">Choose a strong password</p>
      </div>
      <div className="glass rounded-3xl p-8 border border-white/8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">New Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="input" placeholder="Min 8 characters" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Confirm Password</label>
            <input type="password" value={form.confirm} onChange={(e) => setForm({...form, confirm: e.target.value})} className="input" placeholder="Re-enter password" required />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5">
            {loading ? <><Loader2 size={18} className="animate-spin" />Updating…</> : <>Reset Password <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
