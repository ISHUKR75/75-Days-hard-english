---
name: Challenge day API payload size
description: /api/challenge/[day] combines every JSON file for a day into one response; the vocabulary/practice/mockTest banks must be gated or the payload becomes multi-MB and fetches fail.
---

`app/api/challenge/[day]/route.js` reads and merges every `data/challenge/day-XX/*.json` file into one response for that day. Once vocabulary/practice-questions/daily-test grow into the thousands of rows (as intended by the per-topic quantity targets), the combined payload can hit 10+ MB, which made the section pages' `fetch()` fail outright in dev (seen as `Failed to fetch` / cache-write errors).

**Why:** The day-overview page and every section subpage all called the same combined endpoint with no way to ask for less — most sections (Theory, Speaking, Listening, Milestones, etc.) never touch the vocab/practice/test arrays at all, so shipping all three on every request was pure waste that got worse as content grew.

**How to apply:** The route now accepts `?dataKey=<sectionDataKey>` and only *ships* the matching heavy array (vocabulary/practice/mockTest) in the response, while still parsing all three server-side so the lightweight `stats` counts stay accurate. `[section]/page.js` passes `?dataKey=${sectionMeta.dataKey}` when fetching. When adding another large per-day bank, gate it the same way rather than adding it unconditionally to the combined response.
