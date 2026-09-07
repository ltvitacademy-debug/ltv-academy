# Lesson 20 — Merging Queries · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Every lesson so far has worked on one table at a time. This one combines
two — the exact same idea as a database join, and one of the most useful
tools in the whole chapter.

## S2 · IMAGE: left-outer-join-operation.png (merge diagram)

Here's the whole idea in one picture. A left table and a right table share
a column — CountryID, here. The left table keeps every row. The right
table contributes a matching value wherever CountryID lines up — and null
where it doesn't. That's a merge.

## S3 · IMAGE: merge-icons.png (Merge queries button)

Merge Queries lives in the Combine group on the Home ribbon. Merge Queries
starts from your current query as the left table. Merge Queries As New
lets you pick both tables from scratch.

## S4 · IMAGE: merge-window-one-column-sample.png (Merge dialog with join kind icons)

Pick the right table, match the connecting columns in both, and choose a
join kind. Six options, shown right here as icons — but really, two of
them do almost all the work in practice: Left outer, keep everything from
my table and enrich it where possible. Inner, keep only rows that matched
on both sides.

## S5 · IMAGE: expand-table-column.png (expand menu)

After merging, your table gains one new column holding the matched data,
nested. Click the expand icon, and pick exactly which fields you actually
want pulled out as real columns.

## S6 · IMAGE: left-outer-final-table-2.png (final result with null)

And here's the result. CountryID 4 had no match in the Countries table, so
its Country comes back null — exactly what the diagram predicted. That
null isn't an error. It's telling you your reference table is missing a
row.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Merge reaches sideways, pulling columns in based on a shared key. Next
lesson: Append, which reaches the other direction — stacking tables with
matching columns into more rows. See you there.
