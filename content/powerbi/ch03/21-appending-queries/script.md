# Lesson 21 — Appending Queries · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Merge reached sideways. This lesson reaches down — stacking tables on top
of each other instead of joining them side by side.

## S2 · IMAGE: append-queries-diagram.png (append diagram)

Here's the idea. Two tables, not quite identical columns, stacked into
one. Every column from every table survives. Where a table didn't have a
given column, those rows just get null. No error, nothing lost.

## S3 · IMAGE: append-queries-icons.png (Append queries button)

Append Queries sits right next to Merge Queries, same Combine group,
Home ribbon. Append Queries adds rows into your current query. Append
Queries As New builds a separate query instead, leaving both originals
untouched.

## S4 · IMAGE: append-queries-sample-two-tables-window.png (Append dialog)

Pick your primary table, choose Append Queries, and select the table to
stack underneath it. Two Tables mode is the default.

## S5 · IMAGE: append-queries-sample-two-tables-output.png (combined result with null)

Power Query matches columns by name, not position, and stacks everything
together. This Online Sales data never had a Referrer column, so those
rows show null there — exactly as expected.

## S6 · IMAGE: append-queries-sample-three-more-tables-window.png (three-or-more mode)

Need more than two? Switch to Three or More Tables mode and build a list —
move tables across with Add. This is the natural choice for combining
several similarly-shaped sources at once, like monthly exports or regional
files, instead of appending them one pair at a time.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Merge for columns, Append for rows — between the two, you can combine
almost any two tables Power BI hands you. Next lesson: Parameters, for
making your queries reusable instead of hardcoded. See you there.
