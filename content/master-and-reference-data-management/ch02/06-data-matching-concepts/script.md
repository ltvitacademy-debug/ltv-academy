# Lesson 6 — Data Matching Concepts · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Chapter 1 established that the same customer can look different across
systems. Matching is the process that actually detects that and says:
these are probably the same person.

## S2 · STEPS CARD (what matching answers)

Matching compares records, within one system or across several, to
decide if they represent the same real-world entity. The output isn't
just yes or no — it's usually a spectrum: confidently the same,
confidently different, or uncertain enough to need a human.

## S3 · STEPS CARD (match keys)

A match key is what's actually compared. A unique identifier like a tax
ID, when it reliably exists. Name plus address, the common fallback, but
sensitive to typos and nicknames. Email, often good, but people share or
abandon addresses.

## S4 · CODE CARD (blocking)

A million customer records compared to each other is roughly five
hundred billion comparisons — not practical, and mostly pointless.
Blocking groups records by something cheap and coarse first, like zip
code, and only compares records within the same block. A well-chosen
blocking key rarely splits a true match across two blocks.

## S5 · OUTRO CARD

Next: deterministic versus probabilistic matching — the two fundamentally
different ways to turn a comparison into an actual match decision.
