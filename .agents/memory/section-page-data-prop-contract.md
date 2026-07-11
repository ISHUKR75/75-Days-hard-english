---
name: Section page data prop contract
description: /75-days-challenge/[day]/[section]/page.js must pass the FULL dayData object as `data` to section components, not a sliced sub-field.
---

Every component in `components/challenge/sections/*.js` (VocabularySection, PracticeSection, TestSection, FlashcardsSection, TheorySection, OverviewSection, etc.) reads its own field off the whole day-payload object internally, e.g. `data?.vocabulary`, `data?.practice`, `data?.mockTest`, `data?.overview`, `data?.grammarTheory?.sections`.

`[day]/[section]/page.js` must render `<SectionComponent data={dayData} ... />` (the full fetched object). If it instead "optimizes" by pre-slicing — `data={dayData?.[sectionMeta.dataKey]}` — every section silently renders as empty (0 words, 0 questions, etc.) with no error, because the component then looks for `data.vocabulary` on what is already the vocabulary array itself.

**Why:** This exact regression shipped silently — the app loaded fine and showed correct stats on the day-overview page (which only reads `stats`/`topic`/`overview`), so nothing looked broken until every individual section subpage was opened and checked for real content.

**How to apply:** When touching this page or adding new sections, verify the component's own `data?.<key>` destructuring line before changing what gets passed as `data`. If you need to cut payload size (see the companion API note), gate which heavy field the *API* fills in via a `?dataKey=` query param instead of slicing on the client — keep passing the full object down.
