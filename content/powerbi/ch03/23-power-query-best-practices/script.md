# Lesson 23 — Power Query Best Practices & Performance · Voiceover script

Segments map 1:1 to slides. Each segment is one TTS call so slide timing follows
the audio. Target: ~3 minutes total.

---

## S1 · TITLE CARD (SVG: lesson title, LTV brand)

You've built a lot of queries this chapter. This last lesson is a roundup —
the habits that separate a query that just works from one that stays fast
and easy to hand off to someone else.

## S2 · IMAGE: navigator.png (Navigator window)

Start with the right connector. Power Query has purpose-built connectors
for SQL Server, Excel, SharePoint, and dozens more — and for sources like
SQL Server, the right connector unlocks query folding, pushing your filters
back to the source instead of pulling every row down first.

## S3 · IMAGE: filter-values-auto-filter-menu.png (auto filter menu)

Filter early. The fewer rows flowing into your later steps, the less work
each one has to do — and with a foldable connector, an early filter can run
on the source database itself instead of inside Power Query.

## S4 · IMAGE: type-specific-filter-for-date.png (Add column, Date group)

Set the correct data type on every column. It's not just tidiness — a date
column without the Date type applied leaves options like this entire Date
and time column group grayed out and unusable.

## S5 · IMAGE: data-preview-tools-enabled-v2.png (data profiling tools)

Before you transform anything, profile it. Column quality, column
distribution, and column profile — three built-in tools that show you
errors, value frequency, and full statistics before you build a single
step around data you haven't actually looked at.

## S6 · IMAGE: documenting.png (renamed Applied Steps)

Document your work. Power Query auto-names every step, but "Filtered
Rows1" tells the next person nothing. Rename steps to say what they do, and
you get documentation for free.

## S7 · IMAGE: extract-previous.png (Extract Previous context menu)

And when a query's Applied Steps list gets long, split it. Extract
Previous breaks a query in two at whichever step you choose — instantly
easier to follow, and easier to reuse.

## S8 · OUTRO CARD (SVG: chapter complete, LTV seal)

Right connector, early filters, correct types, a quick profile before you
transform, clear names, and queries split where they get long. That's
Chapter Three. Next up: Chapter Four, and shaping this clean data into a
proper data model.
