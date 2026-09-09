# Lesson 25 — What Is Medallion Architecture?

**Chapter 3 · Medallion Architecture · Lesson 25 of 57**

## What you'll learn

- Bronze, silver, gold — the three-layer pattern almost every real Databricks pipeline follows
- Why this is Foundations' raw/cleansed/curated zones, renamed and made concrete with Delta
- Data flows one direction: bronze → silver → gold, never backward
- What this chapter builds, lesson by lesson

## A name for something you've already learned

Foundations' Chapter 1 (Lessons 11–12) introduced raw, cleansed, and
curated **zones** as a data lake organizing principle. **Medallion
architecture** is the same idea, with different names, made concrete
now that you have Delta tables (Chapter 2) to actually build each
layer with:

| Foundations' zone | Medallion layer | What lives there |
|---|---|---|
| Raw | **Bronze** | Data exactly as it arrived — unmodified, untyped, everything kept |
| Cleansed | **Silver** | Cleaned, deduplicated, correctly-typed, conformed |
| Curated | **Gold** | Business-level aggregates, ready for direct consumption |

## Why three layers, specifically

Each layer exists to answer a different question. Bronze answers
"what did we actually receive?" — a permanent, unaltered record,
useful for reprocessing if a later step turns out to be wrong. Silver
answers "what's the clean, trustworthy version of this?" — the
result of exactly the null-handling, deduplication, and type-casting
Foundations' Chapter 4 covered. Gold answers "what does the business
actually need to see?" — pre-aggregated, shaped for a specific
dashboard or report, not for a data engineer's own exploration.

## Data flows one direction

```
Raw source files
    -> BRONZE (as-is, appended)
    -> SILVER (cleaned, deduplicated, typed)
    -> GOLD (aggregated, business-shaped)
```

A gold table is never the direct source for a silver one; silver is
never rebuilt directly from gold. Each layer is built **from** the
layer before it, one direction, every time — this predictability is
itself part of the design's value: anyone can trace a number in a
gold table backward through silver to the exact bronze rows it came
from.

## What this chapter builds

Lessons 26–28 cover each layer's actual construction, in real code.
Lessons 29–30 build full bronze→silver and silver→gold pipelines.
Lessons 31–34 add incrementality and streaming — because in real
production, this isn't a one-time script, it runs continuously.
Lessons 35–36 handle the messy realities (late data, quality checks)
that real pipelines have to survive. Lesson 37 puts it all together
in one complete, chapter-ending pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Bronze | Raw data, exactly as received — Foundations' "raw" zone |
| Silver | Cleaned, deduplicated, typed data — Foundations' "cleansed" zone |
| Gold | Business-ready aggregates — Foundations' "curated" zone |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why
does data flow bronze → silver → gold in one direction only, never
backward?
