---
name: Challenge day content generation pattern
description: How to fill empty data/challenge/day-XX/*.json files with real (non-placeholder) content at scale
---

Each day folder needs 14 files: lessons, vocabulary, practice-questions, daily-test, speaking-drill,
writing-exercise, reading-exercise, listening-exercise, revision, milestones, morning-routine,
challenge, overview, meta.

**Approach that works well:** write a one-off Node script (not committed — delete after running) that:
1. Defines a per-day config object: `{ topic, formula, rule[], pairs: [[hindi, english], ...] }` with
   ~20-25 hand-written real Hindi/English sentence pairs for that grammar topic.
2. Programmatically derives all other files from that sentence pool — daily-test (translate/fill/error
   MCQ types), speaking-drill, writing-exercise, reading-exercise, listening-exercise, revision,
   milestones, morning-routine, challenge, and meta/overview.
3. Run with `node script.js`, then delete the script and validate with a JSON.parse pass over every
   file plus a `find -size 0` check for leftover empty files.

**Why:** Hand-authoring 14 files × many days individually is too slow; a generator keeps output
consistent with the established schema (see day-02/06/08 as clean reference examples) while still
using real, topic-correct sentences instead of lorem/placeholder text. User explicitly rejected literal
500-1000 questions/file or 50,000-line files as unrealistic — ~20-25 real sentences per topic, expanded
across 9-12 derived files, is the agreed realistic volume per day.

**How to apply:** When resuming work on remaining days (31-75 as of 2026-07-09), follow the same
script pattern, batching ~10 days per script run to stay efficient.
