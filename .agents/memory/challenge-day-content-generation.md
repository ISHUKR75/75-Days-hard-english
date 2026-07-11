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
using real, topic-correct sentences instead of lorem/placeholder text.

**How to apply:** When resuming work on remaining days (31-75 as of 2026-07-09), follow the same
script pattern, batching ~10 days per script run to stay efficient. Note: replit.md's current stated
target for Day 1 practice/test is ~900-1000 practice questions and ~300-400 test questions PER
topic/subtopic (not per whole file) — confirmed and reached for Day 1 as of 2026-07-11. For that scale,
see [combinatorial booster scripts](combinatorial-booster-scripts.md) instead of the small hand-written
pool approach described above (which still applies to the other 12 lighter files per day).
