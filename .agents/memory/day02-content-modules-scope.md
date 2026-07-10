---
name: Day 2 content modules — full pipeline
description: Which JSON files feed which UI tabs on the 75-day challenge day page, and the additive-generator convention used to expand them.
---

The Day-N detail page (`/75-days-challenge/[day]`) has one tab per learning
mode: Concept, Vocabulary, Practice, Speaking, Writing, Listening, Reading,
Revision, Test. Each tab reads a specific field from the single
`/api/challenge/[day]` response, which is a straight passthrough of the
corresponding `data/challenge/day-XX/*.json` file (lessons, vocabulary,
practice-questions, daily-test, speaking-drill, writing-exercise,
listening-exercise, reading-exercise, revision).

**Why this matters:** expanding a JSON file's content only shows up on the
live site if some tab component actually renders that field — Listening,
Reading, and Revision tabs did not exist at all until they were added
specifically to consume `listening-exercise.json` / `reading-exercise.json`
/ `revision.json`. Always check the day page's tab list before assuming
JSON growth alone satisfies a "make content complete" request.

**How to apply:** when growing a day's content pool, use an additive-only
generator script (existing pattern: `gen_day02_v2.js`, `gen_day02_extras.js`)
that reads the current JSON, appends new items by id (never deletes), and
rewrites the file. Support both legacy singular fields (e.g. `passage`,
`dictationPassage`) and newer plural fields (`passages`,
`dictationPassages`) in any consuming component, since older content files
may still use the singular shape until every day is migrated. Always give
list-rendering components (quiz/passage/exercise loops) an explicit
empty-array UI path with a way to call `onComplete()`, or the day's overall
progress bar gets stuck when a day has thin content.
