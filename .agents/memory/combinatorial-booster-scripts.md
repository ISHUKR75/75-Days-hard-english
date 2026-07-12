---
name: Combinatorial (divmod) booster scripts for large question banks
description: How to safely grow a practice/test category to hundreds of questions via combinatorial templates, and the pitfall that silently caps output below target
---

To reach ~900-1000 practice / ~300-400 test questions for a single grammar category, hand-writing
sentences doesn't scale. The working pattern (see `gen_day01_boost*.js`, `gen_day01_test_boost*.js` in
repo root) is: pick 2-4 independent vocabulary pools (e.g. subjects × verbs × time-adverbs), and walk
every combination via a divmod "combo" counter, adding each rendered sentence only if its exact Hindi
(or question+options) text isn't already in the file (global `Set` dedup). This guarantees zero
copy-pasted repeats while still producing large volume from a modest, realistic vocabulary list.

**Pitfall: the reachable ceiling is `pool_A_len × pool_B_len × pool_C_len`, not the target number.**
If that product is smaller than the target (e.g. a closed set like the 6 English pronouns times only
15 objects = 90, far short of 900), the loop will silently plateau below target even with a large
`guard` iteration budget, because once the counter cycles past `product - 1` it starts re-emitting
identical combinations that just get deduped away forever.

**Why:** grammar categories built on genuinely closed sets (pronouns, articles, prepositions) can't get
real volume from the closed set itself — the fix is to enlarge the *open* pool it's combined with
(more names, more everyday objects/hobbies/places), not to invent fake pronouns/articles.

**How to apply:** before trusting a booster script's target number, compute the actual product of its
pool lengths and confirm it comfortably exceeds the target (aim for at least 1.5-2x headroom, since a
few % of combinations will collide with sentences already produced by other categories/scripts in the
same file). If short, add more real vocabulary entries to the open-class pool(s) rather than raising the
`target` parameter alone — raising target with an unchanged product just burns guard iterations for
nothing. Re-running the same script with an enlarged pool is safe (existing sentences dedupe correctly)
but note the combo-index-to-tuple mapping shifts when a pool's length changes, so it won't cleanly
"resume" the old sequence — it just explores a different (still fully deduped) enumeration of the larger
space, which is fine in practice.

**Per-category target with multiple templates:** when a category combines N sentence templates over one
pool (or two pools multiplied together), instrument the raw pool size before running the full generation
(temporarily log `pool.length` right after building each category's candidate array) and compare against
`target`. If `pool.length < target`, either add more templates or enlarge the pool — do not let the
generator "cycle" through the same pool multiple passes with only a relabeled difficulty tag, since that
produces literal duplicate question text under different metadata. Always run a final dedup check
(`Set` of the rendered sentence per category) after generation, not just a raw count check.
