/**
 * Sound Constants - File paths and configuration for the sound system
 */

export const SOUND_FILES = {
  correct:        '/sounds/correct.mp3',
  wrong:          '/sounds/wrong.mp3',
  perfectScore:   '/sounds/perfect-score.mp3',
  levelUp:        '/sounds/level-up.mp3',
  complete:       '/sounds/complete.mp3',
  click:          '/sounds/click.mp3',
  coin:           '/sounds/coin.mp3',
  achievement:    '/sounds/achievement.mp3',
  badge:          '/sounds/badge.mp3',
  streak:         '/sounds/streak.mp3',
  notification:   '/sounds/notification.mp3',
  chime:          '/sounds/chime.mp3',
  ding:           '/sounds/ding.mp3',
  pop:            '/sounds/pop.mp3',
  swoosh:         '/sounds/swoosh.mp3',
  whoosh:         '/sounds/whoosh.mp3',
  xp:             '/sounds/xp.mp3',
  applause:       '/sounds/applause.mp3',
  celebration:    '/sounds/celebration.mp3',
  unlock:         '/sounds/unlock.mp3',
  countdownTick:  '/sounds/countdown-tick.mp3',
  countdownEnd:   '/sounds/countdown-end.mp3',
  timerWarning:   '/sounds/timer-warning.mp3',
  pageFlip:       '/sounds/page-flip.mp3',
  hover:          '/sounds/hover.mp3',
  combo:          '/sounds/combo.mp3',
  typing:         '/sounds/typing.mp3',
  dailyCheckin:   '/sounds/daily-checkin.mp3',
};

export const SOUND_CONFIG = {
  defaultVolume: 0.5,
  correctVolume: 0.6,
  wrongVolume:   0.5,
  uiVolume:      0.3,
  musicVolume:   0.2,
};

/** Map of event names to sound keys — used by the global dispatcher */
export const SOUND_EVENT_MAP = {
  'correct':      'correct',
  'wrong':        'wrong',
  'perfectScore': 'perfectScore',
  'levelUp':      'levelUp',
  'complete':     'complete',
  'click':        'click',
  'coin':         'coin',
  'achievement':  'achievement',
  'badge':        'badge',
  'streak':       'streak',
};

export default SOUND_FILES;
