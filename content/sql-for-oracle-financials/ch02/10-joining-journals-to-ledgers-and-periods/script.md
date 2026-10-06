# Lesson 10 — Joining Journals to Ledgers and Periods · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Last join lesson in Chapter 2, and it's the General Ledger's turn. A
journal entry splits across tables the same way an invoice does — a header,
and the lines that actually carry the money.

## S2 · STEPS CARD (header, lines, code combinations)

G-L J-E Headers, one row per journal. G-L J-E Lines, one row per debit or
credit. G-L Code Combinations, the actual chart-of-accounts combination
each line hits. The header never carries a dollar amount by itself — that
lives on the lines.

## S3 · CODE CARD (header to lines to code combinations)

Select journal name, line number, debit, credit, and the account segments.
From headers, inner join lines on journal header ID, inner join code
combinations on code combination ID. Same chaining pattern you've used all
chapter — just General Ledger's own tables this time.

## S4 · CODE CARD (filtering by GL_PERIODS)

Financials almost never filters a journal by a plain calendar date range —
it filters by accounting period, which doesn't always line up neatly with
calendar months. Join to G-L Periods on period name, and you get start
date, end date, and crucially, closing status — whether that period is
even still open.

## S5 · STEPS CARD (Chapter 2, tied together)

Step back and look at what you've built this chapter: Payables — supplier,
invoice, distributions, payments. Receivables — customer, transaction,
applications, receipt. General Ledger — journal header, lines, code
combinations, periods. That's the full map behind the unpaid-invoices
challenge and everything else in this course.

## S6 · OUTRO CARD

Chapter 2 complete. Next: Chapter 3, where you start combining numbers
across these tables with SUM, COUNT, and GROUP BY — and build your first
real aging buckets.
