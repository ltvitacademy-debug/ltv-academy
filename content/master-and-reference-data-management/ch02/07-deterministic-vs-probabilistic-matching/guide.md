# Lesson 7 — Deterministic vs. Probabilistic Matching

**Chapter 2 · Matching and Consolidation · Lesson 7 of 25**

## What you'll learn

- Deterministic matching: exact-rule matching, its strengths and its brittleness
- Probabilistic matching: weighted scoring across multiple fields
- How a match score turns into a decision — and why there's a middle band, not just a cutoff
- When to reach for each approach

## Deterministic matching

**Deterministic matching applies exact rules to specific fields: if they match exactly (or match after simple standardization), the records are the same entity — full stop.** "Tax ID matches exactly" or "Email matches exactly after lowercasing" are deterministic rules. It's simple to implement, fast to run, and completely explainable — you can always say exactly why two records matched.

Its weakness is brittleness: a deterministic rule built on name and address breaks the moment someone types "Robert" instead of "Bob," or "St." instead of "Street." Deterministic matching works best when there's a genuinely reliable unique identifier to anchor on; it works poorly as the *only* method once you're relying on free-text fields like names.

## Probabilistic matching

**Probabilistic matching compares multiple fields, scores how similar each one is, weights those scores, and produces an overall confidence that two records are the same entity** — rather than a flat yes/no on one field. Field-level similarity is typically computed with string-similarity techniques (common ones include edit-distance measures like Levenshtein distance, and phonetic/typo-tolerant measures like Jaro-Winkler) that return "how close" two strings are, not just "equal or not."

Each field contributes a weighted score — a tax ID match might weigh much more heavily than a city match — and the weighted scores combine into one overall match score for the pair of records.

## From score to decision: two thresholds, not one

A probabilistic match process typically uses **two thresholds**, not one cutoff:

- **Above the upper threshold** — confident enough to **auto-match** (and, depending on governance rules from Lesson 5, potentially auto-merge)
- **Below the lower threshold** — confident enough to call **no match**
- **Between the two** — too uncertain to decide automatically; routed to a human steward for review (Lesson 11)

That middle band is deliberate, not a failure of the algorithm. Forcing every pair into "match" or "no match" with a single cutoff either merges too aggressively (false positives — merging two different people) or misses too much (false negatives — leaving true duplicates unmerged). The review band exists because getting this wrong in either direction has a real cost.

## When to reach for each

Use deterministic matching first, wherever a trustworthy unique identifier exists — it's cheaper, faster, and fully explainable. Reach for probabilistic matching for everything else: the much larger set of cases where you're reconciling names, addresses, and other free-text fields that were typed by different people, in different systems, on different days. Most real MDM implementations use both — deterministic rules to catch the easy, certain cases, and probabilistic scoring layered underneath for everything deterministic rules miss.

## Key terms

| Term | Meaning |
|---|---|
| Deterministic matching | Matching based on exact-rule comparison of specific fields |
| Probabilistic matching | Matching based on weighted similarity scores across multiple fields, producing a confidence level |
| Match threshold | The score boundary separating auto-match, review, and no-match outcomes |

## Lab

Take two records you believe refer to the same entity but aren't identical (a contact saved twice with a typo is fine). List which fields would support a deterministic rule, and estimate — just qualitatively — which fields would contribute most to a probabilistic score if you were scoring overall similarity.

## Check yourself

Can you explain why a probabilistic matching process typically uses two thresholds instead of one, and describe a scenario where deterministic matching alone would fail?
