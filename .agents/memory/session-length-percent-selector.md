---
name: Session-length percent selector convention
description: How practice/test question-count is controlled across day pages, and the pitfall that caused "too few questions" complaints.
---

Practice/test pages must never hardcode a fixed session size (e.g. `Math.min(50, questions.length)`). Always pass the **full** question bank length as `questionsPerSession` and let `PracticeQuiz`'s `allowPercentSelect` prop drive an actual 20/40/60/80/100% picker, backed by the persisted Zustand setting `settings.sessionQuestionPercent` (clamped to that exact set — reject/ignore any other value rather than trusting persisted state blindly).

**Why:** A hardcoded cap silently truncates every session to a tiny fraction of a much larger real question bank, which reads to users as "missing content" even though the data is complete. This was the root cause of a user complaint about too few practice/test questions.

**How to apply:** When adding a new day page (dynamic `[daySlug]` route or any legacy static per-day page), wire it the same way: `questionsPerSession={questions.length}` + `allowPercentSelect={true}`. Also guard the zero-question case (disable Start, show a "no questions available" message) since `effectiveTarget` can't rescue an empty bank.
