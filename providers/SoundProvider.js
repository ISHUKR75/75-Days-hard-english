'use client';
// ============================================================
// SOUND PROVIDER — Global sound system initialization
// Listens to 'play-sound' custom events and plays audio
// Wrap this around the app in Providers.js
// ============================================================

import { useEffect } from 'react';
import { initSoundSystem } from '@/lib/sounds';
import useUserStore from '@/store/userStore';

export default function SoundProvider({ children }) {
  const { settings } = useUserStore();
  const soundEnabled = settings?.soundEnabled !== false; // default on

  useEffect(() => {
    // Only init sound system if sounds are enabled
    if (soundEnabled) initSoundSystem();
  }, [soundEnabled]);

  return <>{children}</>;
}
