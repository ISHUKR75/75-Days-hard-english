'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using 75 Days Hard English ("the Platform"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Platform.

These Terms apply to all visitors, users, and others who access or use the Platform.`,
  },
  {
    title: '2. Use of the Platform',
    content: `You may use the Platform for personal, non-commercial English learning purposes. You agree to:

• Provide accurate information when creating your account
• Maintain the security of your account credentials
• Not share your account with others
• Not use the Platform for any unlawful purpose
• Not attempt to reverse engineer or copy the Platform's code (except as permitted by our MIT License for the open-source portions)
• Not create automated scripts to scrape content`,
  },
  {
    title: '3. Free Plan & Paid Plans',
    content: `**Free Plan:** The free plan is provided "as is" with no payment required. We reserve the right to modify or discontinue features with reasonable notice.

**Pro Plan:** By subscribing to Pro, you agree to pay the monthly fee. Subscriptions auto-renew unless cancelled. You may cancel at any time — cancellation takes effect at the end of the current billing period.

**Refunds:** We offer a 7-day refund for Pro subscriptions if you're unsatisfied. Contact support@75daysenglish.com within 7 days of purchase.`,
  },
  {
    title: '4. Intellectual Property',
    content: `**Platform Code:** The platform's source code is open source under the MIT License. You are free to view, fork, and contribute.

**Content:** All educational content (lessons, questions, vocabulary, explanations) is owned by 75 Days Hard English and protected by copyright. You may not reproduce or distribute this content without permission.

**User Content:** Any content you create (notes, essays, responses) remains yours. You grant us a limited license to display and process it to provide the service.`,
  },
  {
    title: '5. Disclaimer of Warranties',
    content: `The Platform is provided "as is" and "as available" without any warranties of any kind. We do not warrant that:

• The Platform will be uninterrupted or error-free
• Results from using the Platform will meet your expectations
• Any specific improvement in English proficiency will occur

Learning English requires your personal effort and consistent practice. The Platform provides tools — the results depend on your dedication.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `75 Days Hard English shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform.

Our total liability for any claims is limited to the amount you paid us in the 12 months prior to the claim.`,
  },
  {
    title: '7. Termination',
    content: `We may terminate or suspend your account at our discretion if you violate these Terms. You may also delete your account at any time from Settings → Account → Delete Account.

Upon termination, your right to use the Platform ceases. Your learning data will be deleted within 30 days unless you request earlier deletion.`,
  },
  {
    title: '8. Governing Law',
    content: `These Terms are governed by the laws of India. Any disputes will be resolved in the courts of New Delhi, India.

If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in effect.`,
  },
  {
    title: '9. Contact',
    content: `For questions about these Terms:

📧 legal@75daysenglish.com
📬 75 Days Hard English, New Delhi, India 110001`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-950 text-white">
      <section className="pt-24 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-6">
              <ArrowLeft size={14} /> Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <FileText size={20} className="text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Terms of Service</h1>
                <p className="text-xs text-slate-500">Last updated: July 1, 2026</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Please read these Terms of Service carefully before using 75 Days Hard English.
              By using the platform, you agree to these terms.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          {SECTIONS.map(({ title, content }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl border border-white/5 bg-white/2 p-6"
            >
              <h2 className="font-black text-white mb-3 text-base">{title}</h2>
              <div className="text-sm text-slate-400 leading-relaxed space-y-2">
                {content.split('\n').map((line, j) => {
                  if (!line.trim()) return null;
                  if (line.startsWith('**') && line.endsWith('**')) return <p key={j} className="font-bold text-slate-300 mt-3">{line.replace(/\*\*/g, '')}</p>;
                  if (line.startsWith('• ')) return <p key={j} className="flex gap-2"><span className="text-purple-400">•</span>{line.slice(2)}</p>;
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
