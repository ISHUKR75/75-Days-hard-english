---
name: Day page MCQ prompt fallback
description: daily-test.json has mixed question formats; always use a fallback chain for the question prompt in MockTestMCQ
---

# MCQ Prompt Fallback Pattern

## The rule
Always render the question prompt as `currentQ.hindi || currentQ.sentence || currentQ.question || '—'`, never just `currentQ.hindi`.

**Why:** `data/challenge/day-XX/daily-test.json` contains questions of multiple types:
- `type: "translate"` — uses `hindi` field (Hindi sentence to translate)
- `type: "fill"` — may use `sentence` field (English sentence with a blank)
- `type: "error"` — may use `question` field (error correction prompt)

Using only `currentQ.hindi` renders blank/undefined for non-translate question types, silently hiding the question from the user.

**How to apply:** In MockTestMCQ (and any component rendering daily-test.json questions), always use the full fallback chain for the prompt display. The options/answer/explanation fields are consistent across all types.
