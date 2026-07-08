---
name: practiceData architecture
description: How practice questions are split across files and how getQuestionsForDay works
---

## Files
- `lib/practiceData.js` — main file, Days 1-30 in ALL_QUESTIONS map (static arrays DAY_01…DAY_30, ~30-50 questions each). Also contains `generateQuestionsForDay()` fallback generator.
- `lib/practiceData-days31-75.js` — created for Days 31-75, exports `EXTENDED_QUESTIONS` map (965 real questions across 45 days, 15-40 per day).

## getQuestionsForDay priority order
1. `ALL_QUESTIONS[dayNum]` — Days 1-30 static
2. `EXTENDED_QUESTIONS[dayNum]` — Days 31-75 real questions
3. `generateQuestionsForDay(dayNum, title)` — fallback generator (safety net only)

**Why:** Keeps main file manageable; real content for all 75 days without one 50k-line file.

## grammarContent.js
- Has explicit `DAY_01_CONTENT` through `DAY_75_CONTENT` exports for all 75 days
- CONTENT_MAP (lines ~5113+) maps day numbers to those constants — must stay AFTER all DAY_XX consts (TDZ)
- `getContentForDay(dayNum, topicTitle)` = CONTENT_MAP[dayNum] || getDefaultContent(dayNum, topicTitle)
