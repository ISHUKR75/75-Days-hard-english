'use client';
// ============================================================
// PROVIDERS — Global providers: Theme, Toast, Sound
// All context providers are wrapped here for clean setup
// ============================================================

import { ThemeProvider } from 'next-themes';
import { Toaster }       from 'react-hot-toast';
import SoundProvider     from './SoundProvider';

// Root Providers Component
export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {/* Sound system listens to play-sound events globally */}
      <SoundProvider>
        {children}
      </SoundProvider>

      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#f43f5e', secondary: '#fff' },
          },
        }}
      />
    </ThemeProvider>
  );
}
