---
name: Vocabulary JSON metadata sync
description: After adding words to vocabulary.json, always sync totalWords, categories[], and description fields.
---

## Rule
`data/challenge/day-01/vocabulary.json` has top-level metadata fields that must be kept in sync whenever words are added or categories change:
- `totalWords` — must equal `words.length`
- `categories` — must equal `[...new Set(words.map(w => w.category))].sort()`
- `description` — should mention the current word count and category set

**Why:** These fields are displayed in the UI (hero card shows `totalWords`, vocabulary filters use `categories`). Stale metadata causes display inconsistency — e.g. hero showing "600 WORDS" when the bank has 1000.

**How to apply:** After any vocabulary generator script runs, add a metadata sync step:
```js
data.totalWords = data.words.length;
data.categories = [...new Set(data.words.map(w => w.category))].sort();
```
Or run it as a one-liner after the main script completes.
