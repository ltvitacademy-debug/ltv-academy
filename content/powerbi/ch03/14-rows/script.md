# Lesson 14 — Removing, Filtering & Editing Rows · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Data types handled the columns. Now let's handle the rows — which ones
stay, which ones go, and which ones you keep only under certain
conditions.

## S2 · IMAGE: remove-rows-empty.png (Remove Rows menu)

Remove Rows, on the Home ribbon, handles the blunt cases — rows you want
gone entirely. Top rows, bottom rows, alternate rows, duplicates, blank
rows, and errors. You'll reach for blank rows and errors the most —
cleaning out rows Power Query genuinely can't use.

## S3 · IMAGE: sort-filter-menu.png (sort and filter menu with checklist)

Filtering is different — it's conditional. Open the sort and filter menu
from any column heading, and you get a checklist of every distinct value
in that column. Uncheck anything you want excluded, exactly like an Excel
AutoFilter.

## S4 · IMAGE: text-column.png (type-specific text filters)

Power Query also gives you filters tailored to the column's actual data
type. Text columns get begins-with and contains. Number columns get
greater-than. Date columns get before and relative ranges. The toolbox
changes automatically based on what's actually in the column.

## S5 · IMAGE: filter-rows-window-basic-mode.png (Filter Rows Basic mode)

Pick one of those type-specific filters, and you land in the Filter Rows
dialog. Basic mode gives you up to two conditions on one column — here,
keep rows where Account Code begins with P-A, or begins with P-T-Y.

## S6 · IMAGE: filter-rows-window-basic-mode-output.png (filtered result)

And here's the result — exactly the rows matching either condition,
nothing else. Everything else is gone from this query, though never from
your original file. Need more than two conditions, or conditions across
different columns? Switch to Advanced mode — same dialog, no limit on how
many you stack.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Remove for the blunt cases, filter for the conditional ones, and Basic or
Advanced depending on how complex the rule gets. Next lesson: replacing
values and handling the errors that slip through anyway. See you there.
