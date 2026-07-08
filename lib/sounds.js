// ============================================================
// SOUND SYSTEM — Real audio feedback for correct/wrong answers
// Uses Web Audio API to generate sounds without needing files
// Fallback: plays pre-loaded MP3 files from /public/sounds/
// ============================================================

// ── Web Audio API sound generator ───────────────────────────
let audioCtx = null; // Singleton AudioContext

// Get or create AudioContext (must be after user gesture)
const getCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch { return null; }
  }
  // Resume if suspended (browser policy)
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
};

// ── Tone generator helper ────────────────────────────────────
const playTone = (frequency, duration, type = 'sine', volume = 0.3, delay = 0) => {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc   = ctx.createOscillator();
    const gain  = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.01);
  } catch {}
};

// ── Individual sound definitions ─────────────────────────────

// ✅ Correct answer — happy ascending chime
export const playCorrect = () => {
  playTone(523.25, 0.15, 'sine', 0.4);        // C5
  playTone(659.25, 0.15, 'sine', 0.4, 0.12);  // E5
  playTone(783.99, 0.25, 'sine', 0.4, 0.24);  // G5
};

// ❌ Wrong answer — short descending buzzer
export const playWrong = () => {
  playTone(300, 0.1,  'sawtooth', 0.3);
  playTone(200, 0.15, 'sawtooth', 0.3, 0.1);
};

// 🏆 Perfect score — triumphant fanfare
export const playPerfectScore = () => {
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  notes.forEach((freq, i) => playTone(freq, 0.2, 'sine', 0.5, i * 0.1));
};

// ⭐ Level up — ascending scale + sparkle
export const playLevelUp = () => {
  [262, 330, 392, 523, 659, 784, 1047].forEach((f, i) => {
    playTone(f, 0.12, 'sine', 0.4, i * 0.07);
  });
};

// 🏅 Badge unlocked — magical shimmer
export const playBadge = () => {
  playTone(1046.5, 0.1, 'sine', 0.4);
  playTone(1318.5, 0.1, 'sine', 0.4, 0.1);
  playTone(1568,   0.2, 'sine', 0.4, 0.2);
  playTone(2093,   0.3, 'sine', 0.3, 0.3);
};

// 🪙 Coin collected — classic video game coin sound
export const playCoin = () => {
  playTone(988,  0.08, 'square', 0.3);
  playTone(1319, 0.2,  'square', 0.3, 0.07);
};

// 🔥 Streak milestone — celebration burst
export const playStreak = () => {
  [440, 550, 660, 880].forEach((f, i) => playTone(f, 0.15, 'sine', 0.35, i * 0.08));
};

// 🔔 Notification — soft ding
export const playNotification = () => {
  playTone(880, 0.1, 'sine', 0.25);
  playTone(1109, 0.2, 'sine', 0.2, 0.1);
};

// 📚 Course complete — grand finale
export const playCourseComplete = () => {
  const melody = [523, 659, 784, 659, 784, 1047, 784, 1047, 1319];
  melody.forEach((f, i) => playTone(f, 0.18, 'sine', 0.5, i * 0.15));
};

// ── Master sound dispatcher ──────────────────────────────────
const SOUND_MAP = {
  correct:       playCorrect,
  wrong:         playWrong,
  perfectScore:  playPerfectScore,
  levelUp:       playLevelUp,
  badge:         playBadge,
  coin:          playCoin,
  streak:        playStreak,
  notification:  playNotification,
  courseComplete:playCourseComplete,
};

// Play a sound by name
export const playSound = (soundName) => {
  const fn = SOUND_MAP[soundName];
  if (fn) fn();
};

// ── Global event listener setup ─────────────────────────────
// Call this once in a provider to enable all sounds globally
export const initSoundSystem = () => {
  if (typeof window === 'undefined') return;

  // Listen for play-sound custom events dispatched anywhere in app
  window.addEventListener('play-sound', (e) => {
    const { sound } = e.detail || {};
    if (sound) playSound(sound);
  });

  // Warm up AudioContext on first user interaction
  const warmUp = () => {
    getCtx();
    window.removeEventListener('click', warmUp);
    window.removeEventListener('keydown', warmUp);
    window.removeEventListener('touchstart', warmUp);
  };
  window.addEventListener('click', warmUp, { once: true });
  window.addEventListener('keydown', warmUp, { once: true });
  window.addEventListener('touchstart', warmUp, { once: true });
};

export default { playSound, initSoundSystem, SOUND_MAP };
