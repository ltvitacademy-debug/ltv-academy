# Lesson 15 — Posting Mass Additions · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

This is the last step in the bridge from invoice to asset. This lesson covers what actually happens when a prepared line finally posts.

## S2 · STEPS — What Post Mass Additions does

It acts on every line marked POST: creates a brand-new asset for a new purchase, or a cost adjustment on an existing asset for a merged line. Either way, the line stops being a candidate.

## S3 · STEPS — What changes on success

A new asset number is generated, or an existing asset's cost increases. The queue status becomes POSTED. Depreciation starts from the date placed in service. And the link back to the original Payables invoice is preserved for later tracing.

## S4 · STEPS — When a line doesn't post

Common failures: a missing or invalid category, a date falling in an already-closed period, required fields left blank. A failed line goes back into the review queue rather than posting with bad data — Oracle Fusion Assets forces the correction instead.

## S5 · STEPS — Why posting is the real boundary

Everything before this point is just information about a future asset. Posting is the moment it gets an asset number and starts a depreciation schedule. Mistakes caught before posting are cheap; mistakes caught after need an adjustment or worse.

## S6 · OUTRO

Next lesson: capitalization and placing assets in service — what happens to an asset that isn't ready to depreciate the moment it's added.
