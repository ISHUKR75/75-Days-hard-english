---
name: Generic example-sentence templates must match word type
description: A single verb-slot sentence template applied to nouns/adjectives/gerunds produces broken grammar ("I try to teacher every day"); branch by word type instead.
---

`gen_day02_v2.js`'s original `sentenceSet(word)` helper wrapped any word in verb slots
("I try to X every day", "Could you tell me how you X in your previous role?"). It was written for
real verbs but then reused for jobs, hobbies, languages, cities, adjectives, skills, degrees,
achievements, and family-relation nouns pushed via a shared `pushSimpleWord()` helper — producing
nonsense like "I try to teacher every day in my routine" or "We need to cheerful content writer more
effectively at work."

**Why:** it's tempting to give every vocabulary entry the same "sentences in 6 contexts" shape via one
shared helper, but the correct slot position/preposition for a word depends entirely on its part of
speech (a job noun needs "I am a/an X", a gerund hobby needs "I enjoy X", a language needs "I can speak
X", a place needs "I am from X", an adjective needs "I am X" with no article, an achievement clause
needs "I have X").

**How to apply:** when generating bulk vocabulary/example content from mixed pools (nouns, adjectives,
verbs, gerunds, full clauses), branch the sentence-template function by pool/word-type instead of one
generic verb-shaped template for everything. After generation, spot-check a sample from each pool
(not just pool 1) for grammatical sense — bugs like this hide in whichever pool you didn't eyeball.
