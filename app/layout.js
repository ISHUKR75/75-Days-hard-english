import './globals.css';
import Providers from '@/providers/Providers';
import { Inter } from 'next/font/google';

// ── Font loading via next/font ───────────────────────────────────────────
// Using next/font instead of a manual <link> tag in <head> because manual
// <link> tags get inserted after hydration starts and collide with scripts
// Replit's dev-tools proxy injects into <head>, which was throwing a
// "Hydration failed" error on every single page load. next/font downloads
// the font at build time, self-hosts it, and injects a stable className +
// CSS variable — no external network request, no runtime <head> mutation,
// no hydration mismatch, and it's faster for users too (no Google Fonts
// round-trip on first paint).
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: '75 Days Hard English — The World\'s Most Advanced English Learning Platform',
    template: '%s | 75 Days Hard English',
  },
  description:
    'Master English in 75 days. From absolute beginner to fluent professional. ' +
    'Grammar, speaking, writing, vocabulary — all in one powerful platform.',
  keywords: [
    'English learning', '75 days', 'spoken English', 'grammar', 'vocabulary',
    'pronunciation', 'English course', 'Hindi to English', 'fluent English',
    'professional English',
  ],
  authors: [{ name: '75 Days Hard English' }],
  creator: '75 Days Hard English',
  openGraph: {
    type:        'website',
    locale:      'en_IN',
    url:         'https://75daysenglish.com',
    title:       '75 Days Hard English',
    description: 'Master English in 75 days — Grammar, Speaking, Vocabulary & more.',
    siteName:    '75 Days Hard English',
  },
  manifest: '/manifest.json',
  icons: {
    icon:  '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export const viewport = {
  width:          'device-width',
  initialScale:   1,
  maximumScale:   5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#0f172a' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      {/* No manual <head> font links here — next/font (above) already
          injects everything needed at build time. Keeping <head> empty
          of custom tags means the server-rendered head and the
          client-hydrated head always match exactly. */}
      <body className="font-sans antialiased bg-surface-950 text-slate-100 min-h-screen" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
