'use client';
import { Settings, Bell, Sun, Moon, Globe, Target, Volume2, Zap } from 'lucide-react';
import useUserStore from '@/store/userStore';

export default function SettingsPage() {
  const { settings, updateSettings, dailyGoal, updateDailyGoal } = useUserStore();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><Settings size={28} className="text-primary-400" /> Settings</h1>
        <p className="text-slate-500">Customize your learning experience.</p>
      </div>

      {/* Appearance */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Sun size={16} className="text-amber-400" /> Appearance</h3>
        <div className="flex items-center justify-between py-3 border-b border-white/5">
          <div>
            <p className="text-sm font-semibold text-slate-300">Dark Mode</p>
            <p className="text-xs text-slate-500">Default: On</p>
          </div>
          <button onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className={`relative w-11 h-6 rounded-full transition-all ${settings.darkMode ? 'bg-primary-500' : 'bg-white/15'}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${settings.darkMode ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-semibold text-slate-300">Sound Effects</p>
            <p className="text-xs text-slate-500">Correct/wrong answer sounds</p>
          </div>
          <button onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className={`relative w-11 h-6 rounded-full transition-all ${settings.soundEnabled ? 'bg-primary-500' : 'bg-white/15'}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${settings.soundEnabled ? 'right-0.5' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Daily Goal */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Target size={16} className="text-emerald-400" /> Daily Goal</h3>
        <p className="text-sm text-slate-400 mb-4">How many minutes do you want to study per day?</p>
        <div className="flex gap-3 flex-wrap">
          {[15, 20, 30, 45, 60].map((mins) => (
            <button key={mins}
              onClick={() => updateDailyGoal(mins)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${dailyGoal === mins ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'bg-white/5 text-slate-400 border border-white/8 hover:text-white'}`}>
              {mins} min
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-5">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Bell size={16} className="text-primary-400" /> Notifications</h3>
        {[
          { key: 'dailyReminder',   label: 'Daily Study Reminder',   desc: 'Remind me to study every day' },
          { key: 'streakWarning',   label: 'Streak Warning',         desc: 'Alert before streak breaks' },
          { key: 'weeklyReport',    label: 'Weekly Progress Report', desc: 'Sunday summary email' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-none">
            <div>
              <p className="text-sm font-semibold text-slate-300">{label}</p>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <button onClick={() => updateSettings({ [key]: !settings[key] })}
              className={`relative w-11 h-6 rounded-full transition-all ${settings[key] ? 'bg-primary-500' : 'bg-white/15'}`}>
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${settings[key] ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
