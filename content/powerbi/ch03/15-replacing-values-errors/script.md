# Lesson 15 — Replacing Values and Handling Errors · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Sometimes you know exactly what's wrong with a value, and exactly what it
should say instead. Sometimes Power Query hits something it genuinely
can't convert. Two different problems, and this lesson covers both.

## S2 · IMAGE: replace-values-numeric.png (Replace values dialog)

Here's a Sales Goal column with an obvious placeholder, negative one,
where a real number belongs. Right-click it, or use Replace Values on the
ribbon — value to find, value to replace it with.

## S3 · IMAGE: original-after-numeric-replace.png (result table)

Every occurrence updates. Number columns replace the whole cell by
default; text columns replace matching pieces of text wherever they
appear — Advanced options let you switch either behavior if you need to.

## S4 · IMAGE: could-not-convert-details.png (error details panel)

Now the other kind of problem. This Sales column has the text "NA" in one
row instead of a number. Click into that error cell, and Power Query tells
you exactly what happened: couldn't convert to Number, because of NA.
That's a cell-level error — it doesn't stop the query, it just marks that
one cell.

## S5 · IMAGE: remove-errors.png (Remove Errors menu)

First option: remove it. Same Remove Rows menu from last lesson, Remove
Errors, right there — every row with an error in that column, gone.
Simple, but you lose the rest of that row too.

## S6 · IMAGE: replace-errors-window.png (Replace Errors dialog)

Second option: replace it instead. Transform tab, Replace Values, Replace
Errors — every error in the column becomes whatever value you specify.
Often the better call when the rest of that row still has useful data.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Know the right value? Replace it directly. Hit a conversion error? Remove
it, replace it, or keep it to investigate first — your call, based on
whether that row's still worth keeping. Next lesson: splitting, merging,
and extracting columns. See you there.
