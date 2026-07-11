# 75 Days Hard English

The World's Most Advanced Hindi→English Learning Platform. Built with **Next.js 16** (App Router + Turbopack) · **React 19** · **Tailwind CSS** · **Framer Motion** · **Zustand** (persisted state).

---

## Run & Operate

```bash
npm install --legacy-peer-deps   # required — eslint peer-dep conflict
npm run dev                      # dev server on port 5000 (0.0.0.0)
npm run build                    # production build (uses webpack, not turbopack)
npm run start                    # production server on port 5000
```

## Architecture

| Area | Path | Notes |
|------|------|-------|
| Day pages | `app/(main)/75-days-challenge/[day]/page.js` | 6,272-line unified day page — 20 sections per day |
| Day API | `app/api/challenge/[day]/route.js` | Returns all JSON data files for a day |
| Day data | `data/challenge/day-01/` through `day-75/` | JSON content files per day |
| Dashboard | `app/(main)/dashboard/page.js` | Real data from Zustand stores |
| Gamification | `store/useGamificationStore.js` | XP, coins, levels, badges, streaks — persisted |
| Progress | `store/progressStore.js` | Per-topic question accuracy |

## Day 1 — Fully Complete (reference implementation)

`data/challenge/day-01/` contains all content files:
- `vocabulary.json` — **1,000 words** (IPA, Hindi, synonyms, 6 example sentences each)
- `practice-questions.json` — **1,400 Hindi→English questions** (easy/medium/hard, categorised)
- `daily-test.json` — **400 MCQ test questions** (timed, auto-graded)
- `flashcards.json` — **500 flashcards** (spaced-repetition flip cards)
- `dialogue.json` — **10 real dialogues** (role-play, Hindi toggle, comprehension Qs)
- `story.json` — story with grammar highlights + comprehension MCQ
- `essay.json` — model essay with structure guide + write-your-own tab
- `common-mistakes.json` — **50 common errors** (wrong→correct + quiz)
- `memory-tricks.json` — **30 mnemonics** (visual/acronym/rhyme tricks)
- `conversation-practice.json` — daily & office conversation scenarios
- `lessons.json`, `grammar-theory.json`, `overview.json`, `revision.json`, etc.

## 20 Sections Per Day Page

1. Overview & Why It Matters
2. Concept & Theory
3. **Common Mistakes & Error Fix** ← new
4. **Memory Tricks & Mnemonics** ← new
5. Vocabulary — 1000 Words
6. **Flashcards — Spaced Repetition** ← new
7. Interactive Practice (Hindi→English)
8. **Dialogue Practice** ← new
9. **Daily & Office Conversation** ← new
10. Speaking & Pronunciation
11. Writing Drills
12. Listening Practice
13. Reading Comprehension
14. **Story & Comprehension** ← new
15. **Essay Writing** ← new
16. Daily Study Plan
17. Revision & Quick Quiz
18. Final Mock Test (20/40/60/80/100% selector)
19. Milestones & Badges
20. Today's Challenge Task

## 75 Git Branches (Team Structure)

Each day has a dedicated local branch for its team member:
- `day-01` through `day-75` — 75 branches total
- Each branch: isolated work for that day's content + features
- Merge to `main` when day is complete and approved

## User Preferences

- **Never delete or remove any existing files/folders** — only add new ones.
- Full site content for all 75 days needed incrementally (Day 1 is the reference).
- `npm install --legacy-peer-deps` always (not pnpm, not yarn).
- All pages must be fully responsive (mobile → desktop).
- Modern, animated, professional UI throughout.
- Real data everywhere — no mocked/placeholder data in live sections.
- 20/40/60/80/100% session-size picker for both practice and test sections.
- Comments on every file and key logic blocks.
