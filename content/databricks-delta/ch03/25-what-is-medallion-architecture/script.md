# Lesson 25 — What Is Medallion Architecture? · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes (chapter opener).

---

## S1 · TITLE CARD

Chapter 3 starts here — what is medallion architecture, actually?

## S2 · STEPS CARD (zones renamed)

This is the exact same idea Foundations' raw, cleansed, and
curated zones already taught you, with new names, now made
concrete with Delta tables. Raw becomes bronze — data exactly as
it arrived. Cleansed becomes silver — cleaned, deduplicated,
correctly typed. Curated becomes gold — business-level aggregates,
ready to consume.

## S3 · CODE CARD (one direction)

And data flows in one direction only — bronze to silver to gold,
never backward. A gold table is never the source for a silver one.
That predictability is itself the value: anyone can trace a number
in gold backward, through silver, to the exact bronze rows it came
from.

## S4 · CODE CARD (what this chapter builds)

This chapter builds each layer's real construction, then full
pipelines connecting them, then adds incrementality and
streaming — because in real production, this runs continuously,
not once — and finally handles the messy realities: late data and
quality checks.

## S5 · OUTRO CARD

Bronze, silver, gold — one direction, every time. Next lesson: the
bronze layer, raw ingestion, in real code.
