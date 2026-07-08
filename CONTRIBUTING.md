# Contributing to the 75 Days Hard English Course Platform

First off, thank you for considering contributing to this project! It's contributors like you that make the open-source community an amazing place to learn, inspire, and create.

This guide outlines the development workflow, project architecture, and coding standards.

---

## 🛠️ Local Development Setup

To run the platform locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ISHUKR75/75-Days-hard-english.git
   cd 75-Days-hard-english
   ```

2. **Install dependencies:**
   We use `npm` for managing packages. Ensure you have Node.js 18+ installed.
   ```bash
   npm install
   ```

3. **Start the development server:**
   The development server starts on port `5000`:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5000](http://localhost:5000) in your browser.

4. **Lint your code:**
   ```bash
   npm run lint
   ```

5. **Build the production bundle:**
   ```bash
   npm run build
   ```

---

## 📂 Code Architecture

This is a Next.js App Router project structured for extreme modularity and scalability:

```
├── app/                      # Next.js App Router (Layouts and Pages)
│   ├── (main)/               # Core learning interface
│   │   ├── curriculum/       # 75 Days Grid & Curriculum
│   │   ├── practice/         # Practice routes (/practice/day-[day])
│   │   ├── test/             # Test routes (/test/day-[day])
│   │   ├── vocabulary/       # Vocabulary routes & flashcard trainer
│   │   └── speaking/         # Speech Lab and recording shadow rooms
│   └── page.js               # Landing page
├── components/               # Shared UI Components
│   ├── quiz/                 # PracticeQuiz component
│   └── ui/                   # Generic components (avatar, dialog, etc.)
├── lib/                      # Static Data & Helpers
│   ├── topics.js             # Curriculum Days definition (1-75)
│   ├── practiceData.js       # Complete Practice & Test question bank
│   └── grammarContent.js     # Grammatical rules, guides, and lessons
├── store/                    # Zustand persistent stores
│   ├── userStore.js          # Gamification data (XP, Coins, Streaks, Level)
│   └── progressStore.js      # Detailed lesson & topic progress maps
└── public/                   # Sounds, assets, and icons
```

---

## ✍️ Contribution Workflows

### 1. Adding a New Topic/Day to the Curriculum
The 75-day curriculum is defined in [topics.js](file:///lib/topics.js).
To add or update metadata for a day:
1. Locate `DAYS_75_TOPICS` in [topics.js](file:///lib/topics.js).
2. Edit or add the day object with its title, slug, CEFR level, difficulty, emoji, and color.

### 2. Adding Practice/Test Questions
Questions are parsed by day number from [practiceData.js](file:///lib/practiceData.js).
1. Add an entry into `PRACTICE_QUESTIONS` for the target day:
   ```javascript
   {
     id: 'q-d1-1',
     day: 1,
     hindi: 'वह हमेशा समय पर आता है।',
     english: 'He always comes on time.',
     alternatives: ['He is always on time', 'He comes on time always'],
     hint: 'Use the word "always" after the subject.',
     type: 'grammar'
   }
   ```

### 3. State Management
We use **Zustand** for state management. All stores are configured with automatic `localStorage` persistence.
- Do not introduce custom context providers unless there is a clear performance rationale.
- Maintain gamification rules: Correct practice answer = `+10 XP`, `+1 Coin`. Passed test = `+50 XP`.

---

## 🎨 Coding & Design Guidelines

- **Vanilla CSS + Tailwind CSS:** Use custom classes defined in global CSS files and standard Tailwind CSS classes. Keep styles highly consistent with our sleek dark glassmorphism aesthetic.
- **Framer Motion Animations:** All transition routes, modal toggles, card flips, and list additions must use smooth Framer Motion spring physical configurations. Avoid rigid CSS transitions.
- **No File Deletions:** In accordance with repository safety policies, never delete or remove core components or JSON data files. Only extend or add new modules.
- **Accessibility:** All interactive elements must contain meaningful `aria` attributes and support keyboard navigation (such as pressing `Enter` to submit quiz responses).

Thank you for contributing to the future of gamified English learning! 🚀
