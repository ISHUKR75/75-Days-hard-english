---
name: Day pages had hardcoded content duplicated from generated banks
description: Practice/vocabulary day pages showed far fewer questions/words than actually generated; root cause was hardcoded arrays inside page components ignoring the real data source.
---

Several `app/(main)/{practice,vocabulary}/[daySlug|day-2]/page.js` files had their own small hardcoded question/word arrays (~20-30 items) baked directly into the component, completely separate from the real generated content in `data/challenge/day-XX/*.json` served by `app/api/challenge/[day]/route.js`.

**Why this matters:** generating rich content in `data/challenge/day-XX/*.json` (per `challenge-day-content-generation.md`) is not enough — each day's UI page must actually fetch that data. Some pages already did this correctly (e.g. `lib/testData.js`'s `getTestQuestionsForDay` pads via `ensureTestTarget`), but page-level components with copy-pasted static arrays silently diverged and served stale/small content even after the JSON banks were expanded.

**How to apply:** when expanding a day's content bank, always verify the actual rendered page (practice, vocabulary, test, speaking, learn) reflects the new counts — don't just check the JSON/API. Grep for hardcoded `const ..._DATA = [` / `const DAY_N_QUESTIONS = [` arrays inside `app/(main)/**/page.js` before assuming API-served data is what's shown. Fix pattern: fetch `/api/challenge/{day}` on mount, normalize field shape, keep the old array only as an offline fallback.
