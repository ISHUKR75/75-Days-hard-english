/**
 * useSound - Sound effects wrapper hook
 * Wraps lib/sounds.js and respects the user's soundEnabled setting
 */
import { useCallback } from 'react';
import useUserStore from '@/store/userStore';
import {
  playCorrect as _playCorrect,
  playWrong as _playWrong,
  playLevelUp as _playLevelUp,
  playCoin as _playCoin,
  playAchievement as _playAchievement,
  playPerfectScore as _playPerfectScore,
} from '@/lib/sounds';

export function useSound() {
  const soundEnabled = useUserStore((s) => s.settings?.soundEnabled ?? true);
  const updateSettings = useUserStore((s) => s.updateSettings);

  const guard = useCallback(
    (fn) => () => {
      if (soundEnabled) fn();
    },
    [soundEnabled]
  );

  const toggleMute = useCallback(() => {
    if (typeof updateSettings === 'function') {
      updateSettings({ soundEnabled: !soundEnabled });
    }
  }, [updateSettings, soundEnabled]);

  return {
    playCorrect: guard(_playCorrect),
    playWrong: guard(_playWrong),
    playLevelUp: guard(_playLevelUp),
    playCoin: guard(_playCoin),
    playAchievement: guard(_playAchievement),
    playPerfectScore: guard(_playPerfectScore),
    isMuted: !soundEnabled,
    toggleMute,
  };
}

export default useSound;
