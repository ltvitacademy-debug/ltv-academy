# Lesson 30 — Tumbling Windows · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Tumbling windows — the simplest window shape, and one you've
actually already used.

## S2 · CODE CARD (bin, formalized)

Bin from lesson 26 groups events into fixed buckets, each computed
once and never touched again. That's the entire definition of
tumbling — you learned the mechanism before this lesson gave it a
name.

## S3 · CODE CARD (Eventstream Window node)

The eventstream canvas has its own no-code window transformation
node — the same tumbling concept, but computed earlier in the
pipeline, before data even reaches a destination.

## S4 · STEPS CARD (fits / doesn't fit)

Tumbling fits questions like every N minutes, what happened — it's
the cheapest shape, since no window ever needs recomputing. But it
can't show a counter updating smoothly every minute instead of
jumping every five.

## S5 · OUTRO CARD

For that smooth, rolling update, you need overlap. Next up:
hopping and sliding windows — fixed-size, but overlapping.
