---
name: grammarContent TDZ pattern
description: CONTENT_MAP in lib/grammarContent.js must be placed after all DAY_XX_CONTENT const declarations to avoid Temporal Dead Zone (TDZ) runtime errors.
---

## Rule
`CONTENT_MAP`, `getDefaultContent`, `getContentForDay`, and `export default` must always appear at the **very end** of `lib/grammarContent.js` — after every `export const DAY_XX_CONTENT = {...}` declaration.

**Why:** ES module `const` declarations are not hoisted to a value; the CONTENT_MAP object literal is evaluated immediately when the module runs. If any `DAY_XX_CONTENT` referenced in the map is declared *after* the map in the file, Node/V8 throws `ReferenceError: Cannot access 'DAY_XX_CONTENT' before initialization`. This happened when days 10–23 were appended at the end but the map was still at line ~548.

**How to apply:** Whenever new `DAY_XX_CONTENT` constants are added (by appending to the file), no action needed on the map itself — just ensure the block starting with `const CONTENT_MAP = {` stays at the true end of the file. A comment `// (CONTENT_MAP and exports moved to end of file)` was left at the original position as a breadcrumb.
