'use client';
// ============================================================
// SETTINGS PAGE — App preferences, notifications, appearance
// Features: Profile settings, notifications, learning prefs,
// audio, accessibility, data management
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Bell, Volume2, Moon, Globe, Shield,
  Trash2, Download, RefreshCw, ChevronRight, Check,
  Mic, Clock, BookOpen, Zap, Target, Brain, User,
  Smartphone, Monitor, Eye, Palette, Save, AlertTriangle,
} from 'lucide-react';
import { useGamificationStore } from '@/store/useGamificationStore';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

// ── Toggle Switch ─────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-gradient-to-r from-primary-500 to-secondary-500' : 'bg-white/10'}`}
    >
      <motion.div
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        animate={{ left: checked ? '28px' : '4px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </button>
  );
}

// ── Select Option ─────────────────────────────────────────────
function SelectOption({ label, options, value, onChange, icon: Icon }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/6">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-slate-400" />
        <p className="text-sm text-slate-300">{label}</p>
      </div>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-white/8 border border-white/10 text-sm text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary-500/50 cursor-pointer"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-slate-800">{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// ── Toggle Row ────────────────────────────────────────────────
function ToggleRow({ label, desc, value, onChange, icon: Icon }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/6">
      <div className="flex items-start gap-3 flex-1">
        {Icon && <Icon size={16} className="text-slate-400 mt-0.5 shrink-0" />}
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          {desc && <p className="text-xs text-slate-600 mt-0.5">{desc}</p>}
        </div>
      </div>
      <Toggle checked={value} onChange={onChange} />
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────
function Section({ title, icon: Icon, children, color = 'text-slate-400', bg = 'bg-white/5' }) {
  return (
    <motion.div variants={fadeUp} className="card p-6 mb-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/8">
        <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon size={16} className={color} />
        </div>
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function SettingsPage() {
  // Notification settings
  const [notifStreak,    setNotifStreak]    = useState(true);
  const [notifReminder,  setNotifReminder]  = useState(true);
  const [notifAchieve,   setNotifAchieve]   = useState(true);
  const [notifLeaderboard, setNotifLeaderboard] = useState(false);
  const [notifEmail,     setNotifEmail]     = useState(false);

  // Learning preferences
  const [dailyGoal,     setDailyGoal]     = useState('20');
  const [diffMode,      setDiffMode]      = useState('auto');
  const [cefrTarget,    setCefrTarget]    = useState('B2');
  const [studyTime,     setStudyTime]     = useState('morning');
  const [hintMode,      setHintMode]      = useState(true);
  const [autoReveal,    setAutoReveal]    = useState(false);
  const [showIPA,       setShowIPA]       = useState(true);
  const [showHindi,     setShowHindi]     = useState(true);

  // Audio settings
  const [soundEffects,  setSoundEffects]  = useState(true);
  const [correctSound,  setCorrectSound]  = useState(true);
  const [wrongSound,    setWrongSound]    = useState(true);
  const [bgMusic,       setBgMusic]       = useState(false);
  const [voiceAccent,   setVoiceAccent]   = useState('british');

  // Appearance
  const [theme,         setTheme]         = useState('dark');
  const [fontSize,      setFontSize]      = useState('medium');
  const [animations,    setAnimations]    = useState(true);
  const [compactMode,   setCompactMode]   = useState(false);
  const [colorScheme,   setColorScheme]   = useState('indigo');

  // Privacy
  const [analyticsOpt,  setAnalyticsOpt]  = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showLeader,    setShowLeader]    = useState(true);

  const [saved, setSaved] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const { resetProgress } = useGamificationStore();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header ──────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
              <Settings size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">Settings</h1>
              <p className="text-slate-400 text-sm">Customize your learning experience</p>
            </div>
          </div>
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 text-sm px-6 py-2.5 rounded-xl font-semibold transition-all ${saved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'btn-primary'}`}
          >
            {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Settings</>}
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-2xl">

        {/* ── Learning Preferences ─────────────────────── */}
        <Section title="Learning Preferences" icon={BookOpen} color="text-indigo-400" bg="bg-indigo-500/10">
          <SelectOption label="Daily XP Goal" icon={Target} value={dailyGoal} onChange={setDailyGoal} options={[
            { value: '10',  label: '10 XP / day (Casual)' },
            { value: '20',  label: '20 XP / day (Regular)' },
            { value: '50',  label: '50 XP / day (Serious)' },
            { value: '100', label: '100 XP / day (Hardcore)' },
          ]} />
          <SelectOption label="Difficulty Mode" icon={Brain} value={diffMode} onChange={setDiffMode} options={[
            { value: 'auto',         label: 'Auto (Adaptive)'     },
            { value: 'beginner',     label: 'Beginner — Easy'     },
            { value: 'intermediate', label: 'Intermediate'        },
            { value: 'advanced',     label: 'Advanced — Hard'     },
          ]} />
          <SelectOption label="Target CEFR Level" icon={Zap} value={cefrTarget} onChange={setCefrTarget} options={[
            { value: 'A2', label: 'A2 — Elementary'         },
            { value: 'B1', label: 'B1 — Intermediate'       },
            { value: 'B2', label: 'B2 — Upper Intermediate' },
            { value: 'C1', label: 'C1 — Advanced'           },
          ]} />
          <SelectOption label="Best Study Time" icon={Clock} value={studyTime} onChange={setStudyTime} options={[
            { value: 'morning',   label: '🌅 Morning (6–9 AM)'   },
            { value: 'afternoon', label: '☀️ Afternoon (12–3 PM)' },
            { value: 'evening',   label: '🌆 Evening (6–9 PM)'   },
            { value: 'night',     label: '🌙 Night (9 PM–12 AM)' },
          ]} />
          <ToggleRow label="Show Hints" desc="Show hint button during practice questions" icon={Brain} value={hintMode} onChange={setHintMode} />
          <ToggleRow label="Auto-Reveal Answer" desc="Automatically show answer after 3 wrong attempts" icon={Eye} value={autoReveal} onChange={setAutoReveal} />
          <ToggleRow label="Show IPA Pronunciation" desc="Display IPA symbols alongside vocabulary words" icon={Volume2} value={showIPA} onChange={setShowIPA} />
          <ToggleRow label="Show Hindi Translations" desc="Display Hindi meaning for English words" icon={Globe} value={showHindi} onChange={setShowHindi} />
        </Section>

        {/* ── Notifications ───────────────────────────────── */}
        <Section title="Notifications" icon={Bell} color="text-amber-400" bg="bg-amber-500/10">
          <ToggleRow label="Daily Streak Reminder" desc="Get a reminder to practice and maintain your streak" icon={Bell} value={notifStreak} onChange={setNotifStreak} />
          <ToggleRow label="Study Reminder" desc="Custom reminder at your preferred study time" icon={Clock} value={notifReminder} onChange={setNotifReminder} />
          <ToggleRow label="Achievement Alerts" desc="Know when you unlock a new badge or milestone" icon={Zap} value={notifAchieve} onChange={setNotifAchieve} />
          <ToggleRow label="Leaderboard Updates" desc="Know when your rank changes on the leaderboard" icon={Target} value={notifLeaderboard} onChange={setNotifLeaderboard} />
          <ToggleRow label="Email Newsletter" desc="Weekly tips and English learning resources" icon={Globe} value={notifEmail} onChange={setNotifEmail} />
        </Section>

        {/* ── Audio ─────────────────────────────────────── */}
        <Section title="Audio & Sound" icon={Volume2} color="text-cyan-400" bg="bg-cyan-500/10">
          <ToggleRow label="Sound Effects" desc="Play sounds during practice (correct/wrong)" icon={Volume2} value={soundEffects} onChange={setSoundEffects} />
          <ToggleRow label="Correct Answer Sound" desc="Play a chime when you get an answer right" icon={Mic} value={correctSound} onChange={setCorrectSound} />
          <ToggleRow label="Wrong Answer Sound" desc="Play a buzzer when you get an answer wrong" icon={Mic} value={wrongSound} onChange={setWrongSound} />
          <ToggleRow label="Background Music" desc="Soft focus music during study sessions" icon={Volume2} value={bgMusic} onChange={setBgMusic} />
          <SelectOption label="Voice Accent" icon={Globe} value={voiceAccent} onChange={setVoiceAccent} options={[
            { value: 'british',   label: '🇬🇧 British English'   },
            { value: 'american',  label: '🇺🇸 American English'  },
            { value: 'australian',label: '🇦🇺 Australian English' },
            { value: 'indian',    label: '🇮🇳 Indian English'    },
          ]} />
        </Section>

        {/* ── Appearance ──────────────────────────────────── */}
        <Section title="Appearance" icon={Palette} color="text-rose-400" bg="bg-rose-500/10">
          <SelectOption label="Theme" icon={Moon} value={theme} onChange={setTheme} options={[
            { value: 'dark',  label: '🌙 Dark Mode (Default)' },
            { value: 'light', label: '☀️ Light Mode'          },
            { value: 'auto',  label: '🔄 System Default'      },
          ]} />
          <SelectOption label="Font Size" icon={Eye} value={fontSize} onChange={setFontSize} options={[
            { value: 'small',  label: 'Small'  },
            { value: 'medium', label: 'Medium (Default)' },
            { value: 'large',  label: 'Large'  },
          ]} />
          <SelectOption label="Color Scheme" icon={Palette} value={colorScheme} onChange={setColorScheme} options={[
            { value: 'indigo', label: '💜 Indigo (Default)' },
            { value: 'blue',   label: '🔵 Blue'            },
            { value: 'emerald',label: '💚 Emerald'         },
            { value: 'rose',   label: '🌹 Rose'            },
          ]} />
          <ToggleRow label="Animations" desc="Enable smooth transitions and animations" icon={Zap} value={animations} onChange={setAnimations} />
          <ToggleRow label="Compact Mode" desc="Show more content on screen with smaller spacing" icon={Monitor} value={compactMode} onChange={setCompactMode} />
        </Section>

        {/* ── Privacy ─────────────────────────────────────── */}
        <Section title="Privacy & Data" icon={Shield} color="text-emerald-400" bg="bg-emerald-500/10">
          <ToggleRow label="Analytics" desc="Help improve the app by sharing anonymous usage data" icon={BarChart2} value={analyticsOpt} onChange={setAnalyticsOpt} />
          <ToggleRow label="Public Profile" desc="Allow other learners to see your profile" icon={User} value={publicProfile} onChange={setPublicProfile} />
          <ToggleRow label="Show on Leaderboard" desc="Appear on the weekly and monthly leaderboard" icon={Target} value={showLeader} onChange={setShowLeader} />

          {/* Export Data */}
          <div className="flex items-center justify-between py-4 border-b border-white/6">
            <div className="flex items-center gap-3">
              <Download size={16} className="text-slate-400" />
              <div>
                <p className="text-sm text-slate-300">Export My Data</p>
                <p className="text-xs text-slate-600">Download all your progress as a JSON file</p>
              </div>
            </div>
            <button className="text-xs text-slate-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5">
              <Download size={12} /> Export
            </button>
          </div>

          {/* Reset Progress */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Trash2 size={16} className="text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-rose-400">Reset All Progress</p>
                  <p className="text-xs text-slate-600">This permanently deletes all XP, streaks, and history</p>
                </div>
              </div>
              <button
                onClick={() => setResetConfirm(true)}
                className="text-xs text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/40 px-3 py-1.5 rounded-lg transition-all"
              >
                Reset
              </button>
            </div>

            {resetConfirm && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-4 bg-rose-500/10 border border-rose-500/25 rounded-xl"
              >
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-300">Are you absolutely sure? This action CANNOT be undone. All XP, streaks, badges, and progress will be permanently lost.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { resetProgress?.(); setResetConfirm(false); }} className="text-xs bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors">
                    Yes, Reset Everything
                  </button>
                  <button onClick={() => setResetConfirm(false)} className="text-xs text-slate-400 hover:text-white px-4 py-2 rounded-lg border border-white/10 transition-colors">
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </Section>

        {/* ── Save Button ──────────────────────────────────── */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${saved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'btn-gradient'}`}
        >
          {saved ? '✅ Settings Saved!' : '💾 Save All Settings'}
        </motion.button>
      </motion.div>
    </div>
  );
}

