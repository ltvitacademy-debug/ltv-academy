# Lesson 32 — Session Windows · Voiceover script

Segments map 1:1 to slides. Target: ~2.5-3 minutes total.

---

## S1 · TITLE CARD

Session windows — a window with no fixed size at all.

## S2 · CODE CARD (a window with no fixed size)

Tumbling and hopping both run on a fixed clock, decided in
advance. A session window instead stays open while events keep
arriving close together, and only closes once a gap of inactivity
— a timeout — passes.

## S3 · CODE CARD (Eventstream Session type)

The same eventstream window node offers a session type, configured
with a timeout instead of a size. Grouped by rider ID, so each
rider gets their own independently-timed sessions.

## S4 · STEPS CARD (comparing all three)

Tumbling answers every N minutes what happened. Hopping gives a
smooth rolling view. Session answers a different question entirely
— how long was this burst of activity, wherever it happens to
fall.

## S5 · OUTRO CARD

Three window shapes, three different questions. Next up:
watermarks — how a system decides a window is actually done
despite data arriving late.
