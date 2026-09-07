# Lesson 16 — Splitting, Merging & Extracting Columns · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

Real data crams things together constantly — a number and a name in one
cell, a full address in one field. This lesson pulls columns apart, and
occasionally puts them back together.

## S2 · IMAGE: into-columns-original.png (Accounts single column)

Here's a column called Accounts, holding both an account number and its
name, separated by a space. One piece of data, doing two jobs.

## S3 · IMAGE: icon-home.png (Split Column dropdown)

Split Column, on the Home ribbon — or Transform, or right-click. By
delimiter is the one you'll use constantly: splitting wherever a
character like a space, comma, or colon shows up.

## S4 · IMAGE: into-columns-split-column-window-desktop.png (Split dialog)

Pick the delimiter — space, in this case — and where to split. Left-most
delimiter for just the first occurrence, right-most for the last, or every
occurrence for values with a repeating structure, like a hyphenated date.
Getting this choice wrong is the easiest way to make a mess here.

## S5 · IMAGE: into-columns-final.png (result: two columns)

Two columns where there was one. Power Query names them dot-1 and dot-2
automatically — rename them to something meaningful right after.

## S6 · IMAGE: query-overview-add-column-ribbon.png (Add Column ribbon, From Text group)

Two more tools live on the Add Column ribbon. Merge Columns does the
opposite of everything we just did — combining columns into one. Extract
pulls out just part of a column's text — first characters, everything
before a delimiter — without touching the original column at all. That's
the real distinction: Split replaces the column. Extract adds a new one
alongside it.

## S7 · OUTRO CARD (SVG: next lesson, LTV seal)

Split apart, merge back together, or extract just a piece — three
different jobs, three different results. Next lesson: conditional columns
and columns from examples, for when the rule is more complex than a
delimiter. See you there.
