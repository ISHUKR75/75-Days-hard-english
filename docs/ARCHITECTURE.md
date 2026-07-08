# Platform Architecture

## Data-Driven Content Engine

The 75 Days Hard English Course uses a Data-Driven Content Engine. Instead of hard-coding lessons into `.js` files (which would lead to unmaintainable 50,000-line files), the platform separates the **User Interface (UI)** from the **Educational Content**.

### Core Philosophy
1. **Dynamic Routing:** A single Next.js route template (e.g., `app/(main)/topics/[category]/[slug]/page.js`) is responsible for rendering all topic pages.
2. **JSON/MDX Data Store:** All grammar rules, vocabulary words, translation questions, and test exercises are stored in structured `.json` or `.mdx` files within the `data/` directory.
3. **Modular Expansion:** To add a new lesson, you simply add a new JSON object to the respective category file. The platform automatically generates the URL, the curriculum page, the practice tests, and the final quizzes.

### System Architecture Breakdown

#### 1. The Rendering Layer (`app/`)
- Utilizes **Next.js 16 App Router**.
- **Server Components** fetch the structured data from the filesystem (`data/`).
- Passes data to **Client Components** which handle the interactive gamification (XP, sounds, animations).

#### 2. The Content Layer (`data/`)
- `data/topics/`: Contains all grammar and vocabulary topics, sequenced by day.
- `data/vocabulary/`: Centralized dictionary with IPA, audio, and translations.
- `data/practice/`: The raw Hindi-to-English translation questions (500-1000 per topic).
- `data/gamification/`: Badges, levels, and XP rules.

#### 3. The Interactive Engine (`components/practice/`)
- **TranslationEngine.jsx:** Handles the core learning loop.
  - Takes a Hindi string.
  - Provides a controlled `<input>`.
  - On submit, normalizes the string (removes case, punctuation) and checks against valid answers.
  - Triggers `useGamificationSounds()` and updates `useProgressStore()`.

#### 4. The Analytics Engine (`store/`)
- Uses **Zustand** with `persist` middleware to save progress in `localStorage`.
- Tracks `questionsAttempted`, `correctAnswers`, `streak`, `coins`, and `xp`.
- The Analytics Dashboard (`app/(main)/dashboard/analytics/page.js`) reads this store to generate Heatmaps and Recharts line graphs.

### Animation & UI
- **Tailwind CSS:** Used for all layout, spacing, and colors. Heavily relies on dark mode and glassmorphism.
- **Framer Motion (`framer-motion`):** Used for layout transitions, success micro-interactions (bouncing checkmarks), and modal popups.
- **use-sound:** Triggers local audio files (`public/sounds/`) for instant feedback.

## Why this Architecture?
If we created a unique React component for every one of the 10,000 vocabulary words and 500+ topics, the bundle size would be massive, and updating a simple grammar rule would require a code deployment. By using a Data-Driven Engine, we can effortlessly scale to 100,000+ words while keeping the app bundle under 200KB.
