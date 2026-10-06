# Lesson 13 — Mass Additions from Payables Invoices · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Most assets never get typed in by hand at all. This lesson covers how a Payables invoice becomes a mass addition candidate.

## S2 · STEPS — The invoice-to-asset bridge

When an invoice distribution is coded to an asset clearing account instead of an expense account, Payables flags it as something Fixed Assets needs to know about — a purchase that should probably become a depreciable asset.

## S3 · STEPS — Create Mass Additions

The Create Mass Additions process scans for eligible, validated, accounted distributions coded to asset clearing accounts, and sends them to a Fixed Assets interface table. A line there is a candidate, not yet a real asset.

## S4 · CODE — A worked example

Meridian Fabrication Co. pays a forty-five-thousand-dollar invoice for an injection-molding machine, coded to Machinery Clearing. Once validated and accounted, Create Mass Additions sends that line into the interface table, carrying the vendor, invoice number, amount, and GL date along with it.

## S5 · STEPS — Why this matters in practice

In any real implementation, most assets arrive this way, not through manual entry. The point is capturing financial data once, in Payables, and letting it flow into Assets instead of being retyped.

## S6 · OUTRO

Next lesson: Prepare Mass Additions, the review step that turns a candidate line into something ready to post.
