# Lesson 16 — Lineage for Root Cause Analysis · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Lessons 14 and 15 walked downstream from a proposed change. Root
cause analysis walks the opposite direction — starting at a symptom
that's already wrong, and walking upstream until you find where it
actually broke.

## S2 · STEPS CARD (the process)

Start at the symptom — the exact report, field, and value that looks
wrong. Walk upstream to the immediate source dataset and check
whether the problem is already there. Repeat at each hop until you
find where correct data became incorrect. That hop is the root cause.

## S3 · STEPS CARD (the break isn't where you notice it)

A wrong number on a dashboard almost never means the bug is in the
dashboard — that's just where someone noticed it. The real error
could be several hops upstream: a business rule, an unflagged schema
change, a source system quietly sending something different.

## S4 · CODE CARD (worked example)

Revenue is 8% low this month. Walking upstream: the dashboard matches
RevenueFact — correct here. RevenueFact matches StagingView — correct
here. StagingView is missing rows from the source — wrong here. The
fix belongs at the source, not the dashboard.

## S5 · OUTRO CARD

That closes Chapter 3. Chapter 4 turns to documenting lineage itself
— what to write down, how to diagram it, and which tools can build
and maintain that documentation for you.
