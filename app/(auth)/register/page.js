'use client';
// Register Page - New user sign-up with name, email, password

import { useState }  from 'react';
import Link          from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast         from 'react-hot-toast';
import useUserStore  from '@/store/userStore';

export default function RegisterPage() {
  const router = useRouter();
  const { updateProfile } = useUserStore();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [errors,    setErrors]    = useState({});
  const [success,   setSuccess]   = useState(false);

  // Password strength check
  const passwordStrength = (p) => {
    let score = 0;
    if (p.length >= 8)       score++;
    if (/[A-Z]/.test(p))     score++;
    if (/[0-9]/.test(p))     score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-danger-500', 'bg-warning-500', 'bg-primary-500', 'bg-accent-500'][strength];

  const validate = () => {
    const e = {};
    if (!form.name)             e.name    = 'Name required';
    if (!form.email)            e.email   = 'Email required';
    if (form.password.length < 8) e.password = 'Min 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    updateProfile({ name: form.name, email: form.email });
    setSuccess(true);
    toast.success('Account created! 🎉 Welcome to 75 Days Hard English!');
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  if (success) {
    return (
      <div className="text-center animate-bounce-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-500/20 border border-accent-500/30 mb-4">
          <CheckCircle2 size={40} className="text-accent-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Account Created! 🎉</h2>
        <p className="text-slate-400">Redirecting to dashboard…</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-primary shadow-glow-primary mb-4">
          <span className="text-white font-black text-xl">75</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-1">Start Your Journey</h1>
        <p className="text-slate-500 text-sm">75 days to fluent English — it starts now</p>
      </div>

      <div className="glass rounded-3xl p-8 border border-white/8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="input pl-11"
              />
            </div>
            {errors.name && <p className="text-xs text-danger-400 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="input pl-11"
              />
            </div>
            {errors.email && <p className="text-xs text-danger-400 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min 8 characters"
                className="input pl-11 pr-11"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Strength meter */}
            {form.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-white/10'}`} />
                  ))}
                </div>
                <p className="text-xs text-slate-500">{strengthLabel}</p>
              </div>
            )}
            {errors.password && <p className="text-xs text-danger-400 mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="Re-enter password"
                className="input pl-11"
              />
            </div>
            {errors.confirm && <p className="text-xs text-danger-400 mt-1">{errors.confirm}</p>}
          </div>

          {/* Terms */}
          <p className="text-xs text-slate-600">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-primary-400 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary-400 hover:underline">Privacy Policy</Link>.
          </p>

          {/* Submit */}
          <button type="submit" disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base">
            {loading ? <><Loader2 size={18} className="animate-spin" />Creating Account…</> : <>Create Account <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-primary-400 font-semibold hover:text-primary-300">Sign in →</Link>
      </p>
    </div>
  );
}
