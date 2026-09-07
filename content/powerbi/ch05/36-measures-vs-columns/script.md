# Lesson 36 — Measures vs. Calculated Columns · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~1.5 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Same language, two very different jobs. Let's put them side by side.

## S2 · CODE: CityState = [City] & "," & [State]

A calculated column: computed once, stored per row, and filterable —
you can drag it into a slicer, a legend, or a table's rows.

## S3 · CODE: Projected Sales = SUM('Reseller Sales'[Last Years Sales])*1.06

A measure: computed fresh every time it's viewed, based on whatever's
currently filtering it — but it can't be filtered by, only summarized
and displayed.

## S4 · OUTRO CARD (SVG: next lesson, LTV seal)

One question settles it: do you need to filter or group by this value —
column — or just show a calculated number — measure. Get it backwards,
and nothing throws an error; it just quietly doesn't work the way you
expect. Next: the basic aggregation functions every measure builds on.
