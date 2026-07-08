'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect the following information when you use 75 Days Hard English:

**Account Information:** Name, email address, and password (hashed) when you register.

**Learning Progress:** Topics completed, questions answered, XP earned, streaks, and scores — stored to provide personalized learning.

**Usage Data:** Pages visited, features used, and session duration — used to improve the platform.

**Device Information:** Browser type, operating system — used for compatibility and performance optimization.

We do NOT collect: Payment card details (handled by Razorpay/Stripe), sensitive personal information, location data, or microphone recordings (speaking practice is processed locally).`,
  },
  {
    title: '2. How We Use Your Information',
    content: `Your information is used to:

• Provide and improve the 75 Days Hard English platform
• Save and sync your learning progress across devices
• Send important account notifications (password reset, streak reminders)
• Generate anonymous analytics to improve content quality
• Provide customer support when you contact us

We do NOT sell your personal information to third parties. We do NOT use your data for advertising.`,
  },
  {
    title: '3. Data Storage & Security',
    content: `**Storage:** Your data is stored securely on servers located in India and/or the EU.

**Security measures:**
• Passwords are hashed using bcrypt (never stored in plain text)
• All data transmission uses HTTPS/TLS encryption
• Database access is restricted and monitored
• Regular security audits and penetration testing

**Data retention:** Account data is kept as long as your account is active. You can request deletion at any time.`,
  },
  {
    title: '4. Cookies',
    content: `We use minimal, essential cookies:

• **Session cookie:** Keeps you logged in during your session
• **Preference cookie:** Remembers your theme (dark/light) and language
• **Analytics cookie:** Anonymous usage tracking (can be disabled)

We do NOT use advertising cookies or tracking pixels. You can disable non-essential cookies in your browser settings.`,
  },
  {
    title: '5. Your Rights',
    content: `You have the right to:

• **Access:** Request a copy of your personal data
• **Correction:** Update incorrect information in your profile
• **Deletion:** Delete your account and all associated data
• **Export:** Download your progress data in JSON format
• **Portability:** Transfer your data to another service

To exercise these rights, contact us at privacy@75daysenglish.com or use the settings in your account dashboard.`,
  },
  {
    title: '6. Third-Party Services',
    content: `We use these third-party services, each with their own privacy policies:

• **Vercel:** Hosting and CDN (vercel.com/privacy)
• **Razorpay / Stripe:** Payment processing (for Pro plan)
• **Google Fonts:** Typography (fonts.google.com/privacy)

We do not share your personal data with these services beyond what is necessary for them to function.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `75 Days Hard English is not designed for children under 13. We do not knowingly collect personal information from children under 13.

If you believe we have collected information from a child under 13, please contact us immediately at privacy@75daysenglish.com and we will delete the information promptly.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by:

• Sending an email to your registered address
• Displaying a prominent notice on the platform

Your continued use of the platform after changes indicates acceptance of the updated policy.`,
  },
  {
    title: '9. Contact Us',
    content: `For privacy-related questions or concerns:

📧 privacy@75daysenglish.com
📬 75 Days Hard English, New Delhi, India 110001

We aim to respond to all privacy inquiries within 48 hours.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white">
      <section className="pt-24 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-6">
              <ArrowLeft size={14} /> Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Shield size={20} className="text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Privacy Policy</h1>
                <p className="text-xs text-slate-500">Last updated: July 1, 2026</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              At 75 Days Hard English, we take your privacy seriously. This policy explains what data we collect,
              how we use it, and your rights. We believe in transparency and minimal data collection.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {SECTIONS.map(({ title, content }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/5 bg-white/2 p-6"
            >
              <h2 className="font-black text-white mb-3 text-base">{title}</h2>
              <div className="text-sm text-slate-400 leading-relaxed space-y-2">
                {content.split('\n').map((line, j) => {
                  if (!line.trim()) return null;
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={j} className="font-bold text-slate-300">{line.replace(/\*\*/g, '')}</p>;
                  }
                  if (line.startsWith('• ')) {
                    return <p key={j} className="flex gap-2 text-slate-400"><span className="text-indigo-400">•</span>{line.slice(2)}</p>;
                  }
                  return <p key={j}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
