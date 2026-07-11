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
- `vocabulary.json` — **1,184 words** across 36 categories (IPA, Hindi, synonyms, 6 example sentences each). Closed word classes (Numbers, Colors, Prepositions, Conjunctions, Pronouns, Question Words, Linking Verbs, Grammar) are grown to their realistic full inventory, not padded further — see "Vocabulary quantity targets" below.
- `practice-questions.json` — **9,896 Hindi→English questions** across 14 categories (easy/medium/hard, categorised per grammar topic)
- `daily-test.json` — **5,144 MCQ/true-false test questions** (timed, auto-graded; legacy 400 stay uncategorised, newer ones carry a `category` field aligned to practice categories)
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
5. Vocabulary — 1,184 Words
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
- All pages must be fully responsive (mobile → desktop, every device size).
- Modern, animated, professional UI throughout — target audience is Gen Z, so visuals/tone should feel current, not corporate.
- Course narration/copy tone must be friendly and encouraging, never robotic/dry.
- Real data everywhere — no mocked/placeholder data in live sections (dashboard, XP, progress must reflect actual user activity).
- 20/40/60/80/100% session-size picker for both practice and test sections, applied against the full question bank.
- Comments on every file and key logic blocks, written in simple English.
- Content quantity target is **per topic/subtopic**, not per day: ~900-1000 practice questions and ~300-400 test questions for each individual topic/subtopic (Hindi prompt, English answer, reveal-answer + case-insensitive auto-check).
- Each topic/subtopic should get its own explanation page (why it matters, concept, common errors, examples) taught before drills, plus a wrap-up "essay-style" recap page per topic.
- Preference for dedicated pages per section (not just tabs) with per-section progress tracking.
- Team workflow: 75 contributors, one per day, each pushing to their own `day-XX` branch, merged into `main` later — avoid changes that would create merge conflicts across unrelated day folders.
- File size: keep files organized/componentized per existing repo conventions — do not literally inflate single files to arbitrary huge line counts; prioritize completeness and correctness of content/features over line count.

## Vocabulary Quantity Targets — Closed vs. Open Word Classes

The aspirational "500-1000 words per category" target is only realistic for **open** word classes (Action Verbs, Common Nouns, Abstract Nouns, Descriptors, topic vocab like Business/Technology/Career, etc.) — English keeps coining new nouns/verbs/adjectives, so these can keep growing toward the target over time.

It is **not** linguistically possible for **closed** classes: Numbers, Colors, Prepositions, Conjunctions, Pronouns, Question Words, Linking Verbs, and core Grammar terms have a small, fixed, real inventory in English (e.g. there are only ~9 question words, ~7 subject pronouns). These categories in Day 1 are grown to their realistic complete inventory instead of being force-padded with fake/incorrect words. Days 2-75 and further growth of the open-class categories remain future work.
