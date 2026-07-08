'use client';
// ============================================================
// useSound Hook — Web Audio API sound effects
// Generates all sounds programmatically — no external files needed
// Plays sounds for: correct, wrong, perfect, levelUp, complete, click
// ============================================================

import { useCallback, useRef } from 'react';

// ── Main Hook ─────────────────────────────────────────────────
export function useSound() {
  // AudioContext ref — created lazily on first use (browser policy)
  const ctxRef = useRef(null);

  // ── Get or create AudioContext ────────────────────────────
  const getCtx = useCallback(() => {
    if (typeof window === 'undefined') return null; // SSR guard
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return null; // Audio not supported
      }
    }
    // Resume if suspended (browser autoplay policy)
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // ── Core tone generator ───────────────────────────────────
  // freq: Hz | duration: ms | type: OscillatorType | volume: 0-1
  const playTone = useCallback((freq, duration, type = 'sine', volume = 0.3) => {
    const ac = getCtx();
    if (!ac) return;
    try {
      const osc  = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      gain.gain.setValueAtTime(volume, ac.currentTime);
      // Fade out to avoid clicks
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration / 1000);

      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + duration / 1000 + 0.01);
    } catch (e) {
      // Silent fail — audio not critical
    }
  }, [getCtx]);

  // ── Chord helper — plays multiple tones at once ───────────
  const playChord = useCallback((freqs, duration, type = 'sine', volume = 0.2) => {
    freqs.forEach(f => playTone(f, duration, type, volume));
  }, [playTone]);

  // ── Sequence helper — plays tones in sequence ─────────────
  const playSequence = useCallback((notes, gap = 80) => {
    notes.forEach(([freq, duration, type = 'sine', vol = 0.3], i) => {
      setTimeout(() => playTone(freq, duration, type, vol), i * gap);
    });
  }, [playTone]);

  // ── ✅ Correct Answer — happy ascending arpeggio ──────────
  const playCorrect = useCallback(() => {
    playSequence([
      [523, 100, 'sine', 0.3],   // C5
      [659, 100, 'sine', 0.3],   // E5
      [784, 180, 'sine', 0.35],  // G5
    ], 100);
  }, [playSequence]);

  // ── ❌ Wrong Answer — descending low buzz ─────────────────
  const playWrong = useCallback(() => {
    playSequence([
      [220, 120, 'square', 0.18],  // Low A
      [165, 200, 'square', 0.15],  // Low E
    ], 120);
  }, [playSequence]);

  // ── 🌟 Perfect Score — triumphant fanfare ─────────────────
  const playPerfect = useCallback(() => {
    playSequence([
      [523, 100, 'sine', 0.3],   // C5
      [659, 100, 'sine', 0.3],   // E5
      [784, 100, 'sine', 0.3],   // G5
      [1047, 300, 'sine', 0.4],  // C6
    ], 100);
    // Add harmony on last note
    setTimeout(() => playChord([784, 988], 250, 'sine', 0.2), 300);
  }, [playSequence, playChord]);

  // ── 🆙 Level Up — upward glissando ────────────────────────
  const playLevelUp = useCallback(() => {
    playSequence([
      [392, 80, 'sine', 0.3],   // G4
      [523, 80, 'sine', 0.3],   // C5
      [659, 80, 'sine', 0.3],   // E5
      [784, 80, 'sine', 0.35],  // G5
      [1047, 300, 'sine', 0.4], // C6
    ], 80);
  }, [playSequence]);

  // ── 🏆 Course Complete — epic finish ──────────────────────
  const playComplete = useCallback(() => {
    playSequence([
      [523, 100, 'sine', 0.3],
      [587, 100, 'sine', 0.3],
      [659, 100, 'sine', 0.3],
      [698, 100, 'sine', 0.3],
      [784, 200, 'sine', 0.35],
      [1047, 400, 'sine', 0.4],
    ], 100);
    setTimeout(() => playChord([523, 659, 784], 400, 'sine', 0.25), 800);
  }, [playSequence, playChord]);

  // ── 🖱️ Click — subtle UI feedback ────────────────────────
  const playClick = useCallback(() => {
    playTone(800, 40, 'sine', 0.08);
  }, [playTone]);

  // ── 🔔 Notification — soft ping ───────────────────────────
  const playNotification = useCallback(() => {
    playSequence([
      [880, 80, 'sine', 0.2],
      [1108, 150, 'sine', 0.2],
    ], 80);
  }, [playSequence]);

  // ── 🎯 Streak — reward tone ───────────────────────────────
  const playStreak = useCallback(() => {
    playSequence([
      [659, 80, 'sine', 0.3],
      [784, 80, 'sine', 0.3],
      [988, 150, 'sine', 0.35],
    ], 80);
  }, [playSequence]);

  // ── 🏅 Badge — medal sound ────────────────────────────────
  const playBadge = useCallback(() => {
    playChord([523, 659, 784], 80, 'sine', 0.25);
    setTimeout(() => playChord([659, 784, 988], 200, 'sine', 0.3), 100);
  }, [playChord]);

  return {
    playCorrect,   // ✅ right answer
    playWrong,     // ❌ wrong answer
    playPerfect,   // 🌟 100% score
    playLevelUp,   // 🆙 level up
    playComplete,  // 🏆 session done
    playClick,     // 🖱️ UI click
    playNotification, // 🔔 notification
    playStreak,    // 🎯 answer streak
    playBadge,     // 🏅 badge earned
  };
}

export default useSound;
