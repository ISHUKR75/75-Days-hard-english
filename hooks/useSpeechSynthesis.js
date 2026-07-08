/**
 * useSpeechSynthesis - Text-to-speech hook using the Web Speech API
 * SSR safe — all window/speechSynthesis access is guarded
 */
import { useState, useEffect, useRef, useCallback } from 'react';

const isSupported =
  typeof window !== 'undefined' && 'speechSynthesis' in window;

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1);
  const utteranceRef = useRef(null);

  // Load voices (they load asynchronously in most browsers)
  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);

      // Auto-select the best English voice
      const preferred = available.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') || v.name.includes('Natural') || v.default)
      ) || available.find((v) => v.lang.startsWith('en'));

      if (preferred) setSelectedVoice(preferred);
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, []);

  /**
   * Speak text aloud
   * @param {string} text
   * @param {object} options - { voice, rate, pitch, onEnd }
   */
  const speak = useCallback(
    (text, options = {}) => {
      if (!isSupported || !text) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = options.voice || selectedVoice;
      utterance.rate = options.rate ?? rate;
      utterance.pitch = options.pitch ?? pitch;
      utterance.lang = 'en-US';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (options.onEnd) options.onEnd();
      };
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice, rate, pitch]
  );

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const setVoice = useCallback((voice) => setSelectedVoice(voice), []);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    voices,
    setVoice,
    setRate,
    setPitch,
  };
}

export default useSpeechSynthesis;
