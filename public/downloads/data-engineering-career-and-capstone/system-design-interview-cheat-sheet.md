# System Design Interview Cheat Sheet

A one-page reminder of the four-step structure from Lesson 24, plus a compressed
recap of the four case studies from Lessons 20-23 — enough to rehearse out loud
before a real system design interview without re-reading all four full lessons.

## The four-step structure (Lesson 24)

Run these in order, out loud, every time. Don't skip to step 3.

```
1. CLARIFY REQUIREMENTS   Functional AND non-functional (Lesson 2).
                           Ask at least two clarifying questions before
                           proposing anything.

2. ESTIMATE THE SCALE     Rough numbers, out loud (Lesson 3). Round
                           aggressively. The order of magnitude is the
                           point, not the precise figure.

3. PROPOSE STORAGE + PROCESSING MODEL
                           OLTP vs. OLAP vs. object storage (Lesson 4).
                           Batch vs. streaming vs. hybrid (Lesson 5).
                           Say WHY, not just WHAT.

4. DISCUSS TRADE-OFFS     What would you change if a constraint moved?
                           What breaks first at 10x scale?
```

**The single most common mistake:** jumping to step 3 before finishing
step 1. A confident-looking diagram built on an unconfirmed assumption is
worse than two or three good clarifying questions asked first.

## Four rehearsed case studies, compressed

| Case study | Key clarifying question | Architecture | Why |
|---|---|---|---|
| Ride-sharing platform (L20) | What's the freshness SLA for matching vs. for trip history? | Kappa, two grains (location pings + trip events), one streaming pipeline feeding both a live matching store and durable Delta landing | Two very different SLAs on the same platform rule out a single storage path |
| Real-time fraud detection (L21) | What's the latency budget, and can the system degrade gracefully under load? | Kappa only (no batch path makes sense), idempotent scoring keyed on `transaction_id`, deliberately AP under CAP | A transaction has to be scored before it completes — there's no "score it later" |
| Retail inventory platform (L22) | How often does inventory actually need to be current — real-time, or near-real-time? | Typically Lambda — a fast approximate stock count plus a slower, exact nightly reconciliation | Different consumers (store floor vs. finance) can tolerate different staleness |
| Social media analytics pipeline (L23) | Is this user-facing (needs to be fast) or internal reporting (can tolerate more latency)? | Usually a hybrid: streaming for trending/live counts, batch for deep historical aggregation | Trending content and quarterly reports are different problems wearing the same data |

## The one line to say out loud for each tool choice

- **Kappa, not Lambda, because:** "the source is durably replayable and one
  codepath avoids the two pipelines drifting apart."
- **AP, not CP, because:** "refusing to answer during a partition protects
  nobody — it just blocks legitimate requests."
- **Partition by date, not by second or by year, because:** "it matches how
  the table actually gets queried — date-range filters, not per-second ones."
- **Idempotent MERGE, not plain INSERT, because:** "at-least-once delivery is
  the honest guarantee; exactly-once *effect* is something you build on top
  of it."

## Before you walk in

Practice narrating one case study you've never designed before, cold, using
just the four-step structure above. The goal isn't memorizing this course's
four answers — it's being able to run the same four steps against a
scenario you've never seen.
