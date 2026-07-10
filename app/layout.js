import './globals.css';
import Providers from '@/providers/Providers';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-surface-950 text-slate-100 min-h-screen" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
