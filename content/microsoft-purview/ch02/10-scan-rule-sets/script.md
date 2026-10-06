# Lesson 10 — Scan Rule Sets · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

A scan rule set is what actually tells a scan which file types to look at, and which classifications to compare your data against.

## S2 · STEPS CARD (building one)

You build it per source type — pick the type, name it, choose a domain. It can only be used inside that domain, so plan accordingly before you create a dozen of them.

## S3 · SCREENSHOT (select file types)

Next comes file types — CSV, JSON, Parquet, Office documents, all enabled by default. Deselecting one doesn't stop ingestion, it just skips schema and classification extraction for that type.

## S4 · SCREENSHOT (select classification rules)

Then classification rules. Every system category — Government, Financial, Personal, Security, Miscellaneous — is selected by default.

## S5 · SCREENSHOT (select system rules expanded)

Expand any category to clear individual rules instead of the whole thing — useful when one specific rule, like a national ID pattern, produces too many false positives for your data.

## S6 · SCREENSHOT (system scan rule sets)

You don't have to build from scratch, either. Microsoft auto-creates a system scan rule set for every source type, already loaded with every available classification — and versioned, so you can pull in updates as Microsoft ships them.

## S7 · STEPS CARD (when to go custom)

Build a custom set when your data is limited to specific regions, when fewer classifications means a faster scan, or when you need your own custom classifications included — which system sets can never contain.

## S8 · OUTRO CARD

Next lesson: scheduling scans — deciding how often this all actually runs.
