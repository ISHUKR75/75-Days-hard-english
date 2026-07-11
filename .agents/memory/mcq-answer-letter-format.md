---
name: MCQ answer letter-code format
description: daily-test.json stores correct answers as letter codes ("A"/"B"/"C"/"D"), not option text — must be resolved before comparison.
---

# MCQ Answer Letter-Code Format

The `daily-test.json` files store MCQ answers as single uppercase letters (`"correct": "B"`), not the actual option text.

**Why:** The JSON was authored this way from the start and changing it across hundreds of files would break existing content.

**How to apply:** Always use `getCorrectOptionText(question)` (defined in `app/(main)/75-days-challenge/[day]/page.js`) when comparing a user's selected option against the correct answer. This function:
1. Normalizes the letter with `.trim().toUpperCase()`
2. Maps A→index 0, B→index 1, etc. against `question.options[]`
3. Falls back to `question.correct` or `question.answer` full-text for days that use the older full-text format

**Never do:** `selected === currentQ.answer` or `opt === currentQ.correct` directly in MCQ rendering — both will silently fail for letter-coded questions.

**Edge cases handled:** lowercase letters, extra whitespace, full-text `correct` (length > 1), `answer` field fallback.
