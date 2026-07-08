/**
 * Settings Store - App-wide user preferences and configuration
 * Uses Zustand with localStorage persistence
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      // ─── Appearance ───────────────────────────────────────────
      /** 'dark' | 'light' | 'system' */
      theme: 'dark',
      /** Font size: 'small' | 'medium' | 'large' */
      fontSize: 'medium',
      /** Whether to show animations */
      animationsEnabled: true,

      // ─── Language & Locale ────────────────────────────────────
      /** App UI language: 'en' | 'hi' */
      language: 'hi',
      /** Whether to show Hindi translations */
      showHindiTranslations: true,

      // ─── Daily Goal & Reminders ───────────────────────────────
      /** Daily study goal in minutes */
      dailyGoal: 30,
      /** Whether daily reminders are enabled */
      remindersEnabled: true,
      /** Reminder time in HH:MM format */
      reminderTime: '20:00',

      // ─── Notifications ────────────────────────────────────────
      /** Whether push notifications are enabled */
      notificationsEnabled: true,
      /** Receive streak reminder notifications */
      streakReminders: true,
      /** Receive achievement notifications */
      achievementNotifications: true,

      // ─── Learning Preferences ─────────────────────────────────
      /** Auto-advance after correct answer */
      autoAdvance: false,
      /** Auto-advance delay in ms */
      autoAdvanceDelay: 1500,
      /** Show correct answer after wrong attempt */
      showAnswerAfterWrong: true,
      /** Number of questions per quiz session */
      questionsPerSession: 10,
      /** Quiz time limit per question in seconds (0 = no limit) */
      quizTimeLimit: 0,
      /** Whether to shuffle question options */
      shuffleOptions: true,

      // ─── Accessibility ────────────────────────────────────────
      /** Reduce motion for accessibility */
      reduceMotion: false,
      /** High contrast mode */
      highContrast: false,

      // ─── Actions ──────────────────────────────────────────────

      /** Update a single setting by key */
      setSetting: (key, value) => set({ [key]: value }),

      /** Update multiple settings at once */
      updateSettings: (updates) => set((state) => ({ ...state, ...updates })),

      /** Toggle a boolean setting */
      toggleSetting: (key) => set((state) => ({ [key]: !state[key] })),

      /** Reset all settings to defaults */
      resetSettings: () =>
        set({
          theme: 'dark',
          fontSize: 'medium',
          animationsEnabled: true,
          language: 'hi',
          showHindiTranslations: true,
          dailyGoal: 30,
          remindersEnabled: true,
          reminderTime: '20:00',
          notificationsEnabled: true,
          streakReminders: true,
          achievementNotifications: true,
          autoAdvance: false,
          autoAdvanceDelay: 1500,
          showAnswerAfterWrong: true,
          questionsPerSession: 10,
          quizTimeLimit: 0,
          shuffleOptions: true,
          reduceMotion: false,
          highContrast: false,
        }),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
    }
  )
);

export default useSettingsStore;
