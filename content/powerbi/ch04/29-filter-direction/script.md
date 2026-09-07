# Lesson 29 — Filter Direction · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Cardinality decides how values match up. This setting decides something
different: once two tables are related, how far is a filter allowed to
travel?

## S2 · IMAGE: candmrel_repcrossfiltersingle.png (broken employee count)

Trying to count employees per project here, and every value comes out
the same. Filtering from one dimension table doesn't reach the other
dimension table on the far side of the fact table.

## S3 · IMAGE: candmrel_singledircrossfiltering.png (single direction diagram)

That's Single direction — the common default. A filter reaches the table
it's summarizing, but it doesn't continue past it. Works for most
reports; it's only a problem when a filter needs to reach further.

## S4 · IMAGE: candmrel_bidircrossfiltering.png (both direction diagram)

Switch cross filter direction to Both, and the filter keeps traveling
through to the far table.

## S5 · IMAGE: candmrel_repcrossfilterbi.png (fixed employee count)

Same report, Both set on the relevant relationships — real, distinct
counts per project. Both works beautifully in a clean star schema.

## S6 · IMAGE: candmrel_crossfilterwithloops.png (loop diagram)

But set Both everywhere in a model with loops — where two tables can be
reached from each other more than one way — and Power BI often won't
allow it. Too many possible paths for the filter to take. We fix that
ambiguity next lesson.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Next: active versus inactive relationships — the other tool for
resolving exactly this kind of conflict.
