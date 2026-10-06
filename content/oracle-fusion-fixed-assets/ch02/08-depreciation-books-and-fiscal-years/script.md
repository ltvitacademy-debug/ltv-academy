# Lesson 8 — Depreciation Books and Fiscal Years · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

We've talked about the depreciation calendar conceptually. This lesson looks at what it's actually built from, and the one-way rule that governs it.

## S2 · STEPS — Fiscal years and periods

A depreciation calendar is a sequence of fiscal years, broken into periods — almost always monthly. Every depreciation book is assigned exactly one depreciation calendar, and every period in it carries a status.

## S3 · STEPS — Current open period

At any moment, a book has exactly one current open period — the period depreciation calculates into right now. Everything before it is closed. Everything after it hasn't opened yet.

## S4 · STEPS — A one-way calendar

Oracle Fusion Assets won't let you run depreciation into a period that isn't current, and once a period closes, you generally can't reopen it. The calendar only moves forward — the same philosophy as General Ledger period close.

## S5 · STEPS — Fixing mistakes after close

Since you can't reopen a closed period, mistakes get fixed with a correcting transaction dated into the current open period instead — a cost adjustment, a catch-up entry. That's exactly why reviewing exceptions before closing matters so much.

## S6 · OUTRO

Next lesson: category defaults, and how the rules from Lesson 4 actually get set up inside a book.
