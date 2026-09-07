# Lesson 7 — Connecting to Excel · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Excel is where most people's data already lives, so it's worth knowing this
connector properly, not just the quick version from Lesson 4. Same starting
point — Get data, Excel Workbook — but there's more going on than it looks
like.

## S2 · IMAGE: connect-desktop.png (file picker)

Browse to your file, select Open. Local drive, cloud-synced folder, network
share — if Windows can browse to it, this dialog can too.

## S3 · IMAGE: desktop-navigator-view.png (Navigator with loaded table)

And you land in Navigator, same as every connector. Pick your table, then
Load, or Transform Data to clean it up first.

## S4 · IMAGE: workbook-data.png (sheet with three data blocks)

Here's the part that surprises people. Spreadsheets don't have to hold one
tidy table per sheet. Someone stacks three small tables on one sheet all the
time — fruit sales up top, a couple of dates in the middle, a store list at
the bottom, all separated by blank rows.

## S5 · IMAGE: entire-workbook-sheet.png (whole sheet with nulls)

Load that sheet as a whole, and you get every cell, gaps included — and
those gaps between your three separate tables show up as null. Technically
complete. Rarely what you actually want.

## S6 · IMAGE: table-three-only.png (suggested table selected)

Which is why Power BI offers a second option: Suggested Tables. It notices
the layout and offers each block as its own clean table — no nulls, no
mismatched columns. Almost always the better pick.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Connect, land in Navigator, and watch for Suggested Tables when one sheet
holds more than one table. Next lesson, we do the same thing for CSV and
text files — simpler in some ways, with a few surprises of their own. See
you there.
