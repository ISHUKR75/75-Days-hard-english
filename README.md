# 75 Days Hard English 🚀

> **World's Most Advanced English Learning Platform for Hindi-Speaking Indians**  
> Zero to Fluency in 75 Days — Gamified, Structured, Free Forever

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## ✨ What is 75 Days Hard English?

A **75-day structured English learning challenge** that takes Hindi-speaking students from zero to professional fluency. Inspired by the discipline of "75 Hard" — every day, a new topic, a new skill, 500+ practice questions.

Think **Duolingo** but built specifically for India — with Hindi explanations, IPA pronunciation, CEFR-aligned levels, and a gamification system that makes learning addictive.

---

## 🎯 Key Features

| Feature | Description |
|---|---|
| 📅 **75-Day Curriculum** | Day 1 to Day 75 — Grammar, Vocabulary, Speaking, Writing, Professional |
| 🎮 **Gamification** | XP, coins, streaks, badges, leaderboard — learning is fun |
| 🤖 **AI Tutor** | Ask any question in Hindi or English — instant answers |
| 📊 **Analytics Dashboard** | Progress graphs, heatmaps, weak-area detection |
| 🧪 **5000+ Questions** | 500–1000 practice questions per topic, with hidden answers |
| 📖 **10,000+ Vocabulary** | IPA, synonyms, antonyms, Hindi meaning, example sentences |
| 🔊 **Pronunciation Lab** | IPA-based phonetic training, native-speed audio |
| 💼 **Professional English** | Emails, presentations, interviews, office communication |
| 🧠 **Brain Training** | Memory games, word-match, speed vocab, error hunt |
| 🎤 **Speaking Practice** | Roleplay scenarios, AI conversation partner |
| 🌙 **Dark Mode First** | Beautiful dark-mode-first design, fully responsive |
| 📱 **PWA Ready** | Install on mobile, works offline |

---

## 📚 75-Day Curriculum Overview

| Days | Theme | Topics |
|---|---|---|
| 1–10 | **Foundation** | Be Verb, Has/Have, Basic Sentences, Pronouns |
| 11–20 | **Basic Modals** | Want, Let, Can, Should, May, Must |
| 21–31 | **Advanced Modals** | Could Have, Should Have, Would Have |
| 32–50 | **All Tenses & Voice** | 12 Tenses, Passive Voice, Reported Speech |
| 51–68 | **Vocabulary & Idioms** | Phrasal Verbs, Idioms, 10,000+ Words |
| 69–75 | **Professional & Revision** | Writing, Presentations, Final Test |

Each day follows a fixed learning structure:
1. **Concept & Theory** — Hindi + English explanation
2. **Real-Life Examples** — Relatable Indian contexts
3. **Common Mistakes** — What students get wrong
4. **Vocabulary** — 500+ words with IPA and Hindi meaning
5. **Practice Questions** — 500–1000 translation drills
6. **Speaking Practice** — Pronunciation and conversation
7. **Writing Exercise** — Essays, emails, paragraphs
8. **Mini Test** — 20 randomized questions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS 3 + custom design tokens |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **State** | Zustand (persistent) |
| **UI Components** | Radix UI primitives |
| **Toasts** | React Hot Toast |
| **Theme** | next-themes (dark mode default) |
| **Fonts** | Inter (Google Fonts) |
| **PWA** | manifest.json + service worker ready |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ISHUKR75/75-Days-hard-english.git
cd 75-Days-hard-english

# Install dependencies
npm install

# Start the development server (port 5000)
npm run dev

# Build for production
npm run build
npm start
```

Open `http://localhost:5000` in your browser.

---

## 📁 Project Structure

```
75-Days-hard-english/
├── app/
│   ├── (auth)/              # Login, Register pages
│   ├── (main)/              # Dashboard, Topics, Practice, etc.
│   │   ├── dashboard/
│   │   ├── 75-days-challenge/
│   │   ├── analytics/
│   │   ├── assessment/
│   │   ├── ai-tutor/
│   │   ├── vocabulary/
│   │   ├── leaderboard/
│   │   ├── achievements/
│   │   ├── brain-training/
│   │   ├── speaking/
│   │   ├── progress/
│   │   └── profile/
│   ├── globals.css           # Full design system + Tailwind
│   ├── layout.js             # Root layout
│   └── page.js              # Landing page
├── components/
│   ├── layout/
│   │   ├── Navbar.js         # Top navigation
│   │   └── Sidebar.js        # Left sidebar
│   └── ui/
│       ├── Button.js
│       ├── Badge.js
│       ├── ProgressBar.js
│       └── StatCard.js
├── lib/
│   └── topics.js             # Complete 75-day topic list
├── store/
│   ├── userStore.js          # Zustand: XP, coins, streak, level
│   └── progressStore.js      # Zustand: per-topic progress, heatmap
├── providers/
│   └── Providers.js          # ThemeProvider + Toast
├── data/topics/              # Per-topic JSON data (expandable)
├── public/
│   └── manifest.json         # PWA manifest
├── tailwind.config.js        # Full custom design system
└── next.config.mjs           # Next.js config
```

---

## 🎨 Design System

The platform uses a custom design system built on top of Tailwind CSS:

- **Primary Palette**: Indigo/Violet (`#6366f1` → `#d946ef`)
- **Surface Palette**: Slate grays (`surface-800` to `surface-950`)
- **Accent (Success)**: Emerald green
- **Warning**: Amber/Orange
- **Danger**: Rose/Red
- **Custom Animations**: fadeUp, float, glow, shimmer, streakFire, xpGain

---

## 🤝 Contributing

This is an open-source project! Contributions welcome:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/add-topic-data`)
3. Fill in topic data in `data/topics/` JSON files
4. Submit a Pull Request

**Most needed contributions:**
- Topic data (500+ questions per topic) in `data/topics/`
- Vocabulary word lists with IPA and examples
- Audio pronunciation files in `public/audio/`
- Translations and Hindi content improvements

---

## 📄 License

MIT License — Free to use, modify, and distribute.

---

## 💙 Built for India

> "English sikhna ab mushkil nahi. 75 din mein — guaranteed."

Made with ❤️ for every Indian who dreams of speaking English fluently.

---

*If this project helped you, please ⭐ star the repository!*
