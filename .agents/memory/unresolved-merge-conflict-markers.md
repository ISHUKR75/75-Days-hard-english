---
name: Unresolved git merge conflict markers in imported project
description: This codebase had literal <<<<<<< HEAD / ======= / >>>>>>> markers left in source files from an import, causing hard 500s on those routes.
---

This project was imported with at least two files still containing unresolved git merge conflict markers (`app/(main)/vocabulary/[daySlug]/page.js` and `app/(main)/practice/day-2/page.js`), which Next.js's parser rejects outright (500 error, "Merge conflict marker encountered"). Both sides of each conflict looked plausible at a glance, so this is easy to miss without actually loading the affected route.

**Why:** These are the kind of silent breakages a user describes vaguely ("vocabulary bhi kam hai") rather than reporting as a crash, because the route 500s and the fallback/error state can look like "just not much content" rather than a build error, especially if the user never opened devtools.

**How to apply:** When a user reports content that "seems missing" on a specific page, run `grep -rlE "^(<<<<<<<|=======|>>>>>>>)" <src dirs>` across the codebase early, before assuming it's a data/content problem — resolve conflicts by keeping whichever side is actually referenced by the rest of the file (check what identifiers are used after the conflict block).
