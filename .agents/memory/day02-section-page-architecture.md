---
name: Day 2 per-section page + session-size-picker already exists
description: Before rebuilding "dedicated page per section" or a practice/test length picker, check the existing /75-days-challenge/[day]/[section] route — it may already do this.
---

The `app/(main)/75-days-challenge/[day]/[section]/page.js` route (driven by the `SECTIONS` array
exported from that same file, and linked from `app/(main)/75-days-challenge/[day]/page.js`) already
renders each course section (overview, theory, vocabulary, practice, test, etc.) on its own URL
(`/75-days-challenge/{day}/{sectionId}`), fetches only that section's slice of data via
`/api/challenge/{day}?dataKey={dataKey}`, and already includes a 20/40/60/80/100% session-size
picker on the vocabulary/practice pages.

**Why:** there are multiple older/parallel routes in this codebase for the same content (a static
`app/(main)/practice/day-2/*` tree with its own hardcoded arrays, a generic `[daySlug]` route, and this
newer `[day]/[section]` route). It's easy to assume "give every section its own page" is unbuilt and
start a redesign from scratch, duplicating work that already exists in the newer route.

**How to apply:** when asked to add per-section pages, progress tracking, or a practice/test length
selector, screenshot `/75-days-challenge/{day}/{sectionId}` first to check what's already there before
planning new architecture. The static `practice/day-X/*` pages appear to be an older, partially
hardcoded generation that the newer `[day]/[section]` route has superseded for at least Day 2.
