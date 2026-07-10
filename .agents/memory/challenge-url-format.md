---
name: Challenge page URL format
description: Day page uses numeric slugs, not "day-N" strings — parseInt on "day-1" returns NaN.
---

## Rule
The 75 Days Challenge day page lives at `/75-days-challenge/<number>` (e.g. `/75-days-challenge/1`), NOT `/75-days-challenge/day-1`.

`params.day` in `app/(main)/75-days-challenge/[day]/page.js` is passed directly to `parseInt(params.day, 10)`. If the slug contains "day-" prefix, parseInt returns NaN and the API call becomes `/api/challenge/NaN` → 400.

**Why:** The page's slug format is `[day]` capturing only the numeric part. The `day-1` format belongs to the separate `/practice/day-1/` route, which is a different component entirely.

**How to apply:** When linking to day pages or taking screenshots, always use numeric slugs: `/75-days-challenge/1`, `/75-days-challenge/2`, etc.
